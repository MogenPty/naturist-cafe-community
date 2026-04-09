# Features Index

This directory contains detailed specifications for each feature of the NCC website.

**Structure:** Files are numbered by epic/phase order.

---

## Core Features

### 01. Public Website
**Epic:** M1 - Public Website  
**Status:** ✅ Implemented  
**File:** [`01-public-website.md`](./01-public-website.md)

Sections: Hero, Constitution, Markets & Walks, Board, Join Us, Login. The main landing page visible to all visitors.

---

### 02. Age Gate
**Epic:** M1 - Public Website  
**Status:** ✅ Implemented  
**File:** [`02-age-gate.md`](./02-age-gate.md)

Age verification gate (18+) with location-based age detection and session persistence.

---

### 03. Membership Application
**Epic:** M5 - Membership Application (Future)  
**Status:** 🚧 Placeholder (Disabled)  
**File:** [`03-membership-application.md`](./03-membership-application.md)

Online membership application form. Currently disabled with "Coming Soon" message. Integration options: Formspree, backend storage, or email link.

---

### 04. Authentication & Authorization
**Epic:** M2 - Authentication  
**Status:** ✅ Implemented  
**File:** [`04-authentication.md`](./04-authentication.md)

Full auth system using NeonAuth: sign up, sign in, session management, role-based access control (admin vs member).

---

### 05. Admin Panel
**Epic:** M3 - Admin Panel  
**Status:** ✅ Implemented (Basic CRUD)  
**File:** [`05-admin-panel.md`](./05-admin-panel.md)

Secure admin interface with CRUD operations for events and board members. Role-protected, integrated with database.

---

### 06. User Profiles
**Epic:** M2 - Authentication  
**Status:** ✅ Implemented (Basic)  
**File:** [`06-user-profiles.md`](./06-user-profiles.md)

Profile page for authenticated non-admin users. Shows basic info and sign-out. Could expand to full settings hub.

---

## Planning Documents

These files provide higher-level context:

- **PRD.md** - Product Requirements Document (complete product vision, personas, roadmap)
- **ARCHITECTURE.md** - Technical architecture, database design, deployment guide
- **ADMIN_PANEL_PLAN.md** - Original admin panel implementation plan (now complete)
- **ADMIN_CLEAN-UP_PLAN.md** - Code quality improvements and security fixes (mostly complete)
- **NEXTJS_MIGRATION_PLAN.md** - Vite → Next.js migration guide (completed)

---

## Status Legend

| Icon | Status | Meaning |
|------|--------|---------|
| ✅ | Implemented | Feature is built, tested, and deployed |
| 🚧 | In Progress | Partially done, work remaining |
| 📋 | Planned | Specified but not started |
| ❌ | Deprecated | Removed or no longer needed |
| ⏸️ | On Hold | Blocked or deferred |

---

## How to Use This Directory

Each feature file contains:

1. **Overview** - What the feature does
2. **User stories** - From user perspective
3. **Requirements** - Functional and non-functional
4. **Implementation** - Technical details, code structure
5. **UI/UX** - Design patterns, components
6. **Testing** - Acceptance criteria and test cases
7. **Future enhancements** - Backlog items
8. **Related files** - Where to find code
9. **Troubleshooting** - Known issues and fixes

Use these specs for:
- Understanding existing features
- Planning enhancements
- Onboarding new developers
- Creating tasks/epics/sprints

---

## Maintenance

When a feature changes:

1. Update the corresponding `features/*.md` file
2. Update `PRD.md` if product scope changes
3. Update `ARCHITECTURE.md` if technical design changes
4. Mark status clearly with date and author of changes

---

**Last Updated:** 2026-04-06
