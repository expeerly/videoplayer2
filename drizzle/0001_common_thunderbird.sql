CREATE TABLE "rating" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text,
	"creatorId" text,
	"rating" real NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;