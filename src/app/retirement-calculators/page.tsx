import { Metadata } from 'next';
import Link from 'next/link';
import CalculatorCard from '@/components/CalculatorCard';
import { CATEGORIES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Retirement Calculators | CalcMaster India',
  description: 'Plan your golden years with our free Indian retirement, NPS, and inflation calculators.',
};

export default function RetirementCalculatorsPage() {
  const category = CATEGORIES.find((c) => c.id === 'retirement');
  if (!category) return null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <nav className="flex mb-8" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400 md:ml-2">
                {category.name}
              </span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl mb-4">
          {category.name}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">
          Retirement planning is the cornerstone of lifelong financial security. Calculate the future cost of living, required retirement corpus, pension payouts under NPS, and how inflation affects your purchasing power over decades.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.calculators.map((calc) => (
          <CalculatorCard
            key={calc.id}
            name={calc.name}
            description={calc.description}
            slug={`${calc.slug}-calculator`}
          />
        ))}
      </div>
    </div>
  );
}
