import Link from "next/link";
import Image from "next/image";

const brands = [
  { 
    name: "JAMX", 
    logo: "https://i.pinimg.com/1200x/ab/ad/6c/abad6ce7a5c8986ace98406d9e2ba6d6.jpg" 
  },
  { 
    name: "Digitek", 
    logo: "https://i.pinimg.com/1200x/66/e1/27/66e1275f7b9cd1b6847704ad75782e6c.jpg" 
  },
  { 
    name: "tek react js", 
    logo: "https://i.pinimg.com/736x/ac/d2/52/acd25211b5481846d37dd585ac17ae81.jpg" 
  },
  { 
    name: "Grafbase", 
    logo: "https://i.pinimg.com/1200x/cd/a0/13/cda013f4f12e5e6d4e800b4e94dfb20f.jpg" 
  },
  { 
    name: "msi", 
    logo: "https://i.pinimg.com/1200x/66/e1/27/66e1275f7b9cd1b6847704ad75782e6c.jpg" 
  },
  { 
    name: "ohbear", 
    logo: "https://i.pinimg.com/1200x/31/e1/97/31e197b8f7d4539d75696f24c2610043.jpg" 
  },
  { 
    name: "OAK", 
    logo: "https://i.pinimg.com/736x/4a/ab/bb/4aabbba4cb7e29708617546fe6d89ab6.jpg" 
  },
  { 
    name: "snyk", 
    logo: "https://i.pinimg.com/1200x/29/9d/34/299d34c73555d5b11bccb9bac70e630f.jpg" 
  },
  { 
    name: "sonex", 
    logo: "https://i.pinimg.com/1200x/ab/ad/6c/abad6ce7a5c8986ace98406d9e2ba6d6.jpg" 
  },
  { 
    name: "stropi", 
    logo: "https://i.pinimg.com/736x/ac/d2/52/acd25211b5481846d37dd585ac17ae81.jpg" 
  },
];

const categories = [
  { name: "Laptops", slug: "laptops", icon: "💻" },
  { name: "PC Gaming", slug: "pc-gaming", icon: "🖥️" },
  { name: "Headphones", slug: "headphones", icon: "🎧" },
  { name: "Monitors", slug: "monitors", icon: "🖥️" },
];

export function FeaturedSection() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Featured Brands - Left */}
        <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">FEATURED BRANDS</h2>
            <Link
              href="/brands"
              className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-6">
            {brands.map((brand) => (
              <Link
                key={brand.name}
                href={`/brands/${brand.name.toLowerCase()}`}
                className="flex items-center justify-center p-2 sm:p-4 hover:opacity-70 transition bg-gray-50 rounded-lg"
              >
                <div className="relative w-16 sm:w-20 h-10 sm:h-12">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Top Categories - Right */}
        <div className="bg-white rounded-lg p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-2">
            <h2 className="text-xl sm:text-2xl font-bold">TOP CATEGORIES</h2>
            <Link
              href="/categories"
              className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="bg-white border rounded-lg p-4 sm:p-6 flex flex-col items-center justify-center hover:shadow-lg transition group"
              >
                <div className="text-3xl sm:text-5xl mb-2 sm:mb-3 group-hover:scale-110 transition">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-center text-xs sm:text-sm">
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