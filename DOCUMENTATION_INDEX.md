# Documentation Index

**Created:** 2026-04-06  
**Purpose:** Central index for all project documentation

---

## Quick Navigation

### Product & Planning
- **PRD.md** - Product Requirements Document (vision, personas, features, roadmap)
- **features/** - Individual feature specs (numbered 01-06)

### Technical
- **ARCHITECTURE.md** - System architecture, database design, auth, deployment
- **NEXTJS_MIGRATION_PLAN.md** - Vite → Next.js migration history

### Process & Quality
- **ADMIN_PANEL_PLAN.md** - Admin panel implementation plan (complete)
- **ADMIN_CLEAN-UP_PLAN.md** - Code cleanup and security fixes (mostly complete)
- **IMPLEMENTATION_LOG.md** *(create if needed)* - Chronological log of changes

---

## Features (`/features`)

| # | Feature | Status | File |
|---|---------|--------|------|
| 01 | Public Website | ✅ Implemented | `01-public-website.md` |
| 02 | Age Gate | ✅ Implemented | `02-age-gate.md` |
| 03 | Membership Application | 🚧 Disabled | `03-membership-application.md` |
| 04 | Authentication & Authorization | ✅ Implemented | `04-authentication.md` |
| 05 | Admin Panel | ✅ Implemented | `05-admin-panel.md` |
| 06 | User Profiles | ✅ Implemented | `06-user-profiles.md` |

**Index file:** `features/README.md`

---

## Key Decisions (Tracking)

### Architecture
- ✅ Use Next.js 16 App Router
- ✅ Use Neon Postgres with Drizzle ORM
- ✅ Use NeonAuth for authentication (not NextAuth)
- ✅ Standard Vercel Node.js runtime (not Edge)
- ✅ Server Actions for mutations
- ✅ Server Components by default

### Database
- ✅ Single source of truth: `neon_auth.user` for user accounts
- ✅ `admins` table extends `neon_auth.user` for role-based access
- ⚠️ `users` table deprecated (pending removal)
- ✅ Drizzle migrations in `/drizzle`

### Security
- ✅ Plaintext password vulnerability fixed (dropped column)
- ✅ Console credential logging removed
- ✅ Form accessibility fixed (labels + IDs + `useId()`)
- ⚠️ TCP driver switch recommended but not yet implemented
- ⚠️ Rate limiting not implemented

---

## Work in Progress

### Current Sprint (Phase 2 Polish)
- [ ] Comprehensive testing (auth, CRUD, public pages)
- [ ] Switch to TCP driver (`@neondatabase/driver`)
- [ ] Remove deprecated `users` table entirely (after verifying dependencies)
- [ ] Disable/clean up `JoinUs.tsx` form or enable with backend
- [ ] Add proper loading states
- [ ] Accessibility audit
- [ ] Apply database migrations to production

### Backlog (Future)
- See PRD.md Roadmap sections

---

## How to Contribute

### Reading
1. Start with **PRD.md** for product context
2. Read **ARCHITECTURE.md** for technical context
3. Browse **features/** for specific functionality specs
4. Check **ADMIN_CLEAN-UP_PLAN.md** for known issues

### Developing
1. Follow architecture decisions in `ARCHITECTURE.md`
2. Implement features per `features/NN-name.md` specs
3. Update status in `features/README.md` when complete
4. Document any deviations or new decisions

### Testing
1. Use testing checklists in feature files
2. Verify acceptance criteria before marking complete
3. Update `IMPLEMENTATION_LOG.md` with test results

---

## Maintenance

### When Adding a New Feature

1. Create `features/XX-feature-name.md` (use next available number)
2. Update `features/README.md` index
3. Add to PRD.md roadmap if architectural impact
4. Update `ARCHITECTURE.md` if database/API changes
5. Mark status accordingly

### When Architecture Changes

1. Update `ARCHITECTURE.md` first
2. Update relevant feature files
3. Document decision in `IMPLEMENTATION_LOG.md` or create decision record
4. Communicate to team

### Before Release

- [ ] All feature specs up-to-date
- [ ] Architecture reflects current state
- [ ] PRD roadmap validated
- [ ] Testing complete per checklists
- [ ] Known issues documented

---

## Related Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Documentation](https://neon.tech/docs)
- [NeonAuth](https://neon.tech/docs/authentication)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Maintainers:** NCC Development Team  
**Review Cycle:** Monthly or per release
