import React from 'react';
import Link from 'next/link';
import { BlogPost, BLOG_CATEGORIES } from '@/lib/blog-types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const categoryMeta = BLOG_CATEGORIES[post.category];

  return (
    <article className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <div className="p-6 flex flex-col flex-grow">
        {/* Category & Reading Time */}
        <div className="flex items-center justify-between gap-2 mb-3 text-xs">
          <Link
            href={`/blog/${post.category}`}
            className={`font-semibold px-2.5 py-1 rounded-full transition-opacity hover:opacity-80 ${categoryMeta?.badgeColor || 'bg-gray-100 text-gray-800'}`}
          >
            {categoryMeta?.name || post.category}
          </Link>
          <span className="text-gray-500 dark:text-gray-400 font-medium">
            {post.readingTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {/* Description / Excerpt */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-4 flex-grow">
          {post.description}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-700/60 text-gray-600 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Date Footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div>
            <span className="font-semibold text-gray-900 dark:text-gray-200 block">
              {post.author}
            </span>
            <span>{post.publishedAt}</span>
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
          >
            Read Article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
