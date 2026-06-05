"use client";

import Link from "next/link";
import { Laptop, ShoppingBag, ArrowLeft, Truck, Shield, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { CartItemRow } from "@/components/cart/cart-item";
import { useToast } from "@/hooks/use-toast";

export function DesktopCart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const { toast } = useToast();

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 500 ? 0 : 29;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;
  const totalItems = getTotalItems();

  const handleCheckout = () => {
    toast({
      title: "Checkout Coming Soon",
      description: "The checkout functionality is currently under development. Stay tuned!",
    });
  };

  // Empty Cart State
  if (items.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-6 py-16">
          <div className="w-20 h-20 rounded-sm bg-[#f0f7fc] flex items-center justify-center mx-auto mb-6">
            <Laptop className="w-10 h-10 text-[#0096D6]" />
          </div>
          <h2 className="text-2xl font-mono font-bold text-[#0a0a0a] mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-[#666] mb-8 leading-relaxed">
            Looks like you haven&apos;t added any refurbished laptops yet. 
            Explore our collection and find the perfect machine for you.
          </p>
          <Link href="/shop">
            <Button className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-semibold tracking-wider rounded-sm px-8 h-11">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-bold text-[#0a0a0a] tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-sm text-[#666] mt-1 font-mono">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          {/* Left: Cart Items */}
          <div>
            <div className="rounded-sm border border-[#e5e5e5] bg-white">
              {/* Column Headers */}
              <div className="grid grid-cols-[1fr_auto_auto] gap-6 px-6 py-3 border-b border-[#e5e5e5] bg-[#fafafa] text-[11px] font-mono uppercase tracking-widest text-[#999]">
                <span>Product</span>
                <span className="w-[120px] text-center">Quantity</span>
                <span className="w-[80px] text-right">Total</span>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-[#f0f0f0] px-6">
                {items.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                  />
                ))}
              </div>
            </div>

            {/* Continue Shopping */}
            <div className="mt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-sm text-[#0096D6] hover:text-[#0078AE] font-mono tracking-wider transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div>
            <div className="rounded-sm border border-[#e5e5e5] bg-[#fafafa] sticky top-[84px]">
              <div className="px-6 py-4 border-b border-[#e5e5e5] bg-[#0096D6] rounded-t-sm">
                <h2 className="text-base font-mono font-bold text-white tracking-wider uppercase">
                  Order Summary
                </h2>
              </div>

              <div className="px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Subtotal</span>
                  <span className="font-mono font-semibold text-[#0a0a0a]">
                    ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Estimated Shipping</span>
                  {shipping === 0 ? (
                    <Badge className="bg-[#10B981] text-white border-0 rounded-sm font-mono text-xs px-2 py-0.5">
                      FREE
                    </Badge>
                  ) : (
                    <span className="font-mono font-semibold text-[#0a0a0a]">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Free shipping notice */}
                {shipping > 0 && (
                  <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#f0fdf4] border border-[#dcfce7]">
                    <Leaf className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="text-[11px] text-[#15803d] font-mono">
                      Add ${(500 - subtotal).toFixed(2)} more for free shipping
                    </span>
                  </div>
                )}

                {shipping === 0 && (
                  <div className="flex items-center gap-2 p-2.5 rounded-sm bg-[#f0fdf4] border border-[#dcfce7]">
                    <Truck className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="text-[11px] text-[#15803d] font-mono">
                      You qualify for free shipping!
                    </span>
                  </div>
                )}

                {/* Tax */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">Estimated Tax</span>
                  <span className="font-mono font-semibold text-[#0a0a0a]">
                    ${tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <Separator className="bg-[#e5e5e5]" />

                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-base font-mono font-bold text-[#0a0a0a]">Total</span>
                  <span className="text-xl font-mono font-bold text-[#0a0a0a]">
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Savings */}
                <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-sm bg-[#f0fdf4] border border-[#dcfce7]">
                  <span className="text-xs font-mono text-[#15803d]">
                    You&apos;re saving ${items.reduce((sum, i) => sum + (i.product.originalPrice - i.product.refurbishedPrice) * i.quantity, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} with refurbished!
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="px-6 pb-5">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-semibold tracking-wider rounded-sm h-12 text-base"
                >
                  Proceed to Checkout
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="px-6 pb-5 border-t border-[#e5e5e5] pt-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex items-center gap-1.5 text-[#999]">
                    <Shield className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Secure</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#999]">
                    <Truck className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Free Ship 500+</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#999]">
                    <Leaf className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-wider">Eco</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
