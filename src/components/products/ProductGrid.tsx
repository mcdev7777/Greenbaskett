"use client";

import { useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { Grid, List, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(currentPage + 1, totalPages - 1); i++) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="space-y-6">
      {/* Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-lg p-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search criteria to find what you're looking for.
          </p>
          <Button className="bg-green-600 hover:bg-green-700">Clear Filters</Button>
        </div>
      ) : (
        <>
          {/* Header Section - Only show if products exist */}
          <div className="bg-white rounded-lg p-4 md:p-6">
            <h2 className="text-xl md:text-2xl font-bold mb-4">BEST SELLER IN THIS CATEGORY</h2>

            {/* Featured Products - Horizontal Scroll on Mobile */}
            <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
              <div className="flex md:grid md:grid-cols-4 gap-4 min-w-max md:min-w-0">
                {products.slice(0, 4).map((product) => (
                  <div key={product.id} className="w-64 md:w-auto">
                    <ProductCard product={product} compact />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="bg-white rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Results Count */}
            <div className="text-sm text-gray-600">
              <span className="font-semibold">1 - {Math.min(itemsPerPage, products.length)}</span> of{" "}
              <span className="font-semibold">{products.length}</span> results
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Items Per Page */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">Show item</span>
                <div className="flex gap-1">
                  {[24, 48, 72].map((count) => (
                    <button
                      key={count}
                      onClick={() => {
                        setItemsPerPage(count);
                        setCurrentPage(1);
                      }}
                      className={`px-3 py-1 text-sm rounded ${
                        itemsPerPage === count
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:inline">Sort by</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Default" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-600">View As</span>
                <div className="flex gap-1 border rounded">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 ${viewMode === "grid" ? "bg-green-600 text-white" : "hover:bg-gray-100"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 ${viewMode === "list" ? "bg-green-600 text-white" : "hover:bg-gray-100"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
                : "space-y-4"
            }
          >
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page as number)}
                    className={`px-4 py-2 rounded ${
                      currentPage === page
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-gray-100 border"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded bg-white hover:bg-gray-100 border disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}