import { Metadata } from "next";

import { BrandsPage } from "@/components/client/BrandsPage";
import Footer from "@/components/server/Footer";

export const metadata: Metadata = {
  title: "Explore Brands - Expeerly",
  description: "Browse all brands with video reviews",
};

export default function ExploreBrandsPage() {
  return (
    <div>
      <div className="container mx-auto max-w-[532px]">
        <BrandsPage />
      </div>
      <Footer />
    </div>
  );
}
