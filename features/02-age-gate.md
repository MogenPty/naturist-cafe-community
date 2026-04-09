# Feature 02: Age Gate

**Epic:** M1 - Public Website  
**Priority:** Must Have (Legal Requirement)  
**Status:** ✅ Implemented  
**Component:** `app/components/AgeGate.tsx`  
**Related:** Uses `app/utils/age-restrictions.ts`, `app/utils/age-utils.ts`

---

## Overview

The Age Gate ensures compliance with legal age restrictions (18+) for accessing the NCC website. It's the first thing visitors see, blocking access to content until age is verified.

---

## User Story

**As a visitor**, I must verify I am 18 years or older before viewing the website, so that the organization complies with South African and international age-related regulations for naturist content.

---

## Requirements

### Functional

1. **Block content** until age verified
2. **Collect date of birth** from user
3. **Validate age** based on detected location
4. **Redirect minors** to external site (Mogen: `https://web.mogen.co.za`)
5. **Persist verification** across sessions (sessionStorage)
6. **Allow exit** option for users who don't wish to proceed

### Non-Functional

1. **Performance:** Immediate load, no network requests for age check
2. **Privacy:** DOB stored only in browser sessionStorage (not sent to server)
3. **Accuracy:** Location detection via timezone; fallback to South Africa (18)
4. **Accessibility:** Form accessible via keyboard and screen reader

---

## Implementation

### Component: `AgeGate.tsx`

**Type:** Client Component (`'use client'`)

**State:**

| State Variable | Type | Purpose |
|----------------|------|---------|
| `verified` | boolean | Has user passed age check? |
| `dateOfBirth` | string | Selected DOB from input |
| `error` | string | Validation error message |
| `loading` | boolean | Initialization state (timezone detection) |
| `requiredAge` | number | Age required for user's location (default 18) |

**Effects:**

```ts
useEffect(() => {
  const age = getRequiredAdultAge(); // Detect location → set required age
  setRequiredAge(age);

  const sessionVerified = sessionStorage.getItem(SESSION_KEY);
  if (sessionVerified === "true") {
    setVerified(true); // Skip gate if already verified
  }
  setLoading(false);
}, []);
```

**Event Handlers:**

- `handleSubmit(e)` - Validate DOB, calculate age, set verified or redirect
- `handleRedirect()` - Manual exit to Mogen

---

### Age Calculation

**Function:** `calculateAge(birthDate: Date): number` (in `age-utils.ts`)

```ts
const today = new Date();
let age = today.getFullYear() - birthDate.getFullYear();
const monthDiff = today.getMonth() - birthDate.getMonth();

if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
  age--;
}
return age;
```

**Edge Cases Handled:**
- Future dates → invalid
- Leap years → handled by Date comparison

---

### Location Detection

**Function:** `detectUserLocation(): { country: string, state?: string }` (in `age-restrictions.ts`)

**Strategies (in order):**

1. **Timezone** (most reliable)
   - Uses `Intl.DateTimeFormat().resolvedOptions().timeZone`
   - Maps timezone → country/state via large lookup table
   - Examples:
     - `Africa/Johannesburg` → `{ country: "ZA" }`
     - `America/New_York` → `{ country: "US" }` (no state due to ambiguity)
     - `America/Los_Angeles` → `{ country: "US" }`

2. **Browser Language** (fallback)
   - Uses `navigator.language`
   - Extracts country code from locale (e.g., `en-ZA` → `ZA`)
   - Less reliable, gives no state info

3. **Default fallback**
   - South Africa (`{ country: "ZA" }`) → age 18

**Supported Countries/Regions:**
- South Africa (ZA) → 18
- USA (US) → state-specific (AL, NE: 19; rest: 18)
- Canada (CA) → province-specific (ON, QC, MB, PE, SK, AB, YT: 18; others: 19)
- Australia (AU) → all states: 18
- Mexico (MX) → all states: 18
- ~80 other countries → 18 (default)

**Known Exceptions:**
- Korea (KR) → 19
- Kuwait (KW) → 21
- Taiwan (TW) → 20

**Note:** The timezone mapping is exhaustive (see `age-restrictions.ts` lines 360-626).

---

### Required Age Lookup

**Function:** `getRequiredAdultAge(): number`

**Flow:**
1. Call `detectUserLocation()` → `{ country, state }`
2. Pass to `getAdultAgeForCountry(country, state)`
3. Returns age (18, 19, 20, or 21)

**Example Outputs:**
- User in Johannesburg (timezone `Africa/Johannesburg`) → age 18
- User in Alabama (timezone `America/Chicago` but can't detect state reliably) → default US highest state age = 19
- User in Ontario (timezone `America/Toronto`) → age 18
- User in Tokyo → age 18 (JP = 18)
- User in Seoul → age 19 (KR = 19)

---

## UI/UX

### Loading State

```
[ Spinner ]
Loading...
```

**Purpose:** Wait for timezone detection before showing form.

---

### Verification Failure (Under 18)

**Action:** `window.location.href = REDIRECT_URL` (hard redirect to Mogen)

**No in-app message** - user is sent away entirely.

---

### Verification Success (Age OK)

**Action:** `sessionStorage.setItem(SESSION_KEY, "true"); setVerified(true);`

**Form disappears** → children rendered (site content).

---

### Exit Button

**Label:** "Exit"  
**Action:** Same redirect as age failure

**Purpose:** Allow adults who don't want to proceed to exit gracefully.

---

## Technical Details

**Constants:**
- `SESSION_KEY = "ageVerified"`
- `REDIRECT_URL = "https://web.mogen.co.za"`

**Storage:** `sessionStorage` (cleared when browser tab/window closes)

**Security:** No cookies, no server-side verification. Client-side only (acceptable for age gate, not for true authentication).

---

## Accessibility

### ✅ Compliant

- Form inputs have `<label htmlFor="dateOfBirth">`
- Input has `id="dateOfBirth"` (dynamic via `useId()`)
- Clear error messages shown inline
- Required field indicator (`*`)
- Keyboard navigable (standard HTML form)

### ⚠️ Notes

- Date picker may not be fully accessible on all browsers
- No ARIA live region for error announcements (could add)
- No "skip to content" option (age gate is a blocker by design)

---

## Testing

### Unit Tests (Recommended)

- `calculateAge()` with various DOBs
  - Today's date → age 18
  - Yesterday → age 18
  - Tomorrow → age 17 (future)
  - Leap day (Feb 29)
  - Month boundary

- `detectUserLocation()` mocked for different timezones

- `getRequiredAdultAge()` with country/state combos

### Integration Tests

1. First visit → age gate shows
2. Age verified → gate closes, sessionStorage set
3. Reload page → no gate shown (session persists)
4. Age < 18 → redirect to Mogen
5. Exit button → redirect to Mogen
6. Session cleared (close tab) → gate shows again

---

## Future Enhancements

1. **Remember verification longer:** Use `localStorage` with expiry (30 days) instead of `sessionStorage`
2. **Cookie-based backend verification:** For sensitive pages, verify with server that user passed age gate
3. **GeoIP fallback:** More accurate location detection (requires API call)
4. **A/B testing:** Different messaging or visuals
5. **Analytics:** Track gate conversion rate (how many exit vs continue)

---

## Known Limitations

1. **Client-side only:** Can be bypassed by disabling JavaScript or manipulating sessionStorage
2. **No legal guarantee:** Age gate provides "reasonable" compliance but not foolproof
3. **Timezone spoofing:** User could change system timezone to get different required age
4. **No audit trail:** No logging of who passed/failed (by design, privacy)

---

## Files

| File | Purpose |
|------|---------|
| `app/components/AgeGate.tsx` | Main component |
| `app/utils/age-utils.ts` | `calculateAge()` |
| `app/utils/age-restrictions.ts` | Location detection and age lookup tables |

---

## Related

- **Legal:** South African law regarding age-restricted content (likely Film and Publications Act)
- **Mogen:** External redirect destination for minors
- **NeonAuth:** Not used here (no authentication, just age check)

---

**Last Updated:** 2026-04-06
