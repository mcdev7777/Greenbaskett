"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "additional">("description");
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg p-6 md:p-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "description"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            DESCRIPTION
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "reviews"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            REVIEWS (5)
          </button>
          <button
            onClick={() => setActiveTab("additional")}
            className={`pb-4 px-2 font-semibold transition ${
              activeTab === "additional"
                ? "border-b-2 border-green-600 text-green-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ADDITIONAL INFORMATION
          </button>
        </div>

        {/* Tab Content */}
        <div className="prose max-w-none">
          {activeTab === "description" && (
            <DescriptionTab product={product} showMore={showMore} setShowMore={setShowMore} />
          )}
          {activeTab === "reviews" && <ReviewsTab />}
          {activeTab === "additional" && <AdditionalInfoTab product={product} />}
        </div>
      </div>
    </section>
  );
}

function DescriptionTab({
  product,
  showMore,
  setShowMore,
}: {
  product: Product;
  showMore: boolean;
  setShowMore: (show: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-gray-700 leading-relaxed">
        <p className="mb-4">
          Built for ultra-fast performance, the thin and lightweight Samsung Galaxy Tab S2 goes
          anywhere you go. Photos, movies and documents pop on a crisp, clear Super AMOLED display.
          Expandable memory lets you enjoy more of your favorite content. And connecting and sharing
          between all your Samsung devices is easier than ever. Welcome to life with the reimagined
          Samsung Galaxy Tab S2. Watch they world come to life on your tablet's{" "}
          <strong>Super AMOLED display *</strong>. With deep contrast, rich colors and crisp
          details, you won't miss a thing
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-96 bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 rounded-lg overflow-hidden">
        <Image
          src="https://i.pinimg.com/564x/YOUR_LAPTOP_IMAGE.jpg"
          alt="Product showcase"
          fill
          className="object-cover"
        />
      </div>

      <p className="text-xs text-gray-500 text-center italic">
        * The Galaxy Tab S2's 4 : 3 ratio display provides you with an ideal environment for
        performing office tasks.
      </p>

      {showMore && (
        <>
          <div>
            <h3 className="text-xl font-bold mb-3">From the manufacturer</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dive into the blockbuster movies you can't wait to see. Switch between your favorite
              apps quickly and easily. The new and improved octa-core processor gives you the power
              and speed you need to see more and do more. Expand your tablet's memory from 32GB to
              up to an additional 128GB and enjoy more of your favorite music, photos, movies and
              games on the go with a microSD card. With Quick Connect, start a show on your Smart
              TV and, with the touch of a button, take it with you by moving it to your Galaxy Tab
              S2.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Or send videos and photos from your tablet screen to your TV screen to share with
              everyone in the room. Work effortlessly between your Samsung tablet and Samsung
              smartphone with SideSync. Quickly drag and drop photos between devices. And even
              respond to a call from your smartphone right on your tablet screen.
            </p>
          </div>

          {/* Two Images Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="https://i.pinimg.com/564x/YOUR_IMAGE1.jpg"
                alt="Product feature 1"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-64 bg-gray-200 rounded-lg overflow-hidden">
              <Image
                src="https://i.pinimg.com/564x/YOUR_IMAGE2.jpg"
                alt="Product feature 2"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3">Samsung Galaxy Tab S2, 8-Inch, White</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              The Samsung Galaxy S2 offers dual cameras: a rear-facing 8-megapixel camera with Auto
              Focus and a 2.1-megapixel camera on the front. Take high-quality pictures and video or
              video chat with friends, family, and colleagues. Customize your Galaxy Tab S2 with the
              apps you use most. The Samsung Galaxy Essentials widget provides a collection of
              premium complimentary apps optimized for your tablet experience. Select and download
              the apps you want to instantly upgrade your tablet.
            </p>
          </div>
        </>
      )}

      {/* Show More Button */}
      <div className="text-center">
        <Button
          onClick={() => setShowMore(!showMore)}
          variant="link"
          className="text-blue-600 font-semibold"
        >
          {showMore ? "SHOW LESS" : "SHOW MORE"}
        </Button>
      </div>
    </div>
  );
}

function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      author: "John Doe",
      rating: 5,
      date: "January 15, 2024",
      comment:
        "Excellent product! The quality is outstanding and it arrived quickly. Highly recommended.",
    },
    {
      id: 2,
      author: "Jane Smith",
      rating: 4,
      date: "January 10, 2024",
      comment: "Very good product. Works as expected. Only minor issue was the packaging.",
    },
    {
      id: 3,
      author: "Mike Johnson",
      rating: 5,
      date: "January 5, 2024",
      comment: "Perfect! Exactly what I was looking for. Great value for money.",
    },
    {
      id: 4,
      author: "Sarah Wilson",
      rating: 4,
      date: "December 28, 2023",
      comment: "Good quality product. Fast shipping. Would buy again.",
    },
    {
      id: 5,
      author: "Tom Brown",
      rating: 5,
      date: "December 20, 2023",
      comment: "Amazing! Exceeded my expectations. Customer service was also great.",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-1">4.6</div>
          <div className="flex items-center justify-center mb-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <div className="text-sm text-gray-600">5 Reviews</div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-6 last:border-b-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="font-semibold mb-1">{review.author}</div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i <= review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="pt-6 border-t">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          Write a Review
        </Button>
      </div>
    </div>
  );
}

function AdditionalInfoTab({ product }: { product: Product }) {
  const specs = [
    { label: "Brand", value: "Samsung" },
    { label: "Model", value: product.name },
    { label: "Color", value: "Dark Grey" },
    { label: "Storage", value: "512GB" },
    { label: "RAM", value: "16GB" },
    { label: "Display", value: "13.3 inch Retina Display" },
    { label: "Processor", value: "Apple M1 Chip" },
    { label: "Graphics", value: "Integrated Graphics" },
    { label: "Operating System", value: "macOS" },
    { label: "Battery Life", value: "Up to 18 hours" },
    { label: "Weight", value: "1.29 kg" },
    { label: "Warranty", value: "1 Year Manufacturer Warranty" },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {specs.map((spec, index) => (
          <div
            key={index}
            className="flex justify-between p-3 rounded hover:bg-gray-50"
          >
            <span className="font-semibold text-gray-700">{spec.label}:</span>
            <span className="text-gray-600">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}