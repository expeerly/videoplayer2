import {
  admin,
  brand,
  category,
  product,
  video,
  creator,
  rating,
  creatorInterests,
  landingPage,
  headings,
} from './schema';

export type Admin = typeof admin.$inferSelect;
export type Brand = typeof brand.$inferSelect;
export type Category = typeof category.$inferSelect;
export type Product = typeof product.$inferSelect;
export type Video = typeof video.$inferSelect;
export type Creator = typeof creator.$inferSelect;
export type Rating = typeof rating.$inferSelect;
export type CreatorInterests = typeof creatorInterests.$inferSelect;
export type LandingPage = typeof landingPage.$inferSelect;
export type Headings = typeof headings.$inferSelect;

export type BrandInputType = typeof brand.$inferInsert;
export type CategoryInputType = typeof category.$inferInsert;
export type ProductInputType = typeof product.$inferInsert;
export type VideoInputType = typeof video.$inferInsert;
export type CreatorInputType = typeof creator.$inferInsert;
export type CreatorInterestsInputType = typeof creatorInterests.$inferInsert;
export type AdminInputType = typeof admin.$inferInsert;
export type LandingPageInputType = typeof landingPage.$inferInsert;
export type RatingInputType = typeof rating.$inferInsert;
export type HeadingsInputType = typeof headings.$inferInsert;
