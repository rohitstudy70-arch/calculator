import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer - CalcMaster India',
  description: 'Disclaimer regarding the usage of calculators on CalcMaster India.',
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Disclaimer</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 30, 2026</p>
      
      <div className="prose prose-blue max-w-none text-gray-700">
        <p>
          The information and calculators provided on CalcMaster India (https://calculator-kappa-one-10.vercel.app) are for general informational and educational purposes only.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">Estimates Only</h2>
        <p>
          All calculation results presented by our tools are estimates based on the inputs provided by the user and standard mathematical formulas. They should not be considered as guaranteed figures. Actual results may vary due to several factors, including but not limited to:
        </p>
        <ul>
          <li>Changes in interest rates by financial institutions</li>
          <li>Processing fees, hidden charges, or applicable taxes not accounted for in the calculation</li>
          <li>Mid-year changes in tax laws, cess, or surcharges</li>
          <li>Market fluctuations impacting investment returns</li>
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-3">Not Professional Advice</h2>
        <p>
          <strong>No Financial Advice:</strong> The tools for calculating loans, EMIs, SIPs, taxes, and investments are not intended to be a substitute for professional financial advice. You should consult a certified financial planner, chartered accountant (CA), or tax advisor before making any financial commitments.
        </p>
        <p>
          <strong>No Medical Advice:</strong> Health-related calculators (such as BMI, BMR, Calorie, and Body Fat) provide general estimates based on standard health metrics. They are not intended to diagnose, treat, or provide medical advice. Always consult a qualified healthcare professional or doctor for personalized medical guidance.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">Changes in Rules and Regulations</h2>
        <p>
          Indian laws, tax brackets, EPF/PPF interest rates, and banking regulations are subject to regular updates by the Government of India and the Reserve Bank of India. While we strive to keep our calculators updated with the latest rules, there may be a delay in reflecting recent amendments. CalcMaster India is not responsible for any discrepancies arising from outdated formulas.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">Limitation of Liability</h2>
        <p>
          By using this website, you agree that CalcMaster India, its authors, and its owners shall not be held liable for any decisions made based on the results provided by these calculators. Users assume all responsibility and risk for the use of the website and the information provided herein.
        </p>
      </div>
    </div>
  );
}
