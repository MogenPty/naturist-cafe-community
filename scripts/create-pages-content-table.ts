import { neon } from "@neondatabase/serverless";
import * as dotenv from "dotenv";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS pages_content (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
        section text NOT NULL,
        content_type text NOT NULL,
        text_value text,
        image_public_id text,
        image_alt text,
        sort_order integer DEFAULT 0,
        active boolean DEFAULT true,
        created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
        created_by uuid
      )
    `;

    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS pages_content_section_unique
      ON pages_content(section)
    `;

    console.log("✅ pages_content table created successfully");
  } catch (error) {
    console.error("❌ Error creating table:", error);
    process.exit(1);
  }
}

main();
