import SSYCalculatorPage, { metadata as originalMetadata } from '../sukanya-samriddhi-calculator/page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...originalMetadata,
  title: 'SSY Calculator 2026 - Sukanya Samriddhi | CalcMaster',
  alternates: {
    canonical: 'https://www.calcmaster.co.in/sukanya-samriddhi-calculator',
  },
};

export default SSYCalculatorPage;
