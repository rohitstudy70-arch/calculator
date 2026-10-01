import CategoryBlogPage, { generateCategoryMetadata } from '@/components/blog/CategoryBlogPage';

export const metadata = generateCategoryMetadata('loans');

export default function LoansBlogPage() {
  return <CategoryBlogPage category="loans" />;
}
