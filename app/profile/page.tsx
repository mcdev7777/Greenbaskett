"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Package, Truck, CheckCircle, XCircle, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FormError } from "@/components/ui/FormError";
import { formatPrice } from "@/lib/utils";
import { profileSchema, passwordChangeSchema, type ProfileFormData, type PasswordChangeFormData } from "@/lib/validations";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 1458.00,
    items: [
      {
        id: "1",
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/80",
        price: 79.99,
        quantity: 2,
      },
      {
        id: "2",
        name: "Smart Watch Series 5",
        image: "https://via.placeholder.com/80",
        price: 299.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 579.00,
    items: [
      {
        id: "3",
        name: "Running Shoes Pro",
        image: "https://via.placeholder.com/80",
        price: 129.99,
        quantity: 1,
      },
      {
        id: "4",
        name: "Wireless Headphones",
        image: "https://via.placeholder.com/80",
        price: 79.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-25",
    status: "processing",
    total: 849.00,
    items: [
      {
        id: "5",
        name: "Smart Coffee Maker",
        image: "https://via.placeholder.com/80",
        price: 199.99,
        quantity: 1,
      },
    ],
  },
  {
    id: "ORD-2023-156",
    date: "2023-12-10",
    status: "cancelled",
    total: 299.00,
    items: [
      {
        id: "6",
        name: "Yoga Mat Premium",
        image: "https://via.placeholder.com/80",
        price: 49.99,
        quantity: 1,
      },
    ],
  },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"account" | "orders" | "address" | "password">("account");
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "Mark",
      lastName: "Cole",
      email: "swoo@gmail.com",
      phone: "+1 0231 4554 452",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    mode: "onBlur",
  });

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setIsLoadingProfile(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
      console.log("Save profile:", data);
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const onSubmitPassword = async (data: PasswordChangeFormData) => {
    try {
      setIsLoadingPassword(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Password changed successfully!");
      resetPassword();
      console.log("Password changed");
    } catch (error) {
      toast.error("Failed to change password. Please try again.");
    } finally {
      setIsLoadingPassword(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "shipped":
        return <Truck className="w-5 h-5 text-blue-600" />;
      case "processing":
        return <Package className="w-5 h-5 text-orange-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Delivered</Badge>;
      case "shipped":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Shipped</Badge>;
      case "processing":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Processing</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "pages", href: "#" },
          { label: "profile" },
        ]}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 space-y-6">
              {/* User Info */}
              <div className="text-center pb-6 border-b">
                <div className="w-32 h-32 mx-auto mb-4 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                <h3 className="font-bold text-lg mb-1">Mark Cole</h3>
                <p className="text-sm text-gray-600">swoo@gmail.com</p>
              </div>

              {/* Menu */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("account")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === "account"
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">Account Info</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === "orders"
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">My order</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab("address")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === "address"
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">My address</span>
                  <ChevronRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => setActiveTab("password")}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${
                    activeTab === "password"
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">Change password</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 md:p-8">
              {/* Account Info Tab */}
              {activeTab === "account" && (
                <>
                  <h2 className="text-2xl font-bold mb-8">Account Info</h2>
                  <form onSubmit={handleSubmitProfile(onSubmitProfile)} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="text"
                          {...registerProfile("firstName")}
                          className={`h-12 ${
                            errorsProfile.firstName ? "border-red-500" : ""
                          }`}
                        />
                        <FormError error={errorsProfile.firstName} />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <Input
                          type="text"
                          {...registerProfile("lastName")}
                          className={`h-12 ${
                            errorsProfile.lastName ? "border-red-500" : ""
                          }`}
                        />
                        <FormError error={errorsProfile.lastName} />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <Input
                        type="email"
                        {...registerProfile("email")}
                        className={`h-12 ${
                          errorsProfile.email ? "border-red-500" : ""
                        }`}
                      />
                      <FormError error={errorsProfile.email} />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <Input
                        type="tel"
                        {...registerProfile("phone")}
                        className={`h-12 ${
                          errorsProfile.phone ? "border-red-500" : ""
                        }`}
                      />
                      <FormError error={errorsProfile.phone} />
                    </div>

                    {/* Save Button */}
                    <Button
                      type="submit"
                      disabled={isLoadingProfile}
                      className="bg-green-600 hover:bg-green-700 text-white px-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingProfile ? "SAVING..." : "SAVE"}
                    </Button>
                  </form>
                </>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">My Orders</h2>
                    <p className="text-sm text-gray-600">{mockOrders.length} orders</p>
                  </div>

                  {mockOrders.length > 0 ? (
                    <div className="space-y-6">
                      {mockOrders.map((order) => (
                        <div
                          key={order.id}
                          className="border rounded-lg p-6 hover:shadow-md transition"
                        >
                          {/* Order Header */}
                          <div className="flex flex-wrap items-center justify-between mb-4 pb-4 border-b gap-4">
                            <div className="flex items-center gap-3">
                              {getStatusIcon(order.status)}
                              <div>
                                <p className="font-bold text-lg">{order.id}</p>
                                <p className="text-sm text-gray-600">
                                  Placed on {new Date(order.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {getStatusBadge(order.status)}
                              <div className="text-right">
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="font-bold text-lg">{formatPrice(order.total)}</p>
                              </div>
                            </div>
                          </div>

                          {/* Order Items */}
                          <div className="space-y-4 mb-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="relative w-20 h-20 bg-gray-100 rounded flex-shrink-0">
                                  <Image
                                    src={"https://i.pinimg.com/736x/e9/bc/01/e9bc01c2d889ce6b37cd9a3e4a8e7ec2.jpg"}
                                    alt={item.name}
                                    fill
                                    className="object-contain p-2"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold mb-1">{item.name}</h4>
                                  <p className="text-sm text-gray-600">
                                    Qty: {item.quantity} × {formatPrice(item.price)}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold">
                                    {formatPrice(item.price * item.quantity)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Order Actions */}
                          <div className="flex flex-wrap gap-3 pt-4 border-t">
                            <Button
                              variant="outline"
                              className="border-green-600 text-green-600 hover:bg-green-50"
                            >
                              View Details
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline">Write Review</Button>
                            )}
                            {order.status === "shipped" && (
                              <Button variant="outline">Track Order</Button>
                            )}
                            {order.status === "processing" && (
                              <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                                Cancel Order
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📦</div>
                      <p className="text-gray-600 mb-4">No orders yet</p>
                      <Button asChild className="bg-green-600 hover:bg-green-700">
                        <Link href="/products">Start Shopping</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}

              {/* Address Tab */}
              {activeTab === "address" && (
                <div>
                  <h2 className="text-2xl font-bold mb-8">My Address</h2>
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📍</div>
                    <p className="text-gray-600 mb-4">No addresses saved</p>
                    <Button className="bg-green-600 hover:bg-green-700">
                      Add New Address
                    </Button>
                  </div>
                </div>
              )}

              {/* Change Password Tab */}
              {activeTab === "password" && (
                <div>
                  <h2 className="text-2xl font-bold mb-8">Change Password</h2>
                  <form onSubmit={handleSubmitPassword(onSubmitPassword)} className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showCurrentPassword ? "text" : "password"}
                          {...registerPassword("currentPassword")}
                          className={`h-12 pr-12 ${
                            errorsPassword.currentPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <FormError error={errorsPassword.currentPassword} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          {...registerPassword("newPassword")}
                          className={`h-12 pr-12 ${
                            errorsPassword.newPassword ? "border-red-500" : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <FormError error={errorsPassword.newPassword} />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          {...registerPassword("confirmPassword")}
                          className={`h-12 pr-12 ${
                            errorsPassword.confirmPassword ? "border-red-500" : ""
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
                      <FormError error={errorsPassword.confirmPassword} />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoadingPassword}
                      className="bg-green-600 hover:bg-green-700 text-white px-12 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoadingPassword ? "UPDATING..." : "UPDATE PASSWORD"}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}