export const incomeTaxContent = {
  pageTitle: 'Income Tax Calculator FY 2025-26 - Old vs New | CalcMaster',
  metaDescription:
      'Calculate income tax for FY 2025-26 (AY 2026-27). Compare Old vs New Tax Regime side-by-side with ₹75k standard deduction, 87A rebate & 80C/80D savings!',
  h1: 'Income Tax Calculator (FY 2025-26 / AY 2026-27)',
  introText: "The Indian Income Tax system offers two regimes: the Old Tax Regime with various exemptions and deductions (like 80C, HRA, etc.), and the New Tax Regime, which has lower tax slab rates but doesn't allow most deductions. For FY 2025-26, the New Tax Regime is the default and provides a higher standard deduction of ₹75,000 (up from ₹50,000 previously). Use our income tax calculator to compare both regimes side-by-side and find out which one saves you more money.",
  
  howToUse: [
    "Enter your Gross Annual Income (your total income before any taxes or deductions).",
    "Select your Age Category (below 60, 60-80 years, or above 80 years), as this affects the basic exemption limit in the Old Regime.",
    "Toggle between the New Tax Regime (default) and the Old Tax Regime to see individual calculations.",
    "If using the Old Regime, enter applicable deductions like Section 80C (up to ₹1.5L), Section 80D (health insurance), HRA, and Home Loan Interest.",
    "View the instant comparison to see which regime results in lower tax and exactly how much you can save."
  ],

  formulaExplanation: "Income tax in India is calculated progressively based on income slabs. \n\n**New Regime Slabs (FY 25-26):**\n- Up to ₹3 Lakh: Nil\n- ₹3L to ₹7L: 5%\n- ₹7L to ₹10L: 10%\n- ₹10L to ₹12L: 15%\n- ₹12L to ₹15L: 20%\n- Above ₹15L: 30%\n\n**Standard Deduction:** Salaried individuals get a flat ₹75,000 standard deduction under the New Regime and ₹50,000 under the Old Regime.\n\n**Rebate under Section 87A:** In the New Regime, if your taxable income (after standard deduction) is up to ₹7,00,000, your tax liability is reduced to zero. In the Old Regime, the rebate applies up to a taxable income of ₹5,00,000.\n\n**Surcharge & Cess:** A 4% Health & Education Cess is added to your total tax liability. Surcharges apply if your taxable income exceeds ₹50 Lakhs.",
  
  solvedExamples: [
    {
      title: "Example 1: Salary of ₹8 Lakhs (No Investment)",
      calculation: "Gross Income: ₹8,00,000\nStandard Deduction (New Regime): ₹75,000\nTaxable Income: ₹7,25,000\nSince taxable income > ₹7,00,000, no 87A rebate applies.\nTax Slabs: ₹3L to ₹7L (5%) = ₹20,000. ₹7L to ₹7.25L (10%) = ₹2,500.\nTax: ₹22,500 + 4% Cess = ₹23,400."
    },
    {
      title: "Example 2: Salary of ₹12 Lakhs (With ₹1.5L 80C & ₹50K HRA)",
      calculation: "New Regime: Taxable Income = ₹11.25L. Tax = ₹68,750 + Cess = ₹71,500.\nOld Regime: Deductions = ₹50K (Std) + ₹1.5L (80C) + ₹50K (HRA) = ₹2.5L. Taxable Income = ₹9.5L. Tax = ₹12,500 (up to 5L) + ₹90,000 (20% of 4.5L) = ₹1,02,500 + Cess = ₹1,06,600.\nConclusion: New Regime is better by ₹35,100."
    },
    {
      title: "Example 3: Salary of ₹5 Lakhs",
      calculation: "New Regime: Standard Deduction = ₹75,000. Taxable = ₹4.25L (Below 7L limit). Tax = ₹0.\nOld Regime: Standard Deduction = ₹50,000. Taxable = ₹4.5L (Below 5L limit). Tax = ₹0."
    }
  ],

  tips: [
    "Always check both regimes: Even if you have high deductions like Home Loan and 80C, the New Regime's revised slabs and ₹75k standard deduction often make it the winner for higher incomes.",
    "Claim standard deduction: Both regimes now offer a standard deduction for salaried individuals, but it's ₹75,000 for the new regime (FY 2025-26).",
    "Don't ignore HRA & Section 24(b): If you pay high rent or home loan interest, the Old Regime might still save you more money.",
    "Factor in NPS (80CCD): You can claim an additional ₹50,000 deduction for NPS over and above the ₹1.5L 80C limit in the Old Regime.",
    "Inform your employer: Submit your tax regime declaration to your employer early in the financial year to avoid excess TDS deduction."
  ],

  commonMistakes: [
    "Assuming the New Regime is always better: While simplified, taxpayers with a home loan, HRA, and maxed 80C/80D might pay less under the Old Regime.",
    "Forgetting standard deduction: Many forget that the standard deduction applies automatically to salaried employees, even in the New Regime.",
    "Ignoring the 87A rebate trap: If your income slightly exceeds ₹7 Lakhs in the New Regime, your tax liability jumps significantly as the rebate is lost.",
    "Confusing gross income with taxable income: Tax slabs apply to *taxable income* (after deductions), not your gross salary."
  ],

  faqs: [
    {
      question: "Which tax regime is the default for FY 2025-26?",
      answer: "The New Tax Regime is the default tax regime starting FY 2023-24 and continuing into FY 2025-26. If you want to opt for the Old Regime, you must explicitly choose it."
    },
    {
      question: "Is the ₹75,000 standard deduction available in the old regime?",
      answer: "No, the standard deduction in the Old Regime remains at ₹50,000. The ₹75,000 standard deduction is exclusive to the New Tax Regime for FY 2025-26."
    },
    {
      question: "How does the Section 87A rebate work?",
      answer: "Under Section 87A, if your taxable income is up to ₹7 Lakhs (New Regime) or ₹5 Lakhs (Old Regime), the government provides a full rebate on your calculated tax, making your final tax liability zero."
    },
    {
      question: "Can I claim 80C deductions in the New Tax Regime?",
      answer: "No, popular Chapter VI-A deductions like Section 80C (PPF, ELSS, LIC) and Section 80D (Health Insurance) are not allowed under the New Tax Regime."
    },
    {
      question: "Can I claim Home Loan interest (Section 24b) in the New Regime?",
      answer: "You cannot claim deduction for interest on a self-occupied property in the New Regime. However, interest on let-out property can be adjusted against rental income (subject to conditions)."
    },
    {
      question: "Who should opt for the Old Tax Regime?",
      answer: "Taxpayers who have significant tax-saving investments (₹1.5L under 80C), pay high health insurance premiums (80D), claim HRA, or have an ongoing home loan often benefit from sticking to the Old Regime."
    },
    {
      question: "What is Health and Education Cess?",
      answer: "An additional 4% Health and Education Cess is levied on your total calculated income tax and surcharge. It is mandatory for all taxpayers regardless of the regime."
    },
    {
      question: "Can I switch my tax regime every year?",
      answer: "Salaried individuals without business income can switch between the Old and New regimes every year based on what is more beneficial. However, individuals with business income can only switch back to the old regime once in their lifetime."
    }
  ],

  relatedCalculators: [
    {
      name: "SIP Calculator",
      url: "/sip-calculator",
      description: "Plan your ELSS and tax-saving mutual fund investments."
    },
    {
      name: "PPF Calculator",
      url: "/ppf-calculator",
      description: "Calculate maturity amount for your Public Provident Fund investments."
    },
    {
      name: "EMI Calculator",
      url: "/emi-calculator",
      description: "Calculate your home loan EMI to plan your Section 24(b) deductions."
    }
  ]
};
