import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { Metadata, NextPage } from 'next';
import { LandingPageData } from '@/src/types';
import { Languages } from '@/src/db/types';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Fetch the landing page data
  const fetchLandingPageData = await fetch(
    `${process.env.NEXT_ENDPOINT_URL}/landingPage/?type=Creator`
  );
  const { data } = (await fetchLandingPageData.json()) as {
    data: {
      creatorsContent: LandingPageData;
    };
    success: boolean;
  };

  return {
    title: data?.creatorsContent?.[locale]?.siteTitle,
    description: data?.creatorsContent?.[locale]?.bodyText,
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;

  const fetchLandingPageData = await fetch(
    `${process.env.NEXT_ENDPOINT_URL}/landingPage/?type=Creator`
  );
  const { data } = (await fetchLandingPageData.json()) as {
    data: { creatorsContent: LandingPageData };
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full mx-auto md:max-w-[532px] pt-5 md:pt-10">
        <section>
          <div className="px-5 md:px-0">
            <div className="flex justify-between">
              <PageHeading>Avis Vidéos: Categories de Produit</PageHeading>
              <Filter />
            </div>
            <LongDescription text={data?.creatorsContent?.[locale]?.bodyText} />
          </div>
        </section>
        <PaginationContainer
          headerData={{
            profileSlug: '/video-reviews/reviewers/reviewer-1',
            title: 'Reviewer 1',
            subTitle: '18 reviews',
            dataType: 'reviewer',
            description: '',
          }}
          dataType="reviewer"
        />

        <SEOSection
          heading="SEO text lorem ipsum"
          content={data?.creatorsContent?.[locale]?.footerText}
        />
      </div>
    </div>
  );
};

export default Page;
