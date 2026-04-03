# Admin Panel Implementation Plan: NeonDB + NeonAuth

## Context

The NCC website is a Next.js 16 App Router application (single-page scrolling SPA). Currently:
- Content is **hardcoded** in components (events in `MarketsWalks.tsx`, board members in `Board.tsx`)
- No authentication for content management
- `.env.local` already contains **NeonAuth credentials** and `DATABASE_URL` (but no tables exist yet)
- Forms use Formspree for membership applications (coming soon)

**Goal**: Build an admin panel (`/admin`) where authenticated administrators can:
- Manage events (CRUD operations)
- Manage board members
- Manage other content sections
- Secure access using NeonAuth (OAuth with Neon)

---

## Architecture Decisions

### 1. **Authentication: NeonAuth** (Not NextAuth.js)
**Why**: Already configured in `.env.local`, uses Better Auth protocol, integrates with Neon database, provides JWT-based auth.

**Implementation**:
- Use `@neondatabase/neon-auth` client library
- Server actions for auth operations (login, logout, session check)
- JWT validation middleware for protected routes
- User role management (admin vs regular users)

### 2. **Database: PostgreSQL on Neon** with **Drizzle ORM**
**Why**:
- NeonAuth stores users in `neon_auth` schema
- Drizzle is type-safe, works great with TypeScript/Next.js
- Better migration control than Prisma for shared Neon DB

**Schema**:
- Events table (`events`)
- Board members table (`board_members`)
- Content sections table (`content_sections` if needed)
- Admin roles table (extending NeonAuth users)

### 3. **Admin Routing**: App Router with Server Components
- `/admin` - Admin dashboard (protected)
- `/admin/events` - Event management
- `/admin/board` - Board member management
- `/admin/settings` - Site settings (optional)
- Use **Server Actions** for mutations (create, update, delete)

### 4. **UI Pattern**: Form-based CRUD with existing Tailwind styles
- Reuse existing form components (modern-form-container, modern-input, modern-button)
- Client components for interactive forms
- Server components for data fetching (with Suspense)

---

## Database Schema Design

### Table: `events`
```sql
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK (type IN ('walk', 'market', 'workshop')),
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  start_time TIME,
  end_time TIME,
  location TEXT NOT NULL,
  recurring BOOLEAN DEFAULT false,
  recurring_pattern JSONB, -- { frequency: 'weekly', interval: 1, until: date }
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES neon_auth.users(id) ON DELETE SET NULL
);

CREATE INDEX events_start_date_idx ON events(start_date);
CREATE INDEX events_type_idx ON events(type);
```

### Table: `board_members`
```sql
CREATE TABLE board_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  nickname TEXT, -- Preferred name/nickname
  role TEXT NOT NULL, -- 'Director' or 'Councillor'
  sort_id INTEGER NOT NULL,
  years_in_naturism INTEGER NOT NULL,
  other_organizations TEXT[], -- Array of strings
  community_council BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  profile_image_url TEXT, -- Cloudinary URL or public path
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES neon_auth.users(id) ON DELETE SET NULL
);

CREATE INDEX board_members_sort_id_idx ON board_members(sort_id);
CREATE INDEX board_members_active_idx ON board_members(active);
```

### Table: `admins` (extends NeonAuth users)
```sql
CREATE TABLE admins (
  user_id UUID PRIMARY KEY REFERENCES neon_auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('superadmin', 'admin', 'editor')),
  permissions JSONB DEFAULT '{}',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for quick role lookup
CREATE INDEX admins_role_idx ON admins(role);
```

**Note**: NeonAuth automatically creates the `neon_auth.users` table with:
- `id`, `email`, `name`, `avatar_url`, `created_at`, `updated_at`

---

## Implementation Phases

### **Phase 1: Database Setup & Drizzle ORM**

1. Install Drizzle dependencies:
   ```bash
   pnpm add drizzle-orm @neondatabase/serverless
   pnpm add -D drizzle-kit
   ```

2. Create `drizzle.config.ts`:
   ```typescript
   import { defineConfig } from "drizzle-kit";

   export default defineConfig({
     schema: "./src/lib/db/schema.ts",
     out: "./drizzle",
     dialect: "postgresql",
     dbCredentials: {
       connectionString: process.env.DATABASE_URL!,
     },
   });
   ```

3. Create `src/lib/db/index.ts`:
   ```typescript
   import { drizzle } from 'drizzle-orm/neon-http';
   import { neon } from '@neondatabase/serverless';
   import * as schema from './schema';

   const sql = neon(process.env.DATABASE_URL!);
   export const db = drizzle(sql);

   export * from './schema';
   export * from './queries';
   ```

4. Create `src/lib/db/schema.ts` with all tables (using Drizzle DSL)

5. Create `src/lib/db/queries.ts` for reusable queries:
   - `getAllEvents()`
   - `getEventById(id)`
   - `createEvent(data)`
   - `updateEvent(id, data)`
   - `deleteEvent(id)`
   - Similar for board members

6. Run migration:
   ```bash
   pnpm drizzle-kit push  # Creates tables in Neon DB
   ```

### **Phase 2: NeonAuth Integration**

1. Install NeonAuth client:
   ```bash
   pnpm add @neondatabase/neon-auth
   ```

2. Create `src/lib/auth/neon-auth.ts`:
   ```typescript
   import { createClient } from '@neondatabase/neon-auth';
   import { db } from '@/lib/db';
   import { eq } from 'drizzle-orm';
   import * as schema from '@/lib/db/schema';

   export const neonAuth = createClient({
     baseUrl: process.env.NEON_AUTH_CLIENT_ID!,
     secret: process.env.NEON_AUTH_CLIENT_SECRET!,
   });

   // Server action: login
   export async function login(email: string, password: string) {
     return neonAuth.signIn.email({ email, password });
   }

   // Server action: logout
   export async function logout() {
     return neonAuth.signOut();
   }

   // Server action: get current session
   export async function getSession() {
     return neonAuth.getSession();
   }

   // Server middleware: require admin
   export async function requireAdmin() {
     const session = await getSession();
     if (!session?.user) throw new Error('Unauthorized');

     // Check if user is admin
     const admin = await db.query.admins.findFirst({
       where: eq(schema.admins.userId, session.user.id)
     });
     if (!admin) throw new Error('Forbidden: Not an admin');

     return { user: session.user, role: admin.role };
   }
   ```

3. Create `src/lib/auth/middleware.ts` for route protection:
   - Use Next.js middleware or server action guards

### **Phase 3: Admin Layout & Navigation**

1. Create `app/admin/layout.tsx`:
   - Shared admin navigation/sidebar
   - Admin header with logout button
   - Role display
   - Link to dashboard, events, board, settings

2. Create `app/admin/page.tsx` (Dashboard):
   - Stats overview (total events, board members, etc.)
   - Recent activity (if implementing audit log)
   - Quick actions

3. Create `app/admin/events/page.tsx`:
   - Server component: fetch events list
   - Client component: EventTable with edit/delete buttons
   - "Add Event" button opens modal or separate page

4. Create `app/admin/board/page.tsx`:
   - Similar to events, for board members

5. Create `app/admin/events/new/page.tsx` and `[id]/page.tsx`:
   - Form pages for CRUD
   - Use existing form patterns

### **Phase 4: UI Components**

Reuse existing component patterns:
- `app/components/Board.tsx` - show how data is structured, extract to server component
- `app/components/MarketsWalks.tsx` - extract hardcoded events to database

**New components needed**:
- `app/components/admin/AdminNav.tsx` - admin sidebar
- `app/components/admin/EventForm.tsx` - create/edit event form
- `app/components/admin/BoardMemberForm.tsx` - create/edit board member
- `app/components/admin/ConfirmDelete.tsx` - delete confirmation dialog
- `app/components/admin/DataTable.tsx` - reusable table with sorting/pagination

### **Phase 5: Server Actions for Mutations**

Create `src/lib/db/actions.ts`:
```typescript
'use server';

import { db } from './index';
import { eq } from 'drizzle-orm';
import * as schema from './schema';
import { requireAdmin } from '@/lib/auth/neon-auth';

export async function createEvent(data: InsertEvent) {
  const { user } = await requireAdmin();
  return db.insert(schema.events).values({ ...data, createdBy: user.id });
}

export async function updateEvent(id: string, data: Partial<Event>) {
  await requireAdmin();
  return db.update(schema.events).set(data).where(eq(schema.events.id, id));
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  return db.delete(schema.events).where(eq(schema.events.id, id));
}

// Similar for board members
```

### **Phase 6: Integration with Public Pages**

1. Replace hardcoded data in `MarketsWalks.tsx`:
   - Fetch events from database
   - Show only future events (filter by `start_date > NOW()`)
   - Keep the hardcoded fallback if DB empty

2. Replace hardcoded board in `Board.tsx`:
   - Fetch active board members from DB
   - Sort by `sort_id`
   - Fallback to hardcoded if DB empty

3. Future: Add caching (revalidation) for performance

### **Phase 7: Seed Data & Admin User Setup**

1. Create seed script `scripts/seed-admin.ts`:
   - Takes admin email from env or CLI arg
   - Creates admin record in `admins` table
   - Must run after NeonAuth user signs up

2. Documentation: How to create first admin:
   - Sign up via NeonAuth (need to expose signup endpoint)
   - Run seed script to promote user to admin
   - OR create manual SQL insert into `admins` table

### **Phase 8: Security & Hardening**

1. **Rate limiting** on admin routes (optional: middleware)
2. **CSRF protection** (Next.js has built-in)
3. **Input validation** with Zod for server actions
4. **Row-level security** (RLS) - not needed if using server-side checks
5. **Audit logging** (optional): track changes to events/board members

### **Phase 9: Deployment & Environment**

1. Ensure `.env.local` has:
   - `DATABASE_URL` (Neon connection)
   - `NEON_AUTH_CLIENT_ID` and `NEON_AUTH_CLIENT_SECRET`
   - `NEXT_PUBLIC_APP_URL` updated to production

2. Verify NeonAuth is **provisioned** in Neon console:
   - Check `neon_auth` schema exists
   - OAuth credentials valid

3. Run migrations in production:
   ```bash
   pnpm drizzle-kit push --config=drizzle.config.ts
   ```

---

## Files to Create/Modify

### New Files
```
src/lib/db/
├── index.ts          (db connection)
├── schema.ts         (drizzle tables)
├── queries.ts        (read queries)
└── actions.ts        (server actions for mutations)

src/lib/auth/
├── neon-auth.ts      (NeonAuth client + helpers)
└── middleware.ts     (route guards)

app/
├── admin/
│   ├── layout.tsx
│   ├── page.tsx                 (dashboard)
│   ├── events/
│   │   ├── page.tsx             (list)
│   │   ├── new/
│   │   │   └── page.tsx         (create)
│   │   └── [id]/
│   │       └── page.tsx         (edit)
│   ├── board/
│   │   ├── page.tsx
│   │   ├── new/
│   │   └── [id]/
│   └── settings/
│       └── page.tsx
├── components/
│   └── admin/
│       ├── AdminNav.tsx
│       ├── EventForm.tsx
│       ├── BoardMemberForm.tsx
│       ├── DataTable.tsx
│       └── ConfirmDelete.tsx
└── api/
    └── auth/
        ├── login/route.ts
        └── logout/route.ts  (optional: can use server actions)
```

### Modified Files
- `app/components/MarketsWalks.tsx` - fetch events from DB
- `app/components/Board.tsx` - fetch board members from DB
- `next.config.ts` - ensure image domains for Cloudinary
- `.env.example` - add admin setup instructions

---

## Testing Plan

### 1. Database Connectivity
   - Run `pnpm drizzle-kit push` to create tables
   - Verify Neon connection works

### 2. Authentication Flow
   - Create test user via NeonAuth signup
   - Promote to admin via seed script
   - Login at `/api/auth/login` or custom endpoint
   - Verify session persists
   - Access `/admin` - should redirect to login if not authenticated
   - Non-admin user should get "Forbidden"

### 3. CRUD Operations
   - Create event: fill form, submit, verify in DB
   - Edit event: modify, save, verify update
   - Delete event: confirm deletion, verify removed from DB
   - Repeat for board members

### 4. Public Page Integration
   - Events appear on homepage `MarketsWalks` section
   - Board members appear on `/board` section
   - No hardcoded data should override database (unless DB empty)

### 5. Error Handling
   - Attempt unauthorized access → redirect/login
   - Invalid form data → validation errors
   - Server errors → user-friendly messages

### 6. Type Safety
   - TypeScript compiles without errors
   - Drizzle types match database schema

---

## Migration from Hardcoded Data

### **Current State**:
- `MarketsWalks.tsx` has `upcomingEvents` array with 5 events (some dates in 2025, may be expired)
- `Board.tsx` has `boardMembers` array with 7 members
- These are **static**, not editable

### **After Migration**:
- Add script to seed database with existing hardcoded data
- Modify components to **prefer database data** but fall back to hardcoded if empty
- Admin can edit via `/admin/events` and `/admin/board`

**Seeding approach**:
```typescript
// scripts/seed-db.ts
import { db } from '../src/lib/db';
import * as schema from '../src/lib/db/schema';

await db.insert(schema.events).values([
  { title: 'Weekend Nature Walk', type: 'walk', ... }
]);

await db.insert(schema.boardMembers).values([
  { name: 'Vongani Nkuna', role: 'Director', sortId: 5, ... }
]);

console.log('Seeded initial data');
```

Run: `tsx scripts/seed-db.ts`

---

## Potential Issues & Mitigations

| Issue | Risk | Mitigation |
|-------|------|------------|
| NeonAuth not provisioned | High | Verify in Neon Console first: Auth tab → enabled |
| DATABASE_URL not accessible | High | Test connection with `psql` or Drizzle studio |
| Schema conflicts with existing data | Medium | Use `drizzle-kit push` for safe schema changes |
| Hardcoded dates are expired | Low | Seed fresh events in future dates |
| Type mismatch in DB fields | Low | Use Drizzle type inference, test with dev data |
| Admin panel UX inconsistent | Low | Reuse Tailwind classes from existing forms |

---

## Implementation Order

1. Setup Drizzle ORM + config
2. Create database schema (schema.ts)
3. Push schema to Neon DB
4. Integrate NeonAuth client
5. Create auth middleware + server actions
6. Build admin layout & navigation
7. Create Event CRUD pages
8. Create Board Member CRUD pages
9. Replace hardcoded data with DB fetch
10. Seed initial data
11. Test auth, CRUD, public pages
12. Deploy & verify

---

## Success Criteria

- [ ] Admin can login via NeonAuth
- [ ] Admin can access `/admin` dashboard
- [ ] Admin can create/edit/delete events
- [ ] Admin can create/edit/delete board members
- [ ] Changes reflect on public homepage instantly
- [ ] Non-admin users cannot access `/admin/*`
- [ ] All TypeScript compiles without errors
- [ ] Database tables created in Neon
- [ ] No hardcoded data in production (all from DB)

---

## Next Steps

**Approve this plan** → Begin implementation with Phase 1 (Drizzle setup).

Would you like me to:
1. Add any additional content types (news, announcements, etc.)?
2. Extend admin roles beyond binary admin/editor?
3. Add image upload for board members?
4. Include audit logging of changes?
5. Add pagination/infinite scroll for large datasets?
