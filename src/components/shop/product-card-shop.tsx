"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Cpu, MemoryStick, HardDrive, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/data/products";
import { useState } from "react";

const conditionColors: Record<string, string> = {
  "A+": "#10B981",
  A: "#0EA5E9",
  "B+": "#F59E0B",
  B: "#EF4444",
};

export function ProductCardShop({ product }: { product: Product }) {
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
  };

  return (
    <Link href={`/product/${product.id}`} className="group block">
      <div className="relative rounded-xl border border-slate-200 bg-white overflow-hidden transition transform hover:-translate-y-1 hover:shadow-md">
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 z-20 bg-black/50 flex items-center justify-center">
            <span className="font-semibold text-white text-lg font-bold tracking-wide uppercase">
              Out of Stock
            </span>
          </div>
        )}

        {/* Image Area */}
        <div className="relative aspect-[4/3] bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
          {/* Condition Grade Badge */}
          <div
            className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-xl text-white text-[11px] font-semibold tracking-wide"
            style={{ backgroundColor: conditionColors[product.condition] }}
          >
            Grade {product.condition}
          </div>

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded-xl bg-[#EF4444] text-white text-[11px] font-semibold tracking-wide">
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
          <p className="text-[11px] font-semibold tracking-wide uppercase text-sky-500 mb-1">
            {product.brand}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors">
            {product.name}
          </h3>

          {/* Key Specs */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-xl">
              <Cpu className="w-3 h-3" />
              {product.processor.split(" ").slice(0, 3).join(" ")}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-xl">
              <MemoryStick className="w-3 h-3" />
              {product.ram.split(" ")[0]}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-50 px-2 py-1 rounded-xl">
              <HardDrive className="w-3 h-3" />
              {product.storage.split(" ")[0]}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-gray-900 font-mono">
              ${product.refurbishedPrice}
            </span>
            <span className="text-sm text-slate-400 line-through font-mono">
              ${product.originalPrice}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            disabled={!product.inStock || added}
            onClick={handleAddToCart}
            className={`w-full rounded-xl font-semibold text-xs tracking-wide h-9 transition-all ${
              added
                ? "bg-emerald-500 hover:bg-emerald-500 text-white"
                : product.inStock
                ? "bg-sky-500 hover:bg-sky-600 text-white btn-primary-highlight"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {added ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                ADDED!
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
                {product.inStock ? "ADD TO CART" : "SOLD OUT"}
              </>
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
