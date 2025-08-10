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
  const { data } = await getLandingPageText(locale, 'Brand');

  return {
    title: data?.content?.siteTitle,
    description: data?.content?.bodyText,
    openGraph: {
      type: 'website',
      title: data?.content?.siteTitle,
      description: data?.content?.bodyText,
      url: `${process.env.SITEBASEURL}/${locale}/video-reviews/brand`,
      images: [
        {
          url: 'https://assets-global.website-files.com/63d7c29fce90dd477edff1e4/645e3c9bacfb26bc656672b0_expeerly_opengraph_image.jpg',
          width: 1200,
          height: 630,
          alt: data?.content?.siteTitle,
        },
      ],
      siteName: 'Expeerly',
    },
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

  console.log('All', { allBrands, allCategories });

  return (
    <div className="w-full bg-white">
      <div className="w-full pt-5 md:pt-10">
        <section className=" w-full mx-auto  md:max-w-[532px]">
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>{t('allBrands')}</PageHeading>
              <Filter categoriesList={allCategories} brandsList={allBrands} />
            </div>
            <LongDescription text={data?.content?.bodyText || t('all_brands_body_text')} />
          </div>
        </section>

        <AllBrandsSlider
          locale={locale}
          categoryQuery={categoryQuery}
          brandQuery={brandQuery}
          allCategories={allCategories}
          allBrands={allBrands}
        />

        <div className=" w-full mx-auto  md:max-w-[532px]">
          <LandingPageGrid
            type={'brand'}
            locale={locale}
            page={page}
            categoryQuery={categoryQuery}
            brandQuery={brandQuery}
            allCategories={allCategories}
            allBrands={allBrands}
            headerVariant={'secondary'}
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

          <SEOSection content={data?.content?.footerText || t('all_brands_footer_text')} />
        </div>
      </div>
    </div>
  );
};

export default Page;
