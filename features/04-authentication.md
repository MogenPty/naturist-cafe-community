# Feature 04: Authentication & Authorization

**Epics:** M2 - Authentication & User Management  
**Priority:** Must Have  
**Status:** ✅ Implemented  
**Components:** `app/auth/`, `app/lib/auth.ts`, `app/lib/session/actions.ts`  
**Provider:** NeonAuth (`@neondatabase/auth/next/server`)

---

## User Stories

1. **As a new visitor**, I want to create an account so I can log in and potentially become a member.
2. **As a registered member**, I want to sign in securely so I can access my account.
3. **As an admin**, I want to restrict access to admin pages so only authorized users can manage content.
4. **As a logged-in user**, I want to sign out so I can securely end my session.

---

## Architecture

### Authentication Flow

```
┌────────────┐
│  Visitor   │
└─────┬──────┘
      │
      ▼ Sign Up
┌──────────────────────────────────┐
│  auth.signUp.email()             │
│  - Validates email/password      │
│  - Creates neon_auth.user        │
│  - Sets emailVerified?           │
│  - Returns user + session        │
└──────────────────────────────────┘
      │
      ▼
┌──────────────────────────────────┐
│  Optional: Insert into users     │
│  table (profile extension)       │
│  (Currently done but table       │
│   is deprecated)                 │
└──────────────────────────────────┘
      │
      ▼ Redirect to sign-in (or auto-login)
```

### Authorization Flow

```
┌──────────────┐
│  Authenticated │
│  User         │
└───────┬───────┘
        │
        ▼ Access /admin
┌──────────────────────────────────┐
│  requireAdmin()                  │
│  - Get session                   │
│  - Query admins table            │
│  - If user in admins: ✓ allow    │
│  - If not: redirect to /profile?error=forbidden │
└──────────────────────────────────┘
```

---

## Implementation

### 1. Auth Configuration (`app/lib/auth.ts`)

```ts
import { createNeonAuth } from "@neondatabase/auth/next/server";

export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_CLIENT_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_CLIENT_SECRET!,
  },
});

export const { getSession, signIn, signOut, verifyEmail, emailOtp } = auth;
```

**Key:**
- `NEON_AUTH_CLIENT_URL` - NeonAuth API endpoint
- `NEON_AUTH_CLIENT_SECRET` - Cookie signing secret (keep secure!)

---

### 2. Session Helpers (`app/lib/session/actions.ts`)

Server Actions for auth checks and role-based access.

#### `getCurrentUserSession()`

```ts
export async function getCurrentUserSession() {
  const session = await auth.getSession();
  if (!session?.data?.user) {
    redirect("/auth/sign-in");
  }
  return session.data.user;
}
```

**Use:** Pages that require any authenticated user.

#### `requireAdmin()`

```ts
export async function requireAdmin() {
  const session = await getSession();
  const sessionUser = session?.data?.user;

  if (!sessionUser) {
    redirect("/auth/sign-in?callbackUrl=/admin");
  }

  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, sessionUser.id),
  });

  if (!admin) {
    redirect("/profile?error=forbidden");
  }

  return { user: sessionUser, role: admin.role };
}
```

**Use:** Admin-only pages and server actions.

**Redirects:**
- Not logged in → `/auth/sign-in?callbackUrl=/admin` (preserves intended destination)
- Not admin → `/profile?error=forbidden` (shows toast: permission denied)

---

### 3. Sign-In (`app/auth/sign-in/actions.ts`)

```ts
export async function signInWithEmail(_prevState, formData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email address must be provided." };

  const { data, error } = await auth.signIn.email({
    email,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message || "Failed to sign in" };
  }

  // Check admin status for redirect
  const admin = await db.query.admins.findFirst({
    where: eq(schema.admins.userId, data.user.id),
  });

  if (admin) {
    redirect("/admin");
  } else {
    redirect("/profile");
  }
}
```

**Features:**
- Authenticates via NeonAuth
- Queries `admins` table for role check
- Role-based redirect: admin→`/admin`, member→`/profile`

---

### 4. Sign-Up (`app/auth/sign-up/actions.ts`)

```ts
export async function signUpWithEmail(_prevState, formData) {
  const email = formData.get("email") as string;
  if (!email) return { error: "Email address must be provided." };

  const { data, error } = await auth.signUp.email({
    email,
    name: formData.get("name") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message || "Failed to create account" };
  }

  // Optional: insert profile record (DEPRECATED - users table pending removal)
  await db.insert(users).values({
    id: data.user.id,
    email,
    name: formData.get("name") as string,
    createdAt: new Date(),
    // ⚠️ Password NOT inserted (security fix applied)
  }).onConflictDoNothing();

  redirect("/");
}
```

**Note:** The `users` table insert is kept for backward compatibility but is deprecated. Plan to remove entirely.

---

### 5. Login Landing Page (`app/auth/login/page.tsx`)

Server component that redirects already-authenticated users.

```ts
export const dynamic = "force-dynamic"; // Uses cookies via auth.getSession()

export default async function LoginPage() {
  const session = await auth.getSession();
  const user = session?.data?.user;

  if (user) {
    // Check if admin
    const admin = await db.query.admins.findFirst({
      where: eq(schema.admins.userId, user.id),
    });

    if (admin) {
      redirect("/admin");
    } else {
      redirect("/profile");
    }
  }

  // Show login options page if not authenticated
  return (
    <div>...login options (email/password or maybe other providers)...</div>
  );
}
```

**Purpose:** Prevents logged-in users from seeing login page again (redirects appropriately).

---

### 6. Routes

| Route | Type | Purpose |
|-------|------|---------|
| `/auth/login` | Server Page | Landing page with login options (redirects if logged in) |
| `/auth/sign-in` | Form (client) | Email/password sign-in form |
| `/auth/sign-up` | Form (client) | Account creation form |
| `/profile` | Server Page + Client actions | User profile (for non-admins) |
| `/admin/*` | Protected layout | Admin-only pages |

---

## Database Schema

### `neon_auth.user` (Managed by NeonAuth)

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Primary key |
| `email` | text | Unique email |
| `name` | text | Display name |
| `emailVerified` | boolean | Email verification status |
| `image` | text | Avatar URL |
| `createdAt` | timestamp | Account creation |
| `updatedAt` | timestamp | Last update |
| `role` | text | Custom role (optional) |
| `banned` | boolean | Suspension flag |
| `banReason` | text | If banned |
| `banExpires` | timestamp | Temp ban expiry |

**Note:** NeonAuth manages this table. **Do not modify directly.**

---

### `admins` (Application Extension)

| Column | Type | Description |
|--------|------|-------------|
| `userId` | UUID (PK) | References `neon_auth.user.id` |
| `role` | text | `superadmin` \| `admin` \| `editor` |
| `permissions` | JSONB | Additional permissions (future) |
| `lastLogin` | timestamp | Last admin activity |
| `createdAt` | timestamp | When admin was added |

**Purpose:** Lists which authenticated users are admins.

**Granting Admin:**
```sql
INSERT INTO admins (user_id, role) VALUES ('user-uuid-here', 'admin');
```

---

### `users` (DEPRECATED ⚠️)

| Column | Type | Status |
|--------|------|--------|
| `id` | UUID | ✅ Exists |
| `email` | text | ✅ Exists |
| `name` | text | ✅ Exists |
| `role` | text | ✅ Exists (but redundant with `neon_auth.user.role`) |
| `password` | text | 🚨 **DROPPED** (security vulnerability fixed) |
| `createdAt` | timestamp | ✅ Exists |

**Current:** Used as profile cache/extension but unnecessary.

**Plan:** Remove entirely. All data available from `neon_auth.user`.

---

## Security

### ✅ Implemented

1. **Password hashing:** Handled by NeonAuth (bcrypt/argon2, never stored plaintext)
2. **Session security:** HTTP-only cookies, secure flag in production
3. **Authorization check:** `requireAdmin()` queries `admins` table on every admin request
4. **SQL injection prevention:** Drizzle ORM parameterized queries
5. **CSRF protection:** Next.js server actions include CSRF tokens automatically
6. **No credential logging:** Removed `console.log({ email, password })` from `Login.tsx`

### ⚠️ Pending

1. **Rate limiting:** Not implemented on auth endpoints (vulnerable to brute force)
   - **Recommendation:** Add rate limiting middleware or use Vercel's built-in
2. **Email verification enforcement:** Currently optional (NeonAuth can mandate)
3. **Password strength:** No minimum complexity enforced (NeonAuth has defaults)

---

## Testing

### Authentication Flow

- [ ] New user can sign up
- [ ] Sign-up creates `neon_auth.user` record
- [ ] User can sign in with correct credentials
- [ ] Wrong credentials show error
- [ ] Session persists across page reloads
- [ ] Sign out destroys session

### Authorization Flow

- [ ] Admin user can access `/admin`
- [ ] Non-admin authenticated user redirected to `/profile?error=forbidden`
- [ ] Toast shows "You do not have permission"
- [ ] Unauthenticated user redirected to `/auth/sign-in?callbackUrl=/admin`
- [ ] After admin sign-in, redirected to `/admin`
- [ ] After non-admin sign-in, redirected to `/profile`

### Session

- [ ] Session cookie is HTTP-only (verify in browser dev tools)
- [ ] Session persists across browser tabs
- [ ] Sign out clears cookie

---

## Known Issues

1. **`users` table redundancy:** Legacy table still used in `signUpWithEmail`. Should be removed after confirming no dependencies.
2. **No email verification required:** Sign-up works without verifying email. Could be enforced via NeonAuth config.
3. **No password reset flow:** "Reset password" link in `Login.tsx` is disabled.
4. **No OAuth providers:** Only email/password. Could add Google, GitHub, etc. via NeonAuth.

---

## Future Enhancements

1. **Password reset:**
   - Implement forgot password flow
   - Email reset link via NeonAuth built-in

2. **Email verification enforcement:**
   - Block login until `emailVerified === true`
   - Show "Check your email" page after sign-up

3. **OAuth providers:**
   - Add Google, Facebook, Microsoft OAuth via NeonAuth
   - Update sign-in page UI

4. **Remember me:** Persistent session beyond browser close (extend cookie expiry)

5. **Two-factor authentication (2FA):** Via NeonAuth if supported

6. **Session management page:** Let users see active sessions, revoke them

7. **Admin onboarding workflow:**
   - Self-service admin promotion request
   - Existing admin approval required
   - Audit log of admin changes

---

## Troubleshooting

### "Cookies can only be modified in a Server Action or Route Handler"

**Cause:** Calling `auth.getSession()` from a client component or server component without `"use server"`  
**Fix:** Ensure all functions that call NeonAuth methods are marked `"use server"` and are Server Actions or Route Handlers.

---

### Redirect loop after sign-in

**Cause:** `requireAdmin()` not redirecting properly, or callback URL handling  
**Fix:** Verify that non-admin users hit `redirect("/profile?error=forbidden")` and profile page handles `error` query param to show toast.

---

### Session not persisting

**Cause:** Cookie secret misconfigured, or domain mismatch  
**Fix:**
1. Check `NEON_AUTH_CLIENT_SECRET` is set
2. Verify cookie domain (should match your domain)
3. Check browser dev tools → Application → Cookies

---

## Config Reference

### Environment Variables

```bash
# Required
NEON_AUTH_CLIENT_URL=https://<project>.neonauth.<region>.neon.tech/<db>/auth
NEON_AUTH_CLIENT_SECRET=<random-32-byte-base64-string>

# Optional (if using)
NEXT_PUBLIC_APP_URL=http://localhost:3000  # For redirects
```

**How to get values:**
- URL: From Neon console → Auth tab → API endpoint
- Secret: Generated when enabling NeonAuth (reset if lost)

---

## Files

| File | Purpose |
|------|---------|
| `app/lib/auth.ts` | NeonAuth client configuration |
| `app/lib/session/actions.ts` | `getCurrentUserSession()`, `requireAdmin()` |
| `app/auth/sign-in/actions.ts` | Sign-in server action |
| `app/auth/sign-up/actions.ts` | Sign-up server action |
| `app/auth/login/page.tsx` | Login landing page (redirects if logged in) |
| `app/auth/sign-in/page.tsx` | Sign-in form |
| `app/auth/sign-up/page.tsx` | Sign-up form |
| `app/profile/page.tsx` | Profile page for non-admins |
| `app/components/ErrorToastHandler.tsx` | Toast notification component |
| `app/layout.tsx` | Root layout with `Suspense` and `Toaster` |

---

## Related

- **NeonAuth Documentation:** https://neon.tech/docs/authentication
- **Next.js Server Actions:** https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions
- **Security:** See `ARCHITECTURE.md#security-considerations`

---

**Last Updated:** 2026-04-06
