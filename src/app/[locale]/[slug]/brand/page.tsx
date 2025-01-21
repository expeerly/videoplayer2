import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { getDictionary } from '@/src/lib/dictionary';
import { Metadata, NextPage } from 'next';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Languages } from '@/src/db/types';
import { getAllBrands, getAllCategories, getLandingPageText } from '@/src/app/actions/actions';
import { AllBrandsSlider } from '@/src/app/components/server/AllBrandsSlider';
import { LandingPageGrid } from '@/src/app/components/server/LandingPageGrid';

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

  const [{ t }, { data }, { data: allBrands }, { data: allCategories }] = await Promise.all([
    getDictionary(),
    getLandingPageText(locale, 'Brand'),
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
            <LongDescription text={data?.content?.bodyText || t('all_brands_body_text')} />
          </div>
          <AllBrandsSlider locale={locale} />
        </section>

        <LandingPageGrid
          type={'brand'}
          locale={locale}
          page={page}
          categoryQuery={categoryQuery}
          brandQuery={brandQuery}
          allCategories={allCategories}
          allBrands={allBrands}
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
      </div>
    </div>
  );
};

export default Page;
