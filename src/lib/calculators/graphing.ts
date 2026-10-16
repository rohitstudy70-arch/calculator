/**
 * Safe Mathematical Expression Parser & Graphing Engine
 * Computes 2D function points f(x) without using eval() or Function() constructor.
 */

export interface GraphPoint {
  x: number;
  y: number;
}

export interface GraphDataset {
  expression: string;
  color: string;
  points: GraphPoint[];
}

export interface GraphPreset {
  name: string;
  expression: string;
  category: 'algebra' | 'trigonometry' | 'calculus' | 'polynomial';
  description: string;
}

export const GRAPH_PRESETS: GraphPreset[] = [
  { name: 'Quadratic Parabola', expression: 'x^2 - 4', category: 'polynomial', description: 'Classic U-shaped parabola with roots at x = ±2' },
  { name: 'Linear Equation', expression: '2*x + 1', category: 'algebra', description: 'Straight line with slope 2 and y-intercept 1' },
  { name: 'Cubic Curve', expression: 'x^3 - 3*x', category: 'polynomial', description: 'S-curve showing local maximum and minimum turning points' },
  { name: 'Sine Wave', expression: 'sin(x)', category: 'trigonometry', description: 'Periodic sinusoidal oscillation with amplitude 1' },
  { name: 'Cosine Wave', expression: 'cos(x)', category: 'trigonometry', description: 'Standard harmonic cosine wave' },
  { name: 'Exponential Growth', expression: 'e^x', category: 'calculus', description: 'Continuous compounding exponential curve' },
  { name: 'Square Root', expression: 'sqrt(x)', category: 'algebra', description: 'Half parabola defined for x >= 0' },
  { name: 'Absolute Value', expression: 'abs(x)', category: 'algebra', description: 'V-shaped continuous curve with corner at origin' },
  { name: 'Rational / Hyperbola', expression: '1/x', category: 'calculus', description: 'Hyperbolic curve with vertical asymptote at x = 0' },
  { name: 'Gaussian Bell Curve', expression: 'e^(-(x^2))', category: 'calculus', description: 'Normal distribution bell curve centered at x = 0' },
];

/**
 * Tokenizes mathematical expression and normalizes implicit multiplication.
 * E.g., '2x' -> '2 * x', '3sin(x)' -> '3 * sin(x)', '(x+1)(x-1)' -> '(x+1) * (x-1)'
 */
function normalizeExpression(expr: string): string {
  let s = expr.toLowerCase().replace(/\s+/g, '');

  // Replace pi and e
  s = s.replace(/\bpi\b/g, `${Math.PI}`);
  
  // Implicit multiplication: number followed by x or letter or (
  s = s.replace(/(\d+)([a-z\(])/g, '$1*$2');
  // Implicit multiplication: ) followed by ( or variable or number
  s = s.replace(/\)([\(a-z\d])/g, ')*$1');
  // Implicit multiplication: 'x' followed by '(' or function
  s = s.replace(/x(\()/g, 'x*$1');

  return s;
}

type TokenType = 'NUMBER' | 'VAR' | 'OP' | 'FUNC' | 'LPAREN' | 'RPAREN';

interface Token {
  type: TokenType;
  value: string;
}

function tokenize(normalized: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;

  while (i < normalized.length) {
    const ch = normalized[i];

    if (/\d|\./.test(ch)) {
      let num = '';
      while (i < normalized.length && /[\d\.]/.test(normalized[i])) {
        num += normalized[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: num });
      continue;
    }

    if (ch === 'x') {
      tokens.push({ type: 'VAR', value: 'x' });
      i++;
      continue;
    }

    if (/[a-z]/.test(ch)) {
      let word = '';
      while (i < normalized.length && /[a-z]/.test(normalized[i])) {
        word += normalized[i];
        i++;
      }
      tokens.push({ type: 'FUNC', value: word });
      continue;
    }

    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '^' || ch === '%') {
      tokens.push({ type: 'OP', value: ch });
      i++;
      continue;
    }

    if (ch === '(') {
      tokens.push({ type: 'LPAREN', value: '(' });
      i++;
      continue;
    }

    if (ch === ')') {
      tokens.push({ type: 'RPAREN', value: ')' });
      i++;
      continue;
    }

    // Skip any unknown character
    i++;
  }

  return tokens;
}

/**
 * Recursive Descent Parser to evaluate tokens with given x value.
 */
class ExpressionEvaluator {
  private tokens: Token[];
  private pos = 0;
  private xVal: number;

  constructor(tokens: Token[], xVal: number) {
    this.tokens = tokens;
    this.xVal = xVal;
  }

  public parse(): number {
    this.pos = 0;
    const res = this.parseExpression();
    return res;
  }

  // expr = term (( '+' | '-' ) term)*
  private parseExpression(): number {
    let left = this.parseTerm();

    while (this.pos < this.tokens.length) {
      const tok = this.tokens[this.pos];
      if (tok.type === 'OP' && (tok.value === '+' || tok.value === '-')) {
        this.pos++;
        const right = this.parseTerm();
        left = tok.value === '+' ? left + right : left - right;
      } else {
        break;
      }
    }

    return left;
  }

  // term = power (( '*' | '/' | '%' ) power)*
  private parseTerm(): number {
    let left = this.parsePower();

    while (this.pos < this.tokens.length) {
      const tok = this.tokens[this.pos];
      if (tok.type === 'OP' && (tok.value === '*' || tok.value === '/' || tok.value === '%')) {
        this.pos++;
        const right = this.parsePower();
        if (tok.value === '*') left = left * right;
        else if (tok.value === '/') left = right === 0 ? NaN : left / right;
        else if (tok.value === '%') left = left % right;
      } else {
        break;
      }
    }

    return left;
  }

  // power = unary ( '^' unary )*
  private parsePower(): number {
    let left = this.parseUnary();

    if (this.pos < this.tokens.length && this.tokens[this.pos].type === 'OP' && this.tokens[this.pos].value === '^') {
      this.pos++;
      const right = this.parsePower(); // right-associative
      left = Math.pow(left, right);
    }

    return left;
  }

  // unary = ( '+' | '-' ) unary | factor
  private parseUnary(): number {
    if (this.pos < this.tokens.length && this.tokens[this.pos].type === 'OP') {
      const op = this.tokens[this.pos].value;
      if (op === '+' || op === '-') {
        this.pos++;
        const val = this.parseUnary();
        return op === '-' ? -val : val;
      }
    }
    return this.parseFactor();
  }

  // factor = NUMBER | VAR | FUNC '(' expr ')' | '(' expr ')'
  private parseFactor(): number {
    if (this.pos >= this.tokens.length) return NaN;

    const tok = this.tokens[this.pos];

    if (tok.type === 'NUMBER') {
      this.pos++;
      return parseFloat(tok.value);
    }

    if (tok.type === 'VAR') {
      this.pos++;
      return this.xVal;
    }

    if (tok.type === 'FUNC') {
      const funcName = tok.value;
      this.pos++;

      if (funcName === 'e') {
        return Math.E;
      }

      if (this.pos < this.tokens.length && this.tokens[this.pos].type === 'LPAREN') {
        this.pos++; // consume '('
        const arg = this.parseExpression();
        if (this.pos < this.tokens.length && this.tokens[this.pos].type === 'RPAREN') {
          this.pos++; // consume ')'
        }

        switch (funcName) {
          case 'sin': return Math.sin(arg);
          case 'cos': return Math.cos(arg);
          case 'tan': return Math.tan(arg);
          case 'sqrt': return arg < 0 ? NaN : Math.sqrt(arg);
          case 'cbrt': return Math.cbrt(arg);
          case 'abs': return Math.abs(arg);
          case 'ln': return arg <= 0 ? NaN : Math.log(arg);
          case 'log': return arg <= 0 ? NaN : Math.log10(arg);
          case 'exp': return Math.exp(arg);
          default: return NaN;
        }
      }
      return NaN;
    }

    if (tok.type === 'LPAREN') {
      this.pos++; // consume '('
      const val = this.parseExpression();
      if (this.pos < this.tokens.length && this.tokens[this.pos].type === 'RPAREN') {
        this.pos++; // consume ')'
      }
      return val;
    }

    return NaN;
  }
}

/**
 * Validates whether expression is syntactically sound.
 */
export function validateExpression(expr: string): { valid: boolean; error?: string } {
  if (!expr || !expr.trim()) {
    return { valid: false, error: 'Expression cannot be empty.' };
  }

  // Check parentheses balance
  let parenCount = 0;
  for (const char of expr) {
    if (char === '(') parenCount++;
    if (char === ')') parenCount--;
    if (parenCount < 0) {
      return { valid: false, error: 'Unmatched closing parenthesis.' };
    }
  }
  if (parenCount !== 0) {
    return { valid: false, error: 'Unmatched opening parenthesis.' };
  }

  const ALLOWED_FUNCS = new Set(['sin', 'cos', 'tan', 'sqrt', 'cbrt', 'abs', 'ln', 'log', 'exp', 'e']);

  try {
    const normalized = normalizeExpression(expr);
    const tokens = tokenize(normalized);
    if (tokens.length === 0) return { valid: false, error: 'No valid mathematical tokens found.' };

    for (const tok of tokens) {
      if (tok.type === 'FUNC' && !ALLOWED_FUNCS.has(tok.value)) {
        return { valid: false, error: `Unsupported function or variable "${tok.value}".` };
      }
    }

    const evaluator = new ExpressionEvaluator(tokens, 1.0);
    const result = evaluator.parse();
    if (typeof result !== 'number') {
      return { valid: false, error: 'Invalid mathematical expression.' };
    }
    return { valid: true };
  } catch (err: any) {
    return { valid: false, error: err.message || 'Expression parsing error.' };
  }
}

/**
 * Evaluates f(x) for single numerical x.
 */
export function evaluateExpression(expr: string, x: number): number {
  try {
    const normalized = normalizeExpression(expr);
    const tokens = tokenize(normalized);
    const evaluator = new ExpressionEvaluator(tokens, x);
    return evaluator.parse();
  } catch {
    return NaN;
  }
}

/**
 * Generates an array of (x, y) coordinates for canvas/SVG plotting.
 */
export function generateGraphPoints(
  expr: string,
  xMin = -10,
  xMax = 10,
  numPoints = 300
): { points: GraphPoint[]; hasErrors: boolean } {
  const points: GraphPoint[] = [];
  let hasErrors = false;

  const validation = validateExpression(expr);
  if (!validation.valid) {
    return { points: [], hasErrors: true };
  }

  const step = (xMax - xMin) / (numPoints - 1);
  const normalized = normalizeExpression(expr);
  const tokens = tokenize(normalized);

  for (let i = 0; i < numPoints; i++) {
    const x = xMin + i * step;
    const evaluator = new ExpressionEvaluator(tokens, x);
    const y = evaluator.parse();

    if (isNaN(y) || !isFinite(y)) {
      hasErrors = true;
      continue;
    }

    // Clamp huge values to prevent SVG path overflow
    if (Math.abs(y) <= 1000) {
      points.push({ x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) });
    }
  }

  return { points, hasErrors };
}

/**
 * Discovers approximate roots (x-intercepts where f(x) = 0) within range.
 */
export function findRoots(expr: string, xMin = -10, xMax = 10, steps = 150): number[] {
  const roots: number[] = [];
  const step = (xMax - xMin) / steps;
  let prevY = evaluateExpression(expr, xMin);

  for (let i = 1; i <= steps; i++) {
    const currX = xMin + i * step;
    const currY = evaluateExpression(expr, currX);

    if (Math.abs(currY) < 1e-6) {
      roots.push(Number(currX.toFixed(2)));
    } else if (prevY * currY < 0 && Math.abs(currY - prevY) < 50) {
      // Linear interpolation to find precise zero crossing
      const rootX = currX - (currY * step) / (currY - prevY);
      const rounded = Number(rootX.toFixed(2));
      if (!roots.includes(rounded)) {
        roots.push(rounded);
      }
    }
    prevY = currY;
  }

  return roots.slice(0, 6); // Top 6 roots
}

/**
 * Generates value table for display.
 */
export function generateValueTable(
  expr: string,
  start = -5,
  end = 5,
  step = 1
): { x: number; y: number | null }[] {
  const rows: { x: number; y: number | null }[] = [];
  for (let x = start; x <= end + 1e-6; x += step) {
    const val = evaluateExpression(expr, x);
    rows.push({
      x: Number(x.toFixed(2)),
      y: isNaN(val) || !isFinite(val) ? null : Number(val.toFixed(4)),
    });
  }
  return rows;
}
