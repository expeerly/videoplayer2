import { Metadata } from "next";

import VideoMoreInfo from "@/components/client/VideoMoreIfo";

type VideoDetailPageProps = {
  params: {
    productcategory: string;
    brandname: string;
    productname: string;
    uniqueId: string;
  };
};

export async function generateMetadata({
  params,
}: VideoDetailPageProps): Promise<Metadata> {
  return {
    title: `${params.productname} by ${params.brandname} Review - Expeerly`,
    description: `Watch video review of ${params.productname} by ${params.brandname}`,
  };
}

export default function VideoDetailPage({ params }: VideoDetailPageProps) {
  return (
    <div className="container mx-auto px-4">
      <VideoMoreInfo />
    </div>
  );
}
