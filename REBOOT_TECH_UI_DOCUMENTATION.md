# ReBoot Tech — Refurbished Laptop E-Commerce UI Documentation

> **Complete UI specification document.** If the project source code were deleted, every visual element described herein is sufficient to fully reconstruct the front-end UI to pixel-level fidelity.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Technology Stack](#2-technology-stack)
3. [Project File Structure](#3-project-file-structure)
4. [Global Design System](#4-global-design-system)
5. [Shared Layout Components](#5-shared-layout-components)
6. [Page: Homepage (/)](#6-page-homepage-)
7. [Page: Shop (/shop)](#7-page-shop-shop)
8. [Page: Product Detail (/product/[id])](#8-page-product-detail-productid)
9. [Page: Cart (/cart)](#9-page-cart-cart)
10. [Page: Wishlist (/wishlist)](#10-page-wishlist-wishlist)
11. [Page: Login (/login)](#11-page-login-login)
12. [Page: Admin Dashboard (/dashboard/admin)](#12-page-admin-dashboard-dashboardadmin)
13. [Page: Staff Dashboard (/dashboard/staff)](#13-page-staff-dashboard-dashboardstaff)
14. [Page: Customer Dashboard (/dashboard/customer)](#14-page-customer-dashboard-dashboardcustomer)
15. [Dashboard Data Entry Forms](#15-dashboard-data-entry-forms)
16. [State Management](#16-state-management)
17. [Data Models](#17-data-models)
18. [CSS Utility Classes & Animations](#18-css-utility-classes--animations)

---

## 1. Project Overview

**ReBoot Tech** is a dummy UI-only refurbished laptop e-commerce site built with Next.js 16 App Router. It features a public-facing storefront (homepage, shop, product detail, cart, wishlist, login) and role-based dashboards (admin, staff, customer) styled in a compact ERP layout.

**Brand Identity:**
- Brand name: "ReBoot Tech" — styled as **Re**Boot**Tech** where "Re" is `text-gray-900`, "Boot" is `text-sky-500`, "Tech" is `text-slate-400`
- Logo icon: `Laptop` from lucide-react in `text-sky-500`
- Tagline: "Premium refurbished laptops at unbeatable prices"

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 with App Router |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 + shadcn/ui (New York style) |
| Icons | Lucide React |
| State Management | Zustand (cart + wishlist stores, persisted to localStorage) |
| Auth Context | React Context (`AuthProvider`) |
| Charts | Recharts via shadcn/ui Chart component |
| Alerts | SweetAlert2 (Swal) for dashboard form feedback |
| Toasts | shadcn/ui Toaster + `useToast` hook |
| Fonts | Geist Sans (`--font-geist-sans`) + Geist Mono (`--font-geist-mono`) |

---

## 3. Project File Structure

```
src/
├── app/
│   ├── globals.css                         # Global styles, CSS variables, utility classes
│   ├── layout.tsx                          # Root layout (AuthProvider + Toaster)
│   ├── page.tsx                            # Homepage route
│   ├── shop/page.tsx                       # Shop page
│   ├── cart/page.tsx                       # Cart page
│   ├── login/page.tsx                      # Login page
│   ├── wishlist/page.tsx                   # Wishlist page
│   ├── product/[id]/page.tsx               # Product detail page
│   └── dashboard/
│       ├── admin/page.tsx                  # Admin dashboard
│       ├── staff/page.tsx                  # Staff dashboard
│       └── customer/page.tsx              # Customer dashboard
├── components/
│   ├── layout/
│   │   ├── header.tsx                      # Desktop + Mobile headers
│   │   └── footer.tsx                      # Sticky footer
│   ├── home/
│   │   ├── desktop-home.tsx               # Desktop homepage (11 sections)
│   │   ├── mobile-home.tsx                # Mobile homepage (11 sections)
│   │   └── product-card.tsx               # Reusable product card with variants
│   ├── shop/
│   │   ├── desktop-shop.tsx               # Desktop shop with filters
│   │   ├── mobile-shop.tsx                # Mobile shop with filters
│   │   └── product-card-shop.tsx          # Shop-specific product card
│   ├── cart/
│   │   ├── desktop-cart.tsx               # Desktop cart layout
│   │   ├── mobile-cart.tsx                # Mobile cart layout
│   │   └── cart-item.tsx                  # Individual cart item row
│   ├── product/
│   │   ├── desktop-product-page.tsx       # Desktop product detail
│   │   └── mobile-product-page.tsx        # Mobile product detail
│   ├── wishlist/
│   │   ├── desktop-wishlist.tsx           # Desktop wishlist
│   │   └── mobile-wishlist.tsx            # Mobile wishlist
│   ├── auth/
│   │   └── login-form.tsx                 # Role-selection login form
│   ├── dashboard/
│   │   ├── dashboard-layout.tsx           # ERP sidebar + topbar layout
│   │   ├── admin/admin-dashboard.tsx      # Admin dashboard content
│   │   ├── staff/staff-dashboard.tsx      # Staff dashboard content
│   │   ├── customer/customer-dashboard.tsx # Customer dashboard content
│   │   └── forms/
│   │       ├── dashboard-forms.tsx        # Tab container for all forms
│   │       ├── add-brand-form.tsx         # Add Brand form
│   │       ├── add-category-form.tsx      # Add Category form
│   │       ├── add-product-form.tsx       # Add Product form
│   │       ├── add-supplier-form.tsx      # Add Supplier form
│   │       └── add-warranty-plan-form.tsx # Add Warranty Plan form
│   └── ui/                                # 46 shadcn/ui components (pre-installed)
├── data/
│   ├── products.ts                        # 12 dummy products + categories/brands/conditions
│   └── users.ts                           # 3 dummy users + dashboard routes + analytics
├── hooks/
│   ├── use-toast.ts                       # Toast hook
│   └── use-mobile.ts                      # Mobile detection hook
└── lib/
    ├── auth-context.tsx                   # Auth React Context provider
    ├── cart-store.ts                      # Zustand cart store (persisted)
    ├── wishlist-store.ts                  # Zustand wishlist store (persisted)
    ├── db.ts                              # Prisma client
    └── utils.ts                           # Utility functions (cn)
```

---

## 4. Global Design System

### 4.1 Color Palette

| Role | Tailwind Class | Hex Equivalent |
|---|---|---|
| **Primary** | `sky-500` | `#0ea5e9` |
| Primary hover | `sky-600` | `#0284c7` |
| Primary light bg | `sky-50` | `#f0f9ff` |
| Primary border | `sky-400` | `#38bdf8` |
| Text primary | `gray-900` | `#111827` |
| Text secondary | `slate-600` | `#475569` |
| Text muted | `slate-400` | `#94a3b8` |
| Text light | `slate-500` | `#64748b` |
| Background | `white` / `bg-background` | `#ffffff` |
| Page background | `slate-50` / `bg-[#f8f9fa]` | `#f8fafc` / `#f8f9fa` |
| Border default | `slate-200` | `#e2e8f0` |
| Border light | `slate-100` | `#f1f5f9` |
| Success | `emerald-500` / `emerald-50` | `#10b981` / `#ecfdf5` |
| Warning | `amber-500` / `amber-50` | `#f59e0b` / `#fffbeb` |
| Danger | `red-500` / `red-50` | `#ef4444` / `#fef2f2` |
| Accent violet | `violet-500` / `violet-50` | `#8b5cf6` / `#f5f3ff` |
| Accent rose | `rose-500` / `rose-50` | `#f43f5e` / `#fff1f2` |

**No indigo or blue colors used anywhere.** Sky-500 is the sole primary accent.

### 4.2 Typography

| Element | Font | Size | Weight | Class |
|---|---|---|---|---|
| H1 (page title) | Geist Sans | `text-2xl`–`text-3xl` | `font-bold` | `tracking-tight` |
| H2 (section title) | Geist Sans | `text-lg`–`text-xl` | `font-semibold` | `tracking-tight` |
| H3 (card title) | Geist Sans | `text-base` | `font-semibold` | |
| Body text | Geist Sans | `text-sm` | `font-normal` | |
| Small text | Geist Sans | `text-xs` | `font-medium` | |
| Tiny labels | Geist Sans | `text-[10px]`–`text-[11px]` | `font-semibold` | `uppercase tracking-wider` |
| Code/mono values | Geist Mono | `text-sm` | `font-medium` | `font-mono` |
| KPI values | Geist Mono | `text-sm`–`text-3xl` | `font-bold` | `font-mono tracking-tight` |
| ERP labels | Geist Sans | `text-[9px]` | `font-semibold` | `uppercase tracking-wider text-slate-400` |

### 4.3 Spacing & Sizing

**Public pages (homepage, shop, cart, etc.):**
- Container: `max-w-7xl mx-auto px-4 sm:px-6`
- Section gap: `space-y-8`–`space-y-12`
- Card padding: `p-4`–`p-6`
- Grid gap: `gap-4`–`gap-6`

**Dashboard pages (ERP compact):**
- Container: `p-3`
- Section gap: `space-y-3`
- Card padding: `p-2.5`
- Grid gap: `gap-2`–`gap-3`
- KPI strip gap: `gap-2`
- Table row padding: `py-1.5 px-3`
- Button height: `h-7`–`h-8`
- Font sizes: `text-[9px]`–`text-[12px]` for data, `text-xs` for headers

### 4.4 Border Radius

| Element | Class | Notes |
|---|---|---|
| Public cards | `rounded-xl` | 12px radius |
| Dashboard cards | `rounded` | 4px radius |
| Buttons (public) | `rounded-xl` | |
| Buttons (dashboard) | `rounded` | |
| Badges | `rounded-lg` / `rounded-md` / `rounded` | |
| Inputs | `rounded-xl` (public) / default (dashboard) | |
| Avatars | `rounded-full` / `rounded-xl` / `rounded` | |

### 4.5 Shadows

| Element | Class | Notes |
|---|---|---|
| Cards (public) | `shadow-sm` | Subtle lift |
| Cards (dashboard) | `shadow-none` | Flat, borders only |
| Hover lift | `product-card-hover` class | translateY(-4px) + sky shadow |
| Primary button hover | `btn-primary-highlight` | Sky glow + translateY(-1px) |

---

## 5. Shared Layout Components

### 5.1 Desktop Header (`DesktopHeader`)

- **Visibility**: `hidden lg:block`
- **Position**: `sticky top-0 z-50 bg-white border-b border-slate-200`
- **Height**: `h-16`
- **Layout**: `max-w-7xl mx-auto px-6 flex items-center justify-between`
- **Left section**:
  - Logo: `Laptop` icon (w-7 h-7, sky-500) + "ReBoot Tech" text (text-xl, bold)
  - Nav links: Home (`/`), Shop (`/shop`), About (`/#about`)
  - Active nav link: `btn-nav-highlight-active text-sky-600 bg-sky-50 font-semibold`
  - Inactive nav link: `text-slate-600 btn-nav-highlight`
  - Nav spacing: `gap-1`, each link `px-4 py-2 text-sm font-medium rounded-xl`
- **Right section**:
  - Wishlist icon: `Heart` (w-5 h-5), rose-500 badge when items exist
  - Cart icon: `ShoppingCart` (w-5 h-5), sky-500 badge when items exist
  - Badge style: `min-w-[20px] h-5 px-1.5 text-[10px] font-semibold rounded-full`
  - Authenticated: Avatar circle (w-8 h-8, sky-500 bg, white initials) + user name + Logout ghost button
  - Not authenticated: "Sign In" button (sky-500 bg, white text, rounded-xl, h-9, shadow-sm shadow-sky-500/20)

### 5.2 Mobile Header (`MobileHeader`)

- **Visibility**: `lg:hidden`
- **Position**: `sticky top-0 z-50 bg-white border-b border-slate-200`
- **Height**: `h-14`
- **Layout**: `px-4 flex items-center justify-between`
- **Left**: Same logo but smaller (w-6 h-6, text-lg)
- **Right**: Wishlist + Cart icons (smaller badges: `min-w-[18px] h-[18px] text-[9px]`) + Hamburger menu (`Menu` icon, ghost button)
- **Sheet** (slide-in from right, w-[300px]):
  - Sheet header with logo (h-14, border-b border-slate-100)
  - Nav links with same highlight classes, `px-6 py-3 text-sm`
  - Wishlist link with Heart icon + count badge (rose-500)
  - Auth section at bottom (border-t):
    - If authenticated: user card (avatar + name + role), Dashboard button, Logout button
    - If not authenticated: Full-width "Sign In" button

### 5.3 Footer (`Footer`)

- **Position**: `mt-auto` (pushes to bottom via parent `min-h-screen flex flex-col`)
- **Background**: `bg-slate-50 border-t border-slate-200`
- **Padding**: `max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14`
- **4-column grid** (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12`):
  1. **Brand column**: Logo ("ReBoot Tech" — "Re" sky-500, "Tech" slate-500), description text, 🌱 Sustainable badge (emerald), ✓ Certified badge (sky)
  2. **Quick Links**: Shop All, Business Laptops, Premium Laptops, Budget Laptops
  3. **Support**: About Us, Warranty Policy, Refurbishing Process, FAQ
  4. **Contact**: Email (Mail icon, sky-500), Phone (Phone icon, sky-500), Address (MapPin icon, sky-500)
- **Bottom bar**: `mt-10 pt-6 border-t border-slate-200`, copyright left, Privacy/Terms/Cookies links right
- **Text color**: `text-slate-500` for body, `text-gray-900` for headings, hover `text-sky-600`

---

## 6. Page: Homepage (/)

**File**: `src/app/page.tsx`

**Layout structure**: `min-h-screen flex flex-col` → DesktopHeader → MobileHeader → main (flex-1) → DesktopHome + MobileHome → Footer

**Responsive pattern**: Desktop content uses `hidden lg:block`, mobile content uses `lg:hidden`.

### 6.1 Desktop Homepage (11 Sections)

**File**: `src/components/home/desktop-home.tsx`

Sections rendered in order:

1. **Hero Section**
   - Left: H1 "Premium Refurbished Laptops", subtext, CTA buttons ("Shop Now" primary + "Learn More" outline)
   - Right: Decorative laptop icon with `animate-float`
   - Background: gradient from white to sky-50

2. **Hot Deals** — Products filtered by `isHotDeal === true`
   - Section header with flame icon + "Hot Deals" + countdown timer placeholder + "View All" link
   - 4-column grid of `ProductCard` with `variant="hot"`
   - Hot deal cards have pulsing `hot-deal-pulse` animation on the HOT DEAL badge

3. **Top Picks** — Products filtered by `isTopPick === true`
   - Section header with star icon + "Top Picks" + "View All" link
   - 4-column grid of `ProductCard` with `variant="top"`

4. **New Arrivals** — Products filtered by `isNew === true`
   - Section header with sparkles icon + "New Arrivals" + "View All" link
   - 4-column grid of `ProductCard` with `variant="new"`

5. **Certified Refurbished Process** — Visual process flow
   - 4-step horizontal process: Source → Inspect → Refurbish → Certify
   - Each step: numbered circle (sky-500 bg), icon, title, description
   - Connected by dotted lines between steps

6. **Customer Reviews** — 3 review cards
   - Each card: star rating, review text, reviewer name, product purchased, avatar initials
   - Card style: bg-white, border-slate-100, rounded-xl, p-6

7. **Why Choose Refurbished?** — 4 benefit cards
   - Icons: ShieldCheck (Quality), DollarSign (Savings), Leaf (Eco), Clock (Warranty)
   - Each card: icon in colored circle, title, description paragraph
   - Grid: 2×2 on desktop

8. **Browse by Category** — Category cards
   - Categories: Business, Premium, Ultrabook, Budget
   - Each card: laptop icon, category name, product count, arrow link
   - Link to `/shop?category=<name>`

9. **Warranty & Protection** — 3 warranty tier cards
   - Standard (3 months), Extended (6 months), Premium (12 months)
   - Each: shield icon, tier name, duration, feature list with checkmarks, price
   - Active tier (Premium) highlighted with sky-50 bg and sky-500 border

10. **Support & Warranty CTA** — Full-width banner
    - Background: gradient sky-500 to sky-600
    - White text: "Need Help?", description, "Contact Support" button (white bg, sky-500 text)

11. **Newsletter CTA** — Email signup
    - Heading, description, input + "Subscribe" button
    - Background: slate-50

### 6.2 Mobile Homepage

**File**: `src/components/home/mobile-home.tsx`

Same 11 sections but adapted for mobile:
- Horizontal scroll carousels for product grids (instead of 4-column grids)
- Stacked cards for process flow, reviews, benefits
- Full-width section headers
- Smaller padding and font sizes

### 6.3 Product Card Component

**File**: `src/components/home/product-card.tsx`

**Props**: `product: Product`, `variant: "default" | "hot" | "new" | "top"`, `onAddToCart?: () => void`

**Structure** (top to bottom):
1. **Badges** (absolute top-3 left-3):
   - Discount badge: `bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg`
   - "HOT DEAL" badge (if variant="hot"): orange-500 bg, Flame icon, `hot-deal-pulse` animation
   - "NEW" badge (if variant="new"): emerald-500 bg, Sparkles icon
2. **Wishlist button** (absolute top-3 right-3): Heart icon, rose-500 when wishlisted, slate-400 when not
3. **Product image**: `aspect-[4/3]`, gradient bg from-slate-50 to-white, `group-hover:scale-105`
4. **Content area** (p-4):
   - Brand name (text-xs, uppercase, slate-400) + Grade badge (colored by condition)
   - Product name (text-sm, font-semibold, line-clamp-2, hover:text-sky-600)
   - Specs: processor excerpt | RAM
   - StarRating: 5 stars (filled amber-400 / empty slate-200), rating value, review count
   - Price: refurbished price (text-lg, bold) + original price (line-through, slate-400)
   - Warranty: ShieldCheck icon + warranty text (emerald-600)
5. **Add to Cart button**: Full width, sky-500 bg, ShoppingCart icon, "Add to Cart"
   - On click: adds to cart, shows toast notification, button changes to emerald "Added to Cart!" with CheckCircle icon for 2 seconds
   - Out of stock: slate-100 bg, slate-400 text, disabled

**Grade badge colors**:
| Grade | Background |
|---|---|
| A+ | `bg-emerald-500 text-white` |
| A | `bg-sky-500 text-white` |
| B+ | `bg-amber-500 text-white` |
| B | `bg-red-500 text-white` |

**Card hover**: `product-card-hover` class — translateY(-4px) + sky shadow

---

## 7. Page: Shop (/shop)

**File**: `src/app/shop/page.tsx`

**Layout**: Same as homepage — DesktopHeader + MobileHeader + main + Footer, bg-white

### 7.1 Desktop Shop

**File**: `src/components/shop/desktop-shop.tsx`

- **Page header**: "Shop Refurbished Laptops" heading + product count
- **Filter bar**: Horizontal row of filter buttons
  - Categories: All, Business, Premium, Ultrabook, Budget — uses `btn-filter-highlight` / `btn-filter-active`
  - Brands: All, Lenovo, Apple, Dell, HP, Microsoft, ASUS, Acer
  - Conditions: All, A+, A, B+, B
- **Product grid**: 3-column grid of `ProductCardShop` components
- **Sort dropdown**: "Sort by" select (Price Low→High, Price High→Low, Rating, Newest)
- **Active filter styling**: `btn-filter-active` = sky-500 bg, white text, font-semibold

### 7.2 Mobile Shop

**File**: `src/components/shop/mobile-shop.tsx`

- Same filters in horizontal scroll
- 2-column product grid
- No sort dropdown (simplified)

### 7.3 Shop Product Card

**File**: `src/components/shop/product-card-shop.tsx`

Same structure as homepage `ProductCard` but with:
- Compact layout (smaller padding)
- No variant prop (no hot/new badges)
- Link to `/product/${product.id}` on the whole card

---

## 8. Page: Product Detail (/product/[id])

**File**: `src/app/product/[id]/page.tsx`

**Layout**: DesktopHeader + MobileHeader + main + Footer

### Desktop Product Page

**File**: `src/components/product/desktop-product-page.tsx`

- **Left column**: Large product image, thumbnail gallery below
- **Right column**:
  - Brand + condition badge
  - Product name (text-2xl, bold)
  - Star rating + review count
  - Price: refurbished (text-3xl, bold) + original (line-through)
  - Discount percentage badge
  - Specs table: Processor, RAM, Storage, Display
  - Warranty info with ShieldCheck icon
  - Quantity selector (+ / - buttons)
  - "Add to Cart" button (sky-500, full width)
  - "Add to Wishlist" button (outline)
  - Description text
  - Shipping info, return policy sections

### Mobile Product Page

**File**: `src/components/product/mobile-product-page.tsx`

- Stacked layout: image on top, content below
- Smaller fonts and tighter padding
- Same information as desktop

---

## 9. Page: Cart (/cart)

**File**: `src/app/cart/page.tsx`

**Layout**: DesktopHeader + MobileHeader + desktop cart / mobile cart + Footer, bg-white

### Desktop Cart

**File**: `src/components/cart/desktop-cart.tsx`

- **Two-column layout** (2/3 + 1/3):
  - **Left**: Cart items list (Cart Item components) with "Shopping Cart" header + item count
  - **Right**: Order Summary card
    - Subtotal, Shipping, Tax, Total
    - "Proceed to Checkout" button (sky-500, full width)
    - "Continue Shopping" link
- Empty state: illustration + "Your cart is empty" + "Start Shopping" link

### Mobile Cart

**File**: `src/components/cart/mobile-cart.tsx`

- Stacked: Cart items list on top, Order Summary below
- Smaller text and padding

### Cart Item

**File**: `src/components/cart/cart-item.tsx`

- Product image (small, 80×80)
- Name, brand, specs
- Quantity controls: - / count / + buttons (border rounded)
- Item total price (font-mono, font-semibold)
- Remove button (Trash2 icon, ghost variant, red on hover)
- Divider line between items

---

## 10. Page: Wishlist (/wishlist)

**File**: `src/app/wishlist/page.tsx`

**Layout**: DesktopHeader + MobileHeader + main + Footer, bg-white

### Desktop Wishlist

**File**: `src/components/wishlist/desktop-wishlist.tsx`

- "My Wishlist" header with heart icon + item count
- 3-column grid of wishlist product cards
- Each card: product image, name, price, "Add to Cart" button, "Remove" button (X icon)
- Empty state: Heart icon + "Your wishlist is empty" + "Browse Products" link

### Mobile Wishlist

**File**: `src/components/wishlist/mobile-wishlist.tsx`

- 2-column grid
- Same card structure, smaller

---

## 11. Page: Login (/login)

**File**: `src/app/login/page.tsx`

**Layout**: DesktopHeader + MobileHeader + centered LoginForm + Footer, bg-gray-50

### Login Form

**File**: `src/components/auth/login-form.tsx`

- **Container**: `max-w-md mx-auto`, centered
- **Top decoration**: 3px dashed sky-500 stripe (`repeating-linear-gradient`)
- **Card**: bg-white, border-slate-200, rounded-b-xl, shadow-lg, p-6 sm:p-8

**Elements** (top to bottom):

1. **Logo**: Laptop icon + "ReBoot Tech" (centered)
2. **Title**: "SIGN IN" (text-lg, font-semibold, centered)
3. **Subtitle**: "Select your role to continue" (text-sm, slate-400)
4. **Role selection cards** (3-column grid):
   - **Customer**: User icon, "Customer", "Shop & Track Orders"
   - **Staff**: Briefcase icon, "Staff", "Manage Orders & Inventory"
   - **Administrator**: Shield icon, "Administrator", "Full System Control"
   - Selected card: `bg-sky-50 border-sky-500 shadow-sm`, icon in `bg-sky-500 text-white`
   - Unselected: `border-slate-200 bg-white`, icon in `bg-slate-100 text-slate-400`
   - Description text hidden on smallest screens (`hidden sm:block`)
5. **Email field**: Read-only, auto-filled based on selected role, `font-mono`
6. **Password field**: Placeholder "Enter any password", `font-mono`
7. **Sign In button**: Full width, sky-500 bg, `btn-primary-highlight`
   - Loading state: spinning border animation + "Signing In..."
8. **Footer hint**: "Demo account — any password works" (text-[10px], font-mono, slate-400)

**Dummy users**:
| Role | Email | Name | Avatar |
|---|---|---|---|
| Customer | alex@example.com | Alex Johnson | AJ |
| Staff | sarah@reboottech.com | Sarah Miller | SM |
| Admin | david@reboottech.com | David Chen | DC |

---

## 12. Page: Admin Dashboard (/dashboard/admin)

**Layout**: DashboardLayout (ERP style) → AdminDashboard content

### 12.1 Dashboard Layout (Shared)

**File**: `src/components/dashboard/dashboard-layout.tsx`

**Desktop layout** (`hidden lg:flex`):
- **Sidebar**: Fixed left, w-[200px], h-screen, border-r border-slate-200, bg-white
  - **Logo**: Laptop icon (w-4 h-4) + "ReBoot Tech" (text-sm, bold), py-2.5, border-b
  - **Role label**: text-[9px], uppercase, tracking-[0.2em], slate-400
  - **Navigation**: text-xs font-medium, `px-2 py-1.5 rounded`, `my-px`
    - Active: `bg-sky-50 text-sky-600 font-semibold`, icon `text-sky-500`
    - Inactive: `text-slate-500 hover:text-slate-700 hover:bg-slate-50`, icon `text-slate-400`
  - **User section**: 6×6 avatar (sky-500 bg), name (text-[11px]), email (text-[9px], slate-400)
  - **Sign Out**: ghost button, text-[11px], h-7

- **Top Bar**: h-10, border-b border-slate-200, bg-white
  - Left: Breadcrumb "Home > [Current Page]" (text-xs)
  - Right: Search button, Notification bell (with sky-500 dot), separator, avatar + name

**Mobile layout** (`lg:hidden`):
- Sticky header h-10: logo + notification bell + avatar + hamburger menu
- Sheet: w-[240px] sidebar content

### 12.2 Admin Dashboard Content

**File**: `src/components/dashboard/admin/admin-dashboard.tsx`

**Page structure** (p-3, space-y-3):

1. **Page header**: "Admin Dashboard" (text-base, bold) + welcome text (text-[11px]) + action buttons row (Users, Analytics, Settings)

2. **KPI Strip** — 6 metrics in single row (`grid-cols-6 gap-2`):
   | KPI | Value | Change | Icon Color | Icon BG |
   |---|---|---|---|---|
   | Revenue | $124,580 | +12.5% ↑ | emerald-600 | emerald-50 |
   | Orders | 342 | +8.2% ↑ | sky-500 | sky-50 |
   | Customers | 189 | +15.3% ↑ | violet-600 | violet-50 |
   | Avg. Value | $364 | +3.1% ↑ | amber-600 | amber-50 |
   | Returns | 7 | -2.1% ↓ | red-500 | red-50 |
   | Fulfillment | 96.4% | +1.2% ↑ | emerald-600 | emerald-50 |

   **Each KPI cell**: `bg-white border border-slate-200 rounded px-2.5 py-2 flex items-center gap-2`
   - Icon: 3×3 in colored bg p-1.5 rounded
   - Value: text-sm, bold, font-mono
   - Label + change: text-[9px], change with ArrowUpRight/ArrowDownRight icon

3. **Revenue Chart + Activity Feed** (`grid-cols-3 gap-3`):
   - **Chart** (col-span-2): Monthly Revenue bar chart, h-[180px], Recharts BarChart, sky-500 fill, `rounded-[3px]` bars
   - **Activity Feed**: 6 recent activities, each with icon (3×3 in slate-50 p-1 rounded), action text (text-[11px]), time (text-[9px], font-mono, slate-400), detail (text-[10px], slate-400)

4. **Recent Orders + Top Products** (`grid-cols-3 gap-3`):
   - **Orders Table** (col-span-2): Dense table with 9px uppercase headers, 11px font-mono data, compact `py-1.5 px-3` rows, colored status badges
     - Status colors: Delivered=emerald, In Transit=sky, Processing=amber, Cancelled=red
   - **Top Products**: Ranked list (1-5), product name, units sold, revenue, stock count (red if ≤5)

5. **Quick Module Links** (`grid-cols-4 gap-2`):
   - Staff Management, Product Catalog, Analytics, System Settings
   - Each: icon (colored) + label + arrow, `bg-white border border-slate-200 rounded px-3 py-2 text-[11px]`
   - Hover: border-sky-300, text-sky-600, bg-sky-50/50

6. **Data Entry Forms Section**: "DATA ENTRY" heading + `DashboardForms` component

---

## 13. Page: Staff Dashboard (/dashboard/staff)

**File**: `src/components/dashboard/staff/staff-dashboard.tsx`

Same layout wrapper as admin. Content structure (p-3, space-y-3):

1. **Page header**: "Hello, [name]" + "Shift overview for today" + buttons (Orders, QC, Inventory)

2. **KPI Strip** — 6 metrics:
   | KPI | Value | Change |
   |---|---|---|
   | Orders Today | 12 | +3 ↑ |
   | QC Pending | 8 | +2 ↓ |
   | Low Stock | 3 | -1 ↑ |
   | Queries | 5 | +2 ↓ |
   | Shipped | 9 | +4 ↑ |
   | Refurb Done | 6 | +1 ↑ |

3. **Task Queue + Activity Feed** (`grid-cols-3 gap-3`):
   - **Task Queue** (col-span-2): 5 tasks with ID (font-mono), priority badge (High=red, Medium=amber, Low=slate), status badge (Pending=amber, In Progress=sky, Done=emerald), product + task type
   - **Activity Feed**: 6 recent items with icon, action, detail, timestamp

4. **Inventory Alerts + Quick Actions** (`grid-cols-3 gap-3`):
   - **Inventory Alerts** (col-span-2): 4 items with severity dot (red=critical, amber=warning), product name, stock/threshold ratio, severity badge
   - **Quick Actions**: 4 color-coded links (Process Orders=sky, Start QC=amber, Update Stock=emerald, Customer Queries=violet)

---

## 14. Page: Customer Dashboard (/dashboard/customer)

**File**: `src/components/dashboard/customer/customer-dashboard.tsx`

Same layout wrapper. Content structure (p-3, space-y-3):

1. **Page header**: "Welcome, [name]" + "Here's your account overview" + buttons (Shop, Track, Support)

2. **KPI Strip** — 6 metrics:
   | KPI | Value |
   |---|---|
   | Total Orders | 5 |
   | Active | 2 |
   | Wishlist | 3 |
   | Points | 1,250 |
   | Saved | $847 |
   | Warranty | 3 Active |

3. **Orders Table + Order Timeline** (`grid-cols-3 gap-3`):
   - **Orders Table** (col-span-2): Same dense format as admin, with status icons inside badges
   - **Order Timeline**: 4 timeline events with icon, event description, order ID, timestamp

4. **Active Warranties + Quick Actions** (`grid-cols-3 gap-3`):
   - **Active Warranties** (col-span-2): 3 warranty entries with ShieldCheck icon, product name, warranty type + order ID, "Active" badge (emerald), expiry date
   - **Quick Actions**: 4 color-coded links (Shop New Arrivals=sky, View Wishlist=rose, Return/Exchange=emerald, Contact Support=violet)

---

## 15. Dashboard Data Entry Forms

**File**: `src/components/dashboard/forms/dashboard-forms.tsx`

### 15.1 Tab Navigation

- **Container**: `bg-white border border-slate-200 rounded p-1`, flex row
- **5 tabs** with icon + label:
  | Tab | Icon | Color | BG |
  |---|---|---|---|
  | Brand | Tag | sky-500 | sky-50 |
  | Category | FolderTree | violet-500 | violet-50 |
  | Product | Package | emerald-500 | emerald-50 |
  | Supplier | Truck | amber-500 | amber-50 |
  | Warranty | ShieldCheck | rose-500 | rose-50 |

- **Active tab**: `[color bg] [color text] font-semibold`, `px-3 py-1.5 rounded text-[11px]`
- **Inactive tab**: `text-slate-500 hover:text-slate-700 hover:bg-slate-50`

### 15.2 Add Brand Form

**Fields**:
| Field | Type | Required | Validation |
|---|---|---|---|
| Brand Name | Input | ✅ | Min 2 chars |
| URL Slug | Input (mono) | ✅ | Lowercase + numbers + hyphens; auto-generated from name |
| Country of Origin | Input | ✅ | Non-empty |
| Website | Input | ❌ | Must be valid URL (https://...) |
| Logo URL | Input | ❌ | — |
| Description | Textarea (2 rows) | ❌ | Max 500 chars, char counter |
| Active | Switch | — | Default: on |
| Featured | Switch | — | Default: off |

**Submit**: `h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white rounded px-5`
**Swal on validation error**: icon=error, title="Validation Failed", text="Please fix the highlighted errors before submitting."
**Swal on success**: icon=success, title="Brand Added!", html with brand name + slug

### 15.3 Add Category Form

**Fields**:
| Field | Type | Required | Validation |
|---|---|---|---|
| Category Name | Input | ✅ | Min 2 chars |
| URL Slug | Input (mono) | ✅ | Lowercase + numbers + hyphens; auto-generated |
| Parent Category | Select | ❌ | Options: None (Top Level), Laptops, Accessories, Components, Software |
| Sort Order | Input (mono) | ❌ | Must be numeric |
| Category Image URL | Input | ❌ | — |
| Description | Textarea (2 rows) | ❌ | Max 300 chars, char counter |
| Active | Switch | — | Default: on |
| Show in Menu | Switch | — | Default: on |

**Swal on success**: title="Category Added!", html with name + parent info

### 15.4 Add Product Form

**Fields** (most comprehensive form):
| Field | Type | Required | Validation |
|---|---|---|---|
| Product Name | Input | ✅ | Non-empty |
| Brand | Select | ✅ | Options: Lenovo, Apple, Dell, HP, ASUS, Acer, Microsoft, Samsung |
| Category | Select | ✅ | Options: Business Laptops, Ultrabooks, Gaming Laptops, Workstations, Budget Laptops, 2-in-1 Convertibles |
| SKU | Input (mono) | ✅ | Non-empty |
| Original Price | Input (number, mono) | ✅ | > 0 |
| Selling Price | Input (number, mono) | ✅ | > 0, must be less than original |
| Grade | Select | ✅ | Options: A+, A, B+, B |
| Stock | Input (number, mono) | ✅ | ≥ 0 |
| Processor | Input | ✅ | Non-empty |
| RAM | Select | ✅ | Options: 4GB, 8GB, 16GB, 32GB, 64GB |
| Storage | Select | ✅ | Options: 128GB SSD through 2TB SSD |
| Screen Size | Input | ❌ | — |
| Battery Health | Input | ❌ | — |
| Condition | Select | ✅ | Options: Excellent, Good, Fair, Refurbished |
| Description | Textarea (3 rows) | ❌ | Max 1000 chars, char counter |
| Hot Deal | Checkbox | — | Default: off |
| New Arrival | Checkbox | — | Default: on |
| Top Pick | Checkbox | — | Default: off |
| Active | Switch | — | Default: on |

**Swal on success**: title="Product Added!", html with name + brand + grade + discount% + SKU

### 15.5 Add Supplier Form

**Fields**:
| Field | Type | Required | Validation |
|---|---|---|---|
| Supplier Name | Input | ✅ | Min 2 chars |
| Contact Person | Input | ✅ | Non-empty |
| Email | Input (email) | ✅ | Valid email format |
| Phone | Input | ✅ | Valid phone format (6+ digits) |
| Supplier Type | Select | ✅ | Options: OEM Partner, Wholesaler, Distributor, Recycling Partner, Independent Seller |
| Payment Terms | Select | ✅ | Options: Net 15/30/45/60, Prepaid, COD |
| Address | Input | ❌ | — |
| City | Input | ✅ | Non-empty |
| Country | Input | ✅ | Non-empty |
| Tax ID / VAT | Input (mono) | ❌ | — |
| Notes | Textarea (2 rows) | ❌ | Max 500 chars, char counter |
| Active | Switch | — | Default: on |

**Swal on success**: title="Supplier Added!", html with name + type + payment terms

### 15.6 Add Warranty Plan Form

**Fields**:
| Field | Type | Required | Validation |
|---|---|---|---|
| Plan Name | Input | ✅ | Min 3 chars |
| Plan Type | Select | ✅ | Options: Standard, Premium, Extended, Accidental Damage |
| Duration (months) | Select | ✅ | Options: 6, 12, 18, 24, 36, 48, 60 |
| Coverage Level | Select | ✅ | Options: Basic, Comprehensive, Full Coverage |
| Plan Price | Input (number, mono, step 0.01) | ✅ | > 0 |
| Max Claim Value | Input (number, mono) | ✅ | > 0 |
| Description | Textarea (2 rows) | ❌ | Max 500 chars, char counter |
| Terms & Conditions | Textarea (3 rows) | ❌ | Max 2000 chars, char counter |
| Extended Warranty | Switch | — | Default: off |
| Accidental Damage | Switch | — | Default: off |
| Battery Coverage | Switch | — | Default: on |
| Active | Switch | — | Default: on |

**Swal on success**: title="Warranty Plan Created!", html with name + type + duration + price

### 15.7 Common Form Patterns

- **Card**: `bg-white border border-slate-200 rounded shadow-none`
- **Card header**: `p-2.5 pb-0`, icon in colored bg p-1.5 rounded + title (text-xs, font-semibold)
- **Card content**: `p-2.5 pt-1`
- **Form spacing**: `space-y-2.5`
- **Input height**: `h-8 text-[12px]`
- **Error state**: `border-red-400 focus-visible:ring-red-200`
- **Error message**: `text-[10px] text-red-500`
- **Required indicator**: `<span className="text-red-500">*</span>` after label
- **Char counter**: `text-[9px] text-slate-400` right-aligned
- **Switch**: shadcn/ui Switch component, label in `text-[11px] text-slate-600`
- **Select**: shadcn/ui Select, trigger `h-8 text-[12px] border-slate-200`
- **Submit button**: `h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1.5 rounded px-5`
- **Loading state**: Button text changes to "Saving...", button disabled
- **Simulated API delay**: 800-1000ms `setTimeout`

### 15.8 SweetAlert2 Configuration

All Swal alerts share these common properties:
```typescript
{
  confirmButtonColor: "#0ea5e9",
  background: "#fff",
  color: "#1e293b",
}
```

**Error alert** (validation failure):
```typescript
{
  icon: "error",
  title: "Validation Failed",
  text: "Please fix the highlighted errors before submitting.",
}
```

**Success alert** (after simulated save):
```typescript
{
  icon: "success",
  title: "[Entity] Added!",
  html: "<strong>[name]</strong> has been added/created.<br/><span style='color:#94a3b8;font-size:13px'>[detail line]</span>",
}
```

---

## 16. State Management

### 16.1 Cart Store (`useCartStore`)

**Persistence**: Zustand + `persist` middleware → localStorage key `"reboot-cart"`

**Interface**:
```typescript
interface CartStore {
  items: CartItem[];          // { product: Product; quantity: number }
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
```

**Behavior**:
- `addItem`: If product exists, increment quantity; else add with quantity=1
- `updateQuantity`: If quantity ≤ 0, calls removeItem
- `getTotalItems`: Sum of all item quantities
- `getTotalPrice`: Sum of (refurbishedPrice × quantity) for all items

### 16.2 Wishlist Store (`useWishlistStore`)

**Persistence**: localStorage key `"reboot-wishlist"`

**Interface**:
```typescript
interface WishlistStore {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getTotalItems: () => number;
}
```

**Behavior**:
- `addItem`: No duplicates (checks by product.id)
- `toggleItem`: Adds if not present, removes if present
- `isInWishlist`: Returns boolean for product ID

### 16.3 Auth Context (`AuthProvider`)

**Not persisted** — resets on page reload.

**Interface**:
```typescript
interface AuthContextType {
  user: DummyUser | null;
  role: UserRole | null;       // "customer" | "staff" | "admin"
  login: (role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
```

**Behavior**:
- `login(role)`: Sets user to `dummyUsers[role]`, sets role
- `logout()`: Sets user and role to null

---

## 17. Data Models

### 17.1 Product

```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  processor: string;
  ram: string;
  storage: string;
  display: string;
  condition: "A+" | "A" | "B+" | "B";
  originalPrice: number;
  refurbishedPrice: number;
  discount: number;           // Percentage off
  image: string;              // SVG path like /products/thinkpad-x1.svg
  category: string;           // "Business" | "Premium" | "Ultrabook" | "Budget"
  inStock: boolean;
  warranty: string;           // "3 Months" | "6 Months" | "12 Months"
  description: string;
  rating: number;             // 1.0–5.0
  reviewCount: number;
  isHotDeal: boolean;
  isNew: boolean;
  isTopPick: boolean;
}
```

**12 dummy products**: ThinkPad X1 Carbon, MacBook Pro 13" M1, Dell Latitude 5520, HP EliteBook 840 G8, Surface Laptop 4, MacBook Air M1, ThinkPad T14 Gen 2, ASUS ZenBook 14, Dell XPS 13 9310, HP ProBook 450 G8, Acer Swift 3, Lenovo IdeaPad 3

**Filter constants**:
- Categories: `["All", "Business", "Premium", "Ultrabook", "Budget"]`
- Brands: `["All", "Lenovo", "Apple", "Dell", "HP", "Microsoft", "ASUS", "Acer"]`
- Conditions: `["All", "A+", "A", "B+", "B"]`

### 17.2 DummyUser

```typescript
interface DummyUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;            // 2-letter initials
}
```

### 17.3 Dashboard Routes

Per-role sidebar navigation items:

**Customer**: Overview, My Orders, Wishlist, My Profile, Support
**Staff**: Overview, Order Management, Inventory, Quality Checks, Customer Queries
**Admin**: Overview, User Management, Product Catalog, Analytics, Settings, Staff Management

### 17.4 Analytics Data

```typescript
{
  totalRevenue: 124580,
  totalOrders: 342,
  totalCustomers: 189,
  avgOrderValue: 364,
  monthlyRevenue: [
    { month: "Aug", value: 15200 },
    { month: "Sep", value: 18400 },
    { month: "Oct", value: 16800 },
    { month: "Nov", value: 21200 },
    { month: "Dec", value: 24600 },
    { month: "Jan", value: 28380 },
  ]
}
```

### 17.5 Order Data

5 dummy orders with statuses: Delivered, In Transit, Processing, Cancelled

---

## 18. CSS Utility Classes & Animations

### 18.1 Button Hover Classes

| Class | Effect | Used On |
|---|---|---|
| `btn-primary-highlight` | Sky glow shadow + translateY(-1px) on hover; translateY(0) on active | Primary CTA buttons |
| `btn-outline-highlight` | sky-50 bg + sky-400 border + sky-700 text + subtle shadow on hover | Outline/secondary buttons |
| `btn-ghost-highlight` | sky-50 bg + sky-700 text on hover | Ghost/subtle buttons |
| `btn-nav-highlight` | sky-50 bg + sky-500 text on hover | Nav links |
| `btn-nav-highlight-active` | sky-50 bg + sky-500 text + font-weight 600 | Active nav link |
| `btn-filter-highlight` | sky-50 bg + sky-700 text + sky-400 border on hover | Filter chips |
| `btn-filter-active` | sky-500 bg + white text + font-weight 600 | Selected filter chip |

### 18.2 Card & Layout Classes

| Class | Effect |
|---|---|
| `product-card-hover` | translateY(-4px) + sky shadow on hover, 0.25s ease transition |
| `section-fade-top` | 1px gradient line (transparent → sky-500/15 → transparent) via ::before pseudo |
| `hot-deal-pulse` | Opacity pulse 1→0.7→1, 2s infinite |
| `animate-float` | translateY(0)→translateY(-8px)→translateY(0), 4s infinite |

### 18.3 Grade Badge Classes

| Class | Background |
|---|---|
| `grade-a-plus` | `#10B981` (emerald), white text |
| `grade-a` | `#0EA5E9` (sky), white text |
| `grade-b-plus` | `#F59E0B` (amber), white text |
| `grade-b` | `#EF4444` (red), white text |

### 18.4 Scrollbar Utilities

| Class | Effect |
|---|---|
| `custom-scrollbar` | 6px width, transparent track, slate-300 thumb, rounded |
| `scrollbar-hide` | Completely hidden scrollbar (all browsers) |

### 18.5 CSS Variables (Light Theme)

All defined in `:root`:
- `--radius: 0.625rem`
- `--background: oklch(1 0 0)` (white)
- `--foreground: oklch(0.09 0 0)` (near-black)
- `--primary: oklch(0.6 0.18 230)` (sky-500 equivalent)
- `--border: oklch(0.922 0 0)` (slate-200 equivalent)
- Custom colors: `--color-electric: #0EA5E9`, `--color-eco: #10B981`, `--color-warm: #F59E0B`, `--color-slate: #1E293B`

### 18.6 Responsive Breakpoints

Uses Tailwind default breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px (primary desktop/mobile split)
- `xl`: 1280px

**Desktop/mobile split pattern**: Desktop components use `hidden lg:block`, mobile components use `lg:hidden`.

---

*Document version: 1.0 — Covers all UI elements as of the current codebase state.*
