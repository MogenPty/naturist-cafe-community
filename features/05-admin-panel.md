# Feature 05: Admin Panel

**Epic:** M3 - Admin Panel  
**Priority:** Must Have  
**Status:** ✅ Implemented (Basic CRUD)  
**Routes:** `/admin/*`, `/admin/events/*`, `/admin/board/*`  
**Components:** `app/admin/`, `app/components/admin/`

---

## User Story

**As an administrator**, I want a secure, intuitive interface to manage the website's content (events and board members) so I can keep the community informed without needing technical expertise or direct database access.

---

## Overview

The admin panel is a role-based restricted area accessible only to users listed in the `admins` table. It provides:

- **Dashboard** - Overview and navigation
- **Event Management** - Create, read, update, delete events
- **Board Member Management** - Manage board roster

All data changes are written to the Neon Postgres database via Drizzle ORM.

---

## Access Control

### Route Protection

Every `/admin/*` route requires:
1. **Authentication** - User must have a valid NeonAuth session
2. **Authorization** - User's ID must exist in `admins` table

### Implementation

**`app/admin/layout.tsx`** (Server Component):

```ts
import { requireAdmin } from "@/lib/session/actions";

export default async function AdminLayout({ children }) {
  const { user } = await requireAdmin(); // Throws redirect if not admin

  return (
    <div className="min-h-screen bg-charcoal-700 flex">
      <aside>...</aside>
      <main>{children}</main>
    </div>
  );
}
```

**Redirect Logic (`requireAdmin()`):**

| Condition | Redirect To | Toast? |
|-----------|-------------|--------|
| No session | `/auth/sign-in?callbackUrl=/admin` | No |
| Session but not in `admins` table | `/profile?error=forbidden` | Yes - "You do not have permission" |

---

## Dashboard (`/admin`)

**Component:** `app/admin/page.tsx`

**Purpose:** Landing page for admin users. Shows quick stats and navigation.

**Current Implementation:**

- Welcome message with admin's email
- Stats cards (placeholder, could show counts):
  - Total Events
  - Active Board Members
  - Upcoming Events
- Navigation tiles to Events and Board Members sections

**Future Enhancements:**
- Activity log/recent changes
- Quick actions (add new event, add board member)
- System status (DB connection, latest deploy)

---

## Events Management (`/admin/events`)

### Features

| Operation | Endpoint | Component | Method |
|-----------|----------|-----------|--------|
| List | `/admin/events` | EventsTable (in page) | GET |
| Create | `/admin/events/new` | EventForm | POST (server action) |
| Edit | `/admin/events/[id]/edit` | EventForm | PATCH (server action) |
| Delete | `/admin/events/[id]` | DeleteButton (in table) | DELETE (server action) |

---

### Event Schema

```ts
export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  type: text("type").notNull().$type<"walk" | "market" | "workshop">(),
  startDate: timestamp("start_date", { withTimezone: true }).notNull(),
  endDate: timestamp("end_date", { withTimezone: true }).notNull(),
  startTime: timestamp("start_time", { withTimezone: false }),
  endTime: timestamp("end_time", { withTimezone: false }),
  location: text("location").notNull(),
  recurring: boolean("recurring").default(false),
  recurringPattern: jsonb("recurring_pattern"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  createdBy: uuid("created_by"), // References neon_auth.user.id
});
```

---

### Event Form (`app/components/admin/EventForm.tsx`)

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Title | text | Yes | Event name |
| Description | textarea | No | Details about event |
| Type | select | Yes | walk, market, workshop |
| Start Date | date | Yes | Full day picker |
| End Date | date | Yes | Must be ≥ start date |
| Start Time | time | No | Only if event has time |
| End Time | time | No | Only if event has time |
| Location | text | Yes | Physical/virtual location |
| Recurring | checkbox | No | Check to enable pattern |
| Recurring Pattern | JSON input (hidden/custom) | Optional | Complex, stored as JSON |

**Validation (Client + Server):**
- Title: required, max length
- Type: must be in enum
- Dates: endDate ≥ startDate
- If times provided: endTime ≥ startTime on same day

**Server Action:** `createEvent(formData)` or `updateEvent(id, formData)`

Both use Zod schema validation (`insertEventSchema`, `updateEventSchema`).

---

### Event List (`/admin/events/page.tsx`)

**Display:**

| Column | Sortable? |
|--------|-----------|
| Title | Yes |
| Type | Yes |
| Start Date | Yes |
| Location | Yes |
| Actions (Edit, Delete) | No |

**Features:**
- Pagination (optional, currently shows all)
- Filter by type (future)
- Filter by date range (future)
- Delete confirmation modal (future)

---

## Board Members Management (`/admin/board`)

### Features

| Operation | Endpoint | Component | Method |
|-----------|----------|-----------|--------|
| List | `/admin/board` | BoardMembersTable (in page) | GET |
| Create | `/admin/board/new` | BoardMemberForm | POST |
| Edit | `/admin/board/[id]/edit` | BoardMemberForm | PATCH |
| Delete | `/admin/board/[id]` | DeleteButton | DELETE |

---

### Board Member Schema

```ts
export const boardMembers = pgTable("board_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  nickname: text("nickname"), // Preferred name
  role: text("role").notNull().$type<"Director" | "Councillor">(),
  sortId: integer("sort_id").notNull(), // Display order
  yearsInNaturism: integer("years_in_naturism").notNull(),
  otherOrganizations: jsonb("other_organizations"), // String array
  communityCouncil: boolean("community_council").default(false),
  active: boolean("active").default(true),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  createdBy: uuid("created_by"), // References neon_auth.user.id
});
```

---

### Board Member Form (`app/components/admin/BoardMemberForm.tsx`)

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Name | text | Yes | Full name |
| Nickname | text | No | Preferred name |
| Role | select | Yes | Director or Councillor |
| Sort ID | number | Yes | Integer, determines display order (1, 2, 3...) |
| Years in Naturism | number | Yes | Integer |
| Other Organizations | multiselect or comma-separated text | No | e.g., ["NATUNET", "BLSA"] |
| Community Council | checkbox | No | Member of community council |
| Active | checkbox | Yes | Default checked |
| Profile Image URL | text | No | Cloudinary URL or /public/path |

**Other Organizations:**
Currently stores as JSON array. Could be:
- Multiple checkboxes for known orgs
- Comma-separated text input (current approach in code)
- Tag input component

---

### Board Member List (`/admin/board/page.tsx`)

**Display:**

| Column | Notes |
|--------|-------|
| Name | Bold, includes nickname if present |
| Role | Badge (Director/Councillor) |
| Years | Integer |
| Orgs | List tags |
| Active | Green dot if active |
| Sort ID | Hidden column for reference |
| Actions | Edit, Delete buttons |

---

## Server Actions (`app/lib/db/actions.ts`)

All data mutations use Server Actions. Each requires `requireAdmin()`.

### Events

```ts
export async function createEvent(formData: FormData) {
  const { user } = await requireAdmin();
  const data = schema.insertEventSchema.parse(/* transform formData */);
  const result = await db.insert(events).values({ ...data, createdBy: user.id }).returning();
  revalidatePath("/"); // Clear cache for public pages
  return { success: true, event: result[0] };
}

export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin();
  const data = schema.updateEventSchema.parse(/* transform */);
  const result = await db.update(events).set({ ...data, updatedAt: new Date() }).where(eq(events.id, id)).returning();
  revalidatePath("/");
  return { success: true, event: result[0] };
}

export async function deleteEvent(id: string) {
  await requireAdmin();
  await db.delete(events).where(eq(events.id, id));
  revalidatePath("/");
  return { success: true };
}
```

### Board Members

Similar pattern with `createBoardMember`, `updateBoardMember`, `deleteBoardMember`.

**Note:** `revalidatePath("/")` triggers Next.js to re-render homepage on next request, showing updated board list.

---

## UI/UX Design

### Admin Theme

- Dark sidebar (`bg-charcoal-600/50`)
- Light content area (`bg-charcoal-700`)
- Cream/gold accents for brand consistency
- Consistent spacing (`px-8 py-8`)

### Components

- `NavItem` (inline in layout) - Sidebar navigation link
- `BoardMemberForm`, `EventForm` - Reusable form components
- `DeleteButton` (wraps form with confirm dialog)

---

## Data Flow

```
Admin clicks "New Event"
   ↓
Browser loads /admin/events/new (Server Component)
   ↓
Server component renders EventForm (Client Component)
   ↓
Admin fills form → clicks Submit
   ↓
handleSubmit (client) → validate → call server action
   ↓
Server action:
  1. requireAdmin() - verify auth
  2. Parse & validate (Zod)
  3. Insert/Update/Delete via Drizzle
  4. revalidatePath("/") - clear cache
  5. Return result
   ↓
Client receives { success: true } → redirect or show success message
```

---

## Public Page Integration

### Events on Homepage

When `revalidatePath("/")` is called after event changes:
1. Next.js marks homepage as stale
2. Next request to `/` triggers fresh server component render
3. New events fetched from DB and displayed

**No manual cache clearing needed** - automatic via Next.js.

---

## Error Handling

### Form Errors

- **Client-side:** Shown inline under input (red text) with `ValidationError` component from Formspree (for server action errors)
- **Server-side:** Zod validation throws - errors returned in `result` (check form implementation)

### Admin Check Failures

`requireAdmin()` throws `redirect()` - not catchable. Use standard Next.js error boundary if needed.

---

## Testing Checklist

### Authentication

- [ ] Login as admin → can access `/admin`
- [ ] Login as non-admin → redirected to `/profile?error=forbidden`
- [ ] Not logged in → redirected to `/auth/sign-in?callbackUrl=/admin`
- [ ] After redirect from non-admin, toast appears

### CRUD Operations

- [ ] Create event → appears in list AND on homepage
- [ ] Edit event → changes reflected
- [ ] Delete event → removed from list and homepage
- [ ] Create board member → appears on `/admin/board` and public `/board` section
- [ ] Edit board member → changes saved
- [ ] Delete board member → removed

### Data Integrity

- [ ] `createdBy` is set correctly (to admin's user ID)
- [ ] `updatedAt` updates on edit
- [ ] `sortId` respected in board member display order
- [ ] `active` flag filters on public page (if implemented)

### Edge Cases

- [ ] Special characters in form fields (quotes, <, >) handled safely
- [ ] Very long text doesn't break layout
- [ ] Deleting active board member with future events (no FK constraint, should be fine)

---

## Known Issues

1. **No pagination:** Tables show all records (fine for < 100 records, problematic at scale)
2. **No delete confirmation:** Currently uses simple button, should have modal
3. **No image upload:** Profile image URL must be pasted manually (Cloudinary integration needed)
4. **No search/filter:** Tables grow without filtering
5. **No audit trail:** Changes are not logged (who changed what and when)
6. **Form validation duplicated:** Some client + server validation could be centralized

---

## Future Enhancements

### Medium Effort

1. **Pagination** for events and board members
2. **Delete confirmation modal** before destructive action
3. **Image uploader** - integrate Cloudinary upload widget
4. **Rich text editor** for event descriptions (currently plain text)
5. **Filter/sort controls** on list pages
6. **Audit logging** - Track all CRUD operations
7. **Bulk operations** - Select multiple to delete/export
8. **Soft delete** - Keep records but mark inactive (recoverable)

### Higher Effort

1. **Activity dashboard** - Charts, graphs, recent changes feed
2. **User management** - Promote users to admin from panel
3. **Scheduled events** - Automatically publish/unpublish based on dates
4. **Email notifications** - Send emails when events created/changed
5. **Calendar integration** - iCal/Google Calendar export for events
6. **Multi-language support** - Admin UI in multiple languages

---

## Admin Onboarding

### Manual Setup (Current)

To add a new admin user:

1. Have user sign up via `/auth/sign-up` (creates `neon_auth.user`)
2. Get the user's ID from Neon dashboard or query:
   ```sql
   SELECT id FROM neon_auth.user WHERE email = 'admin@example.com';
   ```
3. Insert into `admins` table:
   ```sql
   INSERT INTO admins (user_id, role) VALUES ('user-uuid-here', 'admin');
   ```
4. User can now access `/admin`

### Future: Self-Service

- Admin with `superadmin` role can promote other users
- UI in `/admin/settings/users` page

---

## Files & Routes

### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/admin` | `app/admin/page.tsx` | Dashboard |
| `/admin/events` | `app/admin/events/page.tsx` | Events list |
| `/admin/events/new` | `app/admin/events/new/page.tsx` | Create event form |
| `/admin/events/[id]/edit` | `app/admin/events/[id]/page.tsx` | Edit event form |
| `/admin/board` | `app/admin/board/page.tsx` | Board members list |
| `/admin/board/new` | `app/admin/board/new/page.tsx` | Create board member form |
| `/admin/board/[id]/edit` | `app/admin/board/[id]/page.tsx` | Edit board member form |

### Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `AdminLayout` | `app/admin/layout.tsx` | Shared layout with sidebar |
| `EventForm` | `app/components/admin/EventForm.tsx` | Create/edit event form |
| `BoardMemberForm` | `app/components/admin/BoardMemberForm.tsx` | Create/edit board member |
| `NavItem` | Inline in `AdminLayout` | Sidebar navigation link |

### Server Actions

| Action | File | Purpose |
|--------|------|---------|
| `createEvent` | `app/lib/db/actions.ts` | Insert event |
| `updateEvent` | `app/lib/db/actions.ts` | Update event |
| `deleteEvent` | `app/lib/db/actions.ts` | Delete event |
| `createBoardMember` | `app/lib/db/actions.ts` | Insert board member |
| `updateBoardMember` | `app/lib/db/actions.ts` | Update board member |
| `deleteBoardMember` | `app/lib/db/actions.ts` | Delete board member |

---

## Related

- **Feature 04:** Authentication (provides `requireAdmin()`)
- **Feature 01:** Public Website (receives data from admin-managed tables)
- **Database:** `events`, `board_members`, `admins` tables
- **See also:** `ARCHITECTURE.md`, `PRD.md`, `ADMIN_PANEL_PLAN.md`

---

**Last Updated:** 2026-04-06
