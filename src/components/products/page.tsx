import { ProductsHero } from "./ProductsHero";
import { PopularCategories } from "./PopularCategories";
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
    </div>
  );
}