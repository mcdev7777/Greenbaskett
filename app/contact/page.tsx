"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FormError } from "@/components/ui/FormError";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { contactSchema, type ContactFormData } from "@/lib/validations";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const handleSubmit2 = async (data: ContactFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      console.log("Contact form submitted:", data);
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Shop", href: "/products" },
          { label: "Contact" },
        ]}
      />

      {/* Main Contact Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 md:p-12">
          <h1 className="text-3xl font-bold mb-2">READY TO WORK WITH US</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Left: Contact Form */}
            <div className="lg:col-span-2">
              <p className="text-gray-600 mb-8">
                Contact us for all your questions and opinions
              </p>

              <form onSubmit={handleSubmit(handleSubmit2)} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="text"
                      {...register("firstName")}
                      className={`h-12 ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    <FormError error={errors.firstName} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="text"
                      {...register("lastName")}
                      className={`h-12 ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    <FormError error={errors.lastName} />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address <span className="text-red-600">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    className={`h-12 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <FormError error={errors.email} />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Phone Number <span className="text-gray-500">(Optional)</span>
                  </label>
                  <Input
                    type="tel"
                    {...register("phone")}
                    className={`h-12 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                  />
                  <FormError error={errors.phone} />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    {...register("message")}
                    placeholder="Note about your order, e.g. special note for delivery"
                    className={`w-full border rounded-lg p-3 min-h-[150px] text-sm ${
                      errors.message ? "border-red-500" : ""
                    }`}
                  />
                  <FormError error={errors.message} />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700 text-white h-12 px-8 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </form>
            </div>

            {/* Right: Contact Info & Image */}
            <div className="space-y-6">
              {/* Contact Information Card */}
              <div className="bg-purple-50 rounded-lg p-6 space-y-6">
                {/* US Office */}
                <div>
                  <p className="text-xs text-gray-600 mb-3 uppercase tracking-wide">
                    UNITED STATES (HEAD QUATER)
                  </p>
                  <p className="text-sm font-medium mb-2">
                    152 Thatcher Road St, Manhattan, 10463, US
                  </p>
                  <p className="text-sm mb-2">(+025) 3886 25 16</p>
                  <a
                    href="mailto:hello@swattechmart.com"
                    className="text-sm text-green-600 underline"
                  >
                    hello@swattechmart.com
                  </a>
                </div>

                {/* UK Office */}
                <div>
                  <p className="text-xs text-gray-600 mb-3 uppercase tracking-wide">
                    UNITED KINGDOM (BRANCH)
                  </p>
                  <p className="text-sm font-medium mb-2">
                    12 Buckingham Rd, Thornthwaite, HG3 4TY, UK
                  </p>
                  <p className="text-sm mb-2">(+718) 895-5350</p>
                  <a
                    href="mailto:contact@swattechmart.co.uk"
                    className="text-sm text-green-600 underline"
                  >
                    contact@swattechmart.co.uk
                  </a>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-3 pt-4">
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <span>🐦</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <span>📘</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <span>📷</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <span>▶️</span>
                  </button>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100">
                    <span>📌</span>
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="relative h-64 lg:h-80 bg-gray-900 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-white">
                  <div className="text-6xl">💻</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Section */}
      <section className="container mx-auto px-4 py-8 pb-16">
        <div className="bg-white rounded-lg p-6 md:p-12">
          <h2 className="text-2xl font-bold mb-6">FIND US ON GOOGLE MAP</h2>

          {/* Map Embed */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.0!2d10.4!3d43.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDQ4JzAwLjAiTiAxMMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}