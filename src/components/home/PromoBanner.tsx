"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function PromoBanner() {
  const [phone, setPhone] = useState("");

  const handleSendLink = () => {
    // Handle sending download link
    console.log("Send link to:", phone);
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cashback Offer - Left */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-12 relative overflow-hidden">
          {/* Credit Card Illustrations */}
          <div className="absolute top-4 left-8">
            <div className="w-40 h-24 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg shadow-lg transform -rotate-12 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SWATEK</span>
            </div>
          </div>
          <div className="absolute top-12 left-16">
            <div className="w-40 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-lg transform -rotate-6 flex items-center justify-center">
              <span className="text-white font-bold text-xl">SWATEK</span>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 mt-24">
            <h2 className="text-6xl font-bold text-yellow-400 mb-2">
              10% Back
            </h2>
            <p className="text-white text-lg mb-1">
              Earn 10% Cash back on
            </p>
            <p className="text-white text-lg">
              Swotech.{" "}
              <span className="underline cursor-pointer hover:text-yellow-400">
                Learn How
              </span>
            </p>
          </div>
        </div>

        {/* App Download - Right */}
        <div className="bg-gray-100 rounded-lg p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-2">Download our app</h2>
          <p className="text-gray-600 mb-6">
            Enter your phone number and we'll send you a download link
          </p>

          <div className="flex gap-3">
            <Input
              type="tel"
              placeholder="(+xx) XXX..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSendLink}
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              SEND LINK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}