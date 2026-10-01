export const salaryCalculatorContent = {
  pageTitle: 'Salary Calculator India - Take-Home In-Hand | CalcMaster',
  metaDescription:
      'Convert annual CTC to monthly in-hand take-home salary. Detailed salary slip breakdown of Basic, HRA, EPF, Professional Tax, and Income Tax in India.',
  h1: 'Salary In-Hand Calculator (CTC to Take-Home)',
  introText: "Planning a job switch or received a new offer? Our Salary Calculator helps you convert your Cost to Company (CTC) into your actual monthly take-home salary. By accounting for components like Basic Salary, HRA, EPF, Professional Tax, Gratuity, and Income Tax (New Regime FY 2025-26), you can get a transparent and accurate view of your earnings.",
  howToUse: [
    { title: "Enter Annual CTC", description: "Input your total Cost to Company package in INR." },
    { title: "Adjust Percentages", description: "Set the percentage of your CTC that goes to Basic Salary (usually 40-50%) and the HRA percentage (usually 40-50% of Basic)." },
    { title: "Toggle Deductions", description: "Select if EPF and Gratuity are part of your CTC, and enter your state's monthly Professional Tax." },
    { title: "Select Tax Regime", description: "Choose between the Old and New tax regimes to estimate your monthly TDS." },
    { title: "Review Take-Home", description: "Check the comprehensive breakdown of your gross earnings, total deductions, and net monthly in-hand salary." }
  ],
  formulaExplanation: "Understanding the difference between CTC and take-home salary is crucial.\n\n**Gross Salary** = CTC - Employer EPF - Gratuity Provision\n**In-Hand Salary** = Gross Salary - Employee EPF - Professional Tax - Income Tax (TDS)\n\n*EPF Calculation:* Typically 12% of Basic Salary (often capped at ₹1,800/month if Basic is above ₹15,000).\n*Gratuity:* Calculated as 4.81% of Basic Salary per year, accrued by the employer.",
  solvedExamples: [
    { title: "₹6 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\nGross Monthly: ~₹48,150\nIncome Tax: ₹0 (Rebate applies)\nEPF Deduction: ₹1,800\nIn-Hand Salary: ~₹46,150/month" },
    { title: "₹12 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\nGross Monthly: ~₹96,300\nIncome Tax Deducted: ~₹6,300\nEPF Deduction: ₹1,800\nIn-Hand Salary: ~₹88,000/month" },
    { title: "₹25 Lakhs CTC", calculation: "With 40% Basic, EPF, and New Tax Regime:\nGross Monthly: ~₹2,00,000\nIncome Tax Deducted: ~₹33,000\nIn-Hand Salary: ~₹1,65,000/month" }
  ],
  tips: [
    "A higher Basic Salary means higher EPF contributions and Gratuity, but might increase your tax liability depending on HRA claims.",
    "If you opt for the New Tax Regime, you cannot claim HRA exemption. Evaluate both regimes before submitting your investment declaration.",
    "EPF is technically an earning, but it's a forced saving, so it acts as a deduction from your monthly cash flow.",
    "Special Allowance is typically the balancing figure in your CTC structure and is fully taxable."
  ],
  commonMistakes: [
    "Assuming CTC divided by 12 equals your monthly take-home salary.",
    "Forgetting that the employer's share of EPF is usually part of the CTC.",
    "Not factoring in TDS (Income Tax) which significantly reduces take-home pay for higher income brackets.",
    "Ignoring the fact that Gratuity is often included in CTC but is only paid out when you leave the company after 5 years."
  ],
  faqs: [
    { question: "What is CTC?", answer: "CTC stands for Cost to Company. It is the total amount a company spends on an employee in a year, including gross salary, employer provident fund contributions, gratuity, and insurance." },
    { question: "Why is my take-home salary much lower than my CTC?", answer: "Your take-home salary deducts employer EPF, employee EPF, professional tax, income tax (TDS), and gratuity from the CTC. These deductions cause the visible gap between CTC and in-hand pay." },
    { question: "Is EPF mandatory?", answer: "EPF is mandatory if your Basic Salary is less than ₹15,000 per month. For basic salaries above that, it is technically optional, but most employers include it as a standard practice." },
    { question: "What is Professional Tax?", answer: "Professional Tax is a direct tax levied by state governments on income earned by professionals and salaried employees. It usually ranges from ₹150 to ₹200 per month (max ₹2,500 per year)." },
    { question: "How does the New Tax Regime affect my take-home?", answer: "The New Regime generally has lower tax rates but does not allow standard deductions like HRA, LTA, and 80C. For most incomes up to ₹7 Lakhs, tax is zero under the new regime." },
    { question: "Can I opt out of Gratuity to increase take-home?", answer: "No, Gratuity is a statutory requirement under the Payment of Gratuity Act for eligible establishments. If an employer factors it into CTC, it cannot be opted out of to increase monthly cash flow." },
    { question: "What is HRA and can I claim it?", answer: "HRA is House Rent Allowance. If you live in a rented house and opt for the Old Tax Regime, you can claim a portion of your HRA as tax-exempt. It is fully taxable under the New Tax Regime." },
    { question: "Is this calculator exact?", answer: "This calculator provides a very close estimate. Exact figures may vary slightly by a few rupees based on your employer's specific rounding policies, meal coupons, health insurance premiums, or precise tax declarations." }
  ],
  relatedCalculators: [
    { title: "Income Tax Calculator", link: "/income-tax-calculator" },
    { title: "EMI Calculator", link: "/emi-calculator" },
    { title: "GST Calculator", link: "/gst-calculator" }
  ]
};
