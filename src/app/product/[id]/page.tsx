"use client";

import { use } from "react";
import { products } from "@/data/products";
import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { DesktopProductPage } from "@/components/product/desktop-product-page";
import { MobileProductPage } from "@/components/product/mobile-product-page";
import { Footer } from "@/components/layout/footer";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <DesktopHeader />
        <MobileHeader />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-slate-500 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
            <a href="/shop" className="text-sky-500 hover:text-sky-600 font-medium">
              Back to Shop
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DesktopHeader />
      <MobileHeader />
      <main className="flex-1">
        <DesktopProductPage product={product} />
        <MobileProductPage product={product} />
      </main>
      <Footer />
    </div>
  );
}
