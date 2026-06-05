"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { UserRole, dummyUsers } from "@/data/users";
import { useRouter } from "next/navigation";
import { User, Briefcase, Shield, Laptop } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const roleConfig: {
  role: UserRole;
  icon: React.ElementType;
  label: string;
  description: string;
}[] = [
  {
    role: "customer",
    icon: User,
    label: "Customer",
    description: "Shop & Track Orders",
  },
  {
    role: "staff",
    icon: Briefcase,
    label: "Staff",
    description: "Manage Orders & Inventory",
  },
  {
    role: "admin",
    icon: Shield,
    label: "Administrator",
    description: "Full System Control",
  },
];

const roleRedirectPaths: Record<UserRole, string> = {
  customer: "/dashboard/customer",
  staff: "/dashboard/staff",
  admin: "/dashboard/admin",
};

export function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<UserRole>("customer");
  const [email, setEmail] = useState(dummyUsers.customer.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setEmail(dummyUsers[role].email);
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate brief auth delay
    await new Promise((resolve) => setTimeout(resolve, 400));

    login(selectedRole);
    router.push(roleRedirectPaths[selectedRole]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Chevron top decoration */}
      <div
        className="w-full h-[3px] rounded-t-xl"
        style={{
          background:
            "repeating-linear-gradient(90deg, #0ea5e9 0px, #0ea5e9 12px, transparent 12px, transparent 24px)",
        }}
      />

      <div className="bg-white border border-slate-200 border-t-0 rounded-b-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Laptop className="w-7 h-7 text-sky-500" />
          <span className="text-xl font-semibold tracking-wide font-semibold">
            <span className="text-gray-900">Re</span>
            <span className="text-sky-500">Boot</span>
            <span className="text-slate-400 ml-1">Tech</span>
          </span>
        </div>

        <h2 className="text-center text-lg font-semibold font-semibold text-gray-900 tracking-wide mb-1">
          SIGN IN
        </h2>
        <p className="text-center text-sm text-slate-400 mb-6">
          Select your role to continue
        </p>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {roleConfig.map(({ role, icon: Icon, label, description }) => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => handleRoleSelect(role)}
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 border rounded-xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-sky-50 border-sky-500 shadow-sm"
                    : "border-slate-200 bg-white btn-filter-highlight"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-sky-500 text-white"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-semibold tracking-wide ${
                    isSelected ? "text-sky-500" : "text-gray-900"
                  }`}
                >
                  {label}
                </span>
                <span className="text-[10px] text-slate-400 text-center leading-tight hidden sm:block">
                  {description}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold tracking-wide text-gray-900 uppercase"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20 font-mono text-sm h-10"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-semibold tracking-wide text-gray-900 uppercase"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter any password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-slate-200 focus:border-sky-500 focus:ring-sky-500/20 font-mono text-sm h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold tracking-wide text-sm rounded-xl h-10 transition-colors btn-primary-highlight"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer hint */}
        <p className="text-center text-[10px] text-slate-400 mt-4 font-mono">
          Demo account — any password works
        </p>
      </div>
    </div>
  );
}
