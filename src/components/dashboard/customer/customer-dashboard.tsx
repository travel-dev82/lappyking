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
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "In Transit": "bg-sky-100 text-sky-700 border-sky-200",
  Processing: "bg-amber-100 text-amber-700 border-amber-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",
};

const stats = [
  {
    label: "Total Orders",
    value: "5",
    icon: Package,
    color: "text-[#0096D6]",
    bgColor: "bg-[#0096D6]/10",
  },
  {
    label: "Active Orders",
    value: "2",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    label: "Wishlist Items",
    value: "3",
    icon: Heart,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
  },
  {
    label: "Reward Points",
    value: "1,250",
    icon: Gift,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
];

export function CustomerDashboard() {
  const { user } = useAuth();
  const displayName = user?.name || "Alex Johnson";

  return (
    <div className="p-4 lg:p-8 space-y-6 lg:space-y-8">
      {/* Welcome Message */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[#0a0a0a] font-mono tracking-tight">
          Welcome back, <span className="text-[#0096D6]">{displayName.split(" ")[0]}</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 font-mono">
          Here&apos;s what&apos;s happening with your orders
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

      {/* Recent Orders */}
      <Card className="bg-white border border-gray-200/80 rounded-sm shadow-none">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold font-mono text-[#0a0a0a] tracking-tight">
              Recent Orders
            </CardTitle>
            <Link
              href="/dashboard/customer#orders"
              className="text-xs text-[#0096D6] hover:underline font-mono flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-100 hover:bg-transparent">
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-mono font-semibold">
                    Order ID
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-mono font-semibold">
                    Product
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-mono font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-mono font-semibold">
                    Date
                  </TableHead>
                  <TableHead className="text-[10px] uppercase tracking-[0.15em] text-gray-400 font-mono font-semibold text-right">
                    Amount
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyOrderData.map((order) => (
                  <TableRow key={order.id} className="border-b border-gray-50">
                    <TableCell className="font-mono text-sm font-medium text-[#0a0a0a]">
                      {order.id}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-600">
                      {order.product}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono font-semibold rounded-sm px-2 py-0.5 border ${
                          statusColorMap[order.status] || ""
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-gray-500">
                      {order.date}
                    </TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-[#0a0a0a] text-right">
                      ${order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Order Cards */}
          <div className="md:hidden space-y-2 px-4">
            {dummyOrderData.map((order) => (
              <div
                key={order.id}
                className="border border-gray-100 rounded-sm p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[#0a0a0a]">
                    {order.id}
                  </span>
                  <Badge
                    variant="outline"
                    className={`text-[10px] font-mono font-semibold rounded-sm px-2 py-0.5 border ${
                      statusColorMap[order.status] || ""
                    }`}
                  >
                    {order.status}
                  </Badge>
                </div>
                <p className="font-mono text-sm text-gray-700">{order.product}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-400">{order.date}</span>
                  <span className="font-mono text-sm font-semibold text-[#0a0a0a]">
                    ${order.amount}
                  </span>
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
          <Link href="/shop">
            <Button
              className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </Button>
          </Link>
          <Link href="/dashboard/customer#orders">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <MapPin className="w-4 h-4" />
              Track Order
            </Button>
          </Link>
          <Link href="/dashboard/customer#support">
            <Button
              variant="outline"
              className="w-full border-gray-200 hover:border-[#0096D6] hover:text-[#0096D6] font-mono font-medium tracking-wider rounded-sm h-11 gap-2"
            >
              <Headphones className="w-4 h-4" />
              Contact Support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
