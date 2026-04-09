# Feature 01: Public Website

**Epic:** M1 - Public Website (Baseline)  
**Priority:** Must Have  
**Status:** ✅ Implemented  
**Related:** Homepage, Sections, Navigation  
**Docs:** See PRD.md for full context

---

## Overview

The public website serves as the main entry point for all visitors. It's a single-page scrolling application with multiple sections providing information about the Naturist Café Community.

---

## Sections

### 1. Hero Section (`app/components/Hero.tsx`)

**Purpose:** Welcoming introduction with tagline and lifestyle imagery.

**Content:**
- Title: "Naturist Café"
- Tagline: "Preserving, promoting, and developing the culture and community of naturism."
- Background image or gradient
- Call-to-action: "Join Us" or "Learn More" scroll link

**Technical:**
- Client component (no state, could be server)
- Full-width section with background styling

---

### 2. Constitution Section (`app/components/Constitution.tsx`)

**Purpose:** Provide access to the official community constitution.

**Content:**
- Heading: "Our Constitution"
- Summary of community values
- Download link to `community_constitution.pdf` (in `/public/`)

**Acceptance Criteria:**
- [x] PDF downloadable
- [x] Link works on all devices

---

### 3. Markets & Walks Section (`app/components/MarketsWalks.tsx`)

**Purpose:** Show upcoming community events.

**Current Implementation:**
- Hardcoded events array (3 events)
- Each event: title, description, date, location, type (walk/market/workshop)
- Icons for each event type

**Future (DB-backed):**
- Fetch events from `events` table
- Filter: only future events (`startDate > NOW()`)
- Show: up to 3 upcoming events
- Fallback to hardcoded if DB empty

**Data Model:**
```ts
{
  id: string;
  title: string;
  description: string;
  type: "walk" | "market" | "workshop";
  startDate: Date;
  endDate: Date;
  startTime?: Date; // time only
  endTime?: Date;
  location: string;
  recurring?: boolean;
  recurringPattern?: object;
}
```

---

### 4. Board Section (`app/components/Board.tsx`)

**Purpose:** Introduce current board members to the community.

**Current Implementation:**
- Hardcoded board members array (7 members)
- Each member: name, nickname, role, orgs, image (placeholder)

**Future (DB-backed):**
- Fetch from `board_members` table where `active = true`
- Order by `sortId`
- Display: avatar (from Cloudinary or placeholder), name, nickname, role, org badge

**Data Model:**
```ts
{
  id: string;
  name: string;
  nickname?: string;
  role: "Director" | "Councillor";
  sortId: number;
  yearsInNaturism: number;
  otherOrganizations: string[];
  communityCouncil: boolean;
  active: boolean;
  profileImageUrl?: string;
}
```

---

### 5. Join Us Section (`app/components/JoinUs.tsx`)

**Purpose:** Capture membership interest.

**Current:**
- Form with: first name, last name, nickname, email, DOB, gender, location, experience, interests
- Button: "Submit Application" (disabled, shows "Coming Soon")
- Form validates age ≥ 18 locally
- Data NOT currently submitted anywhere

**Future Options:**
- Option A: Connect to Formspree (already have Formspree integration)
- Option B: Submit to backend (create `applications` table)
- Option C: Link to sign-up page instead

**Decision Pending:** See PRD.md for options.

---

### 6. Login Section (`app/components/Login.tsx`)

**Purpose:** Provide member login access point.

**Current:**
- Email + password form
- "Keep me signed in" checkbox
- "Reset password" link (disabled)
- "Sign In" button disabled (under construction)
- Placeholder note: "Coming Soon, Under Construction"

**Future:**
- Enable form and connect to `signInWithEmail` server action
- OR remove form entirely and redirect to `/auth/sign-in` page

**Status:** Placeholder only. Real login happens at `/auth/sign-in`.

---

## Navigation

### Header (`app/components/Header.tsx`)

**Structure:**
- Logo/brand ("Naturist Café") left-aligned
- Navigation links right-aligned:
  - Home (anchor link #)
  - Constitution (anchor link #constitution)
  - Markets & Walks (anchor link #markets-walks)
  - Board (anchor link #board)
  - Join (anchor link #join)
  - Login (anchor link #login)

**Behavior:**
- Smooth scroll to sections (SPA style)
- Mobile menu toggle (hamburger) on small screens
- Active section highlighting (optional future)

**Mobile:**
- Hamburger icon opens overlay menu
- Same links as desktop

---

## Age Gate (`app/components/AgeGate.tsx`)

**Overview:** See separate feature document `02-age-gate.md`.

---

## Responsive Design

**Breakpoints:**
- Mobile: < 768px (assumed)
- Tablet: 768px - 1024px
- Desktop: > 1024px

**Tailwind Classes Used:**
- Grid: `md:grid-cols-2`, `lg:grid-cols-3`
- Spacing: `p-8`, `py-16`, `gap-8`, etc.
- Typography: `text-3xl`, `md:text-4xl`, `text-sm`, `md:text-base`

**Verification Needed:**
- [ ] Test on actual mobile devices
- [ ] Check portrait/landscape orientations
- [ ] Verify touch target sizes (≥ 44×44px)

---

## Styling

### Color Palette

Defined in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      charcoal: { ... },
      cream: { ... },
      nature: { ... },
      earth: { ... },
      brand: { gold: ... },
    },
  },
}
```

**Usage in components:**
- Backgrounds: `bg-charcoal-700`, `bg-earth-50`, `bg-white`
- Text: `text-cream-100`, `text-gray-900`, `text-nature-600`
- Borders: `border-cream-200/10`

---

## Interactivity

### Current Interactions

1. **Smooth scroll navigation** - `document.getElementById().scrollIntoView({ behavior: 'smooth' })`
2. **Age gate** - DOB validation, session storage, redirect
3. **Mobile menu toggle** - State: `isMenuOpen`
4. **Form inputs** - State management in JoinUs and Login
5. **Toast notifications** - From URL params (`?error=`) via `ErrorToastHandler`

### Missing Interactions

- Event filtering/searching (none planned)
- Board member modal with full details (optional)
- Image carousel/slider (none)
- Animations on scroll (none)

---

## Performance Considerations

**Current Optimizations:**
- Static page where possible
- Images from Cloudinary CDN
- Tailwind CSS purged in production

**Potential Improvements:**
- Use `next/image` for Cloudinary images
- Lazy load sections below the fold
- Preload critical assets
- Code split per section (if using dynamic imports)

---

## SEO

**Current Status:** Basic

- `app/layout.tsx` defines `metadata` (title, description)
- Semantic HTML: `<section>`, `<h1>`-`<h4>`, `<nav>`
- No structured data (JSON-LD) yet
- No Open Graph tags (images share as text only)

**Recommendations:**
- Add Open Graph (`og:title`, `og:description`, `og:image`)
- Add Twitter Card meta tags
- Add organization schema (JSON-LD)
- Add event schema for events (when DB-backed)
- Add person schema for board members

---

## Accessibility

**Current Status:** Mostly accessible, some improvements made.

### ✅ Compliant

- Color contrast ratios meet WCAG AA (verified on main pages)
- Keyboard navigation works (native HTML)
- Form labels associated with inputs via `id`/`htmlFor` (using `useId()`)
- Alt text on images (needs verification)
- Heading hierarchy logical (h1 → h2 → h3 → h4)

### ⚠️ Needs Review

- **Focus management:** Age gate traps focus? (unknown)
- **Skip links:** Not implemented (can skip to main content)
- **ARIA labels:** Some icons missing `aria-label`
- **Error announcements:** Form validation errors should be announced to screen readers
- **Toast notifications:** Need `aria-live` region (check `sonner` defaults)

---

## Testing Checklist

### Functional

- [ ] Homepage loads without errors
- [ ] All sections render (Hero, Constitution, Markets & Walks, Board, Join, Login)
- [ ] Smooth scroll navigation works on desktop and mobile
- [ ] Age gate appears and functions correctly
- [ ] Mobile menu toggles open/close
- [ ] Constitution PDF downloads
- [ ] No broken internal links

### Responsive

- [ ] Desktop (≥1024px): All sections display properly
- [ ] Tablet (768-1024px): Grid columns adjust correctly
- [ ] Mobile (<768px): Single column layouts, hamburger menu works
- [ ] No horizontal overflow on any screen size

### Performance

- [ ] Lighthouse score > 90
- [ ] All images load (Cloudinary CDN accessible)
- [ ] No layout shifts (CLS < 0.1)

### Accessibility

- [ ] All form inputs have labels
- [ ] Buttons have discernible text
- [ ] Color contrast passes AA
- [ ] Keyboard navigation works
- [ ] Screen reader announcements for toasts (verify)

---

## Future Enhancements

1. **Full DB integration:** Replace hardcoded events/board with live DB queries
2. **Search bar:** Allow searching events and board members
3. **Event detail page:** Click event to see full description
4. **Board member profile modal:** Click member for full bio
5. **Newsletter signup:** Email capture form
6. **Social media links:** Add icons linking to Facebook, Instagram, etc.
7. **Multilingual support:** English/Afrikaans toggle (future consideration)

---

## Related Files

- `app/page.tsx` - Main homepage component
- `app/components/Header.tsx`
- `app/components/Hero.tsx`
- `app/components/Constitution.tsx`
- `app/components/MarketsWalks.tsx`
- `app/components/Board.tsx`
- `app/components/JoinUs.tsx`
- `app/components/Login.tsx`
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles

---

**Last Updated:** 2026-04-06
