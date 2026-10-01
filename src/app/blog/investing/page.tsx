import CategoryBlogPage, { generateCategoryMetadata } from '@/components/blog/CategoryBlogPage';

export const metadata = generateCategoryMetadata('investing');

export default function InvestingBlogPage() {
  return <CategoryBlogPage category="investing" />;
}
