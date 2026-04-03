-- Drop existing tables in correct order (respecting dependencies)
DROP TABLE IF EXISTS "events" CASCADE;
DROP TABLE IF EXISTS "board_members" CASCADE;
--DROP TABLE IF EXISTS "settings" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
-- DROP TABLE IF EXISTS "admins" CASCADE;

-- Create new tables according to app/lib/db/schema.ts
-- CREATE TABLE "admins" (
-- 	"user_id" uuid PRIMARY KEY NOT NULL,
-- 	"role" text DEFAULT 'editor' NOT NULL,
-- 	"permissions" jsonb DEFAULT '{}'::jsonb,
-- 	"last_login" timestamp with time zone,
-- 	"created_at" timestamp with time zone DEFAULT now()
-- );
--> statement-breakpoint
CREATE TABLE "board_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"nickname" text,
	"role" text NOT NULL,
	"sort_id" integer NOT NULL,
	"years_in_naturism" integer NOT NULL,
	"other_organizations" jsonb,
	"community_council" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"profile_image_url" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text NOT NULL,
	"start_date" timestamp with time zone NOT NULL,
	"end_date" timestamp with time zone NOT NULL,
	"start_time" timestamp,
	"end_time" timestamp,
	"location" text NOT NULL,
	"recurring" boolean DEFAULT false,
	"recurring_pattern" jsonb,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_by" uuid
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'member' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
