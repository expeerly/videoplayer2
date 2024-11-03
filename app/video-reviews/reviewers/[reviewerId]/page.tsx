import { Metadata } from "next";

import { ReviewerProfile } from "@/components/client/ReviewerProfile";

type ReviewerVideosPageProps = {
  params: {
    reviewerId: string;
  };
  searchParams: {
    brand?: string;
    category?: string;
  };
};

export async function generateMetadata({
  params,
}: ReviewerVideosPageProps): Promise<Metadata> {
  return {
    title: `Creator Videos - Expeerly`,
    description: `Browse all videos by this creator`,
  };
}

export default function ReviewerVideosPage({
  params,
  searchParams,
}: ReviewerVideosPageProps) {
  return (
    <div className="container mx-auto max-w-[532px]">
      <ReviewerProfile />
    </div>
  );
}
