export type AngleUnit = 'deg' | 'rad';

export interface ScientificInput {
  expression: string;
  angleUnit?: AngleUnit; // default 'deg'
}

export interface CalculationHistoryItem {
  expression: string;
  result: string;
  timestamp: string;
}

export interface ScientificResult {
  expression: string;
  result: number;
  formattedResult: string;
  isValid: boolean;
  errorMessage?: string;
  angleUnit: AngleUnit;
}

/**
 * Computes factorial of non-negative integers
 */
export function factorial(n: number): number {
  if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial only defined for non-negative integers');
  if (n === 0 || n === 1) return 1;
  if (n > 170) return Infinity; // JS Number overflow
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

type TokenType = 'NUMBER' | 'OP' | 'FUNC' | 'LPAREN' | 'RPAREN' | 'COMMA';

interface Token {
  type: TokenType;
  value: string;
}

const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'abs', 'exp']);
const CONSTANTS: Record<string, number> = {
  pi: Math.PI,
  π: Math.PI,
  e: Math.E,
};

/**
 * Tokenizes mathematical expression string safely.
 */
function tokenize(expr: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const clean = expr.replace(/\s+/g, '');

  while (i < clean.length) {
    const ch = clean[i];

    // Numbers & decimals
    if (/[0-9.]/.test(ch)) {
      let numStr = '';
      while (i < clean.length && /[0-9.]/.test(clean[i])) {
        numStr += clean[i];
        i++;
      }
      tokens.push({ type: 'NUMBER', value: numStr });
      continue;
    }

    // Letters (functions or constants)
    if (/[a-zA-Zπ]/.test(ch)) {
      let word = '';
      while (i < clean.length && /[a-zA-Z0-9π]/.test(clean[i])) {
        word += clean[i];
        i++;
      }
      const lower = word.toLowerCase();
      if (lower in CONSTANTS) {
        tokens.push({ type: 'NUMBER', value: CONSTANTS[lower].toString() });
      } else if (FUNCTIONS.has(lower)) {
        tokens.push({ type: 'FUNC', value: lower });
      } else {
        throw new Error(`Unknown identifier: "${word}"`);
      }
      continue;
    }

    // Parentheses
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

    // Comma
    if (ch === ',') {
      tokens.push({ type: 'COMMA', value: ',' });
      i++;
      continue;
    }

    // Operators: +, -, *, /, ^, %, !
    if (['+', '-', '*', '/', '×', '÷', '^', '%', '!'].includes(ch)) {
      const op = ch === '×' ? '*' : ch === '÷' ? '/' : ch;
      tokens.push({ type: 'OP', value: op });
      i++;
      continue;
    }

    throw new Error(`Unexpected character: "${ch}"`);
  }

  return tokens;
}

const PRECEDENCE: Record<string, number> = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '%': 2,
  '^': 3,
  'u-': 4, // Unary minus
  '!': 5, // Factorial postfix
};

/**
 * Converts infix token stream to Reverse Polish Notation (RPN) via Shunting-Yard algorithm.
 */
function shuntingYard(tokens: Token[]): Token[] {
  const output: Token[] = [];
  const opStack: Token[] = [];
  let prevToken: Token | null = null;

  for (let idx = 0; idx < tokens.length; idx++) {
    const token = tokens[idx];

    if (token.type === 'NUMBER') {
      output.push(token);
    } else if (token.type === 'FUNC') {
      opStack.push(token);
    } else if (token.type === 'COMMA') {
      while (opStack.length && opStack[opStack.length - 1].type !== 'LPAREN') {
        output.push(opStack.pop()!);
      }
      if (!opStack.length) throw new Error('Misplaced comma or mismatched parentheses');
    } else if (token.type === 'OP') {
      // Check for unary minus: '-' at start or after '(', or after another operator
      let opVal = token.value;
      if (
        opVal === '-' &&
        (!prevToken || prevToken.type === 'LPAREN' || prevToken.type === 'OP' || prevToken.type === 'COMMA')
      ) {
        opVal = 'u-';
      }

      if (opVal === '!') {
        // Postfix unary operator
        output.push({ type: 'OP', value: '!' });
      } else {
        const p1 = PRECEDENCE[opVal] ?? 0;
        while (opStack.length) {
          const top = opStack[opStack.length - 1];
          if (top.type === 'FUNC') {
            output.push(opStack.pop()!);
            continue;
          }
          if (top.type === 'OP') {
            const p2 = PRECEDENCE[top.value] ?? 0;
            const isRightAssoc = opVal === '^' || opVal === 'u-';
            if ((isRightAssoc && p1 < p2) || (!isRightAssoc && p1 <= p2)) {
              output.push(opStack.pop()!);
              continue;
            }
          }
          break;
        }
        opStack.push({ type: 'OP', value: opVal });
      }
    } else if (token.type === 'LPAREN') {
      opStack.push(token);
    } else if (token.type === 'RPAREN') {
      let foundLParen = false;
      while (opStack.length) {
        const top = opStack.pop()!;
        if (top.type === 'LPAREN') {
          foundLParen = true;
          break;
        }
        output.push(top);
      }
      if (!foundLParen) throw new Error('Mismatched parentheses: closing ")" has no match');
      if (opStack.length && opStack[opStack.length - 1].type === 'FUNC') {
        output.push(opStack.pop()!);
      }
    }

    prevToken = token;
  }

  while (opStack.length) {
    const top = opStack.pop()!;
    if (top.type === 'LPAREN' || top.type === 'RPAREN') {
      throw new Error('Mismatched parentheses: unclosed "("');
    }
    output.push(top);
  }

  return output;
}

/**
 * Evaluates RPN token queue safely without eval.
 */
function evaluateRPN(rpn: Token[], angleUnit: AngleUnit): number {
  const stack: number[] = [];

  for (const token of rpn) {
    if (token.type === 'NUMBER') {
      const n = parseFloat(token.value);
      if (isNaN(n)) throw new Error(`Invalid number: ${token.value}`);
      stack.push(n);
      continue;
    }

    if (token.type === 'OP') {
      if (token.value === 'u-') {
        if (!stack.length) throw new Error('Invalid unary minus expression');
        stack.push(-stack.pop()!);
        continue;
      }
      if (token.value === '!') {
        if (!stack.length) throw new Error('Invalid factorial expression');
        stack.push(factorial(stack.pop()!));
        continue;
      }

      if (stack.length < 2) throw new Error(`Missing operand for operator "${token.value}"`);
      const b = stack.pop()!;
      const a = stack.pop()!;

      switch (token.value) {
        case '+':
          stack.push(a + b);
          break;
        case '-':
          stack.push(a - b);
          break;
        case '*':
          stack.push(a * b);
          break;
        case '/':
          if (b === 0) throw new Error('Division by zero is undefined');
          stack.push(a / b);
          break;
        case '%':
          stack.push(a % b);
          break;
        case '^':
          stack.push(Math.pow(a, b));
          break;
        default:
          throw new Error(`Unsupported operator: ${token.value}`);
      }
      continue;
    }

    if (token.type === 'FUNC') {
      if (!stack.length) throw new Error(`Missing argument for function "${token.value}"`);
      const arg = stack.pop()!;
      const toRad = (deg: number) => (deg * Math.PI) / 180;
      const toDeg = (rad: number) => (rad * 180) / Math.PI;

      switch (token.value) {
        case 'sin': {
          const val = angleUnit === 'deg' ? Math.sin(toRad(arg)) : Math.sin(arg);
          stack.push(parseFloat(val.toFixed(12)));
          break;
        }
        case 'cos': {
          const val = angleUnit === 'deg' ? Math.cos(toRad(arg)) : Math.cos(arg);
          stack.push(parseFloat(val.toFixed(12)));
          break;
        }
        case 'tan': {
          const val = angleUnit === 'deg' ? Math.tan(toRad(arg)) : Math.tan(arg);
          stack.push(parseFloat(val.toFixed(12)));
          break;
        }
        case 'asin': {
          if (arg < -1 || arg > 1) throw new Error('asin argument must be in [-1, 1]');
          const rad = Math.asin(arg);
          stack.push(angleUnit === 'deg' ? toDeg(rad) : rad);
          break;
        }
        case 'acos': {
          if (arg < -1 || arg > 1) throw new Error('acos argument must be in [-1, 1]');
          const rad = Math.acos(arg);
          stack.push(angleUnit === 'deg' ? toDeg(rad) : rad);
          break;
        }
        case 'atan': {
          const rad = Math.atan(arg);
          stack.push(angleUnit === 'deg' ? toDeg(rad) : rad);
          break;
        }
        case 'log': {
          if (arg <= 0) throw new Error('log10 only defined for positive numbers');
          stack.push(Math.log10(arg));
          break;
        }
        case 'ln': {
          if (arg <= 0) throw new Error('ln only defined for positive numbers');
          stack.push(Math.log(arg));
          break;
        }
        case 'sqrt': {
          if (arg < 0) throw new Error('sqrt not defined for negative numbers in real domain');
          stack.push(Math.sqrt(arg));
          break;
        }
        case 'cbrt':
          stack.push(Math.cbrt(arg));
          break;
        case 'abs':
          stack.push(Math.abs(arg));
          break;
        case 'exp':
          stack.push(Math.exp(arg));
          break;
        default:
          throw new Error(`Unknown function: ${token.value}`);
      }
    }
  }

  if (stack.length !== 1) throw new Error('Invalid mathematical expression syntax');
  return stack[0];
}

/**
 * Main safe evaluation entry point.
 */
export function calculateScientific(input: ScientificInput): ScientificResult {
  const angleUnit = input.angleUnit ?? 'deg';
  const expr = input.expression.trim();

  if (!expr) {
    return {
      expression: '',
      result: 0,
      formattedResult: '0',
      isValid: true,
      angleUnit,
    };
  }

  try {
    const tokens = tokenize(expr);
    const rpn = shuntingYard(tokens);
    const result = evaluateRPN(rpn, angleUnit);

    let formatted = `${result}`;
    if (!Number.isInteger(result)) {
      // Clean display rounding for repeating floats
      formatted = parseFloat(result.toFixed(10)).toString();
    }

    return {
      expression: expr,
      result,
      formattedResult: formatted,
      isValid: true,
      angleUnit,
    };
  } catch (err: any) {
    return {
      expression: expr,
      result: 0,
      formattedResult: 'Error',
      isValid: false,
      errorMessage: err.message || 'Syntax Error',
      angleUnit,
    };
  }
}
