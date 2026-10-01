export type FractionOperation = 'add' | 'subtract' | 'multiply' | 'divide';

export interface FractionInput {
  op: FractionOperation;
  // Fraction 1: whole + num / den
  whole1?: number;
  num1: number;
  den1: number;
  // Fraction 2: whole + num / den
  whole2?: number;
  num2: number;
  den2: number;
}

export interface FractionResult {
  numerator: number;
  denominator: number;
  wholeNumber: number;
  remainderNumerator: number;
  isMixed: boolean;
  decimalValue: number;
  formattedFraction: string;
  formattedMixed: string;
  steps: string[];
  gcdValue: number;
}

/**
 * Greatest Common Divisor (Euclidean algorithm)
 */
export function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

/**
 * Least Common Multiple
 */
export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function validateFractionInput(input: FractionInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!input.den1 || input.den1 === 0) {
    errors.den1 = 'Denominator 1 cannot be zero';
  }
  if (!input.den2 || input.den2 === 0) {
    errors.den2 = 'Denominator 2 cannot be zero';
  }
  if (input.op === 'divide') {
    const w2 = input.whole2 ?? 0;
    const improper2 = w2 >= 0 ? w2 * input.den2 + input.num2 : w2 * input.den2 - input.num2;
    if (improper2 === 0) {
      errors.op = 'Cannot divide by a fraction equal to zero';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Solves fraction arithmetic with complete step-by-step simplification.
 */
export function calculateFraction(input: FractionInput): FractionResult {
  const w1 = input.whole1 ?? 0;
  const n1 = input.num1 ?? 0;
  const d1 = input.den1 || 1;

  const w2 = input.whole2 ?? 0;
  const n2 = input.num2 ?? 0;
  const d2 = input.den2 || 1;

  // Convert to improper fractions
  const impNum1 = w1 >= 0 ? w1 * d1 + n1 : w1 * d1 - n1;
  const impDen1 = d1;

  const impNum2 = w2 >= 0 ? w2 * d2 + n2 : w2 * d2 - n2;
  const impDen2 = d2;

  let rawNum = 0;
  let rawDen = 1;
  const steps: string[] = [];

  if (w1 !== 0 || w2 !== 0) {
    steps.push(
      `Convert mixed numbers to improper fractions: ${
        w1 !== 0 ? `${w1} ${n1}/${d1} = ${impNum1}/${impDen1}` : `${n1}/${d1}`
      } and ${w2 !== 0 ? `${w2} ${n2}/${d2} = ${impNum2}/${impDen2}` : `${n2}/${d2}`}`
    );
  }

  if (input.op === 'add' || input.op === 'subtract') {
    const commonDen = lcm(impDen1, impDen2);
    const m1 = commonDen / impDen1;
    const m2 = commonDen / impDen2;
    const adjNum1 = impNum1 * m1;
    const adjNum2 = impNum2 * m2;

    steps.push(`Find the Least Common Denominator (LCD) of ${impDen1} and ${impDen2}: LCD = ${commonDen}`);
    steps.push(
      `Adjust numerators: (${impNum1} × ${m1}) / ${commonDen} = ${adjNum1}/${commonDen}, and (${impNum2} × ${m2}) / ${commonDen} = ${adjNum2}/${commonDen}`
    );

    if (input.op === 'add') {
      rawNum = adjNum1 + adjNum2;
      rawDen = commonDen;
      steps.push(`Add numerators over common denominator: (${adjNum1} + ${adjNum2}) / ${commonDen} = ${rawNum}/${rawDen}`);
    } else {
      rawNum = adjNum1 - adjNum2;
      rawDen = commonDen;
      steps.push(`Subtract numerators: (${adjNum1} - ${adjNum2}) / ${commonDen} = ${rawNum}/${rawDen}`);
    }
  } else if (input.op === 'multiply') {
    rawNum = impNum1 * impNum2;
    rawDen = impDen1 * impDen2;
    steps.push(`Multiply numerators: ${impNum1} × ${impNum2} = ${rawNum}`);
    steps.push(`Multiply denominators: ${impDen1} × ${impDen2} = ${rawDen}`);
    steps.push(`Result before simplification = ${rawNum}/${rawDen}`);
  } else if (input.op === 'divide') {
    steps.push(`Invert the second fraction and multiply: (${impNum1}/${impDen1}) × (${impDen2}/${impNum2})`);
    rawNum = impNum1 * impDen2;
    rawDen = impDen1 * impNum2;
    if (rawDen < 0) {
      rawNum = -rawNum;
      rawDen = -rawDen;
    }
    steps.push(`Cross-multiplied result = ${rawNum}/${rawDen}`);
  }

  // Simplify using GCD
  const commonDivisor = gcd(rawNum, rawDen);
  const simNum = rawNum / commonDivisor;
  const simDen = rawDen / commonDivisor;

  if (commonDivisor > 1) {
    steps.push(`Reduce fraction by greatest common divisor (GCD = ${commonDivisor}): ${rawNum} ÷ ${commonDivisor} / ${rawDen} ÷ ${commonDivisor} = ${simNum}/${simDen}`);
  }

  // Mixed number extraction
  const wholePart = simDen !== 0 ? Math.trunc(simNum / simDen) : 0;
  const remNum = Math.abs(simNum % simDen);
  const isMixed = Math.abs(simNum) >= simDen && remNum !== 0;

  const decimalVal = simDen !== 0 ? parseFloat((simNum / simDen).toFixed(6)) : 0;

  let formattedFraction = `${simNum}/${simDen}`;
  if (simDen === 1) formattedFraction = `${simNum}`;

  let formattedMixed = formattedFraction;
  if (isMixed) {
    formattedMixed = `${wholePart} ${remNum}/${simDen}`;
    steps.push(`Convert to mixed number: ${simNum} ÷ ${simDen} = ${wholePart} with remainder ${remNum} → ${wholePart} ${remNum}/${simDen}`);
  }

  return {
    numerator: simNum,
    denominator: simDen,
    wholeNumber: wholePart,
    remainderNumerator: remNum,
    isMixed,
    decimalValue: decimalVal,
    formattedFraction,
    formattedMixed,
    steps,
    gcdValue: commonDivisor,
  };
}
