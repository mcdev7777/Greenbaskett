"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/utils";
import { Loader, X, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  shippingMethod: "standard" | "express" | "overnight";
  paymentMethod: "credit-card" | "paypal" | "bank-transfer";
  cardName?: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
}

const initialFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  country: "",
  shippingMethod: "standard",
  paymentMethod: "credit-card",
};

const SHIPPING_COSTS = {
  standard: 5.99,
  express: 12.99,
  overnight: 24.99,
};

export function CheckoutFlow() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "confirmation">("cart");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const subtotal = getTotal();
  const shippingCost = SHIPPING_COSTS[formData.shippingMethod];
  const tax = Math.round(subtotal * 0.08 * 100) / 100; // 8% tax
  const total = subtotal + shippingCost + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value as any
    }));
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode', 'country'
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(`Please fill in ${field}`);
        return false;
      }
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email');
      return false;
    }

    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    try {
      const order = await api.createOrder({
        orderNumber: `ORD-${Date.now()}`,
        items: items.map(item => ({
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
          image: item.product.images[0] || "/placeholder.png"
        })),
        total,
        status: 'pending' as const,
        createdAt: new Date().toISOString(),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        shippingMethod: formData.shippingMethod,
        paymentMethod: formData.paymentMethod,
      });

      setOrderId(order.id);
      await clearCart();
      setStep("confirmation");
      toast.success("Order placed successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Empty cart screen
  if (items.length === 0 && step === "cart") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items before proceeding to checkout</p>
          <Link href="/products">
            <Button className="bg-green-600 hover:bg-green-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Confirmation screen
  if (step === "confirmation" && orderId) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600">Thank you for your purchase</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">Order Number</p>
            <p className="text-xl font-bold mb-6">{orderId}</p>

            <p className="text-sm text-gray-600 mb-2">Order Total</p>
            <p className="text-2xl font-bold text-red-600 mb-6">{formatPrice(total)}</p>

            <p className="text-sm text-gray-600 mb-2">Shipping To</p>
            <p className="font-semibold">{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
          </div>

          <p className="text-gray-600 mb-6">
            A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
          </p>

          <div className="flex gap-4">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/profile" className="flex-1">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                View Orders
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {['cart', 'shipping', 'payment', 'confirmation'].map((s, i) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step === s
                      ? 'bg-green-600 text-white'
                      : ['cart', 'shipping', 'payment', 'confirmation'].indexOf(step) > i
                      ? 'bg-green-200 text-green-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {i + 1}
                </div>
                <div className={`h-1 flex-1 ml-2 ${i < 3 ? (
                  ['cart', 'shipping', 'payment', 'confirmation'].indexOf(step) > i
                    ? 'bg-green-600'
                    : 'bg-gray-300'
                ) : 'hidden'}`}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Cart</span>
            <span>Shipping</span>
            <span>Payment</span>
            <span>Confirmation</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Cart Items */}
            {step === "cart" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Order Review</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b">
                      <Image
                        src={item.product.images[0] || "/placeholder.png"}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-gray-600">Qty: {item.quantity}</p>
                        <p className="font-bold">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => setStep("shipping")}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Proceed to Shipping
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {/* Shipping Form */}
            {step === "shipping" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </div>

                  <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <Input
                    placeholder="Street Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="ZIP Code"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="Country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Shipping Method */}
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Shipping Method</h3>
                    <div className="space-y-2">
                      {Object.entries(SHIPPING_COSTS).map(([method, cost]) => (
                        <label key={method} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                          <input
                            type="radio"
                            name="shippingMethod"
                            value={method}
                            checked={formData.shippingMethod === method}
                            onChange={(e) => handleSelectChange('shippingMethod', e.target.value)}
                            className="w-4 h-4"
                          />
                          <span className="ml-3 flex-1 font-semibold">
                            {method.charAt(0).toUpperCase() + method.slice(1)} Shipping
                          </span>
                          <span className="font-bold">{formatPrice(cost)}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </form>

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep("cart")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep("payment")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Continue to Payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {step === "payment" && (
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-6">Payment</h2>

                {/* Payment Method */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="space-y-2">
                    {(['credit-card', 'paypal', 'bank-transfer'] as const).map(method => (
                      <label key={method} className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={(e) => handleSelectChange('paymentMethod', e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className="ml-3">
                          {method === 'credit-card' && '💳 Credit Card'}
                          {method === 'paypal' && '🅿️ PayPal'}
                          {method === 'bank-transfer' && '🏦 Bank Transfer'}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Card Details */}
                {formData.paymentMethod === 'credit-card' && (
                  <form className="space-y-4">
                    <Input
                      placeholder="Cardholder Name"
                      name="cardName"
                      value={formData.cardName || ''}
                      onChange={handleInputChange}
                    />
                    <Input
                      placeholder="Card Number"
                      name="cardNumber"
                      value={formData.cardNumber || ''}
                      onChange={handleInputChange}
                      maxLength={19}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="MM/YY"
                        name="cardExpiry"
                        value={formData.cardExpiry || ''}
                        onChange={handleInputChange}
                      />
                      <Input
                        placeholder="CVC"
                        name="cardCVC"
                        value={formData.cardCVC || ''}
                        onChange={handleInputChange}
                        maxLength={4}
                      />
                    </div>
                  </form>
                )}

                <div className="flex gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setStep("shipping")}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Place Order
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4 pb-4 border-b">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">{formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-red-600">{formatPrice(total)}</span>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Free returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Order protection</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
