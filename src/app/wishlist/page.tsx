"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export default function WishlistPage() {
  const { items, fetchWishlist, removeFromWishlist, isLoading } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [cartLoading, setCartLoading] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchWishlist();
  }, [fetchWishlist]);

  const handleAddToCart = async (productId: string) => {
    setCartLoading(productId);
    try {
      const item = items.find((item) => item.productId === productId);
      if (item) {
        await addToCart(item.product, 1);
      }
    } finally {
      setCartLoading(null);
    }
  };

  const handleRemoveFromWishlist = async (productId: string) => {
    await removeFromWishlist(productId);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Wishlist</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {items.length === 0
              ? "Your wishlist is empty"
              : `You have ${items.length} item${items.length !== 1 ? "s" : ""} in your wishlist`}
          </p>
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Add items to your wishlist to save them for later. Start exploring our products!
            </p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((wishlistItem) => {
              const { product } = wishlistItem;
              const hasDiscount =
                product.compareAtPrice && product.compareAtPrice > product.price;
              const discountAmount = hasDiscount
                ? product.compareAtPrice! - product.price
                : 0;
              const isInStock = product.inventory > 0;

              return (
                <div
                  key={wishlistItem.id}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  {/* Image */}
                  <Link href={`/products/${product.slug}`} className="block">
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <Image
                        src={product.images[0] || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition"
                      />
                      {!isInStock && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-4">
                    {/* Badges */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {hasDiscount && (
                        <Badge className="bg-green-600 hover:bg-green-600 text-white text-xs">
                          SAVE {formatPrice(discountAmount)}
                        </Badge>
                      )}
                      {!isInStock && (
                        <Badge className="bg-red-600 hover:bg-red-600 text-white text-xs">
                          OUT OF STOCK
                        </Badge>
                      )}
                    </div>

                    {/* Product Name */}
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-semibold hover:text-green-600 transition line-clamp-2 mb-2">
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
                    <p
                      className={`text-xs mb-4 flex items-center gap-1 ${
                        isInStock ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${isInStock ? "bg-green-600" : "bg-red-600"}`}></span>
                      {isInStock ? "In stock" : "Out of stock"}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={!isInStock || cartLoading === product.id}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm h-10"
                      >
                        {cartLoading === product.id ? (
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </>
                        )}
                      </Button>
                      <button
                        onClick={() => handleRemoveFromWishlist(product.id)}
                        className="px-4 border rounded-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition flex items-center justify-center"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <div className="mt-12 bg-white rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Continue Shopping?</h2>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                View All Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
