import { Filter } from '@/src/app/components/client/Filter/Filter';
import { LongDescription } from '@/src/app/components/client/LongDescription';
import { PaginationContainer } from '@/src/app/components/server/PaginationContainer';
import { MobileSlider } from '@/src/app/components/client/Slider/MobileSlider';
import { Slider } from '@/src/app/components/client/Slider/Slider';
import { Metadata, NextPage } from 'next';
import { SEOSection } from '@/src/app/components/server/SEOSection';
import { PageHeading } from '@/src/app/components/server/PageHeading';
import { LandingPageData } from '@/src/types';
import { Languages } from '@/src/db/types';

type PageProps = {
  params: {
    locale: Languages;
    slug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  // Fetch the landing page data
  const fetchLandingPageData = await fetch(
    `${process.env.NEXT_ENDPOINT_URL}/landingPage/?type=Category`
  );
  const { data } = (await fetchLandingPageData.json()) as {
    data: {
      categoriesContent: LandingPageData;
    };
    success: boolean;
  };

  return {
    title: data?.categoriesContent?.[locale]?.siteTitle,
    description: data?.categoriesContent?.[locale]?.bodyText,
  };
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;

  const fetchLandingPageData = await fetch(
    `${process.env.NEXT_ENDPOINT_URL}/landingPage/?type=Category`
  );
  const { data } = (await fetchLandingPageData.json()) as {
    data: { categoriesContent: LandingPageData };
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
            <LongDescription text={data?.categoriesContent?.[locale]?.bodyText} />
          </div>
          <div className="mt-8">
            <div className="hidden md:block">
              <Slider
                classNameStyle={{
                  cardClassName: 'bg-white',
                }}
              />
            </div>
            <div className="md:hidden">
              <MobileSlider isMultiRow={false} />
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
        <SEOSection
          heading="SEO text lorem ipsum"
          content={data?.categoriesContent?.[locale]?.footerText}
        />
      </div>
    </div>
  );
};

export default Page;
