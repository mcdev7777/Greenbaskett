"use client";

import { useState, useCallback } from "react";
import { X } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useProductFilters } from "@/lib/useProductFilters";

interface ProductFiltersProps {
  products: Product[];
  onClose?: () => void;
}

const categories = [
  { name: "All Categories", slug: "all" },
  {
    name: "Cell Phones & Tablets",
    slug: "Cell Phones & Tablets",
    children: [
      { name: "All", slug: "all" },
      { name: "iPhone", slug: "iPhone" },
      { name: "Samsung", slug: "Samsung" },
      { name: "Google Pixel", slug: "Google" },
      { name: "OnePlus", slug: "OnePlus" },
      { name: "Xiaomi", slug: "Xiaomi" },
      { name: "OPPO", slug: "OPPO" },
      { name: "Motorola", slug: "Motorola" },
      { name: "Tablets", slug: "Tablets" },
    ],
  },
];

const colors = [
  { name: "Black", value: "black", color: "bg-black" },
  { name: "Blue", value: "blue", color: "bg-blue-600" },
  { name: "Purple", value: "purple", color: "bg-purple-600" },
  { name: "Red", value: "red", color: "bg-red-600" },
  { name: "Gray", value: "gray", color: "bg-gray-500" },
  { name: "Silver", value: "silver", color: "bg-gray-300" },
];

const conditions = [
  { name: "New", value: "New" },
  { name: "Like New", value: "Like New" },
  { name: "Open Box", value: "Open Box" },
];

const screenSizes = [
  { name: '5" - 6"', value: "6\"" },
  { name: '6" - 7"', value: "6.7\"" },
  { name: '6.7" - 6.8"', value: "6.78\"" },
  { name: "7\" & Up", value: "7.6\"" },
  { name: "11\" - 12\"", value: "11\"" },
  { name: "12.9\" & Up", value: "12.9\"" },
];

export function ProductFilters({ products, onClose }: ProductFiltersProps) {
  const { filters, toggleFilter, updateFilter, activeFilterCount, resetFilters } =
    useProductFilters(products);

  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Cell Phones & Tablets"]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  // Get unique values from products for dynamic filter counts
  const getBrandOptions = useCallback(() => {
    const brands = [...new Set(products.map((p) => p.brand))].sort();
    return brands.map((brand) => ({
      name: brand,
      value: brand,
      count: products.filter((p) => p.brand === brand).length,
    }));
  }, [products]);

  const getMemoryOptions = useCallback(() => {
    const memories = [...new Set(products.map((p) => p.memory))].filter((m) => m !== "N/A").sort();
    return memories.map((memory) => ({
      name: memory,
      value: memory,
      count: products.filter((p) => p.memory === memory).length,
    }));
  }, [products]);

  const handlePriceChange = (type: "min" | "max", value: number) => {
    if (type === "min") {
      updateFilter("priceMin", Math.max(0, Math.min(value, filters.priceMax)));
    } else {
      updateFilter("priceMax", Math.min(10000, Math.max(value, filters.priceMin)));
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 space-y-6 sticky top-4">
      {/* Mobile Close Button */}
      {onClose && (
        <div className="lg:hidden flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Filters</h3>
          <button onClick={onClose}>
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Filter Header with Reset */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-lg">FILTERS</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            Reset All ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-bold text-sm mb-4 uppercase">Categories</h3>

        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.slug}>
              <button
                onClick={() => toggleCategory(category.slug)}
                className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded font-medium text-sm"
              >
                {category.name}
              </button>

              {category.children && expandedCategories.includes(category.slug) && (
                <div className="ml-4 space-y-1 mt-1">
                  {category.children.map((child) => (
                    <label
                      key={child.slug}
                      className="flex items-center gap-2 cursor-pointer py-1 px-3 rounded hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={filters.categories.includes(child.slug)}
                        onCheckedChange={() => toggleFilter("categories", child.slug)}
                      />
                      <span className="text-sm text-gray-700">{child.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Price Range</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="10000"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange("max", parseInt(e.target.value))}
            className="w-full accent-green-600"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded px-3 py-2 flex-1">
              <span className="text-sm">$</span>
              <input
                type="number"
                value={filters.priceMin}
                onChange={(e) => handlePriceChange("min", parseInt(e.target.value))}
                className="w-full outline-none ml-1 text-sm"
              />
            </div>
            <span className="text-gray-400">—</span>
            <div className="flex items-center border rounded px-3 py-2 flex-1">
              <span className="text-sm">$</span>
              <input
                type="number"
                value={filters.priceMax}
                onChange={(e) => handlePriceChange("max", parseInt(e.target.value))}
                className="w-full outline-none ml-1 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Brands</h3>
        <div className="space-y-2">
          {getBrandOptions().map((brand) => (
            <label key={brand.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.brands.includes(brand.value)}
                onCheckedChange={() => toggleFilter("brands", brand.value)}
              />
              <span className="text-sm flex-1">{brand.name}</span>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">By Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.rating === rating}
                onCheckedChange={() => updateFilter("rating", filters.rating === rating ? 0 : rating)}
              />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-auto">& up</span>
            </label>
          ))}
        </div>
      </div>

      {/* Screen Size */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Screen Size</h3>
        <div className="flex flex-wrap gap-2">
          {screenSizes.map((size) => (
            <button
              key={size.value}
              onClick={() => toggleFilter("screenSize", size.value)}
              className={`px-3 py-1 border rounded text-sm transition-colors ${
                filters.screenSize.includes(size.value)
                  ? "bg-green-600 text-white border-green-600"
                  : "border-gray-300 hover:border-green-600 hover:text-green-600"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleFilter("colors", color.value)}
              className={`w-10 h-10 rounded-full border-2 transition-colors ${
                filters.colors.includes(color.value)
                  ? `${color.color} border-green-600`
                  : `${color.color} border-gray-300 hover:border-green-600`
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Memory */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Memory</h3>
        <div className="grid grid-cols-2 gap-2">
         {getMemoryOptions().map((memory, index) => (
  <label key={`${memory.value}-${index}`} className="flex items-center gap-2 cursor-pointer">
    <Checkbox
      checked={filters.memory.includes(memory.value)}
      onCheckedChange={() => toggleFilter("memory", memory.value)}
    />
    <span className="text-sm">{memory.label}</span>
  </label>
))}
        </div>
      </div>

      {/* Condition */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-sm mb-4 uppercase">Condition</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition.value} className="flex items-center gap-2 cursor-pointer">
              <Checkbox
                checked={filters.condition.includes(condition.value)}
                onCheckedChange={() => toggleFilter("condition", condition.value)}
              />
              <span className="text-sm">{condition.name}</span>
              <span className="text-xs text-gray-500 ml-auto">
                ({products.filter((p) => p.condition === condition.value).length})
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}