import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function ProductsHero() {
  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">TOP CELL PHONES & TABLETS</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Headphones Banner */}
        <div className="relative bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg overflow-hidden h-64 md:h-80">
          <Image
            src="https://i.pinimg.com/564x/YOUR_HEADPHONE.jpg"
            alt="Noise Cancelling Headphone"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30" />

          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Noise Cancelling
              <br />
              Headphone
            </h2>
            <p className="text-white/90 text-sm mb-1">Bose Over-Ear Headphone</p>
            <p className="text-white/90 text-sm mb-1">Wifi, Voice Assistant,</p>
            <p className="text-white/90 text-sm mb-4">Low Latency Game Mode</p>
            <Button className="bg-white text-gray-900 hover:bg-gray-100 w-fit px-6">
              BUY NOW
            </Button>
          </div>

          <div className="absolute bottom-4 right-4 bg-white/90 px-3 py-1 rounded-full text-sm font-medium">
            3 / 3
          </div>
        </div>

        {/* Phone Banner */}
        <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden h-64 md:h-80">
          <Image
            src="https://i.pinimg.com/564x/YOUR_PHONE.jpg"
            alt="redmi note 12 Pro+ 5g"
            fill
            className="object-contain"
          />

          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              redmi note 12
              <br />
              Pro+ 5g
            </h2>
            <p className="text-sm text-gray-600 mb-4">Rise to the challenge</p>
          </div>

          <Button className="absolute top-6 right-6 md:top-8 md:right-8 bg-black hover:bg-gray-800 text-white">
            SHOP NOW
          </Button>
        </div>
      </div>
    </section>
  );
}