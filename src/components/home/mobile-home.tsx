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
  Flame,
  Clock,
  HeadphonesIcon,
  RefreshCcw,
  BadgeCheck,
  Shield,
  CreditCard,
  HeartHandshake,
  ChevronRight,
} from "lucide-react";

// Filtered product lists
const hotDeals = products.filter((p) => p.isHotDeal);
const topPicks = products.filter((p) => p.isTopPick);
const newArrivals = products.filter((p) => p.isNew);

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    text: "The ThinkPad I got looks and performs like new. Saved over $700 with a full warranty!",
    avatar: "SC",
    product: "ThinkPad X1 Carbon",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Designer",
    text: "My MacBook Pro arrived in pristine condition. The 50% savings let me upgrade my entire setup.",
    avatar: "MJ",
    product: "MacBook Pro M1",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    text: "We outfit our entire team with ReBoot Tech laptops. Quality is consistent and prices unbeatable.",
    avatar: "ER",
    product: "HP EliteBook 840",
    rating: 5,
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

const certifiedSteps = [
  {
    step: "01",
    title: "Source & Verify",
    description: "Sourced from verified enterprise channels with full authenticity check.",
    icon: Search,
    color: "sky" as const,
  },
  {
    step: "02",
    title: "52-Point Inspection",
    description: "Complete testing of performance, display, keyboard, and battery.",
    icon: ClipboardCheck,
    color: "emerald" as const,
  },
  {
    step: "03",
    title: "Professional Refurbish",
    description: "Deep cleaning, component replacement, and fresh OS installation.",
    icon: RefreshCcw,
    color: "amber" as const,
  },
  {
    step: "04",
    title: "Certified & Sealed",
    description: "Final sign-off, grade assignment, and secure packaging.",
    icon: BadgeCheck,
    color: "sky" as const,
  },
];

const colorMap = {
  sky: { bg: "bg-sky-50", iconBg: "bg-sky-100", iconText: "text-sky-600", step: "bg-sky-500" },
  emerald: { bg: "bg-emerald-50", iconBg: "bg-emerald-100", iconText: "text-emerald-600", step: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", iconBg: "bg-amber-100", iconText: "text-amber-600", step: "bg-amber-500" },
};

const supportFeatures = [
  {
    icon: Shield,
    title: "Warranty Coverage",
    description: "3 to 12-month warranty on every laptop.",
    color: "sky" as const,
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Tech support available 7 days a week.",
    color: "emerald" as const,
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy.",
    color: "amber" as const,
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free insured shipping on all orders.",
    color: "sky" as const,
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options including EMI.",
    color: "emerald" as const,
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Support",
    description: "Join 10,000+ customers in our community.",
    color: "amber" as const,
  },
];

export function MobileHome() {
  return (
    <div className="lg:hidden">
      {/* ============ 1. HERO SECTION ============ */}
      <section className="bg-white">
        <div className="px-4 py-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-medium mb-4">
            <Leaf className="w-3 h-3" />
            Sustainable Tech
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 leading-tight mb-4">
            Give Tech a
            <br />
            <span className="text-sky-500">Second Life</span>
          </h1>

          <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
            Save up to <strong>50%</strong> on premium laptops. Quality tested &amp; warranty backed.
          </p>

          <div className="flex gap-3 mb-6">
            <Link href="/shop">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-10 px-5 text-xs btn-primary-highlight">
                Shop Now
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Link href="/#certified">
              <Button
                variant="outline"
                className="border border-slate-200 text-slate-600 font-medium rounded-xl h-10 px-4 text-xs btn-outline-highlight"
              >
                Learn More
              </Button>
            </Link>
          </div>

          <div className="relative bg-white rounded-xl shadow-md p-4 border border-slate-100">
            <img
              src="/products/thinkpad-x1.svg"
              alt="Featured refurbished laptop"
              className="w-full h-auto"
            />
            <div className="absolute bottom-2 right-2 bg-sky-500 text-white px-3 py-1.5 rounded-lg shadow-sm">
              <span className="text-[8px] block">FROM</span>
              <span className="text-base font-bold">$279</span>
            </div>
          </div>

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

      {/* ============ 2. HOT DEALS SECTION ============ */}
      <section className="bg-gradient-to-b from-orange-50/60 to-white py-8">
        {/* Section header */}
        <div className="px-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center">
              <Flame className="w-3 h-3 text-white" />
            </div>
            <span className="text-[10px] text-orange-600 font-semibold uppercase tracking-wider">
              Limited Time
            </span>
          </div>
          <div className="flex justify-between items-end">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Hot Deals</h2>
            <Link
              href="/shop"
              className="text-orange-600 text-xs font-medium hover:text-orange-700 transition-colors btn-nav-highlight px-2 py-1 rounded-md"
            >
              View All
            </Link>
          </div>
        </div>

        {/* Countdown-style mini banner */}
        <div className="mx-4 bg-orange-500 text-white rounded-lg px-3 py-2 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-medium">Weekly deals — Don&apos;t miss out!</span>
          </div>
          <span className="text-[10px] bg-white/20 rounded px-2 py-0.5 font-bold">Up to 53% off</span>
        </div>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {hotDeals.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[240px] snap-start">
              <ProductCard product={product} variant="hot" />
            </div>
          ))}
        </div>
      </section>

      {/* ============ 3. CATEGORY CARDS ============ */}
      <section className="bg-white py-8">
        <div className="px-4 mb-5">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            Browse
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Find Your Laptop
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {categories.map((cat) => (
            <Link key={cat.title} href="/shop" className="min-w-[140px] snap-start">
              <div className={`rounded-xl p-4 text-center ${cat.bgColor} btn-nav-highlight border-l-4 border-l-current ${cat.iconColor}`}>
                <cat.icon className={`w-8 h-8 mx-auto mb-2 ${cat.iconColor}`} />
                <div className="text-xs font-semibold text-gray-900">{cat.title}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{cat.subtitle}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ 4. TOP PICKS SECTION ============ */}
      <section className="bg-slate-50 py-8">
        <div className="px-4 flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 bg-sky-500 rounded flex items-center justify-center">
                <Star className="w-2.5 h-2.5 text-white fill-white" />
              </div>
              <span className="text-[10px] text-sky-600 font-semibold uppercase tracking-wider">
                Curated
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Top Picks</h2>
          </div>
          <Link
            href="/shop"
            className="text-sky-500 text-xs font-medium hover:text-sky-600 transition-colors btn-nav-highlight px-2 py-1 rounded-md"
          >
            View All
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {topPicks.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[240px] snap-start">
              <ProductCard product={product} variant="top" />
            </div>
          ))}
        </div>
      </section>

      {/* ============ 5. NEW ARRIVALS SECTION ============ */}
      <section className="bg-white py-8">
        <div className="px-4 flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-5 h-5 bg-emerald-500 rounded flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">
                Just Added
              </span>
            </div>
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">New Arrivals</h2>
          </div>
          <Link
            href="/shop"
            className="text-emerald-600 text-xs font-medium hover:text-emerald-700 transition-colors btn-nav-highlight px-2 py-1 rounded-md"
          >
            See All
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide">
          {newArrivals.map((product) => (
            <div key={product.id} className="min-w-[240px] max-w-[240px] snap-start">
              <ProductCard product={product} variant="new" />
            </div>
          ))}
        </div>
      </section>

      {/* ============ 6. CERTIFIED REFURBISHED SECTION ============ */}
      <section id="certified" className="bg-gradient-to-b from-sky-50/50 to-white py-8">
        <div className="px-4 text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-[10px] font-medium mb-2">
            <BadgeCheck className="w-3 h-3" />
            Our Promise
          </div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Certified Refurbished
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Every laptop goes through our 4-step certification process.
          </p>
        </div>

        {/* Steps as stacked cards */}
        <div className="space-y-3 px-4">
          {certifiedSteps.map((step) => {
            const Icon = step.icon;
            const colors = colorMap[step.color];
            return (
              <div key={step.step} className={`${colors.bg} rounded-xl p-4 flex items-start gap-3`}>
                <div className={`w-8 h-8 ${colors.step} text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0`}>
                  {step.step}
                </div>
                <div className="flex items-start gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-4 h-4 ${colors.iconText}`} />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-[10px] text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Grade explanation */}
        <div className="mx-4 mt-6 bg-white rounded-xl border border-slate-100 p-4">
          <h3 className="text-xs font-semibold text-gray-900 text-center mb-4">
            What Our Grades Mean
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0">
                A+
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-900">Excellent</div>
                <div className="text-[9px] text-slate-500">Like-new, full warranty</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-sky-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0">
                A
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-900">Very Good</div>
                <div className="text-[9px] text-slate-500">Minimal wear, great value</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-amber-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0">
                B+
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-900">Good</div>
                <div className="text-[9px] text-slate-500">Light wear, fully tested</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-500 text-white rounded-lg text-[10px] font-bold flex items-center justify-center shrink-0">
                B
              </div>
              <div>
                <div className="text-[10px] font-semibold text-gray-900">Fair</div>
                <div className="text-[9px] text-slate-500">Visible wear, budget pick</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. WHY CHOOSE REFURBISHED (STACKED) ============ */}
      <section className="bg-white py-8">
        <div className="px-4 text-center mb-6">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            The ReBoot Advantage
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Why Choose Refurbished?
          </h2>
        </div>

        <div className="space-y-3 px-4">
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

      {/* ============ 8. STATS (2x2 GRID) ============ */}
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

      {/* ============ 9. CUSTOMER REVIEWS ============ */}
      <section className="bg-white py-8">
        <div className="px-4 text-center mb-6">
          <span className="text-[10px] text-sky-500 font-medium uppercase tracking-wider block mb-1">
            Reviews
          </span>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            What Customers Say
          </h2>
        </div>

        <div className="space-y-3 px-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-slate-50 rounded-xl p-5 relative"
            >
              <Quote className="w-5 h-5 text-sky-100 absolute top-4 right-4" />

              {/* Stars */}
              <div className="flex items-center gap-0.5 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-3 h-3 ${
                      star <= testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3 pr-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Product tag */}
              <div className="mb-3">
                <span className="text-[9px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md font-medium">
                  {testimonial.product}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-200">
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

      {/* ============ 10. SUPPORT & WARRANTY ============ */}
      <section className="bg-slate-50 py-8">
        <div className="px-4 text-center mb-6">
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-medium mb-2">
            <Shield className="w-3 h-3" />
            We&apos;ve Got You
          </div>
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Support & Warranty
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Comprehensive support from purchase to everyday use.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4">
          {supportFeatures.map((feature) => {
            const Icon = feature.icon;
            const colors = colorMap[feature.color];
            return (
              <div
                key={feature.title}
                className="bg-white rounded-xl p-4 border border-slate-100"
              >
                <div className={`w-8 h-8 rounded-lg ${colors.iconBg} flex items-center justify-center mb-2`}>
                  <Icon className={`w-4 h-4 ${colors.iconText}`} />
                </div>
                <h3 className="text-[11px] font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Warranty tiers */}
        <div className="space-y-2 px-4 mt-6">
          <div className="bg-white rounded-xl p-3 border border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-medium">Basic</div>
              <div className="text-sm font-bold text-gray-900">3 Months</div>
              <div className="text-[9px] text-slate-400">Grade B &amp; B+</div>
            </div>
            <Shield className="w-6 h-6 text-slate-300" />
          </div>
          <div className="bg-white rounded-xl p-3 border-2 border-sky-200 flex items-center justify-between relative">
            <div className="absolute -top-2 left-3 bg-sky-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">
              Popular
            </div>
            <div>
              <div className="text-[10px] text-sky-600 uppercase font-medium">Standard</div>
              <div className="text-sm font-bold text-gray-900">6 Months</div>
              <div className="text-[9px] text-slate-400">Grade A</div>
            </div>
            <Shield className="w-6 h-6 text-sky-400" />
          </div>
          <div className="bg-white rounded-xl p-3 border border-emerald-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-emerald-600 uppercase font-medium">Premium</div>
              <div className="text-sm font-bold text-gray-900">12 Months</div>
              <div className="text-[9px] text-slate-400">Grade A+</div>
            </div>
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
        </div>
      </section>

      {/* ============ 11. CTA SECTION ============ */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="px-4 py-10 text-center">
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-medium mb-3">
            <Leaf className="w-3 h-3" />
            Ready To Save?
          </div>

          <h2 className="text-xl font-bold text-gray-900 tracking-tight mb-2">
            Start Shopping Smarter
          </h2>

          <p className="text-xs text-slate-500 mb-5 max-w-xs mx-auto">
            Join thousands who choose refurbished. Premium laptops, unbeatable prices, greener planet.
          </p>

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
