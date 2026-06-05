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
    text: "The ThinkPad I got from ReBoot Tech looks and performs like new. Saved over $700 and it came with a full warranty. Can't recommend enough!",
    avatar: "SC",
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Designer",
    text: "Was skeptical about refurbished, but my MacBook Pro arrived in pristine condition. The 50% savings let me upgrade my entire setup.",
    avatar: "MJ",
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    text: "We outfit our entire team with ReBoot Tech laptops. The quality is consistent, the prices are unbeatable, and we're reducing e-waste. Win-win-win.",
    avatar: "ER",
  },
];

const stats = [
  { value: "10,000+", label: "Laptops Sold" },
  { value: "98%", label: "Satisfaction" },
  { value: "50%", label: "Average Savings" },
];

export function DesktopHome() {
  return (
    <div className="hidden lg:block">
      {/* ============ HERO SECTION ============ */}
      <section className="relative bg-white overflow-hidden">
        {/* Chevron decoration at top */}
        <div
          className="absolute top-0 left-0 w-full h-[4px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)",
          }}
        />

        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="flex items-center gap-16">
            {/* Left: Text content */}
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 bg-[#10B981]/10 border border-[#10B981]/20 rounded-sm px-4 py-1.5">
                <Recycle className="w-3.5 h-3.5 text-[#10B981]" />
                <span className="text-[11px] font-mono tracking-widest text-[#10B981] uppercase">
                  Sustainable Tech
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold font-mono leading-tight tracking-tight text-[#0a0a0a]">
                Premium
                <br />
                Refurbished
                <br />
                <span className="text-[#0096D6]">Laptops</span>
              </h1>

              <p className="text-lg text-[#6b7280] max-w-lg leading-relaxed">
                Save up to <span className="text-[#0096D6] font-semibold font-mono">50%</span> on
                top-brand laptops. Every device is quality tested, certified, and backed by our
                warranty program.
              </p>

              <div className="flex items-center gap-4 pt-2">
                <Link href="/shop">
                  <Button className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-sm tracking-wider rounded-sm h-12 px-8 transition-colors">
                    SHOP NOW
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link
                  href="/#about"
                  className="text-sm font-mono tracking-wider text-[#6b7280] hover:text-[#0096D6] transition-colors flex items-center gap-1"
                >
                  LEARN MORE
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4">
                {["12-Month Warranty", "Quality Tested", "Free Shipping"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0096D6]" />
                    <span className="text-[11px] font-mono tracking-wider text-[#6b7280] uppercase">
                      {badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Featured laptop image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-8 bg-[#0096D6]/5 rounded-full blur-3xl" />
                <div className="relative bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-sm p-8 w-[480px]">
                  <img
                    src="/products/thinkpad-x1.svg"
                    alt="Featured laptop"
                    className="w-full h-auto"
                  />
                  {/* Price tag overlay */}
                  <div className="absolute -bottom-4 -right-4 bg-[#0096D6] text-white px-4 py-2 rounded-sm">
                    <span className="text-[10px] font-mono tracking-widest block">FROM</span>
                    <span className="text-2xl font-bold font-mono">$279</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom chevron decoration */}
        <div
          className="absolute bottom-0 left-0 w-full h-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)",
          }}
        />
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-[11px] font-mono tracking-widest text-[#0096D6] uppercase block mb-2">
                Featured Collection
              </span>
              <h2 className="text-3xl font-bold font-mono text-[#0a0a0a] tracking-tight">
                Top Picks
              </h2>
            </div>
            <Link href="/shop">
              <Button
                variant="outline"
                className="font-mono text-xs tracking-wider rounded-sm border-[#e5e5e5] text-[#666] hover:border-[#0096D6] hover:text-[#0096D6] transition-colors"
              >
                VIEW ALL
                <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHY REFURBISHED ============ */}
      <section id="about" className="bg-[#f8fafc] py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono tracking-widest text-[#0096D6] uppercase block mb-2">
              The ReBoot Advantage
            </span>
            <h2 className="text-3xl font-bold font-mono tracking-tight text-[#0a0a0a]">
              Why Refurbished?
            </h2>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-3 gap-8">
            {/* Eco-Friendly */}
            <div className="bg-white border border-gray-100 rounded-sm p-8 text-center group hover:border-[#10B981] transition-colors">
              <div className="w-14 h-14 rounded-sm bg-[#10B981]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#10B981]/20 transition-colors">
                <Recycle className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-lg font-semibold font-mono tracking-wide mb-3 text-[#0a0a0a]">
                Eco-Friendly
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Every refurbished laptop prevents ~300kg of CO₂ emissions. Join the circular
                economy and reduce e-waste while saving money.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono tracking-widest text-[#10B981] uppercase">
                  ✦ 300kg CO₂ Saved Per Laptop
                </span>
              </div>
            </div>

            {/* Quality Tested */}
            <div className="bg-white border border-gray-100 rounded-sm p-8 text-center group hover:border-[#0096D6] transition-colors">
              <div className="w-14 h-14 rounded-sm bg-[#0096D6]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#0096D6]/20 transition-colors">
                <ShieldCheck className="w-7 h-7 text-[#0096D6]" />
              </div>
              <h3 className="text-lg font-semibold font-mono tracking-wide mb-3 text-[#0a0a0a]">
                Quality Tested
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Every laptop undergoes a rigorous 52-point inspection process. We test
                performance, display, keyboard, ports, and battery life.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono tracking-widest text-[#0096D6] uppercase">
                  ✦ 52-Point Inspection
                </span>
              </div>
            </div>

            {/* Warranty Backed */}
            <div className="bg-white border border-gray-100 rounded-sm p-8 text-center group hover:border-[#F59E0B] transition-colors">
              <div className="w-14 h-14 rounded-sm bg-[#F59E0B]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#F59E0B]/20 transition-colors">
                <Award className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <h3 className="text-lg font-semibold font-mono tracking-wide mb-3 text-[#0a0a0a]">
                Warranty Backed
              </h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                Every purchase includes a minimum 3-month warranty, with up to 12-month coverage on
                premium grade laptops. Shop with confidence.
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100">
                <span className="text-[10px] font-mono tracking-widest text-[#F59E0B] uppercase">
                  ✦ Up To 12 Months Coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS BANNER ============ */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold font-mono text-[#0a0a0a] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-mono tracking-widest text-[#a0a0a0] uppercase mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-[11px] font-mono tracking-widest text-[#0096D6] uppercase block mb-2">
              Customer Reviews
            </span>
            <h2 className="text-3xl font-bold font-mono text-[#0a0a0a] tracking-tight">
              What Our Customers Say
            </h2>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white border border-gray-100 rounded-sm p-8 relative"
              >
                <Quote className="w-8 h-8 text-[#0096D6]/15 absolute top-6 right-6" />
                <p className="text-sm text-[#555] leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-sm bg-[#0096D6] flex items-center justify-center text-white text-xs font-mono font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0a0a0a]">{testimonial.name}</div>
                    <div className="text-[11px] font-mono tracking-wider text-[#a0a0a0] uppercase">
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
      <section className="bg-[#0d1b2a] text-white py-20 relative overflow-hidden">
        {/* Chevron top */}
        <div
          className="absolute top-0 left-0 w-full h-[3px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, #0096D6 0px, #0096D6 12px, transparent 12px, transparent 24px)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-[11px] font-mono tracking-widest text-[#10B981] uppercase block mb-3">
            Ready To Save?
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold font-mono tracking-tight mb-4">
            Start Shopping Smarter Today
          </h2>
          <p className="text-[#a0a0a0] mb-8 max-w-lg mx-auto">
            Join thousands of smart shoppers who choose refurbished. Premium laptops, unbeatable
            prices, and a greener planet.
          </p>
          <Link href="/shop">
            <Button className="bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-sm tracking-wider rounded-sm h-12 px-10 transition-colors">
              BROWSE ALL LAPTOPS
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
