export const loanPrepaymentContent = {
  en: {
    pageTitle: 'Loan Prepayment Calculator - Interest Saved | CalcMaster',
    metaDescription:
      'Free loan prepayment calculator: calculate interest saved and tenure reduction on home, car, or personal loans. Compare lump-sum vs extra EMI prepayment.',
    h1: 'Loan Prepayment Calculator – Save Interest & Close Loans Faster',
    introText:
      'Making early repayments, part-payments or prepayments towards your existing loan (home loan, car loan, or personal loan prepayment) reduces your outstanding principal balance directly. Because interest is charged on the reducing balance, even modest periodic prepayments can save you lakhs of rupees in interest and cut years off your loan tenure.',
    howToUse: [
      'Enter your current remaining Loan Outstanding Balance (or original loan amount).',
      'Input the annual interest rate on your loan (e.g., 8.75% for home loan, 12% for personal loan).',
      'Specify the remaining loan tenure in months or years.',
      'Select your prepayment strategy: "One-Time Lump Sum", "Monthly Extra Prepayment", or "Annual Extra Prepayment".',
      'Input your prepayment amount and the starting month.',
      'Choose whether you want to "Reduce Loan Tenure" (keep EMI constant) or "Reduce Monthly EMI" (keep tenure constant).',
      'Instantly see total interest saved, months reduced, and side-by-side comparison tables.',
    ],
    formulaExplanation:
      'When you make a loan prepayment, 100% of the extra amount goes directly towards reducing the Principal Balance (P). The lender then recalculates the loan schedule:\n• If reducing tenure: Monthly EMI remains unchanged, but because the interest component (P × r) shrinks drastically, a larger fraction of every regular EMI goes towards principal, accelerating loan closure.\n• If reducing EMI: The remaining tenure is kept identical, and the new EMI is recalculated on the lower principal balance: New EMI = [P_new × r × (1 + r)^rem_months] / [(1 + r)^rem_months - 1].',
    solvedExamples: [
      {
        title: 'Home Loan: One-Time Lump Sum Prepayment',
        inputs: 'Loan: ₹30 Lakhs | Rate: 8.75% | Remaining: 20 Years (240 Mos) | Prepayment: ₹3 Lakhs at Month 12 | Strategy: Reduce Tenure',
        calculation:
          'Original Total Interest = ₹33,62,729. Paying ₹3 Lakhs extra in Year 1 slashes the principal. New tenure is reduced to 199 months (41 months saved).',
        result:
          'Interest Saved: ~₹7.25 Lakhs | Tenure Reduced by: 3 Years 5 Months (41 Months) | New Loan Duration: 16.6 Years',
      },
      {
        title: 'Home Loan: Extra ₹5,000 Monthly Prepayment',
        inputs: 'Loan: ₹40 Lakhs | Rate: 8.5% | Remaining: 20 Years | Extra Monthly: ₹5,000 from Month 1',
        calculation:
          'Standard EMI = ₹34,713. Paying ₹39,713 each month accelerates principal payoff exponentially.',
        result:
          'Interest Saved: ~₹13.4 Lakhs | Tenure Reduced by: 5 Years 4 Months (64 Months) | Debt-Free in: 14.6 Years',
      },
      {
        title: 'Personal Loan: Annual Bonus Prepayment',
        inputs: 'Loan: ₹10 Lakhs | Rate: 13.0% | Remaining: 5 Years (60 Mos) | Prepayment: ₹1 Lakh every year',
        calculation:
          'Original Interest = ₹3,65,183. Paying ₹1 Lakh at the end of each year clears the loan in under 3.5 years.',
        result:
          'Interest Saved: ~₹1.48 Lakhs | Tenure Reduced by: 19 Months | Debt-Free in: 41 Months',
      },
    ],
    tips: [
      'Prepaying early in your loan tenure (Years 1 to 7 of a 20-year loan) yields maximum interest savings because the early EMIs are heavily front-loaded with interest.',
      'RBI mandates that banks and NBFCs cannot charge foreclosure/prepayment penalties on floating-rate home loans and personal loans to individual borrowers.',
      'Choosing "Reduce Tenure" saves 3x to 5x more total interest than choosing "Reduce EMI".',
      'Use annual financial windfalls (such as corporate bonuses, tax refunds, or maturing FDs) to make annual lump-sum prepayments.',
      'Compare prepaying vs investing: if your home loan rate is 8.5% and your equity mutual fund SIP delivers 12%+, mathematically investing surplus cash might create higher net wealth, but prepaying guarantees a risk-free 8.5% return and psychological peace of mind.',
    ],
    commonMistakes: [
      'Delaying prepayments until the final 5 years of a 20-year loan, when you have already paid over 80% of total interest.',
      'Choosing to reduce EMI instead of tenure, which provides short-term cash relief but minimizes total interest savings.',
      'Prepaying without checking if your lender requires written notification to adjust the principal rather than holding funds as advance EMIs.',
    ],
    faqs: [
      {
        question: 'Is there any penalty for prepaying home loans in India?',
        answer:
          'No. As per Reserve Bank of India (RBI) guidelines, banks and housing finance companies (HFCs) are strictly prohibited from levying prepayment or foreclosure charges on floating-rate home loans availed by individual borrowers.',
      },
      {
        question: 'Should I reduce my loan tenure or reduce my monthly EMI when prepaying?',
        answer:
          'Reducing your loan tenure is significantly more advantageous for long-term wealth creation. It saves far more total interest because your principal is paid off much faster. Reduce EMI only if your immediate household monthly cash flow is strained.',
      },
      {
        question: 'How does loan prepayment save interest?',
        answer:
          'Because interest in Indian loans is calculated on a daily reducing balance (Outstanding Principal × Annual Rate / 365), any lump-sum prepayment immediately drops the principal balance, reducing the interest charged every single day thereafter.',
      },
      {
        question: 'When is the best time to prepay a home loan?',
        answer:
          'The best time to prepay is during the first 3 to 7 years of your loan tenure. In the early years, nearly 70% to 80% of your monthly EMI goes towards interest. Prepaying early prevents decades of compound interest accumulation.',
      },
      {
        question: 'Will prepaying my home loan reduce my tax benefits under Section 24b and 80C?',
        answer:
          'While lower interest outgo reduces the interest component available for Section 24(b) deduction (up to ₹2 Lakhs/year), the money saved in direct interest payments (e.g. ₹5 to 10 Lakhs) far outweighs any marginal income tax deduction.',
      },
      {
        question: 'Can I calculate personal loan prepayment and foreclosure savings?',
        answer:
          'Yes. This tool works as an accurate personal loan prepayment calculator. Because unsecured personal loans carry steep interest rates (11% to 18%), early part-payments significantly lower your total interest outgo and help you become debt-free faster.',
      },
      {
        question: 'How does a loan early repayment calculator help cut down tenure?',
        answer:
          'When you make an early repayment, 100% of the funds go directly towards reducing your principal amount. Because interest accrues daily on the remaining balance, early repayments compound your interest savings over months and years.',
      },
    ],
    relatedCalculators: [
      { name: 'Home Loan EMI Calculator', slug: 'home-loan-calculator', description: 'Calculate home loan payments with tax savings.' },
      { name: 'Personal Loan Calculator', slug: 'personal-loan-calculator', description: 'Compute personal loan EMI and effective APR.' },
      { name: 'EMI Calculator', slug: 'emi-calculator', description: 'Standard loan repayment and amortization schedule calculator.' },
    ],
  },
  hi: {
    pageTitle: 'लोन प्रीपेमेंट कैलकुलेटर - ब्याज बचत व समय अवधि में कमी की गणना करें',
    metaDescription: 'होम लोन और पर्सनल लोन पर पार्ट-पेमेंट करने से होने वाली लाखों रुपयों की ब्याज बचत और घटी हुई अवधि का हिसाब लगाएं।',
    h1: 'लोन प्रीपेमेंट कैलकुलेटर – ब्याज बचाएं और समय से पहले कर्जमुक्त बनें',
    introText:
      'अपने चालू लोन पर पार्ट-पेमेंट या प्रीपेमेंट करने से मूलधन (Principal) सीधे कम होता है, जिससे ब्याज का भारी बोझ घटता है और लोन वर्षों पहले समाप्त हो जाता है।',
    howToUse: [
      'अपनी बची हुई लोन राशि दर्ज करें।',
      'वार्षिक ब्याज दर (%) और बची हुई समय अवधि भरें।',
      'प्रीपेमेंट का प्रकार चुनें (एकमुश्त राशि, मासिक अतिरिक्त जमा या वार्षिक जमा)।',
      'अवधि घटाना (Reduce Tenure) या ईएमआई घटाना (Reduce EMI) चुनें।',
      'तुरंत देखें कि आपने कितने लाख रुपये का ब्याज बचाया।',
    ],
    tips: [
      'लोन के शुरुआती 5-7 वर्षों में प्रीपेमेंट करने से सबसे ज्यादा ब्याज की बचत होती है।',
      'आरबीआई के नियमानुसार फ्लोटिंग रेट होम लोन पर कोई प्रीपेमेंट चार्ज नहीं लगता।',
    ],
    faqs: [
      {
        question: 'क्या होम लोन प्रीपेमेंट पर कोई पेनल्टी लगती है?',
        answer: 'आरबीआई के दिशा-निर्देशों के अनुसार फ्लोटिंग रेट होम लोन पर किसी भी प्रकार का प्रीपेमेंट या फोरक्लोजर शुल्क लेना पूरी तरह प्रतिबंधित है।',
      },
      {
        question: 'ईएमआई घटाना बेहतर है या लोन की अवधि कम करना?',
        answer: 'लोन की अवधि (Tenure) कम करना कहीं अधिक फायदेमंद है क्योंकि इससे ब्याज में कई गुना अधिक बचत होती है।',
      },
    ],
  },
};
