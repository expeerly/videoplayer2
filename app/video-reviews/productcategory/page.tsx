import { Metadata } from "next";

import { CategoriesPage } from "@/components/client/CategoriesPage";

type VideoReviewsCategoryPageProps = {
  searchParams: {
    brand?: string;
    category?: string;
  };
};

export const metadata: Metadata = {
  title: "Video Reviews by Category - Expeerly",
  description: "Browse video reviews filtered by category",
};

export default function VideoReviewsCategoryPage({
  searchParams,
}: VideoReviewsCategoryPageProps) {
  return (
    <div className="container mx-auto max-w-[532px]">
      <CategoriesPage />
    </div>
  );
}
