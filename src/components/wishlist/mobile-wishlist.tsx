"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ShieldCheck,
  Star,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

export function MobileWishlist() {
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
      <div className="lg:hidden flex-1 flex items-center justify-center bg-white">
        <div className="text-center max-w-xs mx-auto px-4 py-16">
          <div className="w-16 h-16 rounded-xl bg-rose-50 flex items-center justify-center mx-auto mb-5">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Wishlist is Empty</h2>
          <p className="text-sm text-slate-500 mb-6 leading-relaxed">
            Tap the heart icon on any laptop to save it here.
          </p>
          <Link href="/shop">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold tracking-wide rounded-xl px-6 h-10 btn-primary-highlight">
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
    <div className="lg:hidden">
      {/* Breadcrumb */}
      <div className="px-4 pt-3 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-slate-500 hover:text-sky-600 text-[11px]">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3 h-3 text-slate-300" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[11px] text-gray-900 font-semibold">
                Wishlist
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-4 py-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-5">
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">My Wishlist</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              {items.length} {items.length === 1 ? "item" : "items"} · Save ${totalSavings} vs new
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="rounded-xl border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-[10px] h-8 px-3"
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Clear
          </Button>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-3">
          {items.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="flex gap-3 p-3">
                {/* Image */}
                <Link href={`/product/${product.id}`} className="shrink-0">
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-2">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={80}
                      height={60}
                      className="object-contain"
                    />
                  </div>
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{product.brand}</span>
                        <Badge className={`${gradeColors[product.condition]} text-[9px] font-bold px-1.5 py-0 rounded-md border-0`}>
                          {product.condition}
                        </Badge>
                      </div>
                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-sm font-semibold text-gray-900 leading-snug mt-0.5 line-clamp-2 hover:text-sky-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleRemove(product.id, product.name)}
                      className="shrink-0 p-1 text-rose-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label={`Remove ${product.name}`}
                    >
                      <Heart className="w-4 h-4 fill-rose-500" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="flex items-end gap-1.5 mt-1.5">
                    <span className="text-base font-bold text-gray-900">${product.refurbishedPrice}</span>
                    <span className="text-xs text-slate-400 line-through">${product.originalPrice}</span>
                    <Badge className="bg-red-500 text-white text-[8px] font-bold px-1 py-0 rounded border-0">
                      -{product.discount}%
                    </Badge>
                  </div>

                  {/* Warranty */}
                  <div className="flex items-center gap-1 mt-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span className="text-[10px] text-emerald-600">{product.warranty} Warranty</span>
                  </div>

                  {/* Move to Cart */}
                  <Button
                    onClick={() => handleMoveToCart(product)}
                    disabled={!product.inStock || movingToCart === product.id}
                    className={`w-full mt-2 font-semibold text-[11px] rounded-xl h-8 transition-all ${
                      movingToCart === product.id
                        ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                        : product.inStock
                        ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {movingToCart === product.id ? (
                      <>
                        <ShieldCheck className="w-3 h-3 mr-1" />
                        Moved!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        {product.inStock ? "Move to Cart" : "Out of Stock"}
                      </>
                    )}
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
