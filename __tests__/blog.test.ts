import {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  getPostsByTag,
  getAllTags,
  getRelatedPosts,
} from '@/lib/blog';

describe('Blog System Tests', () => {
  test('getAllPosts loads posts from content/posts and extracts frontmatter', () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(1);

    const firstPost = posts[0];
    expect(firstPost.title).toBeDefined();
    expect(firstPost.slug).toBeDefined();
    expect(firstPost.category).toBeDefined();
    expect(firstPost.readingTime).toBeDefined();
    expect(firstPost.htmlContent).toBeDefined();
    expect(firstPost.toc).toBeDefined();
    expect(firstPost.toc.length).toBeGreaterThan(0);
  });

  test('getPostBySlug finds specific post and attaches TOC and HTML', () => {
    const post = getPostBySlug('home-loan-emi-vs-prepayment');
    expect(post).not.toBeNull();
    expect(post?.title).toContain('Home Loan EMI vs Prepayment');
    expect(post?.calculatorSlug).toBe('loan-prepayment-calculator');
    expect(post?.sources).toBeDefined();
    expect(post?.sources?.length).toBeGreaterThanOrEqual(2);
    expect(post?.hindiSummary).toBeDefined();
    expect(post?.hindiSummary?.verdict).toBeDefined();
  });

  test('getPostsByCategory filters posts by loans category', () => {
    const loanPosts = getPostsByCategory('loans');
    expect(loanPosts.length).toBeGreaterThanOrEqual(1);
    expect(loanPosts.every((p) => p.category === 'loans')).toBe(true);

    const healthPosts = getPostsByCategory('health');
    expect(Array.isArray(healthPosts)).toBe(true);
  });

  test('getPostsByTag filters posts by tag', () => {
    const prepaymentPosts = getPostsByTag('Prepayment');
    expect(prepaymentPosts.length).toBeGreaterThanOrEqual(1);
    expect(prepaymentPosts[0].slug).toBe('home-loan-emi-vs-prepayment');
  });

  test('getAllTags returns unique tags and occurrence counts', () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    const homeLoanTag = tags.find((t) => t.tag.toLowerCase() === 'home loan');
    expect(homeLoanTag).toBeDefined();
    expect(homeLoanTag?.count).toBeGreaterThanOrEqual(1);
  });

  test('getRelatedPosts excludes current post and scores by tag overlap', () => {
    const related = getRelatedPosts('home-loan-emi-vs-prepayment', ['Home Loan', 'Prepayment'], 'loans', 3);
    expect(related.every((p) => p.slug !== 'home-loan-emi-vs-prepayment')).toBe(true);
  });
});
