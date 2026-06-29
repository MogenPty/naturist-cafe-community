import { asc, desc, eq, gte, lt } from "drizzle-orm";
import { db } from "./index";
import * as schema from "./schema";

// ==================== EVENTS ====================

/**
 * Get all events, sorted by start date (ascending)
 */
export async function getAllEvents() {
  return db.select().from(schema.events).orderBy(asc(schema.events.startDate));
}

/**
 * Get upcoming events (start date >= today)
 */
export async function getUpcomingEvents() {
  const now = new Date();
  return db
    .select()
    .from(schema.events)
    .where(gte(schema.events.startDate, now))
    .orderBy(asc(schema.events.startDate));
}

/**
 * Get past events (start date < today)
 */
export async function getPastEvents() {
  const now = new Date();
  return db
    .select()
    .from(schema.events)
    .where(lt(schema.events.startDate, now))
    .orderBy(desc(schema.events.startDate));
}

/**
 * Get event by ID
 */
export async function getEventById(id: string) {
  return db
    .select()
    .from(schema.events)
    .where(eq(schema.events.id, id))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

/**
 * Get events by type
 */
export async function getEventsByType(type: "walk" | "market" | "workshop") {
  return db
    .select()
    .from(schema.events)
    .where(eq(schema.events.type, type))
    .orderBy(asc(schema.events.startDate));
}

// ==================== BOARD MEMBERS ====================

/**
 * Get all board members, sorted by sortId
 */
export async function getAllBoardMembers() {
  return db
    .select()
    .from(schema.boardMembers)
    .orderBy(asc(schema.boardMembers.sortId));
}

/**
 * Get active board members only
 */
export async function getActiveBoardMembers(): Promise<schema.BoardMember[]> {
  return db.query.boardMembers.findMany({
    where: eq(schema.boardMembers.active, true),
    orderBy: asc(schema.boardMembers.sortId),
  });
}

/**
 * Get board member by ID
 */
export async function getBoardMemberById(id: string) {
  return db
    .select()
    .from(schema.boardMembers)
    .where(eq(schema.boardMembers.id, id))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

/**
 * Get board members by role
 */
export async function getBoardMembersByRole(role: "Director" | "Councillor") {
  return db
    .select()
    .from(schema.boardMembers)
    .where(eq(schema.boardMembers.role, role))
    .orderBy(asc(schema.boardMembers.sortId));
}

// ==================== ADMINS ====================

/**
 * Get admin by user ID
 */
export async function getAdminByUserId(userId: string) {
  return db
    .select()
    .from(schema.admins)
    .where(eq(schema.admins.userId, userId))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

/**
 * Check if user is an admin
 */
export async function isAdmin(userId: string) {
  const admin = await getAdminByUserId(userId);

  if (!admin) return false;

  return ["superadmin", "admin", "editor"].includes(admin.role);
}

/**
 * Get all admins with user details from neonAuth
 */
export async function getAllAdmins() {
  return db
    .select({
      id: schema.admins.userId,
      userId: schema.admins.userId,
      role: schema.admins.role,
      permissions: schema.admins.permissions,
      lastLogin: schema.admins.lastLogin,
      createdAt: schema.admins.createdAt,
      updatedAt: schema.admins.updatedAt,
      // NeonAuth user fields
      neonAuthId: schema.userInNeonAuth.id,
      name: schema.userInNeonAuth.name,
      email: schema.userInNeonAuth.email,
      emailVerified: schema.userInNeonAuth.emailVerified,
      image: schema.userInNeonAuth.image,
    })
    .from(schema.admins)
    .innerJoin(
      schema.userInNeonAuth,
      eq(schema.admins.userId, schema.userInNeonAuth.id),
    )
    .orderBy(desc(schema.admins.createdAt));
}

// ==================== PAGES CONTENT ====================

/**
 * Get all content items, sorted by section
 */
export async function getAllContent() {
  return db
    .select()
    .from(schema.pagesContent)
    .orderBy(schema.pagesContent.sortOrder);
}

/**
 * Get content by section (unique)
 */
export async function getContentBySection(section: string) {
  return db
    .select()
    .from(schema.pagesContent)
    .where(eq(schema.pagesContent.section, section))
    .limit(1)
    .then((rows) => rows[0] ?? null);
}

export async function getContentTextBySection(section: string) {
  return db
    .select()
    .from(schema.pagesContent)
    .where(eq(schema.pagesContent.section, section))
    .limit(1)
    .then((rows) => rows[0].textValue ?? null);
}

/**
 * Get content by ID
 */
export async function getContentById(id: string) {
  return db.query.pagesContent.findFirst({
    where: eq(schema.pagesContent.id, id),
  });
}

/**
 * Get active content items only
 */
export async function getActiveContent() {
  return db
    .select()
    .from(schema.pagesContent)
    .where(eq(schema.pagesContent.active, true))
    .orderBy(schema.pagesContent.sortOrder);
}
