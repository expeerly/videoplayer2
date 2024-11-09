import { HeroSection } from "@/app/components/server/HeroSection";
import { ExpolreReviewers } from "@/app/components/server/ExploreReviewers";
import { HowExpeerlyWorks } from "@/app/components/server/HowExpeerlyWork";
import { BrandsSlider } from "@/app/components/server/BrandsSlider";
import { ReviewGrid } from "@/components/ui/server/ReviewGrid";
import { CategoriesSlider } from "@/app/components/server/CategoriesSlider";
import { ConversionSlider } from "@/app/components/server/Conversion";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <HeroSection />
      <ExpolreReviewers />
      <BrandsSlider />
      <section className="flex justify-center max-w-[900px] mb-5 w-full mx-auto pt-16 pl-5 mid-lg:pl-0">
        <ReviewGrid />
      </section>
      <CategoriesSlider />
      <section className="flex justify-center max-w-[900px] w-full mx-auto pb-12 mt-5 pl-5 md:pb-[70px] mid-lg:pl-0 ">
        <ReviewGrid />
      </section>
      <ConversionSlider />
      <HowExpeerlyWorks />
    </div>
  );
}
