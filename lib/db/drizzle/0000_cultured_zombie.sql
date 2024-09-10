DO $$ BEGIN
 CREATE TYPE "public"."service" AS ENUM('software_development', 'devops', 'qa', 'ui_ux', 'consulting', 'support');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('pending', 'cancelled', 'active');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "inquiry" (
	"id" serial PRIMARY KEY NOT NULL,
	"full_name" text NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(15) NOT NULL,
	"budget" integer NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"service_requested" "service" NOT NULL,
	"about_project" varchar(1024),
	"additional_info" jsonb,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resources" (
	"id" varchar(191) PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
