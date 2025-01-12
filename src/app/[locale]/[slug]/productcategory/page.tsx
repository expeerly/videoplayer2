import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { Metadata, NextPage } from 'next';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { Languages } from '@/src/db/types';
import {
  getAllBrands,
  getAllCategories,
  getCategories,
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
  const { data } = await getLandingPageText(locale, 'Category');

  return {
    title: data?.content.siteTitle,
    description: data?.content.metaDescription,
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;
  const [{ data }, { data: categories }, { data: allBrands }, { data: allCategories }] =
    await Promise.all([
      getLandingPageText(locale, 'Category'),
      getCategories(locale),
      getAllBrands(locale),
      getAllCategories(locale),
    ]);

  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Avis Vidéos: Categories de Produit</PageHeading>
              <Filter categoriesList={allCategories} brandsList={allBrands} />
            </div>
            <LongDescription text={data?.content.bodyText ?? ''} />
          </div>
          <div className="mt-8">
            <div className="hidden md:block">
              <Slider
                classNameStyle={{
                  cardClassName: 'bg-white',
                }}
                slides={categories.map(i => ({
                  name: i.categoryName,
                  icon: i.logo,
                  slug: i.urlSlug,
                }))}
              />
            </div>
            <div className="md:hidden">
              <MobileSlider
                isMultiRow={false}
                slides={categories.map(i => ({
                  name: i.categoryName,
                  icon: i.logo,
                  slug: i.urlSlug,
                }))}
              />
            </div>
          </div>
        </section>
        <PaginationContainer
          headerData={{
            profileSlug: '/video-reviews/productcategory/travel',
            title: 'Travel',
            subTitle: '1,218 reviews',
          }}
        />
        <SEOSection heading="SEO text lorem ipsum" content={data?.content.footerText ?? ''} />
      </div>
    </div>
  );
};

export default Page;
