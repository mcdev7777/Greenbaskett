import { Product } from "@/types";

/**
 * Search products by query across multiple fields
 * Searches in: name, description, category, brand, and tags
 * Case-insensitive search
 */
export function searchProducts(
  products: Product[],
  query: string
): Product[] {
  if (!query.trim()) {
    return products;
  }

  const lowercaseQuery = query.toLowerCase().trim();

  return products.filter((product) => {
    const searchableText = [
      product.name.toLowerCase(),
      product.description.toLowerCase(),
      product.category.toLowerCase(),
      product.brand.toLowerCase(),
    ].join(" ");

    return searchableText.includes(lowercaseQuery);
  });
}

/**
 * Get search suggestions based on query
 * Returns up to 5 suggestions from products
 */
export function getSearchSuggestions(
  products: Product[],
  query: string,
  limit: number = 5
): Product[] {
  if (!query.trim()) {
    return [];
  }

  return searchProducts(products, query).slice(0, limit);
}

/**
 * Highlight search term in text
 * Used for displaying search results
 */
export function highlightSearchTerm(
  text: string,
  query: string
): { text: string; isMatch: boolean }[] {
  if (!query.trim()) {
    return [{ text, isMatch: false }];
  }

  const parts: { text: string; isMatch: boolean }[] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  let lastIndex = 0;

  let index = lowerText.indexOf(lowerQuery);
  while (index !== -1) {
    if (index > lastIndex) {
      parts.push({ text: text.substring(lastIndex, index), isMatch: false });
    }
    parts.push({
      text: text.substring(index, index + query.length),
      isMatch: true,
    });
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.substring(lastIndex), isMatch: false });
  }

  return parts.length > 0 ? parts : [{ text, isMatch: false }];
}
