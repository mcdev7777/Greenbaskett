"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Eye, Loader, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  compact?: boolean;
}

export function ProductCard({ product, viewMode = "grid", compact = false }: ProductCardProps) {
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;
  const isInStock = product.inventory > 0;
  
  const { isInWishlist, addToWishlist, removeFromWishlist, isLoading: isWishlistLoading } = useWishlistStore();
  const { addItem, isInCart, isLoading: isCartLoading } = useCartStore();
  const [isCartAdding, setIsCartAdding] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const isItemInCart = isInCart(product.id);

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      if (isFavorited) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isItemInCart) return; // Prevent action if already in cart
    
    setIsCartAdding(true);
    try {
      await addItem(product, 1);
    } finally {
      setIsCartAdding(false);
    }
  };

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg p-4 hover:shadow-lg transition flex gap-4">
        {/* Image */}
        <Link href={`/products/${product.slug}`} className="relative w-32 h-32 flex-shrink-0">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-contain rounded"
          />
        </Link>

        {/* Content */}
        <div className="flex-1">
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold hover:text-green-600 transition mb-2">
              {product.name}
            </h3>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl font-bold text-red-600">
              {formatPrice(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.compareAtPrice!)}
              </span>
            )}
          </div>
          {isInStock ? (
            <p className="text-sm text-green-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              In stock
            </p>
          ) : (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <span className="w-2 h-2 bg-red-600 rounded-full"></span>
              Out of stock
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2">
          <button 
            onClick={handleWishlistToggle}
            disabled={isWishlistLoading}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50"
          >
            {isWishlistLoading ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Heart 
                className="w-4 h-4" 
                fill={isFavorited ? "currentColor" : "none"}
                color={isFavorited ? "red" : "currentColor"}
              />
            )}
          </button>
          <button 
            onClick={handleAddToCart}
            disabled={!isInStock || isCartAdding || isItemInCart}
            className={`w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 transition ${
              isItemInCart 
                ? 'bg-green-100 cursor-not-allowed' 
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            {isCartAdding ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : isItemInCart ? (
              <Check className="w-4 h-4 text-green-600" />
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg ${compact ? "p-3" : "p-4"} hover:shadow-lg transition group relative`}>
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {!isInStock && (
          <Badge className="bg-black hover:bg-black text-white">OUT OF STOCK</Badge>
        )}
        {product.inventory < 10 && isInStock && (
          <Badge className="bg-orange-500 hover:bg-orange-500 text-white">LOW STOCK</Badge>
        )}
        {hasDiscount && (
          <Badge className="bg-red-600 hover:bg-red-600 text-white">
            SAVE {discountPercent}%
          </Badge>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition">
        <button 
          onClick={handleWishlistToggle}
          disabled={isWishlistLoading}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 disabled:opacity-50"
        >
          {isWishlistLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            <Heart 
              className="w-4 h-4" 
              fill={isFavorited ? "currentColor" : "none"}
              color={isFavorited ? "red" : "currentColor"}
            />
          )}
        </button>
        <Link 
          href={`/products/${product.slug}`}
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Image */}
      <Link href={`/products/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 relative overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-contain p-4 group-hover:scale-105 transition"
          />
        </div>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2 text-xs text-gray-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
            ⭐
          </span>
        ))}
        <span>({product.rating})</span>
      </div>

      {/* Product Info */}
      <Link href={`/products/${product.slug}`}>
        <h3 className="font-semibold mb-2 hover:text-green-600 transition line-clamp-2 min-h-[48px]">
          {product.name}
        </h3>
      </Link>

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg font-bold text-red-600">
          {formatPrice(product.price)}
        </span>
        {hasDiscount && (
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      {isInStock ? (
        <p className="text-xs text-green-600 mb-2 flex items-center gap-1">
          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
          In stock
        </p>
      ) : (
        <p className="text-xs text-red-600 mb-2 flex items-center gap-1">
          <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          Out of stock
        </p>
      )}

      {/* Shipping Badge */}
      {!compact && (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs mb-3">
          FREE SHIPPING
        </Badge>
      )}

      {/* Add to Cart Button */}
      {!compact && (
        isInStock ? (
          <Button
            onClick={handleAddToCart}
            disabled={isCartAdding || isItemInCart}
            className={`w-full text-sm transition ${
              isItemInCart 
                ? 'bg-green-100 hover:bg-green-100 text-green-700 border border-green-300 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
            size="sm"
          >
            {isCartAdding ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Adding...
              </>
            ) : isItemInCart ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
        ) : (
          <Button
            disabled
            variant="outline"
            className="w-full text-sm cursor-not-allowed"
            size="sm"
          >
            Out of Stock
          </Button>
        )
      )}
    </div>
  );
}