"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/FormError";
import { registerSchema, type RegisterFormData } from "@/lib/validations";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Registration successful! Please log in.");
      console.log("Register:", data);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "pages", href: "#" },
          { label: "Register" },
        ]}
      />

      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Illustration */}
            <div className="hidden md:block">
              <div className="relative w-full h-96">
                {/* Placeholder for illustration - replace with actual image */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👤</div>
                    <p className="text-gray-600">Create Account</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Register Form */}
            <div>
              <h1 className="text-4xl font-bold text-green-600 mb-2">Register</h1>
              <p className="text-gray-500 mb-8 uppercase text-sm tracking-wide">
                JOIN TO US
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Your Name */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your name
                  </label>
                  <Input
                    type="text"
                    placeholder="Jhon Deo"
                    {...register("name")}
                    className={`h-12 ${
                      errors.name ? "border-red-500" : ""
                    }`}
                  />
                  <FormError error={errors.name} />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Example@gmail.com"
                    {...register("email")}
                    className={`h-12 ${
                      errors.email ? "border-red-500" : ""
                    }`}
                  />
                  <FormError error={errors.email} />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••"
                      {...register("password")}
                      className={`h-12 pr-12 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormError error={errors.password} />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••"
                      {...register("confirmPassword")}
                      className={`h-12 pr-12 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <FormError error={errors.confirmPassword} />
                </div>

                {/* Register Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "REGISTERING..." : "REGISTER"}
                </Button>

                {/* Login Link */}
                <p className="text-center text-sm">
                  <span className="text-gray-500">ALREADY USER ? </span>
                  <Link href="/login" className="text-green-600 font-semibold hover:underline">
                    LOGIN
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}