import { Hero } from "@/components/layout/Hero";
import { FeaturedSection } from "@/components/home/FeaturedSection";
import { DealsOfTheDay } from "@/components/home/DealsOfTheDay";
import { CategoryShowcase } from "@/components/home/CategoryShowCase";
import { PromoBanner } from "@/components/home/PromoBanner";
import { RecentlyViewed } from "@/components/home/RecentlyViewed";
import { api } from "@/lib/api";

export default async function Home() {
  
  const products = await api.getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <FeaturedSection />
      <DealsOfTheDay />
      <CategoryShowcase />
      <PromoBanner />
      <RecentlyViewed products={products} />
    </div>
  );
}