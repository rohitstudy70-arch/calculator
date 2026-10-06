import {
  convertCurrency,
  generateDenominationTable,
  validateCurrencyInput,
  DEFAULT_CURRENCIES,
} from '@/lib/calculators/currency';
import { currencyContent } from '@/data/calculator-content/currency';

describe('Currency Converter Unit Tests', () => {
  test('Direct conversion USD to INR using baseline rate', () => {
    const res = convertCurrency({
      amount: 100,
      fromCurrency: 'USD',
      toCurrency: 'INR',
    });

    expect(res.fromCurrency).toBe('USD');
    expect(res.toCurrency).toBe('INR');
    expect(res.exchangeRate).toBeCloseTo(86.85, 1);
    expect(res.convertedAmount).toBeCloseTo(8685, 0);
    expect(res.formattedResult).toContain('₹');
  });

  test('Cross-currency bridge conversion AED to INR', () => {
    // 1 USD = 86.85 INR, 1 USD = 3.6725 AED -> 1 AED = 86.85 / 3.6725 = 23.6487 INR
    const res = convertCurrency({
      amount: 1000,
      fromCurrency: 'AED',
      toCurrency: 'INR',
    });

    expect(res.exchangeRate).toBeCloseTo(23.65, 1);
    expect(res.convertedAmount).toBeCloseTo(23648.74, 0);
  });

  test('Inverse rate calculation consistency', () => {
    const res = convertCurrency({
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'INR',
    });

    const product = res.exchangeRate * res.inverseRate;
    expect(product).toBeCloseTo(1, 2);
  });

  test('Custom live market rates override default rates correctly', () => {
    const customRates = {
      USD: 1,
      INR: 88.0,
      EUR: 0.9,
    };

    const res = convertCurrency(
      {
        amount: 50,
        fromCurrency: 'USD',
        toCurrency: 'INR',
      },
      customRates,
      true
    );

    expect(res.exchangeRate).toBe(88.0);
    expect(res.convertedAmount).toBe(4400);
    expect(res.isLive).toBe(true);
  });

  test('generateDenominationTable generates expected values', () => {
    const table = generateDenominationTable('USD', 'INR', 85);
    expect(table.length).toBe(12);
    expect(table[0].fromAmount).toBe(1);
    expect(table[0].toAmount).toBe('85.00');
    expect(table[5].fromAmount).toBe(100);
  });

  test('Input validation works properly', () => {
    expect(
      validateCurrencyInput({ amount: -50, fromCurrency: 'USD', toCurrency: 'INR' }).valid
    ).toBe(false);

    expect(
      validateCurrencyInput({ amount: 100, fromCurrency: '', toCurrency: 'INR' }).valid
    ).toBe(false);

    expect(
      validateCurrencyInput({ amount: 100, fromCurrency: 'USD', toCurrency: 'INR' }).valid
    ).toBe(true);
  });

  test('DEFAULT_CURRENCIES has at least 20 major currencies with INR, USD, AED, EUR, GBP', () => {
    const keys = Object.keys(DEFAULT_CURRENCIES);
    expect(keys.length).toBeGreaterThanOrEqual(20);
    expect(DEFAULT_CURRENCIES.USD).toBeDefined();
    expect(DEFAULT_CURRENCIES.INR).toBeDefined();
    expect(DEFAULT_CURRENCIES.AED).toBeDefined();
    expect(DEFAULT_CURRENCIES.EUR).toBeDefined();
    expect(DEFAULT_CURRENCIES.GBP).toBeDefined();
  });

  test('Currency content meets Google Ads & SEO constraints', () => {
    expect(currencyContent.en.pageTitle.length).toBeLessThanOrEqual(60);
    expect(currencyContent.en.pageTitle.length).toBeGreaterThanOrEqual(30);
    expect(currencyContent.en.metaDescription.length).toBeLessThanOrEqual(155);
    expect(currencyContent.en.metaDescription.length).toBeGreaterThanOrEqual(100);
    expect(currencyContent.en.faqs.length).toBeGreaterThanOrEqual(8);

    // Hindi content
    expect(currencyContent.hi.pageTitle.length).toBeLessThanOrEqual(60);
    expect(currencyContent.hi.metaDescription.length).toBeLessThanOrEqual(155);
  });
});
