import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  BLOG_CATEGORIES,
} from '@/lib/blog';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import TableOfContents from '@/components/blog/TableOfContents';
import CalculatorEmbed from '@/components/blog/CalculatorEmbed';
import BilingualSection from '@/components/blog/BilingualSection';
import BlogCard from '@/components/blog/BlogCard';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  const url = `https://calcmaster.in/blog/${post.slug}`;

  return {
    title: `${post.title} | CalcMaster India`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  };
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const categoryMeta = BLOG_CATEGORIES[post.category];
  const relatedPosts = getRelatedPosts(post.slug, post.tags, post.category, 3);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: categoryMeta?.name || post.category, href: `/blog/${post.category}` },
    { label: post.title },
  ];

  // Schema.org Article
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Person',
      name: post.author,
      jobTitle: post.authorRole || 'Financial Analyst',
    },
    publisher: {
      '@type': 'Organization',
      name: 'CalcMaster India',
      url: 'https://calcmaster.in',
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: `https://calcmaster.in/blog/${post.slug}`,
  };

  // Schema.org Breadcrumbs
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: b.label,
      item: b.href ? `https://calcmaster.in${b.href}` : `https://calcmaster.in/blog/${post.slug}`,
    })),
  };

  // Schema.org FAQPage (if FAQs present)
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <Breadcrumb items={breadcrumbs} />

      {/* Article Header */}
      <header className="mb-10 max-w-4xl">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Link
            href={`/blog/${post.category}`}
            className={`text-xs font-bold px-3 py-1 rounded-full ${categoryMeta?.badgeColor || 'bg-gray-100'}`}
          >
            {categoryMeta?.name || post.category}
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            • {post.readingTime}
          </span>
          {post.reviewedBy && (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              ✓ Reviewed by {post.reviewedBy}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight mb-4">
          {post.title}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          {post.description}
        </p>

        {/* Author / Date Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
          <div>
            <span className="font-bold text-gray-900 dark:text-white block sm:inline mr-2">
              Written by {post.author}
            </span>
            {post.authorRole && (
              <span className="text-gray-500 dark:text-gray-400">({post.authorRole})</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>Published: {post.publishedAt}</span>
            <span>Updated: {post.updatedAt}</span>
          </div>
        </div>
      </header>

      {/* Main Grid: Article Content + Sticky Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Article Body */}
        <article className="lg:col-span-8 flex flex-col">
          {/* Hindi Summary Accordion */}
          {post.hindiSummary && <BilingualSection data={post.hindiSummary} />}

          {/* Rendered Markdown Content */}
          <div
            className="prose prose-blue dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-table:text-sm prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3 prose-td:p-3"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />

          {/* Embedded Calculator */}
          {post.calculatorSlug && (
            <CalculatorEmbed
              slug={post.calculatorSlug}
              title={post.calculatorName ? `Try the ${post.calculatorName} Live` : undefined}
            />
          )}

          {/* Ad Slot */}
          <div className="my-10">
            <AdSlot id={`blog-ad-${post.slug}`} height={90} className="rounded-2xl overflow-hidden" />
          </div>

          {/* FAQs Section */}
          {post.faqs && post.faqs.length > 0 && (
            <section className="not-prose my-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>
              <FAQ items={post.faqs} />
            </section>
          )}

          {/* Official Sources Cited */}
          {post.sources && post.sources.length > 0 && (
            <section className="not-prose my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Official Sources & References Cited
              </h3>
              <ul className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                {post.sources.map((src, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>{src}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Disclaimer Note */}
          <div className="not-prose p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200">
            <strong>Disclaimer:</strong> The calculations, tax rules, and financial examples presented in this article are for general educational purposes and do not constitute formal financial, investment, or legal advice. Always verify with official guidelines or a certified financial planner.
          </div>

          <LastUpdated date={post.updatedAt} />
        </article>

        {/* Right Column: Sticky Table of Contents & Related Tools */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          <div className="sticky top-20 flex flex-col gap-6">
            {/* Table of Contents */}
            <TableOfContents items={post.toc} />

            {/* Related Calculators Box */}
            {post.relatedCalculators && post.relatedCalculators.length > 0 && (
              <div className="p-5 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                  Related Calculators
                </h3>
                <div className="flex flex-col gap-3">
                  {post.relatedCalculators.map((calc, idx) => (
                    <Link
                      key={idx}
                      href={`/${calc.slug}`}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40 hover:bg-blue-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-600/50 transition-colors block group"
                    >
                      <h4 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-1">
                        {calc.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                        {calc.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* 3 Related Articles Section */}
      {relatedPosts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Related Articles & Reading
            </h2>
            <Link
              href="/blog"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse All Articles →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rPost) => (
              <BlogCard key={rPost.slug} post={rPost} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
