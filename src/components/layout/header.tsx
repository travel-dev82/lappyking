"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Laptop, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/#about" },
];

export function DesktopHeader() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="hidden lg:block sticky top-0 z-50" style={{ background: "rgba(10,10,10,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)" }} />
      </div>
      <div className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <Laptop className="w-6 h-6 text-[#0096D6]" />
            <span className="text-xl font-semibold tracking-wider font-mono">
              <span className="text-white">Re</span>
              <span className="text-[#0096D6]">Boot</span>
              <span className="text-[#a0a0a0] ml-1">Tech</span>
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm tracking-wider font-medium rounded transition-colors ${
                  pathname === link.href
                    ? "text-[#0096D6] bg-white/5"
                    : "text-[#d0d0d0] hover:text-[#0096D6] hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-[#d0d0d0] hover:text-[#0096D6] transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-[10px] bg-[#0096D6] text-white border-0 rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/${user?.role}`}
                className="flex items-center gap-2 px-3 py-2 rounded text-sm text-[#d0d0d0] hover:text-[#0096D6] transition-colors"
              >
                <div className="w-7 h-7 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-xs font-mono font-bold">
                  {user?.avatar}
                </div>
                <span>{user?.name}</span>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="text-[#a0a0a0] hover:text-white text-xs"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-medium tracking-wider text-xs rounded-sm"
              >
                Sign In
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export function MobileHeader() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.getTotalItems());
  const { isAuthenticated, user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="lg:hidden sticky top-0 z-50" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-[3px]" style={{ background: "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 8px, transparent 8px, transparent 16px)" }} />
      </div>
      <div className="px-4 h-[56px] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Laptop className="w-5 h-5 text-[#0096D6]" />
          <span className="text-lg font-semibold tracking-wider font-mono">
            <span className="text-white">Re</span>
            <span className="text-[#0096D6]">Boot</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link href="/cart" className="relative p-2 text-[#d0d0d0]">
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-[9px] bg-[#0096D6] text-white border-0 rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-[#0a0a0a] border-l border-white/10 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and user menu</SheetDescription>
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between px-4 h-[56px] border-b border-white/10">
                  <span className="text-lg font-semibold tracking-wider font-mono">
                    <span className="text-white">Re</span>
                    <span className="text-[#0096D6]">Boot</span>
                  </span>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => setOpen(false)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>
                <nav className="flex-1 py-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center px-6 py-3 text-sm tracking-wider font-medium transition-colors ${
                        pathname === link.href
                          ? "text-[#0096D6] bg-white/5 border-l-2 border-[#0096D6]"
                          : "text-[#d0d0d0] hover:text-[#0096D6] hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-white/10 p-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href={`/dashboard/${user?.role}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white/5 text-[#d0d0d0] hover:text-[#0096D6]"
                      >
                        <div className="w-8 h-8 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-xs font-mono font-bold">
                          {user?.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{user?.name}</div>
                          <div className="text-xs text-[#a0a0a0]">{user?.role}</div>
                        </div>
                      </Link>
                      <Button
                        onClick={() => { logout(); setOpen(false); }}
                        variant="ghost"
                        className="w-full text-[#a0a0a0] hover:text-white justify-start"
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-medium tracking-wider rounded-sm">
                        Sign In
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
