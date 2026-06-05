"use client";

import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const gradeColors: Record<string, string> = {
  "A+": "bg-emerald-500 text-white",
  A: "bg-sky-500 text-white",
  "B+": "bg-amber-500 text-white",
  B: "bg-red-500 text-white",
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product);
    onAddToCart?.();
  };

  return (
    <div className="group relative bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden product-card-hover">
      {/* Discount badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg border-0">
          -{product.discount}%
        </Badge>
      </div>

      {/* Product image */}
      <Link href={`/shop`}>
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
        <Link href={`/shop`}>
          <h3 className="text-sm font-semibold text-slate-800 leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Key specs */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="font-mono">{product.processor.split(" ").slice(0, 3).join(" ")}</span>
          <span className="text-slate-300">|</span>
          <span className="font-mono">{product.ram}</span>
        </div>

        {/* Rating stars */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= 4 ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
              }`}
            />
          ))}
          <span className="text-[10px] text-slate-400 ml-1">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 pt-1">
          <span className="text-lg font-bold text-slate-800 font-mono">
            ${product.refurbishedPrice}
          </span>
          <span className="text-sm text-slate-400 line-through font-mono">
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
          className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl h-9 transition-colors disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-2" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}
