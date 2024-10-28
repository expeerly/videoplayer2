import BrandSlider from "@/components/brandslider";
import Conversion from "@/components/conversion";
import ExploreCategories from "@/components/ExploreCategories";
import Footer from "@/components/Footer";
import ProductReviews from "@/components/ProductReviews";
import ProductReviewsCard from "@/components/ProductReviewscard";
import React from "react";


export default function Home() {
  return (
     <div className="flex flex-col justify-center items-center"> 
      <ProductReviews/>
      <BrandSlider/>
      <ProductReviewsCard />
      <ExploreCategories/>
      <ProductReviewsCard/>
      <Conversion/>
      <Footer/>

      </div>
  );
}
