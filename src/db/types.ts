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
  productPicture: string;
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
  country?: string;
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
  bodyText: string;
  footerText: string;
  metaDesc: string;
  siteTitle: string;
  name: string;
  slug: string;
  websiteURL: string;
  reviewsCount?: string;
  rating?: number;
};

export type InterestsCategory = {
  categorySlug: string;
  logo: string;
};

export type ProfileResponse = GridData &
  Info & {
    interests: InterestsCategory[];
  };

export type LocaleProps = {
  locale: Languages;
};

export type QAPair = {
  question: string;
  answer: string;
};

export type VideoCategory = {
  id: number;
  name: string;
  slug: string;
};

export type VideoBrand = {
  id: string;
  name: string;
  logo: string;
  brandSlug: string;
  websiteURL: string;
};

export type VideoCreator = {
  id: string;
  name: string;
  logo: string;
  slug: string;
};

export type VideoProduct = {
  id: string;
  globalTradeItemNumber: string | null;
  productLink: string;
  productName: string;
  productSlug: string;
  productPicture: string;
  vendorProductNumber: string;
};

export type VideoResponse = {
  id: number;
  videoTitle: string;
  videoUrl: string;
  playbackId: string;
  productId: string;
  creatorId: string;
  published: boolean;
  resolution: string;
  starRating: number;
  siteTitle: string;
  metaDescription: string;
  creator: VideoCreator;
  product: VideoProduct;
  brand: VideoBrand;
  category: VideoCategory;
};

export type VideoDetail = {
  id: string;
  starRating: number;
  summary: string | null;
  transcript: string;
  faqs: QAPair[];
  brand: VideoBrand;
  product: VideoProduct;
  creator: {
    name: string;
  };
};
