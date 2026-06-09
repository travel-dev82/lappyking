"use client";

import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { DesktopWishlist } from "@/components/wishlist/desktop-wishlist";
import { MobileWishlist } from "@/components/wishlist/mobile-wishlist";
import { Footer } from "@/components/layout/footer";

export default function WishlistPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <DesktopHeader />
      <MobileHeader />
      <main className="flex-1">
        <DesktopWishlist />
        <MobileWishlist />
      </main>
      <Footer />
    </div>
  );
}
