/**
 * Age of majority by country/state/province (in years)
 *
 * For countries with uniform national age, use country-level mapping.
 * For countries with state/province variation (USA, Canada, Australia, Mexico),
 * we need state-level mapping.
 */

// ============ USA States ============
// Age of majority by state (when you become a legal adult for general purposes)
// Note: For alcohol/tobacco, federal law is 21 nationwide.
// For general website access, we use the age of majority.
export const US_STATE_AGES: Record<string, number> = {
  // Most states: 18
  AL: 19, // Alabama
  AK: 18, // Alaska
  AZ: 18, // Arizona
  AR: 18, // Arkansas
  CA: 18, // California
  CO: 18, // Colorado
  CT: 18, // Connecticut
  DE: 18, // Delaware
  FL: 18, // Florida
  GA: 18, // Georgia
  HI: 18, // Hawaii
  ID: 18, // Idaho
  IL: 18, // Illinois
  IN: 18, // Indiana
  IA: 18, // Iowa
  KS: 18, // Kansas
  KY: 18, // Kentucky
  LA: 18, // Louisiana
  ME: 18, // Maine
  MD: 18, // Maryland
  MA: 18, // Massachusetts
  MI: 18, // Michigan
  MN: 18, // Minnesota
  MS: 18, // Mississippi (age of majority is 18, though some laws use 21)
  MO: 18, // Missouri
  MT: 18, // Montana
  NE: 19, // Nebraska
  NV: 18, // Nevada
  NH: 18, // New Hampshire
  NJ: 18, // New Jersey
  NM: 18, // New Mexico
  NY: 18, // New York
  NC: 18, // North Carolina
  ND: 18, // North Dakota
  OH: 18, // Ohio
  OK: 18, // Oklahoma
  OR: 18, // Oregon
  PA: 18, // Pennsylvania
  RI: 18, // Rhode Island
  SC: 18, // South Carolina
  SD: 18, // South Dakota
  TN: 18, // Tennessee
  TX: 18, // Texas
  UT: 18, // Utah
  VT: 18, // Vermont
  VA: 18, // Virginia
  WA: 18, // Washington
  WV: 18, // West Virginia
  WI: 18, // Wisconsin
  WY: 18, // Wyoming
  DC: 18, // Washington DC
};

// ============ Canadian Provinces/Territories ============
// Age of majority varies by province (18 or 19)
export const CA_PROVINCE_AGES: Record<string, number> = {
  AB: 18, // Alberta
  BC: 19, // British Columbia
  MB: 18, // Manitoba
  NB: 19, // New Brunswick
  NL: 19, // Newfoundland and Labrador
  NS: 19, // Nova Scotia
  NT: 19, // Northwest Territories
  NU: 19, // Nunavut
  ON: 18, // Ontario
  PE: 18, // Prince Edward Island
  QC: 18, // Quebec
  SK: 18, // Saskatchewan
  YT: 19, // Yukon
};

// ============ Australian States/Territories ============
// Age of majority is 18 nationwide, but some states have different ages for specific activities
export const AU_STATE_AGES: Record<string, number> = {
  NSW: 18, // New South Wales
  VIC: 18, // Victoria
  QLD: 18, // Queensland
  WA: 18, // Western Australia
  SA: 18, // South Australia
  TAS: 18, // Tasmania
  ACT: 18, // Australian Capital Territory
  NT: 18, // Northern Territory
};

// ============ Mexican States ============
// Age of majority is 18 nationwide, but some states have variations
export const MX_STATE_AGES: Record<string, number> = {
  // All 31 states + Mexico City use 18 as age of majority
  // But we'll map them all to 18 for safety
  AGU: 18, // Aguascalientes
  BCN: 18, // Baja California
  BCS: 18, // Baja California Sur
  CAM: 18, // Campeche
  CHP: 18, // Chiapas
  CHH: 18, // Chihuahua
  COA: 18, // Coahuila
  COL: 18, // Colima
  DF: 18, // Mexico City (CDMX)
  DUR: 18, // Durango
  GUA: 18, // Guanajuato
  GRO: 18, // Guerrero
  HID: 18, // Hidalgo
  JAL: 18, // Jalisco
  MEX: 18, // Mexico State
  MIC: 18, // Michoacán
  MOR: 18, // Morelos
  NAY: 18, // Nayarit
  NLE: 18, // Nuevo León
  OAX: 18, // Oaxaca
  PUE: 18, // Puebla
  QUE: 18, // Querétaro
  ROO: 18, // Quintana Roo
  SLP: 18, // San Luis Potosí
  SIN: 18, // Sinaloa
  SON: 18, // Sonora
  TAB: 18, // Tabasco
  TAM: 18, // Tamaulipas
  TLA: 18, // Tlaxcala
  VER: 18, // Veracruz
  YUC: 18, // Yucatán
  ZAC: 18, // Zacatecas
};

// ============ Countries with uniform age (mostly 18) ============
const UNIFORM_AGE_COUNTRIES: Record<string, number> = {
  // Africa
  ZA: 18, // South Africa
  NG: 18, // Nigeria
  KE: 18, // Kenya
  EG: 18, // Egypt
  GH: 18, // Ghana
  MA: 18, // Morocco
  DZ: 18, // Algeria
  TN: 18, // Tunisia
  CM: 18, // Cameroon
  SN: 18, // Senegal
  // Europe (age of majority is 18 in all European countries)
  GB: 18, // United Kingdom
  FR: 18, // France
  DE: 18, // Germany
  IT: 18, // Italy
  ES: 18, // Spain
  PT: 18, // Portugal
  NL: 18, // Netherlands
  BE: 18, // Belgium
  CH: 18, // Switzerland
  AT: 18, // Austria
  SE: 18, // Sweden
  NO: 18, // Norway
  DK: 18, // Denmark
  FI: 18, // Finland
  PL: 18, // Poland
  CZ: 18, // Czech Republic
  HU: 18, // Hungary
  RO: 18, // Romania
  BG: 18, // Bulgaria
  GR: 18, // Greece
  HR: 18, // Croatia
  SI: 18, // Slovenia
  SK: 18, // Slovakia
  EE: 18, // Estonia
  LV: 18, // Latvia
  LT: 18, // Lithuania
  LU: 18, // Luxembourg
  MT: 18, // Malta
  CY: 18, // Cyprus
  IS: 18, // Iceland
  IE: 18, // Ireland
  // Asia (age of majority is typically 18-20, but most 18)
  JP: 18, // Japan (20 for alcohol/tobacco, but 18 for majority)
  KR: 19, // South Korea - actually age of majority is 19
  IN: 18, // India
  SG: 18, // Singapore
  MY: 18, // Malaysia
  TH: 18, // Thailand
  VN: 18, // Vietnam
  PH: 18, // Philippines
  ID: 18, // Indonesia
  PK: 18, // Pakistan
  BD: 18, // Bangladesh
  LK: 18, // Sri Lanka
  NP: 18, // Nepal
  KH: 18, // Cambodia
  LA: 18, // Laos
  MM: 18, // Myanmar (some sources say 18, check)
  MN: 18, // Mongolia
  KW: 21, // Kuwait - age of majority is 21
  QA: 18, // Qatar (21 for alcohol, but 18 for majority)
  AE: 18, // UAE (21 for alcohol, 18 for majority)
  BH: 18, // Bahrain (21 for alcohol, 18 for majority)
  OM: 18, // Oman
  SA: 18, // Saudi Arabia
  JO: 18, // Jordan
  LB: 18, // Lebanon
  SY: 18, // Syria
  IQ: 18, // Iraq
  IR: 18, // Iran
  IL: 18, // Israel
  TR: 18, // Turkey
  // Americas
  MX: 18, // Mexico (uniform 18)
  BR: 18, // Brazil
  AR: 18, // Argentina
  CL: 18, // Chile
  CO: 18, // Colombia
  PE: 18, // Peru
  VE: 18, // Venezuela
  EC: 18, // Ecuador
  BO: 18, // Bolivia
  PY: 18, // Paraguay
  UY: 18, // Uruguay
  DO: 18, // Dominican Republic
  PA: 18, // Panama
  CR: 18, // Costa Rica
  NI: 18, // Nicaragua
  HN: 18, // Honduras
  SV: 18, // El Salvador
  GT: 18, // Guatemala
  CU: 18, // Cuba
  JM: 18, // Jamaica
  TT: 18, // Trinidad and Tobago
  BS: 18, // Bahamas
  BB: 18, // Barbados
  // Oceania
  AU: 18, // Australia (but we'll use state mapping to be precise)
  NZ: 18, // New Zealand
  FJ: 18, // Fiji
  PG: 18, // Papua New Guinea
  // Africa (continued)
  ZW: 18, // Zimbabwe
  ZM: 18, // Zambia
  MW: 18, // Malawi
  MZ: 18, // Mozambique
  BW: 18, // Botswana
  NA: 18, // Namibia
  AO: 18, // Angola
  CG: 18, // Congo
  CD: 18, // DR Congo
  TZ: 18, // Tanzania
  UG: 18, // Uganda
  ET: 18, // Ethiopia
  SO: 18, // Somalia
  SD: 18, // Sudan
  SS: 18, // South Sudan
  ER: 18, // Eritrea
  DJ: 18, // Djibouti
  RW: 18, // Rwanda
  BI: 18, // Burundi
  // Additional countries
  CN: 18, // China
  HK: 18, // Hong Kong
  MO: 18, // Macau
  TW: 20, // Taiwan (actually 20 for some things)
  KP: 18, // North Korea
  RU: 18, // Russia
  UA: 18, // Ukraine
  BY: 18, // Belarus
  MD: 18, // Moldova
};


/**
 * Get the legal adult age for a given country/state/province code
 * Supports state-level granularity for USA, Canada, Australia, Mexico
 *
 * @param countryCode - ISO country code (e.g., "US", "CA", "ZA")
 * @param stateCode - Optional: state/province code (e.g., "CA" for California, "ON" for Ontario)
 * @returns The required adult age (18, 19, 20, or 21)
 */
export function getAdultAgeForCountry(
  countryCode: string,
  stateCode?: string,
): number {
  const upperCountry = countryCode.toUpperCase();
  const upperState = stateCode?.toUpperCase();

  // Check if we have state-level data for this country
  if (upperCountry === "US" && upperState && US_STATE_AGES[upperState]) {
    return US_STATE_AGES[upperState];
  }
  if (upperCountry === "CA" && upperState && CA_PROVINCE_AGES[upperState]) {
    return CA_PROVINCE_AGES[upperState];
  }
  if (upperCountry === "AU" && upperState && AU_STATE_AGES[upperState]) {
    return AU_STATE_AGES[upperState];
  }
  if (upperCountry === "MX" && upperState && MX_STATE_AGES[upperState]) {
    return MX_STATE_AGES[upperState];
  }

  // If state is not provided or not recognized, and country has state variations,
  // use the highest state age as conservative fallback
  const hasStateVariations = ["US", "CA", "AU", "MX"].includes(upperCountry);
  if (hasStateVariations) {
    return getHighestStateAge(upperCountry);
  }

  // Fall back to country-level uniform mapping
  if (UNIFORM_AGE_COUNTRIES[upperCountry] !== undefined) {
    return UNIFORM_AGE_COUNTRIES[upperCountry];
  }

  // Default fallback
  console.warn(
    `[AgeGate] Unknown country code: ${countryCode}, defaulting to 18`,
  );
  return 18;
}

/**
 * Get the highest age requirement among all states/provinces for a country
 * Used as conservative fallback when we cannot determine the specific state
 */
export function getHighestStateAge(countryCode: string): number {
  const upperCountry = countryCode.toUpperCase();

  switch (upperCountry) {
    case "US":
      // For US, the highest state age of majority is 19 (Alabama, Nebraska)
      return 19;
    case "CA":
      // For Canada, some provinces have age 19
      return 19;
    case "AU":
      // All Australian states/territories use 18
      return 18;
    case "MX":
      // All Mexican states use 18
      return 18;
    default:
      // For countries without state variations, return the country's age or 18
      return getAdultAgeForCountry(upperCountry);
  }
}

/**
 * Detect user's location (country and optionally state/province) from browser information
 * Tries multiple methods in order of reliability:
 * 1. timezone (most reliable) - can also infer state for some countries
 * 2. language/locale
 *
 * Returns: { country: string, state?: string }
 */
export function detectUserLocation(): { country: string; state?: string } {
  // Method 1: Use timezone to infer country AND state where unambiguous
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Comprehensive timezone mapping that includes state-level granularity
    const timezoneLocationMap: Record<
      string,
      { country: string; state?: string }
    > = {
      // Africa
      "Africa/Johannesburg": { country: "ZA" },
      "Africa/Cape_Town": { country: "ZA" },
      "Africa/Durban": { country: "ZA" },
      "Africa/Porto-Novo": { country: "BJ" },
      "Africa/Lagos": { country: "NG" },
      "Africa/Nairobi": { country: "KE" },
      "Africa/Accra": { country: "GH" },
      "Africa/Cairo": { country: "EG" },
      "Africa/Algiers": { country: "DZ" },
      "Africa/Tunis": { country: "TN" },
      "Africa/Douala": { country: "CM" },
      "Africa/Dakar": { country: "SN" },
      "Africa/Khartoum": { country: "SD" },
      "Africa/Addis_Ababa": { country: "ET" },
      "Africa/Asmara": { country: "ER" },
      "Africa/Maputo": { country: "MZ" },
      "Africa/Gaborone": { country: "BW" },
      "Africa/Windhoek": { country: "NA" },
      "Africa/Lusaka": { country: "ZM" },
      "Africa/Harare": { country: "ZW" },
      "Africa/Kampala": { country: "UG" },
      "Africa/Kigali": { country: "RW" },
      "Africa/Bujumbura": { country: "BI" },
      "Africa/Mogadishu": { country: "SO" },
      "Africa/Juba": { country: "SS" },
      "Africa/Libreville": { country: "GA" },
      "Africa/Brazzaville": { country: "CG" },
      "Africa/Kinshasa": { country: "CD" },
      "Africa/Bangui": { country: "CF" },
      "Africa/N'Djamena": { country: "TD" },
      "Africa/Niamey": { country: "NE" },
      "Africa/Bamako": { country: "ML" },
      "Africa/Conakry": { country: "GN" },
      "Africa/Freetown": { country: "SL" },
      "Africa/Monrovia": { country: "LR" },
      "Africa/Abidjan": { country: "CI" },
      "Africa/Ouagadougou": { country: "BF" },
      "Africa/Cotonou": { country: "BJ" },
      "Africa/Lome": { country: "TG" },

      // Americas - United States with state inference where unambiguous
      "America/Anchorage": { country: "US", state: "AK" }, // Alaska (most of state)
      "America/Adak": { country: "US", state: "AK" }, // Alaska (Aleutian Islands)
      "America/Juneau": { country: "US", state: "AK" }, // Alaska (capital)
      "America/Yakutat": { country: "US", state: "AK" }, // Alaska
      "America/Nome": { country: "US", state: "AK" }, // Alaska
      "America/Metlakatla": { country: "US", state: "AK" }, // Alaska
      "America/Phoenix": { country: "US", state: "AZ" }, // Arizona (majority, Navajo Nation例外)
      "America/Los_Angeles": { country: "US" }, // CA/OR/WA - ambiguous, no state
      "America/Denver": { country: "US" }, // Multiple states - ambiguous
      "America/Chicago": { country: "US" }, // Multiple states - ambiguous
      "America/New_York": { country: "US" }, // Multiple states - ambiguous
      "America/Detroit": { country: "US", state: "MI" }, // Michigan (mostly)
      "America/Indiana/Indianapolis": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Vincennes": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Marengo": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Vevay": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Petersburg": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Winamac": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Tell_City": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Knox": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Monticello": { country: "US", state: "IN" }, // Indiana
      "America/Indiana/Washington": { country: "US", state: "IN" }, // Indiana
      "America/Kentucky/Louisville": { country: "US", state: "KY" }, // Kentucky
      "America/Kentucky/Monticello": { country: "US", state: "KY" }, // Kentucky
      "America/Guadeloupe": { country: "GP" },
      "America/Halifax": { country: "CA", state: "NS" }, // Nova Scotia
      "America/Glace_Bay": { country: "CA", state: "NS" }, // Nova Scotia
      "America/Moncton": { country: "CA", state: "NB" }, // New Brunswick
      "America/Goose_Bay": { country: "CA", state: "NL" }, // Newfoundland
      "America/St_Johns": { country: "CA", state: "NL" }, // Newfoundland
      "America/Blanc-Sablon": { country: "CA", state: "QC" }, // Quebec
      "America/Toronto": { country: "CA", state: "ON" }, // Ontario
      "America/Nipigon": { country: "CA", state: "ON" }, // Ontario
      "America/Thunder_Bay": { country: "CA", state: "ON" }, // Ontario
      "America/Iqaluit": { country: "CA", state: "NU" }, // Nunavut
      "America/Pangnirtung": { country: "CA", state: "NU" }, // Nunavut
      "America/Resolute": { country: "CA", state: "NU" }, // Nunavut
      "America/Rankin_Inlet": { country: "CA", state: "NU" }, // Nunavut
      "America/Winnipeg": { country: "CA", state: "MB" }, // Manitoba
      "America/Rainy_River": { country: "CA", state: "ON" }, // Ontario
      "America/Regina": { country: "CA", state: "SK" }, // Saskatchewan
      "America/Swift_Current": { country: "CA", state: "SK" }, // Saskatchewan
      "America/Edmonton": { country: "CA", state: "AB" }, // Alberta
      "America/Vancouver": { country: "CA", state: "BC" }, // British Columbia
      "America/Creston": { country: "CA", state: "BC" }, // British Columbia
      "America/Dawson_Creek": { country: "CA", state: "BC" }, // British Columbia
      "America/Fort_Nelson": { country: "CA", state: "BC" }, // British Columbia
      "America/Whitehorse": { country: "CA", state: "YT" }, // Yukon
      "America/Dawson": { country: "CA", state: "YT" }, // Yukon
      "America/Caracas": { country: "VE" },
      "America/Bogota": { country: "CO" },
      "America/La_Paz": { country: "BO" },
      "America/Manaus": { country: "BR" },
      "America/Sao_Paulo": { country: "BR" },
      "America/Rio_Branco": { country: "BR" },
      "America/Recife": { country: "BR" },
      "America/Brasilia": { country: "BR" },
      "America/Montevideo": { country: "UY" },
      "America/Argentina/Buenos_Aires": { country: "AR" },
      "America/Argentina/Cordoba": { country: "AR" },
      "America/Argentina/Salta": { country: "AR" },
      "America/Argentina/Mendoza": { country: "AR" },
      "America/Argentina/San_Juan": { country: "AR" },
      "America/Argentina/Tucuman": { country: "AR" },
      "America/Argentina/Ushuaia": { country: "AR" },
      "America/Mexico_City": { country: "MX" },
      "America/Cancun": { country: "MX" },
      "America/Merida": { country: "MX" },
      "America/Guatemala": { country: "GT" },
      "America/Tegucigalpa": { country: "HN" },
      "America/Managua": { country: "NI" },
      "America/San_Jose": { country: "CR" },
      "America/El_Salvador": { country: "SV" },
      "America/Port-au-Prince": { country: "HT" },
      "America/Santo_Domingo": { country: "DO" },
      "America/Havana": { country: "CU" },
      "America/Jamaica": { country: "JM" },
      "America/Port_of_Spain": { country: "TT" },
      "America/Barbados": { country: "BB" },
      "America/Nassau": { country: "BS" },

      // Europe
      "Europe/London": { country: "GB" },
      "Europe/Dublin": { country: "IE" },
      "Europe/Lisbon": { country: "PT" },
      "Europe/Paris": { country: "FR" },
      "Europe/Berlin": { country: "DE" },
      "Europe/Rome": { country: "IT" },
      "Europe/Madrid": { country: "ES" },
      "Europe/Amsterdam": { country: "NL" },
      "Europe/Brussels": { country: "BE" },
      "Europe/Vienna": { country: "AT" },
      "Europe/Zurich": { country: "CH" },
      "Europe/Stockholm": { country: "SE" },
      "Europe/Oslo": { country: "NO" },
      "Europe/Copenhagen": { country: "DK" },
      "Europe/Helsinki": { country: "FI" },
      "Europe/Warsaw": { country: "PL" },
      "Europe/Prague": { country: "CZ" },
      "Europe/Budapest": { country: "HU" },
      "Europe/Bucharest": { country: "RO" },
      "Europe/Sofia": { country: "BG" },
      "Europe/Athens": { country: "GR" },
      "Europe/Zagreb": { country: "HR" },
      "Europe/Ljubljana": { country: "SI" },
      "Europe/Bratislava": { country: "SK" },
      "Europe/Tallinn": { country: "EE" },
      "Europe/Riga": { country: "LV" },
      "Europe/Vilnius": { country: "LT" },
      "Europe/Luxembourg": { country: "LU" },
      "Europe/Malta": { country: "MT" },
      "Europe/Nicosia": { country: "CY" },
      "Europe/Reykjavik": { country: "IS" },
      "Europe/Moscow": { country: "RU" },
      "Europe/Kaliningrad": { country: "RU" },
      "Europe/Simferopol": { country: "RU" },
      "Europe/Kirov": { country: "RU" },
      "Europe/Volgograd": { country: "RU" },
      "Europe/Saratov": { country: "RU" },
      "Europe/Astrakhan": { country: "RU" },
      "Europe/Samara": { country: "RU" },
      "Europe/Istanbul": { country: "TR" },
      "Europe/Chisinau": { country: "MD" },
      "Europe/Podgorica": { country: "ME" },
      "Europe/Skopje": { country: "MK" },
      "Europe/Tirana": { country: "AL" },
      "Europe/Belgrade": { country: "RS" },
      "Europe/Sarajevo": { country: "BA" },
      "Europe/Pristina": { country: "XK" },
      "Europe/Monaco": { country: "MC" },
      "Europe/Guernsey": { country: "GG" },
      "Europe/Jersey": { country: "JE" },
      "Europe/Isle_of_Man": { country: "IM" },
      "Europe/Andorra": { country: "AD" },
      "Europe/Monte_Carlo": { country: "MC" },
      "Europe/Vaduz": { country: "LI" },
      "Europe/San_Marino": { country: "SM" },
      "Europe/Vatican": { country: "VA" },

      // Asia
      "Asia/Tokyo": { country: "JP" },
      "Asia/Seoul": { country: "KR" },
      "Asia/Shanghai": { country: "CN" },
      "Asia/Hong_Kong": { country: "HK" },
      "Asia/Macau": { country: "MO" },
      "Asia/Taipei": { country: "TW" },
      "Asia/Kolkata": { country: "IN" },
      "Asia/Karachi": { country: "PK" },
      "Asia/Dhaka": { country: "BD" },
      "Asia/Colombo": { country: "LK" },
      "Asia/Kathmandu": { country: "NP" },
      "Asia/Thimphu": { country: "BT" },
      "Asia/Yangon": { country: "MM" },
      "Asia/Bangkok": { country: "TH" },
      "Asia/Ho_Chi_Minh": { country: "VN" },
      "Asia/Saigon": { country: "VN" },
      "Asia/Jakarta": { country: "ID" },
      "Asia/Manila": { country: "PH" },
      "Asia/Kuala_Lumpur": { country: "MY" },
      "Asia/Singapore": { country: "SG" },
      "Asia/Hanoi": { country: "VN" },
      "Asia/Pyongyang": { country: "KP" },
      "Asia/Ulaanbaatar": { country: "MN" },
      "Asia/Beijing": { country: "CN" },
      "Asia/Tehran": { country: "IR" },
      "Asia/Baghdad": { country: "IQ" },
      "Asia/Riyadh": { country: "SA" },
      "Asia/Dubai": { country: "AE" },
      "Asia/Muscat": { country: "OM" },
      "Asia/Kuwait": { country: "KW" },
      "Asia/Qatar": { country: "QA" },
      "Asia/Bahrain": { country: "BH" },
      "Asia/Amman": { country: "JO" },
      "Asia/Beirut": { country: "LB" },
      "Asia/Damascus": { country: "SY" },
      "Asia/Jerusalem": { country: "IL" },
      "Asia/Nicosia": { country: "CY" },
      "Asia/Aden": { country: "YE" },
      "Asia/Sana'a": { country: "YE" },
      "Asia/Kabul": { country: "AF" },
      "Asia/Tashkent": { country: "UZ" },
      "Asia/Almaty": { country: "KZ" },
      "Asia/Gaza": { country: "PS" },
      "Asia/Gulf": { country: "AE" },

      // Oceania
      "Australia/Sydney": { country: "AU", state: "NSW" }, // New South Wales
      "Australia/Melbourne": { country: "AU", state: "VIC" }, // Victoria
      "Australia/Perth": { country: "AU", state: "WA" }, // Western Australia
      "Australia/Adelaide": { country: "AU", state: "SA" }, // South Australia
      "Australia/Brisbane": { country: "AU", state: "QLD" }, // Queensland
      "Australia/Darwin": { country: "AU", state: "NT" }, // Northern Territory
      "Australia/Hobart": { country: "AU", state: "TAS" }, // Tasmania
      "Australia/Lord_Howe": { country: "AU", state: "NSW" }, // NSW
      "Pacific/Auckland": { country: "NZ" },
      "Pacific/Fiji": { country: "FJ" },
      "Pacific/Port_Moresby": { country: "PG" },
      "Pacific/Honolulu": { country: "US", state: "HI" }, // Hawaii
      "Pacific/Guam": { country: "GU" },
      "Pacific/Mariana_Islands": { country: "MP" },
      "Pacific/Tahiti": { country: "PF" },
      "Pacific/Noumea": { country: "NC" },
      "Pacific/Suva": { country: "FJ" },
      "Pacific/Chatham": { country: "NZ" },
      "Pacific/Tongatapu": { country: "TO" },
      "Pacific/Apia": { country: "WS" },
      "Pacific/Rarotonga": { country: "CK" },
      "Pacific/Majuro": { country: "MH" },
      "Pacific/Kwajalein": { country: "MH" },
      "Pacific/Chuuk": { country: "FM" },
      "Pacific/Pohnpei": { country: "FM" },
      "Pacific/Kosrae": { country: "FM" },
      "Pacific/Nauru": { country: "NR" },
      "Pacific/Tarawa": { country: "KI" },
      "Pacific/Enderbury": { country: "KI" },
      "Pacific/Kiritimati": { country: "KI" },
    };

    if (timezone && timezoneLocationMap[timezone]) {
      return timezoneLocationMap[timezone];
    }
  } catch (e) {
    console.warn("Timezone detection failed:", e);
  }

  // Method 2: Use browser language/locale
  try {
    const language =
      navigator.language ||
      (navigator as unknown as { userLanguage: string }).userLanguage;
    if (language) {
      const parts = language.split("-");
      if (parts.length === 2) {
        const countryCode = parts[1].toUpperCase();
        if (/^[A-Z]{2}$/.test(countryCode)) {
          return { country: countryCode };
        }
      }
    }
  } catch (e) {
    console.warn("Language detection failed:", e);
  }

  // Default fallback: South Africa (since business is based there)
  return { country: "ZA" };
}

/**
 * Main function: get the required adult age based on user's location
 * Automatically detects location and returns appropriate age
 */
export function getRequiredAdultAge(): number {
  const location = detectUserLocation();
  const age = getAdultAgeForCountry(location.country, location.state);
  console.log(
    `[AgeGate] Detected location: ${location.country}${location.state ? "/" + location.state : ""}, required age: ${age}`,
  );
  return age;
}
