---
name: Membership Application Feature Implementation Plan
description: Plan for implementing membership application form, DB schema, admin panel, email services, reference number flow, and appeal process
type: project
---
## Context
The NCC platform currently lacks a dedicated membership application system. We need to implement a complete workflow where visitors can apply for membership, receive status updates via email, admins can review applications, and applicants can appeal decisions using a persistent reference number.

## Recommended Approach
I will implement this feature using the following components:
1. New database schema for membership applications (including reference numbers, status tracking)
2. Email templates stored in database with default subjects
3. Admin panel for application management with status segmentation
4. Email sending service for all status transitions
5. Reference number persistence across appeal cycles

## Critical Files to Modify/Create
- `app/admin/components/MembershipApplicationForm.tsx` - Visitor application form
- `app/admin/components/ApplicationList.tsx` - Admin dashboard for application management
- `lib/db/schema.ts` - Extend schema with applications and email templates tables
- `lib/db/actions/applications.ts` - Application management logic
- `lib/email/templates.ts` - Email content templates
- `lib/email/send.ts` - Email sending service

## Verification Plan
- Test end-to-end application submission flow
- Verify reference number persists across all email communications
- Confirm admin dashboard shows correct status segmentation
- Validate email templates render correctly with subject lines

This plan addresses all requirements including the reference number workflow, appeal process, payment instructions, and admin status management.