import { Metadata } from "next";

import { BrandProfilePage } from "@/components/client/BrandProfilePage";

interface BrandVideosPageProps {
  params: {
    brandname: string;
  };
}

export async function generateMetadata({
  params,
}: BrandVideosPageProps): Promise<Metadata> {
  return {
    title: `${params.brandname} Video Reviews - Expeerly`,
    description: `Watch all video reviews for ${params.brandname} products`,
  };
}

export default function BrandVideosPage({ params }: BrandVideosPageProps) {
  return (
    <div className="container mx-auto max-w-[532px]">
      <BrandProfilePage />
    </div>
  );
}
