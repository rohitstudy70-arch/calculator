import { convertUnit, validateUnitConversionInput, UNIT_DATABASE } from '@/lib/calculators/unit-converter';

describe('Unit Converter Tests', () => {
  // Test Case 1: Indian Land Measurement (1 Acre to Guntha & Bigha)
  // 1 Acre = 43,560 sq ft = 40 Guntha (1089 sq ft each)
  test('Indian Land measurement: 1 Acre = 40 Guntha', () => {
    const res = convertUnit({
      category: 'area',
      fromUnit: 'acre',
      toUnit: 'guntha',
      value: 1,
    });

    expect(res.outputValue).toBeCloseTo(40, 2);
    expect(res.allUnitConversions.length).toBeGreaterThan(5);
  });

  // Test Case 2: Indian Gold Weight (1 Tola = 11.6638 grams)
  test('Indian Gold Weight: 10 Tola to grams', () => {
    const res = convertUnit({
      category: 'weight',
      fromUnit: 'tola',
      toUnit: 'gram',
      value: 10,
    });

    expect(res.outputValue).toBeCloseTo(116.638, 2);
  });

  // Test Case 3: Indian Numbering (Crore to Million)
  // 1 Crore (10^7) = 10 Million (10^6)
  test('Indian Numbering: 5 Crore to Million (= 50 Million)', () => {
    const res = convertUnit({
      category: 'indian_number',
      fromUnit: 'crore',
      toUnit: 'million',
      value: 5,
    });

    expect(res.outputValue).toBe(50);
  });

  // Test Case 4: Temperature Conversion (Celsius to Fahrenheit & Kelvin)
  // 100 °C = 212 °F = 373.15 K
  test('Temperature: 100 °C = 212 °F', () => {
    const res = convertUnit({
      category: 'temperature',
      fromUnit: 'celsius',
      toUnit: 'fahrenheit',
      value: 100,
    });

    expect(res.outputValue).toBeCloseTo(212, 2);
  });

  // Test Case 5: Speed Conversion (100 km/h to m/s)
  // 100 km/h = 100 / 3.6 = 27.7777 m/s
  test('Speed: 100 km/h = ~27.78 m/s', () => {
    const res = convertUnit({
      category: 'speed',
      fromUnit: 'kmph',
      toUnit: 'mps',
      value: 100,
    });

    expect(res.outputValue).toBeCloseTo(27.7778, 3);
  });

  // Test Case 6: Validation
  test('Validation test', () => {
    expect(validateUnitConversionInput({ category: 'length', fromUnit: 'invalid', toUnit: 'meter', value: 10 }).valid).toBe(false);
    expect(validateUnitConversionInput({ category: 'length', fromUnit: 'kilometer', toUnit: 'meter', value: 5 }).valid).toBe(true);
  });
});
