import { landUnitsByState } from '@/config/rates/land-units';

export interface LandConverterInput {
  value: number;
  fromUnit: string;
  toUnit: string;
  state: string;
}

export interface LandConverterResult {
  inputValue: number;
  outputValue: number;
  fromUnitName: string;
  toUnitName: string;
  stateName: string;
  conversionFactor: number;
  sqFtEquivalent: number;
}

export interface LandConversionTable {
  fromUnit: string;
  fromUnitName: string;
  conversions: { toUnit: string; toUnitName: string; value: number }[];
}

const UNIVERSAL_UNITS = [
  { unitKey: 'sq_ft', nameEn: 'Square Feet (Sq Ft)', nameHi: 'वर्ग फुट', sqFtPerUnit: 1 },
  { unitKey: 'sq_meter', nameEn: 'Square Meter (Sq M)', nameHi: 'वर्ग मीटर', sqFtPerUnit: 10.7639 },
  { unitKey: 'acre', nameEn: 'Acre', nameHi: 'एकड़', sqFtPerUnit: 43560 },
  { unitKey: 'hectare', nameEn: 'Hectare', nameHi: 'हेक्टेयर', sqFtPerUnit: 107639 }
];

export function getAvailableStates(): { key: string; name: string; nameHi: string }[] {
  return Object.entries(landUnitsByState).map(([key, stateData]) => ({
    key,
    name: stateData.stateName,
    nameHi: stateData.stateNameHi,
  }));
}

export function getUnitsForState(stateKey: string): { unitKey: string; nameEn: string; nameHi: string; sqFtPerUnit: number }[] {
  const stateData = landUnitsByState[stateKey];
  if (!stateData) return [];

  const existingKeys = new Set(stateData.units.map(u => u.unitKey));
  const combined = [...stateData.units];

  for (const uUnit of UNIVERSAL_UNITS) {
    if (!existingKeys.has(uUnit.unitKey)) {
      combined.push(uUnit);
    }
  }

  return combined;
}

export function validateLandInput(input: LandConverterInput): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  
  if (input.value < 0) {
    errors.value = 'Value cannot be negative';
  }
  
  if (!landUnitsByState[input.state]) {
    errors.state = 'Invalid state selected';
  }
  
  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

export function convertLandUnit(input: LandConverterInput): LandConverterResult {
  const units = getUnitsForState(input.state);
  const stateData = landUnitsByState[input.state];

  const from = units.find(u => u.unitKey === input.fromUnit);
  const to = units.find(u => u.unitKey === input.toUnit);

  if (!from || !to) {
    throw new Error('Invalid units for the selected state');
  }

  const sqFtEquivalent = input.value * from.sqFtPerUnit;
  const outputValue = sqFtEquivalent / to.sqFtPerUnit;
  const conversionFactor = from.sqFtPerUnit / to.sqFtPerUnit;

  return {
    inputValue: input.value,
    outputValue,
    fromUnitName: from.nameEn,
    toUnitName: to.nameEn,
    stateName: stateData ? stateData.stateName : '',
    conversionFactor,
    sqFtEquivalent
  };
}

export function generateConversionTable(state: string, fromUnit: string, value: number): LandConversionTable {
  const units = getUnitsForState(state);
  const from = units.find(u => u.unitKey === fromUnit);

  if (!from) {
    throw new Error('Invalid fromUnit');
  }

  const sqFtEquivalent = value * from.sqFtPerUnit;

  const conversions = units.map(u => ({
    toUnit: u.unitKey,
    toUnitName: u.nameEn,
    value: sqFtEquivalent / u.sqFtPerUnit
  }));

  return {
    fromUnit,
    fromUnitName: from.nameEn,
    conversions
  };
}
