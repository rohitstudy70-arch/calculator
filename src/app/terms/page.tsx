import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - CalcMaster India',
  description: 'Terms of Service for using CalcMaster India online calculators.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 30, 2026</p>
      
      <div className="prose prose-blue max-w-none text-gray-700">
        <p>
          Please read these Terms of Service ("Terms") carefully before using the https://www.calcmaster.co.in website (the "Service") operated by CalcMaster India ("us", "we", or "our").
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">2. Use of Calculators and Tools</h2>
        <p>
          The calculators and tools provided on CalcMaster India are free to use. They are designed to provide estimated figures and general guidance. We do not guarantee the absolute accuracy of the results, as external factors, changing laws, and market conditions can impact actual figures.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">3. Disclaimer of Advice</h2>
        <p>
          The content and calculation results on this website do NOT constitute financial, legal, tax, medical, or professional advice. You should always consult with a qualified professional (such as a financial advisor, CA, or doctor) before making any significant decisions based on the information provided by our calculators.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, functionality, and design are and will remain the exclusive property of CalcMaster India. The Service is protected by copyright, trademark, and other laws of India.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">5. Limitation of Liability</h2>
        <p>
          In no event shall CalcMaster India, nor its creators, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">6. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts located in India.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">7. Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at: <a href="mailto:contact@calcmaster.in" className="text-blue-600 hover:underline">contact@calcmaster.in</a>
        </p>
      </div>
    </div>
  );
}
