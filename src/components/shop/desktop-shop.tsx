"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ProductCardShop } from "@/components/shop/product-card-shop";
import { products, categories, brands, conditions, Product } from "@/data/products";

type SortOption = "price-asc" | "price-desc" | "discount" | "name";

const MIN_PRICE = 200;
const MAX_PRICE = 1000;

export function DesktopShop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");

  const filteredProducts = useMemo(() => {
    let result = products.filter((p: Product) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedBrand !== "All" && p.brand !== selectedBrand) return false;
      if (selectedCondition !== "All" && p.condition !== selectedCondition) return false;
      if (p.refurbishedPrice < priceRange[0] || p.refurbishedPrice > priceRange[1]) return false;
      return true;
    });

    switch (sortBy) {
      case "price-asc":
        result.sort((a: Product, b: Product) => a.refurbishedPrice - b.refurbishedPrice);
        break;
      case "price-desc":
        result.sort((a: Product, b: Product) => b.refurbishedPrice - a.refurbishedPrice);
        break;
      case "discount":
        result.sort((a: Product, b: Product) => b.discount - a.discount);
        break;
      case "name":
        result.sort((a: Product, b: Product) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [selectedCategory, selectedBrand, selectedCondition, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedBrand("All");
    setSelectedCondition("All");
    setPriceRange([MIN_PRICE, MAX_PRICE]);
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedBrand !== "All" ||
    selectedCondition !== "All" ||
    priceRange[0] !== MIN_PRICE ||
    priceRange[1] !== MAX_PRICE;

  return (
    <div className="hidden lg:block">
      {/* Top Bar: Breadcrumb + Result Count + Sort */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between py-4 border-b border-slate-200">
          {/* Breadcrumb */}
          <div className="flex items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-slate-500 hover:text-sky-600 font-mono text-xs">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-mono text-xs text-gray-900 font-semibold">
                    Shop
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <span className="text-xs text-slate-400 font-mono">
              {filteredProducts.length} PRODUCT{filteredProducts.length !== 1 ? "S" : ""}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-500 tracking-wide uppercase">Sort by</span>
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px] h-8 rounded-xl font-mono text-xs border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc" className="font-mono text-xs">Price: Low to High</SelectItem>
                <SelectItem value="price-desc" className="font-mono text-xs">Price: High to Low</SelectItem>
                <SelectItem value="discount" className="font-mono text-xs">Discount</SelectItem>
                <SelectItem value="name" className="font-mono text-xs">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Main Content: Sidebar + Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <aside className="w-[240px] flex-shrink-0">
            <div className="border border-slate-200 rounded-xl p-5 sticky top-[84px]">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-gray-900">
                  <Filter className="w-3.5 h-3.5 inline mr-1.5" />
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-semibold text-sky-500 hover:underline tracking-wide btn-ghost-highlight px-2 py-1 rounded-lg"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-5">
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-3">
                  Category
                </h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors ${
                        selectedCategory === cat
                          ? "btn-filter-active"
                          : "text-slate-600 btn-filter-highlight border border-transparent"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Brand Filter */}
              <div className="mb-5">
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-3">
                  Brand
                </h3>
                <div className="space-y-1.5">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`block w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors ${
                        selectedBrand === brand
                          ? "btn-filter-active"
                          : "text-slate-600 btn-filter-highlight border border-transparent"
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Condition Filter */}
              <div className="mb-5">
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-3">
                  Condition
                </h3>
                <div className="space-y-1.5">
                  {conditions.map((cond) => {
                    const condColors: Record<string, string> = {
                      "A+": "#10B981",
                      A: "#0EA5E9",
                      "B+": "#F59E0B",
                      B: "#EF4444",
                    };
                    return (
                      <button
                        key={cond}
                        onClick={() => setSelectedCondition(cond)}
                        className={`flex items-center gap-2 w-full text-left px-3 py-1.5 rounded-xl text-xs transition-colors ${
                          selectedCondition === cond
                            ? "btn-filter-active"
                            : "text-slate-600 btn-filter-highlight border border-transparent"
                        }`}
                      >
                        {cond !== "All" && (
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: condColors[cond] }}
                          />
                        )}
                        {cond === "All" ? "All" : `Grade ${cond}`}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Price Range */}
              <div>
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-slate-500 mb-3">
                  Price Range
                </h3>
                <Slider
                  value={priceRange}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  step={25}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  className="w-full mb-3"
                />
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-slate-300" />
                </div>
                <p className="text-sm font-mono text-slate-500 mb-2">No products match your filters</p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-xl font-semibold text-xs tracking-wide btn-ghost-highlight"
                >
                  CLEAR FILTERS
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-5">
                {filteredProducts.map((product) => (
                  <ProductCardShop key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
