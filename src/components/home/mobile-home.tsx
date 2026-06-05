"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Truck,
  Briefcase,
  Sparkles,
  Zap,
  Wallet,
  Recycle,
  Award,
  Quote,
  Star,
  Search,
  ClipboardCheck,
} from "lucide-react";

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

const categories = [
  {
    title: "Business",
    subtitle: "Work-ready",
    icon: Briefcase,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
  },
  {
    title: "Premium",
    subtitle: "Top-tier",
    icon: Sparkles,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
  },
  {
    title: "Ultrabook",
    subtitle: "Lightweight",
    icon: Zap,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
  },
  {
    title: "Budget",
    subtitle: "Great value",
    icon: Wallet,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse & Select",
    description: "Explore our curated collection of premium refurbished laptops from top brands.",
    icon: Search,
    numBg: "bg-sky-100",
    numText: "text-sky-600",
  },
  {
    number: "02",
    title: "Quality Inspection",
    description: "Every laptop undergoes a rigorous 52-point inspection to ensure peak performance.",
    icon: ClipboardCheck,
    numBg: "bg-emerald-100",
    numText: "text-emerald-600",
  },
  {
    number: "03",
    title: "Delivered to You",
    description: "Free shipping with secure packaging. Your laptop arrives ready to use.",
    icon: Truck,
    numBg: "bg-amber-100",
    numText: "text-amber-600",
  },
];

export function MobileHome() {
  return (
    <div className="lg:hidden">
      {/* ============ 1. HERO SECTION ============ */}
      <section className="bg-white">
        <div className="px-4 py-10">
          {/* Pill badge */}
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-medium mb-4">
            <Leaf className="w-3 h-3" />
            Sustainable Tech
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Give Tech a
            <br />
            <span className="text-sky-500">Second Life</span>
          </h1>

          {/* Subtext */}
          <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
            Save up to <strong>50%</strong> on premium laptops. Quality tested &amp; warranty backed.
          </p>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-6">
            <Link href="/shop">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-10 px-5 text-xs btn-primary-highlight">
                Shop Now
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/#why-refurbished">
              <Button
                variant="outline"
                className="border border-slate-200 text-slate-600 font-medium rounded-xl h-10 px-4 text-xs btn-outline-highlight"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Laptop image with price tag */}
          <div className="relative bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <img
              src="/products/thinkpad-x1.svg"
              alt="Featured refurbished laptop"
              className="w-full h-auto"
            />
            <div className="absolute bottom-2 right-2 bg-sky-500 text-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-[8px] block">FROM</span>
              <span className="text-base font-bold font-mono">$279</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex gap-3 mt-5">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-500" />
              <span className="text-[10px] text-slate-500">Warranty</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-[10px] text-slate-500">Tested</span>
            </div>
            <div className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[10px] text-slate-500">Free Ship</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. CATEGORY CARDS ============ */}
      <section className="bg-white py-8">
        {/* Section header */}
        <div className="px-4 mb-5">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            Browse
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Find Your Laptop
          </h2>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <Link key={cat.title} href="/shop" className="min-w-[140px] snap-start">
              <div className={`rounded-xl p-4 text-center ${cat.bgColor} btn-nav-highlight`}>
                <cat.icon className={`w-8 h-8 mx-auto mb-2 ${cat.iconColor}`} />
                <div className="text-xs font-semibold text-gray-900">{cat.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{cat.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 3. FEATURED PRODUCTS (HORIZONTAL SCROLL) ============ */}
      <section className="bg-slate-50 py-8">
        {/* Section header */}
        <div className="px-4 flex justify-between items-end mb-4">
          <div>
            <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
              Featured
            </span>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Top Picks</h2>
          </div>
          <Link
            href="/shop"
            className="text-sky-500 text-xs font-medium hover:text-sky-600 transition-colors btn-nav-highlight"
          >
            View All
          </Link>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {featuredProducts.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[240px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* ============ 4. WHY REFURBISHED (STACKED) ============ */}
      <section id="why-refurbished" className="bg-white py-8">
        {/* Section header */}
        <div className="px-4 text-center mb-6">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            The ReBoot Advantage
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Why Refurbished?
          </h2>
        </div>

        {/* Stacked cards */}
        <div className="space-y-3 px-4">
          {/* Eco-Friendly */}
          <div className="rounded-xl p-4 flex items-start gap-3 bg-emerald-50">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              <Recycle className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Eco-Friendly</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Every laptop prevents ~300kg of CO₂ emissions. Join the circular economy.
              </p>
              <span className="text-[10px] font-medium text-emerald-600 mt-1 block">
                300kg CO₂ Saved Per Laptop
              </span>
            </div>
          </div>

          {/* Quality Tested */}
          <div className="rounded-xl p-4 flex items-start gap-3 bg-sky-50">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Quality Tested</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Rigorous 52-point inspection. Performance, display, keyboard &amp; battery all tested.
              </p>
              <span className="text-[10px] font-medium text-sky-600 mt-1 block">
                52-Point Inspection
              </span>
            </div>
          </div>

          {/* Warranty Backed */}
          <div className="rounded-xl p-4 flex items-start gap-3 bg-amber-50">
            <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Warranty Backed</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                3–12 month warranty on every laptop. Shop with complete confidence.
              </p>
              <span className="text-[10px] font-medium text-amber-600 mt-1 block">
                Up To 12 Months Coverage
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 5. STATS (2x2 GRID) ============ */}
      <section className="bg-sky-50 py-8">
        <div className="px-4 grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-[10px] text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 6. HOW IT WORKS ============ */}
      <section className="bg-white py-8">
        {/* Section header */}
        <div className="px-4 text-center mb-6">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            Simple Process
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">How It Works</h2>
        </div>

        {/* Steps */}
        <div className="space-y-4 px-4">
          {steps.map((step) => (
            <div key={step.number} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50">
              <div
                className={`w-8 h-8 rounded-full ${step.numBg} ${step.numText} font-bold text-xs flex items-center justify-center shrink-0`}
              >
                {step.number}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 7. TESTIMONIALS ============ */}
      <section className="bg-slate-50 py-8">
        {/* Section header */}
        <div className="px-4 text-center mb-6">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            Reviews
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            What Customers Say
          </h2>
        </div>

        {/* Testimonial cards */}
        <div className="space-y-3 px-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-white rounded-xl p-5 shadow-sm relative"
            >
              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-3 h-3 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="w-5 h-5 text-sky-100 absolute top-4 right-4" />

              {/* Text */}
              <p className="text-xs text-slate-600 leading-relaxed mb-4 pr-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white text-[10px] font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-900">
                    {testimonial.name}
                  </div>
                  <div className="text-[10px] text-slate-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ 8. CTA SECTION ============ */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="px-4 py-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-medium mb-3">
            <Leaf className="w-3 h-3" />
            Ready To Save?
          </div>

          {/* Heading */}
          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
            Start Shopping Smarter
          </h2>

          {/* Subtext */}
          <p className="text-xs text-slate-500 mb-5 max-w-xs mx-auto">
            Join thousands who choose refurbished. Premium laptops, unbeatable prices, greener planet.
          </p>

          {/* CTA Button */}
          <Link href="/shop">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-10 px-6 text-xs shadow-lg shadow-sky-500/20 btn-primary-highlight">
              Browse Laptops
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
