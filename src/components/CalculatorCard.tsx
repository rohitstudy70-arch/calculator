import Link from 'next/link';

interface CalculatorCardProps {
  name: string;
  description: string;
  slug: string;
}

export default function CalculatorCard({ name, description, slug }: CalculatorCardProps) {
  return (
    <Link href={`/${slug}`} className="block h-full">
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col group">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-[#1E40AF] mr-4 group-hover:bg-[#1E40AF] group-hover:text-white transition-colors">
            {/* Placeholder Icon */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        </div>
        <p className="text-gray-600 mb-6 flex-grow">{description}</p>
        <div className="mt-auto flex items-center text-[#1E40AF] font-medium group-hover:text-blue-800">
          Try Now 
          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
        </div>
      </div>
    </Link>
  );
}
