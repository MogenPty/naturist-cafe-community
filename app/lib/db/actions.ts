"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "./index";
import * as schema from "./schema";
import { requireAdmin } from "../auth";

// ==================== EVENTS ====================

/**
 * Create a new event
 */
export async function createEvent(formData: FormData) {
  const { user } = await requireAdmin();

  // Parse and validate form data
  const data = Object.fromEntries(formData.entries());

  // Validate with Zod
  const validatedData = schema.insertEventSchema.parse({
    ...data,
    startDate: new Date(data.startDate as string),
    endDate: new Date(data.endDate as string),
    startTime: data.startTime ? new Date(`1970-01-01T${data.startTime}`) : null,
    endTime: data.endTime ? new Date(`1970-01-01T${data.endTime}`) : null,
    recurring: data.recurring === "on" || data.recurring === "true",
    recurringPattern: data.recurringPattern
      ? JSON.parse(data.recurringPattern as string)
      : null,
  });

  const result = await db
    .insert(schema.events)
    .values({
      ...validatedData,
      createdBy: user.id,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/admin/events");

  return { success: true, event: result[0] };
}

/**
 * Update an existing event
 */
export async function updateEvent(id: string, formData: FormData) {
  await requireAdmin();

  const data = Object.fromEntries(formData.entries());

  const validatedData = schema.updateEventSchema.parse({
    ...data,
    startDate: data.startDate ? new Date(data.startDate as string) : undefined,
    endDate: data.endDate ? new Date(data.endDate as string) : undefined,
    startTime: data.startTime
      ? new Date(`1970-01-01T${data.startTime}`)
      : undefined,
    endTime: data.endTime ? new Date(`1970-01-01T${data.endTime}`) : undefined,
    recurring: data.recurring === "on" || data.recurring === "true",
    recurringPattern: data.recurringPattern
      ? JSON.parse(data.recurringPattern as string)
      : undefined,
    updatedAt: new Date(),
  });

  const result = await db
    .update(schema.events)
    .set(validatedData)
    .where(eq(schema.events.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Event not found");
  }

  revalidatePath("/");
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}/edit`);

  return { success: true, event: result[0] };
}

/**
 * Delete an event
 */
export async function deleteEvent(id: string) {
  await requireAdmin();

  const result = await db
    .delete(schema.events)
    .where(eq(schema.events.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Event not found");
  }

  revalidatePath("/");
  revalidatePath("/admin/events");

  return { success: true };
}

// ==================== BOARD MEMBERS ====================

/**
 * Create a new board member
 */
export async function createBoardMember(formData: FormData) {
  const { user } = await requireAdmin();

  const data = Object.fromEntries(formData.entries());

  // Parse otherOrganizations as array
  const orgsString = data.otherOrganizations as string;
  const otherOrganizations = orgsString
    ? orgsString
        .split(",")
        .map((org) => org.trim())
        .filter(Boolean)
    : [];

  const validatedData = schema.insertBoardMemberSchema.parse({
    name: data.name as string,
    nickname: data.nickname as string | undefined,
    role: data.role as "Director" | "Councillor",
    sortId: parseInt(data.sortId as string, 10),
    yearsInNaturism: parseInt(data.yearsInNaturism as string, 10),
    otherOrganizations,
    communityCouncil:
      data.communityCouncil === "on" || data.communityCouncil === "true",
    active: data.active === "on" || data.active === "true",
    profileImageUrl: data.profileImageUrl as string | undefined,
  });

  const result = await db
    .insert(schema.boardMembers)
    .values({
      ...validatedData,
      createdBy: user.id,
    })
    .returning();

  revalidatePath("/");
  revalidatePath("/admin/board");

  return { success: true, member: result[0] };
}

/**
 * Update a board member
 */
export async function updateBoardMember(id: string, formData: FormData) {
  await requireAdmin();

  const data = Object.fromEntries(formData.entries());

  const orgsString = data.otherOrganizations as string;
  const otherOrganizations = orgsString
    ? orgsString
        .split(",")
        .map((org) => org.trim())
        .filter(Boolean)
    : [];

  const validatedData = schema.updateBoardMemberSchema.parse({
    name: data.name as string,
    nickname: data.nickname as string | undefined,
    role: data.role as "Director" | "Councillor",
    sortId: parseInt(data.sortId as string, 10),
    yearsInNaturism: parseInt(data.yearsInNaturism as string, 10),
    otherOrganizations,
    communityCouncil:
      data.communityCouncil === "on" || data.communityCouncil === "true",
    active: data.active === "on" || data.active === "true",
    profileImageUrl: data.profileImageUrl as string | undefined,
    updatedAt: new Date(),
  });

  const result = await db
    .update(schema.boardMembers)
    .set(validatedData)
    .where(eq(schema.boardMembers.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Board member not found");
  }

  revalidatePath("/");
  revalidatePath("/admin/board");
  revalidatePath(`/admin/board/${id}/edit`);

  return { success: true, member: result[0] };
}

/**
 * Delete a board member
 */
export async function deleteBoardMember(id: string) {
  await requireAdmin();

  const result = await db
    .delete(schema.boardMembers)
    .where(eq(schema.boardMembers.id, id))
    .returning();

  if (result.length === 0) {
    throw new Error("Board member not found");
  }

  revalidatePath("/");
  revalidatePath("/admin/board");

  return { success: true };
}
