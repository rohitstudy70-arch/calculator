import { MetadataRoute } from 'next';
import { CATEGORIES, getCalculatorHref } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.calcmaster.co.in';

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  // Category routes
  CATEGORIES.forEach((category) => {
    routes.push({
      url: `${baseUrl}/${category.slug}-calculators`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    });

    // Individual calculator routes
    category.calculators.forEach((calc) => {
      routes.push({
        url: `${baseUrl}${getCalculatorHref(calc.slug)}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      });
    });
  });

  // Dedicated high-intent SEO aliases
  routes.push(
    {
      url: `${baseUrl}/dollar-to-rupee`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/aed-to-inr`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/xe-currency-converter`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dob-calculator`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/calculate-dob-from-age`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/roi-calculator`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/edd-tracker`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }
  );

  // Blog categories & posts
  try {
    const { getAllPosts, getAllTags, BLOG_CATEGORIES } = require('@/lib/blog');
    
    // Blog Categories
    Object.values(BLOG_CATEGORIES).forEach((cat: any) => {
      routes.push({
        url: `${baseUrl}/blog/${cat.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });

    // Individual Blog Articles
    const posts = getAllPosts();
    posts.forEach((post: any) => {
      routes.push({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt || post.publishedAt),
        changeFrequency: 'weekly',
        priority: 0.85,
      });
    });

    // Blog Tags
    const tags = getAllTags();
    tags.forEach((tag: any) => {
      routes.push({
        url: `${baseUrl}/blog/tag/${tag.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  } catch (e) {
    // Fallback if content not initialized
  }

  return routes;
}
