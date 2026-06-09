"use client";

import { Product } from "@/data/products";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
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
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RefreshCcw,
  CheckCircle,
  ChevronRight,
  Heart,
  Cpu,
  MemoryStick,
  HardDrive,
  Monitor,
  Award,
  Package,
} from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const gradeColors: Record<string, string> = {
  "A+": "bg-emerald-500 text-white",
  A: "bg-sky-500 text-white",
  "B+": "bg-amber-500 text-white",
  B: "bg-red-500 text-white",
};

const gradeLabels: Record<string, string> = {
  "A+": "Excellent — Like new",
  A: "Very Good — Minimal wear",
  "B+": "Good — Light wear",
  B: "Fair — Visible wear",
};

export function MobileProductPage({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const savings = product.originalPrice - product.refurbishedPrice;

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
              <BreadcrumbLink href="/shop" className="text-slate-500 hover:text-sky-600 text-[11px]">
                Shop
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3 h-3 text-slate-300" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[11px] text-gray-900 font-semibold">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Image */}
      <div className="relative bg-white mx-4 rounded-xl border border-slate-100 overflow-hidden">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <Badge className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border-0">
            -{product.discount}%
          </Badge>
          {product.isHotDeal && (
            <Badge className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border-0">
              🔥 HOT
            </Badge>
          )}
          {product.isNew && (
            <Badge className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border-0">
              ✨ NEW
            </Badge>
          )}
        </div>

        <div className="aspect-[4/3] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-8">
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={225}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="px-4 py-5 space-y-4">
        {/* Brand & Category */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-sky-500 font-semibold uppercase tracking-wider">{product.brand}</span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-400">{product.category}</span>
        </div>

        {/* Name */}
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">{product.name}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-3.5 h-3.5 ${
                  star <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-slate-500">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>

        {/* Grade */}
        <div className="flex items-center gap-2">
          <Badge className={`${gradeColors[product.condition]} text-[10px] font-bold px-2 py-0.5 rounded-md border-0`}>
            Grade {product.condition}
          </Badge>
          <span className="text-xs text-slate-500">{gradeLabels[product.condition]}</span>
        </div>

        {/* Price */}
        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-gray-900">${product.refurbishedPrice}</span>
            <span className="text-base text-slate-400 line-through mb-0.5">${product.originalPrice}</span>
            <Badge className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-md border-0 mb-0.5">
              Save ${savings}
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1.5">
            As low as <strong className="text-gray-900">${Math.round(product.refurbishedPrice / 12)}/mo</strong> with EMI
          </p>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5">
          {product.inStock ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">In Stock — Ready to Ship</span>
            </>
          ) : (
            <>
              <Package className="w-3.5 h-3.5 text-red-400" />
              <span className="text-xs font-medium text-red-500">Out of Stock</span>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={`flex-1 h-11 font-semibold text-sm rounded-xl ${
              added
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : product.inStock
                ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            } transition-all`}
          >
            {added ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add to Cart
              </>
            )}
          </Button>
          <Button variant="outline" className="h-11 px-3 rounded-xl border-slate-200 btn-outline-highlight">
            <Heart className="w-4 h-4" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center gap-1 bg-sky-50 rounded-xl px-2 py-2.5">
            <ShieldCheck className="w-4 h-4 text-sky-500" />
            <span className="text-[10px] font-semibold text-gray-900">{product.warranty}</span>
            <span className="text-[9px] text-slate-500">Warranty</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-emerald-50 rounded-xl px-2 py-2.5">
            <Truck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-semibold text-gray-900">Free</span>
            <span className="text-[9px] text-slate-500">Shipping</span>
          </div>
          <div className="flex flex-col items-center gap-1 bg-amber-50 rounded-xl px-2 py-2.5">
            <RefreshCcw className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-semibold text-gray-900">30-Day</span>
            <span className="text-[9px] text-slate-500">Returns</span>
          </div>
        </div>

        {/* Description */}
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{product.description}</p>
        </div>

        {/* Specifications */}
        <div className="pt-2">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Specifications</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
              <Cpu className="w-4 h-4 text-sky-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Processor</div>
                <div className="text-xs font-semibold text-gray-900">{product.processor}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
              <MemoryStick className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Memory</div>
                <div className="text-xs font-semibold text-gray-900">{product.ram}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
              <HardDrive className="w-4 h-4 text-amber-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Storage</div>
                <div className="text-xs font-semibold text-gray-900">{product.storage}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
              <Monitor className="w-4 h-4 text-violet-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Display</div>
                <div className="text-xs font-semibold text-gray-900">{product.display}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 py-2.5">
              <Award className="w-4 h-4 text-emerald-500 shrink-0" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Condition</div>
                <div className="text-xs font-semibold text-gray-900">Grade {product.condition}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-white py-8">
          <div className="px-4 flex justify-between items-end mb-4">
            <div>
              <span className="text-[10px] text-sky-500 font-semibold uppercase tracking-wider block mb-1">
                You May Also Like
              </span>
              <h2 className="text-lg font-bold text-gray-900">Related</h2>
            </div>
            <Link
              href="/shop"
              className="text-sky-500 text-xs font-medium hover:text-sky-600 transition-colors btn-nav-highlight px-2 py-1 rounded-md"
            >
              View All
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
            {related.map((p) => (
              <Link key={p.id} href={`/product/${p.id}`} className="min-w-[200px] max-w-[200px] snap-start group">
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-b from-slate-50 to-white flex items-center justify-center p-4">
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={160}
                      height={120}
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider">{p.brand}</span>
                    <h3 className="text-xs font-semibold text-gray-900 mt-0.5 group-hover:text-sky-600 transition-colors line-clamp-1">
                      {p.name}
                    </h3>
                    <div className="flex items-end gap-1.5 mt-1.5">
                      <span className="text-sm font-bold text-gray-900">${p.refurbishedPrice}</span>
                      <span className="text-[10px] text-slate-400 line-through">${p.originalPrice}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Sticky Add to Cart Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:hidden">
        <div className="px-4 py-3 flex items-center justify-between gap-3">
          <div>
            <span className="text-lg font-bold text-gray-900">${product.refurbishedPrice}</span>
            <span className="text-xs text-slate-400 line-through ml-1">${product.originalPrice}</span>
          </div>
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={`h-10 px-6 font-semibold text-sm rounded-xl ${
              added
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : product.inStock
                ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            } transition-all`}
          >
            {added ? (
              <>
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Added!
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-1.5" />
                Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
