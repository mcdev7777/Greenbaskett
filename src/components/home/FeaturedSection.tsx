import Link from "next/link";

const brands = [
  { name: "JAMX", logo: "🔷" },
  { name: "Digitek", logo: "🟢" },
  { name: "tek react js", logo: "🔴" },
  { name: "Grafbase", logo: "🟡" },
  { name: "msi", logo: "⚫" },
  { name: "ohbear", logo: "🔴" },
  { name: "OAK", logo: "🟢" },
  { name: "snyk", logo: "🟢" },
  { name: "sonex", logo: "⚫" },
  { name: "stropi", logo: "🔵" },
];

const categories = [
  { name: "Laptops", slug: "laptops", icon: "💻" },
  { name: "PC Gaming", slug: "pc-gaming", icon: "🖥️" },
  { name: "Headphones", slug: "headphones", icon: "🎧" },
  { name: "Monitors", slug: "monitors", icon: "🖥️" },
];

export function FeaturedSection() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Featured Brands - Left */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">FEATURED BRANDS</h2>
            <Link
              href="/brands"
              className="text-sm text-gray-600 hover:text-green-600 transition"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/brands/${brand.name.toLowerCase()}`}
                className="flex items-center justify-center p-4 hover:opacity-70 transition"
              >
                <span className="text-xl font-bold text-gray-700">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Categories - Right */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8 border-2 border-blue-400">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">TOP CATEGORIES</h2>
            <Link
              href="/categories"
              className="text-sm text-gray-600 hover:text-green-600 transition"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="bg-white rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-lg transition group"
              >
                <div className="text-5xl mb-3 group-hover:scale-110 transition">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-center text-sm">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}