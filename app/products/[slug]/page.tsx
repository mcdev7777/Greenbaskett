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
  const resolvedParams = await params;
  const product = await api.getProductBySlug(resolvedParams.slug);

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
          { label: product.category || "Products", href: `/products?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <ProductDetailSection product={product} />
      <RelatedProducts products={relatedProducts} />
      <ProductTabs product={product} />
      <ShoppingCartSection />
      <CheckoutSection />
    </div>
  );
}
