"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  "Laptops",
  "PC & Computers",
  "Cell Phones",
  "Tablets",
  "Gaming & VR",
  "Networking",
  "Cameras",
  "Sounds",
  "Office",
  "Storage, USB",
  "Accessories",
  "Clearance",
];

const heroImages = {
  headphones: "https://i.pinimg.com/736x/e9/bc/01/e9bc01c2d889ce6b37cd9a3e4a8e7ec2.jpg",
  watch: "https://i.pinimg.com/736x/eb/e3/e0/ebe3e0cbf1082b9bcf71b779fb1a2109.jpg",
  camera: "https://i.pinimg.com/736x/6f/74/fe/6f74feebc0f2aac1d134cedb6a223db2.jpg",
  keyboard: "https://i.pinimg.com/1200x/6d/e9/7d/6de97d26943513b8381565c973064cf5.jpg",
  playstation: "https://i.pinimg.com/1200x/6c/a3/ab/6ca3ab3952212fa9e9367f08d2d5ec12.jpg",
};

export function Hero() {
  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Left Sidebar - Categories */}
        <div className="col-span-1 lg:col-span-2 order-3 lg:order-1">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            <Badge className="mb-4 bg-red-500 hover:bg-red-600">
              SALE 40% OFF
            </Badge>
            <nav className="space-y-2 sm:space-y-3 hidden lg:block">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/products?category=${category}`}
                  className="block text-xs sm:text-sm font-medium text-gray-700 hover:text-green-600 transition"
                >
                  {category}
                </Link>
              ))}
            </nav>
            {/* Mobile category dropdown */}
            <select className="w-full lg:hidden text-xs sm:text-sm border rounded px-2 py-1">
              <option>View Categories</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Hero Section */}
        <div className="col-span-1 lg:col-span-7 order-1 lg:order-2">
          {/* Main Hero Banner */}
          <div className="relative bg-gradient-to-br from-gray-400 to-gray-800 rounded-lg overflow-hidden h-[300px] sm:h-[400px] mb-4 sm:mb-6">
            {/* Background Image */}
            <Image
              src={heroImages.headphones}
              alt="Noise Cancelling Headphone"
              fill
              className="object-cover"
              priority
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />
            
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-12">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4 relative z-10">
                Noise Cancelling
                <br />
                Headphone
              </h1>
              <p className="text-xs sm:text-sm text-white/90 mb-1 relative z-10">Bose Over-Ear Headphone</p>
              <p className="text-xs sm:text-sm text-white/90 mb-1 relative z-10">With Voice Assistant,</p>
              <p className="text-xs sm:text-sm text-white/90 mb-4 sm:mb-6 relative z-10">Low Latency Game Mode</p>
              <Button className="bg-white text-gray-900 hover:bg-gray-100 w-fit px-4 sm:px-8 text-xs sm:text-base relative z-10">
                BUY NOW
              </Button>
            </div>
            {/* Pagination indicator */}
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 bg-white/90 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs font-medium z-10">
              3 / 3
            </div>
          </div>

          {/* Bottom Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Sono Playgo 5 */}
            <div className="relative bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg p-4 sm:p-6 flex flex-col justify-between h-[150px] sm:h-[200px] overflow-hidden">
              <Image
                src={heroImages.playstation}
                alt="Sono Playgo 5"
                fill
                className="object-cover opacity-40"
              />
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl font-semibold mb-1">Sono Playgo 5</h3>
                <p className="text-green-600 font-bold text-base sm:text-lg">from $569</p>
              </div>
              <Link
                href="/products"
                className="text-xs sm:text-sm font-semibold underline hover:text-green-600 relative z-10"
              >
                DISCOVER NOW
              </Link>
            </div>

            {/* Logitek Bluetooth Keyboard */}
            <div className="relative bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg p-4 sm:p-6 flex flex-col justify-between h-[150px] sm:h-[200px] overflow-hidden">
              <Image
                src={heroImages.keyboard}
                alt="Logitek Bluetooth Keyboard"
                fill
                className="object-cover opacity-50"
              />
              <div className="relative z-10">
                <h3 className="text-base sm:text-xl font-semibold text-white mb-1">
                  Logitek Bluetooth
                </h3>
                <p className="text-yellow-400 font-bold text-base sm:text-lg">Keyboard</p>
              </div>
              <p className="text-white/80 text-xs sm:text-sm relative z-10">Best for all device</p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Promotional Cards */}
        <div className="col-span-1 lg:col-span-3 space-y-4 sm:space-y-6 order-2 lg:order-3">
          {/* Smart Watch Card */}
          <div className="relative bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 sm:p-6 h-[180px] sm:h-[260px] flex flex-col justify-between overflow-hidden">
            <Image
              src={heroImages.watch}
              alt="Sport Water Resistance Watch"
              fill
              className="object-cover opacity-70"
            />
            <div className="relative z-10">
              <p className="text-xs sm:text-sm text-gray-600 mb-2">XOMIA</p>
              <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">
                Sport Water
                <br />
                Resistance
                <br />
                Watch
              </h3>
            </div>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white w-fit px-4 sm:px-6 text-xs sm:text-base relative z-10">
              SHOP NOW
            </Button>
          </div>

          {/* Camera Card */}
          <div className="relative bg-gradient-to-br from-gray-800 to-black rounded-lg p-4 sm:p-6 h-[220px] sm:h-[340px] flex flex-col justify-between text-white overflow-hidden">
            <Image
              src={heroImages.camera}
              alt="OKODO HERO 11+ BLACK"
              fill
              className="object-cover opacity-40"
            />
            <div className="relative z-10">
              <h3 className="text-lg sm:text-2xl font-bold mb-2">
                OKODO
                <br />
                HERO 11+
                <br />
                BLACK
              </h3>
            </div>
            <div className="relative z-10">
              <p className="text-xs sm:text-sm text-gray-400 mb-1">FROM</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-500">$169</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}