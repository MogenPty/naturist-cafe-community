# Feature 03: Membership Application

**Epic:** M5 - Membership Application (Future)  
**Priority:** Could Have (Currently Disabled)  
**Status:** 🚧 Placeholder - Disabled  
**Component:** `app/components/JoinUs.tsx`  
**Related:** Formspree, potential backend storage

---

## User Story

**As a prospective member**, I want to apply for NCC membership online, so I can become part of the community without manual paperwork.

---

## Current State

### Implementation

- Form component exists (`JoinUs.tsx`) and is functional client-side
- All form fields use controlled inputs with local `useState`
- Validation: Client-side age check (must be 18+)
- Submit button: **Disabled** with "Membership Application Coming Soon"
- Form uses `@formspree/react` library (installed but not configured)

### Form Fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| First Name | text | Yes | `name="firstName"` |
| Last Name | text | No | `name="lastName"` |
| Nickname/Preferred Name | text | Yes | `name="nickname"` |
| Date of Birth | date | Yes | Validates age ≥ 18 |
| Email | email | Yes | `name="email"` |
| Gender Identity | select | No | Options: Male, Female, Non-binary, Other |
| Province | select | No | South African provinces |
| City | text | No | `name="city"` |
| Naturism Experience | select | No | Levels: new-to-naturism, some-experience, experienced-naturist, longterm-naturist |

### Optional Fields (Not Shown in UI But in State)

These exist in `formData` state but are not rendered as inputs:
- `heardAboutUs` (string)
- `interests` (string[])
- `otherAreasOfInterest` (string)
- `medicalConditions` (string)
- `additionalComments` (string)

_These are placeholders for future expansion._

---

## Issue: Disabled Submit

```tsx
<button
  type="submit"
  disabled
  className="w-full btn-default text-white bg-gray-600 opacity-50 cursor-not-allowed"
>
  {state.submitting
    ? "Submitting Application Form..."
    : "Membership Application Coming Soon"}
</button>
```

**Current:** Button is always disabled regardless of form state.

**Result:** Form cannot be submitted. Users see "Coming Soon" message.

---

## Backend Integration Options

### Option A: Formspree (Quickest)

**Pros:**
- Already have `@formspree/react` installed
- No backend code needed
- Email notifications to admins

**Cons:**
- Form data stored offsite (3rd party)
- Limited querying/filtering
- Monthly submission limits on free tier

**Implementation:**
1. Create Formspree form ID (already have: `xqavrbjr` placeholder)
2. Use `handleSubmit` from `useForm("FORM_ID")`
3. Formspree sends email with submission data

**Code change:**
```ts
const [state, handleSubmit] = useForm("xqavrbjr"); // Already present

const handleLocalSubmit = (e: FormEvent) => {
  e.preventDefault();
  e.stopPropagation();

  if (validateForm() && !state.submitting) {
    handleSubmit(e); // This would send to Formspree
  }
};
```

**Note:** The `handleSubmit(e)` from Formspree expects traditional form submission (not async). Ensure button not disabled and Formspree form ID is valid.

---

### Option B: Backend Server Action (Recommended)

**Pros:**
- Full control over data
- Can store in database (`applications` table)
- Custom validation and workflow
- No third-party limits

**Cons:**
- Requires database table and server action
- More development effort

**Implementation:**

1. **Create schema table:**
```ts
export const applications = pgTable("applications", {
  id: uuid("id").primaryKey().defaultRandom(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name"),
  nickname: text("nickname").notNull(),
  email: text("email").notNull(),
  dateOfBirth: timestamp("date_of_birth", { withTimezone: false }).notNull(),
  gender: text("gender"),
  city: text("city"),
  province: text("province"),
  yearsInNaturism: integer("years_in_naturism"),
  heardAboutUs: text("heard_about_us"),
  interests: jsonb("interests"),
  otherOrganizations: text("other_organizations"),
  communityCouncil: boolean("community_council"),
  medicalConditions: text("medical_conditions"),
  additionalComments: text("additional_comments"),
  status: text("status").default("pending"), // pending, approved, rejected
  reviewedBy: uuid("reviewed_by"), // FK to neon_auth.user
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
```

2. **Create server action:**
```ts
"use server";

import { db } from "@/lib/db";
import { applications } from "@/lib/db/schema";
import { z } from "zod";

const applicationSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  nickname: z.string().min(1),
  email: z.string().email(),
  // ... other fields
});

export async function submitApplication(formData: FormData) {
  const parsed = applicationSchema.parse(Object.fromEntries(formData));

  // Additional age validation
  const birthDate = new Date(parsed.dateOfBirth);
  const age = calculateAge(birthDate);
  if (age < 18) {
    return { error: "You must be 18 or older to apply" };
  }

  await db.insert(applications).values({
    ...parsed,
    dateOfBirth: birthDate,
    status: "pending",
  });

  return { success: true };
}
```

3. **Update component:**
```tsx
import { submitApplication } from "@/app/auth/apply/actions";

const handleLocalSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const result = await submitApplication(new FormData(e.target as HTMLFormElement));
  if (result.error) {
    setErrors({ submit: result.error });
  } else {
    setSubmitted(true);
  }
};
```

---

### Option C: Link to Contact Email

Simplest: Replace form with "Coming Soon" message and email link:

```tsx
<a href="mailto:admin@naturistcafe.co.za?subject=Membership Application" className="btn-primary">
  Request Membership Application
</a>
```

No form needed. Users email directly.

---

## Validation

### Current (Client-side)

**Age validation in `validateForm()`:**

```ts
if (formData.dateOfBirth) {
  const birthDate = new Date(formData.dateOfBirth);
  let age = /* calculate */;
  if (age < 18) {
    newErrors.dateOfBirth = "You must be 18 years or older to join";
  }
}
```

### Recommended (Server-side)

Regardless of integration option, **server-side validation is required**:

- Age ≥ 18
- Email valid format
- Required fields present
- No obviously malicious input (XSS prevention)

---

## Privacy & Legal

### Data Protection

If storing applications:

1. **Secure storage:** Database access restricted to admins only
2. **Encryption at rest:** Neon provides this
3. **Access logs:** Track who views applications
4. **Retention policy:** Delete rejected applications after X months (GDPR)
5. **Data export:** User can request their data (GDPR right)
6. **Deletion:** User can request deletion

### Consent

Add checkbox:
```
[ ] I consent to the processing of my personal data for membership application purposes.
```

Required for GDPR-compliance.

---

## Admin Workflow (Future)

If storing in database:

1. Admin receives notification of new application (email? in-app?)
2. Admin reviews application in `/admin/applications`
3. Admin approves or rejects
4. If approved:
   - Create NeonAuth user account for applicant (or send sign-up invite)
   - Send welcome email
5. If rejected:
   - Send polite rejection email (optional)
   - Mark as rejected in system with reason

---

## Notifications

**Email templates needed:**

1. **Application received** → to applicant
   - "We've received your application, expect review within X days"

2. **Application approved** → to applicant
   - "Congratulations! Your membership is approved. Here's how to create your account..."

3. **Application rejected** → to applicant (optional, depends on policy)
   - Polite explanation

---

## Testing

### Functional

- [ ] Form renders all fields correctly
- [ ] Age validation blocks < 18
- [ ] Age validation allows ≥ 18
- [ ] All field types work (text, select, date)
- [ ] Form submission succeeds (with chosen backend)
- [ ] Error messages display correctly
- [ ] Success state shows after submission

### Accessibility

- [ ] All inputs have labels
- [ ] Error messages announced to screen readers
- [ ] Required fields marked (asterisk or "required")
- [ ] Form submits via keyboard (Enter key)

---

## Decision Matrix

| Decision | Option A (Formspree) | Option B (Backend) | Option C (Email Link) |
|----------|---------------------|-------------------|----------------------|
| Effort | Low | Medium | Very Low |
| Cost | Free tier may suffice | Free (DB already exists) | Free |
| Data Control | Low (Formspree) | Full | Full (via email) |
| Admin UX | Email notifications | In-app review | Manual email |
| Scalability | Limited by Formspree | Unlimited | Manual |
| GDPR Compliance | Need Formspree DPA | Full control | Manual email storage |
| **Recommended** | ❌ Not preferred | ✅ **Yes** | ⚠️ Quick fix only |

---

## Recommendation

**Implement Option B (Backend Server Action)** because:

1. Data stays in our database (full control)
2. Consistent with other admin features (events, board members)
3. Enables future features (application status tracking, audit log)
4. Professional and scalable
5. No third-party dependencies
6. Aligns with architecture (Next.js server actions + Drizzle)

**Estimated effort:** 2-4 hours
- Create `applications` table + migration
- Create server action with validation
- Update component to use server action
- Build admin applications review page (future)

---

## Tasks (if implementing)

- [ ] Create `applications` schema in `app/lib/db/schema.ts`
- [ ] Generate Drizzle migration
- [ ] Run migration (dev and production)
- [ ] Create server action `submitApplication` in `app/auth/apply/actions.ts` (or similar)
- [ ] Add Zod validation schema
- [ ] Update `JoinUs.tsx`:
  - Remove `disabled` prop from button
  - Call server action instead of `handleSubmit` from Formspree
  - Handle success/error states
- [ ] Create admin applications list page (optional: `/admin/applications`)
- [ ] Set up email notifications (optional: using Resend or nodemailer)
- [ ] Update `.env.example` with any new config
- [ ] Test end-to-end
- [ ] Document admin workflow for reviewing applications

---

## Related Files

- `app/components/JoinUs.tsx` - Form component
- `app/utils/age-restrictions.ts` - Age calculation utilities
- `app/utils/age-utils.ts` - Age helper
- `PRD.md` - Feature 5.1

---

**Status:** Blocked until decision made (Option B recommended)

**Last Updated:** 2026-04-06
