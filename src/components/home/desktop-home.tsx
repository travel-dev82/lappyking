"use client";

import Link from "next/link";
import Image from "next/image";
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
  Package,
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
    text: "The ThinkPad I got from ReBoot Tech looks and performs like new. Saved over $700 and it came with a full warranty. Can't recommend enough!",
    avatar: "SC",
    product: "ThinkPad X1 Carbon",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Designer",
    text: "Was skeptical about refurbished, but my MacBook Pro arrived in pristine condition. The 50% savings let me upgrade my entire setup.",
    avatar: "MJ",
    product: "MacBook Pro M1",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    text: "We outfit our entire team with ReBoot Tech laptops. The quality is consistent, the prices are unbeatable, and we're reducing e-waste. Win-win-win.",
    avatar: "ER",
    product: "HP EliteBook 840",
    rating: 5,
  },
];

const stats = [
  { value: "10,000+", label: "Laptops Sold" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50%", label: "Average Savings" },
  { value: "52", label: "Point Inspection" },
];

const categories = [
  {
    name: "Business",
    subtitle: "ThinkPads & EliteBooks",
    count: "40+ laptops",
    icon: Briefcase,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    hoverBg: "hover:bg-slate-100",
    hoverBorder: "hover:border-slate-200",
    accentBorder: "border-l-slate-400",
  },
  {
    name: "Premium",
    subtitle: "MacBooks & XPS",
    count: "25+ laptops",
    icon: Sparkles,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    hoverBg: "hover:bg-sky-100",
    hoverBorder: "hover:border-sky-200",
    accentBorder: "border-l-sky-400",
  },
  {
    name: "Ultrabook",
    subtitle: "Lightweight & portable",
    count: "20+ laptops",
    icon: Zap,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    hoverBorder: "hover:border-amber-200",
    accentBorder: "border-l-amber-400",
  },
  {
    name: "Budget",
    subtitle: "Best value picks",
    count: "30+ laptops",
    icon: Wallet,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-100",
    hoverBorder: "hover:border-emerald-200",
    accentBorder: "border-l-emerald-400",
  },
];

const certifiedSteps = [
  {
    step: "01",
    title: "Source & Verify",
    description: "Every laptop is sourced from verified corporate and enterprise channels. We verify authenticity and ownership history.",
    icon: Search,
    color: "sky" as const,
  },
  {
    step: "02",
    title: "52-Point Inspection",
    description: "Comprehensive testing covering performance, display quality, keyboard, ports, battery health, and structural integrity.",
    icon: ClipboardCheck,
    color: "emerald" as const,
  },
  {
    step: "03",
    title: "Professional Refurbish",
    description: "Deep cleaning, component replacement if needed, software restoration, and fresh OS installation for like-new experience.",
    icon: RefreshCcw,
    color: "amber" as const,
  },
  {
    step: "04",
    title: "Certified & Sealed",
    description: "Final quality sign-off, grade assignment, warranty registration, and secure packaging for delivery.",
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
    description: "3 to 12-month warranty on every laptop. Extended warranty options available for peace of mind.",
    color: "sky" as const,
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Dedicated tech support team available 7 days a week. Get help with setup, troubleshooting, and more.",
    color: "emerald" as const,
  },
  {
    icon: RefreshCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy. Not satisfied? Send it back for a full refund, no questions asked.",
    color: "amber" as const,
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free insured shipping on all orders. Secure packaging ensures your laptop arrives in perfect condition.",
    color: "sky" as const,
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options including EMI. Buy now and pay in installments that suit your budget.",
    color: "emerald" as const,
  },
  {
    icon: HeartHandshake,
    title: "Lifetime Support",
    description: "Join our community of 10,000+ customers. Get lifetime access to tech tips and exclusive deals.",
    color: "amber" as const,
  },
];

export function DesktopHome() {
  return (
    <div className="hidden lg:block">
      {/* ============ 1. HERO SECTION ============ */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex items-center gap-16">
            {/* Left: Text content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-medium">
                <Leaf className="w-3.5 h-3.5" />
                Sustainable Tech
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mt-6">
                Give Tech a
                <br />
                <span className="text-sky-500">Second Life</span>
              </h1>

              <p className="text-lg text-slate-500 max-w-lg leading-relaxed mt-6">
                Save up to <span className="text-sky-600 font-bold">50%</span> on
                premium laptops. Every device is expertly restored, quality tested,
                and backed by our warranty.
              </p>

              <div className="flex gap-4 mt-8">
                <Link href="/shop">
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-12 px-8 btn-primary-highlight">
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/#certified">
                  <Button
                    variant="outline"
                    className="border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 font-semibold rounded-xl h-12 px-6 btn-outline-highlight"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              <div className="flex gap-6 mt-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-sky-500" />
                  <span className="text-xs text-slate-500">12-Month Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs text-slate-500">52-Point Inspection</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500" />
                  <span className="text-xs text-slate-500">Free Shipping</span>
                </div>
              </div>
            </div>

            {/* Right: Featured laptop image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                <div className="absolute w-[400px] h-[400px] bg-sky-100 rounded-full blur-3xl opacity-60" />

                <div className="relative bg-white rounded-2xl shadow-lg p-6 w-[440px] border border-slate-100">
                  <Image
                    src="/products/thinkpad-x1.svg"
                    alt="Featured laptop - ThinkPad X1 Carbon"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    priority
                  />

                  <div className="absolute -bottom-3 -right-3 bg-sky-500 text-white px-4 py-2 rounded-xl shadow-md">
                    <span className="text-[10px] uppercase tracking-wider block">FROM</span>
                    <span className="text-2xl font-bold">$279</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 2. HOT DEALS SECTION ============ */}
      <section className="bg-gradient-to-b from-orange-50/60 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <Flame className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-orange-600 font-semibold uppercase tracking-wider">
                  Limited Time Offers
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Hot Deals
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Biggest discounts on premium refurbished laptops. Grab them before they&apos;re gone!
              </p>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 font-medium btn-nav-highlight px-3 py-2 rounded-lg"
            >
              View All Deals
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Countdown-style banner */}
          <div className="bg-orange-500 text-white rounded-xl px-6 py-3 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Deals refresh every week — Don&apos;t miss out!</span>
            </div>
            <div className="flex items-center gap-3 text-sm font-bold">
              <span className="bg-white/20 rounded-lg px-3 py-1">Save up to 53%</span>
            </div>
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-4 gap-6">
            {hotDeals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} variant="hot" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 3. CATEGORY CARDS ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-10">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              Find Your Perfect Laptop
            </h2>
          </div>

          <div className="grid grid-cols-4 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href="/shop">
                  <div
                    className={`${category.bgColor} ${category.hoverBg} rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-md border border-transparent ${category.hoverBorder} border-l-4 ${category.accentBorder} btn-nav-highlight`}
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${category.iconColor}`} />
                    <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{category.subtitle}</p>
                    <p className="text-[10px] text-slate-400 mt-2">{category.count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ 4. TOP PICKS SECTION ============ */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center">
                  <Star className="w-4 h-4 text-white fill-white" />
                </div>
                <span className="text-xs text-sky-600 font-semibold uppercase tracking-wider">
                  Curated Selection
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                Top Picks
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Our most popular laptops, chosen by thousands of happy customers.
              </p>
            </div>
            <Link
              href="/shop"
              className="text-sm text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1 btn-nav-highlight px-3 py-2 rounded-lg"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {topPicks.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} variant="top" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 5. NEW ARRIVALS SECTION ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">
                  Just Added
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                New Arrivals
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Fresh stock just in — the latest additions to our refurbished collection.
              </p>
            </div>
            <Link
              href="/shop"
              className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium btn-nav-highlight px-3 py-2 rounded-lg"
            >
              See All New
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {newArrivals.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} variant="new" />
            ))}
          </div>
        </div>
      </section>

      {/* ============ 6. CERTIFIED REFURBISHED SECTION ============ */}
      <section id="certified" className="bg-gradient-to-b from-sky-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
              <BadgeCheck className="w-3.5 h-3.5" />
              Our Promise
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Certified Refurbished Process
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              Every laptop goes through our rigorous 4-step certification process to ensure you receive a device that looks and performs like new.
            </p>
          </div>

          {/* Certification steps */}
          <div className="grid grid-cols-4 gap-6">
            {certifiedSteps.map((step, index) => {
              const Icon = step.icon;
              const colors = colorMap[step.color];
              return (
                <div key={step.step} className="relative">
                  {/* Connecting line */}
                  {index < certifiedSteps.length - 1 && (
                    <div className="absolute top-6 left-[calc(50%+30px)] w-[calc(100%-60px)] h-px border-t border-dashed border-slate-300" />
                  )}

                  <div className={`${colors.bg} rounded-2xl p-6 text-center h-full`}>
                    {/* Step number */}
                    <div className={`w-8 h-8 ${colors.step} text-white rounded-full text-xs font-bold flex items-center justify-center mx-auto mb-4`}>
                      {step.step}
                    </div>

                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-7 h-7 ${colors.iconText}`} />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grade explanation */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-100 p-8">
            <h3 className="text-base font-semibold text-gray-900 text-center mb-6">
              What Our Grades Mean
            </h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-emerald-500 text-white rounded-xl text-sm font-bold mb-3">
                  A+
                </div>
                <h4 className="text-sm font-semibold text-gray-900">Excellent</h4>
                <p className="text-xs text-slate-500 mt-1">Like-new condition. No visible wear. Full warranty.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-500 text-white rounded-xl text-sm font-bold mb-3">
                  A
                </div>
                <h4 className="text-sm font-semibold text-gray-900">Very Good</h4>
                <p className="text-xs text-slate-500 mt-1">Minimal wear. Fully functional. Great value.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500 text-white rounded-xl text-sm font-bold mb-3">
                  B+
                </div>
                <h4 className="text-sm font-semibold text-gray-900">Good</h4>
                <p className="text-xs text-slate-500 mt-1">Light cosmetic wear. Fully tested and reliable.</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-500 text-white rounded-xl text-sm font-bold mb-3">
                  B
                </div>
                <h4 className="text-sm font-semibold text-gray-900">Fair</h4>
                <p className="text-xs text-slate-500 mt-1">Visible wear marks. Perfect for budget buyers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 7. WHY CHOOSE REFURBISHED? ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              The ReBoot Advantage
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              Why Choose Refurbished?
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              Smart savings, sustainability, and uncompromised quality — all in one.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Eco-Friendly */}
            <div className="bg-emerald-50 rounded-2xl p-8 text-center group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                <Recycle className="w-7 h-7 text-emerald-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Eco-Friendly</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every refurbished laptop prevents ~300kg of CO₂ emissions. Join the
                circular economy and reduce e-waste while saving money.
              </p>
              <div className="mt-5 pt-4 border-t border-emerald-200">
                <span className="text-xs font-medium text-emerald-600">
                  300kg CO₂ Saved Per Laptop
                </span>
              </div>
            </div>

            {/* Quality Tested */}
            <div className="bg-sky-50 rounded-2xl p-8 text-center group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                <ShieldCheck className="w-7 h-7 text-sky-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quality Tested</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every laptop undergoes a rigorous 52-point inspection process. We test
                performance, display, keyboard, ports, and battery life.
              </p>
              <div className="mt-5 pt-4 border-t border-sky-200">
                <span className="text-xs font-medium text-sky-600">
                  52-Point Inspection
                </span>
              </div>
            </div>

            {/* Warranty Backed */}
            <div className="bg-amber-50 rounded-2xl p-8 text-center group hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mx-auto mb-5">
                <Award className="w-7 h-7 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Warranty Backed</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every purchase includes a minimum 3-month warranty, with up to 12-month
                coverage on premium grade laptops. Shop with confidence.
              </p>
              <div className="mt-5 pt-4 border-t border-amber-200">
                <span className="text-xs font-medium text-amber-600">
                  Up To 12 Months Coverage
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 8. STATS BANNER ============ */}
      <section className="bg-sky-50">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="grid grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-gray-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 9. CUSTOMER REVIEWS ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              Customer Reviews
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              What Our Customers Say
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              Real stories from real people who chose smarter tech.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-slate-50 rounded-2xl p-8 relative hover:shadow-md transition-shadow"
              >
                <Quote className="w-8 h-8 text-sky-100 absolute top-6 right-6" />

                {/* Star rating */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= testimonial.rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Product tag */}
                <div className="mb-4">
                  <span className="text-[10px] bg-sky-100 text-sky-700 px-2 py-0.5 rounded-md font-medium">
                    Purchased: {testimonial.product}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center text-white text-xs font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-slate-400">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ 10. SUPPORT & WARRANTY SECTION ============ */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
              <Shield className="w-3.5 h-3.5" />
              We&apos;ve Got You Covered
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Support & Warranty
            </h2>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto">
              From purchase to everyday use, we provide comprehensive support to ensure your experience is seamless.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {supportFeatures.map((feature) => {
              const Icon = feature.icon;
              const colors = colorMap[feature.color];
              return (
                <div
                  key={feature.title}
                  className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow border border-slate-100"
                >
                  <div className={`w-12 h-12 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${colors.iconText}`} />
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Warranty tiers */}
          <div className="mt-12 grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 text-center">
              <div className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-2">Basic</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">3 Mo</div>
              <div className="text-xs text-slate-500">Warranty coverage</div>
              <div className="text-xs text-slate-400 mt-2">Grade B &amp; B+ laptops</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-sky-200 text-center relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <div className="text-xs text-sky-600 uppercase tracking-wider font-medium mb-2">Standard</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">6 Mo</div>
              <div className="text-xs text-slate-500">Warranty coverage</div>
              <div className="text-xs text-slate-400 mt-2">Grade A laptops</div>
            </div>
            <div className="bg-white rounded-2xl p-6 border-2 border-emerald-200 text-center">
              <div className="text-xs text-emerald-600 uppercase tracking-wider font-medium mb-2">Premium</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">12 Mo</div>
              <div className="text-xs text-slate-500">Warranty coverage</div>
              <div className="text-xs text-slate-400 mt-2">Grade A+ laptops</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 11. CTA SECTION ============ */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Ready To Save?
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Start Shopping Smarter Today
          </h2>

          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Join thousands of smart shoppers who choose refurbished. Premium laptops,
            unbeatable prices, and a greener planet.
          </p>

          <Link href="/shop">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-12 px-10 shadow-lg shadow-sky-500/20 btn-primary-highlight">
              Browse All Laptops
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
