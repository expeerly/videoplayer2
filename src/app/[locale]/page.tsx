import { HeroSection } from '../components/server/HeroSection';
import { ExpolreReviewers } from '../components/server/ExploreReviewers';
import { HowExpeerlyWorks } from '../components/server/HowExpeerlyWork';
import { BrandsSlider } from '../components/server/BrandsSlider';
import { CategoriesSlider } from '../components/server/CategoriesSlider';
import { ConversionSlider } from '../components/server/Conversion';
import { NextPage, Metadata } from 'next';
import { getDictionary } from '../../lib/dictionary';
import { ReviewGrid } from '../components/server/ReviewGrid';
import { getBrands, getCategories, getGridVideos } from '../actions/actions';
import { Languages } from '@/src/db/types';

type PageProps = {
  params: Promise<{
    locale: Languages;
    slug: string;
  }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getDictionary();

  return {
    title: t('home_site_title'),
    description: t('home_meta_description'),
  };
}

const HomePage: NextPage<PageProps> = async ({ params }) => {
  const { locale } = await params;

  // Fetch data separately
  const { data: brands } = await getBrands(locale);
  const { data: categories } = await getCategories(locale);
  const { data: randomBrand } = await getBrands(locale, 10, true);
  const { data: categoriesVideo } = await getGridVideos(locale, 'category', 1, 1, 5, true);
  const { data: brandVideos } = await getGridVideos(locale, 'brand', 1, 1, 5, true);
  const { data: creatorVideos } = await getGridVideos(locale, 'creator', 1, 2, 5, true);

  console.log({ brands, categories, randomBrand, categoriesVideo, brandVideos, creatorVideos });

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <HeroSection />
      <ExpolreReviewers data={creatorVideos} />
      <BrandsSlider brands={brands} />
      <section className="flex justify-center max-w-[900px] mb-5 w-full mx-auto pt-16">
        <ReviewGrid
          header={{
            dataType: 'brand',
          }}
          data={brandVideos?.rows?.[0]}
        />
      </section>
      <CategoriesSlider categories={categories} />
      <section className="flex justify-center max-w-[900px] w-full mx-auto pb-12 mt-5 md:pb-[70px]  ">
        <ReviewGrid
          header={{
            dataType: 'category',
          }}
          data={categoriesVideo?.rows?.[0]}
        />
      </section>
      <ConversionSlider brands={randomBrand} />
      <HowExpeerlyWorks />
    </div>
  );
};

export default HomePage;
