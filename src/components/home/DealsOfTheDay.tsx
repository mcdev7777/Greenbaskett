"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export function DealsOfTheDay() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 162,
    hours: 9,
    minutes: 32,
    seconds: 4,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const soldPercentage = (26 / 75) * 100;

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="bg-green-600 rounded-t-lg px-8 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">DEALS OF THE DAY</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="text-white text-sm hover:underline">New</button>
            <button className="text-white text-sm hover:underline">Featured</button>
            <button className="text-white text-sm hover:underline">Top Rated</button>
          </div>
          <div className="flex gap-2">
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded flex items-center justify-center text-white">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-b-lg p-8 shadow-sm">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Thumbnails */}
          <div className="col-span-1 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="border rounded p-2 cursor-pointer hover:border-green-600 transition"
              >
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                  📱
                </div>
              </div>
            ))}
          </div>

          {/* Main Product Image */}
          <div className="col-span-12 md:col-span-3 relative">
            <Badge className="absolute top-0 left-0 bg-green-600 hover:bg-green-600 text-white px-4 py-2">
              SAVE
              <br />
              $199.00
            </Badge>
            <div className="flex items-center justify-center h-full">
              <div className="w-64 h-80 bg-gray-100 rounded-lg flex items-center justify-center text-6xl">
                📱
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-span-12 md:col-span-5">
            <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>(12)</span>
            </div>

            <h3 className="text-2xl font-bold mb-4">
              Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
            </h3>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-red-600">$569.00</span>
              <span className="text-xl text-gray-400 line-through">$759.00</span>
            </div>

            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                DDR5 Compatible: 4*SMD DIMMs with XMP 3.0 Memory
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Commanding Power Design: Twin 16+1+2 Phases Digital VRM
              </li>
            </ul>

            <div className="flex gap-4 mb-6">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                FREE SHIPPING
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                FREE GIFT
              </Badge>
            </div>

            {/* Countdown Timer */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3">
                HURRY UP! PROMOTION WILL EXPIRES IN
              </p>
              <div className="flex gap-2">
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-600">d</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-600">h</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-600">m</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-4 py-3 text-center min-w-[70px]">
                  <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                  <div className="text-xs text-gray-600">s</div>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${soldPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600">
                Sold: <span className="font-semibold">26/75</span>
              </p>
            </div>
          </div>

          {/* Right Promotional Banners */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            {/* Gaming Controller Banner */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-6 h-48 relative overflow-hidden">
              <Badge className="absolute top-4 right-4 bg-yellow-400 text-black hover:bg-yellow-400 font-bold">
                50%
              </Badge>
              <div className="text-5xl font-bold text-gray-600 opacity-50">
                SALE
              </div>
              <div className="mt-4 text-4xl">🎮</div>
            </div>

            {/* Tablets Banner */}
            <div className="bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-6 h-48 relative overflow-hidden">
              <div className="text-4xl mb-2">📱💻</div>
              <div className="text-white font-bold text-xl">Tablets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-yellow-100 rounded-b-lg px-8 py-4 mt-0 border-t">
        <p className="text-center text-sm">
          🏆 Member get <span className="font-bold">FREE SHIPPING*</span> with no order
          minimum! *Restriction apply free 30-days trial
        </p>
      </div>
    </section>
  );
}