/**
 * Age of majority by country/state/province (in years)
 *
 * Two data structures:
 *   REGIONAL_AGES – countries where the age varies by state/province (US, CA, AU, MX).
 *   COUNTRY_AGES  – every other country, keyed by ISO 3166-1 alpha-2.
 *
 * Unknown ages are represented as `null` rather than a magic sentinel like 999.
 * The lookup functions surface this so callers can decide how to handle it
 * (e.g. default to 18, block access, or prompt manually).
 *
 * Sources: https://en.wikipedia.org/wiki/Age_of_majority
 */

// ---------------------------------------------------------------------------
// 1. Regional ages (state / province level)
// ---------------------------------------------------------------------------

/**
 * Countries where the age of majority varies by subdivision.
 * Each entry maps subdivision codes to their age.
 *
 * Note: For US alcohol/tobacco the federal minimum is 21 everywhere, but
 * this file tracks the general age of majority, not activity-specific ages.
 */
export const REGIONAL_AGES: Record<string, Record<string, number>> = {
  /** United States – age of majority by state/territory */
  US: {
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
    MS: 18, // Mississippi
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
    PR: 21, // Puerto Rico
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
    DC: 18, // Washington D.C.
  },

  /** Canada – age of majority by province/territory */
  CA: {
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
  },

  /** Australia – uniform 18 nationwide; kept regional for precision */
  AU: {
    NSW: 18, // New South Wales
    VIC: 18, // Victoria
    QLD: 18, // Queensland
    WA: 18, // Western Australia
    SA: 18, // South Australia
    TAS: 18, // Tasmania
    ACT: 18, // Australian Capital Territory
    NT: 18, // Northern Territory
  },

  /** Mexico – uniform 18 nationwide across all 31 states + CDMX */
  MX: {
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
    SON: 19, // Sonora
    TAB: 19, // Tabasco
    TAM: 18, // Tamaulipas
    TLA: 18, // Tlaxcala
    VER: 18, // Veracruz
    YUC: 18, // Yucatán
    ZAC: 18, // Zacatecas
  },
};

// ---------------------------------------------------------------------------
// 2. Flat country-level ages
//    null = age of majority is not clearly established / unrecognised territory
// ---------------------------------------------------------------------------

export const COUNTRY_AGES: Record<string, number | null> = {
  // ── Africa ───────────────────────────────────────────────────────────────
  AO: 18, // Angola
  BI: 18, // Burundi
  BW: 18, // Botswana
  CD: 18, // DR Congo
  CF: 18, // Central African Republic
  CG: 18, // Republic of the Congo
  CI: 18, // Côte d'Ivoire (Ivory Coast)
  CM: 21, // Cameroon
  DJ: 18, // Djibouti
  DZ: 19, // Algeria
  EG: 18, // Egypt
  ER: 18, // Eritrea
  ET: 18, // Ethiopia
  GA: 21, // Gabon
  GH: 18, // Ghana
  GN: 18, // Guinea
  KE: 18, // Kenya
  LS: 21, // Lesotho
  MA: 18, // Morocco
  MW: 18, // Malawi
  MZ: 18, // Mozambique
  NA: 18, // Namibia
  NG: 18, // Nigeria
  RW: 18, // Rwanda
  SD: 18, // Sudan
  SN: 18, // Senegal
  SO: 18, // Somalia
  SS: 18, // South Sudan
  SZ: 21, // Eswatini (formerly Swaziland)
  TD: 21, // Chad
  TN: 18, // Tunisia
  TZ: 18, // Tanzania
  UG: 18, // Uganda
  ZA: 18, // South Africa
  ZM: 18, // Zambia
  ZW: 18, // Zimbabwe

  // ── Europe ───────────────────────────────────────────────────────────────
  AD: 18, // Andorra
  AL: 18, // Albania
  AT: 18, // Austria
  BA: 18, // Bosnia and Herzegovina
  BE: 18, // Belgium
  BG: 18, // Bulgaria
  BY: 18, // Belarus
  CH: 18, // Switzerland
  CY: 18, // Cyprus
  CZ: 18, // Czech Republic
  DE: 18, // Germany
  DK: 18, // Denmark
  EE: 18, // Estonia
  ES: 18, // Spain
  FI: 18, // Finland
  FR: 18, // France
  GB: 18, // United Kingdom
  GG: 18, // Guernsey
  GR: 18, // Greece
  HR: 18, // Croatia
  HU: 18, // Hungary
  IE: 18, // Ireland
  IM: 18, // Isle of Man
  IS: 18, // Iceland
  IT: 18, // Italy
  JE: 18, // Jersey
  LI: 18, // Liechtenstein
  LT: 18, // Lithuania
  LU: 18, // Luxembourg
  LV: 18, // Latvia
  MC: 18, // Monaco
  MD: 18, // Moldova
  ME: 18, // Montenegro
  MK: 18, // North Macedonia
  MT: 18, // Malta
  NL: 18, // Netherlands
  NO: 18, // Norway
  PL: 18, // Poland
  PT: 18, // Portugal
  RO: 18, // Romania
  RS: 18, // Serbia
  RU: 18, // Russia
  SE: 18, // Sweden
  SI: 18, // Slovenia
  SK: 18, // Slovakia
  SM: 18, // San Marino
  TR: 18, // Turkey
  UA: 18, // Ukraine
  VA: 18, // Vatican City
  XK: 18, // Kosovo

  // ── Asia ─────────────────────────────────────────────────────────────────
  AE: 18, // UAE (21 for alcohol, 18 for majority)
  AF: 18, // Afghanistan
  AM: 18, // Armenia
  AZ: 18, // Azerbaijan
  BD: 18, // Bangladesh
  BH: 18, // Bahrain (21 for alcohol, 18 for majority)
  BN: 18, // Brunei
  BT: 18, // Bhutan
  CN: 18, // China
  GE: 18, // Georgia
  HK: 18, // Hong Kong
  ID: 18, // Indonesia
  IL: 18, // Israel
  IN: 18, // India
  IQ: 18, // Iraq
  IR: 18, // Iran
  JO: 18, // Jordan
  JP: 18, // Japan (20 for alcohol/tobacco, but 18 for majority)
  KG: 18, // Kyrgyzstan
  KH: 18, // Cambodia
  KP: 18, // North Korea
  KR: 19, // South Korea
  KW: 21, // Kuwait
  KZ: 18, // Kazakhstan
  LA: 18, // Laos
  LB: 18, // Lebanon
  LK: 18, // Sri Lanka
  MM: 18, // Myanmar
  MN: 18, // Mongolia
  MO: 18, // Macau
  MY: 18, // Malaysia
  NP: 18, // Nepal
  OM: 18, // Oman
  PH: 18, // Philippines
  PK: 18, // Pakistan
  PS: 18, // Palestine
  QA: 18, // Qatar (21 for alcohol, 18 for majority)
  SA: 18, // Saudi Arabia
  SG: 18, // Singapore
  SY: 18, // Syria
  TH: 18, // Thailand
  TJ: 18, // Tajikistan
  TM: 18, // Turkmenistan
  TW: 18, // Taiwan (lowered from 20 in 2023)
  UZ: 18, // Uzbekistan
  VN: 18, // Vietnam
  YE: 18, // Yemen

  // ── Americas ─────────────────────────────────────────────────────────────
  AR: 18, // Argentina
  BB: 18, // Barbados
  BO: 18, // Bolivia
  BR: 18, // Brazil
  BS: 18, // Bahamas
  CL: 18, // Chile
  CO: 18, // Colombia
  CR: 18, // Costa Rica
  CU: 18, // Cuba
  DO: 18, // Dominican Republic
  EC: 18, // Ecuador
  GD: 21, // Grenada
  GT: 18, // Guatemala
  GY: 18, // Guyana
  HN: 18, // Honduras
  HT: 18, // Haiti
  JM: 18, // Jamaica
  NI: 18, // Nicaragua
  PA: 18, // Panama
  PE: 18, // Peru
  PY: 18, // Paraguay
  SV: 18, // El Salvador
  TT: 18, // Trinidad and Tobago
  UY: 18, // Uruguay
  VE: 18, // Venezuela

  // ── Oceania ──────────────────────────────────────────────────────────────
  FJ: 18, // Fiji
  FM: 18, // Micronesia
  MH: 18, // Marshall Islands
  NR: 18, // Nauru
  NZ: 18, // New Zealand
  PG: 18, // Papua New Guinea
  PW: 18, // Palau
  SB: 18, // Solomon Islands
  TO: 18, // Tonga
  TV: null, // Tuvalu – not clearly codified
  VU: 18, // Vanuatu
  WS: 18, // Samoa

  // ── Territories / unincorporated / unclear ────────────────────────────────
  CK: null, // Cook Islands – self-governing, age not clearly codified
  KI: null, // Kiribati – uncodified
  NU: null, // Niue – self-governing, age not clearly codified
  TK: null, // Tokelau – non-self-governing territory
};

// ---------------------------------------------------------------------------
// 3. Lookup helpers
// ---------------------------------------------------------------------------

/**
 * Return the conservative fallback age when only the country is known for a
 * regional country (no state/province detected). Uses the highest subdivision
 * age to avoid under-restricting.
 */
function regionalFallback(countryCode: string): number {
  const subs = REGIONAL_AGES[countryCode];
  if (!subs) return 18;
  return Math.max(...Object.values(subs));
}

/**
 * Return the legal age of majority for a country and optional subdivision.
 *
 * - For US / CA / AU / MX: pass the subdivision code as `stateCode` for
 *   precise results; omits will fall back to the highest age in that country.
 * - Returns `null` when the age is genuinely unknown for that territory.
 *
 * @param countryCode – ISO 3166-1 alpha-2 (e.g. "ZA", "US")
 * @param stateCode   – Optional subdivision code (e.g. "AL", "BC", "NSW")
 */
export function getAdultAgeForCountry(
  countryCode: string,
  stateCode?: string | null,
): number | null {
  const country = countryCode.toUpperCase();
  const state = stateCode?.toUpperCase();

  // Regional countries: try exact subdivision first, then conservative fallback
  if (REGIONAL_AGES[country]) {
    if (state && REGIONAL_AGES[country][state] !== undefined) {
      return REGIONAL_AGES[country][state];
    }
    return regionalFallback(country);
  }

  // Flat country lookup — may be null for uncodified territories
  if (Object.prototype.hasOwnProperty.call(COUNTRY_AGES, country)) {
    return COUNTRY_AGES[country];
  }

  console.warn(`[AgeGate] Unknown country code: "${country}"`);
  return null;
}

/**
 * Check whether `age` meets the legal adult threshold for a country/state.
 * Returns `null` when the required age is unknown (caller decides policy).
 */
export function isLegalAdult(
  age: number,
  countryCode: string,
  stateCode?: string,
): boolean | null {
  const required = getAdultAgeForCountry(countryCode, stateCode);
  if (required === null) return null;
  return age >= required;
}

// ---------------------------------------------------------------------------
// 4. Location detection
// ---------------------------------------------------------------------------

type Location = { country: string; state?: string };

/**
 * Detect the user's country (and optionally state/province) from browser APIs.
 *
 * Order of precedence:
 *   1. IANA timezone  – most reliable; can also infer subdivision for some countries
 *   2. navigator.language locale tag  – fallback
 *
 * Returns `null` when neither method yields a usable result.
 */
export function detectUserLocation(): Location | null {
  // ── Method 1: IANA timezone ──────────────────────────────────────────────
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const timezoneLocationMap: Record<string, Location> = {
      // Africa
      "Africa/Abidjan": { country: "CI" },
      "Africa/Accra": { country: "GH" },
      "Africa/Addis_Ababa": { country: "ET" },
      "Africa/Algiers": { country: "DZ" },
      "Africa/Asmara": { country: "ER" },
      "Africa/Bamako": { country: "ML" },
      "Africa/Bangui": { country: "CF" },
      "Africa/Brazzaville": { country: "CG" },
      "Africa/Bujumbura": { country: "BI" },
      "Africa/Cairo": { country: "EG" },
      "Africa/Cape_Town": { country: "ZA" },
      "Africa/Conakry": { country: "GN" },
      "Africa/Cotonou": { country: "BJ" },
      "Africa/Dakar": { country: "SN" },
      "Africa/Dar_es_Salaam": { country: "TZ" },
      "Africa/Djibouti": { country: "DJ" },
      "Africa/Douala": { country: "CM" },
      "Africa/Durban": { country: "ZA" },
      "Africa/Freetown": { country: "SL" },
      "Africa/Gaborone": { country: "BW" },
      "Africa/Harare": { country: "ZW" },
      "Africa/Johannesburg": { country: "ZA" },
      "Africa/Juba": { country: "SS" },
      "Africa/Kampala": { country: "UG" },
      "Africa/Khartoum": { country: "SD" },
      "Africa/Kigali": { country: "RW" },
      "Africa/Kinshasa": { country: "CD" },
      "Africa/Lagos": { country: "NG" },
      "Africa/Libreville": { country: "GA" },
      "Africa/Lome": { country: "TG" },
      "Africa/Luanda": { country: "AO" },
      "Africa/Lusaka": { country: "ZM" },
      "Africa/Malabo": { country: "GQ" },
      "Africa/Maputo": { country: "MZ" },
      "Africa/Maseru": { country: "LS" },
      "Africa/Mbabane": { country: "SZ" },
      "Africa/Mogadishu": { country: "SO" },
      "Africa/Monrovia": { country: "LR" },
      "Africa/Nairobi": { country: "KE" },
      "Africa/N'Djamena": { country: "TD" },
      "Africa/Niamey": { country: "NE" },
      "Africa/Nouakchott": { country: "MR" },
      "Africa/Ouagadougou": { country: "BF" },
      "Africa/Porto-Novo": { country: "BJ" },
      "Africa/Tunis": { country: "TN" },
      "Africa/Windhoek": { country: "NA" },

      // Americas – US (state-level where unambiguous)
      "America/Adak": { country: "US", state: "AK" },
      "America/Anchorage": { country: "US", state: "AK" },
      "America/Juneau": { country: "US", state: "AK" },
      "America/Metlakatla": { country: "US", state: "AK" },
      "America/Nome": { country: "US", state: "AK" },
      "America/Sitka": { country: "US", state: "AK" },
      "America/Yakutat": { country: "US", state: "AK" },
      "America/Phoenix": { country: "US", state: "AZ" },
      "America/Detroit": { country: "US", state: "MI" },
      "America/Indiana/Indianapolis": { country: "US", state: "IN" },
      "America/Indiana/Knox": { country: "US", state: "IN" },
      "America/Indiana/Marengo": { country: "US", state: "IN" },
      "America/Indiana/Monticello": { country: "US", state: "IN" },
      "America/Indiana/Petersburg": { country: "US", state: "IN" },
      "America/Indiana/Tell_City": { country: "US", state: "IN" },
      "America/Indiana/Vevay": { country: "US", state: "IN" },
      "America/Indiana/Vincennes": { country: "US", state: "IN" },
      "America/Indiana/Winamac": { country: "US", state: "IN" },
      "America/Indiana/Washington": { country: "US", state: "IN" },
      "America/Kentucky/Louisville": { country: "US", state: "KY" },
      "America/Kentucky/Monticello": { country: "US", state: "KY" },
      // Shared timezones – country only, no state inferred
      "America/Chicago": { country: "US" },
      "America/Denver": { country: "US" },
      "America/Los_Angeles": { country: "US" },
      "America/New_York": { country: "US" },

      // Americas – Canada (province-level)
      "America/Blanc-Sablon": { country: "CA", state: "QC" },
      "America/Creston": { country: "CA", state: "BC" },
      "America/Dawson": { country: "CA", state: "YT" },
      "America/Dawson_Creek": { country: "CA", state: "BC" },
      "America/Edmonton": { country: "CA", state: "AB" },
      "America/Fort_Nelson": { country: "CA", state: "BC" },
      "America/Glace_Bay": { country: "CA", state: "NS" },
      "America/Goose_Bay": { country: "CA", state: "NL" },
      "America/Halifax": { country: "CA", state: "NS" },
      "America/Iqaluit": { country: "CA", state: "NU" },
      "America/Moncton": { country: "CA", state: "NB" },
      "America/Nipigon": { country: "CA", state: "ON" },
      "America/Pangnirtung": { country: "CA", state: "NU" },
      "America/Rainy_River": { country: "CA", state: "ON" },
      "America/Rankin_Inlet": { country: "CA", state: "NU" },
      "America/Regina": { country: "CA", state: "SK" },
      "America/Resolute": { country: "CA", state: "NU" },
      "America/St_Johns": { country: "CA", state: "NL" },
      "America/Swift_Current": { country: "CA", state: "SK" },
      "America/Thunder_Bay": { country: "CA", state: "ON" },
      "America/Toronto": { country: "CA", state: "ON" },
      "America/Vancouver": { country: "CA", state: "BC" },
      "America/Whitehorse": { country: "CA", state: "YT" },
      "America/Winnipeg": { country: "CA", state: "MB" },

      // Americas – rest
      "America/Argentina/Buenos_Aires": { country: "AR" },
      "America/Argentina/Cordoba": { country: "AR" },
      "America/Argentina/Mendoza": { country: "AR" },
      "America/Argentina/Salta": { country: "AR" },
      "America/Argentina/San_Juan": { country: "AR" },
      "America/Argentina/Tucuman": { country: "AR" },
      "America/Argentina/Ushuaia": { country: "AR" },
      "America/Barbados": { country: "BB" },
      "America/Bogota": { country: "CO" },
      "America/Cancun": { country: "MX" },
      "America/Caracas": { country: "VE" },
      "America/El_Salvador": { country: "SV" },
      "America/Guatemala": { country: "GT" },
      "America/Guayaquil": { country: "EC" },
      "America/Guadeloupe": { country: "GP" },
      "America/Havana": { country: "CU" },
      "America/Jamaica": { country: "JM" },
      "America/La_Paz": { country: "BO" },
      "America/Lima": { country: "PE" },
      "America/Managua": { country: "NI" },
      "America/Manaus": { country: "BR" },
      "America/Merida": { country: "MX" },
      "America/Mexico_City": { country: "MX" },
      "America/Montevideo": { country: "UY" },
      "America/Nassau": { country: "BS" },
      "America/Panama": { country: "PA" },
      "America/Port-au-Prince": { country: "HT" },
      "America/Port_of_Spain": { country: "TT" },
      "America/Recife": { country: "BR" },
      "America/Rio_Branco": { country: "BR" },
      "America/San_Jose": { country: "CR" },
      "America/Santiago": { country: "CL" },
      "America/Santo_Domingo": { country: "DO" },
      "America/Sao_Paulo": { country: "BR" },
      "America/Tegucigalpa": { country: "HN" },

      // Europe
      "Europe/Amsterdam": { country: "NL" },
      "Europe/Andorra": { country: "AD" },
      "Europe/Athens": { country: "GR" },
      "Europe/Belgrade": { country: "RS" },
      "Europe/Berlin": { country: "DE" },
      "Europe/Bratislava": { country: "SK" },
      "Europe/Brussels": { country: "BE" },
      "Europe/Bucharest": { country: "RO" },
      "Europe/Budapest": { country: "HU" },
      "Europe/Chisinau": { country: "MD" },
      "Europe/Copenhagen": { country: "DK" },
      "Europe/Dublin": { country: "IE" },
      "Europe/Gibraltar": { country: "GI" },
      "Europe/Guernsey": { country: "GG" },
      "Europe/Helsinki": { country: "FI" },
      "Europe/Isle_of_Man": { country: "IM" },
      "Europe/Istanbul": { country: "TR" },
      "Europe/Jersey": { country: "JE" },
      "Europe/Kaliningrad": { country: "RU" },
      "Europe/Kiev": { country: "UA" },
      "Europe/Kyiv": { country: "UA" },
      "Europe/Lisbon": { country: "PT" },
      "Europe/Ljubljana": { country: "SI" },
      "Europe/London": { country: "GB" },
      "Europe/Luxembourg": { country: "LU" },
      "Europe/Madrid": { country: "ES" },
      "Europe/Malta": { country: "MT" },
      "Europe/Minsk": { country: "BY" },
      "Europe/Monaco": { country: "MC" },
      "Europe/Moscow": { country: "RU" },
      "Europe/Nicosia": { country: "CY" },
      "Europe/Oslo": { country: "NO" },
      "Europe/Paris": { country: "FR" },
      "Europe/Podgorica": { country: "ME" },
      "Europe/Prague": { country: "CZ" },
      "Europe/Pristina": { country: "XK" },
      "Europe/Riga": { country: "LV" },
      "Europe/Rome": { country: "IT" },
      "Europe/Samara": { country: "RU" },
      "Europe/San_Marino": { country: "SM" },
      "Europe/Sarajevo": { country: "BA" },
      "Europe/Saratov": { country: "RU" },
      "Europe/Simferopol": { country: "RU" },
      "Europe/Skopje": { country: "MK" },
      "Europe/Sofia": { country: "BG" },
      "Europe/Stockholm": { country: "SE" },
      "Europe/Tallinn": { country: "EE" },
      "Europe/Tirane": { country: "AL" },
      "Europe/Tirana": { country: "AL" },
      "Europe/Uzhgorod": { country: "UA" },
      "Europe/Vaduz": { country: "LI" },
      "Europe/Vatican": { country: "VA" },
      "Europe/Vienna": { country: "AT" },
      "Europe/Vilnius": { country: "LT" },
      "Europe/Volgograd": { country: "RU" },
      "Europe/Warsaw": { country: "PL" },
      "Europe/Zagreb": { country: "HR" },
      "Europe/Zaporozhye": { country: "UA" },
      "Europe/Zurich": { country: "CH" },
      "Atlantic/Reykjavik": { country: "IS" },

      // Asia
      "Asia/Aden": { country: "YE" },
      "Asia/Almaty": { country: "KZ" },
      "Asia/Amman": { country: "JO" },
      "Asia/Ashgabat": { country: "TM" },
      "Asia/Baghdad": { country: "IQ" },
      "Asia/Bahrain": { country: "BH" },
      "Asia/Baku": { country: "AZ" },
      "Asia/Bangkok": { country: "TH" },
      "Asia/Beijing": { country: "CN" },
      "Asia/Beirut": { country: "LB" },
      "Asia/Bishkek": { country: "KG" },
      "Asia/Brunei": { country: "BN" },
      "Asia/Colombo": { country: "LK" },
      "Asia/Damascus": { country: "SY" },
      "Asia/Dhaka": { country: "BD" },
      "Asia/Dubai": { country: "AE" },
      "Asia/Dushanbe": { country: "TJ" },
      "Asia/Gaza": { country: "PS" },
      "Asia/Gulf": { country: "AE" },
      "Asia/Hanoi": { country: "VN" },
      "Asia/Ho_Chi_Minh": { country: "VN" },
      "Asia/Hong_Kong": { country: "HK" },
      "Asia/Jakarta": { country: "ID" },
      "Asia/Jerusalem": { country: "IL" },
      "Asia/Kabul": { country: "AF" },
      "Asia/Karachi": { country: "PK" },
      "Asia/Kathmandu": { country: "NP" },
      "Asia/Kolkata": { country: "IN" },
      "Asia/Kuala_Lumpur": { country: "MY" },
      "Asia/Kuwait": { country: "KW" },
      "Asia/Macau": { country: "MO" },
      "Asia/Makassar": { country: "ID" },
      "Asia/Manila": { country: "PH" },
      "Asia/Muscat": { country: "OM" },
      "Asia/Nicosia": { country: "CY" },
      "Asia/Phnom_Penh": { country: "KH" },
      "Asia/Pyongyang": { country: "KP" },
      "Asia/Qatar": { country: "QA" },
      "Asia/Riyadh": { country: "SA" },
      "Asia/Saigon": { country: "VN" },
      "Asia/Seoul": { country: "KR" },
      "Asia/Shanghai": { country: "CN" },
      "Asia/Singapore": { country: "SG" },
      "Asia/Taipei": { country: "TW" },
      "Asia/Tashkent": { country: "UZ" },
      "Asia/Tbilisi": { country: "GE" },
      "Asia/Tehran": { country: "IR" },
      "Asia/Thimphu": { country: "BT" },
      "Asia/Tokyo": { country: "JP" },
      "Asia/Ulaanbaatar": { country: "MN" },
      "Asia/Vientiane": { country: "LA" },
      "Asia/Yangon": { country: "MM" },
      "Asia/Yerevan": { country: "AM" },

      // Oceania – Australia (state-level)
      "Australia/ACT": { country: "AU", state: "ACT" },
      "Australia/Adelaide": { country: "AU", state: "SA" },
      "Australia/Brisbane": { country: "AU", state: "QLD" },
      "Australia/Darwin": { country: "AU", state: "NT" },
      "Australia/Hobart": { country: "AU", state: "TAS" },
      "Australia/Lord_Howe": { country: "AU", state: "NSW" },
      "Australia/Melbourne": { country: "AU", state: "VIC" },
      "Australia/Perth": { country: "AU", state: "WA" },
      "Australia/Sydney": { country: "AU", state: "NSW" },

      // Oceania – rest
      "Pacific/Auckland": { country: "NZ" },
      "Pacific/Apia": { country: "WS" },
      "Pacific/Chatham": { country: "NZ" },
      "Pacific/Chuuk": { country: "FM" },
      "Pacific/Enderbury": { country: "KI" },
      "Pacific/Fiji": { country: "FJ" },
      "Pacific/Guam": { country: "GU" },
      "Pacific/Honolulu": { country: "US", state: "HI" },
      "Pacific/Kiritimati": { country: "KI" },
      "Pacific/Kosrae": { country: "FM" },
      "Pacific/Kwajalein": { country: "MH" },
      "Pacific/Majuro": { country: "MH" },
      "Pacific/Nauru": { country: "NR" },
      "Pacific/Noumea": { country: "NC" },
      "Pacific/Pohnpei": { country: "FM" },
      "Pacific/Port_Moresby": { country: "PG" },
      "Pacific/Rarotonga": { country: "CK" },
      "Pacific/Suva": { country: "FJ" },
      "Pacific/Tahiti": { country: "PF" },
      "Pacific/Tarawa": { country: "KI" },
      "Pacific/Tongatapu": { country: "TO" },
    };

    if (timezone && timezoneLocationMap[timezone]) {
      return timezoneLocationMap[timezone];
    }
  } catch (e) {
    console.warn("[AgeGate] Timezone detection failed:", e);
  }

  // ── Method 2: navigator.language locale tag ───────────────────────────────
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
    console.warn("[AgeGate] Language detection failed:", e);
  }

  return null;
}

// ---------------------------------------------------------------------------
// 5. Public API
// ---------------------------------------------------------------------------

/**
 * Auto-detect the user's location and return the applicable age of majority.
 * Returns `null` if location cannot be determined or the territory's age is
 * uncodified — callers should decide their own policy for the null case
 * (e.g. conservative default, manual prompt, or block).
 */
export function getRequiredAdultAge(): number | null {
  const location = detectUserLocation();
  if (!location) return null;
  return getAdultAgeForCountry(location.country, location.state);
}

/**
 * Auto-detect the user's location and check whether `age` meets the threshold.
 * Returns `null` if location or age is unknown (caller decides policy).
 */
export function isCurrentUserAdult(age: number): boolean | null {
  const required = getRequiredAdultAge();
  if (required === null) return null;
  return age >= required;
}
