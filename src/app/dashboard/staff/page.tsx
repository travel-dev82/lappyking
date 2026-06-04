"use client";

import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { StaffDashboard } from "@/components/dashboard/staff/staff-dashboard";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function StaffDashboardPage() {
  const { isAuthenticated, role, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      login("staff");
    } else if (role && role !== "staff") {
      router.push(`/dashboard/${role}`);
    }
  }, [isAuthenticated, role, login, router]);

  return (
    <DashboardLayout role="staff">
      <StaffDashboard />
    </DashboardLayout>
  );
}
