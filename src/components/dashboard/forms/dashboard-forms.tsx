"use client";

import { useState } from "react";
import { Tag, FolderTree, Package, Truck, ShieldCheck } from "lucide-react";
import { AddBrandForm } from "./add-brand-form";
import { AddCategoryForm } from "./add-category-form";
import { AddProductForm } from "./add-product-form";
import { AddSupplierForm } from "./add-supplier-form";
import { AddWarrantyPlanForm } from "./add-warranty-plan-form";

const tabs = [
  { id: "brand", label: "Brand", icon: Tag, color: "text-sky-500", bg: "bg-sky-50" },
  { id: "category", label: "Category", icon: FolderTree, color: "text-violet-500", bg: "bg-violet-50" },
  { id: "product", label: "Product", icon: Package, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "supplier", label: "Supplier", icon: Truck, color: "text-amber-500", bg: "bg-amber-50" },
  { id: "warranty", label: "Warranty", icon: ShieldCheck, color: "text-rose-500", bg: "bg-rose-50" },
] as const;

type TabId = typeof tabs[number]["id"];

const formMap: Record<TabId, React.ComponentType> = {
  brand: AddBrandForm,
  category: AddCategoryForm,
  product: AddProductForm,
  supplier: AddSupplierForm,
  warranty: AddWarrantyPlanForm,
};

export function DashboardForms() {
  const [activeTab, setActiveTab] = useState<TabId>("brand");
  const ActiveForm = formMap[activeTab];

  return (
    <div className="space-y-3">
      {/* Tab bar — compact ERP style */}
      <div className="flex items-center gap-1 bg-white border border-slate-200 rounded p-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-medium transition-colors ${
                isActive
                  ? `${tab.bg} ${tab.color} font-semibold`
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Active form */}
      <ActiveForm />
    </div>
  );
}
