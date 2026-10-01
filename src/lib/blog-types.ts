export type BlogCategory = 'loans' | 'investing' | 'tax' | 'health' | 'math';

export interface BlogCategoryMeta {
  id: BlogCategory;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  badgeColor: string;
}

export const BLOG_CATEGORIES: Record<BlogCategory, BlogCategoryMeta> = {
  loans: {
    id: 'loans',
    name: 'Loans & EMI',
    nameHi: 'ऋण और ईएमआई',
    slug: 'loans',
    description: 'Expert strategies to manage, repay, and minimize interest on home, personal, and car loans.',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  },
  investing: {
    id: 'investing',
    name: 'Mutual Funds & Investing',
    nameHi: 'म्यूचुअल फंड और निवेश',
    slug: 'investing',
    description: 'Practical guides on SIP, lumpsum, compounding, PPF, and long-term wealth creation.',
    badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
  },
  tax: {
    id: 'tax',
    name: 'Tax & Salary',
    nameHi: 'टैक्स और वेतन',
    slug: 'tax',
    description: 'Understand the New vs Old tax regime, HRA exemptions, gratuity, and take-home pay.',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  },
  health: {
    id: 'health',
    name: 'Health & Fitness',
    nameHi: 'स्वास्थ्य और फिटनेस',
    slug: 'health',
    description: 'Evidence-based calculations for BMI, BMR, calorie expenditure, and body composition.',
    badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
  },
  math: {
    id: 'math',
    name: 'Math & Everyday Tools',
    nameHi: 'गणित और दैनिक उपकरण',
    slug: 'math',
    description: 'Step-by-step guides on fractions, percentages, age calculation, and unit conversions.',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  },
};

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export interface RelatedCalculatorLink {
  name: string;
  slug: string;
  description: string;
}

export interface ArticleFAQ {
  question: string;
  answer: string;
}

export interface HindiSection {
  intro: string;
  verdict: string;
  faqs?: ArticleFAQ[];
}

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  description: string;
  category: BlogCategory;
  tags: string[];
  author: string;
  authorRole?: string;
  publishedAt: string;
  updatedAt: string;
  reviewedBy?: string;
  readingTime?: string;
  calculatorSlug?: string;
  calculatorName?: string;
  relatedCalculators?: RelatedCalculatorLink[];
  faqs?: ArticleFAQ[];
  hindiSummary?: HindiSection;
  sources?: string[];
  featured?: boolean;
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  htmlContent: string;
  toc: TOCItem[];
  readingTime: string;
}
