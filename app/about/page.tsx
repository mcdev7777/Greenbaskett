import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "pages", href: "#" },
          { label: "about" },
        ]}
      />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-green-50 rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Best experience
                <br />
                always wins
              </h1>
              <p className="text-gray-600">
                #1 Online Marketplace for Electronic & Technology
                <br />
                in Manhattan, CA
              </p>
            </div>

            {/* Right: Image */}
            <div className="relative h-64 md:h-80">
              {/* Replace with actual image */}
              <div className="w-full h-full bg-gradient-to-br from-orange-100 to-yellow-50 rounded-lg flex items-center justify-center">
                <span className="text-6xl">📦</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats & Purpose Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left: Purpose */}
            <div>
              <h2 className="text-2xl font-bold mb-2">
                OUR PURPOSE IS TO{" "}
                <span className="text-green-600">ENRICH AND ENHANCE LIVES</span>{" "}
                THROUGH TECHNOLOGY
              </h2>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-4xl font-bold mb-2">$12.5M</div>
                <p className="text-sm text-gray-600">
                  TOTAL REVENUE FROM
                  <br />
                  2001 - 2023
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">12K+</div>
                <p className="text-sm text-gray-600">
                  ORDERS DELIVERED
                  <br />
                  SUCCESSFUL ON EVERYDAY
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">725+</div>
                <p className="text-sm text-gray-600">
                  STORE AND OFFICE IN U.S
                  <br />
                  AND WORLDWIDE
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left: Delivery Person Image */}
            <div className="relative h-80 bg-green-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-end justify-center p-8">
                <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white">
                    ✓
                  </div>
                  <div>
                    <div className="font-bold">SWAT</div>
                    <div className="text-sm text-gray-600">TECH MART</div>
                  </div>
                </div>
              </div>
              {/* Replace with actual delivery person image */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl">
                🧑‍💼
              </div>
            </div>

            {/* Right: Text */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                We connect millions of buyers and sellers around the world,
                empowering people & creating economic opportunity for all.
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Within our markets, millions of people around the world connect, both
                online and offline, to make, sell and buy unique goods. We also offer a
                wide range of Seller Services and tools that help creative entrepreneurs
                start, manage & scale their businesses.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                OUR SHOWREEL
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-lg p-6 relative">
            <div className="absolute top-6 right-6 w-12 h-12 bg-green-600 rounded-full"></div>
            <h3 className="text-xl font-bold mb-4">
              100% AUTHENTIC
              <br />
              PRODUCTS
            </h3>
            <p className="text-gray-600 text-sm">
              Swoo Tech Mart just distribute 100% authorized products & guarantee
              quality. Nulla porta nulla nec orci vulputate, id rutrum sapien varius.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-lg p-6 relative">
            <div className="absolute top-6 right-6 w-12 h-12 bg-green-600 rounded-full"></div>
            <h3 className="text-xl font-bold mb-4">
              FAST
              <br />
              DELIVERY
            </h3>
            <p className="text-gray-600 text-sm">
              Fast shipping with a lots of option to delivery. 100% guarantee that your
              goods alway on time and perserve quality.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-lg p-6 relative">
            <div className="absolute top-6 right-6 w-12 h-12 bg-green-600 rounded-full"></div>
            <h3 className="text-xl font-bold mb-4">
              AFFORDABLE
              <br />
              PRICE
            </h3>
            <p className="text-gray-600 text-sm">
              We offer an affordable & competitive price with a lots of special
              promotions.
            </p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">OUR MISSION AND VISION</h2>
          <p className="text-gray-700 leading-relaxed mb-8">
            Nam maximus nunc a augue pulvinar, non euismod mauris tempus. Cras non elit
            vel magna molestie pellentesque in eu dui. Donec laoreet quis erat vitae
            finibus. Vestibulum enim eros, porta eget quam et, euismod dictum elit. Nullam
            eu tempus magna. Fusce malesuada nunc sed augue.{" "}
            <strong>Vivamus mollis mauris</strong> vitae rhoncus egestas. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac turpis
            egestas.
          </p>

          {/* City Image */}
          <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-6xl">🏙️</span>
            </div>
          </div>

          {/* Timeline */}
          <h3 className="text-xl font-bold mb-6">
            FROM A RETAIL STORE TO THE GLOBAL CHAIN OF STORES
          </h3>
          <p className="text-gray-700 mb-8">
            Pellentesque laoreet justo nec ex sodales euismod. Aliquam orci tortor,
            bibendum nec ultricies ac, auctor nec purus. Maecenas in consectetur erat.
          </p>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <span className="font-bold">1997:</span> A small store located in Brooklyn
                Town, USA
              </div>
              <div>
                <span className="font-bold">1998:</span> It is a long established fact
                that a reader will be distracted by the readable
              </div>
              <div>
                <span className="font-bold">2000:</span> Lorem Ipsum is simply dummy text
                of the printing and typesetting industry
              </div>
              <div>
                <span className="font-bold">2002:</span> Lorem Ipsum has been the
                industry's standard dummy text ever since the
              </div>
              <div>
                <span className="font-bold">2004:</span> Contrary to popular belief, Lorem
                Ipsum is not simply random text
              </div>
              <div>
                <span className="font-bold">2005:</span> The point of using Lorem Ipsum is
                that it has a more-or-less normal distribution of letters
              </div>
              <div>
                <span className="font-bold">2006:</span> There are many variations of
                passages of Lorem Ipsum available
              </div>
              <div>
                <span className="font-bold">2010:</span> All the Lorem Ipsum generators on
                the Internet tend to repeat predefined
              </div>
              <div>
                <span className="font-bold">2013:</span> Lorem Ipsum comes from sections
                1.10.32
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <span className="font-bold">2014:</span> There are many variations of
                passages of Lorem Ipsum available
              </div>
              <div>
                <span className="font-bold">2016:</span> All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks
              </div>
              <div>
                <span className="font-bold">2020:</span> Lorem Ipsum comes from sections
                1.10.32
              </div>
              <div>
                <span className="font-bold">2021:</span> Making this the first true
                generator on the Internet
              </div>
              <div>
                <span className="font-bold">2022:</span> Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
              </div>
              <div>
                <span className="font-bold">2023:</span> here are many variations of
                passages of Lorem Ipsum available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="bg-white rounded-lg p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">LEADERSHIPS</h2>
            <Button variant="link" className="text-green-600">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Henry Avery", role: "CHAIRMAN" },
              { name: "Michael Edward", role: "VICE PRESIDENT" },
              { name: "Eden Hazard", role: "CEO" },
              { name: "Robert Downey Jr", role: "CEO" },
              { name: "Nathan Drake", role: "STRATEGIST DIRECTOR" },
            ].map((leader, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 bg-gray-200 rounded-lg mb-3 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    👨‍💼
                  </div>
                </div>
                <h4 className="font-bold mb-1">{leader.name}</h4>
                <p className="text-xs text-gray-600 uppercase">{leader.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}