import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon("postgresql://neondb_owner:npg_VihjsK48UxWZ@ep-late-surf-aepf8st1-pooler.c-2.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require");
export const db = drizzle(sql, { schema });

export type DB = typeof db;

export * from "./schema";
export * from "./queries";
