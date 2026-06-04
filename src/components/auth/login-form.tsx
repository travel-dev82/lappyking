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
        className="w-full h-[3px] rounded-t-sm"
        style={{
          background:
            "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)",
        }}
      />

      <div className="bg-white border border-gray-200 border-t-0 rounded-b-sm shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Laptop className="w-7 h-7 text-[#0096D6]" />
          <span className="text-xl font-semibold tracking-wider font-mono">
            <span className="text-[#0a0a0a]">Re</span>
            <span className="text-[#0096D6]">Boot</span>
            <span className="text-[#a0a0a0] ml-1">Tech</span>
          </span>
        </div>

        <h2 className="text-center text-lg font-mono font-semibold text-[#0a0a0a] tracking-wider mb-1">
          SIGN IN
        </h2>
        <p className="text-center text-sm text-[#a0a0a0] mb-6">
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
                className={`flex flex-col items-center gap-2 p-3 sm:p-4 border rounded-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-[#0096D6] bg-[#0096D6]/5 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-sm flex items-center justify-center transition-colors ${
                    isSelected
                      ? "bg-[#0096D6] text-white"
                      : "bg-gray-100 text-[#a0a0a0]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-mono font-semibold tracking-wider ${
                    isSelected ? "text-[#0096D6]" : "text-[#0a0a0a]"
                  }`}
                >
                  {label}
                </span>
                <span className="text-[10px] text-[#a0a0a0] text-center leading-tight hidden sm:block">
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
              className="text-xs font-mono font-semibold tracking-wider text-[#0a0a0a] uppercase"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-sm border-gray-200 focus:border-[#0096D6] focus:ring-[#0096D6]/20 font-mono text-sm h-10"
              readOnly
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-xs font-mono font-semibold tracking-wider text-[#0a0a0a] uppercase"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter any password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-sm border-gray-200 focus:border-[#0096D6] focus:ring-[#0096D6]/20 font-mono text-sm h-10"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono font-semibold tracking-wider text-sm rounded-sm h-10 transition-colors"
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
        <p className="text-center text-[10px] text-[#a0a0a0] mt-4 font-mono">
          Demo account — any password works
        </p>
      </div>
    </div>
  );
}
