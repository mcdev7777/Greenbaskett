"use client";

import Link from "next/link";
import { Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const footerLinks = {
  topCategories: [
    "Laptops",
    "PC & Computers",
    "Cell Phones",
    "Tablets",
    "Gaming & VR",
    "Networks",
    "Cameras",
    "Sounds",
    "Office",
  ],
  company: [
    { label: "About Swoo", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Career", href: "/career" },
    { label: "Blog", href: "/blog" },
    { label: "Sitemap", href: "/sitemap" },
    { label: "Store Locations", href: "/stores" },
  ],
  helpCenter: [
    { label: "Customer Service", href: "/customer-service" },
    { label: "Policy", href: "/policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Track Order", href: "/track-order" },
    { label: "FAQs", href: "/faqs" },
    { label: "My Account", href: "/account" },
    { label: "Product Support", href: "/support" },
  ],
  partner: [
    { label: "Become Seller", href: "/become-seller" },
    { label: "Affiliate", href: "/affiliate" },
    { label: "Advertise", href: "/advertise" },
    { label: "Partnership", href: "/partnership" },
  ],
};

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-gray-100 border-t mt-8 sm:mt-12">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="sm:col-span-1">
            <h3 className="font-bold text-xs sm:text-sm mb-4">
              SWOO - 1ST NYC TECH ONLINE MARKET
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">HOTLINE 24/7</p>
                <a
                  href="tel:025368625 16"
                  className="text-green-600 font-bold text-lg sm:text-xl hover:text-green-700"
                >
                  (025) 3686 25 16
                </a>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                257 Thatcher Road St, Brooklyn, Manhattan,
                <br />
                NY 10092
              </p>
              <a
                href="mailto:contact@Swootechmart.com"
                className="text-xs sm:text-sm text-gray-600 hover:text-green-600 break-all"
              >
                contact@Swootechmart.com
              </a>
            </div>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition flex-shrink-0"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition flex-shrink-0"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition flex-shrink-0"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition flex-shrink-0"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Top Categories */}
          <div>
            <h3 className="font-bold text-xs sm:text-sm mb-4">TOP CATEGORIES</h3>
            <ul className="space-y-2">
              {footerLinks.topCategories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/products?category=${category.toLowerCase()}`}
                    className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-xs sm:text-sm mb-4">COMPANY</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Center */}
          <div>
            <h3 className="font-bold text-xs sm:text-sm mb-4">HELP CENTER</h3>
            <ul className="space-y-2">
              {footerLinks.helpCenter.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div>
            <h3 className="font-bold text-xs sm:text-sm mb-4">PARTNER</h3>
            <ul className="space-y-2">
              {footerLinks.partner.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-gray-600 hover:text-green-600 transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-b border-gray-300 py-6 sm:py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg sm:text-xl font-bold mb-4">
              SUBSCRIBE & GET{" "}
              <span className="text-red-600">10% OFF</span> FOR YOUR FIRST ORDER
            </h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 text-sm"
              />
              <Button
                onClick={handleSubscribe}
                className="bg-green-600 hover:bg-green-700 text-white px-4 sm:px-8 text-xs sm:text-base whitespace-nowrap"
              >
                SUBSCRIBE
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              By subscribing, you're accepted the our{" "}
              <Link href="/policy" className="underline">
                Policy
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 sm:pt-8 flex flex-col items-center justify-center gap-4 sm:gap-0 sm:flex-row sm:justify-between sm:items-center text-center sm:text-left">
          {/* Language & Currency */}

          {/* Copyright */}
          <div className="text-xs sm:text-sm text-gray-600 order-3 sm:order-2">
            © 2024 <span className="font-bold">Shawonetc3</span>. All Rights Reserved
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 sm:gap-3 order-2 sm:order-3">
            <span className="text-xl">💳</span>
            <span className="text-xl">💳</span>
            <span className="text-xl">💳</span>
            <span className="text-xs sm:text-sm font-semibold">stripe</span>
            <span className="text-xs sm:text-sm font-semibold">Klarna.</span>
          </div>

          {/* Mobile Site Link */}
          <Link
            href="/mobile"
            className="text-xs sm:text-sm text-blue-600 hover:underline order-4 sm:order-4"
          >
            Mobile Site
          </Link>
        </div>
      </div>
    </footer>
  );
}