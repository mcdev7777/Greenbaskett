import Link from "next/link";
import Image from "next/image";

const sections = [
  {
    title: "AUDIOS & CAMERAS",
    featured: {
      title: "Best Speaker 2025",
      image: "https://i.pinimg.com/1200x/70/6a/c8/706ac86c6c879eff8f6b5f612842b1e5.jpg", 
      bgColor: "from-blue-900 to-blue-700",
    },
    categories: [
      { 
        name: "Speaker", 
        count: 12, 
        image: "https://i.pinimg.com/736x/0f/c5/e7/0fc5e75a7e0af7a0981ddbfb6409ab05.jpg" 
      },
      { 
        name: "DSLR Camera", 
        count: 9, 
        image: "https://i.pinimg.com/1200x/11/3d/fd/113dfdf4006375e7fca93e5d329d0835.jpg" 
      },
      { 
        name: "Earbuds", 
        count: 5, 
        image: "https://i.pinimg.com/736x/0b/3c/dc/0b3cdc50fa24025c6df2271d97a22348.jpg" 
      },
      { 
        name: "Microphone", 
        count: 12, 
        image: "https://i.pinimg.com/1200x/d9/c7/a5/d9c7a58f8dca086e5cfa98cd2350dfc9.jpg" 
      },
    ],
  },
  {
    title: "GAMING",
    featured: {
      title: "WIRELESS RGB GAMING MOUSE",
      image: "https://i.pinimg.com/736x/ba/b4/d9/bab4d90debea9d675b0da79657296de6.jpg",
      bgColor: "from-gray-300 to-gray-290",
      textColor: "text-black",
    },
    categories: [
      { 
        name: "Monitors", 
        count: 28, 
        image: "https://i.pinimg.com/736x/6a/c1/e3/6ac1e3a524bddfdde4dbfeb4b902fa1e.jpg" 
      },
      { 
        name: "Chair", 
        count: 12, 
        image: "https://i.pinimg.com/1200x/fa/65/f9/fa65f94ba718ad0caa1585f36f1d5a54.jpg" 
      },
      { 
        name: "Controller", 
        count: 9, 
        image: "https://i.pinimg.com/736x/7c/79/0e/7c790e569664fc4e65fe32ac5f831733.jpg" 
      },
      { 
        name: "Keyboards", 
        count: 30, 
        image: "https://i.pinimg.com/1200x/3a/90/0b/3a900be5432b0020e4fe8c40dbe6e911.jpg" 
      },
    ],
  },
  {
    title: "OFFICE EQUIPMENTS",
    featured: {
      title: "Laser Projector",
      subtitle: "Home Thearther 4k",
      image: "https://i.pinimg.com/736x/7f/ca/d3/7fcad3d927571743f538ca838124e587.jpg",
      bgColor: "from-gray-800 to-black",
    },
    categories: [
      { 
        name: "Printers", 
        count: 9, 
        image: "https://i.pinimg.com/736x/78/45/23/7845233fc10f1b6a98ac171c44bf8d22.jpg" 
      },
      { 
        name: "Network", 
        count: 90, 
        image: "https://i.pinimg.com/1200x/7a/7f/13/7a7f13d0570e6d9732a04fd037ce63e7.jpg" 
      },
      { 
        name: "Security", 
        count: 12, 
        image: "https://i.pinimg.com/736x/54/a8/7e/54a87e6c14969becf780e4e43b8d5c9c.jpg" 
      },
      { 
        name: "Projectors", 
        count: 12, 
        image: "https://i.pinimg.com/1200x/01/c1/1e/01c11e5917a12fd5c82e240d21ce1fe9.jpg" 
      },
    ],
  },
];

export function CategoryShowcase() {
  return (
    <section className="container mx-auto px-4 py-8 sm:py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg p-4 sm:p-6 shadow-sm">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-xl font-bold">{section.title}</h2>
              <Link
                href={`/products?category=${section.title.toLowerCase()}`}
                className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
              >
                View All
              </Link>
            </div>

            {/* Featured Product Banner */}
            <div
              className={`bg-gradient-to-br ${section.featured.bgColor} rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 h-36 sm:h-48 flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Background Image */}
              <Image
                src={section.featured.image}
                alt={section.featured.title}
                fill
                className="object-cover opacity-50"
              />
              
              <div className="relative z-10">
                {section.featured.subtitle && (
                  <p className="text-xs text-white/90 mb-1">
                    {section.featured.subtitle}
                  </p>
                )}
                <h3
                  className={`text-base sm:text-xl font-bold ${
                    section.featured.textColor || "text-white"
                  }`}
                >
                  {section.featured.title}
                </h3>
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {section.categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="flex flex-col items-center justify-center p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition group"
                >
                  <div className="relative w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition overflow-hidden flex-shrink-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-center mb-1">
                    {category.name}
                  </h4>
                  <p className="text-xs text-gray-500">{category.count} Items</p>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}