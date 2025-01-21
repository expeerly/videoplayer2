import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { Metadata, NextPage } from 'next';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { Languages } from '@/src/db/types';
import {
  getAllBrands,
  getAllCategories,
  getGridVideos,
  getLandingPageText,
} from '@/src/app/actions/actions';
import { getQueryIds } from '@/src/app/utils/queryHelpers';
import { getDictionary } from '@/src/lib/dictionary';
import { AllCategoriesSlider } from '@/src/app/components/server/AllCategoriesSlider';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getLandingPageText(locale, 'Category');

  return {
    title: data?.content.siteTitle,
    description: data?.content.metaDescription,
  };
}

const Page: NextPage<PageProps> = async ({ params, searchParams }) => {
  const { locale } = await params;
  const page = Number((await searchParams).page) || 1;
  const brandQuery = (await searchParams).brand ?? '';
  const categoryQuery = (await searchParams).category ?? '';

  const { t } = await getDictionary();
  const [{ data }, { data: allBrands }, { data: allCategories }] = await Promise.all([
    getLandingPageText(locale, 'Category'),
    getAllBrands(locale),
    getAllCategories(locale),
  ]);

  const { data: gridVideos } = await getGridVideos({
    lang: locale,
    gridType: 'category',
    page,
    limit: 4,
    videoCount: 9,
    random: false,
    filter: getQueryIds(categoryQuery, brandQuery, allCategories, allBrands),
  });

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
          <AllCategoriesSlider locale={locale} />
        </section>
        <PaginationContainer
          header={{
            dataType: 'category',
          }}
          data={gridVideos ?? []}
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
        <SEOSection heading="SEO text lorem ipsum" content={data?.content.footerText ?? ''} />
      </div>
    </div>
  );
};

export default Page;
