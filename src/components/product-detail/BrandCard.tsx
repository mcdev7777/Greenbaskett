import Image from "next/image";

interface BrandCardProps {
  brand: string;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <div className="bg-gray-100 rounded-lg p-8 text-center">
      <p className="text-sm text-gray-600 mb-3">Brand: {brand}</p>
      <div className="relative w-full h-20">
        {/* Replace with actual brand logo */}
        <div className="flex items-center justify-center h-full">
          <span className="text-4xl font-bold text-gray-800">{brand}</span>
        </div>
      </div>
    </div>
  );
}