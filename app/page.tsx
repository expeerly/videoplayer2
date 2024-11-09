import { HeroSection } from "@/app/components/server/HeroSection";
import { ExpolreReviewers } from "@/app/components/server/ExploreReviewers";
import { HowExpeerlyWorks } from "@/app/components/server/HowExpeerlyWork";
import { BrandsSlider } from "@/app/components/server/BrandsSlider";
import { VideoGrid } from "@/components/ui/server/VideoGrid";
import { CategoeirsSlider } from "@/app/components/server/CategoeirsSlider";
import { ConversionSlider } from "@/app/components/server/Conversion";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <HeroSection />
      <ExpolreReviewers />
      <BrandsSlider />
      <section className="flex justify-center max-w-[900px] mb-5 w-full mx-auto pt-16 pl-5 mid-lg:pl-0">
        <VideoGrid />
      </section>
      <CategoeirsSlider />
      <section className="flex justify-center max-w-[900px] w-full mx-auto pb-12 mt-5 pl-5 md:pb-[70px] mid-lg:pl-0 ">
        <VideoGrid />
      </section>
      <ConversionSlider />
      <HowExpeerlyWorks />
    </div>
  );
}
