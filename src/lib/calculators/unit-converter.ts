export type UnitCategory =
  | 'length'
  | 'area'
  | 'weight'
  | 'volume'
  | 'temperature'
  | 'speed'
  | 'time'
  | 'data'
  | 'indian_number';

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number; // converts value to category base unit
  fromBase: (baseVal: number) => number; // converts base unit to this unit
}

export interface UnitCategoryData {
  name: string;
  baseUnit: string;
  units: Record<string, UnitDefinition>;
}

export const UNIT_DATABASE: Record<UnitCategory, UnitCategoryData> = {
  length: {
    name: 'Length & Distance',
    baseUnit: 'meter',
    units: {
      meter: { id: 'meter', name: 'Meters', symbol: 'm', toBase: (v) => v, fromBase: (v) => v },
      kilometer: { id: 'kilometer', name: 'Kilometers', symbol: 'km', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      centimeter: { id: 'centimeter', name: 'Centimeters', symbol: 'cm', toBase: (v) => v * 0.01, fromBase: (v) => v * 100 },
      millimeter: { id: 'millimeter', name: 'Millimeters', symbol: 'mm', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      mile: { id: 'mile', name: 'Miles', symbol: 'mi', toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      yard: { id: 'yard', name: 'Yards (Gaj)', symbol: 'yd', toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      foot: { id: 'foot', name: 'Feet', symbol: 'ft', toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      inch: { id: 'inch', name: 'Inches', symbol: 'in', toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      nautical_mile: { id: 'nautical_mile', name: 'Nautical Miles', symbol: 'nmi', toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
    },
  },
  area: {
    name: 'Area & Land Measurement (Indian & Global)',
    baseUnit: 'sq_meter',
    units: {
      sq_meter: { id: 'sq_meter', name: 'Square Meters', symbol: 'm²', toBase: (v) => v, fromBase: (v) => v },
      sq_feet: { id: 'sq_feet', name: 'Square Feet', symbol: 'sq ft', toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
      sq_yard: { id: 'sq_yard', name: 'Square Yards (Gaj)', symbol: 'sq yd', toBase: (v) => v * 0.83612736, fromBase: (v) => v / 0.83612736 },
      acre: { id: 'acre', name: 'Acres', symbol: 'ac', toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      hectare: { id: 'hectare', name: 'Hectares', symbol: 'ha', toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      // Indian Land Measurement Units
      bigha: { id: 'bigha', name: 'Bigha (Standard North India = 27,225 sq ft)', symbol: 'Bigha', toBase: (v) => v * 2529.285264, fromBase: (v) => v / 2529.285264 },
      guntha: { id: 'guntha', name: 'Guntha (Maharashtra/Gujarat = 1,089 sq ft)', symbol: 'Guntha', toBase: (v) => v * 101.17141056, fromBase: (v) => v / 101.17141056 },
      biswa: { id: 'biswa', name: 'Biswa (1/20 Bigha = 1,361.25 sq ft)', symbol: 'Biswa', toBase: (v) => v * 126.4642632, fromBase: (v) => v / 126.4642632 },
      ground: { id: 'ground', name: 'Ground (Tamil Nadu = 2,400 sq ft)', symbol: 'Ground', toBase: (v) => v * 222.967296, fromBase: (v) => v / 222.967296 },
      cent: { id: 'cent', name: 'Cent (South India = 435.6 sq ft)', symbol: 'Cent', toBase: (v) => v * 40.468564224, fromBase: (v) => v / 40.468564224 },
    },
  },
  weight: {
    name: 'Weight & Mass (incl. Tola)',
    baseUnit: 'kilogram',
    units: {
      kilogram: { id: 'kilogram', name: 'Kilograms', symbol: 'kg', toBase: (v) => v, fromBase: (v) => v },
      gram: { id: 'gram', name: 'Grams', symbol: 'g', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      milligram: { id: 'milligram', name: 'Milligrams', symbol: 'mg', toBase: (v) => v * 0.000001, fromBase: (v) => v * 1000000 },
      pound: { id: 'pound', name: 'Pounds', symbol: 'lbs', toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      ounce: { id: 'ounce', name: 'Ounces', symbol: 'oz', toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      tonne: { id: 'tonne', name: 'Metric Tonnes', symbol: 't', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      quintal: { id: 'quintal', name: 'Quintal (100 kg)', symbol: 'q', toBase: (v) => v * 100, fromBase: (v) => v / 100 },
      tola: { id: 'tola', name: 'Tola (Gold/Silver = 11.6638 g)', symbol: 'tola', toBase: (v) => v * 0.0116638038, fromBase: (v) => v / 0.0116638038 },
      sovereign: { id: 'sovereign', name: 'Pavan / Sovereign (8 g)', symbol: 'pavan', toBase: (v) => v * 0.008, fromBase: (v) => v / 0.008 },
    },
  },
  volume: {
    name: 'Volume & Liquid Capacity',
    baseUnit: 'liter',
    units: {
      liter: { id: 'liter', name: 'Liters', symbol: 'L', toBase: (v) => v, fromBase: (v) => v },
      milliliter: { id: 'milliliter', name: 'Milliliters', symbol: 'mL', toBase: (v) => v * 0.001, fromBase: (v) => v * 1000 },
      cubic_meter: { id: 'cubic_meter', name: 'Cubic Meters', symbol: 'm³', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      gallon_us: { id: 'gallon_us', name: 'US Gallons', symbol: 'gal (US)', toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      gallon_uk: { id: 'gallon_uk', name: 'UK Imperial Gallons', symbol: 'gal (UK)', toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
      fluid_ounce: { id: 'fluid_ounce', name: 'US Fluid Ounces', symbol: 'fl oz', toBase: (v) => v * 0.0295735295625, fromBase: (v) => v / 0.0295735295625 },
    },
  },
  temperature: {
    name: 'Temperature',
    baseUnit: 'celsius',
    units: {
      celsius: { id: 'celsius', name: 'Celsius', symbol: '°C', toBase: (v) => v, fromBase: (v) => v },
      fahrenheit: { id: 'fahrenheit', name: 'Fahrenheit', symbol: '°F', toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      kelvin: { id: 'kelvin', name: 'Kelvin', symbol: 'K', toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    },
  },
  speed: {
    name: 'Speed & Velocity',
    baseUnit: 'mps',
    units: {
      mps: { id: 'mps', name: 'Meters per Second', symbol: 'm/s', toBase: (v) => v, fromBase: (v) => v },
      kmph: { id: 'kmph', name: 'Kilometers per Hour', symbol: 'km/h', toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      mph: { id: 'mph', name: 'Miles per Hour', symbol: 'mph', toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      knot: { id: 'knot', name: 'Knots', symbol: 'kn', toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    },
  },
  time: {
    name: 'Time Duration',
    baseUnit: 'second',
    units: {
      second: { id: 'second', name: 'Seconds', symbol: 's', toBase: (v) => v, fromBase: (v) => v },
      minute: { id: 'minute', name: 'Minutes', symbol: 'min', toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      hour: { id: 'hour', name: 'Hours', symbol: 'hr', toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      day: { id: 'day', name: 'Days', symbol: 'd', toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      week: { id: 'week', name: 'Weeks', symbol: 'wk', toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      year: { id: 'year', name: 'Years (365.25 d)', symbol: 'yr', toBase: (v) => v * 31557600, fromBase: (v) => v / 31557600 },
    },
  },
  data: {
    name: 'Digital Data & Memory',
    baseUnit: 'byte',
    units: {
      byte: { id: 'byte', name: 'Bytes', symbol: 'B', toBase: (v) => v, fromBase: (v) => v },
      kilobyte: { id: 'kilobyte', name: 'Kilobytes (KB)', symbol: 'KB', toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      megabyte: { id: 'megabyte', name: 'Megabytes (MB)', symbol: 'MB', toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      gigabyte: { id: 'gigabyte', name: 'Gigabytes (GB)', symbol: 'GB', toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      terabyte: { id: 'terabyte', name: 'Terabytes (TB)', symbol: 'TB', toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
    },
  },
  indian_number: {
    name: 'Indian & International Numbering (Lakh / Crore / Million)',
    baseUnit: 'unit_one',
    units: {
      unit_one: { id: 'unit_one', name: 'Units / Ones', symbol: '1', toBase: (v) => v, fromBase: (v) => v },
      thousand: { id: 'thousand', name: 'Thousands (K)', symbol: 'Thousand (10³)', toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      lakh: { id: 'lakh', name: 'Lakh (1,00,000)', symbol: 'Lakh (10⁵)', toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      million: { id: 'million', name: 'Millions (1,000,000)', symbol: 'Million (10⁶)', toBase: (v) => v * 1000000, fromBase: (v) => v / 1000000 },
      crore: { id: 'crore', name: 'Crore (1,00,00,000)', symbol: 'Crore (10⁷)', toBase: (v) => v * 10000000, fromBase: (v) => v / 10000000 },
      billion: { id: 'billion', name: 'Billions (1,000,000,000)', symbol: 'Billion (10⁹)', toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
      arab: { id: 'arab', name: 'Arab (100 Crore / 1 Billion)', symbol: 'Arab (10⁹)', toBase: (v) => v * 1000000000, fromBase: (v) => v / 1000000000 },
    },
  },
};

export interface UnitConversionInput {
  category: UnitCategory;
  fromUnit: string;
  toUnit: string;
  value: number;
}

export interface UnitConversionResultItem {
  unitId: string;
  unitName: string;
  symbol: string;
  value: number;
  formattedValue: string;
}

export interface UnitConversionResult {
  category: UnitCategory;
  fromUnit: string;
  toUnit: string;
  inputValue: number;
  outputValue: number;
  formattedOutput: string;
  allUnitConversions: UnitConversionResultItem[];
}

export function validateUnitConversionInput(input: UnitConversionInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!UNIT_DATABASE[input.category]) {
    errors.category = 'Invalid unit category';
  } else {
    const cat = UNIT_DATABASE[input.category];
    if (!cat.units[input.fromUnit]) errors.fromUnit = 'Invalid source unit';
    if (!cat.units[input.toUnit]) errors.toUnit = 'Invalid target unit';
  }

  if (isNaN(input.value)) {
    errors.value = 'Please enter a valid numeric value';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Converts a numerical value across units with high precision.
 */
export function convertUnit(input: UnitConversionInput): UnitConversionResult {
  const cat = UNIT_DATABASE[input.category] ?? UNIT_DATABASE.length;
  const fromDef = cat.units[input.fromUnit] ?? Object.values(cat.units)[0];
  const toDef = cat.units[input.toUnit] ?? Object.values(cat.units)[1];

  const baseVal = fromDef.toBase(input.value);
  const outVal = toDef.fromBase(baseVal);

  const formatNum = (n: number) => {
    if (Math.abs(n) >= 1e9 || (Math.abs(n) < 1e-4 && n !== 0)) {
      return n.toExponential(6);
    }
    return parseFloat(n.toFixed(6)).toString();
  };

  const allConversions: UnitConversionResultItem[] = Object.values(cat.units).map((u) => {
    const v = u.fromBase(baseVal);
    return {
      unitId: u.id,
      unitName: u.name,
      symbol: u.symbol,
      value: v,
      formattedValue: formatNum(v),
    };
  });

  return {
    category: input.category,
    fromUnit: fromDef.id,
    toUnit: toDef.id,
    inputValue: input.value,
    outputValue: outVal,
    formattedOutput: formatNum(outVal),
    allUnitConversions: allConversions,
  };
}
