import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import {
  getAllBrands,
  getAllCategories,
  getBrands,
  getLandingPageText,
} from '@/src/app/actions/actions';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getDictionary();

  const { data } = await getLandingPageText(locale, 'Brand');

  return {
    title: data?.content.siteTitle,
    description: data?.content.bodyText || t('all_brands_meta_description'),
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;
  const { t } = await getDictionary();

  const [{ data }, { data: brands }, { data: allBrands }, { data: allCategories }] =
    await Promise.all([
      getLandingPageText(locale, 'Brand'),
      getBrands(locale, 20, true),
      getAllBrands(locale),
      getAllCategories(locale),
    ]);

  return (
    <div className="w-full bg-white">
      <div className=" w-full mx-auto  md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Video Reviews: All Brands</PageHeading>
              <Filter categoriesList={allCategories} brandsList={allBrands} />
            </div>
            <LongDescription text={data?.content.bodyText || t('all_brands_body_text')} />
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
          headerData={{
            title: 'Dyson',
            subTitle: '1,218 reviews',
            rating: 4.5,
            variant: 'primary',
            imageUrl: '/brands/logo.svg',
            profileSlug: '/video-reviews/brand/dyson',
            dataType: 'brand',
            description: '',
          }}
        />

        <SEOSection
          heading="SEO text lorem ipsum"
          content={data?.content.bodyText || t('all_brands_footer_text')}
        />
      </div>
    </div>
  );
};

export default Page;
