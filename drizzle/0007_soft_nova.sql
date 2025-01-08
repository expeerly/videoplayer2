CREATE TABLE "headings" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" jsonb NOT NULL,
	"createdAt" timestamp (6) with time zone DEFAULT now(),
	"updatedAt" timestamp (6) with time zone DEFAULT now()
);
