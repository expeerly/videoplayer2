import { HeroSection } from "@/app/components/server/HeroSection";
import { ExpolreReviewers } from "@/app/components/server/ExploreReviewers";
import { HowExpeerlyWorks } from "@/app/components/server/HowExpeerlyWork";
import { BrandsSlider } from "@/app/components/server/BrandsSlider";
import { VideoGrid } from "@/components/ui/server/VideoGrid";
import { CategoeirsSlider } from "@/app/components/server/CategoeirsSlider";
import { ConversionSlider } from "@/app/components/server/Conversion";

const SECTION_IDS = {
  EXPLORE_REVIEWERS: 'explore-reviewers',
} as const;

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeroSection nextSectionId={SECTION_IDS.EXPLORE_REVIEWERS} />
      <ExpolreReviewers id={SECTION_IDS.EXPLORE_REVIEWERS} />
      <BrandsSlider />
      <VideoGrid />
      <CategoeirsSlider />
      <VideoGrid />
      <ConversionSlider />
      <HowExpeerlyWorks />
    </div>
  );
}
