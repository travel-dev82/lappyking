"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Cpu, MemoryStick, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { Product } from "@/data/products";

const conditionColors: Record<string, string> = {
  "A+": "#10B981",
  A: "#0096D6",
  "B+": "#F59E0B",
  B: "#EF4444",
};

const conditionBgColors: Record<string, string> = {
  "A+": "bg-emerald-500",
  A: "bg-[#0096D6]",
  "B+": "bg-amber-500",
  B: "bg-red-500",
};

export function ProductCardShop({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Link href="#" className="group block">
      <div className="relative rounded-sm border border-gray-200 bg-white overflow-hidden transition transform hover:-translate-y-1 hover:shadow-md">
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
            <span className="font-mono text-white text-lg font-bold tracking-widest uppercase">
              Out of Stock
            </span>
          </div>
        )}

        {/* Image Area */}
        <div className="relative aspect-[4/3] bg-gray-50 border-b border-gray-100 flex items-center justify-center p-4 overflow-hidden">
          {/* Condition Grade Badge */}
          <div
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-sm text-white text-[11px] font-mono font-bold tracking-wider"
            style={{ backgroundColor: conditionColors[product.condition] }}
          >
            Grade {product.condition}
          </div>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-sm bg-[#EF4444] text-white text-[11px] font-mono font-bold tracking-wider">
              -{product.discount}%
            </div>
          )}

          {/* Product Image */}
          <Image
            src={product.image}
            alt={product.name}
            width={220}
            height={165}
            className="object-contain max-h-[140px] w-auto transition-transform group-hover:scale-105"
          />
        </div>

        {/* Content Area */}
        <div className="p-4">
          {/* Brand */}
          <p className="text-[11px] font-mono font-semibold tracking-widest uppercase text-[#0096D6] mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-[#0a0a0a] leading-snug mb-3 line-clamp-2 font-mono">
            {product.name}
          </h3>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-sm">
              <Cpu className="w-3 h-3" />
              {product.processor.split(" ").slice(0, 3).join(" ")}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-sm">
              <MemoryStick className="w-3 h-3" />
              {product.ram.split(" ")[0]}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded-sm">
              <HardDrive className="w-3 h-3" />
              {product.storage.split(" ")[0]}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-[#0a0a0a] font-mono">
              ${product.refurbishedPrice}
            </span>
            <span className="text-sm text-gray-400 line-through font-mono">
              ${product.originalPrice}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            disabled={!product.inStock}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addItem(product);
            }}
            className={`w-full rounded-sm font-mono text-xs tracking-wider font-semibold h-9 ${
              product.inStock
                ? "bg-[#0096D6] hover:bg-[#0078AE] text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {product.inStock ? "ADD TO CART" : "SOLD OUT"}
          </Button>
        </div>
      </div>
    </Link>
  );
}
