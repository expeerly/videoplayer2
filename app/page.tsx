
import { HeroSection } from "@/components/HeroSection";
import { ExpolreReviewers } from "@/components/ExploreReviewers";
import { HowExpeerlyWorks } from "@/components/HowExpeerlyWork";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <HeroSection/>
      <ExpolreReviewers/>
     
      <HowExpeerlyWorks/>
      <Footer/>
    </div>
  );
}
