"use client";

import Link from "next/link";
import {
  Package,
  ClipboardCheck,
  AlertTriangle,
  MessageSquare,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Truck,
  RefreshCw,
  Warehouse,
  ArrowUpRight,
  ArrowDownRight,
  CircleDot,
  CircleCheck,
  CircleX,
  Timer,
  Wrench,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const kpiRow = [
  { label: "Orders Today", value: "12", change: "+3", up: true, icon: Package, color: "text-sky-500", bg: "bg-sky-50" },
  { label: "QC Pending", value: "8", change: "+2", up: false, icon: ClipboardCheck, color: "text-amber-600", bg: "bg-amber-50" },
  { label: "Low Stock", value: "3", change: "-1", up: true, icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
  { label: "Queries", value: "5", change: "+2", up: false, icon: MessageSquare, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Shipped", value: "9", change: "+4", up: true, icon: Truck, color: "text-emerald-600", bg: "bg-emerald-50" },
  { label: "Refurb Done", value: "6", change: "+1", up: true, icon: RefreshCw, color: "text-sky-500", bg: "bg-sky-50" },
];

const taskQueue = [
  { id: "QC-042", product: "ThinkPad X1 Carbon", task: "Quality Check", priority: "High", status: "pending", icon: ClipboardCheck, iconColor: "text-amber-500" },
  { id: "QC-041", product: "MacBook Pro 14\"", task: "Quality Check", priority: "Medium", status: "in-progress", icon: Timer, iconColor: "text-sky-500" },
  { id: "REF-018", product: "HP EliteBook 840 G8", task: "Refurbishment", priority: "High", status: "in-progress", icon: Wrench, iconColor: "text-violet-500" },
  { id: "SHP-027", product: "Dell Latitude 5520", task: "Ship Order", priority: "Low", status: "pending", icon: Truck, iconColor: "text-emerald-500" },
  { id: "QC-040", product: "ASUS ZenBook 14", task: "Quality Check", priority: "Low", status: "completed", icon: CheckCircle2, iconColor: "text-emerald-500" },
];

const priorityColor: Record<string, string> = {
  High: "text-red-600 bg-red-50",
  Medium: "text-amber-600 bg-amber-50",
  Low: "text-slate-500 bg-slate-50",
};

const statusStyle: Record<string, string> = {
  pending: "text-amber-700 bg-amber-50",
  "in-progress": "text-sky-700 bg-sky-50",
  completed: "text-emerald-700 bg-emerald-50",
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  "in-progress": "In Progress",
  completed: "Done",
};

const recentActivity = [
  { id: 1, action: "Quality check completed", detail: "ThinkPad X1 Carbon — Grade A", time: "10m", icon: CheckCircle2, iconColor: "text-emerald-500" },
  { id: 2, action: "New order received", detail: "ORD-006 — MacBook Pro 14\"", time: "25m", icon: Package, iconColor: "text-sky-500" },
  { id: 3, action: "Stock alert triggered", detail: "Dell Latitude 5520 — 2 units left", time: "1h", icon: AlertTriangle, iconColor: "text-amber-500" },
  { id: 4, action: "Order shipped", detail: "ORD-003 — Dell Latitude 5520", time: "2h", icon: Truck, iconColor: "text-sky-500" },
  { id: 5, action: "Refurbishment completed", detail: "HP EliteBook 840 G8 — Ready", time: "3h", icon: RefreshCw, iconColor: "text-violet-500" },
  { id: 6, action: "Query resolved", detail: "Ticket #1024 — Warranty Q", time: "4h", icon: CheckCircle2, iconColor: "text-emerald-500" },
];

const inventoryAlerts = [
  { product: "MacBook Pro 14\"", stock: 2, threshold: 5, severity: "critical" },
  { product: "HP EliteBook 840 G8", stock: 3, threshold: 5, severity: "critical" },
  { product: "ThinkPad X1 Carbon", stock: 4, threshold: 5, severity: "warning" },
  { product: "MacBook Air M1", stock: 5, threshold: 5, severity: "warning" },
];

export function StaffDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "Sarah Miller";

  return (
    <div className="p-3 space-y-3">
      {/* Page header — compact */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-gray-900 tracking-tight">
            Hello, <span className="text-sky-500">{displayName.split(" ")[0]}</span>
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5">Shift overview for today</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/dashboard/staff#orders">
            <Button size="sm" className="h-7 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1 rounded">
              <Package className="w-3 h-3" /> Orders
            </Button>
          </Link>
          <Link href="/dashboard/staff#quality">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <ClipboardCheck className="w-3 h-3" /> QC
            </Button>
          </Link>
          <Link href="/dashboard/staff#inventory">
            <Button size="sm" variant="outline" className="h-7 text-[11px] border-slate-200 gap-1 rounded hover:border-sky-400 hover:text-sky-600">
              <Warehouse className="w-3 h-3" /> Inventory
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

      {/* Main grid: Task Queue + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Task Queue */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Task Queue</CardTitle>
              <span className="text-[10px] text-slate-400 font-mono">{taskQueue.filter(t => t.status !== "completed").length} pending</span>
            </div>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {taskQueue.map((task, index) => (
                <div
                  key={task.id}
                  className={`flex items-center gap-2 py-1.5 ${index < taskQueue.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="bg-slate-50 p-1 rounded shrink-0">
                    <task.icon className={`w-3 h-3 ${task.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[11px] font-medium text-gray-900">{task.id}</span>
                      <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 ${priorityColor[task.priority] || ""}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 truncate">{task.product} · {task.task}</p>
                  </div>
                  <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 shrink-0 ${statusStyle[task.status] || ""}`}>
                    {statusLabel[task.status]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Recent Activity</CardTitle>
              <Link href="/dashboard/staff#orders" className="text-[10px] text-sky-500 hover:text-sky-700">View all</Link>
            </div>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-2 py-1.5 ${index < recentActivity.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="bg-slate-50 p-1 rounded shrink-0 mt-0.5">
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

      {/* Bottom row: Inventory Alerts + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Inventory Alerts */}
        <Card className="lg:col-span-2 bg-white border border-slate-200 rounded shadow-none">
          <CardHeader className="p-2.5 pb-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Inventory Alerts</CardTitle>
              <Link href="/dashboard/staff#inventory" className="text-[10px] text-sky-500 hover:text-sky-700">Manage</Link>
            </div>
          </CardHeader>
          <CardContent className="p-2.5 pt-1">
            <div className="space-y-0">
              {inventoryAlerts.map((item, index) => (
                <div
                  key={item.product}
                  className={`flex items-center justify-between py-1.5 ${index < inventoryAlerts.length - 1 ? "border-b border-slate-50" : ""}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${item.severity === "critical" ? "bg-red-500" : "bg-amber-500"}`} />
                    <p className="text-[11px] font-medium text-gray-800 truncate">{item.product}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] font-mono font-semibold text-gray-900">{item.stock}</span>
                      <span className="text-[9px] text-slate-400">/{item.threshold}</span>
                    </div>
                    <span className={`text-[9px] font-semibold rounded px-1.5 py-0.5 ${item.severity === "critical" ? "text-red-700 bg-red-50" : "text-amber-700 bg-amber-50"}`}>
                      {item.severity === "critical" ? "Critical" : "Warning"}
                    </span>
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
            <Link href="/dashboard/staff#orders" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-600 transition-colors border border-slate-100 hover:border-sky-200">
              <Package className="w-3.5 h-3.5 text-sky-500" /> Process Orders <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/staff#quality" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors border border-slate-100 hover:border-amber-200">
              <ClipboardCheck className="w-3.5 h-3.5 text-amber-500" /> Start QC <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/staff#inventory" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors border border-slate-100 hover:border-emerald-200">
              <Warehouse className="w-3.5 h-3.5 text-emerald-500" /> Update Stock <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
            <Link href="/dashboard/staff#queries" className="flex items-center gap-2 px-2.5 py-2 rounded text-[11px] font-medium text-slate-600 hover:bg-violet-50 hover:text-violet-600 transition-colors border border-slate-100 hover:border-violet-200">
              <MessageSquare className="w-3.5 h-3.5 text-violet-500" /> Customer Queries <ChevronRight className="w-3 h-3 ml-auto" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
