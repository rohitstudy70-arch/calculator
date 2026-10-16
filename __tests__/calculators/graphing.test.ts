import {
  evaluateExpression,
  validateExpression,
  generateGraphPoints,
  findRoots,
  generateValueTable,
} from '@/lib/calculators/graphing';

describe('Graphing Engine', () => {
  describe('evaluateExpression', () => {
    it('evaluates basic polynomial arithmetic', () => {
      expect(evaluateExpression('x + 5', 3)).toBe(8);
      expect(evaluateExpression('2*x - 4', 2)).toBe(0);
      expect(evaluateExpression('x^2 - 9', 3)).toBe(0);
      expect(evaluateExpression('x^2 + 2*x + 1', 3)).toBe(16);
    });

    it('evaluates implicit multiplication', () => {
      expect(evaluateExpression('2x + 1', 4)).toBe(9);
      expect(evaluateExpression('3(x + 2)', 2)).toBe(12);
      expect(evaluateExpression('(x - 1)(x + 1)', 3)).toBe(8);
    });

    it('evaluates trigonometric functions', () => {
      expect(evaluateExpression('sin(0)', 0)).toBe(0);
      expect(Math.abs(evaluateExpression('cos(0)', 0) - 1)).toBeLessThan(1e-6);
      expect(evaluateExpression('sin(x)', Math.PI / 2)).toBeCloseTo(1, 4);
    });

    it('evaluates roots, logs, and exponential', () => {
      expect(evaluateExpression('sqrt(x)', 16)).toBe(4);
      expect(evaluateExpression('cbrt(x)', 27)).toBe(3);
      expect(evaluateExpression('abs(x)', -7)).toBe(7);
      expect(evaluateExpression('ln(e)', 1)).toBeCloseTo(1, 4);
    });

    it('handles negative numbers and operator precedence', () => {
      expect(evaluateExpression('-x', 5)).toBe(-5);
      expect(evaluateExpression('3 + 4 * 2', 0)).toBe(11);
      expect(evaluateExpression('(3 + 4) * 2', 0)).toBe(14);
      expect(evaluateExpression('2^3^2', 0)).toBe(512); // right-associative: 2^(3^2) = 2^9 = 512
    });
  });

  describe('validateExpression', () => {
    it('validates correct expressions', () => {
      expect(validateExpression('x^2 - 4').valid).toBe(true);
      expect(validateExpression('sin(x) + cos(x)').valid).toBe(true);
      expect(validateExpression('2x + 1').valid).toBe(true);
    });

    it('rejects empty or whitespace expressions', () => {
      expect(validateExpression('').valid).toBe(false);
      expect(validateExpression('   ').valid).toBe(false);
    });

    it('rejects unmatched parentheses', () => {
      expect(validateExpression('(x + 2').valid).toBe(false);
      expect(validateExpression('x + 2)').valid).toBe(false);
    });

    it('rejects unknown variables or unsupported functions', () => {
      expect(validateExpression('alert(1)').valid).toBe(false);
      expect(validateExpression('y + 5').valid).toBe(false);
    });
  });

  describe('generateGraphPoints', () => {
    it('generates correct number of points within interval', () => {
      const res = generateGraphPoints('x^2', -5, 5, 101);
      expect(res.hasErrors).toBe(false);
      expect(res.points.length).toBe(101);
      expect(res.points[0].x).toBe(-5);
      expect(res.points[0].y).toBe(25);
      expect(res.points[50].x).toBe(0);
      expect(res.points[50].y).toBe(0);
      expect(res.points[100].x).toBe(5);
      expect(res.points[100].y).toBe(25);
    });

    it('clamps or skips asymptotic undefined values', () => {
      const res = generateGraphPoints('1/x', -5, 5, 50);
      expect(res.points.length).toBeGreaterThan(0);
      // none of the points should be NaN or infinite
      res.points.forEach((p) => {
        expect(isNaN(p.y)).toBe(false);
        expect(isFinite(p.y)).toBe(true);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(1000);
      });
    });
  });

  describe('findRoots', () => {
    it('discovers roots for x^2 - 4 at x = -2 and x = 2', () => {
      const roots = findRoots('x^2 - 4', -5, 5);
      expect(roots).toContain(-2);
      expect(roots).toContain(2);
    });

    it('discovers root for 2x - 6 at x = 3', () => {
      const roots = findRoots('2*x - 6', -5, 5);
      expect(roots).toContain(3);
    });
  });

  describe('generateValueTable', () => {
    it('generates discrete table rows', () => {
      const table = generateValueTable('2*x', -2, 2, 1);
      expect(table.length).toBe(5);
      expect(table[0]).toEqual({ x: -2, y: -4 });
      expect(table[2]).toEqual({ x: 0, y: 0 });
      expect(table[4]).toEqual({ x: 2, y: 4 });
    });
  });
});
