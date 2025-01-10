ALTER TABLE "rating" RENAME COLUMN "categoryId" TO "creatorId";--> statement-breakpoint
ALTER TABLE "rating" DROP CONSTRAINT "rating_categoryId_category_id_fk";
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;