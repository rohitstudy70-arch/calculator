export interface Currency {
  code: string;
  name: string;
  nameHi: string;
  symbol: string;
  flag: string;
  rateToUSD: number; // How many units per 1 USD
}

// Baseline market rates (Oct 2026 baseline, updated live via open API)
export const DEFAULT_CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', nameHi: 'अमेरिकी डॉलर', symbol: '$', flag: '🇺🇸', rateToUSD: 1.0 },
  INR: { code: 'INR', name: 'Indian Rupee', nameHi: 'भारतीय रुपया', symbol: '₹', flag: '🇮🇳', rateToUSD: 86.85 },
  AED: { code: 'AED', name: 'UAE Dirham', nameHi: 'यूएई दिरहम', symbol: 'د.إ', flag: '🇦🇪', rateToUSD: 3.6725 },
  EUR: { code: 'EUR', name: 'Euro', nameHi: 'यूरो', symbol: '€', flag: '🇪🇺', rateToUSD: 0.925 },
  GBP: { code: 'GBP', name: 'British Pound Sterling', nameHi: 'ब्रिटिश पाउंड', symbol: '£', flag: '🇬🇧', rateToUSD: 0.775 },
  SAR: { code: 'SAR', name: 'Saudi Riyal', nameHi: 'सऊदी रियाल', symbol: '﷼', flag: '🇸🇦', rateToUSD: 3.75 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', nameHi: 'कनाडाई डॉलर', symbol: 'C$', flag: '🇨🇦', rateToUSD: 1.38 },
  AUD: { code: 'AUD', name: 'Australian Dollar', nameHi: 'ऑस्ट्रेलियाई डॉलर', symbol: 'A$', flag: '🇦🇺', rateToUSD: 1.52 },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', nameHi: 'कुवैती दिनार', symbol: 'KD', flag: '🇰🇼', rateToUSD: 0.306 },
  QAR: { code: 'QAR', name: 'Qatari Riyal', nameHi: 'कतरी रियाल', symbol: 'QR', flag: '🇶🇦', rateToUSD: 3.64 },
  OMR: { code: 'OMR', name: 'Omani Rial', nameHi: 'ओमानी रियाल', symbol: 'RO', flag: '🇴🇲', rateToUSD: 0.385 },
  BHD: { code: 'BHD', name: 'Bahraini Dinar', nameHi: 'बहरीनी दिनार', symbol: 'BD', flag: '🇧🇭', rateToUSD: 0.376 },
  SGD: { code: 'SGD', name: 'Singapore Dollar', nameHi: 'सिंगापुर डॉलर', symbol: 'S$', flag: '🇸🇬', rateToUSD: 1.32 },
  JPY: { code: 'JPY', name: 'Japanese Yen', nameHi: 'जापानी येन', symbol: '¥', flag: '🇯🇵', rateToUSD: 152.5 },
  CNY: { code: 'CNY', name: 'Chinese Yuan', nameHi: 'चीनी युआन', symbol: '¥', flag: '🇨🇳', rateToUSD: 7.24 },
  CHF: { code: 'CHF', name: 'Swiss Franc', nameHi: 'स्विस फ्रैंक', symbol: 'CHF', flag: '🇨🇭', rateToUSD: 0.88 },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', nameHi: 'न्यूजीलैंड डॉलर', symbol: 'NZ$', flag: '🇳🇿', rateToUSD: 1.68 },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', nameHi: 'मलेशियाई रिंगित', symbol: 'RM', flag: '🇲🇾', rateToUSD: 4.45 },
  THB: { code: 'THB', name: 'Thai Baht', nameHi: 'थाई बात', symbol: '฿', flag: '🇹🇭', rateToUSD: 34.5 },
  NPR: { code: 'NPR', name: 'Nepalese Rupee', nameHi: 'नेपाली रुपया', symbol: 'रू', flag: '🇳🇵', rateToUSD: 138.96 },
};

export interface CurrencyConversionInput {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  rates?: Record<string, number>; // Rates relative to USD
}

export interface CurrencyConversionResult {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  fromCurrencyName: string;
  toCurrencyName: string;
  fromSymbol: string;
  toSymbol: string;
  convertedAmount: number;
  exchangeRate: number; // 1 from = X to
  inverseRate: number;  // 1 to = Y from
  formattedResult: string;
  isLive: boolean;
  lastUpdated: string;
}

export interface PopularConversionItem {
  pair: string;
  from: string;
  to: string;
  rate: number;
  formatted: string;
  changePercent?: number;
}

/**
 * Convert between any two currencies using USD as base bridge:
 * from -> USD -> to
 * rate = (rateToUSD_to) / (rateToUSD_from)
 */
export function convertCurrency(
  input: CurrencyConversionInput,
  customRates?: Record<string, number>,
  isLive = false
): CurrencyConversionResult {
  const fromCode = input.fromCurrency.toUpperCase();
  const toCode = input.toCurrency.toUpperCase();

  const fromMeta = DEFAULT_CURRENCIES[fromCode] || {
    code: fromCode,
    name: fromCode,
    nameHi: fromCode,
    symbol: fromCode,
    flag: '🌐',
    rateToUSD: 1.0,
  };

  const toMeta = DEFAULT_CURRENCIES[toCode] || {
    code: toCode,
    name: toCode,
    nameHi: toCode,
    symbol: toCode,
    flag: '🌐',
    rateToUSD: 1.0,
  };

  // Determine rateToUSD for both from & to
  const fromRateToUSD = customRates?.[fromCode] ?? fromMeta.rateToUSD ?? 1.0;
  const toRateToUSD = customRates?.[toCode] ?? toMeta.rateToUSD ?? 1.0;

  // 1 unit of fromCurrency in USD = 1 / fromRateToUSD
  // In toCurrency = (1 / fromRateToUSD) * toRateToUSD = toRateToUSD / fromRateToUSD
  const exchangeRate = toRateToUSD / fromRateToUSD;
  const inverseRate = exchangeRate > 0 ? 1 / exchangeRate : 0;
  const convertedAmount = (input.amount || 0) * exchangeRate;

  return {
    amount: input.amount,
    fromCurrency: fromCode,
    toCurrency: toCode,
    fromCurrencyName: fromMeta.name,
    toCurrencyName: toMeta.name,
    fromSymbol: fromMeta.symbol,
    toSymbol: toMeta.symbol,
    convertedAmount: parseFloat(convertedAmount.toFixed(4)),
    exchangeRate: parseFloat(exchangeRate.toFixed(4)),
    inverseRate: parseFloat(inverseRate.toFixed(4)),
    formattedResult: `${toMeta.symbol}${convertedAmount.toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    isLive,
    lastUpdated: new Date().toISOString(),
  };
}

export function generateDenominationTable(
  fromCode: string,
  toCode: string,
  exchangeRate: number
): { fromAmount: number; toAmount: string }[] {
  const steps = [1, 5, 10, 20, 50, 100, 250, 500, 1000, 2000, 5000, 10000];
  return steps.map((val) => ({
    fromAmount: val,
    toAmount: (val * exchangeRate).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
  }));
}

export function validateCurrencyInput(input: CurrencyConversionInput): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};
  if (input.amount < 0) {
    errors.amount = 'Amount cannot be negative';
  }
  if (!input.fromCurrency) {
    errors.fromCurrency = 'Select source currency';
  }
  if (!input.toCurrency) {
    errors.toCurrency = 'Select destination currency';
  }
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
