import Link from "next/link";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercentage = hasDiscount
    ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100)
    : 0;

  return (
    <div className="bg-white rounded-lg p-4 hover:shadow-lg transition group relative">
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
        {product.inventory < 10 && (
          <Badge className="bg-black hover:bg-black text-white">NEW</Badge>
        )}
        {hasDiscount && (
          <Badge className="bg-green-600 hover:bg-green-600 text-white">
            SAVE ${(product.compareAtPrice! - product.price).toFixed(2)}
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
          <Heart className="w-4 h-4" />
        </button>
        <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100">
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-6xl">
          {product.category === "Electronics" ? "📱" : "🎧"}
        </div>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
        <span>(152)</span>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.slug}`}>
        <h3 className="font-semibold mb-2 hover:text-green-600 transition line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={() => onAddToCart?.(product)}
        className="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  );
}