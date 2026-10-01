import CategoryBlogPage, { generateCategoryMetadata } from '@/components/blog/CategoryBlogPage';

export const metadata = generateCategoryMetadata('tax');

export default function TaxBlogPage() {
  return <CategoryBlogPage category="tax" />;
}
