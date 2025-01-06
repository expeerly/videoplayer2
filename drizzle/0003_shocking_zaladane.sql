ALTER TABLE "rating" RENAME COLUMN "creatorId" TO "categoryId";--> statement-breakpoint
ALTER TABLE "rating" DROP CONSTRAINT "rating_creatorId_creator_id_fk";
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;