"use client";

import Link from "next/link";
import { Search, Heart, ShoppingCart, User, Phone, ChevronDown } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function Navbar() {
  const { items, getTotal, getItemCount, fetchCart } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetchCart();
  }, [fetchCart]);

  const itemCount = mounted ? getItemCount() : 0;
  const total = mounted ? getTotal() : 0;

  return (
    <header className="w-full border-b">
      {/* Top Bar */}
      <div className="bg-gray-100 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-11 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">Hotline 24/7</span>
              <span className="font-bold">(025) 3886 25 16</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="#" className="hover:text-green-600 transition">
                Sell on Swoo
              </Link>
              <Link href="#" className="hover:text-green-600 transition">
                Order Tracking
              </Link>
              <button className="flex items-center gap-1 hover:text-green-600">
                USD <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1 hover:text-green-600">
                🇺🇸 Eng <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">SWOO</span>
                <span className="text-sm text-gray-600 -mt-1">TECH MART</span>
              </div>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="font-medium hover:text-green-600 transition flex items-center gap-1">
                HOMES <ChevronDown className="w-4 h-4" />
              </Link>
              <Link href="/products" className="font-medium hover:text-green-600 transition flex items-center gap-1">
                PRODUCTS <ChevronDown className="w-4 h-4" />
              </Link>
              <Link href="#" className="font-medium hover:text-green-600 transition flex items-center gap-1">
                PAGES <ChevronDown className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="font-medium hover:text-green-600 transition">
                CONTACT
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              <button className="hover:text-green-600 transition">
                <Search className="w-5 h-5" />
              </button>
              <button className="hover:text-green-600 transition">
                <Heart className="w-5 h-5" />
              </button>
              
              <div className="hidden lg:flex flex-col items-end">
                <span className="text-xs text-gray-500">WELCOME</span>
                <Link href="/login" className="text-sm font-bold hover:text-green-600">
                  LOG IN / REGISTER
                </Link>
              </div>

              <Link href="/cart" className="flex items-center gap-3 hover:opacity-80 transition">
                <div className="relative">
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 bg-green-600 hover:bg-green-600">
                      {itemCount}
                    </Badge>
                  )}
                </div>
                <div className="hidden lg:flex flex-col items-start">
                  <span className="text-xs text-gray-500">CART</span>
                  <span className="text-sm font-bold">{formatPrice(total)}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-green-600">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-6">
            {/* Search */}
            <div className="flex-1 max-w-2xl flex items-center bg-white rounded-sm overflow-hidden">
              <select className="px-4 py-3 bg-white border-r text-sm font-medium outline-none cursor-pointer">
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Fashion</option>
                <option>Home</option>
                <option>Sports</option>
              </select>
              <input
                type="text"
                placeholder="Search anything..."
                className="flex-1 px-4 py-3 outline-none text-sm"
              />
              <button className="px-6 py-3 bg-green-600 text-white hover:bg-green-700 transition">
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Promotional Info */}
            <div className="hidden xl:flex items-center gap-6 text-white text-sm font-medium">
              <span>FREE SHIPPING OVER $199</span>
              <span>30 DAYS MONEY BACK</span>
              <span>100% SECURE PAYMENT</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}