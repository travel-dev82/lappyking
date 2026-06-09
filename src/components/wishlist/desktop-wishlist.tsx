"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ChevronRight,
  ShieldCheck,
  Star,
  ShoppingBag,
} from "lucide-react";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const gradeColors: Record<string, string> = {
  "A+": "bg-emerald-500 text-white",
  A: "bg-sky-500 text-white",
  "B+": "bg-amber-500 text-white",
  B: "bg-red-500 text-white",
};

export function DesktopWishlist() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);
  const clearWishlist = useWishlistStore((s) => s.clearWishlist);
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [movingToCart, setMovingToCart] = useState<string | null>(null);

  const handleRemove = (productId: string, productName: string) => {
    removeItem(productId);
    toast({
      title: "Removed from Wishlist",
      description: `${productName} has been removed from your wishlist.`,
    });
  };

  const handleMoveToCart = (product: (typeof items)[0]) => {
    setMovingToCart(product.id);
    addItem(product);
    removeItem(product.id);
    toast({
      title: "Moved to Cart!",
      description: `${product.name} has been moved to your cart.`,
    });
    setTimeout(() => setMovingToCart(null), 1000);
  };

  const handleClearAll = () => {
    clearWishlist();
    toast({
      title: "Wishlist Cleared",
      description: "All items have been removed from your wishlist.",
    });
  };

  // Empty state
  if (items.length === 0) {
    return (
      <div className="hidden lg:flex flex-1 items-center justify-center bg-white">
        <div className="text-center max-w-md mx-auto px-6 py-20">
          <div className="w-20 h-20 rounded-xl bg-rose-50 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-rose-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Browse our collection and tap the heart icon on any laptop to save it here for later.
          </p>
          <Link href="/shop">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold tracking-wide rounded-xl px-8 h-11 btn-primary-highlight">
              <ShoppingBag className="w-4 h-4 mr-2" />
              Explore Laptops
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalSavings = items.reduce(
    (sum, p) => sum + (p.originalPrice - p.refurbishedPrice),
    0
  );

  return (
    <div className="hidden lg:block">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-slate-500 hover:text-sky-600 text-xs">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs text-gray-900 font-semibold">
                Wishlist
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
            <p className="text-sm text-slate-500 mt-1">
              {items.length} {items.length === 1 ? "item" : "items"} saved · You could save{" "}
              <span className="text-emerald-600 font-semibold">${totalSavings}</span> vs buying new
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="rounded-xl border-slate-200 text-slate-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 btn-outline-highlight text-xs"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            Clear All
          </Button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-3 gap-6">
          {items.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={240}
                    height={180}
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Discount badge */}
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border-0">
                    -{product.discount}%
                  </Badge>
                </div>
              </Link>

              {/* Content */}
              <div className="p-5 space-y-3">
                {/* Brand & Grade */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 uppercase tracking-wider">{product.brand}</span>
                  <Badge className={`${gradeColors[product.condition]} text-[10px] font-bold px-2 py-0.5 rounded-md border-0`}>
                    Grade {product.condition}
                  </Badge>
                </div>

                {/* Name */}
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Key specs */}
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{product.processor.split(" ").slice(0, 3).join(" ")}</span>
                  <span className="text-slate-300">|</span>
                  <span>{product.ram}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-3 h-3 ${
                        star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                  <span className="text-[10px] text-slate-400 ml-1">({product.rating.toFixed(1)})</span>
                </div>

                {/* Price */}
                <div className="flex items-end gap-2 pt-1">
                  <span className="text-xl font-bold text-gray-900">${product.refurbishedPrice}</span>
                  <span className="text-sm text-slate-400 line-through">${product.originalPrice}</span>
                </div>

                {/* Warranty */}
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[10px] text-emerald-600">{product.warranty} Warranty</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.inStock || movingToCart === product.id}
                    className={`flex-1 font-semibold text-xs rounded-xl h-9 transition-all ${
                      movingToCart === product.id
                        ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                        : product.inStock
                        ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {movingToCart === product.id ? (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                        Moved!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                        {product.inStock ? "Move to Cart" : "Out of Stock"}
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleRemove(product.id, product.name)}
                    className="h-9 px-3 rounded-xl border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 btn-outline-highlight"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
