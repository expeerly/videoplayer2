import { HeroSection } from './components/server/HeroSection';
import { ExpolreReviewers } from './components/server/ExploreReviewers';
import { HowExpeerlyWorks } from './components/server/HowExpeerlyWork';
import { BrandsSlider } from './components/server/BrandsSlider';
import { CategoriesSlider } from './components/server/CategoriesSlider';
import { ConversionSlider } from './components/server/Conversion';
import { NextPage, Metadata } from 'next';
import { getDictionary } from './lib/dictionary';
import { ReviewGrid } from '../components/server/ReviewGrid';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();

  return {
    title: t.home_site_title,
    description: t.home_meta_description,
  };
}

const HomePage: NextPage = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <HeroSection />
      <ExpolreReviewers />
      <BrandsSlider />
      <section className="flex justify-center max-w-[900px] mb-5 w-full mx-auto pt-16">
        <ReviewGrid />
      </section>
      <CategoriesSlider />
      <section className="flex justify-center max-w-[900px] w-full mx-auto pb-12 mt-5 md:pb-[70px]  ">
        <ReviewGrid />
      </section>
      <ConversionSlider />
      <HowExpeerlyWorks />
    </div>
  );
};

export default HomePage;
