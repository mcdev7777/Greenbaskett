import Link from "next/link";
import Image from "next/image";

const categories = [
  { 
    name: "iPhone (iOS)", 
    count: 74, 
    image: "https://i.pinimg.com/736x/53/d4/30/53d4300e331e9260beb70d77e6d8b2ed.jpg", 
    slug: "iphone" 
  },
  { 
    name: "Android", 
    count: 35, 
    image: "https://i.pinimg.com/1200x/80/75/ea/8075ea34f63f138bc7e6aa99a691a75f.jpg", 
    slug: "android" 
  },
  { 
    name: "5G Support", 
    count: 12, 
    image: "https://i.pinimg.com/1200x/4e/38/b1/4e38b198deaf0bfdcf83bd2d5b60091c.jpg", 
    slug: "5g-support" 
  },
  { 
    name: "Apple Tablets", 
    count: 22, 
    image: "https://i.pinimg.com/736x/28/e4/97/28e497fdd08aeda4caf518ac2c724438.jpg", 
    slug: "apple-tablets" 
  },
  { 
    name: "Smartphone Chargers", 
    count: 33, 
    image: "https://i.pinimg.com/736x/70/ba/db/70badb0f535d08ecb7e2fe9be9cfbd42.jpg", 
    slug: "chargers" 
  },
  { 
    name: "Gaming", 
    count: 9, 
    image: "https://i.pinimg.com/736x/b0/2e/c3/b02ec3a7bfc4421d602eab2a0c37e71b.jpg", 
    slug: "gaming" 
  },
  { 
    name: "Xiaomi", 
    count: 52, 
    image: "https://i.pinimg.com/1200x/79/96/58/7996584fd857a1009b794b5a7ba5f178.jpg", 
    slug: "xiaomi" 
  },
  { 
    name: "Accessories", 
    count: 29, 
    image: "https://i.pinimg.com/736x/c9/d0/e1/c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4.jpg", 
    slug: "accessories" 
  },
  { 
    name: "Samsung Tablets", 
    count: 26, 
    image: "https://i.pinimg.com/1200x/68/23/99/68239927494dbd614773edaa5e05606f.jpg", 
    slug: "samsung-tablets" 
  },
  { 
    name: "eReader", 
    count: 5, 
    image: "https://i.pinimg.com/736x/03/c7/cf/03c7cf9773e0babb9f83f7be0928adf5.jpg", 
    slug: "ereader" 
  },
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
              <div className="relative w-16 h-16 mb-3 group-hover:scale-110 transition">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
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