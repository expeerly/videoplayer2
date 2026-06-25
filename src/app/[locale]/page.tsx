import { HeroSection } from '../components/server/HeroSection';
import { ExploreReviewers } from '../components/server/ExploreReviewers';
import { HowExpeerlyWorks } from '../components/server/HowExpeerlyWork';
import { BrandsSlider } from '../components/server/BrandsSlider';
// import { CategoriesSlider } from '../components/server/CategoriesSlider';
import { ConversionSlider } from '../components/server/Conversion';
import { NextPage, Metadata } from 'next';
import { getDictionary } from '../../lib/dictionary';
import { getGridVideos } from '../actions/actions';
import { Languages } from '@/src/db/types';
import { ReviewGridSection } from '../components/server/ReviewGridSection';

type PageProps = {
  params: Promise<{
    locale: Languages;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { t } = await getDictionary();
  const { locale } = await params;
  const pageUrl = `${process.env.SITEBASEURL}/${locale === 'en' ? '' : locale}`;

  return {
    title: t('home_site_title'),
    description: t('home_meta_description'),
    openGraph: {
      type: 'website',
      title: t('home_site_title'),
      description: t('home_meta_description'),
      url: pageUrl,
      images: [
        {
          url: 'https://assets-global.website-files.com/63d7c29fce90dd477edff1e4/645e3c9bacfb26bc656672b0_expeerly_opengraph_image.jpg',
          width: 1200,
          height: 630,
          alt: t('home_site_title'),
        },
      ],
      siteName: 'Expeerly',
    },
  };
}

const HomePage: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <HeroSection />
      <ExploreReviewers locale={locale} />
      <BrandsSlider locale={locale} />
      <section className="flex justify-center max-w-[900px] mb-5 w-full mx-auto pt-16">
        <ReviewGridSection
          getGridVideos={() =>
            getGridVideos({
              lang: locale,
              gridType: 'brand',
              page: 1,
              limit: 1,
              videoCount: 5,
              random: true,
            })
          }
        />
      </section>
      <section className="flex justify-center max-w-[900px] w-full mx-auto pb-12 mt-5 md:pb-[70px]">
        <ReviewGridSection
          dataType="category"
          getGridVideos={() =>
            getGridVideos({
              lang: locale,
              gridType: 'category',
              page: 1,
              limit: 1,
              videoCount: 5,
              random: true,
            })
          }
        />
      </section>
      <ConversionSlider locale={locale} />
      <HowExpeerlyWorks />
    </div>
  );
};

export default HomePage;
