"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Laptop, ShoppingBag, ArrowLeft, Truck, Shield, Leaf, ChevronUp, ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, X } from "lucide-react";

const conditionColors: Record<string, string> = {
  "A+": "bg-[#10B981] text-white border-0",
  A: "bg-sky-500 text-white border-0",
  "B+": "bg-amber-500 text-white border-0",
  B: "bg-orange-500 text-white border-0",
};

export function MobileCart() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);
  const getTotalItems = useCartStore((s) => s.getTotalItems);
  const clearCart = useCartStore((s) => s.clearCart);
  const { toast } = useToast();
  const [summaryOpen, setSummaryOpen] = useState(false);

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
        <div className="text-center max-w-xs mx-auto px-4 py-12">
          <div className="w-16 h-16 rounded-xl bg-[#f0f7fc] flex items-center justify-center mx-auto mb-5">
            <Laptop className="w-8 h-8 text-sky-500" />
          </div>
          <h2 className="text-xl font-mono font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Looks like you haven&apos;t added any refurbished laptops yet. Find your next machine!
          </p>
          <Link href="/shop">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold tracking-wide rounded-xl px-6 h-10 btn-primary-highlight">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white pb-[140px]">
      <div className="px-4 py-5">
        {/* Page Header */}
        <div className="mb-4">
          <h1 className="text-xl font-mono font-bold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-mono">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </p>
        </div>

        {/* Cart Items */}
        <div className="divide-y divide-slate-100">
          {items.map((item) => {
            const { product, quantity } = item;
            const lineTotal = product.refurbishedPrice * quantity;

            return (
              <div key={product.id} className="py-4 first:pt-0">
                <div className="flex gap-3">
                  {/* Image */}
                  <div className="relative shrink-0 w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={56}
                      height={56}
                      className="object-contain p-1"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <Link href={`/product/${product.id}`} className="hover:text-sky-600 transition-colors">
                          <h3 className="text-sm font-mono font-semibold text-gray-900 leading-tight truncate">
                            {product.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider">{product.brand}</span>
                          <Badge
                            className={`text-[9px] px-1 py-0 h-3.5 rounded-xl font-mono ${conditionColors[product.condition] || "bg-gray-400 text-white border-0"}`}
                          >
                            {product.condition}
                          </Badge>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="shrink-0 p-1 text-slate-300 btn-ghost-highlight hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                        aria-label={`Remove ${product.name}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price + Quantity + Total Row */}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="text-sm font-mono font-bold text-gray-900">
                          ${product.refurbishedPrice.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 line-through font-mono ml-1">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-0">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded-xl text-slate-500 btn-ghost-highlight hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-7 h-6 flex items-center justify-center border-y border-slate-200 font-mono text-xs font-semibold text-gray-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded-xl text-slate-500 btn-ghost-highlight hover:bg-sky-50 hover:border-sky-400 hover:text-sky-600 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>

                    {/* Line Total */}
                    <div className="flex items-center justify-end mt-1.5">
                      <span className="text-xs font-mono text-slate-400">Line total: </span>
                      <span className="text-sm font-mono font-bold text-gray-900 ml-1">
                        ${lineTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Continue Shopping */}
        <div className="mt-4">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-sky-500 hover:text-sky-700 font-mono tracking-wide transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Continue Shopping
          </Link>
        </div>
      </div>

      {/* Sticky Bottom Order Summary */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        {/* Expandable Summary */}
        {summaryOpen && (
          <div className="px-4 pt-4 pb-2 space-y-3 border-b border-slate-100 bg-slate-50">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Subtotal</span>
              <span className="font-mono font-semibold text-sm text-gray-900">
                ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Shipping</span>
              {shipping === 0 ? (
                <Badge className="bg-[#10B981] text-white border-0 rounded-xl font-mono text-[10px] px-1.5 py-0 h-4">
                  FREE
                </Badge>
              ) : (
                <span className="font-mono font-semibold text-sm text-gray-900">
                  ${shipping.toFixed(2)}
                </span>
              )}
            </div>
            {shipping > 0 && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <Leaf className="w-3 h-3 text-[#10B981] shrink-0" />
                <span className="text-[10px] text-[#15803d] font-mono">
                  Add ${(500 - subtotal).toFixed(2)} more for free shipping
                </span>
              </div>
            )}
            {shipping === 0 && (
              <div className="flex items-center gap-1.5 p-2 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
                <Truck className="w-3 h-3 text-[#10B981] shrink-0" />
                <span className="text-[10px] text-[#15803d] font-mono">Free shipping applied!</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Tax</span>
              <span className="font-mono font-semibold text-sm text-gray-900">
                ${tax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 rounded-xl bg-[#f0fdf4] border border-[#dcfce7]">
              <span className="text-[10px] font-mono text-[#15803d]">
                Saving ${items.reduce((sum, i) => sum + (i.product.originalPrice - i.product.refurbishedPrice) * i.quantity, 0).toLocaleString("en-US", { minimumFractionDigits: 2 })} with refurbished!
              </span>
            </div>
          </div>
        )}

        {/* Bottom Bar - Always visible */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2.5">
            <button
              onClick={() => setSummaryOpen(!summaryOpen)}
              className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-gray-900 transition-colors"
            >
              {summaryOpen ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronUp className="w-3.5 h-3.5" />
              )}
              Order Summary
            </button>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">Total:</span>
              <span className="text-lg font-mono font-bold text-gray-900">
                ${total.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold tracking-wide rounded-xl h-11 text-sm btn-primary-highlight"
          >
            Proceed to Checkout
          </Button>
          <div className="flex items-center justify-center gap-4 mt-2">
            <div className="flex items-center gap-1 text-slate-400">
              <Shield className="w-3 h-3" />
              <span className="text-[9px] font-mono uppercase tracking-wider">Secure</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Truck className="w-3 h-3" />
              <span className="text-[9px] font-mono uppercase tracking-wider">Free 500+</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <Leaf className="w-3 h-3" />
              <span className="text-[9px] font-mono uppercase tracking-wider">Eco</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
