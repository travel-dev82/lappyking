"use client";

import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const gradeColors: Record<string, string> = {
  "A+": "bg-[#10B981] text-white",
  A: "bg-[#0096D6] text-white",
  "B+": "bg-[#F59E0B] text-white",
  B: "bg-[#EF4444] text-white",
};

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product);
    onAddToCart?.();
  };

  return (
    <div className="group relative bg-white border border-gray-200 rounded-sm overflow-hidden product-card-hover">
      {/* Discount badge */}
      <div className="absolute top-3 left-3 z-10">
        <Badge className="bg-[#EF4444] text-white text-[10px] font-mono font-semibold tracking-wider px-2 py-0.5 rounded-sm border-0">
          -{product.discount}%
        </Badge>
      </div>

      {/* Product image */}
      <Link href={`/shop`}>
        <div className="relative aspect-[4/3] bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex items-center justify-center p-6">
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
          <span className="text-[11px] font-mono tracking-wider text-[#a0a0a0] uppercase">
            {product.brand}
          </span>
          <Badge
            className={`${gradeColors[product.condition]} text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-sm border-0`}
          >
            Grade {product.condition}
          </Badge>
        </div>

        {/* Product name */}
        <Link href={`/shop`}>
          <h3 className="text-sm font-semibold text-[#0a0a0a] leading-tight group-hover:text-[#0096D6] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Key specs */}
        <div className="flex items-center gap-2 text-[11px] text-[#666]">
          <span className="font-mono">{product.processor.split(" ").slice(0, 3).join(" ")}</span>
          <span className="text-[#d0d0d0]">|</span>
          <span className="font-mono">{product.ram}</span>
        </div>

        {/* Rating stars placeholder */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3 h-3 ${
                star <= 4 ? "fill-[#F59E0B] text-[#F59E0B]" : "fill-gray-200 text-gray-200"
              }`}
            />
          ))}
          <span className="text-[10px] text-[#a0a0a0] ml-1 font-mono">(4.0)</span>
        </div>

        {/* Price */}
        <div className="flex items-end gap-2 pt-1">
          <span className="text-xl font-bold text-[#0a0a0a] font-mono">
            ${product.refurbishedPrice}
          </span>
          <span className="text-sm text-[#a0a0a0] line-through font-mono">
            ${product.originalPrice}
          </span>
        </div>

        {/* Warranty badge */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] font-mono tracking-wider text-[#10B981]">
            ✦ {product.warranty} WARRANTY
          </span>
        </div>

        {/* Add to cart */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-xs tracking-wider rounded-sm h-9 transition-colors"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-2" />
          {product.inStock ? "ADD TO CART" : "OUT OF STOCK"}
        </Button>
      </div>
    </div>
  );
}
