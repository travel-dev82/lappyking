"use client";

import Link from "next/link";
import { Laptop, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Laptop className="w-6 h-6 text-sky-500" />
              <span className="text-xl font-bold tracking-tight font-sans">
                <span className="text-gray-900">Re</span>
                <span className="text-sky-500">Boot</span>
                <span className="text-slate-500 ml-1">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              Premium refurbished laptops, quality tested and warranty backed.
              Save up to 50% while helping the planet.
            </p>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                🌱 Sustainable
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-sky-600 bg-sky-50 px-2 py-1 rounded-lg">
                ✓ Certified
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "Business Laptops", href: "/shop?category=Business" },
                { label: "Premium Laptops", href: "/shop?category=Premium" },
                { label: "Budget Laptops", href: "/shop?category=Budget" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/#about" },
                { label: "Warranty Policy", href: "#" },
                { label: "Refurbishing Process", href: "#" },
                { label: "FAQ", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-500 hover:text-sky-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <Mail className="w-4 h-4 text-sky-500 shrink-0" />
                support@reboottech.com
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <Phone className="w-4 h-4 text-sky-500 shrink-0" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © 2025 ReBoot Tech. All rights reserved. Not affiliated with any laptop manufacturer.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-slate-500 hover:text-sky-600 transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-sky-600 transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-sky-600 transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
