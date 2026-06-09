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
  Bell,
  Search,
  ChevronRight,
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
      {/* Logo — compact */}
      <div className="px-3 py-2.5 border-b border-slate-100">
        <Link
          href="/"
          className="flex items-center gap-1.5"
          onClick={onClose}
        >
          <Laptop className="w-4 h-4 text-sky-500" />
          <span className="text-sm font-bold tracking-wide">
            <span className="text-gray-900">Re</span>
            <span className="text-sky-500">Boot</span>
            <span className="text-slate-400 ml-0.5">Tech</span>
          </span>
        </Link>
      </div>

      {/* Role label */}
      <div className="px-3 pt-2.5 pb-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
          {role === "customer" ? "My Account" : role === "staff" ? "Staff Portal" : "Administration"}
        </span>
      </div>

      {/* Navigation — ERP compact style */}
      <nav className="flex-1 px-1.5 py-0.5">
        {routes.map((route) => {
          const IconComponent = iconMap[route.icon];
          const isActive = pathname === route.href.split("#")[0];

          return (
            <Link
              key={route.href + route.label}
              href={route.href}
              onClick={onClose}
              className={`flex items-center gap-2 px-2 py-1.5 text-xs font-medium rounded transition-colors my-px ${
                isActive
                  ? "bg-sky-50 text-sky-600 font-semibold"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              {IconComponent && <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-sky-500" : "text-slate-400"}`} />}
              <span>{route.label}</span>
            </Link>
          );
        })}
      </nav>

      <Separator className="bg-slate-100" />

      {/* User info & Logout — compact */}
      <div className="px-2 py-2 space-y-1">
        <div className="flex items-center gap-2 px-1.5 py-1">
          <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center text-white text-[9px] font-bold shrink-0">
            {currentUser.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium text-gray-900 truncate leading-tight">{currentUser.name}</div>
            <div className="text-[9px] text-slate-400 truncate">{currentUser.email}</div>
          </div>
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-slate-400 hover:text-sky-600 hover:bg-sky-50 gap-1.5 font-medium text-[11px] h-7 px-1.5"
        >
          <LogOut className="w-3 h-3" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}

function TopBar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const { user } = useAuth();
  const currentUser = dummyUsers[role];
  const routes = dashboardRoutes[role];

  // Build breadcrumb from current route
  const currentRoute = routes.find(r => pathname === r.href.split("#")[0]);
  const pageName = currentRoute?.label || "Overview";

  return (
    <header className="h-10 border-b border-slate-200 bg-white flex items-center justify-between px-4">
      <div className="flex items-center gap-2 text-xs">
        <Link href="/" className="text-slate-400 hover:text-sky-500 transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-slate-300" />
        <span className="text-slate-700 font-medium">{pageName}</span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-sky-500 hover:bg-sky-50">
          <Search className="w-3.5 h-3.5" />
        </Button>
        <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-sky-500 hover:bg-sky-50 relative">
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-500 rounded-full" />
        </Button>
        <Separator orientation="vertical" className="h-4 mx-1" />
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center text-white text-[9px] font-bold">
            {user?.avatar || currentUser.avatar}
          </div>
          <span className="text-[11px] font-medium text-slate-600 hidden sm:inline">{user?.name || currentUser.name}</span>
        </div>
      </div>
    </header>
  );
}

export function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Layout */}
      <div className="hidden lg:flex">
        {/* Desktop Sidebar — Compact ERP sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-[200px] z-40 border-r border-slate-200 bg-white overflow-y-auto">
          <SidebarContent role={role} />
        </aside>

        {/* Desktop Main Content */}
        <main className="ml-[200px] flex-1 min-h-screen flex flex-col">
          <TopBar role={role} />
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Mobile Top Bar */}
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
          <div className="px-3 h-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-1.5">
              <Laptop className="w-4 h-4 text-sky-500" />
              <span className="text-sm font-bold tracking-wide">
                <span className="text-gray-900">Re</span>
                <span className="text-sky-500">Boot</span>
              </span>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="w-7 h-7 text-slate-400 hover:text-sky-500 hover:bg-sky-50 relative">
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-sky-500 rounded-full" />
              </Button>
              <div className="w-6 h-6 rounded bg-sky-500 flex items-center justify-center text-white text-[9px] font-bold">
                {user?.avatar || dummyUsers[role].avatar}
              </div>
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-7 h-7 text-gray-600 hover:bg-sky-50">
                    <Menu className="w-4 h-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] bg-white border-r border-slate-200 p-0">
                  <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
                  <SheetDescription className="sr-only">Dashboard sidebar menu</SheetDescription>
                  <SidebarContent role={role} onClose={() => setMobileOpen(false)} />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="min-h-[calc(100vh-40px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
