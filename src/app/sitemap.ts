import { MetadataRoute } from 'next';
import {
  getAllBrands,
  getAllCategories,
  getAllCreatorsSlug,
  getAllVideos,
} from './actions/actions';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type Brand = {
  id: string;
  logo: string;
  brandName: string;
  slug: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: Allvideos } = await getAllVideos('en');
  const { data: AllBrands } = await getAllBrands('en');
  const { data: AllCategories } = await getAllCategories('en');
  const { data: AllCreators } = await getAllCreatorsSlug();

  const languages = ['en', 'de', 'fr', 'it', 'x-default'];

  type Language = (typeof languages)[number];
  type SITEMAP = {
    url: string;
    alternates: {
      languages: {
        [key in Language]: string;
      };
    };
  };

  const Homepages: SITEMAP[] = [];
  const BrandSliderPages: SITEMAP[] = [];
  const CategorySliderPages: { url: string }[] = [];
  const DetailPages: { url: string }[] = [];
  const CreatorsPages: SITEMAP[] = [];

  const HomeLinks: SITEMAP = {
    url: '',
    alternates: {
      languages: {} as { [key in Language]: string },
    },
  };

  const SliderLinks: SITEMAP = {
    url: '',
    alternates: {
      languages: {} as { [key in Language]: string },
    },
  };

  let BrandSliderLinks: SITEMAP = {
    url: '',
    alternates: {
      languages: {} as { [key in Language]: string },
    },
  };

  let CategorySliderLinks: SITEMAP = {
    url: '',
    alternates: {
      languages: {} as { [key in Language]: string },
    },
  };

  let DetailPageLinks: SITEMAP = {
    url: '',
    alternates: {
      languages: {} as { [key in Language]: string },
    },
  };

  languages.map(locale => {
    //add to url
    HomeLinks.url = `${process.env.SITEBASEURL}`;
    SliderLinks.url = `${process.env.SITEBASEURL}/video-reviews`;

    //add to languages
    const prevHomeData = { ...HomeLinks.alternates.languages };
    const prevSliderData = { ...SliderLinks.alternates.languages };

    HomeLinks.alternates.languages = {
      ...prevHomeData,
      [locale]:
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}`
          : `${process.env.SITEBASEURL}/${locale}`,
    };

    SliderLinks.alternates.languages = {
      ...prevSliderData,
      [locale]:
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}/video-reviews`
          : `${process.env.SITEBASEURL}/${locale}/video-reviews`,
    };
  });

  Homepages.push(HomeLinks);

  //Adding Brand Slider Pages
  AllBrands?.map((brand: Brand) => {
    BrandSliderLinks.url = `${process.env.SITEBASEURL}/video-reviews/brand/${brand.slug}`;

    const newData = { ...BrandSliderLinks.alternates.languages };

    languages.forEach(locale => {
      newData[locale] =
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}/video-reviews/brand/${brand.slug}`
          : `${process.env.SITEBASEURL}/${locale}/video-reviews/brand/${brand.slug}`;
    });

    BrandSliderLinks.alternates.languages = newData;

    BrandSliderPages.push({ ...BrandSliderLinks });

    BrandSliderLinks = {
      url: '',
      alternates: {
        languages: {} as { [key in Language]: string },
      },
    };
  });

  AllCreators?.map(i => {
    BrandSliderLinks.url = `${process.env.SITEBASEURL}/video-reviews/reviewers/${i.slug}`;

    const newData = { ...BrandSliderLinks.alternates.languages };

    languages.forEach(locale => {
      newData[locale] =
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}/video-reviews/reviewers/${i.slug}`
          : `${process.env.SITEBASEURL}/${locale}/video-reviews/reviewers/${i.slug}`;
    });

    BrandSliderLinks.alternates.languages = newData;

    CreatorsPages.push({ ...BrandSliderLinks });

    BrandSliderLinks = {
      url: '',
      alternates: {
        languages: {} as { [key in Language]: string },
      },
    };
  });

  AllCategories?.map(category => {
    const catagoryData = category.categoryData as Record<string, { urlSlug: string }>;

    CategorySliderLinks.url = `${process.env.SITEBASEURL}/productcategory/${
      catagoryData['en'].urlSlug
    }`;

    const newData = { ...CategorySliderLinks.alternates.languages };

    languages.forEach(locale => {
      newData[locale] =
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}/video-reviews/productcategory/${catagoryData['en'].urlSlug}`
          : `${process.env.SITEBASEURL}/${locale}/video-reviews/productcategory/${
              catagoryData[locale].urlSlug
            }`;
    });

    CategorySliderLinks.alternates.languages = newData;

    CategorySliderPages.push({ ...CategorySliderLinks });

    CategorySliderLinks = {
      url: '',
      alternates: {
        languages: {} as { [key in Language]: string },
      },
    };
  });

  type LocaleKeys = 'en' | 'de' | 'fr' | 'it';

  Allvideos?.map(video => {
    const videoId = video.id;
    const categorySlug = video.category?.slug;
    const brandSlug = video?.brand?.brandSlug;
    const productSlug = video.product?.productSlug;

    DetailPageLinks.url = `${process.env.SITEBASEURL}/video-reviews/${categorySlug}/${brandSlug}/${productSlug}/${videoId}`;

    const newData = { ...DetailPageLinks.alternates.languages };

    languages.forEach(locale => {
      newData[locale] =
        locale == 'en' || locale == 'x-default'
          ? `${process.env.SITEBASEURL}/video-reviews/${
              categorySlug
            }/${brandSlug}/${productSlug}/${videoId}`
          : `${process.env.SITEBASEURL}/${locale}/video-reviews/${
              AllCategories.find(i => i.categoryData.en.urlSlug === categorySlug)?.categoryData?.[
                locale as LocaleKeys
              ]?.urlSlug
            }/${brandSlug}/${productSlug}/${videoId}`;
    });

    DetailPageLinks.alternates.languages = newData;

    DetailPages.push({ ...DetailPageLinks });

    DetailPageLinks = {
      url: '',
      alternates: {
        languages: {} as { [key in Language]: string },
      },
    };
  });

  return [
    ...Homepages,
    ...BrandSliderPages,
    ...CategorySliderPages,
    ...DetailPages,
    ...CreatorsPages,
  ];
}
