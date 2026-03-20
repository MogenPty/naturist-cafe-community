/**
 * Age of majority by country (in years)
 * Source: Various legal sources - age of majority laws
 *
 * Note: These are general ages. Some countries have different ages for
 * specific activities (alcohol, voting, etc.). For website access,
 * we use the general age of majority.
 *
 * Key:
 *   - Most countries: 18
 *   - Some countries: 19, 20, or 21
 */

// Countries with age 18 (most common)
const AGE_18_COUNTRIES: string[] = [
  // Africa
  "ZA", // South Africa
  "NG", // Nigeria
  "KE", // Kenya
  "EG", // Egypt
  "GH", // Ghana
  "MA", // Morocco
  "DZ", // Algeria
  "TN", // Tunisia
  "CM", // Cameroon
  "SN", // Senegal
  // Europe
  "GB", // United Kingdom
  "FR", // France
  "DE", // Germany
  "IT", // Italy
  "ES", // Spain
  "PT", // Portugal
  "NL", // Netherlands
  "BE", // Belgium
  "CH", // Switzerland
  "AT", // Austria
  "SE", // Sweden
  "NO", // Norway
  "DK", // Denmark
  "FI", // Finland
  "PL", // Poland
  "CZ", // Czech Republic
  "HU", // Hungary
  "RO", // Romania
  "BG", // Bulgaria
  "GR", // Greece
  "HR", // Croatia
  "SI", // Slovenia
  "SK", // Slovakia
  "EE", // Estonia
  "LV", // Latvia
  "LT", // Lithuania
  "LU", // Luxembourg
  "MT", // Malta
  "CY", // Cyprus
  "IS", // Iceland
  "IE", // Ireland
  // Asia
  "JP", // Japan
  "KR", // South Korea
  "IN", // India
  "SG", // Singapore
  "MY", // Malaysia
  "TH", // Thailand
  "VN", // Vietnam
  "PH", // Philippines
  "ID", // Indonesia
  "PK", // Pakistan
  "BD", // Bangladesh
  "LK", // Sri Lanka
  "NP", // Nepal
  "KH", // Cambodia
  "LA", // Laos
  "MM", // Myanmar
  "MN", // Mongolia
  "KW", // Kuwait
  "QA", // Qatar
  "AE", // UAE
  "BH", // Bahrain
  "OM", // Oman
  "SA", // Saudi Arabia
  "JO", // Jordan
  "LB", // Lebanon
  "SY", // Syria
  "IQ", // Iraq
  "IR", // Iran
  "IL", // Israel
  "MT", // Malta (already listed)
  "TR", // Turkey
  // Americas
  "US", // USA (federal age 18, though varies by state for some activities)
  "CA", // Canada (18 in most provinces, 19 in others - we'll use 18 as default)
  "MX", // Mexico
  "BR", // Brazil
  "AR", // Argentina
  "CL", // Chile
  "CO", // Colombia
  "PE", // Peru
  "VE", // Venezuela
  "EC", // Ecuador
  "BO", // Bolivia
  "PY", // Paraguay
  "UY", // Uruguay
  "DO", // Dominican Republic
  "PR", // Puerto Rico (US territory)
  "PA", // Panama
  "CR", // Costa Rica
  "NI", // Nicaragua
  "HN", // Honduras
  "SV", // El Salvador
  "GT", // Guatemala
  "CU", // Cuba
  "JM", // Jamaica
  "TT", // Trinidad and Tobago
  "BS", // Bahamas
  "BB", // Barbados
  // Oceania
  "AU", // Australia
  "NZ", // New Zealand
  "FJ", // Fiji
  "PG", // Papua New Guinea
  // Africa (continued)
  "ZW", // Zimbabwe
  "ZM", // Zambia
  "MW", // Malawi
  "MZ", // Mozambique
  "BW", // Botswana
  "NA", // Namibia
  "AO", // Angola
  "CG", // Congo
  "CD", // DR Congo
  "TZ", // Tanzania
  "UG", // Uganda
  "KE", // Kenya (already listed)
  "ET", // Ethiopia
  "SO", // Somalia
  "SD", // Sudan
  "SS", // South Sudan
  "ER", // Eritrea
  "DJ", // Djibouti
  "RW", // Rwanda
  "BI", // Burundi
];

// Countries with age 19
const AGE_19_COUNTRIES: string[] = [
  "AL", // Albania
  "KP", // North Korea (19 for women, 17 for men? unclear - using 19)
];

// Countries with age 20
const AGE_20_COUNTRIES: string[] = [
  "MM", // Myanmar (some sources say 18, some 20)
];

// Countries with age 21
const AGE_21_COUNTRIES: string[] = [
  "US", // USA - Note: Some states have 21 for specific activities, but general age of majority is 18
  // However, many websites use 21 as safe age due to alcohol/tobacco laws
  // We'll only set to 21 if they explicitly need it
];

/**
 * Get the legal adult age for a given country code
 * Falls back to 18 if country not in the list
 */
export function getAdultAgeForCountry(countryCode: string): number {
  const upperCode = countryCode.toUpperCase();

  switch (true) {
    case AGE_21_COUNTRIES.includes(upperCode):
      return 21;
    case AGE_20_COUNTRIES.includes(upperCode):
      return 20;
    case AGE_19_COUNTRIES.includes(upperCode):
      return 19;
    case AGE_18_COUNTRIES.includes(upperCode):
      return 18;
    default:
      return 18;
  }
}

/**
 * Detect user's country from browser information
 * Tries multiple methods in order of reliability:
 * 1. timezone (most reliable)
 * 2. language/locale
 * 3. IP geolocation (requires API, not used here)
 */
export function detectUserCountry(): string {
  // Method 1: Use timezone to infer country
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Map timezone to country code (IANA timezone usually contains city/country)
    // A more comprehensive mapping of popular timezones to country codes
    const timezoneCountryMap: Record<string, string> = {
      // Africa
      "Africa/Johannesburg": "ZA",
      "Africa/Cape_Town": "ZA",
      "Africa/Durban": "ZA",
      "Africa/Porto-Novo": "BJ",
      "Africa/Lagos": "NG",
      "Africa/Nairobi": "KE",
      "Africa/Accra": "GH",
      "Africa/Cairo": "EG",
      "Africa/Algiers": "DZ",
      "Africa/Tunis": "TN",
      "Africa/Douala": "CM",
      "Africa/Dakar": "SN",
      "Africa/Khartoum": "SD",
      "Africa/Addis_Ababa": "ET",
      "Africa/Asmara": "ER",
      "Africa/Maputo": "MZ",
      "Africa/Gaborone": "BW",
      "Africa/Windhoek": "NA",
      "Africa/Lusaka": "ZM",
      "Africa/Harare": "ZW",
      "Africa/Kampala": "UG",
      "Africa/Kigali": "RW",
      "Africa/Bujumbura": "BI",
      "Africa/Mogadishu": "SO",
      "Africa/Juba": "SS",
      "Africa/Libreville": "GA",
      "Africa/Brazzaville": "CG",
      "Africa/ Kinshasa": "CD",
      "Africa/Bangui": "CF",
      "Africa/N'Djamena": "TD",
      "Africa/Niamey": "NE",
      "Africa/Bamako": "ML",
      "Africa/Conakry": "GN",
      "Africa/Freetown": "SL",
      "Africa/Monrovia": "LR",
      "Africa/Abidjan": "CI",
      "Africa/Ouagadougou": "BF",
      "Africa/Cotonou": "BJ",
      "Africa/Lome": "TG",

      // Americas
      "America/New_York": "US",
      "America/Detroit": "US",
      "America/Chicago": "US",
      "America/Menominee": "US",
      "America/Denver": "US",
      "America/Phoenix": "US",
      "America/Los_Angeles": "US",
      "America/Anchorage": "US",
      "America/Juneau": "US",
      "America/Yakutat": "US",
      "America/Nome": "US",
      "America/Adak": "US",
      "America/Guam": "GU",
      "America/Saipan": "MP",
      "America/Puerto_Rico": "PR",
      "America/Caracas": "VE",
      "America/Bogota": "CO",
      "America/La_Paz": "BO",
      "America/Manaus": "BR",
      "America/Sao_Paulo": "BR",
      "America/Rio_Branco": "BR",
      "America/Recife": "BR",
      "America/Brasilia": "BR",
      "America/Montevideo": "UY",
      "America/Argentina/Buenos_Aires": "AR",
      "America/Argentina/Cordoba": "AR",
      "America/Argentina/Salta": "AR",
      "America/Argentina/Mendoza": "AR",
      "America/Argentina/San_Juan": "AR",
      "America/Argentina/Tucuman": "AR",
      "America/Argentina/Ushuaia": "AR",
      "America/Mexico_City": "MX",
      "America/Cancun": "MX",
      "America/Merida": "MX",
      "America/Guatemala": "GT",
      "America/Tegucigalpa": "HN",
      "America/Managua": "NI",
      "America/San_Jose": "CR",
      "America/El_Salvador": "SV",
      "America/Port-au-Prince": "HT",
      "America/Santo_Domingo": "DO",
      "America/Havana": "CU",
      "America/Jamaica": "JM",
      "America/Port_of_Spain": "TT",
      "America/Barbados": "BB",
      "America/Nassau": "BS",
      "America/St_Johns": "CA",
      "America/Halifax": "CA",
      "America/Glace_Bay": "CA",
      "America/Moncton": "CA",
      "America/Goose_Bay": "CA",
      "America/Blanc-Sablon": "CA",
      "America/Toronto": "CA",
      "America/Nipigon": "CA",
      "America/Thunder_Bay": "CA",
      "America/Iqaluit": "CA",
      "America/Pangnirtung": "CA",
      "America/Resolute": "CA",
      "America/Rankin_Inlet": "CA",
      "America/Winnipeg": "CA",
      "America/Rainy_River": "CA",
      "America/Regina": "CA",
      "America/Swift_Current": "CA",
      "America/Edmonton": "CA",
      "America/Vancouver": "CA",
      "America/Creston": "CA",
      "America/Dawson_Creek": "CA",
      "America/Fort_Nelson": "CA",
      "Canada/Pacific": "CA",
      "Canada/Mountain": "CA",
      "Canada/Central": "CA",
      "Canada/Eastern": "CA",
      "Canada/Atlantic": "CA",
      "Canada/Newfoundland": "CA",

      // Europe
      "Europe/London": "GB",
      "Europe/Dublin": "IE",
      "Europe/Lisbon": "PT",
      "Europe/Paris": "FR",
      "Europe/Berlin": "DE",
      "Europe/Rome": "IT",
      "Europe/Madrid": "ES",
      "Europe/Amsterdam": "NL",
      "Europe/Brussels": "BE",
      "Europe/Vienna": "AT",
      "Europe/Zurich": "CH",
      "Europe/Stockholm": "SE",
      "Europe/Oslo": "NO",
      "Europe/Copenhagen": "DK",
      "Europe/Helsinki": "FI",
      "Europe/Warsaw": "PL",
      "Europe/Prague": "CZ",
      "Europe/Budapest": "HU",
      "Europe/Bucharest": "RO",
      "Europe/Sofia": "BG",
      "Europe/Athens": "GR",
      "Europe/Zagreb": "HR",
      "Europe/Ljubljana": "SI",
      "Europe/Bratislava": "SK",
      "Europe/Tallinn": "EE",
      "Europe/Riga": "LV",
      "Europe/Vilnius": "LT",
      "Europe/Luxembourg": "LU",
      "Europe/Malta": "MT",
      "Europe/Nicosia": "CY",
      "Europe/Reykjavik": "IS",
      "Europe/Moscow": "RU",
      "Europe/Kaliningrad": "RU",
      "Europe/Simferopol": "RU",
      "Europe/Kirov": "RU",
      "Europe/Volgograd": "RU",
      "Europe/ Saratov": "RU",
      "Europe/Astrakhan": "RU",
      "Europe/Samara": "RU",
      "Europe/Istanbul": "TR",
      "Europe/Chisinau": "MD",
      "Europe/Podgorica": "ME",
      "Europe/Skopje": "MK",
      "Europe/ Tirana": "AL",
      "Europe/Belgrade": "RS",
      "Europe/Sarajevo": "BA",
      "Europe/Pristina": "XK",
      "Europe/Monaco": "MC",
      "Europe/Guernsey": "GG",
      "Europe/Jersey": "JE",
      "Europe/Isle_of_Man": "IM",

      // Asia
      "Asia/Tokyo": "JP",
      "Asia/Seoul": "KR",
      "Asia/Shanghai": "CN",
      "Asia/Hong_Kong": "HK",
      "Asia/Macau": "MO",
      "Asia/Taipei": "TW",
      "Asia/Kolkata": "IN",
      "Asia/Karachi": "PK",
      "Asia/Dhaka": "BD",
      "Asia/Colombo": "LK",
      "Asia/Kathmandu": "NP",
      "Asia/Thimphu": "BT",
      "Asia/Yangon": "MM",
      "Asia/Bangkok": "TH",
      "Asia/Ho_Chi_Minh": "VN",
      "Asia/Saigon": "VN",
      "Asia/Jakarta": "ID",
      "Asia/Manila": "PH",
      "Asia/Kuala_Lumpur": "MY",
      "Asia/Singapore": "SG",
      "Asia/Hanoi": "VN",
      "Asia/Pyongyang": "KP",
      "Asia/Ulaanbaatar": "MN",
      "Asia/Beijing": "CN",
      "Asia/Tehran": "IR",
      "Asia/Baghdad": "IQ",
      "Asia/Riyadh": "SA",
      "Asia/Dubai": "AE",
      "Asia/Muscat": "OM",
      "Asia/Kuwait": "KW",
      "Asia/Qatar": "QA",
      "Asia/Bahrain": "BH",
      "Asia/Amman": "JO",
      "Asia/Beirut": "LB",
      "Asia/Damascus": "SY",
      "Asia/Jerusalem": "IL",
      "Asia/Nicosia": "CY",
      "Asia/Aden": "YE",
      "Asia/Sana'a": "YE",
      "Asia/Kabul": "AF",
      "Asia/Tashkent": "UZ",
      "Asia/Almaty": "KZ",
      "Asia/Gaza": "PS",
      "Asia/Gulf": "AE",

      // Oceania
      "Australia/Sydney": "AU",
      "Australia/Melbourne": "AU",
      "Australia/Perth": "AU",
      "Australia/Adelaide": "AU",
      "Australia/Brisbane": "AU",
      "Australia/Darwin": "AU",
      "Australia/Hobart": "AU",
      "Pacific/Auckland": "NZ",
      "Pacific/Fiji": "FJ",
      "Pacific/Port_Moresby": "PG",
      "Pacific/Honolulu": "US",
      "Pacific/Guam": "GU",
      "Pacific/Mariana_Islands": "MP",
      "Pacific/Tahiti": "PF",
      "Pacific/Noumea": "NC",
      "Pacific/Suva": "FJ",

      // Andorra
      "Europe/Andorra": "AD",
      // Monaco
      "Europe/Monte_Carlo": "MC",
      // Liechtenstein
      "Europe/Vaduz": "LI",
      // San Marino
      "Europe/San_Marino": "SM",
      // Vatican
      "Europe/Vatican": "VA",
    };

    if (timezone && timezoneCountryMap[timezone]) {
      return timezoneCountryMap[timezone];
    }
  } catch (e) {
    // Intl not supported? Fall through to next method
    console.warn("Timezone detection failed:", e);
  }

  // Method 2: Use browser language/locale
  try {
    const language =
      navigator.language ||
      (navigator as unknown as { userLanguage: string }).userLanguage;
    if (language) {
      // Extract country code from locale (e.g., "en-ZA" → "ZA")
      const parts = language.split("-");
      if (parts.length === 2) {
        const countryCode = parts[1].toUpperCase();
        // Only accept valid-looking country codes (2 letters)
        if (/^[A-Z]{2}$/.test(countryCode)) {
          return countryCode;
        }
      }
    }
  } catch (e) {
    console.warn("Language detection failed:", e);
  }

  // Fallback: Default to South Africa (since the business is based there)
  return "ZA";
}

/**
 * Main function: get the required adult age based on user's location
 */
export function getRequiredAdultAge(): number {
  const country = detectUserCountry();
  const age = getAdultAgeForCountry(country);
  console.log(`[AgeGate] Detected country: ${country}, required age: ${age}`);
  return age;
}
