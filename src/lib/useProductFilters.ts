import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { Product } from "@/types";

export interface FilterState {
  priceMin: number;
  priceMax: number;
  categories: string[];
  brands: string[];
  rating: number;
  colors: string[];
  memory: string[];
  screenSize: string[];
  condition: string[];
}

export function useProductFilters(products: Product[]) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse filter state from URL
  const filters: FilterState = useMemo(() => {
    return {
      priceMin: parseInt(searchParams.get("priceMin") || "0"),
      priceMax: parseInt(searchParams.get("priceMax") || "10000"),
      categories: searchParams.get("categories")?.split(",").filter(Boolean) || [],
      brands: searchParams.get("brands")?.split(",").filter(Boolean) || [],
      rating: parseInt(searchParams.get("rating") || "0"),
      colors: searchParams.get("colors")?.split(",").filter(Boolean) || [],
      memory: searchParams.get("memory")?.split(",").filter(Boolean) || [],
      screenSize: searchParams.get("screenSize")?.split(",").filter(Boolean) || [],
      condition: searchParams.get("condition")?.split(",").filter(Boolean) || [],
    };
  }, [searchParams]);

  // Update URL with new filters
  const updateFilter = useCallback(
    (key: keyof FilterState, value: string | number | string[]) => {
      const params = new URLSearchParams(searchParams);

      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(","));
        } else {
          params.delete(key);
        }
      } else {
        if (value !== "" && value !== 0) {
          params.set(key, String(value));
        } else {
          params.delete(key);
        }
      }

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Toggle single filter value (for checkboxes/buttons)
  const toggleFilter = useCallback(
    (key: keyof FilterState, value: string) => {
      const current = filters[key];
      if (Array.isArray(current)) {
        const updated = current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];
        updateFilter(key, updated);
      }
    },
    [filters, updateFilter]
  );

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price filter
      if (product.price < filters.priceMin || product.price > filters.priceMax) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }

      // Rating filter (>= selected rating)
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false;
      }

      // Color filter
      if (filters.colors.length > 0 && !filters.colors.includes(product.color)) {
        return false;
      }

      // Memory filter
      if (filters.memory.length > 0 && !filters.memory.includes(product.memory)) {
        return false;
      }

      // Screen size filter
      if (filters.screenSize.length > 0 && !filters.screenSize.includes(product.screenSize)) {
        return false;
      }

      // Condition filter
      if (filters.condition.length > 0 && !filters.condition.includes(product.condition)) {
        return false;
      }

      return true;
    });
  }, [products, filters]);

  // Get active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceMin > 0) count++;
    if (filters.priceMax < 10000) count++;
    if (filters.categories.length > 0) count += filters.categories.length;
    if (filters.brands.length > 0) count += filters.brands.length;
    if (filters.rating > 0) count++;
    if (filters.colors.length > 0) count += filters.colors.length;
    if (filters.memory.length > 0) count += filters.memory.length;
    if (filters.screenSize.length > 0) count += filters.screenSize.length;
    if (filters.condition.length > 0) count += filters.condition.length;
    return count;
  }, [filters]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    router.push("?", { scroll: false });
  }, [router]);

  return {
    filters,
    filteredProducts,
    updateFilter,
    toggleFilter,
    activeFilterCount,
    resetFilters,
  };
}
