import Link from "next/link";

const sections = [
  {
    title: "AUDIOS & CAMERAS",
    featured: {
      title: "Best Speaker 2023",
      image: "🔊",
      bgColor: "from-blue-900 to-blue-700",
    },
    categories: [
      { name: "Speaker", count: 12, icon: "🔊" },
      { name: "DSLR Camera", count: 9, icon: "📷" },
      { name: "Earbuds", count: 5, icon: "🎧" },
      { name: "Microphone", count: 12, icon: "🎤" },
    ],
  },
  {
    title: "GAMING",
    featured: {
      title: "WIRELESS RGB GAMING MOUSE",
      image: "🖱️",
      bgColor: "from-gray-300 to-gray-200",
      textColor: "text-black",
    },
    categories: [
      { name: "Monitors", count: 28, icon: "🖥️" },
      { name: "Chair", count: 12, icon: "🪑" },
      { name: "Controller", count: 9, icon: "🎮" },
      { name: "Keyboards", count: 30, icon: "⌨️" },
    ],
  },
  {
    title: "OFFICE EQUIPMENTS",
    featured: {
      title: "Laser Projector",
      subtitle: "Home Thearther 4k",
      image: "📽️",
      bgColor: "from-gray-800 to-black",
    },
    categories: [
      { name: "Printers", count: 9, icon: "🖨️" },
      { name: "Network", count: 90, icon: "📡" },
      { name: "Security", count: 12, icon: "📹" },
      { name: "Projectors", count: 12, icon: "📽️" },
    ],
  },
];

export function CategoryShowcase() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg p-6 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{section.title}</h2>
              <Link
                href={`/products?category=${section.title.toLowerCase()}`}
                className="text-sm text-gray-600 hover:text-green-600 transition"
              >
                View All
              </Link>
            </div>

            {/* Featured Product Banner */}
            <div
              className={`bg-gradient-to-br ${section.featured.bgColor} rounded-lg p-6 mb-6 h-48 flex flex-col justify-between relative overflow-hidden`}
            >
              <div>
                {section.featured.subtitle && (
                  <p className="text-xs text-white/70 mb-1">
                    {section.featured.subtitle}
                  </p>
                )}
                <h3
                  className={`text-xl font-bold ${
                    section.featured.textColor || "text-white"
                  }`}
                >
                  {section.featured.title}
                </h3>
              </div>
              <div className="text-6xl absolute bottom-4 right-4 opacity-80">
                {section.featured.image}
              </div>
            </div>

            {/* Category Grid */}
            <div className="grid grid-cols-2 gap-4">
              {section.categories.map((category) => (
                <Link
                  key={category.name}
                  href={`/products?category=${category.name.toLowerCase()}`}
                  className="flex flex-col items-center justify-center p-4 hover:bg-gray-50 rounded-lg transition group"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition text-3xl">
                    {category.icon}
                  </div>
                  <h4 className="font-semibold text-sm text-center mb-1">
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