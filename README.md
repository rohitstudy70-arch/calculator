# CalcMaster India 🇮🇳

![CalcMaster India](https://calcmaster.in/og-image.png) <!-- Update with actual OG image path when ready -->

CalcMaster India is a modern, fast, and responsive web application offering a suite of free online calculators designed specifically for the Indian context (e.g., Indian tax rules, EMI, EPF, PPF). It provides users with instant, accurate calculations without collecting any personal financial data.

**Live Website:** [https://calcmaster.in](https://calcmaster.in)

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Components, Static Site Generation - SSG)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Deployment:** [Vercel](https://vercel.com/)
- **Icons:** [Heroicons](https://heroicons.com/) (or similar SVG icons)

## 📦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/calculator.git
   cd calculator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 🛠️ Build and Test

- **Build for Production (Static Export):**
  ```bash
  npm run build
  ```
  This will generate a static HTML/CSS/JS output in the `out` directory (if configured for static export) or `.next` directory.

- **Run Tests (if configured):**
  ```bash
  npm run test
  ```

## 🌐 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fcalculator)

**Manual Vercel CLI Deployment:**
```bash
npm i -g vercel
vercel
```

## 📁 Project Structure

```text
calculator/
├── public/                 # Static assets (images, favicons, etc.)
├── src/
│   ├── app/                # Next.js App Router (pages, layouts, API routes)
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── loan-calculators/ # Category hub page
│   │   ├── sitemap.ts      # Automated sitemap generation
│   │   ├── robots.ts       # Automated robots.txt generation
│   │   └── ...
│   ├── components/         # Reusable React components (CalculatorCard, UI elements)
│   └── lib/                # Utility functions, constants, types
│       └── constants.ts    # Centralized categories and calculator list
├── README.md
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ➕ Adding a New Calculator

Adding a new calculator is straightforward. Here is the recommended pattern (referencing the EMI calculator structure):

1. **Define the Route:**
   Create a new folder in `src/app/` with the calculator's slug (e.g., `src/app/new-calc/page.tsx`).

2. **Add Metadata:**
   In `page.tsx`, export a `metadata` object for SEO.
   ```tsx
   export const metadata: Metadata = {
     title: 'New Calculator | CalcMaster India',
     description: 'Description of the new calculator.',
   };
   ```

3. **Build the Client Component:**
   Create the interactive calculator component (e.g., `src/components/calculators/NewCalculator.tsx`) using `'use client'`. This component should handle state, inputs, and the calculation logic.

4. **Update Constants:**
   Add the new calculator to the appropriate category in `src/lib/constants.ts` so it automatically appears on category hub pages and the sitemap.
   ```typescript
   { 
     id: 'new-calc', 
     name: 'New Calc', 
     nameHi: 'नया कैलकुलेटर', 
     slug: 'new-calc', 
     description: 'Brief description.' 
   }
   ```

## 🗂️ Calculator Categories

CalcMaster India features calculators across several domains:

- **Loan Calculators:** EMI, Home Loan, Personal Loan, Car Loan, Prepayment
- **Investment Calculators:** SIP, Lumpsum, FD, RD, PPF, EPF, NPS, CAGR, Interest
- **Tax Calculators:** GST, Income Tax, HRA, Gratuity, Salary In-Hand
- **Retirement Calculators:** Retirement Corpus, Inflation, NPS
- **Health Calculators:** BMI, BMR, Calorie, Body Fat, Pregnancy
- **Math Calculators:** Percentage, Fraction, Scientific, Age, Date Diff
- **Utility Calculators:** Unit Converter, Tip, GPA

## 🤝 Contributing

Contributions are welcome! If you have an idea for a new calculator or want to improve an existing one:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

Please ensure your code follows the existing style and that all calculations are accurate and thoroughly tested.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
