import { Metadata } from "next";

import VideoMoreInfo from "@/components/client/VideoMoreIfo";

type ProductPageProps = {
  params: {
    brandname: string;
    productname: string;
  };
};

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  return {
    title: `${params.productname} by ${params.brandname} - Expeerly`,
    description: `Video reviews for ${params.productname} by ${params.brandname}`,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="container mx-auto px-4">
      <VideoMoreInfo />
    </div>
  );
}
