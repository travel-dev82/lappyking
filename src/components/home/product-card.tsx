"use client";

import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ShieldCheck, Flame, Sparkles, CheckCircle } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "hot" | "new" | "top";
  onAddToCart?: () => void;
}

const gradeColors: Record<string, string> = {
  "A+": "bg-emerald-500 text-white",
  A: "bg-sky-500 text-white",
  "B+": "bg-amber-500 text-white",
  B: "bg-red-500 text-white",
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-3 h-3 ${
            star <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
      <span className="text-[10px] text-slate-400 ml-1">
        ({rating.toFixed(1)}) {reviewCount > 0 && `· ${reviewCount}`}
      </span>
    </div>
  );
}

export function ProductCard({ product, variant = "default", onAddToCart }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { toast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    toast({
      title: "Added to Cart!",
      description: `${product.name} has been added to your cart.`,
    });
    setTimeout(() => setAdded(false), 2000);
    onAddToCart?.();
  };

  return (
    <div className="group relative bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden product-card-hover">
      {/* Badges row */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {/* Discount badge */}
        <Badge className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border-0">
          -{product.discount}%
        </Badge>
        {/* Hot deal badge */}
        {variant === "hot" && (
          <Badge className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border-0 flex items-center gap-1">
            <Flame className="w-2.5 h-2.5" />
            HOT DEAL
          </Badge>
        )}
        {/* New arrival badge */}
        {variant === "new" && (
          <Badge className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border-0 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            NEW
          </Badge>
        )}
      </div>

      {/* Product image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-50 to-white overflow-hidden flex items-center justify-center p-6">
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={210}
            className="object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Brand & Grade */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            {product.brand}
          </span>
          <Badge
            className={`${gradeColors[product.condition]} text-[10px] font-bold px-2 py-0.5 rounded-md border-0`}
          >
            Grade {product.condition}
          </Badge>
        </div>

        {/* Product name */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Key specs */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>{product.processor.split(" ").slice(0, 3).join(" ")}</span>
          <span className="text-slate-300">|</span>
          <span>{product.ram}</span>
        </div>

        {/* Rating stars */}
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />

        {/* Price */}
        <div className="flex items-end gap-2 pt-1">
          <span className="text-lg font-bold text-gray-900">
            ${product.refurbishedPrice}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ${product.originalPrice}
          </span>
        </div>

        {/* Warranty badge */}
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="text-[10px] text-emerald-600">
            {product.warranty} Warranty
          </span>
        </div>

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock || added}
          className={`w-full font-semibold text-xs rounded-xl h-9 transition-all ${
            added
              ? "bg-emerald-500 hover:bg-emerald-500 text-white"
              : product.inStock
              ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
          }`}
        >
          {added ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 mr-2" />
              Added to Cart!
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5 mr-2" />
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
