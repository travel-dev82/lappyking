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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { dummyAnalytics } from "@/data/users";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  value: {
    label: "Revenue",
    color: "#0096D6",
  },
} satisfies ChartConfig;

const stats = [
  {
    label: "Total Revenue",
    value: "$124,580",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    change: "+12.5%",
    changeColor: "text-emerald-600",
  },
  {
    label: "Total Orders",
    value: "342",
    icon: Package,
    color: "text-[#0096D6]",
    bgColor: "bg-[#0096D6]/10",
    change: "+8.2%",
    changeColor: "text-emerald-600",
  },
  {
    label: "Total Customers",
    value: "189",
    icon: Users,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    change: "+15.3%",
    changeColor: "text-emerald-600",
  },
  {
    label: "Avg Order Value",
    value: "$364",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    change: "+3.1%",
    changeColor: "text-emerald-600",
  },
];

const activityFeed = [
  {
    id: 1,
    action: "New customer registered",
    detail: "Emma Wilson — Premium tier",
    time: "5 min ago",
    icon: UserPlus,
    iconColor: "text-[#0096D6]",
  },
  {
    id: 2,
    action: "Large order placed",
    detail: "ORD-345 — 12 units — Corporate client",
    time: "15 min ago",
    icon: ShoppingCart,
    iconColor: "text-emerald-500",
  },
  {
    id: 3,
    action: "System alert resolved",
    detail: "Payment gateway timeout — Fixed by ops",
    time: "30 min ago",
    icon: CheckCircle2,
    iconColor: "text-emerald-500",
  },
  {
    id: 4,
    action: "Staff account created",
    detail: "James Lee — QC Technician",
    time: "1 hour ago",
    icon: ShieldCheck,
    iconColor: "text-violet-500",
  },
  {
    id: 5,
    action: "Low stock warning",
    detail: "5 products below threshold",
    time: "2 hours ago",
    icon: AlertCircle,
    iconColor: "text-amber-500",
  },
];

export function AdminDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "David Chen";

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] font-mono tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">
          Welcome back, <span className="text-[#0096D6] font-medium">{displayName}</span> — Here&apos;s your business overview
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
                <span className={`text-[10px] font-mono font-semibold ${stat.changeColor} flex items-center gap-0.5`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.change}
                </span>
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

      {/* Revenue Chart + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 bg-white border border-gray-200/80 rounded-sm shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold font-mono text-[#0a0a0a] tracking-tight">
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[260px] w-full">
              <BarChart data={dummyAnalytics.monthlyRevenue} margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fontFamily: "monospace", fill: "#a0a0a0" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fontFamily: "monospace", fill: "#a0a0a0" }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="bg-white border border-gray-200/80 rounded-sm shadow-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold font-mono text-[#0a0a0a] tracking-tight">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-0">
              {activityFeed.map((activity, index) => (
                <div
                  key={activity.id}
                  className={`flex items-start gap-3 py-3 ${
                    index < activityFeed.length - 1 ? "border-b border-gray-50" : ""
                  }`}
                >
                  <div className="mt-0.5 bg-gray-50 p-1.5 rounded-sm shrink-0">
                    <activity.icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-mono font-medium text-[#0a0a0a] truncate">
                        {activity.action}
                      </p>
                    </div>
                    <p className="text-[11px] font-mono text-gray-500 mt-0.5 truncate">
                      {activity.detail}
                    </p>
                    <span className="text-[10px] font-mono text-gray-400 mt-1 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-sm font-semibold font-mono text-[#0a0a0a] tracking-tight mb-3 uppercase tracking-wider">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link href="/dashboard/admin#users">
            <Button
              className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <Users className="w-4 h-4" />
              Manage Users
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
          <Link href="/dashboard/admin#analytics">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              View Analytics
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
          <Link href="/dashboard/admin#settings">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <Settings className="w-4 h-4" />
              System Settings
              <ArrowRight className="w-3 h-3 ml-auto" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
