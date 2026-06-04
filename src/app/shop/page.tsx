"use client";

import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { DesktopShop } from "@/components/shop/desktop-shop";
import { MobileShop } from "@/components/shop/mobile-shop";
import { Footer } from "@/components/layout/footer";

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DesktopHeader />
      <MobileHeader />
      <main className="flex-1">
        <DesktopShop />
        <MobileShop />
      </main>
      <Footer />
    </div>
  );
}
