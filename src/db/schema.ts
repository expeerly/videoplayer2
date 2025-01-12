import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  jsonb,
  serial,
  real,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Brand table
export const brand = pgTable('brand', {
  id: text('id').primaryKey(),
  brandName: text('brandName').notNull(),
  brandData: jsonb('brandData').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  websiteURL: text('websiteURL'),
  rating: real('rating').default(0.0).notNull(),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

// Category table
export const category = pgTable('category', {
  id: integer('id').primaryKey(),
  categoryData: jsonb('categoryData').notNull(),
  logo: text('logo').notNull(),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

// Creator table
export const creator = pgTable('creator', {
  id: text('id').primaryKey(),
  creatorName: text('creatorName').notNull(),
  bio: text('bio'),
  profilePictureURL: text('profilePictureURL'),
  age: integer('age'),
  location: text('location'),
  country: text('country'),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

export const creatorInterests = pgTable('creatorInterests', {
  id: serial('id').primaryKey(),
  creatorId: text('creatorId').references(() => creator.id),
  categoryId: integer('categoryId').references(() => category.id),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

// Product table
export const product = pgTable('product', {
  id: text('id').primaryKey(),
  productName: text('productName').notNull(),
  productLink: text('productLink').notNull(),
  productSlug: jsonb('productSlug'),
  brandId: text('brandId').references(() => brand.id),
  categoryId: integer('categoryId').references(() => category.id),
  globalTradeItemNumber: text('globalTradeItemNumber'),
  vendorProductNumber: text('vendorProductNumber'),
  rating: real('rating').default(0.0),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

// Video table
export const video = pgTable('video', {
  id: serial('id').primaryKey(),
  videoTitle: jsonb('videoTitle').notNull(),
  videoUrl: text('videoUrl').notNull(),
  playbackId: text('playbackId').notNull(),
  productId: text('productId').references(() => product.id),
  creatorId: text('creatorId').references(() => creator.id),
  siteTitle: jsonb('siteTitle').notNull(),
  metaDescription: jsonb('metaDescription').notNull(),
  summary: jsonb('summary').notNull(),
  transcript: jsonb('transcript').notNull(),
  faqs: jsonb('faqs').notNull(),
  published: boolean('published'),
  cannonicalTag: boolean('cannonicalTag').default(false).notNull(),
  resolution: text('resolution'),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

export const rating = pgTable('rating', {
  id: text('id').primaryKey(),
  productId: text('productId').references(() => product.id),
  creatorId: text('creatorId').references(() => creator.id),
  rating: real('rating').notNull(),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

export const videoRelations = relations(video, ({ one }) => ({
  product: one(product, {
    fields: [video.productId],
    references: [product.id],
  }),
  creator: one(creator, {
    fields: [video.creatorId],
    references: [creator.id],
  }),
}));

export const productRelations = relations(product, ({ one, many }) => ({
  brand: one(brand, {
    fields: [product.brandId],
    references: [brand.id],
  }),
  category: one(category, {
    fields: [product.categoryId],
    references: [category.id],
  }),
  video: many(video),
}));

export const brandRelations = relations(brand, ({ many }) => ({
  products: many(product),
}));

export const categoryRelations = relations(category, ({ many }) => ({
  products: many(product),
}));

export const creatorRelations = relations(creator, ({ many }) => ({
  videos: many(video),
  interests: many(creatorInterests),
}));

export const headings = pgTable('headings', {
  id: serial('id').primaryKey(),
  data: jsonb('data').notNull(),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});

export const landingPage = pgTable('landingPage', {
  id: serial('id').primaryKey(),
  brandsContent: jsonb('brandsContent').notNull(),
  categoriesContent: jsonb('categoriesContent').notNull(),
  creatorsContent: jsonb('creatorsContent').notNull(),
  createdAt: timestamp('createdAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', {
    precision: 6,
    withTimezone: true,
  }).defaultNow(),
});
