"use client";

import { useState } from "react";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Product } from "@/types";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductsContentProps {
  products: Product[];
}

export function ProductsContent({ products }: ProductsContentProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters Sidebar */}
        <aside
          className={`
            lg:col-span-3
            ${showFilters ? "block" : "hidden lg:block"}
          `}
        >
          <ProductFilters
            products={products}
            onFilterChange={setFilteredProducts}
            onClose={() => setShowFilters(false)}
          />
        </aside>

        {/* Product Grid */}
        <main className="lg:col-span-9">
          <ProductGrid products={filteredProducts} />
        </main>
      </div>
    </section>
  );
}