# Feature 06: User Profiles

**Epic:** M2 - Authentication & User Management  
**Priority:** Should Have  
**Status:** ✅ Implemented (Basic)  
**Route:** `/profile`  
**Component:** `app/profile/page.tsx`

---

## User Story

**As a logged-in member**, I want to see my profile information so I know my account details and can log out.

---

## Overview

The profile page serves as a landing page for authenticated users who are **not** administrators. It displays basic user information and provides a logout option. Non-admin users who try to access `/admin` are redirected here with an error toast.

---

## Implementation

### Page Component (`app/profile/page.tsx`)

Server component that requires authentication but **not** admin privileges.

```tsx
import { getCurrentUserSession } from "@/lib/session/actions";

export default async function ProfilePage() {
  const user = await getCurrentUserSession(); // Throws redirect if not logged in

  return (
    <div>
      <h1>My Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <form action={handleSignOut}>
        <button type="submit" formAction={handleSignOut}>Sign Out</button>
      </form>
    </div>
  );
}
```

**Key Points:**
- Uses `getCurrentUserSession()` → redirects to `/auth/sign-in` if not authenticated
- Shows `user.name` and `user.email` from NeonAuth session
- Provides sign-out button (server action form)

---

### Sign-Out Action

**Defined in:** `app/profile/page.tsx` (inline server action)

```tsx
"use server";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const handleSignOut = async () => {
  await auth.signOut();
  redirect("/auth/login"); // Back to landing page
};
```

**Alternative:** Could be in `app/lib/session/actions.ts` for reuse.

---

## Access Control

| User Type | Access to `/profile` | Behavior |
|-----------|---------------------|----------|
| Unauthenticated | ❌ Denied | Redirect to `/auth/sign-in` |
| Authenticated non-admin | ✅ Allowed | Shows profile page |
| Authenticated admin | ⚠️ Allowed | Can view but admin should use `/admin` instead |

**Note:** Admins *can* access `/profile` (no explicit deny), but the UX expects them to use `/admin`. Could add check to redirect admins to `/admin` if desired.

---

## Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/profile` | `app/profile/page.tsx` | Authenticated users only |
| `/profile?error=forbidden` | Same page with toast | Triggered when non-admin hits `/admin` |

---

## Error Handling

### `?error=forbidden`

When non-admin tries to access `/admin`:

1. `requireAdmin()` detects user not in `admins` table
2. `redirect("/profile?error=forbidden")`
3. `ErrorToastHandler` shows: **"You do not have permission to access that resource."**

**User Experience:**
- Redirected to profile page
- Toast notification appears (auto-dismisses after 5s)
- User understands they lack admin access

---

## Future Enhancements

### Tier 1 (Quick Wins)

1. **Better profile display:**
   - Show account creation date
   - Show email verification status (`user.emailVerified`)
   - Show profile picture if available (`user.image`)
   - Show bio/description (future field)

2. **Profile settings:**
   - Change display name
   - Change password (NeonAuth supports)
   - Update profile picture (Cloudinary integration)

3. **Admin promotion UI (for superadmins):**
   - List all users
   - Promote/demote to/from admin
   - From profile page of other users (future: `/admin/users`)

---

### Tier 2 (Medium)

4. **Activity history:**
   - Recent sign-in timestamps
   - Admin actions taken by user (if any)
   - Applications submitted (if membership app enabled)

5. **Email preferences:**
   - Newsletter subscription
   - Event reminders
   - Notification frequency

6. **Connected accounts:**
   - Show linked OAuth providers (Google, Facebook if added)
   - Unlink/relink accounts

---

### Tier 3 (Long-term)

7. **Full settings page:**
   - Split into sections: Profile, Security, Privacy, Notifications
   - Two-factor authentication setup
   - Active sessions management (sign out elsewhere)

8. **Member directory (optional):**
   - Opt-in: allow other members to see your contact info
   - Privacy controls: who can see profile (admins only, all members, public)

9. **API tokens:**
   - Generate tokens for programmatic access
   - Manage existing tokens

---

## Design Considerations

**Current:** Very basic page (placeholder quality)

**Recommended Design:**
- Card-based layout with profile header (avatar, name, role)
- Stats: member since, last login, account status (verified/banned)
- Settings section with form fields
- Consistent with admin panel design but lighter theme

---

## Security

### ✅ Good

- Server-side authentication check (`getCurrentUserSession`)
- No data leakage to unauthenticated users
- Server action for sign-out uses `auth.signOut()` (secure)

### ⚠️ To Address

- **Email display:** Consider masking (e.g., `j***@example.com`) if privacy concerns
- **Account info exposure:** Currently shows `user.name` directly - ensure no sensitive fields included
- **CSRF protection:** Sign-out form should have CSRF token (Next.js server actions include automatically)

---

## Related Features

- **Feature 04:** Authentication - provides `getCurrentUserSession()` and session mechanics
- **Feature 05:** Admin Panel - non-admins redirected here with error toast
- **Feature 07:** Membership Application - if enabled, applications should be linked to user ID

---

## Testing

### Functional

- [ ] Unauthenticated user → redirected to sign-in
- [ ] Authenticated non-admin → can view profile
- [ ] Signed-in admin → can view (even though they should use `/admin`)
- [ ] Sign-out button logs out and redirects to `/auth/login`
- [ ] Navigation from `/admin?error=forbidden` shows toast correctly

### Data Display

- [ ] User's name displayed correctly
- [ ] User's email displayed correctly
- [ ] All fields from `neon_auth.user` accessible (if shown)

---

## Notes

- Currently very simple - can be expanded into full settings hub
- Could merge with "My Applications" if membership app feature enabled
- Could integrate with future "Profile" database table for extended profile data beyond NeonAuth

---

**Last Updated:** 2026-04-06
