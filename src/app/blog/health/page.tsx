import CategoryBlogPage, { generateCategoryMetadata } from '@/components/blog/CategoryBlogPage';

export const metadata = generateCategoryMetadata('health');

export default function HealthBlogPage() {
  return <CategoryBlogPage category="health" />;
}
