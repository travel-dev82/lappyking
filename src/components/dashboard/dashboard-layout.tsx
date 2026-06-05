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
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)",
          }}
        />
        <div className="flex items-center gap-2 px-5 pt-6 pb-2">
          <ChevronDown className="w-4 h-4 text-[#0096D6]" />
          <ChevronRight className="w-3 h-3 text-[#0096D6]/50" />
        </div>
      </div>

      {/* Logo */}
      <div className="px-5 pb-4">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={onClose}
        >
          <Laptop className="w-6 h-6 text-[#0096D6]" />
          <span className="text-xl font-semibold tracking-wider font-mono">
            <span className="text-[#0a0a0a]">Re</span>
            <span className="text-[#0096D6]">Boot</span>
            <span className="text-[#9ca3af] ml-1">Tech</span>
          </span>
        </Link>
      </div>

      <Separator className="bg-gray-100" />

      {/* Role label */}
      <div className="px-5 pt-4 pb-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-[#9ca3af] font-mono font-semibold">
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
              className={`flex items-center gap-3 px-3 py-2.5 text-sm tracking-wider font-medium rounded-sm transition-colors my-0.5 ${
                isActive
                  ? "text-[#0096D6] bg-[#0096D6]/5 border-l-2 border-[#0096D6]"
                  : "text-[#4b5563] hover:text-[#0096D6] hover:bg-[#0096D6]/5 border-l-2 border-transparent"
              }`}
            >
              {IconComponent && <IconComponent className="w-4 h-4" />}
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-gray-100" />

      {/* User info & Logout */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-xs font-mono font-bold shrink-0">
            {currentUser.avatar}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-[#0a0a0a] truncate">{currentUser.name}</div>
            <div className="text-xs text-[#6b7280] truncate">{currentUser.email}</div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-[#6b7280] hover:text-[#0a0a0a] hover:bg-gray-50 gap-2 font-medium text-sm"
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
        <aside className="fixed top-0 left-0 h-screen w-[260px] z-40 border-r border-gray-200 overflow-y-auto">
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
        <header className="sticky top-0 z-50" style={{ background: "rgba(255,255,255,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e5e7eb" }}>
          <div className="relative">
            <div
              className="absolute top-0 left-0 w-full h-[3px]"
              style={{
                background:
                  "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 8px, transparent 8px, transparent 16px)",
              }}
            />
          </div>
          <div className="px-4 h-[56px] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Laptop className="w-5 h-5 text-[#0096D6]" />
              <span className="text-lg font-semibold tracking-wider font-mono">
                <span className="text-[#0a0a0a]">Re</span>
                <span className="text-[#0096D6]">Boot</span>
              </span>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-xs font-mono font-bold">
                {user?.avatar || dummyUsers[role].avatar}
              </div>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#374151] hover:bg-gray-100">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] bg-white border-r border-gray-200 p-0">
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
