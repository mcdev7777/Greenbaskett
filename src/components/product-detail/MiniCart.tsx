"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";

export function MiniCart() {
  const { items, getTotal, removeItem, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="bg-white border-2 border-green-600 rounded-lg p-6">
        <h3 className="font-bold text-lg mb-4">Your Cart</h3>
        <p className="text-gray-500 text-sm">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-green-600 rounded-lg p-6">
      <h3 className="font-bold text-lg mb-4">Your Cart</h3>

      {/* Cart Items */}
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
              <Image
                src={item.product.images[0] || "/placeholder.png"}
                alt={item.product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                {item.product.name}
              </h4>
              <p className="text-sm text-gray-600">
                {item.quantity} x {formatPrice(item.product.price)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-400 hover:text-red-600 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Subtotal */}
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Sub Total:</span>
          <span className="text-xl font-bold">{formatPrice(total)}</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2">
        <Button
          asChild
          className="w-full bg-gray-900 hover:bg-gray-800 text-white"
        >
          <Link href="#cart-section">VIEW CART</Link>
        </Button>
        <Button
          asChild
          className="w-full bg-green-600 hover:bg-green-700 text-white"
        >
          <Link href="#checkout-section">CHECKOUT</Link>
        </Button>
      </div>

      {/* Shipping Info */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4" />
          <span>Ships from <span className="font-semibold">United States</span></span>
        </div>
      </div>
    </div>
  );
}