import { Brand, Category, Creator, Product, Rating, Video } from '@/src/db/types';
import { CSVData } from '../../context/types';

type CSVDataItem = Record<string, string | number>;
type TransformResult = Partial<Brand | Category | Creator | Product | Video | Rating>;

export enum CSVDataOptions {
  brand = 'brand',
  category = 'category',
  creator = 'creator',
  product = 'product',
  video = 'video',
  rating = 'rating',
}

const createFieldGetter =
  (data: CSVDataItem) =>
  (field: string): string => {
    if (!(field in data)) {
      throw new Error(`${field} is required but not found in the received data`);
    }
    return `${data[field]}`;
  };

const createMultiLangObject = <T>(
  getField: ReturnType<typeof createFieldGetter>,
  fields: Record<string, string>
) => {
  const languages = ['en', 'de', 'fr', 'it'] as const;
  return Object.fromEntries(
    languages.map(lang => [
      lang,
      Object.fromEntries(
        Object.entries(fields).map(([key, field]) => [
          key,
          getField(`${field}${lang === 'en' ? '' : ` ${lang.toUpperCase()}`}`) || null,
        ])
      ),
    ])
  ) as T;
};

const transformers = {
  [CSVDataOptions.brand]: (data: CSVDataItem): Partial<Brand> => {
    const getField = createFieldGetter(data);
    return {
      id: getField('unique_brand_id'),
      brandName: getField('Company/brand name'),
      logo: getField('logo_name') || null,
      slug: getField('slugs'),
      brandData: createMultiLangObject<Brand['brandData']>(getField, {
        siteTitle: 'Sitetitle',
        metaDesc: 'Meta description',
      }),
      rating: Number(getField('Rating')),
    };
  },

  [CSVDataOptions.category]: (data: CSVDataItem): Partial<Category> => {
    const getField = createFieldGetter(data);
    return {
      id: Number(getField('unique_category_id')),
      logo: getField('logo'),
      categoryData: createMultiLangObject<Category['categoryData']>(getField, {
        categoryName: 'Category',
        urlSlug: 'URL slug',
        siteTitle: 'Sitetitle',
        metaDesc: 'Meta description',
      }),
    };
  },

  [CSVDataOptions.creator]: (data: CSVDataItem): Partial<Creator> => {
    const getField = createFieldGetter(data);
    return {
      id: getField('creator_unique_id'),
      creatorName: getField('Creator first name'),
    };
  },

  [CSVDataOptions.rating]: (data: CSVDataItem): Partial<Rating> => {
    const getField = createFieldGetter(data);
    return {
      id: getField('Unique Bubble ID Rating'),
      productId: getField('Unique Bubble ID Product'),
      creatorId: getField('Unique Bubble ID Reviewer'),
      rating: Number(getField('Star rating')),
    };
  },

  [CSVDataOptions.product]: (data: CSVDataItem): Partial<Product> => {
    const getField = createFieldGetter(data);
    return {
      id: getField('Expeerly product ID'),
      productName: getField('Product name'),
      productLink: getField('Call to action link'),
      globalTradeItemNumber: getField('GTIN/EAN') || null,
      vendorProductNumber: getField('Vendor Product Number') || null,
      brandId: getField('unique_brand_id') || null,
      categoryId: Number(getField('unique_category_id')),
      productSlug: { en: getField('product_name_slug') || null },
    };
  },

  [CSVDataOptions.video]: (data: CSVDataItem): Partial<Video> => {
    const getField = createFieldGetter(data);
    const booleanField = (field: string) => getField(field)?.toLowerCase() === 'yes';
    console.log(data);
    return {
      id: parseInt(getField('Unique expeerly player ID')),
      videoUrl: getField('Main video URL'),
      playbackId: getField('Max playback ID'),
      cannonicalTag: booleanField('Set canonical tag'),
      showRelated: booleanField('Show related videos'),
      creatorId: getField('Creator unique ID'),
      productId: getField('Expeerly product ID'),
      resolution: getField('video format')?.replace(/\s/g, '') || null,
      videoTitle: createMultiLangObject(getField, { title: 'Detailed page title' }),
      subtitle: createMultiLangObject(getField, { file: 'Subtitles file' }),
      summary: createMultiLangObject(getField, { text: 'Summary' }),
      faqs: Array.from({ length: 5 }, (_, i) => i + 1).reduce(
        (acc, num) => ({
          ...acc,
          [`faq${num}`]: createMultiLangObject(getField, {
            faqTitle: `FAQ title ${num}`,
            faqAnswer: `Answer ${num}`,
          }),
        }),
        {}
      ),
      transcript: createMultiLangObject(getField, {
        transcriptTitle: 'Transcript title',
        transcriptText: 'Transcript',
      }),
      siteTitle: createMultiLangObject(getField, { title: 'Site title' }),
      metaDescription: createMultiLangObject(getField, { desc: 'Meta description' }),
      published: booleanField('published'),
    };
  },
};

export const transformDataToJSON = (data: CSVData, option: CSVDataOptions): TransformResult[] => {
  const transformer = transformers[option];
  if (!transformer) throw new Error('Invalid option');
  return data.map(item => transformer(item));
};
