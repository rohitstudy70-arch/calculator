import React, { Suspense } from 'react';
import { Metadata } from 'next';
import SSYCalculator from '@/components/calculators/SSYCalculator';
import { ssyContent } from '@/data/calculator-content/ssy';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { FAQ } from '@/components/ui/FAQ';
import { AdSlot } from '@/components/ui/AdSlot';
import { LastUpdated } from '@/components/ui/LastUpdated';
import Link from 'next/link';

export const metadata: Metadata = {
  title: ssyContent.en.pageTitle,
  description: ssyContent.en.metaDescription,
  alternates: {
    canonical: 'https://www.calcmaster.co.in/sukanya-samriddhi-calculator',
  },
  openGraph: {
    title: ssyContent.en.pageTitle,
    description: ssyContent.en.metaDescription,
    url: 'https://www.calcmaster.co.in/sukanya-samriddhi-calculator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: ssyContent.en.pageTitle,
    description: ssyContent.en.metaDescription,
  },
};

export default function SSYCalculatorPage() {
  const content = ssyContent.en;

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Investment Calculators', href: '/category/investment' },
    { label: 'SSY Calculator' },
  ];

  const allFaqs = [...content.faqs, ...ssyContent.hi.faqs];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sukanya Samriddhi Yojana (SSY) Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Calculate Sukanya Samriddhi Yojana (SSY) Maturity and Download PDF Report',
    description: 'Step-by-step guide to calculating 21-year SSY maturity corpus and downloading the annual calculation PDF schedule.',
    step: content.howToUse.map((step, idx) => ({
      '@type': 'HowToStep',
      position: idx + 1,
      name: `Step ${idx + 1}`,
      text: step,
    })),
  };

  // SSY Master Chart data for 2026
  const ssyChartRows = [
    { monthly: '₹500', yearly: '₹6,000', deposit: '₹90,000', interest: '₹1,97,112', maturity: '₹2,87,112', highlight: false },
    { monthly: '₹1,000', yearly: '₹12,000', deposit: '₹1,80,000', interest: '₹3,94,225', maturity: '₹5,74,225', highlight: false },
    { monthly: '₹2,000', yearly: '₹24,000', deposit: '₹3,60,000', interest: '₹7,88,450', maturity: '₹11,48,450', highlight: true, tag: 'Most Popular (₹2000)' },
    { monthly: '₹3,000', yearly: '₹36,000', deposit: '₹5,40,000', interest: '₹11,82,674', maturity: '₹17,22,674', highlight: false },
    { monthly: '₹5,000', yearly: '₹60,000', deposit: '₹9,00,000', interest: '₹19,71,124', maturity: '₹28,71,124', highlight: false },
    { monthly: '₹10,000', yearly: '₹1,20,000', deposit: '₹18,00,000', interest: '₹39,42,248', maturity: '₹57,42,248', highlight: false },
    { monthly: '₹12,500', yearly: '₹1,50,000', deposit: '₹22,50,000', interest: '₹49,27,810', maturity: '₹71,77,810', highlight: true, tag: 'Max 80C Cap' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      <Breadcrumb items={breadcrumbs} />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold tracking-wide uppercase">
            Govt Sovereign Scheme 2026
          </span>
          <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-semibold">
            8.2% p.a. • Triple EEE Tax-Free
          </span>
          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
            Post Office • SBI • HDFC Bank
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {content.h1}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl">
          {content.introText}
        </p>
      </div>

      {/* Direct Calculation Snippet Cards (₹2000 Monthly & Maximum ₹1.5 Lakh) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20 p-5 rounded-2xl border-2 border-pink-200 dark:border-pink-800 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/60 px-2.5 py-1 rounded-md">
              सुकन्या समृद्धि योजना 2000 प्रति माह
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">8.2% Interest</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white my-2">
            ₹11,48,450 <span className="text-sm font-normal text-gray-600 dark:text-gray-400">मैच्योरिटी (21 वर्ष)</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>कुल जमा (15 वर्ष × ₹24,000):</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹3,60,000</span>
            </div>
            <div className="flex justify-between">
              <span>कुल ब्याज कमाई (8.2%):</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹7,88,450</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 p-5 rounded-2xl border-2 border-blue-200 dark:border-blue-800 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/60 px-2.5 py-1 rounded-md">
              Maximum ₹1.5 Lakh / Year (80C Cap)
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">100% Tax Free</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white my-2">
            ₹71,77,810 <span className="text-sm font-normal text-gray-600 dark:text-gray-400">मैच्योरिटी राशि</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <div className="flex justify-between">
              <span>कुल जमा (15 वर्ष × ₹1,50,000):</span>
              <span className="font-semibold text-gray-900 dark:text-white">₹22,50,000</span>
            </div>
            <div className="flex justify-between">
              <span>कुल ब्याज कमाई (8.2%):</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹49,27,810</span>
            </div>
          </div>
        </div>
      </div>

      <div id="calculator-top">
        <Suspense
          fallback={
            <div className="animate-pulse bg-gray-200 dark:bg-gray-800 rounded-2xl h-96 w-full" />
          }
        >
          <SSYCalculator />
        </Suspense>
      </div>

      <div className="my-12">
        <AdSlot id="ssy-leaderboard-1" height={90} className="rounded-xl overflow-hidden" />
      </div>

      <article className="prose prose-blue dark:prose-invert max-w-none space-y-12">
        {/* Master SSY Chart Section (सुकन्या समृद्धि योजना चार्ट) */}
        <section className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm not-prose">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                सुकन्या समृद्धि योजना चार्ट 2026 (SSY Maturity Chart)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                8.2% प्रति वर्ष ब्याज दर के आधार पर 15 साल जमा और 21 साल की पूर्ण मैच्योरिटी सूची:
              </p>
            </div>
            <span className="self-start sm:self-auto px-3 py-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 rounded-lg text-xs font-semibold">
              Post Office & All Banks
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">
                  <th className="py-3 px-4 font-semibold">प्रति माह जमा (Monthly)</th>
                  <th className="py-3 px-4 font-semibold">प्रति वर्ष जमा (Yearly)</th>
                  <th className="py-3 px-4 font-semibold">कुल निवेश (15 वर्ष)</th>
                  <th className="py-3 px-4 font-semibold">कुल ब्याज (8.2%)</th>
                  <th className="py-3 px-4 font-semibold">21 वर्ष मैच्योरिटी राशि</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {ssyChartRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`transition-colors ${
                      row.highlight
                        ? 'bg-pink-50/70 dark:bg-pink-950/20 font-medium'
                        : 'hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
                    }`}
                  >
                    <td className="py-3 px-4 text-gray-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{row.monthly}</span>
                        {row.tag && (
                          <span className="text-[10px] bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-1.5 py-0.5 rounded font-semibold">
                            {row.tag}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.yearly}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{row.deposit}</td>
                    <td className="py-3 px-4 text-emerald-600 dark:text-emerald-400 font-semibold">{row.interest}</td>
                    <td className="py-3 px-4 font-bold text-pink-700 dark:text-pink-400 text-base">{row.maturity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 italic">
            *नोट: यह चार्ट सरकार द्वारा घोषित वर्तमान 8.2% वार्षिक चक्रवृद्धि ब्याज दर के अनुसार है। ब्याज तिमाही आधार पर संशोधित होता है।
          </p>
        </section>

        {/* 7 Key Rules Section (सुकन्या समृद्धि योजना के नियम) */}
        <section className="not-prose">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            सुकन्या समृद्धि योजना के 7 मुख्य नियम (SSY Rules 2026)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                1
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">बालिका की आयु सीमा (Age Limit)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                खाता बेटी के जन्म से लेकर अधिकतम 10 वर्ष की उम्र तक खोला जा सकता है। 10 वर्ष से अधिक उम्र की बेटियों के लिए खाता मान्य नहीं है।
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                2
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">15 वर्ष जमा vs 21 वर्ष मैच्योरिटी</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                पैसे केवल पहले 15 वर्षों तक जमा करने होते हैं। अगले 6 वर्ष (16वें से 21वें वर्ष तक) बिना किसी जमा के पूरे फंड पर 8.2% चक्रवृद्धि ब्याज मिलता रहता है।
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                3
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">जमा सीमा (Deposit Limits)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                न्यूनतम जमा राशि ₹250 प्रति वर्ष है और अधिकतम ₹1,50,000 प्रति वित्तीय वर्ष (80C की अधिकतम सीमा)। यदि ₹250 जमा न हो, तो ₹50 पेनल्टी देकर खाता दोबारा चालू हो सकता है।
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                4
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">100% टैक्स फ्री (Triple EEE)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                जमा राशि पर धारा 80C के तहत टैक्स छूट, हर साल जुड़ने वाला ब्याज पूरी तरह कर-मुक्त, और 21 साल बाद मिलने वाली मैच्योरिटी राशि पर ₹0 इनकम टैक्स लगता है।
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                5
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">50% आंशिक निकासी (Higher Education)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                बेटी के 18 वर्ष का होने या 10वीं कक्षा उत्तीर्ण करने के बाद उच्च शिक्षा की फीस हेतु पिछले वित्तीय वर्ष के बैलेंस का 50% तक निकाला जा सकता है।
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-300 rounded-lg flex items-center justify-center font-bold text-lg mb-3">
                6
              </div>
              <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">खातों की सीमा (Max 2 Girls)</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                एक परिवार में केवल दो बेटियों के लिए खाता खोला जा सकता है। यदि पहली बेटी के बाद जुड़वां (Twins) बेटियां हों, तो तीनों के लिए खाता मान्य होता है।
              </p>
            </div>
          </div>
        </section>

        {/* Post Office vs SBI vs HDFC Comparison */}
        <section className="bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 not-prose">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Office vs SBI vs HDFC Bank Sukanya Samriddhi Yojana (कहाँ खाता खोलें?)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            कई लोग सोचते हैं कि डाकघर (Post Office) में ब्याज दर अधिक होती है या SBI में अलग नियम होते हैं। वास्तविकता यह है कि ब्याज दर और सरकारी गारंटी 100% समान है:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">📮 Post Office (डाकघर)</div>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>ब्याज दर:</strong> 8.2% p.a. (सरकार द्वारा निर्धारित)</li>
                <li>• <strong>उपलब्धता:</strong> भारत के हर पिन कोड और ग्रामीण क्षेत्रों में उपलब्ध</li>
                <li>• <strong>पासबुक:</strong> भौतिक मुद्रित पासबुक काउंटर पर मिलती है</li>
                <li>• <strong>सुझाव:</strong> यदि आपके पास नेटबैंकिंग नहीं है और पासबुक से ट्रैक करना पसंद करते हैं</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">🏛️ State Bank of India (SBI)</div>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>ब्याज दर:</strong> 8.2% p.a. (समान सरकारी दर)</li>
                <li>• <strong>डिजिटल सुविधा:</strong> YONO ऐप और SBI नेट बैंकिंग से ऑनलाइन ट्रांसफर</li>
                <li>• <strong>ऑटो-डेबिट:</strong> मासिक स्थायी निर्देश (Standing Instruction) की सुविधा</li>
                <li>• <strong>सुझाव:</strong> सबसे बड़ा सार्वजनिक बैंक, ऑनलाइन ट्रांजेक्शन के लिए आदर्श</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">🏦 HDFC / ICICI Bank</div>
              <ul className="text-xs text-gray-600 dark:text-gray-300 space-y-2">
                <li>• <strong>ब्याज दर:</strong> 8.2% p.a. (पूर्णतः सरकारी दर)</li>
                <li>• <strong>डिजिटल सुविधा:</strong> नेट बैंकिंग से त्वरित ऑनलाइन जमा और ई-स्टेटमेंट</li>
                <li>• <strong>खाता ट्रांसफर:</strong> एक शहर से दूसरे शहर आसानी से ऑनलाइन ट्रांसफर</li>
                <li>• <strong>सुझाव:</strong> निजी बैंक खाताधारकों के लिए निर्बाध मासिक निवेश</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Free PDF Report Guide */}
        <section className="bg-pink-50 dark:bg-pink-950/20 border border-pink-200 dark:border-pink-800 p-6 rounded-2xl not-prose flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-900/50 px-2.5 py-1 rounded-md">
              Free PDF Download Feature
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-1">
              सुकन्या समृद्धि योजना कैलकुलेटर PDF रिपोर्ट डाउनलोड करें
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              कैलकुलेटर में अपनी जमा राशि और बेटी की आयु डालने के बाद &quot;Export PDF&quot; बटन दबाएं। आपको 21 वर्षों का वर्ष-वार जमा, ब्याज और क्लोजिंग बैलेंस का पूरा प्रिंट-रेडी चार्ट मिल जाएगा।
            </p>
          </div>
          <a
            href="#calculator-top"
            className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl shadow-md transition-all whitespace-nowrap text-sm inline-block text-center"
          >
            कैलकुलेटर पर जाएं &amp; PDF लें ↑
          </a>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            How to Use the Sukanya Samriddhi Yojana (SSY) Calculator
          </h2>
          <ol className="list-decimal pl-6 space-y-2 mt-4 text-gray-700 dark:text-gray-300">
            {content.howToUse.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            SSY Compounding Rules & Formula Explained
          </h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">{content.formulaExplanation}</p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.solvedExamples?.map((example, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <h3 className="font-bold text-lg mb-2">{example.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{example.inputs}</p>
                <p className="text-sm font-mono bg-white dark:bg-gray-900 p-2 rounded mb-2 overflow-x-auto">
                  {example.calculation}
                </p>
                <p className="font-semibold text-pink-700 dark:text-pink-400">{example.result}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Tips for SSY Account Holders
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.tips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Common Mistakes to Avoid
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
              {content.commonMistakes?.map((mistake, idx) => (
                <li key={idx}>{mistake}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Frequently Asked Questions (FAQs)
          </h2>
          <FAQ items={content.faqs} />
        </section>

        {/* Google People Also Ask (PAA) Section in Hindi */}
        <section className="mt-12 bg-gradient-to-br from-pink-50/50 via-white to-slate-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl border border-pink-200/80 dark:border-gray-700 not-prose shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-2.5 h-7 bg-pink-600 rounded-full inline-block"></span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                People Also Ask (अक्सर पूछे जाने वाले सवाल)
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                सुकन्या समृद्धि योजना से संबंधित सबसे ज्यादा पूछे जाने वाले प्रश्नों के आधिकारिक व सटीक उत्तर:
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {ssyContent.hi.faqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white dark:bg-gray-800/90 rounded-xl border border-gray-200 dark:border-gray-700 p-4 transition-all hover:border-pink-300 dark:hover:border-pink-700 open:ring-2 open:ring-pink-500/20"
                open={idx < 4}
              >
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center text-base">
                  <span className="text-gray-900 dark:text-pink-100">{faq.question}</span>
                  <span className="text-pink-600 dark:text-pink-400 group-open:rotate-180 transition-transform ml-2 shrink-0">▼</span>
                </summary>
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700/60 pt-3">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Related Government & Investment Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {content.relatedCalculators?.map((calc, idx) => (
              <Link key={idx} href={calc.slug.startsWith('/') ? calc.slug : `/${calc.slug}`} className="block group">
                <div className="h-full bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-pink-500 dark:hover:border-pink-400 transition-colors shadow-sm">
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 mb-2">
                    {calc.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {calc.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>

      <LastUpdated date="2026-10-20" />
    </div>
  );
}
