"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CheckoutSection() {
  const { items, getTotal, fetchCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer");
  
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = getTotal();
  const shipping = 9.50;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return null; // Don't show section if cart is empty
  }

  return (
    <section id="checkout-section" className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold mb-6">CHECKOUT</h2>

        {/* Login/Coupon Messages */}
        <div className="space-y-3 mb-6">
          <div className="bg-gray-100 p-4 rounded text-sm">
            Returning customer?{" "}
            <button className="text-red-600 hover:underline font-semibold">
              Click here to log in
            </button>
          </div>
          <div className="bg-gray-100 p-4 rounded text-sm">
            Have a coupon?{" "}
            <button className="text-red-600 hover:underline font-semibold">
              Click here to enter your code
            </button>
          </div>
        </div>

        {/* Main Checkout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Billing Details */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-6">Billing Detail</h3>
            
            <form className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    First Name <span className="text-red-600">*</span>
                  </label>
                  <Input placeholder="" required />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Last Name <span className="text-red-600">*</span>
                  </label>
                  <Input placeholder="" required />
                </div>
              </div>

              {/* Company Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Company Name (Optional)
                </label>
                <Input placeholder="" />
              </div>

              {/* Country */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Country / Region <span className="text-red-600">*</span>
                </label>
                <Select defaultValue="us">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States (US)</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="ke">Kenya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Street Address */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Street Address <span className="text-red-600">*</span>
                </label>
                <Input 
                  placeholder="House number and street name ..." 
                  className="mb-3"
                  required 
                />
                <Input 
                  placeholder="Apartment, suite, unit, etc (Optional)" 
                />
              </div>

              {/* Town/City */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Town / City <span className="text-red-600">*</span>
                </label>
                <Input placeholder="" required />
              </div>

              {/* State/County */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  State / County <span className="text-red-600">*</span>
                </label>
                <Select defaultValue="wa">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wa">Washington</SelectItem>
                    <SelectItem value="ca">California</SelectItem>
                    <SelectItem value="ny">New York</SelectItem>
                    <SelectItem value="tx">Texas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Zip Code */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Zip Code <span className="text-red-600">*</span>
                </label>
                <Input placeholder="" required />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <Input type="tel" placeholder="" required />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <Input type="email" placeholder="" required />
              </div>

              {/* Create Account */}
              <div className="flex items-center gap-2">
                <Checkbox id="create-account" />
                <label htmlFor="create-account" className="text-sm cursor-pointer">
                  Create an account?
                </label>
              </div>

              {/* Ship to Different Address */}
              <div className="pt-4">
                <h4 className="font-bold text-lg mb-2">Ship to a different address?</h4>
              </div>

              {/* Additional Information */}
              <div className="pt-4">
                <h4 className="font-bold text-lg mb-4">Additional Information</h4>
                <label className="block text-sm font-semibold mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  className="w-full border rounded-lg p-3 min-h-[120px] text-sm"
                  placeholder="Note about your order, e.g. special note for delivery"
                />
              </div>
            </form>
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
                      as the payment reference. Your order will not be shipped until the funds
                      have cleared in our account.
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
                    Paypal
                  </label>
                  <span className="text-blue-600 font-bold">PayPal</span>
                  <button className="text-blue-600 text-xs underline">What's Paypal?</button>
                </div>
              </div>

              {/* Place Order Button */}
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white h-12 text-base font-semibold">
                PLACE ORDER
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}