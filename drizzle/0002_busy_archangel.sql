CREATE TABLE "creatorInterests" (
	"id" serial PRIMARY KEY NOT NULL,
	"creatorId" text,
	"categoryId" integer,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "creator" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "creator" ADD COLUMN "profilePictureURL" text;--> statement-breakpoint
ALTER TABLE "creator" ADD COLUMN "age" integer;--> statement-breakpoint
ALTER TABLE "creator" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "creator" ADD COLUMN "country" text;--> statement-breakpoint
ALTER TABLE "creatorInterests" ADD CONSTRAINT "creatorInterests_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creatorInterests" ADD CONSTRAINT "creatorInterests_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;