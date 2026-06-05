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
} from "lucide-react";

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
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50%", label: "Average Savings" },
  { value: "52", label: "Point Inspection" },
];

const categories = [
  {
    name: "Business",
    subtitle: "ThinkPads & EliteBooks",
    icon: Briefcase,
    iconColor: "text-slate-600",
    bgColor: "bg-slate-50",
    hoverBg: "hover:bg-slate-100",
    hoverBorder: "hover:border-slate-200",
  },
  {
    name: "Premium",
    subtitle: "MacBooks & XPS",
    icon: Sparkles,
    iconColor: "text-sky-500",
    bgColor: "bg-sky-50",
    hoverBg: "hover:bg-sky-100",
    hoverBorder: "hover:border-sky-200",
  },
  {
    name: "Ultrabook",
    subtitle: "Lightweight & portable",
    icon: Zap,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50",
    hoverBg: "hover:bg-amber-100",
    hoverBorder: "hover:border-amber-200",
  },
  {
    name: "Budget",
    subtitle: "Best value picks",
    icon: Wallet,
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-50",
    hoverBg: "hover:bg-emerald-100",
    hoverBorder: "hover:border-emerald-200",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Browse & Select",
    description:
      "Explore our curated collection of premium refurbished laptops from top brands.",
    icon: Search,
    stepBg: "bg-sky-100",
    stepText: "text-sky-600",
  },
  {
    step: "02",
    title: "Quality Inspection",
    description:
      "Each laptop undergoes our rigorous 52-point inspection to ensure peak performance.",
    icon: ClipboardCheck,
    stepBg: "bg-emerald-100",
    stepText: "text-emerald-600",
  },
  {
    step: "03",
    title: "Delivered to You",
    description:
      "Free shipping with secure packaging. Your laptop arrives ready to use with warranty.",
    icon: Package,
    stepBg: "bg-amber-100",
    stepText: "text-amber-600",
  },
];

export function DesktopHome() {
  return (
    <div className="hidden lg:block">
      {/* ============ HERO SECTION ============ */}
      <section className="relative bg-white overflow-hidden">
        {/* Subtle gradient overlay at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50/30 to-transparent pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="flex items-center gap-16">
            {/* Left: Text content */}
            <div className="flex-1">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-medium">
                <Leaf className="w-3.5 h-3.5" />
                Sustainable Tech
              </div>

              {/* Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-[1.1] mt-6">
                Give Tech a
                <br />
                <span className="text-sky-500">Second Life</span>
              </h1>

              {/* Subtext */}
              <p className="text-lg text-slate-500 max-w-lg leading-relaxed mt-6">
                Save up to <span className="text-sky-600 font-bold">50%</span> on
                premium laptops. Every device is expertly restored, quality tested,
                and backed by our warranty.
              </p>

              {/* CTA buttons */}
              <div className="flex gap-4 mt-8">
                <Link href="/shop">
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white font-semibold rounded-xl h-12 px-8 btn-primary-highlight">
                    Shop Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/#about">
                  <Button
                    variant="outline"
                    className="border border-slate-200 text-slate-600 hover:border-sky-300 hover:text-sky-600 font-semibold rounded-xl h-12 px-6 btn-outline-highlight"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Trust badges */}
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
                {/* Decorative soft circle */}
                <div className="absolute w-[400px] h-[400px] bg-sky-100 rounded-full blur-3xl opacity-60" />

                {/* Laptop image container */}
                <div className="relative bg-white rounded-2xl shadow-lg p-6 w-[440px] border border-slate-100">
                  <Image
                    src="/products/thinkpad-x1.svg"
                    alt="Featured laptop - ThinkPad X1 Carbon"
                    width={400}
                    height={300}
                    className="w-full h-auto"
                    priority
                  />

                  {/* Price tag */}
                  <div className="absolute -bottom-3 -right-3 bg-sky-500 text-white px-4 py-2 rounded-xl shadow-md">
                    <span className="text-[10px] uppercase tracking-wider block">FROM</span>
                    <span className="text-2xl font-bold font-mono">$279</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CATEGORY CARDS ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Section header */}
          <div className="text-center mb-10">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              Browse by Category
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              Find Your Perfect Laptop
            </h2>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-4 gap-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} href="/shop">
                  <div
                    className={`${category.bgColor} ${category.hoverBg} rounded-xl p-6 text-center cursor-pointer transition-all hover:shadow-md border border-transparent ${category.hoverBorder} btn-nav-highlight`}
                  >
                    <Icon className={`w-10 h-10 mx-auto mb-3 ${category.iconColor}`} />
                    <h3 className="text-sm font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">{category.subtitle}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
                Featured Collection
              </span>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
                Top Picks
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-sm text-sky-500 hover:text-sky-600 font-medium flex items-center gap-1 btn-nav-highlight"
            >
              View All
              <ArrowRight className="w-4 h-4" />
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
      <section id="about" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              The ReBoot Advantage
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              Why Refurbished?
            </h2>
          </div>

          {/* Cards */}
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

      {/* ============ STATS BANNER ============ */}
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

      {/* ============ HOW IT WORKS ============ */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              Simple Process
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              How It Works
            </h2>
          </div>

          {/* Steps */}
          <div className="grid grid-cols-3 gap-8">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative text-center">
                  {/* Connecting line between steps */}
                  {index < howItWorks.length - 1 && (
                    <div className="absolute top-5 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px border-t border-dashed border-slate-200" />
                  )}

                  {/* Step number */}
                  <div
                    className={`w-10 h-10 rounded-full ${step.stepBg} ${step.stepText} font-bold text-sm flex items-center justify-center mx-auto mb-4`}
                  >
                    {step.step}
                  </div>

                  {/* Icon */}
                  <Icon className="w-12 h-12 text-slate-400 mx-auto mb-4" />

                  {/* Title */}
                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-20">
          {/* Section header */}
          <div className="text-center mb-14">
            <span className="text-xs text-sky-500 font-medium uppercase tracking-wider">
              Customer Reviews
            </span>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mt-1">
              What Our Customers Say
            </h2>
          </div>

          {/* Testimonial cards */}
          <div className="grid grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-8 shadow-sm relative"
              >
                <Quote className="w-8 h-8 text-sky-100 absolute top-6 right-6" />

                {/* Star rating */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
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

      {/* ============ CTA SECTION ============ */}
      <section className="bg-gradient-to-br from-sky-50 via-white to-emerald-50">
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-medium mb-4">
            <Leaf className="w-3.5 h-3.5" />
            Ready To Save?
          </div>

          {/* Heading */}
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            Start Shopping Smarter Today
          </h2>

          {/* Subtext */}
          <p className="text-slate-500 mb-8 max-w-lg mx-auto">
            Join thousands of smart shoppers who choose refurbished. Premium laptops,
            unbeatable prices, and a greener planet.
          </p>

          {/* CTA Button */}
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
