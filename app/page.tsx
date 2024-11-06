import { HeroSection } from "@/components/HeroSection";
import { ExpolreReviewers } from "@/components/ExploreReviewers";
import { HowExpeerlyWorks } from "@/components/HowExpeerlyWork";
import Footer from "@/components/Footer";
import { Slider } from "@/components/Slider";
import { MobileSlider } from "@/components/ui/MobileSlider";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <HeroSection />
      <ExpolreReviewers />
      <Slider />
      <MobileSlider />
      <HowExpeerlyWorks />
      <Footer />
    </div>
  );
}
