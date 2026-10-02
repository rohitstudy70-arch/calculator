import { convertLandUnit, getAvailableStates, getUnitsForState, validateLandInput } from '@/lib/calculators/land-converter';

describe('Land Unit Converter', () => {
  it('1 Pucca Bigha UP = 27,225 sq ft', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'bigha_pucca', toUnit: 'sq_ft', state: 'uttar_pradesh' });
    expect(result.outputValue).toBeCloseTo(27225, 2);
  });

  it('1 Katha Bihar = 1,361.25 sq ft', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'katha', toUnit: 'sq_ft', state: 'bihar' });
    expect(result.outputValue).toBeCloseTo(1361.25, 2);
  });

  it('1 Kanal Punjab = 5,445 sq ft', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'kanal', toUnit: 'sq_ft', state: 'punjab_haryana' });
    expect(result.outputValue).toBeCloseTo(5445, 2);
  });

  it('1 Guntha Maharashtra = 1,089 sq ft', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'guntha', toUnit: 'sq_ft', state: 'maharashtra' });
    expect(result.outputValue).toBeCloseTo(1089, 2);
  });

  it('1 Acre = 43,560 sq ft (universal across states)', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'acre', toUnit: 'sq_ft', state: 'delhi' });
    expect(result.outputValue).toBeCloseTo(43560, 2);
  });

  it('10 Biswa UP = 13,612.5 sq ft (= 0.5 Bigha)', () => {
    const result = convertLandUnit({ value: 10, fromUnit: 'biswa', toUnit: 'sq_ft', state: 'uttar_pradesh' });
    expect(result.outputValue).toBeCloseTo(13612.5, 2);
    const bighaResult = convertLandUnit({ value: 10, fromUnit: 'biswa', toUnit: 'bigha_pucca', state: 'uttar_pradesh' });
    expect(bighaResult.outputValue).toBeCloseTo(0.5, 2);
  });

  it('1 Bigha Assam/Bengal = 14,400 sq ft', () => {
    const result = convertLandUnit({ value: 1, fromUnit: 'bigha', toUnit: 'sq_ft', state: 'assam_bengal' });
    expect(result.outputValue).toBeCloseTo(14400, 2);
  });

  it('Validate: negative value should fail', () => {
    const validation = validateLandInput({ value: -5, fromUnit: 'bigha', toUnit: 'sq_ft', state: 'bihar' });
    expect(validation.valid).toBe(false);
    expect(validation.errors.value).toBeDefined();
  });

  it('Validate: invalid state should fail', () => {
    const validation = validateLandInput({ value: 10, fromUnit: 'bigha', toUnit: 'sq_ft', state: 'invalid_state' });
    expect(validation.valid).toBe(false);
    expect(validation.errors.state).toBeDefined();
  });

  it('Round-trip: 1 Bigha UP -> sq ft -> back to Bigha should equal 1', () => {
    const result1 = convertLandUnit({ value: 1, fromUnit: 'bigha_pucca', toUnit: 'sq_ft', state: 'uttar_pradesh' });
    const result2 = convertLandUnit({ value: result1.outputValue, fromUnit: 'sq_ft', toUnit: 'bigha_pucca', state: 'uttar_pradesh' });
    expect(result2.outputValue).toBeCloseTo(1, 4);
  });

  it('getAvailableStates() returns 8 states', () => {
    const states = getAvailableStates();
    expect(states.length).toBe(8);
  });

  it('getUnitsForState(bihar) returns correct units', () => {
    const units = getUnitsForState('bihar');
    expect(units.some(u => u.unitKey === 'bigha_pucca')).toBe(true);
    expect(units.some(u => u.unitKey === 'sq_ft')).toBe(true);
  });
});
