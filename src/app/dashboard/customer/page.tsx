"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { CustomerDashboard } from "@/components/dashboard/customer/customer-dashboard";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomerDashboardPage() {
  const { isAuthenticated, role, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      login("customer");
    } else if (role && role !== "customer") {
      router.push(`/dashboard/${role}`);
    }
  }, [isAuthenticated, role, login, router]);

  return (
    <DashboardLayout role="customer">
      <CustomerDashboard />
    </DashboardLayout>
  );
}
