/**
 * Centralized Clinical, Nutritional & Health Standards & Multipliers
 * Sources: WHO (World Health Organization), ICMR-NIN (National Institute of Nutrition, India),
 * ACOG (American College of Obstetricians and Gynecologists), US Navy Body Fat Standard.
 */

export interface HealthConfig<T> {
  value: T;
  lastVerified: string;
  source: string;
  notes?: string;
}

export const HEALTH_CONFIG = {
  // BMI Cutoffs
  bmi: {
    // International WHO Standard
    whoCutoffs: {
      underweight: 18.5,
      normalMax: 24.9,
      overweightMax: 29.9,
      obeseClass1Max: 34.9,
      obeseClass2Max: 39.9,
      lastVerified: '2026-09-30',
      source: 'World Health Organization (WHO) Technical Report Series 854',
    },
    // Asian-Indian Consensus (ICMR & WHO Asia-Pacific Guidelines)
    asianCutoffs: {
      underweight: 18.5,
      normalMax: 22.9, // Lower threshold due to higher visceral adiposity in South Asians
      overweightMax: 24.9,
      obeseMax: 25.0,
      lastVerified: '2026-09-30',
      source: 'Consensus Guidelines for Asian Indians (ICMR / JAPI 2009; 57: 163-170)',
      notes: 'South Asian populations exhibit higher cardiovascular and diabetes risks at lower BMI levels.',
    },
  },

  // Calorie & TDEE Activity Multipliers
  activityMultipliers: {
    sedentary: {
      value: 1.2,
      label: 'Sedentary (Little or no exercise, desk job)',
      source: 'FAO/WHO/UNU Human Energy Requirements',
      lastVerified: '2026-09-30',
    },
    lightlyActive: {
      value: 1.375,
      label: 'Lightly Active (Light exercise 1-3 days/week)',
      source: 'FAO/WHO/UNU Human Energy Requirements',
      lastVerified: '2026-09-30',
    },
    moderatelyActive: {
      value: 1.55,
      label: 'Moderately Active (Moderate exercise 3-5 days/week)',
      source: 'FAO/WHO/UNU Human Energy Requirements',
      lastVerified: '2026-09-30',
    },
    veryActive: {
      value: 1.725,
      label: 'Very Active (Hard exercise 6-7 days/week)',
      source: 'FAO/WHO/UNU Human Energy Requirements',
      lastVerified: '2026-09-30',
    },
    extraActive: {
      value: 1.9,
      label: 'Extra Active (Physical labor or 2x daily training)',
      source: 'FAO/WHO/UNU Human Energy Requirements',
      lastVerified: '2026-09-30',
    },
  },

  // Minimum Safe Calorie Thresholds
  safeCalorieFloors: {
    female: {
      value: 1200, // kcal/day minimum safe threshold
      source: 'American College of Sports Medicine (ACSM) / Harvard Health',
      lastVerified: '2026-09-30',
    },
    male: {
      value: 1500, // kcal/day minimum safe threshold
      source: 'American College of Sports Medicine (ACSM) / Harvard Health',
      lastVerified: '2026-09-30',
    },
  },

  // Body Fat Categories (ACE - American Council on Exercise)
  bodyFatCategories: {
    male: {
      essential: { min: 2, max: 5 },
      athletes: { min: 6, max: 13 },
      fitness: { min: 14, max: 17 },
      average: { min: 18, max: 24 },
      obese: { min: 25, max: 60 },
    },
    female: {
      essential: { min: 10, max: 13 },
      athletes: { min: 14, max: 20 },
      fitness: { min: 21, max: 24 },
      average: { min: 25, max: 31 },
      obese: { min: 32, max: 65 },
    },
    source: 'American Council on Exercise (ACE) Clinical Guidelines',
    lastVerified: '2026-09-30',
  },

  // Pregnancy Gestational Standards (ACOG & Naegele's Rule)
  pregnancy: {
    standardLMPGestationalDays: 280, // 40 weeks = 280 days from LMP
    standardConceptionDays: 266, // 38 weeks = 266 days from conception
    ivfDay3OffsetDays: 263, // 266 - 3 days
    ivfDay5OffsetDays: 261, // 266 - 5 days
    firstTrimesterEndWeek: 13,
    secondTrimesterEndWeek: 27,
    fullTermStartWeek: 37,
    source: 'American College of Obstetricians and Gynecologists (ACOG) Committee Opinion No. 700',
    lastVerified: '2026-09-30',
  },

  // Mandatory Medical Disclaimer
  medicalDisclaimer: {
    en: 'This tool gives general estimates for educational and informational purposes only. It is not medical advice or a clinical diagnosis. Consult a qualified doctor or certified clinical dietitian before making significant dietary, exercise, or health decisions.',
    hi: 'यह टूल केवल सामान्य जानकारी और शैक्षिक उद्देश्यों के लिए अनुमान प्रदान करता है। यह चिकित्सा सलाह या नैदानिक निदान नहीं है। आहार, व्यायाम या स्वास्थ्य में कोई भी बड़ा बदलाव करने से पहले हमेशा किसी योग्य डॉक्टर या आहार विशेषज्ञ से परामर्श लें।',
  },
} as const;
