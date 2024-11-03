import { Metadata } from "next";

import { CategoryPage } from "@/components/client/CategoryPage";
import Footer from "@/components/server/Footer";

interface CategoryPageProps {
  params: {
    productcategory: string;
  };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  return {
    title: `${params.productcategory} Reviews - Expeerly`,
    description: `Discover video reviews in ${params.productcategory} category`,
  };
}

export default function SingleCategoryPage({ params }: CategoryPageProps) {
  return (
    <div>
      <div className="container mx-auto w-[532px]">
        <CategoryPage />
      </div>
      <Footer />
    </div>
  );
}
