"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Recycle, ShieldCheck, Award, Quote } from "lucide-react";

const featuredProducts = products.slice(0, 4);

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    text: "The ThinkPad I got looks and performs like new. Saved over $700 with a full warranty!",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Designer",
    text: "My MacBook Pro arrived in pristine condition. The 50% savings let me upgrade my entire setup.",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    text: "We outfit our entire team with ReBoot Tech laptops. Quality is consistent and prices unbeatable.",
    avatar: "ER",
  },
];

const stats = [
  { value: "10,000+", label: "Laptops Sold" },
  { value: "98%", label: "Satisfaction" },
  { value: "50%", label: "Avg Savings" },
  { value: "52", label: "Point Check" },
];

export function MobileHome() {
  return (
    <div className="lg:hidden">
      {/* ============ HERO SECTION ============ */}
      <section className="relative bg-white overflow-hidden">
        {/* Chevron top */}
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 8px, transparent 8px, transparent 16px)",
          }}
        />

        <div className="relative px-4 py-12">
          {/* Eco badge */}
          <div className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-sm px-3 py-1 mb-5">
            <Recycle className="w-3 h-3 text-[#10B981]" />
            <span className="text-[9px] font-mono tracking-widest text-[#10B981] uppercase">
              Sustainable Tech
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold font-mono leading-tight tracking-tight mb-4 text-[#0a0a0a]">
            Premium
            <br />
            Refurbished
            <br />
            <span className="text-[#0096D6]">Laptops</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm text-[#6b7280] leading-relaxed mb-6 max-w-xs">
            Save up to{" "}
            <span className="text-[#0096D6] font-semibold font-mono">50%</span> on top-brand
            laptops. Quality tested, certified &amp; warranty backed.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center gap-3 mb-8">
            <Link href="/shop">
              <Button className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-xs tracking-wider rounded-sm h-10 px-5 transition-colors">
                SHOP NOW
                <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link
              href="/#about"
              className="text-xs font-mono tracking-wider text-[#6b7280] hover:text-[#0096D6] transition-colors flex items-center gap-1"
            >
              LEARN MORE
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Featured laptop image */}
          <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-sm p-5">
            <img
              src="/products/thinkpad-x1.svg"
              alt="Featured laptop"
              className="w-full h-auto"
            />
            {/* Price tag */}
            <div className="absolute bottom-3 right-3 bg-[#0096D6] text-white px-3 py-1.5 rounded-sm">
              <span className="text-[8px] font-mono tracking-widest block">FROM</span>
              <span className="text-lg font-bold font-mono">$279</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center gap-4 mt-6">
            {["Warranty", "Tested", "Free Ship"].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0096D6]" />
                <span className="text-[9px] font-mono tracking-wider text-[#6b7280] uppercase">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom chevron */}
        <div
          className="absolute bottom-0 left-0 w-full h-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 8px, transparent 8px, transparent 16px)",
          }}
        />
      </section>

      {/* ============ FEATURED PRODUCTS (HORIZONTAL SCROLL) ============ */}
      <section className="bg-white py-10">
        <div className="px-4">
          {/* Section header */}
          <div className="flex items-end justify-between mb-5">
            <div>
              <span className="text-[9px] font-mono tracking-widest text-[#0096D6] uppercase block mb-1">
                Featured
              </span>
              <h2 className="text-xl font-bold font-mono text-[#0a0a0a] tracking-tight">
                Top Picks
              </h2>
            </div>
            <Link href="/shop">
              <Button
                variant="outline"
                className="font-mono text-[10px] tracking-wider rounded-sm border-[#e5e5e5] text-[#666] hover:border-[#0096D6] hover:text-[#0096D6] h-8 transition-colors"
              >
                VIEW ALL
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[260px] max-w-[260px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHY REFURBISHED (STACKED) ============ */}
      <section id="about" className="bg-[#f8fafc] py-10">
        <div className="px-4">
          {/* Section header */}
          <div className="text-center mb-8">
            <span className="text-[9px] font-mono tracking-widest text-[#0096D6] uppercase block mb-1">
              The ReBoot Advantage
            </span>
            <h2 className="text-xl font-bold font-mono tracking-tight text-[#0a0a0a]">Why Refurbished?</h2>
          </div>

          {/* Stacked cards */}
          <div className="space-y-4">
            {/* Eco-Friendly */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-sm bg-[#10B981]/10 flex items-center justify-center shrink-0">
                <Recycle className="w-5 h-5 text-[#10B981]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold font-mono tracking-wide mb-1 text-[#0a0a0a]">
                  Eco-Friendly
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  Every laptop prevents ~300kg of CO₂ emissions. Join the circular economy.
                </p>
                <span className="text-[9px] font-mono tracking-widest text-[#10B981] uppercase mt-2 block">
                  ✦ 300kg CO₂ Saved Per Laptop
                </span>
              </div>
            </div>

            {/* Quality Tested */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-sm bg-[#0096D6]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#0096D6]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold font-mono tracking-wide mb-1 text-[#0a0a0a]">
                  Quality Tested
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  Rigorous 52-point inspection. Performance, display, keyboard &amp; battery all
                  tested.
                </p>
                <span className="text-[9px] font-mono tracking-widest text-[#0096D6] uppercase mt-2 block">
                  ✦ 52-Point Inspection
                </span>
              </div>
            </div>

            {/* Warranty Backed */}
            <div className="bg-white border border-gray-100 rounded-sm p-5 flex items-start gap-4">
              <div className="w-11 h-11 rounded-sm bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-[#F59E0B]" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold font-mono tracking-wide mb-1 text-[#0a0a0a]">
                  Warranty Backed
                </h3>
                <p className="text-xs text-[#6b7280] leading-relaxed">
                  3–12 month warranty on every laptop. Shop with complete confidence.
                </p>
                <span className="text-[9px] font-mono tracking-widest text-[#F59E0B] uppercase mt-2 block">
                  ✦ Up To 12 Months Coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS (2x2 GRID) ============ */}
      <section className="bg-white border-y border-gray-100">
        <div className="px-4 py-10">
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold font-mono text-[#0a0a0a] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono tracking-widest text-[#a0a0a0] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-gray-50 py-10">
        <div className="px-4">
          {/* Section header */}
          <div className="text-center mb-8">
            <span className="text-[9px] font-mono tracking-widest text-[#0096D6] uppercase block mb-1">
              Reviews
            </span>
            <h2 className="text-xl font-bold font-mono text-[#0a0a0a] tracking-tight">
              What Customers Say
            </h2>
          </div>

          {/* Testimonial cards (simpler stacked) */}
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white border border-gray-100 rounded-sm p-5 relative"
              >
                <Quote className="w-5 h-5 text-[#0096D6]/15 absolute top-4 right-4" />
                <p className="text-xs text-[#555] leading-relaxed mb-4 pr-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-[10px] font-mono font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#0a0a0a]">{testimonial.name}</div>
                    <div className="text-[9px] font-mono tracking-wider text-[#a0a0a0] uppercase">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="bg-[#0d1b2a] text-white py-10 relative overflow-hidden">
        {/* Chevron top */}
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 8px, transparent 8px, transparent 16px)",
          }}
        />

        <div className="relative px-4 text-center">
          <span className="text-[9px] font-mono tracking-widest text-[#10B981] uppercase block mb-2">
            Ready To Save?
          </span>
          <h2 className="text-xl font-bold font-mono tracking-tight mb-3">
            Start Shopping Smarter
          </h2>
          <p className="text-xs text-[#a0a0a0] mb-5 max-w-xs mx-auto">
            Join thousands who choose refurbished. Premium laptops, unbeatable prices, greener
            planet.
          </p>
          <Link href="/shop">
            <Button className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-xs tracking-wider rounded-sm h-10 px-6 transition-colors">
              BROWSE LAPTOPS
              <ChevronRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
