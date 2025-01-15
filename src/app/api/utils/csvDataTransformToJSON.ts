import { Brand, Category, Creator, LandingPage, Product, Video } from '@/src/db/types';
import { CSVData } from '../../context/types';

type CSVDataItem = Record<string, string | number>;
export type TransformResult = Partial<Brand | Category | Creator | Product | Video>;

export enum CSVDataOptions {
  brand = 'brand',
  category = 'category',
  creator = 'creator',
  product = 'product',
  video = 'video',
  landingPage = 'landingPage',
}

const createFieldGetter =
  (data: CSVDataItem) =>
  (field: string, isRequired = true): string => {
    if (isRequired && !(field in data)) {
      throw new Error(`${field} is required but not found in the received data`);
    }
    return data[field] ? `${data[field]}` : '';
  };

export const verifyRequiredFields = (
  requiredFields: (string | string[])[],
  data: CSVDataItem
): boolean => {
  const missingFields = requiredFields.filter(field => {
    if (typeof field === 'string') {
      return !data.hasOwnProperty(field.trim()) || data[field.trim()] === '';
    } else {
      const [key1, key2] = field;
      return (
        (!data.hasOwnProperty(key1.trim()) || data[key1.trim()] === '') &&
        (!data.hasOwnProperty(key2.trim()) || data[key2.trim()] === '')
      );
    }
  });
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
          getField(`${field} ${lang.toUpperCase()}`, lang === 'en') || null,
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

  [CSVDataOptions.creator]: (
    data: CSVDataItem
  ): (Partial<Creator> & { interests: string }) | null => {
    const getField = createFieldGetter(data);
    const requiredFields = ['Unique Bubble ID Reviewer'];
    const isValid = verifyRequiredFields(requiredFields, data);
    if (!isValid) {
      return null;
    }
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

  [CSVDataOptions.product]: (data: CSVDataItem): Partial<Product> | null => {
    const getField = createFieldGetter(data);
    const requiredFields = [
      'Unique Bubble ID Product',
      ['product_name_slug', 'product_name_slug EN'],
    ];
    const isValid = verifyRequiredFields(requiredFields, data);
    if (!isValid) {
      return null;
    }

    return {
      id: getField('Unique Bubble ID Product'),
      productName: createMultiLangObject(getField, { title: 'Product name' }),
      productLink: getField('Call to action link'),
      globalTradeItemNumber: getField('GTIN/EAN') || null,
      vendorProductNumber: getField('Vendor Product Number') || null,
      brandId: getField('Unique bubble Id Brand') || null,
      categoryId: getField('unique_category_id') ? Number(getField('unique_category_id')) : null,
      productSlug: createMultiLangObject(getField, { title: 'product_name_slug' }),
    };
  },

  [CSVDataOptions.video]: (data: CSVDataItem): Partial<Video> | null => {
    const getField = createFieldGetter(data);
    const requiredFields = ['Unique expeerly player ID'];
    const isValid = verifyRequiredFields(requiredFields, data);
    if (!isValid) {
      return null;
    }
    const booleanField = (field: string) => getField(field)?.toLowerCase() === 'yes';
    return {
      id: parseInt(getField('Unique expeerly player ID')),
      videoUrl: getField('Main video URL'),
      playbackId: getField('Max playback ID'),
      cannonicalTag: booleanField('Set canonical tag'),
      creatorId: getField('Unique Bubble ID Reviewer'),
      productId: getField('Unique Bubble ID Product'),
      resolution: getField('video format')?.replace(/\s/g, '') || null,
      videoTitle: createMultiLangObject(getField, { title: 'Detailed page title' }),
      summary: createMultiLangObject(getField, { text: 'Summary' }),
      starRating: getField('Star rating', false) ? Number(getField('Star rating', false)) : null,
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
  [CSVDataOptions.landingPage]: (data: CSVDataItem): Partial<LandingPage> => {
    const getField = createFieldGetter(data);
    return {
      brandsContent: createMultiLangObject(getField, {
        bodyText: 'All brands Body text',
        footerText: 'All brands Footer text',
        siteTitle: 'All brands Site title',
        metaDescription: 'All brands Meta description',
      }),
      categoriesContent: createMultiLangObject(getField, {
        bodyText: 'All categories Body text',
        footerText: 'All categories Footer text',
        siteTitle: 'All categories Site title',
        metaDescription: 'All categories Meta description',
      }),
      creatorsContent: createMultiLangObject(getField, {
        bodyText: 'All reviewers Body text',
        footerText: 'All reviewers Footer text',
        siteTitle: 'All reviewers Site title',
        metaDescription: 'All reviewers Meta description',
      }),
    };
  },
};

export const transformDataToJSON = (data: CSVData, option: CSVDataOptions): TransformResult[] => {
  const transformer = transformers[option];
  if (!transformer) throw new Error('Invalid option');
  return data.map(item => transformer(item)).filter(Boolean) as TransformResult[];
};
