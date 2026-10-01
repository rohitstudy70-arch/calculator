export const gstCalculatorContent = {
  pageTitle: 'GST Calculator Online - Add or Remove GST | CalcMaster',
  metaDescription:
      'Free Indian GST Calculator to instantly add or remove GST. Compute CGST, SGST, and IGST for all tax slabs (3%, 5%, 12%, 18%, 28%) with reverse mode.',
  h1: 'GST Calculator - Add or Remove GST Instantly',
  introText: "Use our accurate GST Calculator to quickly figure out the Goods and Services Tax (GST) for your invoices. Whether you need to add GST to a base amount or extract the original price from a GST-inclusive total, our tool simplifies the process. It supports all current Indian GST slabs: 0%, 3%, 5%, 12%, 18%, and 28%, and provides a detailed breakdown of CGST, SGST, and IGST for both inter-state and intra-state transactions.",
  howToUse: [
    { title: "Select Mode", description: "Choose whether you want to 'Add GST' to a base price or 'Remove GST' from a total price." },
    { title: "Enter Amount", description: "Input the transaction amount in INR. This is your base amount if adding GST, or total amount if removing GST." },
    { title: "Choose GST Rate", description: "Select the applicable GST slab (3%, 5%, 12%, 18%, or 28%) from the dropdown." },
    { title: "Select Transaction Type", description: "Choose whether the transaction is within the same state (CGST + SGST) or between different states (IGST)." },
    { title: "View Breakdown", description: "Instantly see the base price, total GST amount, separated tax components, and the final total price." }
  ],
  formulaExplanation: "GST is calculated differently based on whether you are adding it to an exclusive amount or removing it from an inclusive amount. \n\n**Adding GST:** \nGST Amount = (Base Price × GST Rate) / 100 \nTotal Price = Base Price + GST Amount \n\n**Removing GST:** \nBase Price = Total Price / [1 + (GST Rate / 100)] \nGST Amount = Total Price - Base Price",
  solvedExamples: [
    { title: "Adding 18% GST to ₹10,000", calculation: "Base Price: ₹10,000\nGST Rate: 18%\nGST Amount = 10,000 × (18/100) = ₹1,800\nTotal Price = 10,000 + 1,800 = ₹11,800" },
    { title: "Removing 12% GST from ₹56,000", calculation: "Total Price: ₹56,000\nGST Rate: 12%\nBase Price = 56,000 / (1 + 12/100) = 56,000 / 1.12 = ₹50,000\nGST Amount = 56,000 - 50,000 = ₹6,000" },
    { title: "Inter-state vs Intra-state", calculation: "For a ₹1,800 GST amount:\nIntra-state: CGST = ₹900, SGST = ₹900\nInter-state: IGST = ₹1,800" }
  ],
  tips: [
    "Always double-check the applicable HSN/SAC code to confirm the correct GST rate for your goods or services.",
    "For intra-state sales (within the same state), GST is divided equally into CGST (Central GST) and SGST (State GST).",
    "For inter-state sales (between different states), the full tax amount goes to IGST (Integrated GST).",
    "If your vendor gives you a final price and says 'GST included', use the 'Remove GST' option to find the base cost.",
    "Keep track of your purchase invoices to claim Input Tax Credit (ITC) against your tax liability."
  ],
  commonMistakes: [
    "Applying the GST rate to the total inclusive amount instead of calculating backward to find the base price.",
    "Charging IGST on a local sale instead of splitting it into CGST and SGST.",
    "Forgetting to update billing systems when the government changes the GST slab for a particular item.",
    "Assuming all essential goods have a 0% GST rate—always verify the latest government notification."
  ],
  faqs: [
    { question: "What is GST?", answer: "GST stands for Goods and Services Tax. It is an indirect tax used in India on the supply of goods and services, replacing multiple overlapping taxes like excise duty, VAT, and service tax." },
    { question: "What are the different GST slabs in India?", answer: "The primary GST tax slabs in India currently are 0% (exempted goods), 5%, 12%, 18%, and 28%. Additionally, there is a special 3% rate for gold and certain precious stones, and 0.25% for rough diamonds." },
    { question: "What is the difference between CGST, SGST, and IGST?", answer: "CGST is the Central GST collected by the central government, SGST is the State GST collected by the state government. Both apply to intra-state sales. IGST is the Integrated GST collected by the central government on inter-state sales." },
    { question: "How do I calculate GST backward from the total?", answer: "To find the base amount from a GST-inclusive total, divide the total amount by (1 + GST Rate/100). The difference between the total and the base amount is the GST component." },
    { question: "Who needs to register for GST?", answer: "Generally, businesses with an annual turnover exceeding ₹40 lakhs for goods (₹20 lakhs for special category states) or ₹20 lakhs for services must register for GST. Inter-state suppliers must register regardless of turnover." },
    { question: "Can I claim a refund on GST paid?", answer: "Yes, businesses can claim Input Tax Credit (ITC) for the GST paid on purchases used for business purposes, which offsets the GST they collect on sales." },
    { question: "Is GST applicable on salary?", answer: "No, salaries paid to employees are not considered a supply of services under the GST act, hence no GST is levied on employment income." },
    { question: "What is an HSN code?", answer: "HSN stands for Harmonized System of Nomenclature. It is an internationally accepted coding system used to classify goods under GST and determine the applicable tax rate." }
  ],
  relatedCalculators: [
    { title: "EMI Calculator", link: "/emi-calculator" },
    { title: "Income Tax Calculator", link: "/income-tax-calculator" },
    { title: "Salary Calculator", link: "/salary-calculator" }
  ]
};
