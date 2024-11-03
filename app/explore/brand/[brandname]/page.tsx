import { Metadata } from "next";

import { BrandProfilePage } from "@/components/client/BrandProfilePage";
import Footer from "@/components/server/Footer";

type BrandPageProps = {
  params: {
    brandname: string;
  };
};

export async function generateMetadata({
  params,
}: BrandPageProps): Promise<Metadata> {
  return {
    title: `${params.brandname} Reviews - Expeerly`,
    description: `Discover video reviews for ${params.brandname} products`,
  };
}

export default function BrandPage({ params }: BrandPageProps) {
  return (
    <div className="">
      <div className="container mx-auto max-w-[532px]">
        <BrandProfilePage />
      </div>
      <Footer />
    </div>
  );
}
