"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { BrandCard } from "./BrandCard";
import { MiniCart } from "./MiniCart";

interface ProductDetailSectionProps {
  product: Product;
}

export function ProductDetailSection({ product }: ProductDetailSectionProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const { addItem } = useCartStore();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

  const isFavorited = isInWishlist(product.id);

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price;
  const isInStock = product.inventory > 0;

  const handleAddToCart = async () => {
    await addItem(product, quantity);
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
    setIsWishlistLoading(true);
    try {
      if (isFavorited) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product);
      }
    } finally {
      setIsWishlistLoading(false);
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
              {product.inventory < 10 && isInStock && (
                <Badge className="absolute top-4 left-4 z-10 bg-black hover:bg-black text-white">
                  NEW
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
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? "border-green-600" : "border-gray-200"
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
            </div>
          </div>
        </div>

        {/* Center: Product Info */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg p-6">
            {/* Rating */}
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-yellow-400">⭐</span>
                ))}
              </div>
              <span>(5)</span>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  {formatPrice(product.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Specifications */}
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Commanding Power Design: Twin 16+1+2 Phases Digital VRM</span>
              </li>
            </ul>

            {/* Free Shipping Badge */}
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 mb-4">
              FREE SHIPPING
            </Badge>

            {/* Stock Status */}
            {isInStock ? (
              <p className="text-sm text-green-600 mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In stock
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
                <label className="text-sm font-semibold mb-2 block">qty</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 font-semibold">{quantity}</span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-100"
                      disabled={quantity >= product.inventory}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    disabled={!isInStock}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white h-12 text-base"
                  >
                    ADD TO CART
                  </Button>

                  <button 
                    onClick={handleWishlistToggle}
                    disabled={isWishlistLoading}
                    className="p-3 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Heart 
                      className="w-5 h-5" 
                      fill={isFavorited ? "currentColor" : "none"}
                      color={isFavorited ? "red" : "currentColor"}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Payment Icons */}
            <div className="border-t pt-4 mb-6">
              <p className="text-sm font-semibold mb-3">Guaranteed Safe Checkout</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm font-semibold">McAfee SECURE</span>
                <span className="text-2xl">💳</span>
                <span className="text-sm">Visa</span>
                <span className="text-sm">Mastercard</span>
                <span className="text-sm">Discover</span>
                <span className="text-sm">Amex</span>
              </div>
            </div>

            {/* Product Meta */}
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold">SKU:</span>
                <span className="text-gray-600">ABC025168</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">CATEGORY:</span>
                <span className="text-gray-600">{product.category}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">TAGS:</span>
                <span className="text-gray-600">Laptop, Macbook, Computer, M1</span>
              </div>
            </div>

            {/* Social Share */}
            <div className="border-t pt-4 mt-4">
              <div className="flex gap-2">
                {["twitter", "facebook", "instagram", "youtube", "dribbble"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <span className="text-sm">📱</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Brand Card + Mini Cart */}
        <div className="lg:col-span-3 space-y-6">
          <BrandCard brand="Sonex" />
          <MiniCart />
        </div>
      </div>
    </section>
  );
}