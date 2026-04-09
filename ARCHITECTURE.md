# Architecture Documentation

**Project:** Naturist Café Community (NCC) Website  
**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, NeonDB, NeonAuth  
**Last Updated:** 2026-04-06  
**Branch:** `feat/admin-v2`

---

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [System Architecture](#system-architecture)
4. [Database Design](#database-design)
5. [Authentication & Authorization](#authentication--authorization)
6. [Frontend Architecture](#frontend-architecture)
7. [API & Data Flow](#api--data-flow)
8. [Deployment](#deployment)
9. [Security Considerations](#security-considerations)
10. [Future Improvements](#future-improvements)

---

## Overview

The NCC Website is a modern, full-stack web application built with Next.js App Router. It serves as the official online presence for the Naturist Café Community, providing:

- Public information about the community, events, and board members
- Age verification gate (18+ requirement)
- Membership application (coming soon)
- Admin panel for content management (CRUD operations)
- Secure authentication via NeonAuth

### Key Characteristics

- **Framework:** Next.js 16 with React 19 and TypeScript
- **Database:** Neon Postgres (serverless) with Drizzle ORM
- **Auth:** NeonAuth (`@neondatabase/auth/next/server`)
- **Styling:** Tailwind CSS v4 + custom CSS utilities
- **Deployment:** Vercel (standard Node.js runtime)
- **Architecture:** Monorepo (single Next.js app)

---

## Tech Stack

### Core Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | ^16.2.2 | React framework with App Router |
| `react` | ^19.2.4 | UI library |
| `react-dom` | ^19.2.4 | React DOM renderer |
| `typescript` | ~5.8.3 | Type safety |
| `tailwindcss` | ^4.1.13 | Utility-first CSS |
| `drizzle-orm` | ^0.45.2 | Type-safe ORM |
| `@neondatabase/auth` | 0.2.0-beta.1 | Authentication |

### Database Drivers

| Package | Purpose | Status |
|---------|---------|--------|
| `@neondatabase/serverless` | HTTP-based Neon driver | **Currently used** (⚠️ concurrency issues in dev) |
| `@neondatabase/driver` | TCP-based Neon driver | **Recommended** (not yet switched) |

> **Note:** The HTTP driver (`@neondatabase/serverless`) works well on Vercel Edge but has concurrency issues in local development with Fast Refresh. The TCP driver (`@neondatabase/driver`) is recommended for Node.js environments and provides proper connection pooling.

### UI & Utilities

- `lucide-react` - Icon library
- `sonner` - Toast notifications
- `clsx` + `tailwind-merge` - Class name utilities
- `date-fns` - Date formatting
- `react-big-calendar` - Calendar component (used in admin)

### Development Tools

- `drizzle-kit` - Database migrations and studio
- `eslint` + `typescript-eslint` - Linting
- `tsx` - TypeScript execution
- `pnpm` - Package manager

---

## System Architecture

### High-Level Diagram

```
┌─────────────────┐
│   Vercel Edge  │
│    Network     │
└─────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│          Next.js App Router         │
│  ┌──────────────────────────────┐  │
│  │  Server Components (default) │  │
│  │  - Pages                     │  │
│  │  - Layouts                   │  │
│  │  - Data fetching             │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  Client Components (use client)│ │
│  │  - Interactive UI            │  │
│  │  - Forms                     │  │
│  │  - Event handlers            │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│     NeonAuth (Authentication)       │
│  ┌──────────────────────────────┐  │
│  │  neon_auth schema             │  │
│  │  - user (managed by Neon)    │  │
│  │  - sessions                  │  │
│  │  - verification tokens       │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│          Neon Postgres              │
│  ┌──────────────────────────────┐  │
│  │  neon_auth (managed)         │  │
│  │  public.events               │  │
│  │  public.board_members        │  │
│  │  public.admins               │  │
│  └──────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Directory Structure

```
.
├── app/
│   ├── layout.tsx              # Root layout with AgeGate & ErrorToastHandler
│   ├── page.tsx                # Public homepage
│   ├── components/             # Shared components
│   │   ├── AgeGate.tsx         # Age verification gate
│   │   ├── ErrorToastHandler.tsx  # Error toast notifications
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Constitution.tsx
│   │   ├── MarketsWalks.tsx
│   │   ├── Board.tsx
│   │   ├── JoinUs.tsx          # Membership form (disabled)
│   │   ├── Login.tsx           # Login placeholder
│   │   └── admin/              # Admin-specific components
│   │       ├── BoardMemberForm.tsx
│   │       └── EventForm.tsx
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx        # Login landing page
│   │   ├── sign-in/
│   │   │   └── actions.ts      # Sign-in server action
│   │   └── sign-up/
│   │       └── actions.ts      # Sign-up server action
│   ├── admin/
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── page.tsx            # Admin dashboard
│   │   ├── board/
│   │   │   ├── page.tsx
│   │   │   ├── new/
│   │   │   │   └── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── events/
│   │       ├── page.tsx
│   │       ├── new/
│   │       │   └── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
│   └── profile/
│       └── page.tsx            # User profile page (non-admin)
├── lib/
│   ├── auth.ts                 # NeonAuth configuration
│   ├── db/
│   │   ├── index.ts            # Database connection
│   │   ├── schema.ts           # Drizzle schema
│   │   ├── queries.ts          # Read queries
│   │   └── actions.ts          # Write server actions
│   └── session/
│       └── actions.ts          # Session helpers (requireAdmin)
├── drizzle/
│   ├── schema.ts               # (symlinked or generated)
│   └── 0001_watery_firebrand.sql  # Migration file
├── public/                     # Static assets
├── .env                        # Environment variables (gitignored)
├── drizzle.config.ts           # Drizzle config
├── next.config.ts              # Next.js config
├── tailwind.config.js          # Tailwind config
└── package.json
```

---

## Database Design

### Schema Overview

```
neon_auth (managed by NeonAuth)
└── user
    ├── id (UUID, PK)
    ├── email (unique)
    ├── name
    ├── emailVerified
    ├── image
    ├── createdAt
    ├── updatedAt
    ├── role
    ├── banned
    ├── banReason
    └── banExpires

public (application tables)
├── events
│   ├── id (UUID, PK)
│   ├── title
│   ├── description
│   ├── type (walk|market|workshop)
│   ├── startDate
│   ├── endDate
│   ├── startTime
│   ├── endTime
│   ├── location
│   ├── recurring (boolean)
│   ├── recurringPattern (JSONB)
│   ├── createdAt
│   ├── updatedAt
│   └── createdBy (FK → neon_auth.user.id)
│
├── board_members
│   ├── id (UUID, PK)
│   ├── name
│   ├── nickname
│   ├── role (Director|Councillor)
│   ├── sortId
│   ├── yearsInNaturism
│   ├── otherOrganizations (JSONB)
│   ├── communityCouncil (boolean)
│   ├── active (boolean)
│   ├── profileImageUrl
│   ├── createdAt
│   ├── updatedAt
│   └── createdBy (FK → neon_auth.user.id)
│
├── admins
│   ├── userId (UUID, PK, FK → neon_auth.user.id)
│   ├── role (superadmin|admin|editor)
│   ├── permissions (JSONB)
│   ├── lastLogin
│   └── createdAt
│
└── users (⚠️ DEPRECATED - pending migration removal)
    ├── id (UUID, PK)
    ├── email
    ├── name
    ├── role
    └── createdAt
```

### Important Notes

1. **`neon_auth.user`** is the **single source of truth** for user accounts (managed by NeonAuth)
2. **`users` table** exists but is deprecated; it's a profile extension that should **not** store passwords
3. **`admins` table** extends `neon_auth.user` to grant admin privileges
4. All admin data modifications require `requireAdmin()` check (verifies user is in `admins` table)
5. Foreign keys use UUIDs but **no constraint** (ON DELETE SET NULL behavior is manual)

### Migrations

Migrations are stored in `drizzle/` directory and managed by Drizzle Kit.

**Current migration:** `0001_watery_firebrand.sql`
- Creates `neon_auth` schema and `user` table
- Creates `events`, `board_members`, `admins`, `users` tables
- Includes `ALTER TABLE "users" DROP COLUMN "password"` (security fix)

**To apply migrations:**
```bash
npx drizzle-kit migrate
```

---

## Authentication & Authorization

### Flow Diagram

```
┌─────────┐
│ User    │
└────┬────┘
     │ 1. Sign up / Sign in
     ▼
┌─────────────────────────────────────┐
│  NeonAuth API (neon_auth schema)    │
│  - Creates/validates user           │
│  - Issues JWT session cookie        │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Next.js App (Session Check)        │
│  - auth.getSession() from @neondatabase/auth │
│  - session.data.user contains user  │
└─────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  Authorization Check                │
│  - requireAdmin() queries admins    │
│  - If not admin → redirect/profile  │
└─────────────────────────────────────┘
```

### Key Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `auth.getSession()` | `lib/auth.ts` | Get current user session |
| `auth.signIn.email()` | `lib/auth.ts` | Sign in with email/password |
| `auth.signUp.email()` | `lib/auth.ts` | Create new account |
| `auth.signOut()` | `lib/auth.ts` | Sign out |
| `requireAdmin()` | `lib/session/actions.ts` | Ensure user is admin (server action) |
| `getCurrentUserSession()` | `lib/session/actions.ts` | Ensure authenticated |

### Session Management

- NeonAuth uses **HTTP-only cookies** for session management
- Session is automatically refreshed on each request
- Cookie secret stored in `NEON_AUTH_CLIENT_SECRET`
- Sessions tied to Neon database

### Route Protection

**Admin routes** (`/admin/*`) use `requireAdmin()` in layout or page:

```ts
// app/admin/layout.tsx
const { user } = await requireAdmin(); // Throws redirect if not admin
```

**Authentication-only routes** use `getCurrentUserSession()`:

```ts
// app/profile/page.tsx
const user = await getCurrentUserSession(); // Redirects to sign-in if not logged in
```

---

## Frontend Architecture

### Component Types

Next.js 16 uses a **server-first** default. Components are categorized:

| Type | Directive | Use Cases | Examples |
|------|-----------|-----------|----------|
| Server Component | (none) | Data fetching, static UI | `app/page.tsx`, `app/admin/page.tsx`, `MarketsWalks` (if no interactivity) |
| Client Component | `'use client'` | State, effects, event handlers | `AgeGate`, `JoinUs`, `Login`, all form components |

### Current Components

**Server Components:**
- `app/page.tsx` (homepage)
- `app/admin/page.tsx` (dashboard)
- Most data-display components when optimized

**Client Components:**
- `AgeGate` (state: verification)
- `ErrorToastHandler` (uses `useSearchParams`)
- `JoinUs` (form state)
- `Login` (form state)
- `BoardMemberForm`, `EventForm` (form inputs)

### State Management

- **Local state:** `useState` in client components
- **Server state:** Database queries in server components (no client-side fetching yet)
- **Form state:** React `useState` in form components (could be upgraded to `react-hook-form`)

### Styling Strategy

- **Tailwind CSS v4** for utility classes
- **Custom CSS** in `app/globals.css` (global utilities)
- **Component-scoped classes:** Not using CSS modules
- **Color palette:** Custom colors defined in `tailwind.config.js`
  - `charcoal-*`, `cream-*`, `nature-*`, `earth-*`, `brand-gold`

---

## API & Data Flow

### Server Actions

Server Actions allow server-side functions to be called from client components without creating API routes.

**Current Server Actions:**

| Function | File | Purpose |
|----------|------|---------|
| `signInWithEmail()` | `app/auth/sign-in/actions.ts` | Authenticate user |
| `signUpWithEmail()` | `app/auth/sign-up/actions.ts` | Create account |
| `createEvent()` | `app/lib/db/actions.ts` | Create event (admin only) |
| `updateEvent()` | `app/lib/db/actions.ts` | Update event |
| `deleteEvent()` | `app/lib/db/actions.ts` | Delete event |
| `createBoardMember()` | `app/lib/db/actions.ts` | Add board member |
| `updateBoardMember()` | `app/lib/db/actions.ts` | Update board member |
| `deleteBoardMember()` | `app/lib/db/actions.ts` | Remove board member |

**Data flow:**
1. Client component calls server action
2. Server action validates with `requireAdmin()` if needed
3. Database operation via Drizzle
4. `revalidatePath()` clears cache
5. Returns result to client

### Data Fetching (Server Components)

Server components directly query the database using Drizzle:

```ts
// Example from app/page.tsx or MarketsWalks.tsx
const events = await db.select().from(events);
```

No separate API layer needed.

---

## Deployment

### Platform: Vercel

- **Runtime:** Node.js (default, NOT Edge)
- **Build Command:** `pnpm build`
- **Output Directory:** `.next/`
- **Node Version:** Specified in `package.json` or Vercel settings

### Environment Variables

Required in Vercel dashboard:

| Variable | Purpose | Required |
|----------|---------|----------|
| `DATABASE_URL` | Neon Postgres connection | ✅ Yes |
| `NEON_AUTH_CLIENT_URL` | NeonAuth endpoint | ✅ Yes |
| `NEON_AUTH_CLIENT_SECRET` | Session signing secret | ✅ Yes |
| `NEXT_PUBLIC_APP_URL` | Public site URL | ⚠️ Recommended |

### Build Process

```bash
# Install dependencies
pnpm install --frozen-lockfile

# Run database migrations
npx drizzle-kit migrate

# Build
pnpm build

# Start
pnpm start
```

### Database Migrations in CI/CD

When deploying:
1. Push code → Vercel runs `pnpm build`
2. Build runs TypeScript check and Next.js compilation
3. Database schema should already be migrated manually or via CI step

**Recommended:** Add a pre-deploy script or GitHub Action to run `drizzle-kit migrate` after deployment.

---

## Security Considerations

### ✅ Implemented

| Control | Implementation |
|---------|----------------|
| Authentication | NeonAuth (secure, JWT-based) |
| Password storage | Handled by NeonAuth (bcrypt/argon2) |
| Session security | HTTP-only cookies, secure flag |
| Admin authorization | `requireAdmin()` checks `admins` table |
| SQL injection prevention | Drizzle ORM parameterized queries |
| XSS prevention | React escaping (by default) |
| CSRF protection | Next.js built-in (for server actions) |

### ⚠️ Pending / Concerns

| Issue | Severity | Status |
|-------|----------|--------|
| Plaintext password in `users` table | 🔴 Critical | ✅ Fixed: column dropped via migration |
| Console.log credentials in `Login.tsx` | 🟡 Medium | ✅ Fixed: removed logging |
| Missing `id` attributes on form inputs | 🟡 Medium | ✅ Fixed: added `useId()` |
| `@neondatabase/serverless` concurrency in dev | 🟡 Low | 📝 TODO: switch to TCP driver |
| Unused disabled forms (`JoinUs.tsx`) | 🟢 Low | 📝 TODO: enable or improve messaging |

### Header Security

Configure in `next.config.ts` (recommended for production):

```ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
```

---

## Future Improvements

### Database Layer

1. **Switch to TCP driver:** Replace `@neondatabase/serverless` with `@neondatabase/driver` for better dev ergonomics
2. **Connection pooling:** Configure pool size for production traffic
3. **Add migrations to CI/CD:** Automate `drizzle-kit migrate` on deploy
4. **Add database indexes:** Review query patterns, add missing indexes
5. ** Row-level security (RLS):** Optional, if needed for multi-tenancy

### Frontend

1. **Form validation:** Enhance with `zod` + server action validation errors
2. **Loading states:** Add proper loading spinners for async actions
3. **Error boundaries:** Wrap client components for graceful error handling
4. **Image optimization:** Use `next/image` with Cloudinary remote patterns
5. **Component library:** Extract shared components (Button, Input, Card)
6. **Design system:** Standardize colors, spacing, typography

### Features

1. **Enable JoinUs form:** Connect to backend, store applications
2. **Event calendar integration:** Make calendar interactive
3. **Search functionality:** Search events, board members
4. **Pagination:** For events/board members with many records
5. **Audit logging:** Track admin actions
6. **Email notifications:** Send confirmation emails via Resend or similar

### Infrastructure

1. **Monitoring:** Add Sentry or similar for error tracking
2. **Analytics:** Vercel Analytics or Google Analytics
3. **CI/CD:** GitHub Actions for lint, type-check, build, migrations
4. **Staging environment:** Deploy preview apps for PRs
5. **Database backups:** Ensure automated backups in Neon

---

## Performance Optimization

**Current:**
- Static pages where possible (/, /auth/sign-in, /auth/sign-up)
- Server components reduce client bundle size
- Tailwind CSS purged in production

**Potential:**
- **ISR/SSR caching:** Add `revalidatePath()` or route segment revalidation
- **Image optimization:** Use `next/image` for Cloudinary images
- **Font optimization:** Use `next/font` for custom fonts
- **Code splitting:** Already automatic with Next.js
- **CDN:** Vercel Edge Network serves assets globally

---

## Troubleshooting

### "Another write batch or compaction is already active"

**Cause:** `@neondatabase/serverless` HTTP driver concurrent query issue  
**Solution:**
1. Clear `.next` cache: `rm -rf .next`
2. Restart dev server
3. Consider switching to TCP driver (recommended)

### Authentication redirects loop

**Cause:** `requireAdmin()` or `getCurrentUserSession()` incorrectly implemented  
**Solution:** Ensure server actions properly redirect instead of throwing errors. See `ADMIN_CLEAN-UP_PLAN.md`.

### Migration conflicts

**Cause:** Schema drift between drizzle/schema and database  
**Solution:**
```bash
npx drizzle-kit generate  # Generate new migration
npx drizzle-kit migrate   # Apply
```

---

## References

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Neon Docs](https://neon.tech/docs)
- [NeonAuth Docs](https://neon.tech/docs/authentication)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

**Maintained by:** NCC Development Team  
**Last reviewed:** 2026-04-06
