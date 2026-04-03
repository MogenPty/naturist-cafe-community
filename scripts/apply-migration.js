const { neon } = require("@neondatabase/serverless");
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

async function applyMigration() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set in .env.local");
    process.exit(1);
  }

  try {
    const sql = neon(databaseUrl);
    const migrationPath = path.join(process.cwd(), "drizzle/0000_youthful_azazel.sql");
    const migrationSql = fs.readFileSync(migrationPath, "utf-8");

    console.log("Applying migration...");
    await sql.unsafe(migrationSql);
    console.log("✅ Migration applied successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  }
}

applyMigration();
