import Link from "next/link";
import Image from "next/image";

const categories = [
  { name: "iPhone (iOS)", count: 74, image: "📱", slug: "iphone" },
  { name: "Android", count: 35, image: "📱", slug: "android" },
  { name: "5G Support", count: 12, image: "📡", slug: "5g-support" },
  { name: "Apple Tablets", count: 22, image: "📱", slug: "apple-tablets" },
  { name: "Smartphone Chargers", count: 33, image: "🔌", slug: "chargers" },
  { name: "Gaming", count: 9, image: "🎮", slug: "gaming" },
  { name: "Xiaomi", count: 52, image: "📱", slug: "xiaomi" },
  { name: "Accessories", count: 29, image: "🎧", slug: "accessories" },
  { name: "Samsung Tablets", count: 26, image: "📱", slug: "samsung-tablets" },
  { name: "eReader", count: 5, image: "📖", slug: "ereader" },
];

export function PopularCategories() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">POPULAR CATEGORIES</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products?category=${category.slug}`}
            className="bg-white rounded-lg p-4 hover:shadow-lg transition text-center group"
          >
            <div className="flex flex-col items-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {category.image}
              </div>
              <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
              <p className="text-xs text-gray-500">{category.count} Items</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}