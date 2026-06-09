"use client";

import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Heart,
  Gift,
  ChevronRight,
  ShoppingBag,
  MapPin,
  Headphones,
  ArrowUpRight,
  CreditCard,
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/lib/auth-context";
import { dummyOrderData } from "@/data/users";

const statusColorMap: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  "In Transit": "bg-sky-50 text-sky-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

const statusIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Delivered: CheckCircle2,
  "In Transit": Truck,
  Processing: Clock,
  Cancelled: XCircle,
};

const kpiRow = [
  { label: "Total Orders", value: "5", icon: Package, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Active", value: "2", icon: ShoppingCart, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Wishlist", value: "3", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Points", value: "1,250", icon: Gift, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Saved", value: "$847", icon: CreditCard, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Warranty", value: "3 Active", icon: ShieldCheck, color: "text-violet-600", bg: "bg-violet-50" },
];

const orderTimeline = [
  { id: "ORD-002", event: "Shipped from warehouse", time: "2 hours ago", icon: Truck, color: "text-sky-500" },
  { id: "ORD-003", event: "Quality check passed", time: "5 hours ago", icon: CheckCircle2, color: "text-emerald-500" },
  { id: "ORD-002", event: "Order confirmed", time: "1 day ago", icon: Package, color: "text-sky-500" },
  { id: "ORD-001", event: "Delivered", time: "3 days ago", icon: CheckCircle2, color: "text-emerald-500" },
];

export function CustomerDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "Alex Johnson";

  return (
    <div className="p-3 space-y-3">
      {/* Page header — compact */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            Welcome, <span className="text-sky-500">{displayName.split(" ")[0]}</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Here&apos;s your account overview</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/shop">
            <Button size="sm" className="h-7 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1 rounded">
              <ShoppingBag className="w-3 h-3" /> Shop
            </Button>
          </Link>
          <Link href="/dashboard/customer#orders">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <MapPin className="w-3 h-3" /> Track
            </Button>
          </Link>
          <Link href="/dashboard/customer#support">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <Headphones className="w-3 h-3" /> Support
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {kpiRow.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded px-2.5 py-2 flex items-center gap-2">
            <div className={`${kpi.bg} p-1.5 rounded shrink-0`}>
              <kpi.icon className={`w-3 h-3 ${kpi.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 font-mono tracking-tight leading-tight">{kpi.value}</p>
              <span className="text-[9px] text-slate-400 uppercase">{kpi.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid: Orders Table + Order Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Orders Table */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Recent Orders</CardTitle>
              <Link href="/dashboard/customer#orders" className="text-[10px] text-sky-500 hover:text-sky-700">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Desktop Table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 hover:bg-transparent">
                    <TableHead className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold py-1.5 px-3">Order</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold py-1.5 px-3">Product</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold py-1.5 px-3">Status</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold py-1.5 px-3">Date</TableHead>
                    <TableHead className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold py-1.5 px-3 text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dummyOrderData.map((order) => {
                    const StatusIcon = statusIconMap[order.status];
                    return (
                      <TableRow key={order.id} className="border-b border-slate-50">
                        <TableCell className="font-mono text-[11px] font-medium text-gray-900 py-1.5 px-3">{order.id}</TableCell>
                        <TableCell className="font-mono text-[11px] text-slate-600 py-1.5 px-3">{order.product}</TableCell>
                        <TableCell className="py-1.5 px-3">
                          <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 inline-flex items-center gap-1 ${statusColorMap[order.status] || ""}`}>
                            {StatusIcon && <StatusIcon className="w-2.5 h-2.5" />}
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell className="font-mono text-[11px] text-slate-500 py-1.5 px-3">{order.date}</TableCell>
                        <TableCell className="font-mono text-[11px] font-semibold text-gray-900 py-1.5 px-3 text-right">${order.amount}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            {/* Mobile */}
            <div className="md:hidden space-y-1 p-2.5">
              {dummyOrderData.map((order) => (
                <div key={order.id} className="border border-slate-100 rounded p-2 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-medium text-gray-900">{order.id}</span>
                      <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 ${statusColorMap[order.status] || ""}`}>{order.status}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{order.product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-[11px] font-semibold text-gray-900">${order.amount}</p>
                    <p className="text-[9px] text-slate-400">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card className="bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Order Timeline</CardTitle>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {orderTimeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2 py-1.5 ${index < orderTimeline.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="bg-slate-50 p-1 rounded shrink-0 mt-0.5">
                    <item.icon className={`w-3 h-3 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-gray-800 truncate">{item.event}</p>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-[9px] font-mono text-sky-500">{item.id}</span>
                      <span className="text-[9px] text-slate-400">{item.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: Active Warranty + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Active Warranties */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Active Warranties</CardTitle>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {[
                { product: "ThinkPad X1 Carbon Gen 9", order: "ORD-001", type: "Extended 2-Year", expires: "Dec 2026", status: "Active" },
                { product: "HP EliteBook 840 G8", order: "ORD-004", type: "Standard 1-Year", expires: "Nov 2025", status: "Active" },
                { product: "MacBook Air M1", order: "ORD-002", type: "Premium 3-Year", expires: "Jan 2028", status: "Active" },
              ].map((w, index) => (
                <div
                  key={w.order}
                  className={`flex items-center justify-between py-1.5 ${index < 2 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-gray-800 truncate">{w.product}</p>
                      <p className="text-[9px] text-slate-400">{w.type} · {w.order}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] font-semibold rounded px-1.5 py-0.5 bg-emerald-50 text-emerald-700">{w.status}</span>
                    <p className="text-[9px] text-slate-400 mt-0.5">Exp: {w.expires}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="p-2.5 pt-1 space-y-1.5">
            <Link href="/shop" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors border border-slate-100 hover:border-sky-200">
              <ShoppingBag className="w-3.5 h-3.5 text-sky-500" /> Shop New Arrivals <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/customer#wishlist" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors border border-slate-100 hover:border-rose-200">
              <Heart className="w-3.5 h-3.5 text-rose-500" /> View Wishlist <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/customer#orders" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-slate-100 hover:border-emerald-200">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-500" /> Return / Exchange <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/customer#support" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-600 transition-colors border border-slate-100 hover:border-violet-200">
              <Headphones className="w-3.5 h-3.5 text-violet-500" /> Contact Support <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
