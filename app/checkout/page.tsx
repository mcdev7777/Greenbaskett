"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useCartStore } from "@/store/cart-store";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const { items, getTotal, clearCart, fetchCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "ke",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
    email: "",
    orderNotes: "",
  });

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      toast.error("Please login to checkout");
      router.push("/login?redirect=/checkout");
    }
  }, [user, loading, router]);

  // Pre-fill user data
  useEffect(() => {
    if (user) {
      const nameParts = (user.user_metadata?.full_name || "").split(" ");
      setFormData(prev => ({
        ...prev,
        email: user.email || "",
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        phone: user.user_metadata?.phone || "",
      }));
    }
  }, [user]);

  const subtotal = getTotal();
  const shipping = 9.50;
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'country', 'address', 'city', 'zipCode', 'phone', 'email'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);
    try {
      // Generate order number
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const order = await api.createOrder({
        orderNumber,
        total,
        status: "processing",
        items: items.map(item => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
           image: item.product.images[0] || "/placeholder.png",
        })),
        createdAt: new Date().toISOString(),
      });

      await clearCart();
      toast.success("Order placed successfully!");
      router.push("/profile?tab=orders");
    } catch (error: any) {
      toast.error(error.message || "Failed to place order");
    } finally {
      setIsProcessing(false);
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

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "pages", href: "/" },
            { label: "checkout" },
          ]}
        />
        <div className="container mx-auto px-4 py-12">
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="text-6xl mb-4">🛒</div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products before checking out!</p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "pages", href: "/" },
          { label: "cart", href: "/cart" },
          { label: "checkout" },
        ]}
      />

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">CHECKOUT</h2>

          {/* Login Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800">
              ✓ Logged in as <span className="font-semibold">{user.email}</span>
            </p>
          </div>

          <form onSubmit={handlePlaceOrder}>
            {/* Main Checkout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Billing Details */}
              <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-6">Billing Detail</h3>
                
                <div className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        First Name <span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Last Name <span className="text-red-600">*</span>
                      </label>
                      <Input
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company Name (Optional)
                    </label>
                    <Input
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Country / Region <span className="text-red-600">*</span>
                    </label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) => handleSelectChange("country", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ke">Kenya</SelectItem>
                        <SelectItem value="us">United States (US)</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="ca">Canada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Street Address */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Street Address <span className="text-red-600">*</span>
                    </label>
                    <Input 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House number and street name ..." 
                      className="mb-3"
                      required 
                    />
                    <Input
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apartment, suite, unit, etc (Optional)" 
                    />
                  </div>

                  {/* Town/City */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Town / City <span className="text-red-600">*</span>
                    </label>
                    <Input
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* State/County */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      State / County
                    </label>
                    <Input
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Optional"
                    />
                  </div>

                  {/* Zip Code */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Zip Code <span className="text-red-600">*</span>
                    </label>
                    <Input
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled
                      className="bg-gray-50"
                    />
                  </div>

                  {/* Additional Information */}
                  <div className="pt-4">
                    <h4 className="font-bold text-lg mb-4">Additional Information</h4>
                    <label className="block text-sm font-semibold mb-2">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleInputChange}
                      className="w-full border rounded-lg p-3 min-h-[120px] text-sm"
                      placeholder="Note about your order, e.g. special note for delivery"
                    />
                  </div>
                </div>
              </div>

              {/* Right: Your Order */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
                  <h3 className="text-xl font-bold mb-6">Your Order</h3>

                  {/* Order Items */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm font-semibold pb-3 border-b">
                      <span className="text-gray-600">PRODUCT</span>
                      <span className="text-gray-600">SUB TOTAL</span>
                    </div>

                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 bg-white rounded flex-shrink-0">
                          <Image
                            src={item.product.images[0] || "/placeholder.png"}
                            alt={item.product.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold line-clamp-2 mb-1">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-gray-600">x {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping */}
                  <div className="border-t pt-4 mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Subtotal</span>
                      <span className="font-semibold">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Worldwide Standard Shipping</span>
                      <span className="text-red-600 font-semibold">+ {formatPrice(shipping)}</span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Order Total</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-3 p-3 border rounded cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        name="payment"
                        value="bank-transfer"
                        checked={paymentMethod === "bank-transfer"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-sm">Direct Bank Transfer</span>
                          <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Make your payment directly into our bank account. Please use your Order ID
                          as the payment reference.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        name="payment"
                        value="cash-on-delivery"
                        checked={paymentMethod === "cash-on-delivery"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="font-semibold text-sm cursor-pointer">
                        Cash on Delivery
                      </label>
                    </div>

                    <div className="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-white">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === "paypal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <label className="font-semibold text-sm cursor-pointer flex-1">
                        PayPal
                      </label>
                      <span className="text-blue-600 font-bold">PayPal</span>
                    </div>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold"
                  >
                    {isProcessing ? "PROCESSING..." : "PLACE ORDER"}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}