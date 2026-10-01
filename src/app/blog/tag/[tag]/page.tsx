import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '@/lib/blog';
import BlogCard from '@/components/blog/BlogCard';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((t) => ({
    tag: t.slug,
  }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag).replace(/-/g, ' ');

  return {
    title: `Articles tagged #${decodedTag} | CalcMaster India Blog`,
    description: `Read articles, tutorials, and guides about ${decodedTag} on CalcMaster India.`,
    alternates: {
      canonical: `https://calculator-kappa-one-10.vercel.app/blog/tag/${params.tag}`,
    },
  };
}

export default function TagPage({ params }: TagPageProps) {
  const posts = getPostsByTag(params.tag);
  if (posts.length === 0) notFound();

  const displayTag = decodeURIComponent(params.tag).replace(/-/g, ' ');

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: `#${displayTag}` },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Breadcrumb items={breadcrumbs} />

      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
          Topic / Tag
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight capitalize">
          #{displayTag}
        </h1>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">
          Browse all {posts.length} article{posts.length !== 1 ? 's' : ''} related to #{displayTag}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          ← Return to All Articles
        </Link>
      </div>
    </div>
  );
}
