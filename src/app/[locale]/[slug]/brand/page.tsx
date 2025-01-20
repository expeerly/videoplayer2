// import { Filter } from '@/src/app/components/client/Filter/Filter';
// import { LongDescription } from '@/src/app/components/client/LongDescription';
// import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
// import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
// import { Slider } from '@/src/app/components/client/Slider/Slider';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';
// import { PageHeading } from '@/src/app/components/server/PageHeading';
// import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import {
  getAllBrands,
  getAllCategories,
  getBrands,
  getGridVideos,
  getLandingPageText,
} from '@/src/app/actions/actions';
import { getQueryIds } from '@/src/app/utils/queryHelpers';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getDictionary();

  const { data } = await getLandingPageText(locale, 'Brand');

  return {
    title: data?.content?.siteTitle,
    description: data?.content?.bodyText || t('all_brands_meta_description'),
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { locale } = await params;
  const page = Number((await searchParams).page) || 1;
  const brandQuery = (await searchParams).brand ?? '';
  const categoryQuery = (await searchParams).category ?? '';

  // const { t } = await getDictionary();

  const [{ data }, { data: brands }, { data: allBrands }, { data: allCategories }] =
    await Promise.all([
      getLandingPageText(locale, 'Brand'),
      getBrands(locale, 20, true),
      getAllBrands(locale),
      getAllCategories(locale),
    ]);

  const { data: gridVideos } = await getGridVideos(
    locale,
    'brand',
    page,
    4,
    9,
    false,
    getQueryIds(categoryQuery, brandQuery, allCategories, allBrands)
  );

  console.log({ data, brands, allBrands, allCategories, gridVideos });

  return (
    <div className="w-full bg-white">
      {/* <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Video Reviews: All Brands</PageHeading>
              <Filter categoriesList={allCategories} brandsList={allBrands} />
            </div>
            <LongDescription text={data?.content?.bodyText || t('all_brands_body_text')} />
          </div>
          <div className="mt-8">
            <div className="hidden md:block">
              <Slider
                classNameStyle={{
                  cardClassName: 'bg-white',
                }}
                isBrand
                slides={
                  brands?.rows?.map(brand => ({
                    title: brand.brandName,
                    imgURL: brand.logo,
                    slug: brand.slug,
                  })) ?? []
                }
              />
            </div>
            <div className="md:hidden">
              <MobileSlider
                isMultiRow={false}
                isBrand
                slides={
                  brands?.rows?.map(brand => ({
                    title: brand.brandName,
                    imgURL: brand.logo,
                    slug: brand.slug,
                  })) ?? []
                }
              />
            </div>
          </div>
        </section>
        <PaginationContainer
          header={{
            dataType: 'brand',
          }}
          data={gridVideos}
          ctaBlock={{
            heading: t('cta_block_all_brands_categories.title'),
            desc: t('cta_block_all_brands_categories.desc'),
            button: {
              label: t('learn_more.label'),
              ariaLabel: t('learn_more.aria_label'),
              href: 'https://www.get.expeerly.com/for-brands',
            },
          }}
        />

        <SEOSection
          heading="SEO text lorem ipsum"
          content={data?.content?.bodyText || t('all_brands_footer_text')}
        />
      </div> */}
    </div>
  );
};

export default Page;
