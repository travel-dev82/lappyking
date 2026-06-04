"use client";

import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { DesktopCart } from "@/components/cart/desktop-cart";
import { MobileCart } from "@/components/cart/mobile-cart";

export default function CartPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Desktop Header */}
      <DesktopHeader />

      {/* Mobile Header */}
      <MobileHeader />

      {/* Desktop Cart */}
      <div className="hidden lg:block">
        <DesktopCart />
      </div>

      {/* Mobile Cart */}
      <div className="lg:hidden">
        <MobileCart />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
