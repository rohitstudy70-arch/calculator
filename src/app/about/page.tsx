import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About CalcMaster India - Free Online Calculators',
  description: 'Learn about CalcMaster India, our mission to provide free and accurate online calculators for Indians, and our commitment to privacy.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">About CalcMaster India</h1>
      
      <div className="prose prose-blue prose-lg max-w-none text-gray-600">
        <p>
          Welcome to CalcMaster India, your trusted destination for fast, accurate, and completely free online calculators designed specifically for the Indian context.
        </p>
        
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
        <p>
          Our mission is to simplify complex calculations for everyone. Whether you are planning to take a home loan, looking to invest in a Systematic Investment Plan (SIP), calculating your Goods and Services Tax (GST), or simply trying to track your Body Mass Index (BMI), we aim to provide you with the tools you need to make informed decisions quickly and confidently. Financial literacy and health awareness are vital, and we believe that accessible tools play a huge role in empowering individuals.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why We Built This</h2>
        <p>
          We realized that while there are many calculators available online, finding ones that are tailored to Indian financial systems (like EPF, PPF, and Indian Income Tax slabs) can be challenging. Many websites are cluttered with ads, require sign-ups, or present confusing interfaces. CalcMaster India was built to solve this problem by offering a clean, ad-light, and highly responsive user experience.
        </p>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Commitment</h2>
        <p>
          We are deeply committed to your privacy and the accuracy of our tools. 
        </p>
        <ul>
          <li><strong>Privacy First:</strong> We do not store your personal financial or health data on our servers. All calculations are performed instantly in your browser.</li>
          <li><strong>Accuracy:</strong> We continuously update our formulas to reflect the latest government guidelines and economic changes. However, we always recommend consulting a professional for critical financial or medical decisions.</li>
          <li><strong>Accessibility:</strong> Our platform is designed to be accessible across devices, ensuring you can calculate on the go, whether on a mobile phone, tablet, or desktop.</li>
        </ul>

        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Meet the Team</h2>
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
          <p className="text-center italic text-gray-500">Team section coming soon...</p>
        </div>
      </div>
    </div>
  );
}
