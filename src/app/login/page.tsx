"use client";

import { DesktopHeader, MobileHeader } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DesktopHeader />
      <MobileHeader />

      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <LoginForm />
      </main>

      <Footer />
    </div>
  );
}
