import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getAllTags, BLOG_CATEGORIES } from '@/lib/blog';
import BlogSearchBar from '@/components/blog/BlogSearchBar';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export const metadata: Metadata = {
  title: 'CalcMaster Blog - Personal Finance, Tax, Health & Math Guides',
  description:
    'Actionable, research-backed guides on home loan prepayment, mutual fund SIPs, income tax optimization, fitness metrics, and mathematical calculations.',
  alternates: {
    canonical: 'https://calcmaster.in/blog',
  },
  openGraph: {
    title: 'CalcMaster Blog - Personal Finance & Calculator Guides',
    description: 'Practical guides and expert strategies to make the most of your money, health, and numbers.',
    url: 'https://calcmaster.in/blog',
    type: 'website',
  },
};

export default function BlogHubPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog & Guides' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbs} />

      {/* Header Banner */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-950/60 px-3 py-1 rounded-full">
          CalcMaster Knowledge Hub
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight">
          Financial Wisdom & Practical Guides
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          In-depth, mathematical analysis of loans, investments, taxes, and health calculations designed to help you make smarter financial decisions.
        </p>
      </div>

      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <Link
          href="/blog"
          className="text-xs font-bold px-4 py-2 rounded-xl bg-blue-600 text-white shadow-sm"
        >
          All Categories
        </Link>
        {Object.values(BLOG_CATEGORIES).map((cat) => (
          <Link
            key={cat.id}
            href={`/blog/${cat.slug}`}
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm"
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Interactive Search & Filter Post Grid */}
      <BlogSearchBar initialPosts={posts} />

      {/* Tags Cloud Section */}
      {tags.length > 0 && (
        <section className="mt-16 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Explore by Topic
          </h2>
          <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-gray-600 transition-colors"
              >
                #{t.tag} <span className="text-gray-400 text-[10px]">({t.count})</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
