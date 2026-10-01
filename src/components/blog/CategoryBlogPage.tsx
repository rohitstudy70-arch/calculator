import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByCategory } from '@/lib/blog';
import { BLOG_CATEGORIES, BlogCategory } from '@/lib/blog-types';
import BlogCard from './BlogCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface CategoryBlogPageProps {
  category: BlogCategory;
}

export function generateCategoryMetadata(category: BlogCategory): Metadata {
  const meta = BLOG_CATEGORIES[category];
  return {
    title: `${meta.name} Articles & Guides | CalcMaster India`,
    description: meta.description,
    alternates: {
      canonical: `https://calcmaster.in/blog/${meta.slug}`,
    },
    openGraph: {
      title: `${meta.name} Guides | CalcMaster India`,
      description: meta.description,
      url: `https://calcmaster.in/blog/${meta.slug}`,
    },
  };
}

export default function CategoryBlogPage({ category }: CategoryBlogPageProps) {
  const meta = BLOG_CATEGORIES[category];
  const posts = getPostsByCategory(category);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: meta.name },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-10 max-w-3xl">
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${meta.badgeColor}`}>
          Category
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight">
          {meta.name} ({meta.nameHi})
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          {meta.description}
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            No articles published in this category yet. Check back soon for new guides!
          </p>
          <Link
            href="/blog"
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Return to All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
