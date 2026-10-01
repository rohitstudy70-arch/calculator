export const gratuityContent = {
  en: {
    pageTitle: 'Gratuity Calculator 2026 - Calculate Gratuity Amount & Tax Exemption',
    metaDescription: 'Free Gratuity calculator to calculate statutory gratuity payout and ₹20 Lakh tax-exempt limit under the Payment of Gratuity Act 1972 in India.',
    h1: 'Gratuity Calculator – Calculate Your Statutory Gratuity Benefit',
    introText:
      'Gratuity is a statutory monetary benefit provided by employers in India to employees in recognition of their long and meritorious service. Governed by the Payment of Gratuity Act, 1972, employees who complete at least 5 years of continuous service are entitled to a lump-sum gratuity payout upon resignation, retirement, or superannuation.',
    howToUse: [
      'Enter your last drawn monthly Basic Salary and Dearness Allowance (DA).',
      'Enter your total years of continuous service with your employer (e.g., 6.5 years).',
      'Select whether your establishment is "Covered under Payment of Gratuity Act, 1972" (applies to most private companies with 10+ employees) or "Not Covered".',
      'Instantly view your calculated gratuity amount, the tax-exempt portion (up to the statutory ₹20 Lakh limit), and any taxable surplus.',
    ],
    formulaExplanation:
      'The gratuity formula depends on whether the organization is covered under the Payment of Gratuity Act:\n\n1. Covered under the Act:\nGratuity = (15 × Last Drawn Basic Salary + DA × Tenure in Years) ÷ 26\n(Note: 26 represents working days in a month. Any service period of 6 months or more in a fractional year is rounded up to the next full year).\n\n2. Not Covered under the Act:\nGratuity = (15 × Last Drawn Basic Salary + DA × Completed Years of Service) ÷ 30\n(Note: Equivalent to 0.5 × Salary × Completed Years. Fractional months are ignored).\n\nStatutory Tax Exemption Limit: The maximum tax-free gratuity under Section 10(10) of the Income Tax Act is ₹20,00,000 (₹20 Lakhs).',
    solvedExamples: [
      {
        title: 'Corporate Employee (Covered under Act, 8.5 Years Service)',
        inputs: 'Last Drawn Basic + DA: ₹65,000/mo | Service: 8 Years 7 Months (8.58 yrs) | Covered: Yes',
        calculation:
          'Because service exceeds 6 months in the 9th year, tenure is rounded up to 9 years.\nGratuity = (15 × ₹65,000 × 9) ÷ 26 = ₹87,75,000 ÷ 26 = ₹3,37,500.',
        result:
          'Total Gratuity: ₹3,37,500 | Tax-Exempt Portion: ₹3,37,500 (Below ₹20L) | Taxable Portion: ₹0',
      },
      {
        title: 'Senior Professional (Covered, 25 Years Service)',
        inputs: 'Last Drawn Basic + DA: ₹1,50,000/mo | Service: 25 Years | Covered: Yes',
        calculation:
          'Gratuity = (15 × ₹1,50,000 × 25) ÷ 26 = ₹56,250,000 ÷ 26 = ₹21,63,462.',
        result:
          'Total Gratuity: ₹21,63,462 | Tax-Exempt Gratuity: ₹20,00,000 (Statutory Max) | Taxable Gratuity: ₹1,63,462',
      },
      {
        title: 'Employee Not Covered under the Act (12.8 Years Service)',
        inputs: 'Last Drawn Basic + DA: ₹40,000/mo | Service: 12 Years 10 Months | Covered: No',
        calculation:
          'Fractional months are ignored; only 12 completed years count.\nGratuity = 0.5 × ₹40,000 × 12 = ₹2,40,000.',
        result:
          'Total Gratuity: ₹2,40,000 | Tax-Exempt Gratuity: ₹2,40,000 | Taxable Gratuity: ₹0',
      },
    ],
    tips: [
      'The minimum tenure required for gratuity eligibility is 5 years of continuous service, but the 5-year condition is waived in the unfortunate event of employee death or permanent disability.',
      'Gratuity is calculated solely on your Basic Salary and Dearness Allowance (DA); special allowance, HRA, and bonuses are excluded from the calculation.',
      'Employers cannot forfeit gratuity unless an employee has been terminated for riotous conduct, moral turpitude, or causing intentional financial damage to company property.',
      'Companies can pay gratuity higher than the statutory formula if outlined in their employment contract, but amounts exceeding ₹20 Lakhs will be subject to income tax.',
      'Ensure you fill out Form F (Gratuity Nomination Form) at the time of joining an organization to protect your family’s interests.',
    ],
    commonMistakes: [
      'Calculating gratuity using total CTC or Gross Salary instead of only Basic + DA.',
      'Believing you can claim gratuity with less than 5 continuous years of service (except in disability/death cases).',
      'Assuming the 26-day divisor applies to non-covered establishments.',
      'Assuming that gratuity payments are always 100% tax-free regardless of the amount (the statutory ceiling is ₹20 Lakhs).',
    ],
    faqs: [
      {
        question: 'What is the minimum eligibility criteria for receiving gratuity?',
        answer:
          'Under Section 4(1) of the Payment of Gratuity Act 1972, an employee must complete a minimum of 5 years of continuous service with the same employer to become eligible for gratuity. However, the 5-year rule is waived in cases of death or disablement due to accident or disease.',
      },
      {
        question: 'What is the maximum tax-free gratuity limit in India?',
        answer:
          'The maximum tax-exempt limit for gratuity under Section 10(10) of the Income Tax Act is ₹20,00,000 (₹20 Lakhs) for non-government private employees covered under the Act. For Central/State Government employees, gratuity is 100% tax-free without any upper cap.',
      },
      {
        question: 'Why is 26 used as the divisor in the covered gratuity formula?',
        answer:
          'The number 26 represents the total number of working days in a month (30 days minus 4 Sundays), as laid down by the Supreme Court of India in the landmark Digvijay Woollen Mills case to determine the daily wage rate.',
      },
      {
        question: 'How are fractional years of service rounded off?',
        answer:
          'For establishments covered under the Act, if the service period in the final year exceeds 6 months (e.g., 5 years and 7 months), it is rounded up to the next full year (6 years). For establishments not covered, only fully completed years are counted.',
      },
      {
        question: 'Is gratuity deducted from my monthly salary like PF?',
        answer:
          'No. Unlike EPF (which involves an employee deduction), gratuity is paid 100% by the employer out of company funds. Although some companies show gratuity as a component of annual CTC, no monthly deduction is made from your take-home pay.',
      },
      {
        question: 'Can an employer refuse to pay gratuity?',
        answer:
          'An employer cannot withhold gratuity if an employee meets the 5-year service criteria, except in rare cases where the employee’s services were terminated for disorderly/riotous conduct, violence, or committing an offense of moral turpitude.',
      },
      {
        question: 'How long does an employer have to pay gratuity after resignation?',
        answer:
          'As per Section 7(3) of the Payment of Gratuity Act, the employer must pay the gratuity amount within 30 days from the date it becomes payable. If not paid within 30 days, the employer is liable to pay simple interest as prescribed by the government.',
      },
      {
        question: 'What is Form I and Form F in gratuity?',
        answer:
          'Form F is the nomination form submitted by the employee upon joining. Form I is the formal application submitted by an employee to the employer requesting disbursement of gratuity upon separation.',
      },
    ],
    relatedCalculators: [
      { name: 'Salary In-Hand Calculator', slug: 'salary-calculator', description: 'Calculate monthly take-home pay from your total CTC package.' },
      { name: 'EPF Calculator', slug: 'epf-calculator', description: 'Estimate your retirement savings and interest earned in the Employees Provident Fund.' },
      { name: 'NPS Calculator', slug: 'nps-calculator', description: 'Plan your long-term retirement pension and wealth accumulation under NPS.' },
    ],
  },
  hi: {
    pageTitle: 'ग्रेच्युटी कैलकुलेटर 2026 - ग्रेच्युटी राशि और टैक्स छूट की गणना करें',
    metaDescription: 'ग्रेच्युटी भुगतान अधिनियम 1972 के तहत अपनी ग्रेच्युटी राशि और ₹20 लाख की टैक्स-फ्री सीमा का तुरंत हिसाब लगाएं।',
    h1: 'ग्रेच्युटी कैलकुलेटर – अपनी ग्रेच्युटी राशि का तुरंत हिसाब लगाएं',
    introText:
      'ग्रेच्युटी (Gratuity) नियोक्ता द्वारा कर्मचारी को उसकी लंबी और निष्ठावान सेवा के बदले दिया जाने वाला एक वैधानिक वित्तीय लाभ है। भारत में ग्रेच्युटी भुगतान अधिनियम, 1972 के अनुसार 5 वर्ष या उससे अधिक निरंतर सेवा पूरी करने वाले कर्मचारी ग्रेच्युटी पाने के हकदार होते हैं।',
    howToUse: [
      'अपना अंतिम आहरित मासिक मूल वेतन (Basic Salary) और महंगाई भत्ता (DA) दर्ज करें।',
      'कंपनी में पूरी की गई कुल सेवा अवधि (वर्षों में, जैसे 6.5 वर्ष) भरें।',
      'चुनें कि क्या आपकी संस्था ग्रेच्युटी अधिनियम के अंतर्गत कवर है या नहीं।',
      'तुरंत अपनी कुल ग्रेच्युटी और आयकर छूट (अधिकतम ₹20 लाख) देखें।',
    ],
    tips: [
      'ग्रेच्युटी की पात्रता के लिए कम से कम 5 वर्ष की निरंतर सेवा अनिवार्य है (मृत्यु या विकलांगता की स्थिति को छोड़कर)।',
      'ग्रेच्युटी की गणना केवल बेसिक सैलरी और डीए पर होती है, एचआरए या अन्य भत्तों पर नहीं।',
      'धारा 10(10) के तहत निजी क्षेत्र के कर्मचारियों के लिए ₹20 लाख तक की ग्रेच्युटी पूरी तरह टैक्स-फ्री है।',
    ],
    faqs: [
      {
        question: 'ग्रेच्युटी के लिए न्यूनतम सेवा अवधि क्या है?',
        answer: 'ग्रेच्युटी प्राप्त करने के लिए एक ही नियोक्ता के साथ कम से कम 5 वर्ष की निरंतर सेवा पूरी करना अनिवार्य है।',
      },
      {
        question: 'ग्रेच्युटी पर अधिकतम टैक्स छूट की सीमा क्या है?',
        answer: 'आयकर कानून की धारा 10(10) के तहत गैर-सरकारी कर्मचारियों के लिए अधिकतम ₹20,00,000 (₹20 लाख) तक की ग्रेच्युटी कर-मुक्त है। सरकारी कर्मचारियों के लिए पूरी राशि टैक्स-फ्री होती है।',
      },
      {
        question: 'ग्रेच्युटी के फॉर्मूले में 26 का भाग क्यों दिया जाता है?',
        answer: '26 एक महीने के कार्य दिवसों (30 दिन माइनस 4 रविवार) को दर्शाता है, जिसे सुप्रीम कोर्ट के निर्देशानुसार 1 दिन का वेतन निकालने के लिए इस्तेमाल किया जाता है।',
      },
      {
        question: 'क्या ग्रेच्युटी मेरे वेतन से कटती है?',
        answer: 'नहीं, ग्रेच्युटी कर्मचारी के वेतन से नहीं कटती। यह पूरी तरह से नियोक्ता द्वारा अपने फंड से दी जाती है।',
      },
    ],
  },
};
