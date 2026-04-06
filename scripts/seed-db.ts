import dotenv from "dotenv";
dotenv.config({ path: ".env" });

console.log("DATABASE_URL:", process.env.DATABASE_URL ? "Set" : "NOT SET");

import { db } from "../app/lib/db";
import * as schema from "../app/lib/db/schema";

async function seedDatabase() {
  console.log("🌱 Starting database seed...");

  // Seed board members
  const boardMembers = [
    {
      name: "Vongani (Vonks) Nkuna",
      role: "Director" as const,
      sortId: 5,
      yearsInNaturism: 8,
      otherOrganizations: ["Naturist Café Arthouse Films"],
      communityCouncil: true,
      active: true,
      nickname: "Vonks",
    },
    {
      name: "Linah (Layla) Mahlomuza",
      role: "Director" as const,
      sortId: 2,
      yearsInNaturism: 12,
      otherOrganizations: ["Naturist Café Arthouse Films"],
      communityCouncil: true,
      active: true,
      nickname: "Layla",
    },
    {
      name: "Solly (RealSollyM) Motsoane",
      role: "Director" as const,
      sortId: 3,
      yearsInNaturism: 6,
      otherOrganizations: ["Bare Bliss Naturists Group"],
      communityCouncil: false,
      active: true,
      nickname: "RealSollyM",
    },
    {
      name: "Valencia (Miss Vee) Mabika",
      role: "Councillor" as const,
      sortId: 7,
      yearsInNaturism: 15,
      otherOrganizations: ["Bare Bliss Naturists Group"],
      communityCouncil: true,
      active: true,
      nickname: "Miss Vee",
    },
    {
      name: "Aobakwe (Buks) Peter",
      role: "Director" as const,
      sortId: 1,
      yearsInNaturism: 4,
      otherOrganizations: [],
      communityCouncil: true,
      active: true,
      nickname: "Buks",
    },
    {
      name: "Rethabile (Ree) Oitsile",
      role: "Councillor" as const,
      sortId: 6,
      yearsInNaturism: 10,
      otherOrganizations: [],
      communityCouncil: true,
      active: true,
      nickname: "Ree",
    },
    {
      name: "Veronica Mabula",
      role: "Director" as const,
      sortId: 4,
      yearsInNaturism: 15,
      otherOrganizations: [],
      communityCouncil: true,
      active: true,
    },
  ];

  // Insert board members
  await db.insert(schema.boardMembers).values(boardMembers);
  console.log(`✅ Inserted ${boardMembers.length} board members`);

  // Seed events (with future dates)
  const now = new Date();
  const currentYear = now.getFullYear();
  const events = [
    {
      title: "Weekend Nature Walk",
      type: "walk" as const,
      startDate: new Date(
        currentYear,
        now.getMonth(),
        Math.max(now.getDate() + 7, 28),
      ),
      endDate: new Date(currentYear, now.getMonth(), now.getDate() + 7),
      startTime: new Date(`1970-01-01T09:00`),
      endTime: new Date(`1970-01-01T12:00`),
      location: "Botanical Gardens",
    },
    {
      title: "Community Market Day",
      type: "market" as const,
      startDate: new Date(currentYear, now.getMonth(), now.getDate() + 14),
      endDate: new Date(currentYear, now.getMonth(), now.getDate() + 14),
      startTime: new Date(`1970-01-01T08:00`),
      endTime: new Date(`1970-01-01T16:00`),
      location: "Community Center",
    },
    {
      title: "Wellness Workshop",
      type: "workshop" as const,
      startDate: new Date(currentYear, now.getMonth(), now.getDate() + 21),
      endDate: new Date(currentYear, now.getMonth(), now.getDate() + 21),
      startTime: new Date(`1970-01-01T14:00`),
      endTime: new Date(`1970-01-01T17:00`),
      location: "NCC Hall",
    },
  ];

  // await db.insert(schema.events).values(events);
  // console.log(`✅ Inserted ${events.length} events`);

  console.log("🎉 Seed completed!");
}

seedDatabase().catch((error) => {
  console.error("❌ Seed failed:", error);
  process.exit(1);
});
