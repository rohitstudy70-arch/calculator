/**
 * Centralized Government & Statutory Rates Index
 * Modular configuration files with strict source attribution and verification dates.
 */

export * from './tax';
export * from './small-savings';
export * from './gst';
export * from './retirement';
export * from './hra';
export * from './stamp-duty';
export * from './land-units';
export * from './electricity';

import { incomeTaxConfig } from './tax';
import { smallSavingsConfig } from './small-savings';
import { gstConfig } from './gst';
import { retirementConfig } from './retirement';
import { hraConfig } from './hra';
import { stampDutyByState } from './stamp-duty';
import { landUnitsByState } from './land-units';
import { electricityTariffsByState } from './electricity';

/**
 * Unified backward-compatible RATES object
 */
export const RATES = {
  epf: smallSavingsConfig.epf,
  ppf: smallSavingsConfig.ppf,
  ssy: smallSavingsConfig.ssy,
  nsc: smallSavingsConfig.nsc,
  scss: smallSavingsConfig.scss,
  pomis: smallSavingsConfig.pomis,
  nps: retirementConfig.nps,
  gratuity: retirementConfig.gratuity,
  hra: hraConfig,
  gst: gstConfig,
  incomeTax: incomeTaxConfig,
  stampDuty: stampDutyByState,
  landUnits: landUnitsByState,
  electricity: electricityTariffsByState,
  disclaimerNote: {
    en: 'Rates, limits and rules are updated periodically; verify with official sources before making financial decisions.',
    hi: 'दरें, सीमाएं और नियम समय-समय पर अपडेट किए जाते हैं; वित्तीय निर्णय लेने से पहले आधिकारिक स्रोतों से पुष्टि करें।',
  },
} as const;

export default RATES;
