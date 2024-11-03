import { Metadata } from "next";

import { ReviewerProfile } from "@/components/client/ReviewerProfile";
import Footer from "@/components/server/Footer";

type ReviewerPageProps = {
  params: {
    reviewerId: string;
  };
};

export async function generateMetadata({
  params,
}: ReviewerPageProps): Promise<Metadata> {
  return {
    title: `Reviewer Profile - Expeerly`,
    description: `Watch video reviews by this creator`,
  };
}

export default function ReviewerPage({ params }: ReviewerPageProps) {
  return (
    <div>
      <div className="container mx-auto max-w-[532px]">
        <ReviewerProfile />
      </div>
      <Footer />
    </div>
  );
}
