"use client";

import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface RecentlyViewedProps {
  products?: Product[];
}

export function RecentlyViewed({ products: initialProducts }: RecentlyViewedProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts);

  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          const data = await api.getProducts();
          setProducts(data);
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg p-8 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">YOUR RECENTLY VIEWED</h2>
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="text-sm text-gray-600 hover:text-green-600 transition"
            >
              View All
            </Link>
            <div className="flex gap-2">
              <button className="w-8 h-8 border rounded hover:bg-gray-100 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 border rounded hover:bg-gray-100 flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="col-span-full text-center text-gray-600">Loading products...</p>
          ) : products.length > 0 ? (
            products.slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">No products available</p>
          )}
        </div>
      </div>
    </section>
  );
}