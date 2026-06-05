"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Laptop,
  Menu,
  LogOut,
  LayoutDashboard,
  Package,
  Heart,
  User,
  Headphones,
  Warehouse,
  CheckCircle,
  MessageSquare,
  Users,
  Box,
  BarChart3,
  Settings,
  UserCog,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/lib/auth-context";
import { UserRole, dashboardRoutes, dummyUsers } from "@/data/users";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Package,
  Heart,
  User,
  Headphones,
  Warehouse,
  CheckCircle,
  MessageSquare,
  Users,
  Box,
  BarChart3,
  Settings,
  UserCog,
};

interface DashboardLayoutProps {
  role: UserRole;
  children: React.ReactNode;
}

function SidebarContent({ role, onClose }: { role: UserRole; onClose?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const routes = dashboardRoutes[role];
  const currentUser = dummyUsers[role];

  const handleLogout = () => {
    logout();
    router.push("/");
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chevron decoration at top */}
      <div className="relative">
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0ea5e9 0px, #0ea5e9 12px, transparent 12px, transparent 24px)",
          }}
        />
        <div className="flex items-center gap-2 px-5 pt-6 pb-2">
          <ChevronDown className="w-4 h-4 text-sky-500" />
          <ChevronRight className="w-3 h-3 text-sky-500/50" />
        </div>
      </div>

      {/* Logo */}
      <div className="px-5 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={onClose}
        >
          <Laptop className="w-6 h-6 text-sky-500" />
          <span className="text-xl font-semibold tracking-wide font-semibold">
            <span className="text-gray-900">Re</span>
            <span className="text-sky-500">Boot</span>
            <span className="text-slate-400 ml-1">Tech</span>
          </span>
        </Link>
      </div>

      <Separator className="bg-slate-100" />

      {/* Role label */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
          {role === "customer" ? "My Account" : role === "staff" ? "Staff Portal" : "Administration"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-1">
        {routes.map((route) => {
          const IconComponent = iconMap[route.icon];
          const isActive =
            pathname === route.href.split("#")[0];

          return (
            <Link
              key={route.href + route.label}
              href={route.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 text-sm tracking-wide font-medium rounded-xl transition-colors my-0.5 ${
                isActive
                  ? "btn-nav-highlight-active text-sky-600 bg-sky-50 font-semibold border-l-2 border-sky-500"
                  : "text-slate-600 btn-nav-highlight border-l-2 border-transparent"
              }`}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-slate-100" />

      {/* User info & Logout */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center text-white text-xs font-semibold font-bold shrink-0">
            {currentUser.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{currentUser.name}</div>
            <div className="text-xs text-slate-500 truncate">{currentUser.email}</div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-slate-500 hover:text-sky-700 hover:bg-sky-50 gap-2 font-medium text-sm btn-ghost-highlight"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar - Fixed */}
        <aside className="fixed top-0 left-0 h-screen w-[260px] z-40 border-r border-slate-200 overflow-y-auto">
          <SidebarContent role={role} />
        </aside>

        {/* Desktop Main Content */}
        <main className="ml-[260px] flex-1 min-h-screen">
          {children}
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
          <div className="relative">
            <div
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #0ea5e9 0px, #0ea5e9 8px, transparent 8px, transparent 16px)",
              }}
            />
          </div>
          <div className="px-4 h-[56px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-sky-500" />
              <span className="text-lg font-semibold tracking-wide font-semibold">
                <span className="text-gray-900">Re</span>
                <span className="text-sky-500">Boot</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-xl bg-sky-500 flex items-center justify-center text-white text-xs font-semibold font-bold">
                {user?.avatar || dummyUsers[role].avatar}
              </div>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-gray-700 hover:bg-sky-50 btn-ghost-highlight">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-white border-r border-slate-200 p-0">
                  <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Dashboard sidebar menu</SheetDescription>
                  <SidebarContent role={role} onClose={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="min-h-[calc(100vh-56px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
