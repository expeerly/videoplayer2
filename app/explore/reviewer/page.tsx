import { Metadata } from "next";

import { ReviewersPage } from "@/components/client/ReviewersPage";
import Footer from "@/components/server/Footer";

type Reviewer = {
  id: string;
  name: string;
  uniqueId: string;
};

export const metadata: Metadata = {
  title: "Video Reviewers - Expeerly",
  description: "Discover our community of video reviewers",
};

export default function AllReviewersPage() {
  return (
    <div>
      <div className="container mx-auto max-w-[532px]">
        <ReviewersPage />
      </div>
      <Footer />
    </div>
  );
}
