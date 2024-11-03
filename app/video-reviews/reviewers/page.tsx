import { Metadata } from "next";

import { ReviewersPage } from "@/components/client/ReviewersPage";

type VideoReviewersPageProps = {
  searchParams: {
    brand?: string;
    category?: string;
  };
};

export const metadata: Metadata = {
  title: "Video Reviewers - Expeerly",
  description: "Browse all video reviewers and their content",
};

export default function VideoReviewersPage({
  searchParams,
}: VideoReviewersPageProps) {
  return (
    <div className="container mx-auto max-w-[532px]">
      <ReviewersPage />
    </div>
  );
}
