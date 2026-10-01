export const ppfContent = {
  en: {
    pageTitle: 'PPF Calculator 2026 - Maturity & Interest | CalcMaster',
    metaDescription:
      'Calculate Public Provident Fund (PPF) maturity corpus, annual interest earned at 7.1%, and tax benefits under Section 80C. View 15-year EEE schedule.',
    h1: 'PPF Calculator – Plan Your 15-Year Tax-Free Wealth',
    introText: 'The Public Provident Fund (PPF) is one of the most popular long-term saving schemes in India, offering safety, attractive interest rates, and excellent tax benefits. Backed by the Government of India, it provides an EEE (Exempt-Exempt-Exempt) tax status. Our PPF calculator helps you estimate your maturity amount, total interest earned, and the yearly growth of your investment over the lock-in period and beyond.',
    howToUse: [
      'Enter your yearly deposit amount. This can be between ₹500 and ₹1,50,000 per financial year.',
      'Input the current PPF interest rate. The default is set to the current government rate (e.g., 7.1%).',
      'Select the tenure of your investment. The minimum lock-in is 15 years, but you can extend it in blocks of 5 years.',
      'The calculator will instantly display your total deposited amount, interest earned, and the final maturity amount.'
    ],
    formulaExplanation: 'The PPF interest is compounded annually. The formula used is FV = P × [((1 + r)^n - 1) / r] × (1 + r), where FV is the Maturity Amount, P is the Annual Deposit, r is the rate of interest (in decimal, so 7.1% becomes 0.071), and n is the number of years. The extra (1 + r) accounts for deposits made at the beginning of the year.',
    solvedExamples: [
      {
        title: 'Maximum Deposit Example',
        inputs: 'Annual Deposit: ₹1,50,000 | Interest Rate: 7.1% | Tenure: 15 Years',
        calculation: 'r = 0.071, n = 15. Maturity = 150000 × [((1 + 0.071)^15 - 1) / 0.071] × 1.071',
        result: 'Total Deposited: ₹22,50,000 | Total Interest: ₹18,18,209 | Maturity Amount: ₹40,68,209'
      },
      {
        title: 'Moderate Savings Example',
        inputs: 'Annual Deposit: ₹50,000 | Interest Rate: 7.1% | Tenure: 15 Years',
        calculation: 'r = 0.071, n = 15. Maturity = 50000 × [((1 + 0.071)^15 - 1) / 0.071] × 1.071',
        result: 'Total Deposited: ₹7,50,000 | Total Interest: ₹6,06,070 | Maturity Amount: ₹13,56,070'
      },
      {
        title: 'Extended Tenure Example',
        inputs: 'Annual Deposit: ₹1,00,000 | Interest Rate: 7.1% | Tenure: 25 Years',
        calculation: 'r = 0.071, n = 25. The account is extended twice by 5-year blocks.',
        result: 'Total Deposited: ₹25,00,000 | Total Interest: ₹47,53,108 | Maturity Amount: ₹72,53,108'
      }
    ],
    tips: [
      'Deposit your amount before the 5th of the month to maximize interest, as interest is calculated on the minimum balance between the 5th and the end of the month.',
      'Maximize your Section 80C benefits by investing the full limit of ₹1.5 Lakhs early in the financial year.',
      'Extend your PPF account in blocks of 5 years after the initial 15-year maturity to benefit from massive compounding.',
      'Even if you miss a year, you can revive your account by paying a nominal penalty of ₹50 along with the minimum deposit of ₹500.',
      'PPF offers an EEE status, meaning your deposits, accrued interest, and maturity amount are completely tax-free.'
    ],
    commonMistakes: [
      'Depositing money after the 5th of the month and losing out on that month\'s interest.',
      'Withdrawing funds prematurely unless absolutely necessary, thereby breaking the chain of compounding.',
      'Forgetting to make the minimum ₹500 deposit in a financial year, causing the account to become inactive.',
      'Opening multiple PPF accounts in your name, which is illegal under Indian postal rules.'
    ],
    faqs: [
      {
        question: 'What is the current PPF interest rate?',
        answer: 'The PPF interest rate is determined by the Ministry of Finance, Government of India, and is reviewed every quarter. Currently, it is around 7.1% p.a.'
      },
      {
        question: 'Is PPF interest tax-free?',
        answer: 'Yes, PPF comes under the EEE (Exempt-Exempt-Exempt) category. The deposits made qualify for deduction under Section 80C, and both the interest earned and the maturity amount are completely exempt from income tax.'
      },
      {
        question: 'Can I withdraw money before 15 years?',
        answer: 'Partial withdrawals are allowed from the 7th financial year onwards. However, complete withdrawal is only possible on maturity (15 years) or under specific conditions like life-threatening diseases.'
      },
      {
        question: 'Can I extend my PPF account after 15 years?',
        answer: 'Yes, you can extend your PPF account indefinitely in blocks of 5 years. You have the option to extend it with or without making further deposits.'
      },
      {
        question: 'What is the minimum and maximum investment in PPF?',
        answer: 'The minimum investment required to keep a PPF account active is ₹500 per financial year. The maximum amount you can deposit is ₹1,50,000 per financial year.'
      },
      {
        question: 'Can an NRI open a PPF account?',
        answer: 'No, Non-Resident Indians (NRIs) cannot open a new PPF account. However, if a resident Indian opened an account and subsequently became an NRI, they can continue the account until maturity.'
      },
      {
        question: 'How is PPF interest calculated?',
        answer: 'Interest is calculated monthly on the lowest balance between the close of the 5th day and the end of the month, but it is credited to the account annually at the end of the financial year.'
      },
      {
        question: 'Can I take a loan against my PPF account?',
        answer: 'Yes, you can take a loan against your PPF balance between the 3rd and 6th financial year of opening the account. The interest rate on the loan is 1% higher than the prevailing PPF interest rate.'
      }
    ],
    relatedCalculators: [
      {
        name: 'Fixed Deposit (FD) Calculator',
        slug: '/fd-calculator',
        description: 'Calculate your returns on Fixed Deposits.'
      },
      {
        name: 'SIP Calculator',
        slug: '/sip-calculator',
        description: 'Calculate returns for your mutual fund SIPs.'
      }
    ]
  },
  hi: {
    pageTitle: 'पीपीएफ कैलकुलेटर - पब्लिक प्रोविडेंट फंड कैलकुलेटर | CalcMaster',
    metaDescription: 'पीपीएफ कैलकुलेटर का उपयोग करके अपनी मैच्योरिटी राशि, अर्जित ब्याज और टैक्स छूट की गणना करें।',
    h1: 'पीपीएफ कैलकुलेटर (PPF Calculator)',
    introText: 'पब्लिक प्रोविडेंट फंड (PPF) भारत सरकार द्वारा समर्थित एक सुरक्षित और लोकप्रिय निवेश योजना है। यह EEE (Exempt-Exempt-Exempt) टैक्स लाभ प्रदान करती है। हमारा पीपीएफ कैलकुलेटर आपको आपकी निवेश राशि पर मिलने वाले कुल ब्याज और मैच्योरिटी राशि की गणना करने में मदद करता है।',
    howToUse: [
      'अपना वार्षिक जमा राशि दर्ज करें (₹500 से ₹1,50,000 के बीच)।',
      'वर्तमान पीपीएफ ब्याज दर दर्ज करें (डिफ़ॉल्ट 7.1% है)।',
      'निवेश की अवधि चुनें (न्यूनतम 15 वर्ष)।',
      'कैलकुलेट पर क्लिक करें और परिणाम देखें।'
    ],
    formulaExplanation: 'पीपीएफ का ब्याज वार्षिक रूप से संयोजित होता है। सूत्र है: FV = P × [((1 + r)^n - 1) / r] × (1 + r)। यहाँ P वार्षिक जमा है, r ब्याज दर है और n वर्षों की संख्या है।',
    solvedExamples: [
      {
        title: 'अधिकतम निवेश का उदाहरण',
        inputs: 'वार्षिक जमा: ₹1,50,000 | ब्याज दर: 7.1% | अवधि: 15 वर्ष',
        calculation: 'r = 0.071, n = 15',
        result: 'कुल जमा: ₹22,50,000 | कुल ब्याज: ₹18,18,209 | मैच्योरिटी राशि: ₹40,68,209'
      },
      {
        title: 'मध्यम बचत का उदाहरण',
        inputs: 'वार्षिक जमा: ₹50,000 | ब्याज दर: 7.1% | अवधि: 15 वर्ष',
        calculation: 'r = 0.071, n = 15',
        result: 'कुल जमा: ₹7,50,000 | कुल ब्याज: ₹6,06,070 | मैच्योरिटी राशि: ₹13,56,070'
      },
      {
        title: 'विस्तारित अवधि का उदाहरण',
        inputs: 'वार्षिक जमा: ₹1,00,000 | ब्याज दर: 7.1% | अवधि: 25 वर्ष',
        calculation: 'r = 0.071, n = 25',
        result: 'कुल जमा: ₹25,00,000 | कुल ब्याज: ₹47,53,108 | मैच्योरिटी राशि: ₹72,53,108'
      }
    ],
    tips: [
      'महीने की 5 तारीख से पहले अपनी राशि जमा करें ताकि उस महीने का ब्याज मिल सके।',
      'सेक्शन 80C के तहत 1.5 लाख रुपये तक की टैक्स छूट का पूरा लाभ उठाएं।',
      '15 साल बाद अपने पीपीएफ खाते को 5 साल के ब्लॉक में बढ़ाएं।',
      'यदि आप किसी वर्ष जमा करना भूल जाते हैं, तो ₹50 का जुर्माना देकर खाते को फिर से चालू करें।',
      'पीपीएफ में निवेश, ब्याज और मैच्योरिटी राशि पूरी तरह से टैक्स-फ्री है।'
    ],
    commonMistakes: [
      '5 तारीख के बाद पैसा जमा करना, जिससे उस महीने का ब्याज नहीं मिलता।',
      'समय से पहले पैसे निकालना, जिससे कंपाउंडिंग का लाभ कम हो जाता है।',
      'न्यूनतम ₹500 जमा करना भूल जाना।',
      'अपने नाम पर कई पीपीएफ खाते खोलना, जो नियमों के खिलाफ है।'
    ],
    faqs: [
      {
        question: 'वर्तमान पीपीएफ ब्याज दर क्या है?',
        answer: 'वर्तमान पीपीएफ ब्याज दर लगभग 7.1% प्रति वर्ष है। सरकार हर तिमाही इसकी समीक्षा करती है।'
      },
      {
        question: 'क्या पीपीएफ पर ब्याज टैक्स-फ्री है?',
        answer: 'हां, पीपीएफ EEE श्रेणी में आता है, जिसका अर्थ है कि मूलधन, ब्याज और मैच्योरिटी राशि पूरी तरह टैक्स-फ्री है।'
      },
      {
        question: 'क्या मैं 15 साल से पहले पैसे निकाल सकता हूँ?',
        answer: '7वें वित्तीय वर्ष से आंशिक निकासी की अनुमति है, लेकिन पूरा पैसा केवल 15 साल बाद निकाला जा सकता है।'
      },
      {
        question: 'क्या मैं 15 साल बाद खाता बढ़ा सकता हूँ?',
        answer: 'हां, आप इसे 5 साल के ब्लॉक में कितनी भी बार बढ़ा सकते हैं।'
      },
      {
        question: 'न्यूनतम और अधिकतम निवेश कितना है?',
        answer: 'न्यूनतम निवेश ₹500 और अधिकतम ₹1,50,000 प्रति वित्तीय वर्ष है।'
      },
      {
        question: 'क्या एनआरआई पीपीएफ खाता खोल सकते हैं?',
        answer: 'नहीं, नए पीपीएफ खाते एनआरआई द्वारा नहीं खोले जा सकते।'
      },
      {
        question: 'पीपीएफ ब्याज की गणना कैसे की जाती है?',
        answer: 'ब्याज की गणना हर महीने 5 तारीख और महीने के अंत के बीच के न्यूनतम बैलेंस पर की जाती है।'
      },
      {
        question: 'क्या मैं पीपीएफ खाते पर लोन ले सकता हूँ?',
        answer: 'हां, खाता खोलने के तीसरे से छठे वित्तीय वर्ष के बीच लोन लिया जा सकता है।'
      }
    ],
    relatedCalculators: [
      {
        name: 'एफडी कैलकुलेटर (FD Calculator)',
        slug: '/fd-calculator',
        description: 'फिक्स्ड डिपॉजिट पर अपने रिटर्न की गणना करें।'
      },
      {
        name: 'सिप कैलकुलेटर (SIP Calculator)',
        slug: '/sip-calculator',
        description: 'म्यूचुअल फंड एसआईपी के लिए रिटर्न की गणना करें।'
      }
    ]
  }
};
