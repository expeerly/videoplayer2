import { Button } from "@nextui-org/button";

import { BrandSlider } from "@/components/client/Brandslider";
import { Conversion } from "@/components/client/Conversion";
import { ExploreCategories } from "@/components/client/ExploreCategories";
import { Footer } from "@/components/server/Footer";
import { ReviewsGrid } from "@/components/server/ReviewsGrid";
import { HeroSection } from "@/components/client/HeroSection";
import { HowExpeerlyWorks } from "@/components/server/HowExpeerlyWorks";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <HeroSection />
      <div className="w-full max-w-[863px] my-4 md:my-16 ">
        <h1 className=" font-extrabold text-2xl  w-[99%] sm:text-start text-center md:mx-5 xl:mx-0  md:w-[60%]">
          Each Expeerly reviewer has a personal story to share{" "}
        </h1>
        <div className="max-w-[863px] w-full px-5 xl:px-0 py-4 flex  justify-center">
          <ReviewsGrid />
        </div>
        <div className="max-w-[863px] w-full  px-5 xl:px-0 py-4 justify-center">
          <ReviewsGrid />
        </div>
        <div className="px-[18px]">
          <Button
            className=" bg-pink-500 sm:w-[300px] w-full font-bold  mt-2 mb-10 md:mb-0 text-white "
            color="danger"
            radius="full"
          >
            Explore All Reviewers
          </Button>
        </div>
      </div>
      <BrandSlider />
      <div className="max-w-[863px] w-full px-5 xl:px-0 py-4 md:py-16 justify-center">
        <ReviewsGrid />
      </div>
      <ExploreCategories />
      <div className="max-w-[863px] w-full px-5 xl:px-0 py-4 justify-center">
        <ReviewsGrid />
      </div>
      <Conversion />
      <HowExpeerlyWorks />
      <Footer />
    </div>
  );
}
