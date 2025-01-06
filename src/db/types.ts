import { admin, brand, category, product, video, creator, rating } from './schema';

export type Admin = typeof admin.$inferSelect;
export type Brand = typeof brand.$inferSelect;
export type Category = typeof category.$inferSelect;
export type Product = typeof product.$inferSelect;
export type Video = typeof video.$inferSelect;
export type Creator = typeof creator.$inferSelect;
export type Rating = typeof rating.$inferSelect;

export type BrandInputType = typeof brand.$inferInsert;
export type CategoryInputType = typeof category.$inferInsert;
export type ProductInputType = typeof product.$inferInsert;
export type VideoInputType = typeof video.$inferInsert;
export type CreatorInputType = typeof creator.$inferInsert;
export type AdminInputType = typeof admin.$inferInsert;
