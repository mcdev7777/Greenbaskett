import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductDetailSection } from "@/components/product-detail/ProductDetailSection";
import { RelatedProducts } from "@/components/product-detail/RelatedProducts";
import { ProductTabs } from "@/components/product-detail/ProductTabs";
import { ShoppingCartSection } from "@/components/product-detail/ShoppingCartSection";
import { CheckoutSection } from "@/components/product-detail/CheckoutSection";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await api.getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  // Get all products for related products
  const allProducts = await api.getProducts();
  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: "Top Cell Phones & Tablets", href: "/products?category=phones" },
          { label: product.name },
        ]}
      />

      {/* Section 1: Product Detail */}
      <ProductDetailSection product={product} />

      {/* Section 2: Related Products */}
      <RelatedProducts products={relatedProducts} />

      {/* Section 3: Tabs (Description, Reviews, Additional Info) */}
      <ProductTabs product={product} />

      {/* Section 4: Shopping Cart */}
      <ShoppingCartSection />

      {/* Section 5: Checkout */}
      <CheckoutSection />
    </div>
  );
}