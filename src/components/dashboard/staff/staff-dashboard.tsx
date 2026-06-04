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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

const stats = [
  {
    label: "Orders Today",
    value: "12",
    icon: Package,
    color: "text-[#0096D6]",
    bgColor: "bg-[#0096D6]/10",
  },
  {
    label: "Pending Quality Checks",
    value: "8",
    icon: ClipboardCheck,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    label: "Low Stock Items",
    value: "3",
    icon: AlertTriangle,
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    label: "Customer Queries",
    value: "5",
    icon: MessageSquare,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
];

const recentActivity = [
  {
    id: 1,
    action: "Quality check completed",
    detail: "ThinkPad X1 Carbon — Grade A",
    time: "10 min ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  {
    id: 2,
    action: "New order received",
    detail: "ORD-006 — MacBook Pro 14\"",
    time: "25 min ago",
    icon: Package,
    iconColor: "text-[#0096D6]",
  },
  {
    id: 3,
    action: "Stock alert triggered",
    detail: "Dell Latitude 5520 — 2 units left",
    time: "1 hour ago",
    icon: AlertTriangle,
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    action: "Order shipped",
    detail: "ORD-003 — Dell Latitude 5520",
    time: "2 hours ago",
    icon: Truck,
    iconColor: "text-sky-500",
  },
  {
    id: 5,
    action: "Refurbishment completed",
    detail: "HP EliteBook 840 G8 — Ready for QC",
    time: "3 hours ago",
    icon: RefreshCw,
    iconColor: "text-violet-500",
  },
  {
    id: 6,
    action: "Customer query resolved",
    detail: "Ticket #1024 — Warranty question",
    time: "4 hours ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
];

export function StaffDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "Sarah Miller";

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] font-mono tracking-tight">
          Hello, <span className="text-[#0096D6]">{displayName.split(" ")[0]}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">
          Here&apos;s your shift overview for today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.label}
            className="bg-white border border-gray-200/80 rounded-sm shadow-none hover:shadow-md transition-shadow"
          >
            <CardContent className="p-4 lg:p-5">
              <div className="flex items-start justify-between">
                <div className={`${stat.bgColor} p-2 rounded-sm`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <p className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] font-mono tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 font-mono mt-0.5 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-white border border-gray-200/80 rounded-sm shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold font-mono text-[#0a0a0a] tracking-tight">
              Recent Activity
            </CardTitle>
            <Link
              href="/dashboard/staff#orders"
              className="text-xs text-[#0096D6] hover:underline font-mono flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-0">
            {recentActivity.map((activity, index) => (
              <div
                key={activity.id}
                className={`flex items-start gap-3 py-3 ${
                  index < recentActivity.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <div className="mt-0.5 bg-gray-50 p-1.5 rounded-sm shrink-0">
                  <activity.icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-mono font-medium text-[#0a0a0a] truncate">
                      {activity.action}
                    </p>
                    <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {activity.time}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-gray-500 mt-0.5 truncate">
                    {activity.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold font-mono text-[#0a0a0a] tracking-tight mb-3 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/dashboard/staff#orders">
            <Button
              className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <Package className="w-4 h-4" />
              Process Orders
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
          <Link href="/dashboard/staff#quality">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <ClipboardCheck className="w-4 h-4" />
              Quality Check
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
          <Link href="/dashboard/staff#inventory">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Update Inventory
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
