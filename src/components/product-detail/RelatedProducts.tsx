"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";

interface RelatedProductsProps {
  products: Product[];
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">RELATED PRODUCTS</h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 border rounded-lg flex items-center justify-center hover:bg-gray-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Scroll */}
        <div
          ref={scrollRef}
          className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide"
        >
          <div className="flex md:grid md:grid-cols-5 gap-4 min-w-max md:min-w-0">
            {products.map((product) => (
              <div key={product.id} className="w-64 md:w-auto">
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}