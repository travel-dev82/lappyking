"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { AdminDashboard } from "@/components/dashboard/admin/admin-dashboard";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminDashboardPage() {
  const { isAuthenticated, role, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      login("admin");
    } else if (role && role !== "admin") {
      router.push(`/dashboard/${role}`);
    }
  }, [isAuthenticated, role, login, router]);

  return (
    <DashboardLayout role="admin">
      <AdminDashboard />
    </DashboardLayout>
  );
}
