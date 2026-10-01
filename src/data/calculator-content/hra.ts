export const hraContent = {
  en: {
    pageTitle: 'HRA Calculator 2026 - Calculate House Rent Allowance Tax Exemption',
    metaDescription: 'Free HRA exemption calculator to compute tax-exempt house rent allowance and taxable HRA under Section 10(13A) of the Income Tax Act.',
    h1: 'HRA Exemption Calculator – Calculate Your Tax Savings on House Rent',
    introText:
      'House Rent Allowance (HRA) is an essential component of salary packages in India. Under Section 10(13A) and Rule 2A of the Income Tax Act, salaried individuals living in rented accommodations can claim substantial income tax exemption, reducing their taxable salary burden.',
    howToUse: [
      'Enter your monthly Basic Salary and Dearness Allowance (DA).',
      'Input the monthly HRA received from your employer (as shown on your salary slip).',
      'Enter the actual monthly rent paid to your landlord.',
      'Select whether your rented accommodation is situated in a Metro city (Delhi, Mumbai, Kolkata, Chennai) or Non-Metro city.',
      'Instantly see your monthly and annual exempt HRA, taxable HRA, and which statutory limit rule was applied.',
    ],
    formulaExplanation:
      'As per Income Tax Rule 2A, the exempt HRA amount is the MINIMUM of the following three statutory calculations:\n1. Actual HRA received from employer\n2. 50% of (Basic Salary + DA) for Metro cities (Delhi, Mumbai, Kolkata, Chennai) OR 40% of (Basic Salary + DA) for Non-Metro cities\n3. Actual rent paid MINUS 10% of (Basic Salary + DA)\nThe remaining HRA (Actual HRA minus Exempt HRA) is added to your taxable income under the Old Tax Regime.',
    solvedExamples: [
      {
        title: 'Metro City Resident (Delhi)',
        inputs: 'Basic Salary: ₹60,000/mo | HRA Received: ₹25,000/mo | Rent Paid: ₹30,000/mo | City: Metro (50%)',
        calculation:
          '1) Actual HRA = ₹25,000\n2) 50% of Basic = ₹30,000\n3) Rent - 10% Basic = ₹30,000 - ₹6,000 = ₹24,000\nLowest is Limit 3 (₹24,000/mo).',
        result:
          'Monthly Exempt HRA: ₹24,000 | Monthly Taxable HRA: ₹1,000 | Annual Tax-Free HRA: ₹2,88,000 | Estimated Tax Saved: ~₹89,850/year',
      },
      {
        title: 'Non-Metro City Resident (Pune)',
        inputs: 'Basic Salary: ₹50,000/mo | HRA Received: ₹20,000/mo | Rent Paid: ₹22,000/mo | City: Non-Metro (40%)',
        calculation:
          '1) Actual HRA = ₹20,000\n2) 40% of Basic = ₹20,000\n3) Rent - 10% Basic = ₹22,000 - ₹5,000 = ₹17,000\nLowest is Limit 3 (₹17,000/mo).',
        result:
          'Monthly Exempt HRA: ₹17,000 | Monthly Taxable HRA: ₹3,000 | Annual Tax-Free HRA: ₹2,04,000 | Estimated Tax Saved: ~₹63,650/year',
      },
      {
        title: 'Low Rent Accommodation (Zero Exemption)',
        inputs: 'Basic Salary: ₹80,000/mo | HRA Received: ₹30,000/mo | Rent Paid: ₹6,000/mo | City: Metro',
        calculation:
          '10% of Basic is ₹8,000. Because rent paid (₹6,000) is less than 10% of basic, Condition 3 results in ₹0.',
        result:
          'Monthly Exempt HRA: ₹0 | Monthly Taxable HRA: ₹30,000 (Full HRA is taxable) | Annual Taxable HRA: ₹3,60,000',
      },
    ],
    tips: [
      'HRA tax exemption can only be claimed under the Old Tax Regime; the default New Tax Regime does not allow HRA exemption.',
      'If your annual rent paid exceeds ₹1,00,000 (₹8,333/month), submitting your landlord’s PAN to your employer is mandatory as per CBDT regulations.',
      'You can pay rent to your parents if you live in their house and they declare this rental income in their income tax returns.',
      'Always maintain rent receipts, valid rental agreement, and digital bank transfer proof in case the Income Tax Department requests verification during scrutiny.',
      'You can claim both Home Loan tax benefits (Principal 80C & Interest Section 24b) and HRA simultaneously if your purchased house is in a different city or rented out due to employment.',
    ],
    commonMistakes: [
      'Assuming that the full amount of rent paid or full HRA received is automatically tax-exempt.',
      'Trying to claim HRA when living in a self-owned property or without paying actual rent.',
      'Paying rent in cash without rent receipts or landlord PAN, leading to employer rejection at year-end proof submission.',
      'Paying rent to a spouse (income tax tribunals do not allow rent paid to husband/wife as a valid deduction).',
    ],
    faqs: [
      {
        question: 'Which cities count as Metro for 50% HRA exemption?',
        answer:
          'Under Income Tax Rule 2A, only four cities are classified as Metro cities for the 50% limit: Delhi, Mumbai, Kolkata, and Chennai. All other cities (including Bengaluru, Hyderabad, Pune, Gurugram, and Ahmedabad) fall under the 40% non-metro category.',
      },
      {
        question: 'Is HRA exemption available in the New Tax Regime?',
        answer:
          'No. Under Section 115BAC (New Tax Regime), most exemptions and deductions including House Rent Allowance (HRA) under Section 10(13A) are not available. HRA can only be claimed under the Old Tax Regime.',
      },
      {
        question: 'Can I pay rent to my parents and claim HRA?',
        answer:
          'Yes, you can legally pay rent to your parents if the property is registered in their name. Your parents must include this rental income in their income tax returns. You should execute a formal rent agreement and transfer rent via bank transfer.',
      },
      {
        question: 'Is landlord PAN mandatory for claiming HRA?',
        answer:
          'If the total annual rent paid exceeds ₹1,00,000 in a financial year (i.e., more than ₹8,333 per month), it is mandatory to provide the PAN of the landlord to your employer.',
      },
      {
        question: 'Can I claim both HRA and Home Loan tax deduction?',
        answer:
          'Yes. If you own a house in one city (or far from your workplace) and live in rented accommodation in another city for employment reasons, you can claim HRA exemption on rent paid as well as Section 24(b) and Section 80C deductions on your home loan.',
      },
      {
        question: 'What if my employer does not provide HRA in my CTC?',
        answer:
          'If you are a salaried individual or self-employed person who does not receive HRA from an employer but pays rent, you can claim a deduction under Section 80GG (up to ₹5,000 per month or ₹60,000 per year, subject to conditions).',
      },
      {
        question: 'What documents are required to claim HRA from an employer?',
        answer:
          'Employers typically require: 1) Monthly rent receipts signed by the landlord, 2) Copy of the registered/notarized Lease & Rent Agreement, and 3) Landlord’s PAN if annual rent exceeds ₹1,00,000.',
      },
      {
        question: 'How is HRA calculated if I change my rented house or salary mid-year?',
        answer:
          'If your basic salary, HRA component, or rent paid changes during the financial year, the HRA exemption must be calculated separately on a monthly basis for each period and then aggregated for the year.',
      },
    ],
    relatedCalculators: [
      { name: 'Salary In-Hand Calculator', slug: 'salary-calculator', description: 'Convert your CTC into monthly take-home pay with detailed tax and PF deductions.' },
      { name: 'Income Tax Calculator', slug: 'income-tax-calculator', description: 'Compare Old vs New Tax Regime to see if claiming HRA saves you more tax.' },
      { name: 'Home Loan EMI Calculator', slug: 'home-loan-calculator', description: 'Calculate home loan EMIs and compare the financial benefits of buying vs renting.' },
    ],
  },
  hi: {
    pageTitle: 'एचआरए कैलकुलेटर 2026 - मकान किराया भत्ता टैक्स छूट की गणना करें',
    metaDescription: 'आयकर अधिनियम की धारा 10(13A) के तहत अपने कर-मुक्त एचआरए और कर योग्य राशि का तुरंत अनुमान लगाएं।',
    h1: 'एचआरए छूट कैलकुलेटर – मकान किराए पर मिलने वाली टैक्स छूट जानें',
    introText:
      'मकान किराया भत्ता (HRA) वेतनभोगी कर्मचारियों को किराए के घर में रहने पर मिलने वाला एक महत्वपूर्ण घटक है। आयकर कानून की धारा 10(13A) और नियम 2A के अनुसार आप किराए पर भारी टैक्स छूट प्राप्त कर सकते हैं।',
    howToUse: [
      'अपना मासिक मूल वेतन (Basic Salary) और महंगाई भत्ता (DA) दर्ज करें।',
      'नियोक्ता से प्राप्त होने वाला मासिक एचआरए (HRA) दर्ज करें।',
      'मकान मालिक को चुकाया जाने वाला वास्तविक मासिक किराया भरें।',
      'चुनें कि आपका किराए का घर मेट्रो शहर (दिल्ली, मुंबई, कोलकाता, चेन्नई) में है या गैर-मेट्रो में।',
      'तुरंत देखें कि आपको हर महीने और सालाना कितनी टैक्स छूट मिलेगी।',
    ],
    tips: [
      'एचआरए टैक्स छूट का लाभ केवल पुरानी टैक्स व्यवस्था (Old Tax Regime) में ही मिलता है, नई व्यवस्था में नहीं।',
      'यदि आपका सालाना किराया ₹1,00,000 से अधिक है, तो मकान मालिक का पैन कार्ड (PAN) देना अनिवार्य है।',
      'यदि आप माता-पिता के घर में रहते हैं, तो उन्हें किराया देकर भी वैध रूप से एचआरए छूट ली जा सकती है।',
    ],
    faqs: [
      {
        question: 'मेट्रो शहर की 50% छूट किन शहरों पर लागू होती है?',
        answer: 'आयकर नियमों के अनुसार केवल 4 शहर - दिल्ली, मुंबई, कोलकाता और चेन्नई ही 50% मेट्रो श्रेणी में आते हैं। बाकी सभी शहर (जैसे बेंगलुरु, पुणे, हैदराबाद) 40% गैर-मेट्रो श्रेणी में आते हैं।',
      },
      {
        question: 'क्या नई टैक्स व्यवस्था में एचआरए छूट मिलती है?',
        answer: 'नहीं, नई टैक्स व्यवस्था (New Tax Regime) के तहत एचआरए छूट उपलब्ध नहीं है। यह छूट केवल पुरानी टैक्स व्यवस्था में ही क्लेम की जा सकती है।',
      },
      {
        question: 'क्या मैं माता-पिता को किराया देकर एचआरए क्लेम कर सकता हूँ?',
        answer: 'हां, यदि संपत्ति माता-पिता के नाम पर है, तो आप उन्हें बैंक के जरिए किराया देकर और रेंट एग्रीमेंट बनाकर वैध रूप से एचआरए छूट ले सकते हैं।',
      },
      {
        question: 'एचआरए छूट की गणना का क्या नियम है?',
        answer: 'एचआरए छूट तीन सीमाओं में से सबसे कम राशि पर मिलती है: 1) वास्तविक प्राप्त एचआरए, 2) मूल वेतन का 50% (मेट्रो) या 40% (गैर-मेट्रो), 3) चुकाया गया किराया माइनस मूल वेतन का 10%।',
      },
    ],
  },
};
