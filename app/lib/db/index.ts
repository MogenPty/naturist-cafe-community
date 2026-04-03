import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

config({ path: ".env" });

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}
const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export type DB = typeof db;

export * from "./schema";
export * from "./queries";
