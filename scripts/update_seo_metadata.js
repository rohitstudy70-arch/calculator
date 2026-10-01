const fs = require('fs');
const path = require('path');

const seoData = {
  'emi.ts': {
    title: 'EMI Calculator 2026 - Loan EMI & Schedule | CalcMaster',
    desc: 'Calculate home, car, or personal loan EMI instantly. View month-wise amortization schedule, total interest & compare bank offers. Free PDF export!',
    h1: 'EMI Calculator – Calculate Your Loan EMI Instantly'
  },
  'home-loan.ts': {
    title: 'Home Loan EMI Calculator 2026 - Tax Benefits | CalcMaster',
    desc: 'Calculate home loan EMI, down payment, stamp duty & tax savings under Section 24(b) & 80C. View amortization schedule with charts. Try free today!',
    h1: 'Home Loan EMI Calculator'
  },
  'personal-loan.ts': {
    title: 'Personal Loan EMI Calculator 2026 - Check APR | CalcMaster',
    desc: 'Calculate personal loan monthly EMI, total interest, processing fees, and effective APR. Compare bank offers side-by-side with instant schedule.',
    h1: 'Personal Loan EMI Calculator'
  },
  'car-loan.ts': {
    title: 'Car Loan EMI Calculator 2026 - Auto Loan | CalcMaster',
    desc: 'Calculate monthly car loan EMI, on-road vehicle cost, down payment & total interest for new/used cars in India. Instant amortization & PDF export!',
    h1: 'Car Loan EMI Calculator – Plan Your Dream Car Financing'
  },
  'loan-prepayment.ts': {
    title: 'Loan Prepayment Calculator - Interest Saved | CalcMaster',
    desc: 'Calculate interest savings and tenure reduction on home, car, or personal loans. Compare lump-sum vs monthly extra EMI prepayment strategies free!',
    h1: 'Loan Prepayment Calculator – Save Interest & Close Loans Faster'
  },
  'sip.ts': {
    title: 'SIP Calculator 2026 - Mutual Fund Returns | CalcMaster',
    desc: 'Calculate mutual fund SIP returns and wealth growth with our free SIP calculator. See year-by-year compounding, growth charts, and PDF reports.',
    h1: 'SIP Calculator - Mutual Fund Returns Calculator'
  },
  'lumpsum.ts': {
    title: 'Lumpsum Calculator - One-Time MF Returns | CalcMaster',
    desc: 'Calculate returns on one-time lump sum mutual fund investments. Estimate future wealth, total profit, and compound growth over 1 to 30 years free!',
    h1: 'Lumpsum Calculator - One-Time Investment Returns'
  },
  'fd.ts': {
    title: 'FD Calculator - Fixed Deposit Returns 2026 | CalcMaster',
    desc: 'Calculate Fixed Deposit (FD) maturity value and interest earned with monthly, quarterly, or annual compounding. Compare bank FD rates & export PDF.',
    h1: 'FD Calculator – Calculate Fixed Deposit Returns Instantly'
  },
  'rd.ts': {
    title: 'RD Calculator - Recurring Deposit Maturity | CalcMaster',
    desc: 'Calculate Recurring Deposit (RD) maturity value, total deposit, and interest earned. Uses standard quarterly compounding for Indian banks & post office.',
    h1: 'RD Calculator – Calculate Recurring Deposit Maturity Online'
  },
  'compound-interest.ts': {
    title: 'Compound Interest Calculator - Daily/Monthly | CalcMaster',
    desc: 'Free Compound Interest Calculator with daily, monthly, quarterly & annual compounding. Include monthly deposits and view interactive wealth chart!',
    h1: 'Compound Interest Calculator – Harness the Power of Compounding'
  },
  'simple-interest.ts': {
    title: 'Simple Interest Calculator - SI & Principal | CalcMaster',
    desc: 'Calculate Simple Interest (SI), total repayment, interest rate, or time tenure in days, months, and years. Reverse calculation modes & instant table.',
    h1: 'Simple Interest Calculator – Fast, Accurate & Universal'
  },
  'cagr.ts': {
    title: 'CAGR Calculator - Annual Compound Growth Rate | CalcMaster',
    desc: 'Calculate Compound Annual Growth Rate (CAGR) and absolute returns for stocks, mutual funds, or real estate. Includes reverse CAGR mode & Rule of 72!',
    h1: 'CAGR Calculator – Measure True Annualized Investment Returns'
  },
  'inflation.ts': {
    title: 'Inflation Calculator India 2026 - Future Cost | CalcMaster',
    desc: 'Calculate future cost of living, money depreciation, and purchasing power loss over time. Understand real returns against historical Indian inflation.',
    h1: 'Inflation Calculator India – Protect Your Future Purchasing Power'
  },
  'income-tax.ts': {
    title: 'Income Tax Calculator FY 2025-26 - Old vs New | CalcMaster',
    desc: 'Calculate income tax for FY 2025-26 (AY 2026-27). Compare Old vs New Tax Regime side-by-side with ₹75k standard deduction, 87A rebate & 80C/80D savings!',
    h1: 'Income Tax Calculator (FY 2025-26 / AY 2026-27)'
  },
  'gst.ts': {
    title: 'GST Calculator Online - Add or Remove GST | CalcMaster',
    desc: 'Free Indian GST Calculator to instantly add or remove GST. Compute CGST, SGST, and IGST for all tax slabs (3%, 5%, 12%, 18%, 28%) with reverse mode.',
    h1: 'GST Calculator - Add or Remove GST Instantly'
  },
  'salary.ts': {
    title: 'Salary Calculator India - Take-Home In-Hand | CalcMaster',
    desc: 'Convert annual CTC to monthly in-hand take-home salary. Detailed salary slip breakdown of Basic, HRA, EPF, Professional Tax, and Income Tax in India.',
    h1: 'Salary In-Hand Calculator (CTC to Take-Home)'
  },
  'hra.ts': {
    title: 'HRA Exemption Calculator 2026 - Tax Savings | CalcMaster',
    desc: 'Calculate tax-exempt and taxable House Rent Allowance under Section 10(13A). Checks Metro (50%) and Non-Metro (40%) rules with 10% rent excess limit.',
    h1: 'HRA Exemption Calculator – Maximize Your Rental Tax Savings'
  },
  'gratuity.ts': {
    title: 'Gratuity Calculator 2026 - Gratuity Amount | CalcMaster',
    desc: 'Calculate statutory gratuity payout for covered and non-covered employees under Payment of Gratuity Act 1972. Check ₹20 Lakh tax-exempt limit free!',
    h1: 'Gratuity Calculator – Check Your Statutory Retirement Payout'
  },
  'ppf.ts': {
    title: 'PPF Calculator 2026 - Maturity & Interest | CalcMaster',
    desc: 'Calculate Public Provident Fund (PPF) maturity corpus, annual interest earned at 7.1%, and tax benefits under Section 80C. View 15-year EEE schedule.',
    h1: 'PPF Calculator – Plan Your 15-Year Tax-Free Wealth'
  },
  'epf.ts': {
    title: 'EPF Calculator 2026 - PF Balance & Corpus | CalcMaster',
    desc: 'Calculate your EPF retirement corpus and interest earned at 8.25% EPFO rate. Includes employee & employer share (EPF/EPS) with salary hike projections.',
    h1: 'EPF Calculator – Estimate Your Retirement Provident Fund Corpus'
  },
  'nps.ts': {
    title: 'NPS Calculator 2026 - Pension & Lump Sum | CalcMaster',
    desc: 'Calculate your National Pension System (NPS) maturity corpus, monthly pension, and 60% tax-free lump sum payout. Based on official PFRDA rules.',
    h1: 'NPS Calculator – Plan Retirement Pension & Lump Sum Wealth'
  },
  'retirement.ts': {
    title: 'Retirement Calculator 2026 - Corpus & SIP | CalcMaster',
    desc: 'Calculate the retirement corpus you need in India. Factors in inflation, life expectancy, post-retirement expenses, and monthly SIP needed to retire.',
    h1: 'Retirement Calculator India – Build a Financially Free Future'
  },
  'bmi.ts': {
    title: 'BMI Calculator India - WHO & Asian Cutoffs | CalcMaster',
    desc: 'Calculate Body Mass Index (BMI) for men and women. Compare standard WHO vs Asian-Indian (ICMR) cutoffs and discover your healthy weight range now!',
    h1: 'BMI Calculator – Body Mass Index with Asian-Indian Cutoffs'
  },
  'bmr.ts': {
    title: 'BMR Calculator Online - Daily Calorie Burn | CalcMaster',
    desc: 'Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor, Harris-Benedict & Katch-McArdle formulas. Find resting calories needed to sustain you.',
    h1: 'BMR Calculator – Basal Metabolic Rate Calculator'
  },
  'calorie.ts': {
    title: 'Calorie Calculator - Daily TDEE & Macros | CalcMaster',
    desc: 'Calculate daily calorie needs (TDEE) for weight loss, maintenance, or muscle gain. Get customized macro split (protein, carbs, fat) and safe targets.',
    h1: 'Calorie Calculator – Daily Calorie & Macro Target Planner'
  },
  'body-fat.ts': {
    title: 'Body Fat Calculator - US Navy Tape Method | CalcMaster',
    desc: 'Calculate body fat percentage and lean muscle mass using the official US Navy tape method. Compare results with clinical ACE categories for men & women.',
    h1: 'Body Fat Calculator – US Navy Circumference Method'
  },
  'pregnancy.ts': {
    title: 'Pregnancy Due Date Calculator - EDD Timeline | CalcMaster',
    desc: 'Calculate your Estimated Due Date (EDD) using LMP, conception date, or IVF transfer. View week-by-week progress and trimester milestone dates.',
    h1: 'Pregnancy Due Date Calculator – Estimated Delivery Date (EDD)'
  },
  'age.ts': {
    title: 'Age Calculator Online - Exact Age in Days | CalcMaster',
    desc: 'Calculate your exact chronological age in years, months, days, hours, and minutes. Countdown to your next birthday with total days lived & milestone log.',
    h1: 'Age Calculator – Exact Age in Years, Months & Days'
  },
  'date-difference.ts': {
    title: 'Date Difference Calculator - Days & Workdays | CalcMaster',
    desc: 'Calculate exact number of days, weeks, months, and working business days between two dates. Toggle inclusive end date and 5-day or 6-day work weeks now!',
    h1: 'Date Difference Calculator – Calculate Duration Between Two Dates'
  },
  'percentage.ts': {
    title: 'Percentage Calculator Online - % Increase/Off | CalcMaster',
    desc: 'Calculate percentage of a number, percentage increase or decrease, discount %, and percentage difference. Step-by-step math for students and professionals.',
    h1: 'Percentage Calculator – Comprehensive % Math Tool'
  },
  'fraction.ts': {
    title: 'Fraction Calculator - Add, Subtract, Divide | CalcMaster',
    desc: 'Add, subtract, multiply, and divide fractions with step-by-step working. Simplify fractions, convert improper to mixed numbers, and decimals to fractions.',
    h1: 'Fraction Calculator – Step-by-Step Fraction Arithmetic'
  },
  'scientific.ts': {
    title: 'Scientific Calculator Online - Trig & Algebra | CalcMaster',
    desc: 'Free full-featured scientific calculator online with keyboard support, deg/rad modes, trigonometry, logs, powers, roots, factorials, and history log.',
    h1: 'Scientific Calculator Online – Advanced Mathematical Tool'
  },
  'unit-converter.ts': {
    title: 'Unit Converter Online - Indian & Metric Units | CalcMaster',
    desc: 'Convert length, weight, area, volume, temperature, and speed. Includes traditional Indian land units (Bigha, Guntha, Acre, Katha), gold tola & lakh/crore.',
    h1: 'Universal Unit Converter – Metric, Imperial & Indian Units'
  },
  'tip.ts': {
    title: 'Tip Calculator - Bill Split & Gratuity India | CalcMaster',
    desc: 'Calculate restaurant bill tip, split expenses evenly between friends, apply rounding rules, and check Indian restaurant service charge & GST guidelines.',
    h1: 'Tip & Bill Split Calculator – Fair Group Bill Sharing'
  },
  'gpa.ts': {
    title: 'GPA to Percentage Calculator - 10-Point CGPA | CalcMaster',
    desc: 'Convert 10-point Indian CGPA to percentage using standard university formula (9.5 multiplier). Calculate semester SGPA, cumulative CGPA, and 4.0 scale GPA.',
    h1: 'GPA & CGPA to Percentage Calculator – India & Global Scales'
  }
};

const dir = path.join(__dirname, '..', 'src', 'data', 'calculator-content');

let maxTitleLen = 0;
let maxDescLen = 0;

for (const [file, meta] of Object.entries(seoData)) {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  if (meta.title.length > maxTitleLen) maxTitleLen = meta.title.length;
  if (meta.desc.length > maxDescLen) maxDescLen = meta.desc.length;

  let content = fs.readFileSync(filePath, 'utf8');

  // Replace pageTitle
  content = content.replace(
    /pageTitle:\s*['"`][^'"`]+['"`]/,
    `pageTitle: '${meta.title.replace(/'/g, "\\'")}'`
  );

  // Replace metaDescription
  content = content.replace(
    /metaDescription:\s*['"`](?:[^'"`]|\n)*?['"`]/,
    `metaDescription:\n      '${meta.desc.replace(/'/g, "\\'")}'`
  );

  // Replace h1
  content = content.replace(
    /h1:\s*['"`][^'"`]+['"`]/,
    `h1: '${meta.h1.replace(/'/g, "\\'")}'`
  );

  fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Updated all 35 files. Max Title: ${maxTitleLen} chars (Limit: 60). Max Desc: ${maxDescLen} chars (Limit: 155).`);
