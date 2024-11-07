import { HeroSection } from "@/components/HeroSection";
import { ExpolreReviewers } from "@/components/ExploreReviewers";
import { HowExpeerlyWorks } from "@/components/HowExpeerlyWork";
import Footer from "@/components/Footer";
import { BrandsSlider } from "@/components/BrandsSlider";
import { VideoGrid } from "@/components/VideoGrid";
import { CategoeirsSlider } from "@/components/CategoeirsSlider";
import { ConversionSlider } from "@/components/Conversion";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection />
      <ExpolreReviewers />
      <BrandsSlider />
      <VideoGrid />
      <CategoeirsSlider />
      <VideoGrid />
      <ConversionSlider />
      <HowExpeerlyWorks />
    </div>
  );
}
