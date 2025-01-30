import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Metadata, NextPage } from 'next';
import { Languages } from '@/src/db/types';
import { getAllBrands, getAllCategories, getLandingPageText } from '@/src/app/actions/actions';
import { getDictionary } from '@/src/lib/dictionary';
import { LandingPageGrid } from '@/src/app/components/server/LandingPageGrid';
import { notFound } from 'next/navigation';

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
    title: data?.content?.siteTitle,
    description: data?.content?.metaDescription,
    openGraph: {
      type: 'website',
      title: data?.content?.siteTitle,
      description: data?.content?.bodyText,
      url: `${process.env.SITEBASEURL}/${locale}/video-reviews/reviewers`,
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
    getLandingPageText(locale, 'Creator'),
    getAllBrands(locale),
    getAllCategories(locale),
  ]);

  if (data === undefined) {
    notFound();
  }

  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>{t('allReviewers')}</PageHeading>
              <Filter categoriesList={allCategories} brandsList={allBrands} />
            </div>
            <LongDescription text={data?.content.bodyText ?? ''} />
          </div>
        </section>

        <LandingPageGrid
          type={'creator'}
          locale={locale}
          page={page}
          categoryQuery={categoryQuery}
          brandQuery={brandQuery}
          allCategories={allCategories}
          allBrands={allBrands}
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

        <SEOSection content={data?.content?.footerText ?? ''} />
      </div>
    </div>
  );
};

export default Page;
