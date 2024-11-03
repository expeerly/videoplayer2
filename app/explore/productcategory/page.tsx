import { Metadata } from "next";

import { CategoriesPage } from "@/components/client/CategoriesPage";
import Footer from "@/components/server/Footer";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export const metadata: Metadata = {
  title: "Product Categories - Expeerly",
  description: "Browse all product categories with video reviews",
};

export default function ProductCategoriesPage() {
  return (
    <div>
      <div className="container mx-auto max-w-[532px]">
        <CategoriesPage />
      </div>
      <Footer />
    </div>
  );
}
