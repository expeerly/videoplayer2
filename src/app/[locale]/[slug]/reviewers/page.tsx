import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Metadata, NextPage } from 'next';
import { Languages } from '@/src/db/types';
import {
  getAllBrands,
  getAllCategories,
  getGridVideos,
  getLandingPageText,
} from '@/src/app/actions/actions';
import { getQueryIds } from '@/src/app/utils/queryHelpers';
import { getDictionary } from '@/src/lib/dictionary';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { data } = await getLandingPageText(locale, 'Creator');

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
    getLandingPageText(locale, 'Creator'),
    getAllBrands(locale),
    getAllCategories(locale),
  ]);

  const { data: gridVideos } = await getGridVideos({
    lang: locale,
    gridType: 'creator',
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
        </section>
        <PaginationContainer
          header={{
            dataType: 'reviewer',
          }}
          data={gridVideos}
          ctaBlock={{
            heading: t('CTABlockAllReviewers.experienceShare'),
            desc: t('CTABlockAllReviewers.becomeReviewer'),
            button: {
              label: t('CTABlockAllReviewers.learnMore'),
              ariaLabel: t('CTABlockAllReviewers.learnMore_arialabel'),
              href: 'https://www.get.expeerly.com/become-a-creator',
            },
          }}
        />

        <SEOSection heading="SEO text lorem ipsum" content={data?.content?.footerText ?? ''} />
      </div>
    </div>
  );
};

export default Page;
