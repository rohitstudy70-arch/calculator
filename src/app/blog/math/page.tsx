import CategoryBlogPage, { generateCategoryMetadata } from '@/components/blog/CategoryBlogPage';

export const metadata = generateCategoryMetadata('math');

export default function MathBlogPage() {
  return <CategoryBlogPage category="math" />;
}
