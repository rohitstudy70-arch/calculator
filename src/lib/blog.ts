import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import {
  BlogCategory,
  BlogCategoryMeta,
  BLOG_CATEGORIES,
  TOCItem,
  RelatedCalculatorLink,
  ArticleFAQ,
  HindiSection,
  BlogPostFrontmatter,
  BlogPost,
} from './blog-types';

export * from './blog-types';

const POSTS_DIRECTORY = path.join(process.cwd(), 'content', 'posts');

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Calculates reading time in minutes based on 200 words per minute.
 */
function calculateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

/**
 * Extracts H2 and H3 headings for the Table of Contents.
 */
function extractTOC(content: string): TOCItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugify(text);
    toc.push({ id, text, level });
  }

  return toc;
}

/**
 * Custom renderer for marked to attach id attributes to headings.
 */
function renderMarkdownToHTML(markdown: string): string {
  const renderer = new marked.Renderer();

  renderer.heading = ({ text, depth }) => {
    const cleanText = text.replace(/<[^>]*>/g, '');
    const id = slugify(cleanText);
    return `<h${depth} id="${id}" class="scroll-mt-24">${text}</h${depth}>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: false,
  });

  return marked.parse(markdown) as string;
}

/**
 * Fetches all blog posts sorted by published date (newest first).
 */
export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(POSTS_DIRECTORY);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md') && !fileName.endsWith('.mdx')) continue;

    const fullPath = path.join(POSTS_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const slug = data.slug || fileName.replace(/\.(md|mdx)$/, '');
    const toc = extractTOC(content);
    const readingTime = data.readingTime || calculateReadingTime(content);
    const htmlContent = renderMarkdownToHTML(content);

    posts.push({
      ...(data as BlogPostFrontmatter),
      slug,
      content,
      htmlContent,
      toc,
      readingTime,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Fetches a single blog post by slug.
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const allPosts = getAllPosts();
  return allPosts.find((p) => p.slug === slug) || null;
}

/**
 * Fetches posts filtered by category.
 */
export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

/**
 * Fetches posts filtered by tag (case-insensitive).
 */
export function getPostsByTag(tag: string): BlogPost[] {
  const cleanTag = tag.toLowerCase().replace(/-/g, ' ');
  return getAllPosts().filter((p) =>
    p.tags?.some((t) => t.toLowerCase() === cleanTag || slugify(t) === tag.toLowerCase())
  );
}

/**
 * Retrieves all unique tags across all posts with their occurrence count.
 */
export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const allPosts = getAllPosts();
  const tagCount: Record<string, number> = {};

  for (const post of allPosts) {
    for (const tag of post.tags || []) {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }

  return Object.entries(tagCount)
    .map(([tag, count]) => ({
      tag,
      slug: slugify(tag),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

/**
 * Suggests up to `limit` related posts sharing the same tags or category, excluding current slug.
 */
export function getRelatedPosts(currentSlug: string, tags: string[] = [], category?: BlogCategory, limit = 3): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);

  const scored = allPosts.map((post) => {
    let score = 0;
    if (category && post.category === category) score += 2;
    for (const tag of tags) {
      if (post.tags?.includes(tag)) score += 3;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}
