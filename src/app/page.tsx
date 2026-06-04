"use client";

import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { DesktopHome } from "@/components/home/desktop-home";
import { MobileHome } from "@/components/home/mobile-home";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <DesktopHeader />
      <MobileHeader />
      <main className="flex-1">
        <DesktopHome />
        <MobileHome />
      </main>
      <Footer />
    </div>
  );
}
