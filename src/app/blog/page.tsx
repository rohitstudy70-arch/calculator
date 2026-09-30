import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Financial Tips & Calculator Guides | CalcMaster India Blog',
  description: 'Read the latest guides, financial tips, and tutorials on how to make the most of our online calculators.',
};

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">Financial Tips & Calculator Guides</h1>
        <p className="text-lg text-gray-600">
          Articles coming soon. Stay tuned for expert advice, financial planning tips, and detailed guides!
        </p>
      </div>
      
      {/* Grid placeholder for future blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50 pointer-events-none">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 bg-gray-200 animate-pulse"></div>
            <div className="p-6 flex-grow">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
