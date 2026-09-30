import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - CalcMaster India',
  description: 'Privacy Policy for CalcMaster India detailing data collection, usage, and your rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: September 30, 2026</p>
      
      <div className="prose prose-blue max-w-none text-gray-700">
        <p>
          Welcome to CalcMaster India. We respect your privacy and are committed to protecting it. This Privacy Policy explains how we handle any information you provide while using our website (https://calcmaster.in).
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">1. Data Collection & Processing</h2>
        <p>
          <strong>No Personal Financial Data Stored:</strong> All calculations performed on our website (such as EMI, SIP, Income Tax) are executed entirely in your web browser. We do not transmit, collect, or store any personal financial, health, or mathematical data entered into our calculators on our servers.
        </p>
        <p>
          <strong>Contact Information:</strong> If you use our contact form, we collect the name, email address, and message you provide solely for the purpose of responding to your inquiry.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">2. Cookies and Tracking</h2>
        <p>
          We use essential cookies to ensure our website functions correctly. In addition, we use third-party analytics tools (like Google Analytics) to understand how visitors interact with our site. These tools may use cookies to collect anonymous usage data, such as your IP address, browser type, and pages visited. This helps us improve our website and provide a better user experience.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">3. Third-Party Services</h2>
        <p>
          Our website may contain links to third-party websites or services that are not owned or controlled by CalcMaster India. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">4. Compliance with Indian Laws</h2>
        <p>
          This Privacy Policy is published in compliance with the provisions of the Information Technology Act, 2000, and the rules made thereunder, which require the publishing of privacy policy for the collection, use, storage, and transfer of sensitive personal data or information.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">5. Your Rights</h2>
        <p>
          You have the right to request the deletion of any contact information you have shared with us. Since we do not store calculator usage data, there is no personal data to delete in that regard.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">6. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>

        <h2 className="text-xl font-bold mt-6 mb-3">7. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at: <a href="mailto:contact@calcmaster.in" className="text-blue-600 hover:underline">contact@calcmaster.in</a>
        </p>
      </div>
    </div>
  );
}
