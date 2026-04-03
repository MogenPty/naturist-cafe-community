import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import type { z } from "zod";

// Events table
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
  createdBy: uuid("created_by"), // References neon_auth.users.id (no FK constraint)
});

// Board members table
export const boardMembers = pgTable("board_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  nickname: text("nickname"),
  role: text("role").notNull().$type<"Director" | "Councillor">(),
  sortId: integer("sort_id").notNull(),
  yearsInNaturism: integer("years_in_naturism").notNull(),
  otherOrganizations: jsonb("other_organizations"),
  communityCouncil: boolean("community_council").default(false),
  active: boolean("active").default(true),
  profileImageUrl: text("profile_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  createdBy: uuid("created_by"), // References neon_auth.users.id (no FK constraint)
});

// Admins table (extends NeonAuth users)
export const admins = pgTable("admins", {
  userId: uuid("user_id").primaryKey(), // References neon_auth.users.id (no FK constraint)
  role: text("role")
    .notNull()
    .default("editor")
    .$type<"superadmin" | "admin" | "editor">(),
  permissions: jsonb("permissions").default({}),
  lastLogin: timestamp("last_login", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role: text("role")
    .notNull()
    .default("member")
    .$type<"superadmin" | "admin" | "editor" | "member">(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

// NeonAuth users table reference (created by NeonAuth in neon_auth schema)
// We don't define it in Drizzle, but we can reference it with raw SQL
// For now, we'll skip the foreign key constraint and just store the UUID
// The actual user record lives in neon_auth.users

export const selectEventSchema = createSelectSchema(events).pick({
  id: true,
  title: true,
  type: true,
  startDate: true,
  endDate: true,
  startTime: true,
  endTime: true,
  location: true,
});

// Zod schemas for validation
export const insertEventSchema = createInsertSchema(events).pick({
  id: true,
  title: true,
  // description: true,
  type: true,
  startDate: true,
  endDate: true,
  startTime: true,
  endTime: true,
  location: true,
  // recurring: true,
  // recurringPattern: true,
});

export const updateEventSchema = createUpdateSchema(events).pick({
  title: true,
  // description: true,
  type: true,
  startDate: true,
  endDate: true,
  startTime: true,
  endTime: true,
  location: true,
  // recurring: true,
  // recurringPattern: true,
  updatedAt: true,
});

export const selectBoardMemberSchema = createSelectSchema(boardMembers).pick({
  name: true,
  nickname: true,
  role: true,
  sortId: true,
  yearsInNaturism: true,
  otherOrganizations: true,
  communityCouncil: true,
  active: true,
  profileImageUrl: true,
});

export const insertBoardMemberSchema = createInsertSchema(boardMembers).pick({
  name: true,
  nickname: true,
  role: true,
  sortId: true,
  yearsInNaturism: true,
  otherOrganizations: true,
  communityCouncil: true,
  active: true,
  profileImageUrl: true,
});

export const updateBoardMemberSchema = createUpdateSchema(boardMembers).pick({
  name: true,
  nickname: true,
  role: true,
  sortId: true,
  yearsInNaturism: true,
  otherOrganizations: true,
  communityCouncil: true,
  active: true,
  profileImageUrl: true,
  updatedAt: true,
});

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type UpdateEvent = z.infer<typeof updateEventSchema>;
export type InsertBoardMember = z.infer<typeof insertBoardMemberSchema>;
export type UpdateBoardMember = z.infer<typeof updateBoardMemberSchema>;

// Helper type inferences
export type Event = typeof events.$inferSelect;
export type BoardMember = typeof boardMembers.$inferSelect;
export type Admin = typeof admins.$inferSelect;
export type User = typeof users.$inferSelect;
