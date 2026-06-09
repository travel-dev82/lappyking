"use client";

import { Product } from "@/data/products";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RefreshCcw,
  CheckCircle,
  ChevronRight,
  Heart,
  Share2,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Award,
  Package,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const gradeColors: Record<string, string> = {
  "A+": "bg-emerald-500 text-white",
  A: "bg-sky-500 text-white",
  "B+": "bg-amber-500 text-white",
  B: "bg-red-500 text-white",
};

const gradeLabels: Record<string, string> = {
  "A+": "Excellent — Like new condition",
  A: "Very Good — Minimal wear",
  "B+": "Good — Light cosmetic wear",
  B: "Fair — Visible wear marks",
};

export function DesktopProductPage({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const { toast } = useToast();
  const [added, setAdded] = useState(false);
  const wishlisted = isInWishlist;

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  // Related products (same category, different id)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const savings = product.originalPrice - product.refurbishedPrice;

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    toast({
      title: wishlisted ? "Removed from Wishlist" : "Added to Wishlist!",
      description: wishlisted
        ? `${product.name} has been removed from your wishlist.`
        : `${product.name} has been added to your wishlist.`,
    });
  };

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
              <BreadcrumbLink href="/shop" className="text-slate-500 hover:text-sky-600 text-xs">
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-xs text-gray-900 font-semibold">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 gap-12">
          {/* Left: Product Image */}
          <div>
            <div className="relative bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <Badge className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg border-0">
                  -{product.discount}% OFF
                </Badge>
                {product.isHotDeal && (
                  <Badge className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md border-0">
                    🔥 HOT DEAL
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-md border-0">
                    ✨ NEW
                  </Badge>
                )}
              </div>

              <div className="aspect-square bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-12">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={375}
                  className="object-contain max-h-[400px] w-auto"
                  priority
                />
              </div>
            </div>

            {/* Thumbnail strip (placeholder for same image) */}
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center bg-slate-50 p-2 ${
                    i === 1 ? "border-sky-500" : "border-slate-100 hover:border-slate-300 cursor-pointer"
                  } transition-colors`}
                >
                  <Image
                    src={product.image}
                    alt={`${product.name} view ${i}`}
                    width={60}
                    height={45}
                    className="object-contain opacity-80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-sky-500 font-semibold uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-sm text-slate-400">{product.category}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500">
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Grade Badge */}
            <div className="flex items-center gap-3">
              <Badge className={`${gradeColors[product.condition]} text-xs font-bold px-3 py-1 rounded-lg border-0`}>
                Grade {product.condition}
              </Badge>
              <span className="text-sm text-slate-500">{gradeLabels[product.condition]}</span>
            </div>

            {/* Price Section */}
            <div className="bg-slate-50 rounded-2xl p-6">
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.refurbishedPrice}
                </span>
                <span className="text-lg text-slate-400 line-through mb-1">
                  ${product.originalPrice}
                </span>
                <Badge className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-md border-0 mb-1">
                  Save ${savings}
                </Badge>
              </div>
              <p className="text-sm text-slate-500 mt-2">
                Or as low as <strong className="text-gray-900">${Math.round(product.refurbishedPrice / 12)}/mo</strong> with EMI
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-medium text-emerald-600">In Stock — Ready to Ship</span>
                </>
              ) : (
                <>
                  <Package className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium text-red-500">Out of Stock</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock || added}
                className={`flex-1 h-12 font-semibold text-sm rounded-xl ${
                  added
                    ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                    : product.inStock
                    ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                } transition-all`}
              >
                {added ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={handleToggleWishlist}
                className={`h-12 px-4 rounded-xl border-slate-200 btn-outline-highlight transition-all ${
                  wishlisted ? "border-rose-200 bg-rose-50 text-rose-500 hover:bg-rose-100" : ""
                }`}
              >
                <Heart className={`w-4 h-4 transition-colors ${wishlisted ? "fill-rose-500 text-rose-500" : ""}`} />
              </Button>
              <Button
                variant="outline"
                className="h-12 px-4 rounded-xl border-slate-200 btn-outline-highlight"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 bg-sky-50 rounded-xl px-3 py-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-500 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-900">{product.warranty}</div>
                  <div className="text-[10px] text-slate-500">Warranty</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-3 py-2.5">
                <Truck className="w-5 h-5 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-900">Free</div>
                  <div className="text-[10px] text-slate-500">Shipping</div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-50 rounded-xl px-3 py-2.5">
                <RefreshCcw className="w-5 h-5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-900">30-Day</div>
                  <div className="text-[10px] text-slate-500">Returns</div>
                </div>
              </div>
            </div>

            <Separator className="my-2" />

            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-8">Technical Specifications</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Processor</div>
                  <div className="text-sm font-semibold text-gray-900">{product.processor}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <MemoryStick className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Memory</div>
                  <div className="text-sm font-semibold text-gray-900">{product.ram}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                  <HardDrive className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Storage</div>
                  <div className="text-sm font-semibold text-gray-900">{product.storage}</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-violet-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Display</div>
                  <div className="text-sm font-semibold text-gray-900">{product.display}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <Award className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Condition</div>
                  <div className="text-sm font-semibold text-gray-900">Grade {product.condition} — {gradeLabels[product.condition].split(" — ")[0]}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-sky-500" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Warranty</div>
                  <div className="text-sm font-semibold text-gray-900">{product.warranty} Coverage</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
                  You May Also Like
                </span>
                <h2 className="text-xl font-bold text-gray-900 tracking-tight mt-1">
                  Related Products
                </h2>
              </div>
              <Link
                href="/shop"
                className="text-sm text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1 btn-nav-highlight px-3 py-2 rounded-lg"
              >
                View All
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {related.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`} className="group">
                  <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden product-card-hover">
                    <div className="aspect-[4/3] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-6">
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={200}
                        height={150}
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{p.brand}</span>
                      <h3 className="text-sm font-semibold text-gray-900 mt-1 group-hover:text-sky-600 transition-colors line-clamp-1">
                        {p.name}
                      </h3>
                      <div className="flex items-end gap-2 mt-2">
                        <span className="text-base font-bold text-gray-900">${p.refurbishedPrice}</span>
                        <span className="text-xs text-slate-400 line-through">${p.originalPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
