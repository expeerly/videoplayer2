import { Metadata } from "next";

import { CategoryPage } from "@/components/client/CategoryPage";

type CategoryDetailPageProps = {
  params: {
    productcategory: string;
  };
  searchParams: {
    brand?: string;
    sort?: string;
  };
};

export async function generateMetadata({
  params,
}: CategoryDetailPageProps): Promise<Metadata> {
  const formattedCategory = params.productcategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${formattedCategory} Video Reviews - Expeerly`,
    description: `Watch video reviews for ${formattedCategory} products`,
  };
}

export default function CategoryDetailPage({
  params,
  searchParams,
}: CategoryDetailPageProps) {
  // Format category name for display (e.g., "home-kitchen" -> "Home Kitchen")
  const formattedCategory = params.productcategory
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto max-w-[532px]">
      <CategoryPage />
    </div>
  );
}
