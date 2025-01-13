CREATE TABLE "brand" (
	"id" text PRIMARY KEY NOT NULL,
	"brandName" text NOT NULL,
	"brandData" jsonb NOT NULL,
	"slug" text NOT NULL,
	"logo" text,
	"websiteURL" text,
	"rating" real DEFAULT 0 NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now(),
	CONSTRAINT "brand_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" integer PRIMARY KEY NOT NULL,
	"categoryData" jsonb NOT NULL,
	"logo" text NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "creator" (
	"id" text PRIMARY KEY NOT NULL,
	"creatorName" text NOT NULL,
	"bio" text,
	"profilePictureURL" text,
	"age" integer,
	"location" text,
	"country" text,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "creatorInterests" (
	"id" serial PRIMARY KEY NOT NULL,
	"creatorId" text,
	"categoryId" integer,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "headings" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "landingPage" (
	"id" serial PRIMARY KEY NOT NULL,
	"brandsContent" jsonb NOT NULL,
	"categoriesContent" jsonb NOT NULL,
	"creatorsContent" jsonb NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "product" (
	"id" text PRIMARY KEY NOT NULL,
	"productName" jsonb NOT NULL,
	"productLink" text NOT NULL,
	"productSlug" jsonb,
	"brandId" text,
	"categoryId" integer,
	"globalTradeItemNumber" text,
	"vendorProductNumber" text,
	"rating" real DEFAULT 0,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "rating" (
	"id" text PRIMARY KEY NOT NULL,
	"productId" text,
	"creatorId" text,
	"rating" real NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" serial PRIMARY KEY NOT NULL,
	"videoTitle" jsonb NOT NULL,
	"videoUrl" text NOT NULL,
	"playbackId" text NOT NULL,
	"productId" text,
	"creatorId" text,
	"siteTitle" jsonb NOT NULL,
	"metaDescription" jsonb NOT NULL,
	"summary" jsonb NOT NULL,
	"transcript" jsonb NOT NULL,
	"faqs" jsonb NOT NULL,
	"published" boolean,
	"cannonicalTag" boolean DEFAULT false NOT NULL,
	"resolution" text,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "creatorInterests" ADD CONSTRAINT "creatorInterests_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "creatorInterests" ADD CONSTRAINT "creatorInterests_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_brandId_brand_id_fk" FOREIGN KEY ("brandId") REFERENCES "public"."brand"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rating" ADD CONSTRAINT "rating_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_productId_product_id_fk" FOREIGN KEY ("productId") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_creatorId_creator_id_fk" FOREIGN KEY ("creatorId") REFERENCES "public"."creator"("id") ON DELETE no action ON UPDATE no action;