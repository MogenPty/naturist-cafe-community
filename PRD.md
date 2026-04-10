# Product Requirements Document (PRD)

**Project:** Naturist Café Community Website  
**Version:** 1.0  
**Date:** 2026-04-06  
**Status:** Draft  
**Branch:** `feat/admin-v2`

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Product Vision](#product-vision)
3. [Target Audience](#target-audience)
4. [User Personas](#user-personas)
5. [Features & Requirements](#features--requirements)
6. [User Flows](#user-flows)
7. [Non-Goals](#non-goals)
8. [Success Metrics](#success-metrics)
9. [Technical Constraints](#technical-constraints)
10. [Roadmap](#roadmap)
11. [Open Questions](#open-questions)

---

## Executive Summary

The Naturist Café Community (NCC) website is the official digital presence for a South African naturist organization. The website serves both as an information hub for the public and as a management tool for administrators.

**Core Purpose:** Preserve, promote, and develop naturist culture in South Africa through digital channels.

**Current State:** The website exists as a static single-page application built with Vite/React. Content is hardcoded, with no content management system.

**Goal:** Transform into a dynamic, admin-managed website with secure authentication, full CRUD capabilities for events and board members, and a membership application system.

---

## Product Vision

**Mission Statement:**  
To provide a centralized, secure, and maintainable digital platform that connects the naturist community, promotes events and activities, and streamlines administrative operations.

**Vision:**
- A modern, fast, accessible website that serves both public and admin users
- Self-service content management for administrators
- Secure, role-based access control
- Scalable architecture that can grow with the community
- Mobile-first, inclusive design

**Values:**
- **Privacy & Security:** User data protected, GDPR-style compliance
- **Accessibility:** WCAG 2.1 AA compliant
- **Inclusivity:** Welcoming to all ages (18+) and backgrounds
- **Transparency:** Clear communication about community guidelines

---

## Target Audience

### Primary Segments

1. **General Public / Prospective Members**
   - Adults (18+) interested in naturism in South Africa
   - People curious about NCC and its activities
   - Location: Primarily South Africa, but internationally accessible

2. **Current Members**
   - Active naturist community members
   - People seeking event information
   - Want to engage with board members

3. **Administrators / Board Members**
   - NCC leadership team
   - Need to manage events, board information, and content
   - Technical proficiency: varies (from basic to intermediate)

4. **Researchers / Media**
   - People studying naturism culture
   - Journalists looking for information about NCC
   - May access Constitution and public documents

---

## User Personas

### Persona 1: Prospective Member (Themba)

**Demographics:**
- Age: 28
- Location: Johannesburg, South Africa
- Occupation: Software developer
- Tech comfort: High

**Goals:**
- Understand what NCC is and what it stands for
- Learn about upcoming events
- Find out how to join the community
- See who runs the organization

**Pain Points:**
- Unclear about age verification process
- Wants to know events in advance to plan
- Needs reassurance about privacy and safety
- May not want to create an account just to browse

**Behaviors:**
- Browses on mobile phone
- Reads Constitution PDF
- Checks "Markets & Walks" section for activities
- Might fill out Join Us form

---

### Persona 2: Current Member (Susan)

**Demographics:**
- Age: 45
- Location: Cape Town
- Occupation: Teacher
- Tech comfort: Medium

**Goals:**
- Check upcoming event calendar
- See board member contacts
- Find information about naturism philosophy
- Update personal details (future)

**Pain Points:**
- Wants easy login (not too many steps)
- Needs events to be clearly dated and located
- May want to contact board members with questions
- Prefers familiar, consistent navigation

**Behaviors:**
- Visits site weekly
- Checks "Markets & Walks" for events
- May read Constitution occasionally
- Could join events through Formspree or email

---

### Persona 3: Administrator (Buks)

**Demographics:**
- Age: 55
- Location: Johannesburg
- Occupation: Business owner, NCC Director
- Tech comfort: Medium (comfortable with web interfaces but not code)

**Goals:**
- Add new events quickly and easily
- Update board member information
- Ensure website content is current
- Control who has admin access
- Maintain security and privacy

**Pain Points:**
- Needs simple, intuitive admin interface
- Wants to avoid manual deployments or code changes
- Needs clear feedback on form submissions
- Must manage multiple responsibilities efficiently

**Behaviors:**
- Logs in from desktop computer
- Uses admin panel several times per month
- Expects data to persist reliably
- May need to update events on mobile occasionally

---

### Persona 4: Site Visitor / Researcher (Linda)

**Demographics:**
- Age: 35
- Location: International (e.g., Europe)
- Occupation: Academic researcher
- Tech comfort: High

**Goals:**
- Understand NCC's constitution and governance
- Learn about board structure
- Gather information for research on naturist organizations
- Contact NCC if needed

**Pain Points:**
- Needs Constitutional documents easily accessible
- Wants clear organizational structure
- May not want to create an account
- Needs information in English

**Behaviors:**
- Browses on laptop
- Reads Constitution PDF thoroughly
- Studies Board members section
- May bookmark for future reference

---

## Features & Requirements

### M1: Public Website (Baseline)

**Epic:** Provide static informational content to all visitors

#### Feature 1.1: Homepage with Sections

**User Story:** As a visitor, I want to see an overview of NCC so I can understand what the community is about.

**Requirements:**
- Hero section with tagline and lifestyle image
- Introduction/Mission statement
- Constitution section (download PDF)
- Events section ("Markets & Walks") - coming soon placeholder or DB-backed
- Board members showcase - coming soon placeholder or DB-backed
- Join / Call-to-action section
- Login section (prominent)

**Acceptance Criteria:**
- [ ] All 6 sections render correctly on desktop and mobile
- [ ] Smooth scroll navigation works
- [ ] PDF link for Constitution is functional
- [ ] Age gate appears before content (if not verified)
- [ ] Responsive design matches existing design

**Priority:** Must Have (already implemented)

---

#### Feature 1.2: Age Verification Gate

**User Story:** As a visitor, I must verify I'm 18+ to access the site, complying with legal requirements.

**Requirements:**
- Modal overlay blocks content until age verified
- Date of birth input (required)
- Auto-detect location to set required age (currently 18 for SA)
- If age < 18, redirect to external site (Mogen)
- If age ≥ 18, set session flag and show content
- "Exit" button redirects to external site

**Acceptance Criteria:**
- [ ] Age gate shows on first visit (no session flag)
- [ ] Valid DOB (age ≥ 18) grants access
- [ ] Invalid DOB (age < 18) redirects away
- [ ] Session persists across page reloads (sessionStorage)
- [ ] Exit button works

**Priority:** Must Have (already implemented, needs testing)

---

#### Feature 1.3: Responsive Design

**User Story:** As a visitor, I want the site to work on my mobile phone and desktop.

**Requirements:**
- Mobile-first design
- Breakpoints: small (mobile), medium (tablet), large (desktop)
- Navigation adapts to screen size
- Images scale appropriately
- Forms usable on touch devices

**Acceptance Criteria:**
- [ ] Site passes mobile responsiveness audit
- [ ] No horizontal overflow on small screens
- [ ] Touch targets are at least 44×44px
- [ ] Navigation collapses appropriately

**Priority:** Must Have (partially done, needs verification)

---

### M2: Authentication & User Management

**Epic:** Secure user authentication and role-based access control

#### Feature 2.1: User Sign-Up

**User Story:** As a prospective member, I want to create an account so I can log in and potentially become a member.

**Requirements:**
- Email/password sign-up via NeonAuth
- Email verification (optional, based on NeonAuth config)
- Insert profile record into `users` table (deprecated) or just use NeonAuth
- Redirect to sign-in page after sign-up

**Acceptance Criteria:**
- [ ] Sign-up form accepts email, name, password
- [ ] Account created in `neon_auth.user` table
- [ ] Password stored as hash (NeonAuth handles)
- [ ] Success message shown
- [ ] User can immediately sign in

**Priority:** Must Have (implemented but `users` table redundant)

---

#### Feature 2.2: User Sign-In

**User Story:** As a member, I want to sign in so I can access my account and admin features if applicable.

**Requirements:**
- Email/password sign-in via NeonAuth
- Session cookie set on successful auth
- Redirect based on role:
  - Admin → `/admin`
  - Non-admin → `/profile`
- Error messages for invalid credentials

**Acceptance Criteria:**
- [ ] Sign-in form works with correct credentials
- [ ] Invalid credentials show clear error
- [ ] Session persists across page navigations
- [ ] Role-based redirect functions correctly
- [ ] Sign-out destroys session

**Priority:** Must Have (implemented, needs testing)

---

#### Feature 2.3: Protected Admin Routes

**User Story:** As an admin, I want only authorized admins to access `/admin` section.

**Requirements:**
- Check user session on admin routes
- Verify user exists in `admins` table
- Redirect:
  - Unauthenticated → `/auth/sign-in?callbackUrl=/admin`
  - Authenticated non-admin → `/profile?error=forbidden` (with toast)
- Show error toast on forbidden access

**Acceptance Criteria:**
- [ ] Non-authenticated user redirected to sign-in
- [ ] Non-admin authenticated user redirected to profile with toast
- [ ] Admin user can access all admin routes
- [ ] Toast clears from URL after showing
- [ ] Admin layout shows admin name/email

**Priority:** Must Have (implemented, needs testing)

---

#### Feature 2.4: User Profile Page

**User Story:** As a logged-in non-admin member, I want to see my profile information.

**Requirements:**
- Display user name and email from session
- Show message explaining admin privileges required for panel
- Provide sign-out button
- Clean, simple design

**Acceptance Criteria:**
- [ ] Page accessible to any authenticated user
- [ ] Shows user's name and email
- [ ] Sign-out button works
- [ ] No admin-specific content shown

**Priority:** Should Have (implemented)

---

### M3: Admin Panel

**Epic:** Provide CRUD interface for managing events and board members

#### Feature 3.1: Admin Dashboard

**User Story:** As an admin, I want an overview dashboard with quick stats and navigation.

**Requirements:*
- Welcome message showing admin's name/email
- Quick stats: total events, active board members, upcoming events
- Navigation cards/links to Events and Board Members sections
- Clean, professional admin UI (different from public site)

**Acceptance Criteria:**
- [ ] Dashboard loads only for admins
- [ ] Stats calculated from database
- [ ] Navigation links to CRUD pages work
- [ ] Logout button functional
- [ ] Design consistent with admin theme

**Priority:** Should Have (implemented, minimal)

---

#### Feature 3.2: Event Management (CRUD)

**User Story:** As an admin, I want to create, edit, and delete events so members can see upcoming activities.

**Requirements:**

**Create Event:**
- Form with fields: title, description, type (walk/market/workshop), start/end date & time, location, recurring options
- Validation: required fields, valid dates (end after start)
- Submit creates record in `events` table with `createdBy` = admin ID
- Success → revalidate home page, redirect to events list

**Read Events:**
- Paginated table/list of all events
- Sortable by date, title
- Filterable by type, date range (optional)
- Show: title, type, dates, location, status (active/past)

**Update Event:**
- Pre-filled form with existing event data
- Same validation as create
- Updates `updatedAt` timestamp

**Delete Event:**
- Confirmation modal/dialog
- Soft delete (mark inactive) or hard delete
- Remove from displayed list after deletion

**Acceptance Criteria:**
- [ ] Can create event with all required fields
- [ ] Created event appears on homepage
- [ ] Can edit existing event
- [ ] Changes reflected on homepage
- [ ] Can delete event with confirmation
- [ ] All actions require admin auth
- [ ] Validation errors shown clearly
- [ ] Database constraints enforced (no orphaned records)

**Priority:** Must Have (implemented, needs testing)

---

#### Feature 3.3: Board Member Management (CRUD)

**User Story:** As an admin, I want to manage the board member roster so the community can see who leads the organization.

**Requirements:**

**Create Board Member:**
- Form: name, nickname (optional), role (Director/Councillor), sortId (display order), yearsInNaturism, otherOrganizations, communityCouncil (checkbox), active (checkbox), profileImageUrl
- Validation: required fields (name, role, sortId, yearsInNaturism)
- `otherOrganizations` stored as JSON array

**Read Board Members:**
- Table showing: name, nickname, role, years, organizations, status (active/inactive)
- Sorted by `sortId`
- Filterable by role, active status (optional)

**Update Board Member:**
- Edit all fields except ID and created timestamps
- Update `updatedAt`

**Delete Board Member:**
- Confirmation required
- Optional: keep historical record (soft delete) or remove (hard delete)

**Acceptance Criteria:**
- [ ] Add new board member with all details
- [ ] Members displayed on public Board page
- [ ] Edit member updates public display
- [ ] Deactivate member hides from public (if active flag used)
- [ ] Sort order respected on public page

**Priority:** Must Have (implemented, needs testing)

---

#### Feature 3.4: Admin Navigation & Layout

**User Story:** As an admin, I want a consistent navigation and layout across all admin pages.

**Requirements:**
- Sidebar with links: Dashboard, Events, Board Members
- Show current admin's email at bottom of sidebar
- Logout button in sidebar
- Content area with page title and main content
- Responsive (collapsible sidebar on mobile? optional)

**Acceptance Criteria:**
- [ ] Sidebar appears on all admin pages
- [ ] Navigation links work correctly
- [ ] Admin email displayed
- [ ] Logout button ends session and redirects to login
- [ ] Consistent styling across pages

**Priority:** Should Have (implemented)

---

### M4: Public Content Integration

**Epic:** Connect admin-managed data to public-facing pages

#### Feature 4.1: Dynamic Events Display

**User Story:** As a visitor, I want to see upcoming events on the homepage.

**Requirements:**
- Fetch events from database (only future events, sorted by `startDate`)
- If no events, show placeholder or "No upcoming events"
- Show event type icons (walk, market, workshop)
- Clickable to view details (optional modal)
- Refresh automatically when new event added

**Acceptance Criteria:**
- [ ] Events fetched from database on page load
- [ ] Only events with `startDate` > today shown
- [ ] Events displayed with title, icon, date, location
- [ ] Admin can update homepage by modifying events
- [ ] Fallback message if no events exist

**Priority:** Must Have (partially implemented, needs verification)

---

#### Feature 4.2: Dynamic Board Members Display

**User Story:** As a visitor, I want to see the current board members on the Board page.

**Requirements:**
- Fetch active board members from database
- Sort by `sortId` (ascending)
- Display: photo (if available), name, nickname, role, yearsInNaturism, otherOrganizations
- Show only members where `active = true` (optional: show all but gray out inactive)

**Acceptance Criteria:**
- [ ] Board members loaded from `board_members` table
- [ ] Display order follows `sortId`
- [ ] All member details shown as per schema
- [ ] Updates reflect immediately after admin edit
- [ ] Placeholder shown if no members

**Priority:** Must Have (partially implemented, needs verification)

---

### M5: Membership Application (Future)

**Epic:** Allow prospective members to submit applications online

#### Feature 5.1: Membership Application Form

**User Story:** As a prospective member, I want to apply for membership online.

**Requirements:**
- Multi-field form: personal info, contact, experience, interests
- Validation: age (≥18), required fields
- Submit to Formspree or backend storage
- Success message after submission
- Application stored securely (encrypted if sensitive data)

**Status:** Currently disabled with "Coming Soon" button  
**Priority:** Could Have (not yet needed)

---

## User Flows

### Public Visitor Flow

```
1. Visit homepage
   └─→ Age gate appears (if first visit)
       ├─→ Enter DOB
       │   ├─→ Age < 18 → Redirect to Mogen
       │   └─→ Age ≥ 18 → Show homepage
       └─→ Exit → Redirect to Mogen

2. Browse content
   ├─→ Read Constitution (download PDF)
   ├─→ View upcoming events (from数据库)
   └─→ View board members (from数据库)

3. Join interest
   └─→ Click "Join Us" or "Sign Up"
       ├─→ New member: Sign up form → create account
       └─→ Existing member: Sign in → goes to profile or admin

4. Sign in
   └─→ Email/password
       ├─→ Success → admin → /admin, member → /profile
       └─→ Failure → Error message
```

---

### Admin Management Flow

```
1. Sign in at /auth/sign-in
   └─→ Successful auth
       ├─→ User in admins table → Redirect to /admin ✓
       └─→ User NOT in admins → Redirect to /profile with error toast

2. Access admin panel
   └─→ /admin/dashboard
       ├─→ View stats
       ├─→ Navigate to Events or Board members
       └─→ Logout

3. Manage Events
   └─→ /admin/events
       ├─→ See list of all events
       ├─→ Click "New Event" → fill form → submit
       │   └─→ Valid? → Create → Back to list ✓
       │       Invalid? → Show errors
       ├─→ Click "Edit" on event → edit form → save
       │   └─→ Update in database ✓
       └─→ Click "Delete" → confirm → delete ✓

4. Manage Board Members
   └─→ /admin/board
       ├─→ See list of all board members
       ├─→ Add new member
       ├─→ Edit existing member
       └─→ Remove member

5. Changes reflected on public site immediately
   └─→ Homepage events update
   └─→ Board page updates
```

---

### Authentication Flow

```
┌─────────────┐
│ Unauthenticated │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│ Access /admin               │
│ or /profile                 │
└─────────────┬───────────────┘
              │
              ▼
┌─────────────────────────────┐
│ getCurrentUserSession()     │
│ (or requireAdmin())         │
└─────────────┬───────────────┘
              │
    ┌─────────┴─────────┐
    │                   │
    ▼                   ▼
┌──────────┐    ┌──────────────────┐
│ Has      │    │ No session       │
│ session? │    │                  │
└────┬─────┘    └────────┬─────────┘
     │                  │
     ▼                  ▼
┌──────────┐    ┌──────────────────┐
│ YES      │    │ redirect to      │
│          │    │ /auth/sign-in    │
│ continue │    │                  │
│ flow     │    └──────────────────┘
└────┬─────┘
     │
     ▼
┌─────────────────────────────┐
│ /admin: requireAdmin()      │
│   - Query admins table      │
│   - If user in admins ✓     │
│   - If not → /profile?error │
└─────────────────────────────┘
```

---

## Non-Goals

### Out of Scope (Explicitly Not Included)

1. **Member portal with personal data editing**
   - Members cannot edit their own profiles yet
   - Future: self-service profile updates

2. **Event registration system**
   - No RSVP or ticketing
   - Events are informational only

3. **Messaging / Communication**
   - No internal messaging
   - No newsletter system (could integrate external service later)

4. **Multi-language support**
   - English only (South African context, but not multilingual)

5. **Mobile app**
   - Website only, PWA not planned

6. **Advanced analytics**
   - Basic Vercel analytics only
   - No custom event tracking

7. **E-commerce**
   - No payments, donations, or purchases

8. **Fully automated admin onboarding**
   - Admin privileges currently require manual DB insert
   - Future: self-service admin promotion workflow

9. **Forum / Discussion boards**
   - No community forums (Discord/WhatsApp integration possible later)

10. **Content versioning / audit log**
    - No history tracking for content changes

---

## Success Metrics

### Technical Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Build time | < 2 minutes | `pnpm build` duration |
| Lighthouse score | > 90/100 | Chrome DevTools |
| TypeScript errors | 0 | `npx tsc --noEmit` |
| Test coverage | N/A (no tests yet) | Future: `vitest` or `jest` |
| Uptime | 99.9% | Vercel SLA |

### User Experience Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint | < 1.5s | Lighthouse |
| Time to Interactive | < 3s | Lighthouse |
| Accessibility score | > 95 | Lighthouse / WAVE |
| Mobile-friendly | Pass | Google Mobile-Friendly Test |

### Business / Community Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Admin adoption | > 80% of board use panel | Manual tracking |
| Time to add event | < 2 minutes | Admin feedback |
| Sign-up conversion | > 60% | NeonAuth dashboard |
| Support requests | < 1/week | Email tracking |

---

## Technical Constraints

### Platform Constraints

- **Hosting:** Vercel (standard Node.js, NOT Edge runtime)
- **Database:** Neon Postgres (serverless)
- **Auth:** NeonAuth (cannot change without major rewrite)
- **Framework:** Next.js 16 (App Router only)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 (cannot downgrade)

### Code Quality Standards

- ✅ Zero TypeScript compiler errors
- ✅ ESLint passes (no `any` types where avoidable)
- ✅ Server Components by default, Client Components only when needed
- ✅ No console.log in production code (except debug)
- ✅ No plaintext passwords anywhere
- ✅ Proper error handling (no uncaught exceptions)

---

## Roadmap

### Phase 1: Foundation & Security (Completed ✅)

- [x] Migrate from Vite to Next.js
- [x] Implement NeonAuth authentication
- [x] Build admin panel with CRUD
- [x] Fix security vulnerabilities (passwords, logs)
- [x] Accessibility fixes (form labels, unique IDs)
- [x] Age gate implementation
- [x] Role-based authorization

**Status:** ✅ Complete as of 2026-04-06

---

### Phase 2: Polish & Reliability (Current Sprint)

- [ ] Comprehensive testing (auth, CRUD, public pages)
- [ ] Switch to TCP driver (`@neondatabase/driver`)
- [ ] Remove deprecated `users` table (pending migration)
- [ ] Database connection pooling
- [ ] Disable/clean up `JoinUs.tsx` form
- [ ] Add proper error boundaries
- [ ] Implement loading states
- [ ] Run full accessibility audit
- [ ] Generate final Drizzle migrations and apply to production

---

### Phase 3: Documentation & Ops (Next)

- [ ] Write README with setup/deploy instructions
- [ ] Document admin onboarding process
- [ ] Create seed script for initial data
- [ ] Set up GitHub Actions (lint, type-check, build)
- [ ] Add monitoring (Sentry)
- [ ] Configure analytics (Vercel Analytics)
- [ ] Create publishing guide for admins

---

### Phase 4: Feature Enhancements (Backlog)

#### Epic: Public Features
- [ ] Search functionality
- [ ] Event calendar view (full calendar integration)
- [ ] Event categories / tagging
- [ ] Past events archive
- [ ] Board member bios with full details modal

#### Epic: Admin Features
- [ ] Bulk operations (delete multiple events)
- [ ] Image upload for board members
- [ ] Rich text editor for event descriptions
- [ ] Draft / publish workflow
- [ ] Admin activity audit log
- [ ] Role-based permissions (superadmin, admin, editor)

#### Epic: Membership
- [ ] Enable membership application form (integrate Formspree or backend)
- [ ] Application status tracking
- [ ] Admin review workflow for applications
- [ ] Welcome email automation

---

### Phase 5: Performance & Scale (Future)

- [ ] Implement ISR for static pages with periodic revalidation
- [ ] Database query optimization (add indexes)
- [ ] Image optimization with `next/image`
- [ ] Code splitting and lazy loading
- [ ] CDN configuration review
- [ ] Load testing

---

## Open Questions

### Decisions Needed

1. **`users` table deprecation:** Should we remove the `users` table entirely, or keep it for future profile extensions?
   - **Recommended:** Remove after verifying no dependencies
   - **Impact:** Migration required, affects any queries to `users`

2. **JoinUs form:** Enable now or wait?
   - **Option A:** Enable with Formspree (current disabled state)
   - **Option B:** Remove "Apply Now" button entirely until ready
   - **Option C:** Replace with email contact link

3. **Event recurring pattern:** Should we support complex recurrence (e.g., "every 2nd Tuesday")?
   - Current: JSONB storage for flexibility
   - Need: UI for configuring recurrence (calendar picker?)

4. **Admin onboarding:** How do we initially create the first admin user?
   - Manual SQL insert into `admins` table (simplest)
   - Seed script that promotes existing NeonAuth user
   - Admin self-promotion workflow (with approval)

5. **Design system:** Invest in shared component library?
   - Current: Ad-hoc Tailwind classes
   - Future: Extract Button, Input, Card, Modal components
   - Effort: Medium, impact: high for consistency

6. **Audit logging:** Track who changed what and when?
   - Separate `audit_logs` table
   - Log all admin actions (create/update/delete)
   - Who, what, when, old/new values
   - GDPR compliance benefit

---

## Appendix

### Feature Index (for detailed specs)

Each major feature will have its own markdown file in the `features/` directory:

1. `01-public-website.md` - Homepage, sections, navigation
2. `02-age-gate.md` - Age verification implementation
3. `03-membership-application.md` - JoinUs form
4. `04-authentication.md` - Sign up, sign in, session management
5. `05-admin-panel.md` - Dashboard, event management, board member management
6. `06-user-profiles.md` - Profile page for logged-in members
7. `07-database-schema.md` - Detailed schema, migrations, seed data
8. `08-security-model.md` - AuthZ, AuthN, data protection

---

**Approvals:**

_Product Owner:_ _________________ Date: _________  
_Technical Lead:_ _________________ Date: _________  
_Stakeholders:_ _________________ Date: _________

---

**Document Changelog**

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0-draft | 2026-04-06 | Initial PRD based on existing codebase | Claude Code |
