import { Suspense } from "react";
import { ProductsHero } from "@/components/products/ProductsHero";
import { PopularCategories } from "@/components/products/PopularCategories";
import { ProductsContent } from "@/components/products/ProductsContent";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { api } from "@/lib/api";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const products = await api.getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: "Top Cell Phones & Tablets" },
        ]}
      />

      {/* Hero Banners */}
      <ProductsHero />

      {/* Popular Categories */}
      <PopularCategories />

      {/* Main Products Content (Filters + Grid) */}
      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading products...</div>}>
        <ProductsContent products={products} />
      </Suspense>
    </div>
  );
}
