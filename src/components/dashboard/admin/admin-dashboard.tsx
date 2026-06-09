"use client";

import Link from "next/link";
import {
  DollarSign,
  Package,
  Users,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Settings,
  Clock,
  UserPlus,
  ShoppingCart,
  AlertCircle,
  CheckCircle2,
  UserCog,
  Box,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { dummyAnalytics, dummyOrderData } from "@/data/users";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DashboardForms } from "@/components/dashboard/forms/dashboard-forms";

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#0ea5e9",
  },
} satisfies ChartConfig;

const kpiRow = [
  { label: "Revenue", value: "$124,580", change: "+12.5%", up: true, icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Orders", value: "342", change: "+8.2%", up: true, icon: Package, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "Customers", value: "189", change: "+15.3%", up: true, icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Avg. Value", value: "$364", change: "+3.1%", up: true, icon: TrendingUp, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Returns", value: "7", change: "-2.1%", up: false, icon: ArrowDownRight, color: "text-red-500", bg: "bg-red-50" },
  { label: "Fulfillment", value: "96.4%", change: "+1.2%", up: true, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const activityFeed = [
  { id: 1, action: "New customer registered", detail: "Emma Wilson — Premium tier", time: "5m", icon: UserPlus, iconColor: "text-sky-500" },
  { id: 2, action: "Large order placed", detail: "ORD-345 — 12 units — Corporate", time: "15m", icon: ShoppingCart, iconColor: "text-emerald-500" },
  { id: 3, action: "System alert resolved", detail: "Payment gateway timeout fixed", time: "30m", icon: CheckCircle2, iconColor: "text-emerald-500" },
  { id: 4, action: "Staff account created", detail: "James Lee — QC Technician", time: "1h", icon: ShieldCheck, iconColor: "text-violet-500" },
  { id: 5, action: "Low stock warning", detail: "5 products below threshold", time: "2h", icon: AlertCircle, iconColor: "text-amber-500" },
  { id: 6, action: "Refurb batch complete", detail: "8 units ready for listing", time: "3h", icon: Activity, iconColor: "text-sky-500" },
];

const statusColorMap: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  "In Transit": "bg-sky-50 text-sky-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-700",
};

const topProducts = [
  { name: "ThinkPad X1 Carbon", sold: 48, revenue: "$35,952", stock: 12 },
  { name: "MacBook Air M1", sold: 41, revenue: "$26,609", stock: 8 },
  { name: "Dell Latitude 5520", sold: 35, revenue: "$19,215", stock: 15 },
  { name: "HP EliteBook 840 G8", sold: 29, revenue: "$20,271", stock: 6 },
  { name: "MacBook Pro 14\"", sold: 24, revenue: "$26,976", stock: 4 },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "David Chen";

  return (
    <div className="p-3 space-y-3">
      {/* Page header — compact */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Welcome, <span className="text-sky-500 font-medium">{displayName}</span>
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/admin#users">
            <Button size="sm" className="h-7 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1 rounded">
              <Users className="w-3 h-3" /> Users
            </Button>
          </Link>
          <Link href="/dashboard/admin#analytics">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <BarChart3 className="w-3 h-3" /> Analytics
            </Button>
          </Link>
          <Link href="/dashboard/admin#settings">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <Settings className="w-3 h-3" /> Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Strip — single row, ultra-compact */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-2">
        {kpiRow.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded px-2.5 py-2 flex items-center gap-2">
            <div className={`${kpi.bg} p-1.5 rounded shrink-0`}>
              <kpi.icon className={`w-3 h-3 ${kpi.color}`} />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 font-mono tracking-tight leading-tight">{kpi.value}</p>
              <div className="flex items-center gap-1">
                <span className="text-[9px] text-slate-400 uppercase">{kpi.label}</span>
                <span className={`text-[9px] font-mono font-semibold flex items-center ${kpi.up ? "text-emerald-600" : "text-red-500"}`}>
                  {kpi.up ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                  {kpi.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main grid: Chart + Activity + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Monthly Revenue</CardTitle>
              <span className="text-[10px] text-slate-400 font-mono">Last 6 months</span>
            </div>
          </CardHeader>
          <CardContent className="p-2.5 pt-0">
            <ChartContainer config={chartConfig} className="h-[180px] w-full">
              <BarChart data={dummyAnalytics.monthlyRevenue} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fontFamily: "monospace", fill: "#94a3b8" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10, fontFamily: "monospace", fill: "#94a3b8" }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  width={36}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Recent Activity</CardTitle>
              <Link href="/dashboard/admin#analytics" className="text-[10px] text-sky-500 hover:text-sky-700">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {activityFeed.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-center gap-2 py-1.5 ${index < activityFeed.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="bg-slate-50 p-1 rounded shrink-0">
                    <activity.icon className={`w-3 h-3 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-medium text-gray-800 truncate">{activity.action}</p>
                      <span className="text-[9px] text-slate-400 font-mono ml-2 whitespace-nowrap">{activity.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom grid: Recent Orders Table + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Recent Orders</CardTitle>
              <Link href="/dashboard/admin#analytics" className="text-[10px] text-sky-500 hover:text-sky-700">View all</Link>
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
                  {dummyOrderData.map((order) => (
                    <TableRow key={order.id} className="border-b border-slate-50">
                      <TableCell className="font-mono text-[11px] font-medium text-gray-900 py-1.5 px-3">{order.id}</TableCell>
                      <TableCell className="font-mono text-[11px] text-slate-600 py-1.5 px-3">{order.product}</TableCell>
                      <TableCell className="py-1.5 px-3">
                        <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 ${statusColorMap[order.status] || ""}`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-[11px] text-slate-500 py-1.5 px-3">{order.date}</TableCell>
                      <TableCell className="font-mono text-[11px] font-semibold text-gray-900 py-1.5 px-3 text-right">${order.amount}</TableCell>
                    </TableRow>
                  ))}
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

        {/* Top Products */}
        <Card className="bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className={`flex items-center justify-between py-1.5 ${index < topProducts.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-mono font-semibold text-slate-300 w-4">{index + 1}</span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-medium text-gray-800 truncate">{product.name}</p>
                      <p className="text-[9px] text-slate-400">{product.sold} sold</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[11px] font-mono font-semibold text-gray-900">{product.revenue}</p>
                    <p className={`text-[9px] font-mono ${product.stock <= 5 ? "text-red-500" : "text-slate-400"}`}>
                      {product.stock} in stock
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick module links — compact row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <Link href="/dashboard/admin#users" className="flex items-center gap-2 bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-colors">
          <UserCog className="w-3.5 h-3.5 text-sky-500" /> Staff Management <ArrowRight className="w-3 h-3 ml-auto" />
        </Link>
        <Link href="/dashboard/admin#products" className="flex items-center gap-2 bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-colors">
          <Box className="w-3.5 h-3.5 text-violet-500" /> Product Catalog <ArrowRight className="w-3 h-3 ml-auto" />
        </Link>
        <Link href="/dashboard/admin#analytics" className="flex items-center gap-2 bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-colors">
          <BarChart3 className="w-3.5 h-3.5 text-emerald-500" /> Analytics <ArrowRight className="w-3 h-3 ml-auto" />
        </Link>
        <Link href="/dashboard/admin#settings" className="flex items-center gap-2 bg-white border border-slate-200 rounded px-3 py-2 text-[11px] font-medium text-slate-600 hover:border-sky-300 hover:text-sky-600 hover:bg-sky-50/50 transition-colors">
          <Settings className="w-3.5 h-3.5 text-amber-500" /> System Settings <ArrowRight className="w-3 h-3 ml-auto" />
        </Link>
      </div>

      {/* Data Entry Forms Section */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ClipboardList className="w-3.5 h-3.5 text-slate-400" />
          <h2 className="text-xs font-semibold text-gray-900 tracking-tight uppercase">Data Entry</h2>
        </div>
        <DashboardForms />
      </div>
    </div>
  );
}
