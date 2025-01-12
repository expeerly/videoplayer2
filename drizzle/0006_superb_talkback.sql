CREATE TABLE "landingPage" (
	"id" serial PRIMARY KEY NOT NULL,
	"brandsContent" jsonb NOT NULL,
	"categoriesContent" jsonb NOT NULL,
	"creatorsContent" jsonb NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
