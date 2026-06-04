"use client";

import Link from "next/link";
import { Laptop, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto" style={{ background: "#0a0a0a", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      {/* Chevron top decoration */}
      <div className="w-full h-[3px]" style={{ background: "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)" }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Laptop className="w-6 h-6 text-[#0096D6]" />
              <span className="text-xl font-semibold tracking-wider font-mono">
                <span className="text-white">Re</span>
                <span className="text-[#0096D6]">Boot</span>
                <span className="text-[#a0a0a0] ml-1">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-[#a0a0a0] leading-relaxed mb-4">
              Premium refurbished laptops, quality tested and warranty backed. 
              Save up to 50% while helping the planet.
            </p>
            <div className="flex items-center gap-1">
              <span className="text-[#10B981] text-xs font-mono tracking-wider">✦ SUSTAINABLE</span>
              <span className="text-[#a0a0a0] text-xs mx-2">|</span>
              <span className="text-[#0096D6] text-xs font-mono tracking-wider">CERTIFIED</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Shop All", href: "/shop" },
                { label: "Business Laptops", href: "/shop?category=Business" },
                { label: "Premium Laptops", href: "/shop?category=Premium" },
                { label: "Budget Laptops", href: "/shop?category=Budget" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#a0a0a0] hover:text-[#0096D6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-white tracking-wider uppercase mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: "About Us", href: "/#about" },
                { label: "Warranty Policy", href: "#" },
                { label: "Refurbishing Process", href: "#" },
                { label: "FAQ", href: "#" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-sm text-[#a0a0a0] hover:text-[#0096D6] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-white tracking-wider uppercase mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                <Mail className="w-4 h-4 text-[#0096D6]" />
                support@reboottech.com
              </li>
              <li className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                <Phone className="w-4 h-4 text-[#0096D6]" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-sm text-[#a0a0a0]">
                <MapPin className="w-4 h-4 text-[#0096D6]" />
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#666]">
            © 2025 ReBoot Tech. All rights reserved. Not affiliated with any laptop manufacturer.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-xs text-[#666] hover:text-[#a0a0a0] transition-colors">Privacy</Link>
            <Link href="#" className="text-xs text-[#666] hover:text-[#a0a0a0] transition-colors">Terms</Link>
            <Link href="#" className="text-xs text-[#666] hover:text-[#a0a0a0] transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
