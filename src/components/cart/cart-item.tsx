"use client";

import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CartItem } from "@/lib/cart-store";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  compact?: boolean;
}

const conditionColors: Record<string, string> = {
  "A+": "bg-[#10B981] text-white border-0",
  A: "bg-[#0096D6] text-white border-0",
  "B+": "bg-amber-500 text-white border-0",
  B: "bg-orange-500 text-white border-0",
};

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  compact = false,
}: CartItemProps) {
  const { product, quantity } = item;
  const lineTotal = product.refurbishedPrice * quantity;

  return (
    <div className="flex items-start gap-3 sm:gap-4 py-4">
      {/* Product Image */}
      <div className="relative shrink-0 rounded-sm bg-[#f5f5f5] overflow-hidden flex items-center justify-center"
        style={{ width: compact ? 64 : 88, height: compact ? 64 : 88 }}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={compact ? 56 : 76}
          height={compact ? 48 : 66}
          className="object-contain p-1"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className={`font-mono font-semibold leading-tight truncate ${compact ? "text-sm" : "text-base"}`}>
              {product.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-[#666] uppercase tracking-wider">{product.brand}</span>
              <Badge
                className={`text-[10px] px-1.5 py-0 h-4 rounded-sm font-mono ${conditionColors[product.condition] || "bg-gray-400 text-white border-0"}`}
              >
                {product.condition}
              </Badge>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(product.id)}
            className="shrink-0 p-1 text-[#999] hover:text-red-500 transition-colors rounded-sm hover:bg-red-50"
            aria-label={`Remove ${product.name} from cart`}
          >
            <X className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
          </button>
        </div>

        {/* Price and Quantity Row */}
        <div className="flex items-center justify-between mt-2 sm:mt-3 gap-2">
          {/* Price */}
          <div className="flex flex-col">
            <span className={`font-mono font-bold text-[#0a0a0a] ${compact ? "text-sm" : "text-base"}`}>
              ${product.refurbishedPrice.toLocaleString()}
            </span>
            <span className="text-[11px] text-[#999] line-through font-mono">
              ${product.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-0">
            <button
              onClick={() => onUpdateQuantity(product.id, quantity - 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-[#ddd] rounded-sm text-[#555] hover:bg-[#f5f5f5] hover:border-[#0096D6] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 sm:w-10 h-7 sm:h-8 flex items-center justify-center border-y border-[#ddd] font-mono text-sm font-semibold text-[#0a0a0a]">
              {quantity}
            </span>
            <button
              onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center border border-[#ddd] rounded-sm text-[#555] hover:bg-[#f5f5f5] hover:border-[#0096D6] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Line Total */}
          <span className={`font-mono font-bold text-[#0a0a0a] shrink-0 ${compact ? "text-sm" : "text-base"}`}>
            ${lineTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
