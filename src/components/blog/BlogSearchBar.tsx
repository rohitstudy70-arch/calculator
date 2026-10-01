'use client';

import React, { useState, useMemo } from 'react';
import { BlogPost } from '@/lib/blog-types';
import BlogCard from './BlogCard';

interface BlogSearchBarProps {
  initialPosts: BlogPost[];
}

export default function BlogSearchBar({ initialPosts }: BlogSearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Extract all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    initialPosts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [initialPosts]);

  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesSearch =
        searchTerm.trim() === '' ||
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTag =
        selectedTag === 'all' || post.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [initialPosts, searchTerm, selectedTag]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search Input & Tag Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles by title, topic, or keyword..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            className="w-5 h-5 text-gray-400 absolute left-3 top-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center w-full md:w-auto">
            <button
              onClick={() => setSelectedTag('all')}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                selectedTag === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              All Topics
            </button>
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Count Indicator */}
      <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
        Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
        {searchTerm && ` for "${searchTerm}"`}
        {selectedTag !== 'all' && ` tagged #${selectedTag}`}
      </div>

      {/* Grid of Posts */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            No articles match your search criteria. Try a different keyword or topic.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
