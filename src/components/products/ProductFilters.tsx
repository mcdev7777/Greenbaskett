"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (products: Product[]) => void;
  onClose?: () => void;
}

const categories = [
  { name: "All Categories", slug: "all" },
  { name: "Cell Phones & Tablets", slug: "phones-tablets", children: [
      { name: "All", slug: "all" },
      { name: "Iphone", slug: "iphone" },
      { name: "Samsung", slug: "samsung" },
      { name: "Xiaomi", slug: "xiaomi" },
      { name: "Asus", slug: "asus" },
      { name: "Oppo", slug: "oppo" },
      { name: "Gaming Smartphone", slug: "gaming" },
      { name: "Ipad", slug: "ipad" },
      { name: "Window Tablets", slug: "windows" },
      { name: "eReader", slug: "ereader" },
      { name: "Smartphone Chargers", slug: "chargers" },
      { name: "5G Support Smartphone", slug: "5g" },
      { name: "Smartphone Accessories", slug: "accessories" },
      { name: "Tablets Accessories", slug: "tablet-accessories" },
      { name: "Cell Phones $200", slug: "phones-200" },
    ]
  }
];

const brands = [
  { name: "envato", count: 14 },
  { name: "codecanyon", count: 6 },
  { name: "videohive", count: 7 },
  { name: "photodune", count: 18 },
  { name: "microlancer", count: 1 },
];

const colors = [
  { name: "Red", value: "red", color: "bg-red-600" },
  { name: "Blue", value: "blue", color: "bg-blue-600" },
  { name: "Sky", value: "sky", color: "bg-sky-400" },
  { name: "Black", value: "black", color: "bg-black" },
  { name: "Green", value: "green", color: "bg-green-600" },
  { name: "Gray", value: "gray", color: "bg-gray-500" },
  { name: "Purple", value: "purple", color: "bg-purple-600" },
];

const memories = [
  { name: "12GB", count: 4 },
  { name: "1.5GB", count: 1 },
  { name: "8GB", count: 3 },
  { name: "1GB", count: 1 },
  { name: "6GB", count: 12 },
  { name: "512MB", count: 2 },
  { name: "4GB", count: 6 },
  { name: "3GB", count: 7 },
];

const conditions = [
  { name: "New", count: 21 },
  { name: "Like New", count: 2 },
  { name: "Open Box", count: 38 },
];

const screenSizes = [
  { name: '7" & Under' },
  { name: '7.1" - 8.9"' },
  { name: '9" - 10.9"' },
  { name: '11" & Greater' },
];

export function ProductFilters({ products, onFilterChange, onClose }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState({ min: 45, max: 10000 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["phones-tablets"]);

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev =>
      prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug]
    );
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

      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">CATEGORIES</h3>
          <Button variant="link" className="text-sm text-green-600 p-0 h-auto">
            Reset All
          </Button>
        </div>

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
                    <button
                      key={child.slug}
                      onClick={() => setSelectedCategory(child.slug)}
                      className={`block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 ${
                        selectedCategory === child.slug ? "text-green-600 font-medium" : "text-gray-700"
                      }`}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-gray-100 rounded">Min: $45.00</span>
          <span className="px-2 py-1 bg-gray-100 rounded">10.9 inch</span>
          <span className="px-2 py-1 bg-gray-100 rounded">Color: Red</span>
          <span className="px-2 py-1 bg-gray-100 rounded">128GB</span>
        </div>
      </div>

      {/* Price Range */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="10000"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
            className="w-full accent-green-600"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center border rounded px-3 py-2 flex-1">
              <span className="text-sm">$</span>
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) })}
                className="w-full outline-none ml-1 text-sm"
              />
            </div>
            <span className="text-gray-400">—</span>
            <div className="flex items-center border rounded px-3 py-2 flex-1">
              <span className="text-sm">$</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                className="w-full outline-none ml-1 text-sm"
              />
            </div>
            <Button className="bg-green-600 hover:bg-green-700 px-4">Go</Button>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Brands</h3>
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search brands..."
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand.name} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm flex-1">{brand.name}</span>
              <span className="text-xs text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2].map((rating) => (
            <label key={rating} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
                    ⭐
                  </span>
                ))}
              </div>
              <span className="text-xs text-gray-500 ml-auto">
                ({rating === 5 ? 52 : rating === 4 ? 24 : rating === 3 ? 5 : 1})
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Screen Size */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Screen Size</h3>
        <div className="flex flex-wrap gap-2">
          {screenSizes.map((size) => (
            <button
              key={size.name}
              className="px-3 py-1 border rounded hover:border-green-600 hover:text-green-600 text-sm"
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Color</h3>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              className={`w-10 h-10 rounded-full border-2 border-gray-300 hover:border-green-600 ${color.color}`}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Memory */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Memory</h3>
        <div className="grid grid-cols-2 gap-2">
          {memories.map((memory) => (
            <label key={memory.name} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{memory.name}</span>
              <span className="text-xs text-gray-500">({memory.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Conditions */}
      <div className="border-t pt-4">
        <h3 className="font-bold mb-4">By Conditions</h3>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition.name} className="flex items-center gap-2 cursor-pointer">
              <Checkbox />
              <span className="text-sm">{condition.name}</span>
              <span className="text-xs text-gray-500 ml-auto">({condition.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="border-t pt-4">
        <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-lg p-6 h-48 overflow-hidden">
          <div className="relative z-10 text-white">
            <h3 className="text-xl font-bold mb-4">
              OKODo hero 11+
              <br />
              5K wireless
            </h3>
            <p className="text-sm text-gray-400 mb-1">FROM</p>
            <p className="text-2xl font-bold text-green-500">$169</p>
          </div>
        </div>
      </div>
    </div>
  );
}