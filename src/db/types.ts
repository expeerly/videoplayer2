import {
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
export type LandingPageInputType = typeof landingPage.$inferInsert;
export type RatingInputType = typeof rating.$inferInsert;
export type HeadingsInputType = typeof headings.$inferInsert;

export type Languages = 'de' | 'en' | 'fr' | 'it';

export type CategoryData = {
  categoryName: string;
  id: string;
  logo: string;
  urlSlug: string;
};

export type AllCategoriesData = {
  categoryData: { [Key in Languages]: { urlSlug: string; categoryName: string } };
  id: string;
  logo: string;
};

type BrandsData = {
  brandName: string;
  id: string;
  logo: string;
  slug: string;
}[];

export type BrandData = {
  rows: BrandsData;
};

export type AllBrandssData = BrandsData;

export type LandingPageText = {
  bodyText?: string;
  siteTitle?: string;
  footerText?: string;
  metaDescription?: string;
};
