import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// Load .env.local
dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "./app/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
