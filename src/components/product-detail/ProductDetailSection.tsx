"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Loader } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { BrandCard } from "./BrandCard";

interface ProductDetailSectionProps {
  product: Product;
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addItem, isLoading: isCartLoading } = useCartStore();
  const { isInWishlist, addToWishlist, removeFromWishlist, isLoading: isWishlistLoading } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(((product.compareAtPrice! - product.price) / product.compareAtPrice!) * 100) : 0;
  const isInStock = product.inventory > 0;

  const handleAddToCart = async () => {
    await addItem(product, quantity);
    setQuantity(1); // Reset quantity after adding
  };

  const incrementQuantity = () => {
    if (quantity < product.inventory) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      if (isFavorited) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } catch (error) {
      // Error is handled in the store
    }
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Product Gallery */}
        <div className="lg:col-span-5">
          <div className="bg-white rounded-lg p-6">
            {/* Badges */}
            <div className="relative">
              {!isInStock && (
                <Badge className="absolute top-4 left-4 z-10 bg-black hover:bg-black text-white">
                  OUT OF STOCK
                </Badge>
              )}

              {product.inventory < 10 && isInStock && (
                <Badge className="absolute top-4 left-4 z-10 bg-black hover:bg-black text-white">
                  LOW STOCK
                </Badge>
              )}

              {hasDiscount && (
                <Badge className="absolute top-4 left-4 z-10 bg-red-600 hover:bg-red-600 text-white">
                  SAVE {discountPercent}%
                </Badge>
              )}

              {/* Main Image */}
              <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden">
                <Image
                  src={product.images[selectedImage] || "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden transition-colors ${
                        selectedImage === index ? "border-green-600" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} view ${index + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Center: Product Info */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg p-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}>
                    ⭐
                  </span>
                ))}
              </div>
              <span>({product.rating})</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-red-600">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p className="text-gray-600">Brand</p>
                <p className="font-semibold">{product.brand}</p>
              </div>
              <div>
                <p className="text-gray-600">Color</p>
                <p className="font-semibold">{product.color}</p>
              </div>
              <div>
                <p className="text-gray-600">Condition</p>
                <p className="font-semibold">{product.condition}</p>
              </div>
              {product.screenSize !== "N/A" && (
                <div>
                  <p className="text-gray-600">Screen Size</p>
                  <p className="font-semibold">{product.screenSize}</p>
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">{product.description}</p>

            {/* Free Shipping Badge */}
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-4">
              FREE SHIPPING
            </Badge>

            {/* Stock Status */}
            {isInStock ? (
              <p className="text-sm text-green-600 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In stock ({product.inventory} available)
              </p>
            ) : (
              <p className="text-sm text-red-600 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Out of stock
              </p>
            )}

            {/* Quantity & Add to Cart */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-semibold mb-2 block">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-semibold">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100 disabled:opacity-50"
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock || isCartLoading}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
                  >
                    {isCartLoading ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Adding...
                      </>
                    ) : (
                      'ADD TO CART'
                    )}
                  </Button>

                  <button 
                    onClick={handleWishlistToggle}
                    disabled={isWishlistLoading}
                    className="p-3 border rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    {isWishlistLoading ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Heart 
                        className="w-5 h-5" 
                        fill={isFavorited ? "currentColor" : "none"}
                        color={isFavorited ? "red" : "currentColor"}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="border-t pt-4 mb-6">
              <p className="text-sm font-semibold mb-3">Guaranteed Safe Checkout</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl">🔒</span>
                <span className="text-sm font-semibold">Secure Payment</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold">Category:</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Brand:</span>
                <span className="text-gray-600">{product.brand}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Brand Card */}
        <div className="lg:col-span-3 space-y-6">
          <BrandCard brand={product.brand} />
        </div>
      </div>
    </section>
  );
}
