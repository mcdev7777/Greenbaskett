"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { formatPrice } from "@/lib/utils";

const dealImages = {
  mainProduct: "https://i.pinimg.com/736x/84/99/98/8499981321bac3c35bedfb4c54b0ff80.jpg",
  thumbnails: [
    "https://i.pinimg.com/736x/e7/a7/97/e7a79727d961962f720ce07d545fb0af.jpg",
    "https://i.pinimg.com/736x/6d/9c/0d/6d9c0dd6adecb5261814264ea872b053.jpg",
    "https://i.pinimg.com/736x/d3/e9/ba/d3e9bafb6fe2a7bc860a629cc1fa02ae.jpg", 
    "https://i.pinimg.com/736x/bb/92/ae/bb92ae98e273f52cbcfff35aa7b6bd04.jpg",
  ],
  gameController: "https://i.pinimg.com/1200x/6b/d6/ec/6bd6ec9c5d6a2a51459e1e04d57dc5a8.jpg",
  tablet: "https://i.pinimg.com/736x/52/fb/c0/52fbc0c4679344ae11b7551756364b6d.jpg",
};

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
    <section className="container mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="bg-green-600 rounded-t-lg px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white">DEALS OF THE DAY</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <div className="flex gap-1 sm:gap-2 flex-wrap">
            <button className="text-white text-xs sm:text-sm hover:underline">New</button>
            <button className="text-white text-xs sm:text-sm hover:underline">Featured</button>
            <button className="text-white text-xs sm:text-sm hover:underline">Top Rated</button>
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
      <div className="bg-white rounded-b-lg p-4 sm:p-8 shadow-sm overflow-x-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Thumbnails - Hidden on mobile */}
          <div className="col-span-1 space-y-4 hidden sm:flex sm:flex-col">
            {dealImages.thumbnails.map((thumb, i) => (
              <div
                key={i}
                className="border rounded p-2 cursor-pointer hover:border-green-600 transition"
              >
                <div className="relative w-12 h-12 bg-gray-200 rounded overflow-hidden">
                  <Image
                    src={thumb}
                    alt={`Product view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Main Product Image */}
          <div className="col-span-1 sm:col-span-3 relative flex items-center justify-center">
            <Badge className="absolute top-0 left-0 z-10 bg-green-600 hover:bg-green-600 text-white px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm">
              SAVE
              <br />
              $199.00
            </Badge>
            <div className="flex items-center justify-center h-full">
              <div className="relative w-48 sm:w-64 h-56 sm:h-80 bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={dealImages.mainProduct}
                  alt="Xioma Redmi Note 11 Pro"
                  fill
                  className="object-contain p-4"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-span-1 sm:col-span-5">
            <div className="flex items-center gap-2 mb-2 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span>(12)</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-4">
              Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone
            </h3>

            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl font-bold text-red-600">$569.00</span>
              <span className="text-base sm:text-xl text-gray-400 line-through">$759.00</span>
            </div>

            <ul className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-xs sm:text-sm text-gray-700">
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

            <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6 flex-wrap">
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">
                FREE SHIPPING
              </Badge>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs">
                FREE GIFT
              </Badge>
            </div>

            {/* Countdown Timer */}
            <div className="mb-4 sm:mb-6">
              <p className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
                HURRY UP! PROMOTION WILL EXPIRES IN
              </p>
              <div className="flex gap-1 sm:gap-2">
                <div className="bg-gray-100 rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-center min-w-[50px] sm:min-w-[70px]">
                  <div className="text-lg sm:text-2xl font-bold">{timeLeft.days}</div>
                  <div className="text-xs text-gray-600">d</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-center min-w-[50px] sm:min-w-[70px]">
                  <div className="text-lg sm:text-2xl font-bold">{timeLeft.hours}</div>
                  <div className="text-xs text-gray-600">h</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-center min-w-[50px] sm:min-w-[70px]">
                  <div className="text-lg sm:text-2xl font-bold">{timeLeft.minutes}</div>
                  <div className="text-xs text-gray-600">m</div>
                </div>
                <div className="bg-gray-100 rounded-lg px-2 sm:px-4 py-2 sm:py-3 text-center min-w-[50px] sm:min-w-[70px]">
                  <div className="text-lg sm:text-2xl font-bold">{timeLeft.seconds}</div>
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
              <p className="text-xs sm:text-sm text-gray-600">
                Sold: <span className="font-semibold">26/75</span>
              </p>
            </div>
          </div>

          {/* Right Promotional Banners - Stack on mobile */}
          <div className="col-span-1 sm:col-span-3 space-y-3 sm:space-y-4">
            {/* Gaming Controller Banner */}
            <div className="relative bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg p-4 sm:p-6 h-40 sm:h-48 overflow-hidden">
              <Image
                src={dealImages.gameController}
                alt="Gaming Controller Sale"
                fill
                className="object-cover opacity-30"
              />
              <Badge className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-yellow-400 text-black hover:bg-yellow-400 font-bold text-xs sm:text-base">
                50%
              </Badge>
              <div className="relative z-10">
                <div className="text-3xl sm:text-5xl font-bold text-white opacity-70">
                  SALE
                </div>
              </div>
            </div>

            {/* Tablets Banner */}
            <div className="relative bg-gradient-to-br from-green-800 to-green-900 rounded-lg p-4 sm:p-6 h-40 sm:h-48 overflow-hidden">
              <Image
                src={dealImages.tablet}
                alt="Tablets"
                fill
                className="object-cover opacity-40"
              />
              <div className="relative z-10">
                <div className="text-white font-bold text-lg sm:text-xl">Tablets</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="bg-yellow-100 rounded-b-lg px-4 sm:px-8 py-3 sm:py-4 mt-0 border-t">
        <p className="text-center text-xs sm:text-sm">
          🏆 Member get <span className="font-bold">FREE SHIPPING*</span> with no order
          minimum! *Restriction apply free 30-days trial
        </p>
      </div>
    </section>
  );
}