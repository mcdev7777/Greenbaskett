"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CheckoutSection } from "@/components/product-detail/CheckoutSection";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export default function CheckoutPage() {
  const { items, fetchCart } = useCartStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchCart().finally(() => setIsLoading(false));
  }, [fetchCart]);

  const isEmpty = items.length === 0 && !isLoading;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "pages", href: "/" },
          { label: "checkout" },
        ]}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isEmpty ? (
          // Empty Cart State
          <div className="bg-white rounded-lg p-8 md:p-12 text-center min-h-96 flex flex-col items-center justify-center">
            <div className="mb-6">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Add items to your cart to proceed to checkout
            </p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 rounded-lg text-lg">
                CONTINUE SHOPPING
              </Button>
            </Link>
          </div>
        ) : (
          // Checkout Content
          <div>
            {/* Checkout Section */}
            <CheckoutSection />

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 px-4 md:px-8">
              <Link href="/pages/cart" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 rounded-lg font-semibold"
                >
                  BACK TO CART
                </Button>
              </Link>
              <Button
                disabled
                className="w-full sm:w-auto bg-gray-400 text-white px-8 py-6 rounded-lg font-semibold cursor-not-allowed"
              >
                PLACE ORDER
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              Order placement coming soon
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
