"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/types";
import { getSearchSuggestions } from "@/lib/search";
import { Loader2, TrendingUp, Clock, X } from "lucide-react";
import Link from "next/link";

interface SearchSuggestionsProps {
  products: Product[];
  isOpen: boolean;
  query: string;
  onSelect: (query: string) => void;
}

export function SearchSuggestions({
  products,
  isOpen,
  query,
  onSelect,
}: SearchSuggestionsProps) {
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Update suggestions when query changes
  useEffect(() => {
    if (query.trim()) {
      const newSuggestions = getSearchSuggestions(products, query, 5);
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
    setSelectedIndex(-1);
  }, [query, products]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      const totalItems = suggestions.length + recentSearches.length;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < totalItems - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
          e.preventDefault();
          if (selectedIndex >= 0) {
            if (selectedIndex < suggestions.length) {
              onSelect(suggestions[selectedIndex].name);
            } else {
              const recentIndex = selectedIndex - suggestions.length;
              onSelect(recentSearches[recentIndex]);
            }
          }
          break;
        case "Escape":
          e.preventDefault();
          setSelectedIndex(-1);
          break;
      }
    },
    [isOpen, suggestions, recentSearches, selectedIndex, onSelect]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleSuggestionClick = (term: string) => {
    onSelect(term);
    // Save to recent searches
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  if (!isOpen || (!query.trim() && recentSearches.length === 0)) {
    return null;
  }

  return (
    <div
      ref={suggestionsRef}
      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border z-50 max-h-96 overflow-y-auto"
    >
      {/* Product Suggestions */}
      {query.trim() && suggestions.length > 0 && (
        <div className="border-b">
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
            <TrendingUp className="w-3 h-3 inline mr-2" />
            Search Results
          </div>
          {suggestions.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleSuggestionClick(product.name)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition ${
                selectedIndex === index ? "bg-green-50" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {product.name}
                </p>
                <p className="text-xs text-gray-600 truncate">
                  {product.category}
                </p>
              </div>
              <span className="text-sm font-semibold text-green-600">
                ${product.price}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && !query.trim() && (
        <div>
          <div className="flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">
            <span className="flex items-center">
              <Clock className="w-3 h-3 inline mr-2" />
              Recent Searches
            </span>
            <button
              onClick={clearRecentSearches}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          {recentSearches.map((search, index) => (
            <button
              key={search}
              onClick={() => handleSuggestionClick(search)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition ${
                selectedIndex === suggestions.length + index ? "bg-green-50" : ""
              }`}
            >
              <Clock className="w-3 h-3 inline mr-2 text-gray-400" />
              <span className="text-gray-700">{search}</span>
            </button>
          ))}
        </div>
      )}

      {/* No Results */}
      {query.trim() && suggestions.length === 0 && (
        <div className="px-4 py-6 text-center text-gray-600">
          <p>No products found for "{query}"</p>
          <p className="text-sm text-gray-500 mt-1">Try different search terms</p>
        </div>
      )}
    </div>
  );
}
