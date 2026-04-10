# Admin Management Implementation Plan

## Overview

This plan outlines the implementation of admin management functionality including:

1. Listing admins from the database
2. Changing admin roles between "superadmin", "admin", "editor", and "none"
3. Implementing role-based permissions
4. Creating an admin management interface

## Current State Analysis

### Database Schema

From `app/lib/db/schema.ts`, we have:

- `admins` table with:
  - `userId` (references neon_auth.users.id)
  - `role` (enum: "superadmin" | "admin" | "editor", default: "editor")
  - `permissions` (JSONB, default: {})
  - `lastLogin`, `createdAt`, `updatedAt`

- `users` table (deprecated but still exists):
  - `role` (enum: "superadmin" | "admin" | "editor" | "member", default: "member")

### Auth System

- Uses NeonAuth for authentication
- `getUserWithRole()` in `app/lib/session/actions.ts` fetches user role from admins table
- `requireAdmin()` redirects non-admins to profile with error

## Implementation Approach

### Permission Strategy: Role-Based Access Control (RBAC)

Given the small team size (up to 8 people), role-based permissions are more manageable than per-user permissions.

#### Roles Hierarchy:

1. **superadmin** - Full access to everything including admin management
   - Can manage other admins (promote/demote/remove)
     - CAN promote/demote/remove superadmin
     - Cannot remove themselves
     - When removing, this should remove the user from neon_auth.users table
   - Can access all admin panels
   - Only assignable by other superadmins or manual DB insert

2. **admin** - Full access to content and event management
   - Can manage other admins except for superadmin (promote/demote/remove)
     - Cannot promote/demote/remove superadmin
     - Cannot remove themselves
     - When removing, this should remove the user from neon_auth.users table
   - Can create/edit/delete events
   - Can create/edit/delete content
   - Can manage board members

3. **editor** - Limited access to content management only
   - Can create/edit/delete content
   - Can create/edit events but can only delete future events created by themselves
   - Can create/edit board members but cannot delete
   - Cannot manage admins

4. **none** - No admin access (role set to none, make this default for new users)
   - Redirects to profile page when trying to access admin
   - When creating a new user, the role should default to "none"
   - When logging in, this user will be redirected to the profile page

### Permission Implementation Options:

#### Option 1: Role-Based Checks (Recommended)

- Check user role from `admins` table on each protected route/action
- Simple to implement and understand
- Easy to audit
- Suitable for small team

#### Option 2: Permission JSONB + Role Hierarchy

- Store granular permissions in `permissions` JSONB field
- More flexible but complex
- Overkill for current team size

**Recommendation**: Use Option 1 (role-based) for simplicity, with Option 2 as future enhancement.

**Decision**: Go with Option 1. Remove the `permissions` JSONB field from the `admins` table.

## Implementation Steps

### 1. Admin Management Page

Create `/app/admin/admins/page.tsx` to list and manage admins

### 2. Admin Management Components

- AdminList component
- AdminForm component (for editing roles)
- RoleSelector component
- Permission display (if implementing JSONB permissions)

### 3. Database Queries

Create queries in `app/lib/db/queries.ts`:

- `getAllAdminsWithUserInfo()` - Join with neon_auth.users to get email/name
- `updateAdminRole(userId, role)` - Update role in admins table
- Optionally: `removeAdmin(userId)` - Remove from admins table (soft delete preferred)
  - Have 2-state removal (1) soft delete (2) hard delete

### 4. Server Actions

Create server actions in `app/lib/db/actions.ts`:

- `updateAdminRole`
- `removeAdmin` (if implementing hard delete)
  - Have 2-state removal (1) soft delete (2) hard delete
- `getAdminsForManagement` (if needed)

### 5. Route Protection Enhancements

Update `requireAdmin()` or create new protection functions:

- `requireRole(allowedRoles)` - Generic role checker
- `requireSuperadmin()` - For admin management routes
- `requireAdminOrEditor()` - For content management

### 6. UI Components

- Admin table with columns: Name, Email, Role, Last Login, Actions
- Role dropdown with options: superadmin, admin, editor, none
- Confirmation dialogs for role changes
- Loading states and error handling

### 7. Integration Points

- Add link to Admin Management in admin sidebar
- Update `requireAdmin()` to handle "none" role appropriately
- Ensure superadmin cannot demote themselves if they're the last superadmin

## Files to Create/Modify

### New Files:

1. `app/admin/admins/page.tsx` - Admin management page
2. `app/admin/components/AdminList.tsx` - List of admins
3. `app/admin/components/AdminForm.tsx` - Form to edit admin role
4. `app/admin/components/RoleSelector.tsx` - Role selection dropdown
5. `app/lib/db/queries.ts` - Add admin-related queries
6. `app/lib/db/actions.ts` - Add admin-related server actions

### Existing Files to Modify:

1. `app/admin/layout.tsx` - Add nav link to Admin Management
2. `app/lib/session/actions.ts` - Enhance role checking functions
3. `app/admin/page.tsx` - Update admin count stat (fix existing TODO)

## Detailed Component Specifications

### AdminList Component

Props: admins: Array<{id, userId, name, email, role, lastLogin, permissions}>

- Table with sortable columns
- Action buttons: Edit Role, Remove (if permitted)
- Loading and error states

### AdminForm Component

Props: admin: AdminData, onUpdate: Function, onCancel: Function

- Form with:
  - Name (read-only)
  - Email (read-only)
  - Role dropdown (superadmin/admin/editor/none)
  - Permissions viewer/editor (if implementing JSONB)
  - Last login timestamp (read-only)
  - Save and Cancel buttons

### RoleSelector Component

Props: value: Role, onChange: Function, disabled: Boolean

- Dropdown with role options
- Tooltips explaining each role's permissions
- Disabled state for self-role changes (when appropriate)

## Permission Checking Implementation

### Enhanced Session Actions

Modify `app/lib/session/actions.ts`:

```typescript
// Add role checking functions
export async function requireRole(allowedRoles: string[]) {
  const { user, role } = await getUserWithRole();

  if (!role) {
    redirect("/profile?error=forbidden");
  }

  if (!allowedRoles.includes(role)) {
    redirect("/profile?error=insufficient-permissions");
  }

  return { user, role };
}

export async function requireSuperadmin() {
  return requireRole(["superadmin"]);
}

export async function requireAdminOrEditor() {
  return requireRole(["superadmin", "admin", "editor"]);
}
```

### Usage in Pages

- Admin management page: `requireSuperadmin()`
- Events management: `requireAdminOrEditor()`
- Content management: `requireAdminOrEditor()` (editors can edit content)
- Board management: `requireAdminOrEditor()` or `requireRole(["superadmin", "admin"])` depending on requirements

## Security Considerations

1. **Self-Promotion Prevention**: Prevent users from promoting themselves to superadmin
2. **Last Superadmin Protection**: Prevent demotion/deletion of last superadmin
3. **Audit Logging**: Log all admin role changes (future enhancement)
4. **Rate Limiting**: Consider rate limiting on admin management actions
5. **Confirmation Dialogs**: Require confirmation for sensitive actions

## Testing Plan

### Unit Tests

- Test role checking functions
- Test admin queries and mutations

### Integration Tests

- Test admin management page access control
- Test role change workflows
- Test permission enforcement on protected routes

### Manual Testing Scenarios

1. Superadmin can access admin management page
2. Admin/editor cannot access admin management page (redirects)
3. Superadmin can change roles of other admins
4. Superadmin cannot demote themselves if last superadmin
5. Role changes take effect immediately (verified by accessing protected routes)
6. UI reflects current roles accurately

## Future Enhancements

1. **JSONB Permissions**: Implement granular permissions stored in `permissions` field
2. **Audit Log**: Track who changed what and when
3. **Bulk Operations**: Select multiple admins for role changes
4. **Invitation System**: Invite new admins via email
5. **Session Invalidation**: Force re-login on role change
6. **Role Templates**: Predefined permission sets for common roles

## Estimated Effort

- Database queries/actions: 2 hours
- UI components: 4 hours
- Page implementation: 2 hours
- Integration and testing: 2 hours
- **Total**: ~10 hours

## Dependencies

- No new external dependencies required
- Uses existing Drizzle ORM and Next.js patterns
- Leverages existing auth and session infrastructure

## Risks and Mitigations

1. **Risk**: Accidentally locking out all admins
   - Mitigation: Implement last superadmin protection
   - Mitigation: Provide manual DB reset instructions

2. **Risk**: Confusion between `users` table role and `admins` table role
   - Mitigation: Deprecate `users` table role usage
   - Mitigation: Ensure all auth flows use `admins` table role

3. **Risk**: Performance issues with large admin list
   - Mitigation: Not applicable for <8 admins
   - Mitigation: Add pagination if needed in future

## Acceptance Criteria

1. [ ] Admin management page accessible only to superadmins
2. [ ] Page lists all admins with name, email, role, last login
3. [ ] Superadmin can change role of any admin (except self-promotion restrictions)
4. [ ] Role changes take effect immediately for access control
5. [ ] Appropriate confirmation dialogs for destructive actions
6. [ ] Loading and error states handled gracefully
7. [ ] Responsive design works on mobile and desktop
8. [ ] Existing admin functionality (events, content, board) unchanged
9. [ ] Admin count stat in dashboard shows accurate count
10. [ ] No TypeScript compilation errors
