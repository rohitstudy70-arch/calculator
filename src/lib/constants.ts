export const SITE_NAME = 'CalcMaster India';
export const SITE_URL = 'https://www.calcmaster.co.in';
export const SITE_DESCRIPTION = 'Free online calculators for India - EMI, SIP, Tax, GST, Health & more';
export const DEFAULT_LOCALE = 'en';
export const SUPPORTED_LOCALES = ['en', 'hi'] as const;
export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // placeholder
export const SEARCH_CONSOLE_ID = 'google9c3fd5e3163a1fd7';

export interface Calculator {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  description: string;
  descriptionHi: string;
}

export interface Category {
  id: string;
  name: string;
  nameHi: string;
  slug: string;
  icon: string;
  description: string;
  calculators: Calculator[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'loan',
    name: 'Loan Calculators',
    nameHi: 'ऋण कैलकुलेटर',
    slug: 'loan',
    icon: 'CurrencyRupeeIcon',
    description: 'Calculate EMI, prepayments, and total interest for various loans.',
    calculators: [
      { id: 'emi', name: 'EMI', nameHi: 'ईएमआई', slug: 'emi', description: 'Calculate Equated Monthly Installment', descriptionHi: 'समान मासिक किश्त की गणना करें' },
      { id: 'home-loan', name: 'Home Loan EMI', nameHi: 'होम लोन ईएमआई', slug: 'home-loan', description: 'Calculate Home Loan EMI', descriptionHi: 'होम लोन ईएमआई की गणना करें' },
      { id: 'personal-loan', name: 'Personal Loan', nameHi: 'पर्सनल लोन', slug: 'personal-loan', description: 'Calculate Personal Loan EMI', descriptionHi: 'पर्सनल लोन ईएमआई की गणना करें' },
      { id: 'car-loan', name: 'Car Loan', nameHi: 'कार लोन', slug: 'car-loan', description: 'Calculate Car Loan EMI', descriptionHi: 'कार लोन ईएमआई की गणना करें' },
      { id: 'loan-prepayment', name: 'Loan Prepayment', nameHi: 'लोन प्रीपेमेंट', slug: 'loan-prepayment', description: 'Calculate savings with loan prepayment', descriptionHi: 'लोन प्रीपेमेंट के साथ बचत की गणना करें' }
    ]
  },
  {
    id: 'investment',
    name: 'Investment Calculators',
    nameHi: 'निवेश कैलकुलेटर',
    slug: 'investment',
    icon: 'TrendingUpIcon',
    description: 'Plan your investments and calculate returns.',
    calculators: [
      { id: 'sip', name: 'SIP', nameHi: 'सिप', slug: 'sip', description: 'Systematic Investment Plan', descriptionHi: 'सिस्टमैटिक इन्वेस्टमेंट प्लान' },
      { id: 'lumpsum', name: 'Lumpsum', nameHi: 'एकमुश्त', slug: 'lumpsum', description: 'Lumpsum Investment Return', descriptionHi: 'एकमुश्त निवेश रिटर्न' },
      { id: 'fd', name: 'FD', nameHi: 'एफडी', slug: 'fd', description: 'Fixed Deposit Calculator', descriptionHi: 'फिक्स्ड डिपॉजिट कैलकुलेटर' },
      { id: 'rd', name: 'RD', nameHi: 'आरडी', slug: 'rd', description: 'Recurring Deposit Calculator', descriptionHi: 'आवर्ती जमा कैलकुलेटर' },
      { id: 'ppf', name: 'PPF', nameHi: 'पीपीएफ', slug: 'ppf', description: 'Public Provident Fund', descriptionHi: 'लोक भविष्य निधि' },
      { id: 'epf', name: 'EPF', nameHi: 'ईपीएफ', slug: 'epf', description: 'Employees Provident Fund', descriptionHi: 'कर्मचारी भविष्य निधि' },
      { id: 'nps', name: 'NPS', nameHi: 'एनपीएस', slug: 'nps', description: 'National Pension System', descriptionHi: 'राष्ट्रीय पेंशन प्रणाली' },
      { id: 'cagr', name: 'CAGR', nameHi: 'सीएजीआर', slug: 'cagr', description: 'Compound Annual Growth Rate', descriptionHi: 'चक्रवृद्धि वार्षिक वृद्धि दर' },
      { id: 'compound-interest', name: 'Compound Interest', nameHi: 'चक्रवृद्धि ब्याज', slug: 'compound-interest', description: 'Compound Interest Calculator', descriptionHi: 'चक्रवृद्धि ब्याज कैलकुलेटर' },
      { id: 'simple-interest', name: 'Simple Interest', nameHi: 'साधारण ब्याज', slug: 'simple-interest', description: 'Simple Interest Calculator', descriptionHi: 'साधारण ब्याज कैलकुलेटर' }
    ]
  },
  {
    id: 'tax',
    name: 'Tax Calculators',
    nameHi: 'कर कैलकुलेटर',
    slug: 'tax',
    icon: 'DocumentReportIcon',
    description: 'Calculate your taxes, GST, and net salary.',
    calculators: [
      { id: 'gst', name: 'GST', nameHi: 'जीएसटी', slug: 'gst', description: 'Goods and Services Tax', descriptionHi: 'माल और सेवा कर' },
      { id: 'income-tax', name: 'Income Tax', nameHi: 'आयकर', slug: 'income-tax', description: 'Income Tax Calculator', descriptionHi: 'आयकर कैलकुलेटर' },
      { id: 'hra', name: 'HRA', nameHi: 'एचआरए', slug: 'hra', description: 'House Rent Allowance Exemption', descriptionHi: 'मकान किराया भत्ता छूट' },
      { id: 'gratuity', name: 'Gratuity', nameHi: 'ग्रेच्युटी', slug: 'gratuity', description: 'Gratuity Calculator', descriptionHi: 'ग्रेच्युटी कैलकुलेटर' },
      { id: 'salary', name: 'Salary In-Hand', nameHi: 'इन-हैंड सैलरी', slug: 'salary', description: 'Take Home Salary Calculator', descriptionHi: 'टेक होम सैलरी कैलकुलेटर' }
    ]
  },
  {
    id: 'retirement',
    name: 'Retirement Calculators',
    nameHi: 'सेवानिवृत्ति कैलकुलेटर',
    slug: 'retirement',
    icon: 'UserCircleIcon',
    description: 'Plan for a financially secure retirement.',
    calculators: [
      { id: 'retirement', name: 'Retirement', nameHi: 'सेवानिवृत्ति', slug: 'retirement', description: 'Retirement Corpus Calculator', descriptionHi: 'सेवानिवृत्ति कोष कैलकुलेटर' },
      { id: 'inflation', name: 'Inflation', nameHi: 'मुद्रास्फीति', slug: 'inflation', description: 'Inflation Calculator', descriptionHi: 'मुद्रास्फीति कैलकुलेटर' },
      { id: 'nps', name: 'NPS', nameHi: 'एनपीएस', slug: 'nps', description: 'NPS Retirement Calculator', descriptionHi: 'एनपीएस सेवानिवृत्ति कैलकुलेटर' }
    ]
  },
  {
    id: 'health',
    name: 'Health Calculators',
    nameHi: 'स्वास्थ्य कैलकुलेटर',
    slug: 'health',
    icon: 'HeartIcon',
    description: 'Track and monitor your health metrics.',
    calculators: [
      { id: 'bmi', name: 'BMI', nameHi: 'बीएमआई', slug: 'bmi', description: 'Body Mass Index', descriptionHi: 'बॉडी मास इंडेक्स' },
      { id: 'bmr', name: 'BMR', nameHi: 'बीएमआर', slug: 'bmr', description: 'Basal Metabolic Rate', descriptionHi: 'बेसल मेटाबोलिक रेट' },
      { id: 'calorie', name: 'Calorie', nameHi: 'कैलोरी', slug: 'calorie', description: 'Daily Calorie Needs', descriptionHi: 'दैनिक कैलोरी आवश्यकताएं' },
      { id: 'pregnancy-due-date', name: 'Pregnancy Due Date', nameHi: 'गर्भावस्था की नियत तारीख', slug: 'pregnancy-due-date', description: 'Pregnancy Due Date Calculator', descriptionHi: 'गर्भावस्था की नियत तारीख कैलकुलेटर' },
      { id: 'edd', name: 'EDD Calculator & Tracker', nameHi: 'ईडीडी कैलकुलेटर व ट्रैकर', slug: 'edd-calculator', description: 'Calculate EDD & Track Pregnancy Week by Week', descriptionHi: 'ईडीडी निकालें और प्रेग्नेंसी ट्रैक करें' }
    ]
  },
  {
    id: 'math',
    name: 'Math Calculators',
    nameHi: 'गणित कैलकुलेटर',
    slug: 'math',
    icon: 'CalculatorIcon',
    description: 'Solve mathematical problems quickly.',
    calculators: [
      { id: 'percentage', name: 'Percentage', nameHi: 'प्रतिशत', slug: 'percentage', description: 'Percentage Calculator', descriptionHi: 'प्रतिशत कैलकुलेटर' },
      { id: 'fraction', name: 'Fraction', nameHi: 'अंश', slug: 'fraction', description: 'Fraction Calculator', descriptionHi: 'अंश कैलकुलेटर' },
      { id: 'scientific', name: 'Scientific', nameHi: 'वैज्ञानिक', slug: 'scientific', description: 'Scientific Calculator', descriptionHi: 'वैज्ञानिक कैलकुलेटर' },
      { id: 'age', name: 'Age', nameHi: 'आयु', slug: 'age', description: 'Age Calculator', descriptionHi: 'आयु कैलकुलेटर' },
      { id: 'sarkari-exam-age', name: 'Sarkari Exam Age', nameHi: 'सरकारी परीक्षा आयु', slug: 'sarkari-exam-age', description: 'Exam Age Eligibility Calculator', descriptionHi: 'परीक्षा आयु पात्रता कैलकुलेटर' },
      { id: 'date-difference', name: 'Date Difference', nameHi: 'तारीख का अंतर', slug: 'date-difference', description: 'Days Between Dates', descriptionHi: 'तिथियों के बीच के दिन' }
    ]
  },
  {
    id: 'utility',
    name: 'Utility Calculators',
    nameHi: 'उपयोगिता कैलकुलेटर',
    slug: 'utility',
    icon: 'CogIcon',
    description: 'Everyday utility calculators.',
    calculators: [
      { id: 'unit-converter', name: 'Unit Converter', nameHi: 'इकाई परिवर्तक', slug: 'unit-converter', description: 'Convert Units', descriptionHi: 'इकाई परिवर्तित करें' },
      { id: 'tip', name: 'Tip', nameHi: 'टिप', slug: 'tip', description: 'Tip Calculator', descriptionHi: 'टिप कैलकुलेटर' },
      { id: 'gpa', name: 'GPA', nameHi: 'जीपीए', slug: 'gpa', description: 'GPA Calculator', descriptionHi: 'जीपीए कैलकुलेटर' },
      { id: 'land-unit-converter', name: 'Land Unit Converter', nameHi: 'भूमि इकाई कनवर्टर', slug: 'land-unit-converter', description: 'State-wise Land Measurement Converter', descriptionHi: 'राज्यवार भूमि माप कनवर्टर' }
    ]
  }
];

export function getCalculatorHref(slug: string): string {
  if (slug === 'land-unit-converter' || slug === 'unit-converter') {
    return `/${slug}`;
  }
  if (slug.endsWith('-calculator')) {
    return `/${slug}`;
  }
  return `/${slug}-calculator`;
}

