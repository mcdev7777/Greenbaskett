"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, Package, Truck, CheckCircle, XCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"account" | "orders" | "address" | "password">("account");
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.user_metadata?.full_name || "",
        email: user.email || "",
        phone: user.user_metadata?.phone || "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeTab === "orders" && user) {
      loadOrders();
    }
  }, [activeTab, user]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const userOrders = await api.getOrders(user?.id);
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to load orders:", error);
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
        },
      });

      if (error) throw error;
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) throw error;
      
      toast.success("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
                <h3 className="font-bold text-lg mb-1">
                  {user.user_metadata?.full_name || "User"}
                </h3>
                <p className="text-sm text-gray-600">{user.email}</p>
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
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <Input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                        className="h-12"
                      />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        disabled
                        className="h-12 bg-gray-50"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Email cannot be changed
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Phone Number <span className="text-gray-500">(Optional)</span>
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>

                    {/* Save Button */}
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-12 h-12"
                    >
                      SAVE
                    </Button>
                  </form>
                </>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold">My Orders</h2>
                    <p className="text-sm text-gray-600">{orders.length} orders</p>
                  </div>

                  {loadingOrders ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">⏳</div>
                      <p className="text-gray-600">Loading orders...</p>
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-6">
                      {orders.map((order) => (
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
                                  Placed on {new Date(order.created_at).toLocaleDateString('en-US', {
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
                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        New Password <span className="text-red-600">*</span>
                      </label>
                      <Input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, newPassword: e.target.value })
                        }
                        placeholder="Minimum 6 characters"
                        required
                        minLength={6}
                        className="h-12"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Confirm New Password <span className="text-red-600">*</span>
                      </label>
                      <Input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                        }
                        placeholder="Re-enter your password"
                        required
                        minLength={6}
                        className="h-12"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white px-12 h-12"
                    >
                      UPDATE PASSWORD
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