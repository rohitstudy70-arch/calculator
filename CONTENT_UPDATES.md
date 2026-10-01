# CalcMaster India — Content & Regulatory Update Checklist

This document tracks all articles, calculator modules, and reference files containing statutory rates, tax limits, or government regulations that require **mandatory quarterly verification**.

---

## 📅 Quarterly Review Schedule

| Quarter | Target Date | Key Focus Area | Official Source |
| :--- | :--- | :--- | :--- |
| **Q1** | April 1 | Union Budget Tax Slabs, Standard Deductions, AY Rebates | Income Tax Department / Finance Bill |
| **Q2** | July 1 | Small Savings Schemes (PPF, Sukanya, Senior Citizen Savings) | Ministry of Finance (DEA) Circular |
| **Q3** | October 1 | RBI Monetary Policy Repo Rate & MCLR Floating Rates | Reserve Bank of India (RBI) MPC |
| **Q4** | January 1 | EPF Annual Interest Rate Recommendation & Gratuity Caps | EPFO Central Board of Trustees (CBT) |

---

## 📋 Regulatory Items Checklist by Article & Tool

### 1. Loan Calculators & Articles
- **Articles:** `home-loan-emi-vs-prepayment.mdx`
- **Calculators:** `loan-prepayment-calculator`, `home-loan-calculator`, `emi-calculator`
- **Rules to Verify:**
  - [ ] **RBI Prepayment Circular:** Confirm zero foreclosure/prepayment charges on individual floating-rate home loans (*RBI/2013-14/582*).
  - [ ] **Section 24(b) Ceiling:** Verify interest deduction limit for self-occupied properties (currently ₹2,00,000 under Old Tax Regime).
  - [ ] **Section 80C Principal Ceiling:** Verify principal repayment deduction limit (currently ₹1,50,000).
  - [ ] **Current Benchmark Lending Rates:** Monitor SBI EBLR / HDFC Home Loan benchmark rates.

### 2. Investment Calculators & Articles
- **Calculators:** `ppf-calculator`, `epf-calculator`, `nps-calculator`, `fd-calculator`, `rd-calculator`
- **Rules to Verify:**
  - [ ] **PPF Interest Rate:** Verify Ministry of Finance rate (currently 7.1% p.a.).
  - [ ] **EPF Interest Rate:** Verify annual CBT declaration (currently 8.25% p.a.).
  - [ ] **NPS Annuity Mandate:** Confirm 40% mandatory minimum annuity threshold at superannuation.
  - [ ] **Bank FD Compounding:** Confirm quarterly compounding convention across major public/private banks.

### 3. Tax & Salary Calculators & Articles
- **Calculators:** `income-tax-calculator`, `salary-calculator`, `hra-calculator`, `gratuity-calculator`
- **Rules to Verify:**
  - [ ] **New Tax Regime Slabs & Section 87A Rebate:** Verify applicable slabs and marginal relief under Finance Act.
  - [ ] **Standard Deduction:** Verify standard deduction (currently ₹75,000 for salaried taxpayers under New Regime).
  - [ ] **Gratuity Exemption Limit:** Verify statutory tax-free gratuity cap under Section 10(10) (currently ₹20 Lakhs).
  - [ ] **HRA Exemption Formula:** Check 50% (Delhi, Mumbai, Kolkata, Chennai) vs 40% non-metro limits.

### 4. Health & Medical Calculators & Articles
- **Calculators:** `bmi-calculator`, `bmr-calculator`, `calorie-calculator`, `body-fat-calculator`, `pregnancy-due-date-calculator`
- **Rules to Verify:**
  - [ ] **Asian-Indian Cutoffs:** Verify ICMR-NIN consensus obesity/overweight thresholds (Normal: 18.5–22.9, Overweight: 23–24.9, Obese: ≥25.0).
  - [ ] **Safe Calorie Floors:** Ensure system never outputs target suggestions below 1,200 kcal/day (women) or 1,500 kcal/day (men).
  - [ ] **Medical Disclaimer:** Verify that medical disclaimer banner remains prominent on all health tool routes.

### 5. State-wise Property, Land Units & Electricity Slabs
- **Configs:** `src/config/rates/stamp-duty.ts`, `src/config/rates/land-units.ts`, `src/config/rates/electricity.ts`
- **States Covered:** Bihar, Uttar Pradesh, Delhi, Maharashtra
- **Rules to Verify:**
  - [ ] **State Stamp Duty & Concessions:** Check women/joint buyer rebates in Bihar (5.7%), UP (6%), Delhi (4%), Maharashtra (5% + 1% Metro Cess).
  - [ ] **Registration Fee Caps:** Verify UP registration cap (₹20,000) and Maharashtra cap (₹30,000).
  - [ ] **Traditional Land Measurement Ratios:** Verify Bigha/Katha in Bihar (27,225 sq ft / 1,361.25 sq ft), Pucca vs Kaccha Bigha in UP, Guntha in Maharashtra (1,089 sq ft), and Delhi Bigha (9,000 sq ft).
  - [ ] **Electricity Tariffs & State Subsidies:** Verify BERC (Bihar), UPERC (UP), DERC 200-unit free scheme (Delhi), and MERC (Maharashtra) tariff orders.

---

## 🔄 Verification Log

| Verification Date | Reviewer | Modules Checked | Changes Applied | Next Due Date |
| :--- | :--- | :--- | :--- | :--- |
| **2026-10-01** | CalcMaster Research Desk | All Phase 1–4 Tools & Articles | Initial Phase 4 Release | **2027-01-01** |
