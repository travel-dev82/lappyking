"use client";

import { useState, useMemo } from "react";
import { ChevronRight, Filter, SlidersHorizontal, X } from "lucide-react";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
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

export function MobileShop() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");
  const [filterOpen, setFilterOpen] = useState(false);

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

  const activeFilterCount = [
    selectedCategory !== "All",
    selectedBrand !== "All",
    selectedCondition !== "All",
    priceRange[0] !== MIN_PRICE || priceRange[1] !== MAX_PRICE,
  ].filter(Boolean).length;

  return (
    <div className="lg:hidden">
      {/* Top Bar: Breadcrumb */}
      <div className="px-4 pt-3 pb-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-gray-500 hover:text-[#0096D6] font-mono text-[11px]">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <ChevronRight className="w-3 h-3 text-gray-300" />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-mono text-[11px] text-[#0a0a0a] font-semibold">
                Shop
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Sort + Filter Controls */}
      <div className="px-4 pb-3 flex items-center gap-3 sticky top-[56px] z-30 bg-white border-b border-gray-200 py-2.5">
        {/* Sort */}
        <div className="flex-1">
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
            <SelectTrigger className="w-full h-9 rounded-sm font-mono text-xs border-gray-200">
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

        {/* Filter Button */}
        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="h-9 rounded-sm font-mono text-xs tracking-wider border-gray-200 relative"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              FILTER
              {activeFilterCount > 0 && (
                <span className="ml-1.5 w-5 h-5 rounded-full bg-[#0096D6] text-white text-[10px] flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 rounded-r-sm">
            <SheetHeader className="px-5 pt-5 pb-3 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <SheetTitle className="text-sm font-mono font-bold tracking-widest uppercase text-[#0a0a0a]">
                  <Filter className="w-3.5 h-3.5 inline mr-1.5" />
                  Filters
                </SheetTitle>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[10px] font-mono text-[#0096D6] hover:underline tracking-wider"
                  >
                    CLEAR ALL
                  </button>
                )}
              </div>
            </SheetHeader>

            <div className="overflow-y-auto max-h-[calc(100vh-140px)] px-5 py-4">
              {/* Category Filter */}
              <div className="mb-5">
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-3">
                  Category
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors ${
                        selectedCategory === cat
                          ? "bg-[#0096D6] text-white font-semibold"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-3">
                  Brand
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {brands.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-colors ${
                        selectedBrand === brand
                          ? "bg-[#0096D6] text-white font-semibold"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-3">
                  Condition
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {conditions.map((cond) => {
                    const condColors: Record<string, string> = {
                      "A+": "#10B981",
                      A: "#0096D6",
                      "B+": "#F59E0B",
                      B: "#EF4444",
                    };
                    return (
                      <button
                        key={cond}
                        onClick={() => setSelectedCondition(cond)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-mono transition-colors ${
                          selectedCondition === cond
                            ? "bg-[#0a0a0a] text-white font-semibold"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                <h3 className="text-[11px] font-mono font-bold tracking-widest uppercase text-gray-500 mb-3">
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
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>

            <SheetFooter className="px-5 py-4 border-t border-gray-100">
              <SheetClose asChild>
                <Button className="w-full bg-[#0096D6] hover:bg-[#0078AE] text-white font-mono text-xs tracking-wider rounded-sm">
                  SHOW {filteredProducts.length} RESULT{filteredProducts.length !== 1 ? "S" : ""}
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Result Count */}
      <div className="px-4 py-2">
        <span className="text-[11px] text-gray-400 font-mono tracking-wider">
          {filteredProducts.length} PRODUCT{filteredProducts.length !== 1 ? "S" : ""} FOUND
        </span>
      </div>

      {/* Product Grid */}
      <div className="px-4 pb-6">
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 rounded-sm bg-gray-100 flex items-center justify-center mb-4">
              <Filter className="w-5 h-5 text-gray-300" />
            </div>
            <p className="text-xs font-mono text-gray-500 mb-3">No products match your filters</p>
            <Button
              variant="outline"
              onClick={clearFilters}
              className="rounded-sm font-mono text-xs tracking-wider"
            >
              CLEAR FILTERS
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <ProductCardShop key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
