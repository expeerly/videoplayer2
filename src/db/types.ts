import {
  brand,
  category,
  product,
  video,
  creator,
  creatorInterests,
  landingPage,
  headings,
} from './schema';

export type Brand = typeof brand.$inferSelect;
export type Category = typeof category.$inferSelect;
export type Product = typeof product.$inferSelect;
export type Video = typeof video.$inferSelect;
export type Creator = typeof creator.$inferSelect;
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

export type GridVideo = {
  id: number;
  playbackId: string;
  videoUrl: string;
  resolution: string;
  productName: string;
  productSlug: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  brandSlug: string;
  categorySlug: string;
  rating: number;
};

export type Info = {
  reviewsCount?: string;
  age?: number;
  bio?: string;
  location?: string;
};

export type GridData = {
  id: number;
  logo: string;
  name: string;
  slug: string;
  info: Info;
  videos: GridVideo[];
};

export type Grid = {
  rows: GridData[];
  total: number;
};

export type PageInfo = {
  id: string;
  logo: string;
  meta: {
    brandBody: string;
    brandFooter: string;
    metaDesc: string;
    siteTitle: string;
  };
  name: string;
  slug: string;
  websiteURL: string;
};

export type ProfileResponse = Grid & { pageInfo: PageInfo };
