"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function ShoppingCartSection() {
  const { items, updateQuantity, removeItem, clearCart, getTotal, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const total = getTotal();

  if (items.length === 0) {
    return null; // Don't show section if cart is empty
  }

  return (
    <section id="cart-section" className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">SHOPPING CART</h2>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <span className="text-green-600 text-xl">✓</span>
          <div className="flex-1">
            <p className="text-green-800">
              <span className="font-semibold">"{items[items.length - 1]?.product.name}"</span> has
              been added to your cart.
            </p>
          </div>
          <button className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Table - Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-left">
                <th className="pb-4 font-semibold text-gray-600">PRODUCT NAME</th>
                <th className="pb-4 font-semibold text-gray-600">PRICE</th>
                <th className="pb-4 font-semibold text-gray-600">QUANTITY</th>
                <th className="pb-4 font-semibold text-gray-600">SUB TOTAL</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 bg-gray-100 rounded flex-shrink-0">
                        <Image
                          src={item.product.images[0] || "/placeholder.png"}
                          alt={item.product.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <Link
                        href={`/products/${item.product.slug}`}
                        className="font-semibold hover:text-green-600"
                      >
                        {item.product.name}
                      </Link>
                    </div>
                  </td>
                  <td className="py-4">{formatPrice(item.product.price)}</td>
                  <td className="py-4">
                    <Select
                      value={item.quantity.toString()}
                      onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: Math.min(item.product.inventory, 10) }, (_, i) => i + 1).map(
                          (num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="py-4 font-bold">
                    {formatPrice(item.product.price * item.quantity)}
                  </td>
                  <td className="py-4">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cart Items - Mobile */}
        <div className="md:hidden space-y-4 mb-6">
          {items.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-4 mb-3">
                <div className="relative w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                  <Image
                    src={item.product.images[0] || "/placeholder.png"}
                    alt={item.product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    href={`/products/${item.product.slug}`}
                    className="font-semibold hover:text-green-600 block mb-2"
                  >
                    {item.product.name}
                  </Link>
                  <p className="text-gray-600">{formatPrice(item.product.price)}</p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <Select
                  value={item.quantity.toString()}
                  onValueChange={(value) => updateQuantity(item.id, parseInt(value))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: Math.min(item.product.inventory, 10) }, (_, i) => i + 1).map(
                      (num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <span className="font-bold">
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
          <Button
            onClick={clearCart}
            variant="outline"
            className="border-gray-300 hover:bg-gray-100"
          >
            REMOVE ALL
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            UPDATE CART
          </Button>
        </div>
      </div>
    </section>
  );
}