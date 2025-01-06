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
  (field: string, isRequired = true): string => {
    if (isRequired && !(field in data)) {
      throw new Error(`${field} is required but not found in the received data`);
    }
    return data[field] ? `${data[field]}` : '';
  };

export const verifyRequiredFields = (requiredFields: string[], data: CSVDataItem): boolean => {
  const missingFields = requiredFields.filter(
    field => !data.hasOwnProperty(field.trim()) || data[field.trim()] === ''
  );
  return missingFields.length === 0;
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
          getField(`${field} ${lang.toUpperCase()}`) || null,
        ])
      ),
    ])
  ) as T;
};

const transformers = {
  [CSVDataOptions.brand]: (data: CSVDataItem): Partial<Brand> => {
    const getField = createFieldGetter(data);
    return {
      id: getField('Unique bubble Id Brand'),
      brandName: getField('Company/brand name'),
      logo: getField('logo_name') || null,
      slug: getField('slugs'),
      websiteURL: getField('Brand Website Link', false),
      brandData: createMultiLangObject<Brand['brandData']>(getField, {
        siteTitle: 'Sitetitle',
        metaDesc: 'Meta description',
        brandBody: 'Teaser Brand body text',
        brandFooter: 'Teaser Brand body text',
      }),
      rating: Number(getField('Rating', false)),
    };
  },

  [CSVDataOptions.category]: (data: CSVDataItem): Partial<Category> => {
    const getField = createFieldGetter(data);
    return {
      id: Number(getField('unique_category_id')),
      logo: getField('Category icon link'),
      categoryData: createMultiLangObject<Category['categoryData']>(getField, {
        categoryName: 'Category',
        urlSlug: 'URL slug',
        siteTitle: 'Sitetitle',
        metaDesc: 'Meta description',
      }),
    };
  },

  [CSVDataOptions.creator]: (data: CSVDataItem): Partial<Creator> & { interests: string } => {
    const getField = createFieldGetter(data);
    return {
      id: getField('Unique Bubble ID Reviewer'),
      creatorName:
        `${getField('Creator First Name', false)} ${getField('Creator Last Name', false)}`.trim(),
      bio: getField('Bio', false),
      profilePictureURL: getField('Profile Picture URL', false),
      age: Number(getField('Age', false)),
      location: getField('Location', false),
      country: getField('Country', false),
      interests: getField('Category ID', false),
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

  [CSVDataOptions.product]: (data: CSVDataItem): Partial<Product> | null => {
    const getField = createFieldGetter(data);
    const requiredFields = [
      'Unique Bubble ID Product',
      'Unique bubble Id Brand',
      'unique_category_id',
      'product_name_slug',
    ];
    const isValid = verifyRequiredFields(requiredFields, data);
    if (!isValid) {
      return null;
    }

    return {
      id: getField('Unique Bubble ID Product'),
      productName: getField('Product name'),
      productLink: getField('Call to action link'),
      globalTradeItemNumber: getField('GTIN/EAN') || null,
      vendorProductNumber: getField('Vendor Product Number') || null,
      brandId: getField('Unique bubble Id Brand') || null,
      categoryId: Number(getField('unique_category_id')),
      productSlug: { en: getField('product_name_slug') || null },
    };
  },

  [CSVDataOptions.video]: (data: CSVDataItem): Partial<Video> => {
    const getField = createFieldGetter(data);
    const booleanField = (field: string) => getField(field)?.toLowerCase() === 'yes';
    return {
      id: parseInt(getField('Unique expeerly player ID')),
      videoUrl: getField('Main video URL'),
      playbackId: getField('Max playback ID'),
      cannonicalTag: booleanField('Set canonical tag'),
      showRelated: booleanField('Show related videos'),
      creatorId: getField('Unique Bubble ID Reviewer'),
      productId: getField('Unique Bubble ID Product'),
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
  return data.map(item => transformer(item)).filter(Boolean) as TransformResult[];
};
