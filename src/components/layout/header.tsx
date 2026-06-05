"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, Laptop, LogOut, LayoutDashboard } from "lucide-react";
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
    <header className="hidden lg:block sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Laptop className="w-7 h-7 text-sky-500 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight font-sans">
              <span className="text-slate-800">ReBoot</span>
              <span className="text-slate-400 ml-0.5">Tech</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-sky-500 bg-sky-50"
                      : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right section: Cart + Auth */}
        <div className="flex items-center gap-5">
          <Link
            href="/cart"
            className="relative p-2 text-slate-500 hover:text-sky-500 transition-colors rounded-lg hover:bg-slate-50"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center text-[10px] font-semibold bg-sky-500 text-white border-0 rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard/${user?.role}`}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold font-sans">
                  {user?.avatar}
                </div>
                <span className="text-sm font-medium text-slate-700">{user?.name}</span>
              </Link>
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg text-xs gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                size="sm"
                className="bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm rounded-xl px-5 h-9 shadow-sm shadow-sky-500/20"
              >
                Sign In
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
    <header className="lg:hidden sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Laptop className="w-6 h-6 text-sky-500" />
          <span className="text-lg font-bold tracking-tight font-sans">
            <span className="text-slate-800">ReBoot</span>
            <span className="text-slate-400 ml-0.5">Tech</span>
          </span>
        </Link>

        {/* Cart + Hamburger */}
        <div className="flex items-center gap-1">
          <Link
            href="/cart"
            className="relative p-2 text-slate-500 hover:text-sky-500 transition-colors rounded-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 flex items-center justify-center text-[9px] font-semibold bg-sky-500 text-white border-0 rounded-full">
                {totalItems}
              </Badge>
            )}
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-slate-600 hover:bg-slate-50 rounded-lg">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-white p-0 border-slate-200">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and user menu</SheetDescription>

              <div className="flex flex-col h-full">
                {/* Sheet Logo */}
                <div className="flex items-center gap-2.5 px-6 h-14 border-b border-slate-100">
                  <Laptop className="w-6 h-6 text-sky-500" />
                  <span className="text-lg font-bold tracking-tight font-sans">
                    <span className="text-slate-800">ReBoot</span>
                    <span className="text-slate-400 ml-0.5">Tech</span>
                  </span>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-3">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center px-6 py-3 text-sm font-medium rounded-lg mx-3 transition-colors ${
                          isActive
                            ? "text-sky-500 bg-sky-50"
                            : "text-slate-600 hover:text-sky-500 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Auth Section */}
                <div className="border-t border-slate-100 p-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href={`/dashboard/${user?.role}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-sky-50 transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold font-sans">
                          {user?.avatar}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-800">{user?.name}</div>
                          <div className="text-xs text-slate-400 capitalize">{user?.role}</div>
                        </div>
                      </Link>
                      <Link
                        href={`/dashboard/${user?.role}`}
                        onClick={() => setOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2 rounded-xl text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-sky-500"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button
                        onClick={() => {
                          logout();
                          setOpen(false);
                        }}
                        variant="ghost"
                        className="w-full justify-start gap-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/login" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl shadow-sm shadow-sky-500/20">
                        Sign In
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
