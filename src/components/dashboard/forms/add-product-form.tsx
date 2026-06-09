"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Package, DollarSign, Cpu, HardDrive, Battery, Monitor } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductForm {
  name: string;
  brand: string;
  category: string;
  originalPrice: string;
  sellingPrice: string;
  grade: string;
  processor: string;
  ram: string;
  storage: string;
  screenSize: string;
  batteryHealth: string;
  condition: string;
  sku: string;
  stock: string;
  description: string;
  isHotDeal: boolean;
  isNew: boolean;
  isTopPick: boolean;
  isActive: boolean;
}

const initialForm: ProductForm = {
  name: "",
  brand: "",
  category: "",
  originalPrice: "",
  sellingPrice: "",
  grade: "",
  processor: "",
  ram: "",
  storage: "",
  screenSize: "",
  batteryHealth: "",
  condition: "",
  sku: "",
  stock: "",
  description: "",
  isHotDeal: false,
  isNew: true,
  isTopPick: false,
  isActive: true,
};

const brandOptions = ["Lenovo", "Apple", "Dell", "HP", "ASUS", "Acer", "Microsoft", "Samsung"];
const categoryOptions = ["Business Laptops", "Ultrabooks", "Gaming Laptops", "Workstations", "Budget Laptops", "2-in-1 Convertibles"];
const gradeOptions = ["A+", "A", "B+", "B"];
const conditionOptions = ["Excellent", "Good", "Fair", "Refurbished"];
const ramOptions = ["4GB", "8GB", "16GB", "32GB", "64GB"];
const storageOptions = ["128GB SSD", "256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"];

export function AddProductForm() {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ProductForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ProductForm, string>> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.brand) errs.brand = "Brand is required";
    if (!form.category) errs.category = "Category is required";
    if (!form.originalPrice || isNaN(Number(form.originalPrice)) || Number(form.originalPrice) <= 0)
      errs.originalPrice = "Valid original price is required";
    if (!form.sellingPrice || isNaN(Number(form.sellingPrice)) || Number(form.sellingPrice) <= 0)
      errs.sellingPrice = "Valid selling price is required";
    else if (Number(form.sellingPrice) >= Number(form.originalPrice))
      errs.sellingPrice = "Selling price must be less than original";
    if (!form.grade) errs.grade = "Grade is required";
    if (!form.processor.trim()) errs.processor = "Processor is required";
    if (!form.ram) errs.ram = "RAM is required";
    if (!form.storage) errs.storage = "Storage is required";
    if (!form.condition) errs.condition = "Condition is required";
    if (!form.sku.trim()) errs.sku = "SKU is required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      errs.stock = "Valid stock quantity is required";
    if (form.description.length > 1000) errs.description = "Description must be under 1000 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      await Swal.fire({
        icon: "error",
        title: "Validation Failed",
        text: "Please fix the highlighted errors before submitting.",
        confirmButtonColor: "#0ea5e9",
        background: "#fff",
        color: "#1e293b",
      });
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    const discount = Math.round((1 - Number(form.sellingPrice) / Number(form.originalPrice)) * 100);
    await Swal.fire({
      icon: "success",
      title: "Product Added!",
      html: `<strong>${form.name}</strong> (${form.brand}) has been listed.<br/>
        <span style="color:#94a3b8;font-size:13px">
          ${form.grade} Grade · ${discount}% off · ${form.sku}
        </span>`,
      confirmButtonColor: "#0ea5e9",
      background: "#fff",
      color: "#1e293b",
    });
    setForm(initialForm);
    setErrors({});
  };

  return (
    <Card className="bg-white border border-slate-200 rounded shadow-none">
      <CardHeader className="p-2.5 pb-0">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 p-1.5 rounded">
            <Package className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Add Product</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-1">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Product Name */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              Product Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.name}
              onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
              placeholder="e.g. ThinkPad X1 Carbon Gen 9"
              className={`h-8 text-[12px] ${errors.name ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
            />
            {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
          </div>

          {/* Brand + Category + SKU */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Brand <span className="text-red-500">*</span></Label>
              <Select value={form.brand} onValueChange={(v) => { setForm({ ...form, brand: v }); if (errors.brand) setErrors({ ...errors, brand: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.brand ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brandOptions.map((b) => (<SelectItem key={b} value={b} className="text-[12px]">{b}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.brand && <p className="text-[10px] text-red-500">{errors.brand}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Category <span className="text-red-500">*</span></Label>
              <Select value={form.category} onValueChange={(v) => { setForm({ ...form, category: v }); if (errors.category) setErrors({ ...errors, category: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.category ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((c) => (<SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-[10px] text-red-500">{errors.category}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">SKU <span className="text-red-500">*</span></Label>
              <Input
                value={form.sku}
                onChange={(e) => { setForm({ ...form, sku: e.target.value }); if (errors.sku) setErrors({ ...errors, sku: undefined }); }}
                placeholder="e.g. LNV-TPX1-009"
                className={`h-8 text-[12px] font-mono ${errors.sku ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.sku && <p className="text-[10px] text-red-500">{errors.sku}</p>}
            </div>
          </div>

          {/* Price + Grade + Stock */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Original Price <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.originalPrice}
                onChange={(e) => { setForm({ ...form, originalPrice: e.target.value }); if (errors.originalPrice) setErrors({ ...errors, originalPrice: undefined }); }}
                placeholder="1299"
                type="number"
                className={`h-8 text-[12px] font-mono ${errors.originalPrice ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.originalPrice && <p className="text-[10px] text-red-500">{errors.originalPrice}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Selling Price <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.sellingPrice}
                onChange={(e) => { setForm({ ...form, sellingPrice: e.target.value }); if (errors.sellingPrice) setErrors({ ...errors, sellingPrice: undefined }); }}
                placeholder="749"
                type="number"
                className={`h-8 text-[12px] font-mono ${errors.sellingPrice ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.sellingPrice && <p className="text-[10px] text-red-500">{errors.sellingPrice}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Grade <span className="text-red-500">*</span></Label>
              <Select value={form.grade} onValueChange={(v) => { setForm({ ...form, grade: v }); if (errors.grade) setErrors({ ...errors, grade: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.grade ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((g) => (<SelectItem key={g} value={g} className="text-[12px]">{g}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.grade && <p className="text-[10px] text-red-500">{errors.grade}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Stock <span className="text-red-500">*</span></Label>
              <Input
                value={form.stock}
                onChange={(e) => { setForm({ ...form, stock: e.target.value }); if (errors.stock) setErrors({ ...errors, stock: undefined }); }}
                placeholder="10"
                type="number"
                className={`h-8 text-[12px] font-mono ${errors.stock ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.stock && <p className="text-[10px] text-red-500">{errors.stock}</p>}
            </div>
          </div>

          {/* Specs Row 1: Processor + RAM + Storage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> Processor <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.processor}
                onChange={(e) => { setForm({ ...form, processor: e.target.value }); if (errors.processor) setErrors({ ...errors, processor: undefined }); }}
                placeholder="e.g. Intel i7-1165G7"
                className={`h-8 text-[12px] ${errors.processor ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.processor && <p className="text-[10px] text-red-500">{errors.processor}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> RAM <span className="text-red-500">*</span></span>
              </Label>
              <Select value={form.ram} onValueChange={(v) => { setForm({ ...form, ram: v }); if (errors.ram) setErrors({ ...errors, ram: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.ram ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select RAM" />
                </SelectTrigger>
                <SelectContent>
                  {ramOptions.map((r) => (<SelectItem key={r} value={r} className="text-[12px]">{r}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.ram && <p className="text-[10px] text-red-500">{errors.ram}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Storage <span className="text-red-500">*</span></span>
              </Label>
              <Select value={form.storage} onValueChange={(v) => { setForm({ ...form, storage: v }); if (errors.storage) setErrors({ ...errors, storage: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.storage ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select storage" />
                </SelectTrigger>
                <SelectContent>
                  {storageOptions.map((s) => (<SelectItem key={s} value={s} className="text-[12px]">{s}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.storage && <p className="text-[10px] text-red-500">{errors.storage}</p>}
            </div>
          </div>

          {/* Specs Row 2: Screen + Battery + Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Monitor className="w-3 h-3" /> Screen Size</span>
              </Label>
              <Input
                value={form.screenSize}
                onChange={(e) => setForm({ ...form, screenSize: e.target.value })}
                placeholder='e.g. 14"'
                className="h-8 text-[12px] border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Battery className="w-3 h-3" /> Battery Health</span>
              </Label>
              <Input
                value={form.batteryHealth}
                onChange={(e) => setForm({ ...form, batteryHealth: e.target.value })}
                placeholder="e.g. 85%"
                className="h-8 text-[12px] border-slate-200"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Condition <span className="text-red-500">*</span></Label>
              <Select value={form.condition} onValueChange={(v) => { setForm({ ...form, condition: v }); if (errors.condition) setErrors({ ...errors, condition: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.condition ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select condition" />
                </SelectTrigger>
                <SelectContent>
                  {conditionOptions.map((c) => (<SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.condition && <p className="text-[10px] text-red-500">{errors.condition}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => { setForm({ ...form, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: undefined }); }}
              placeholder="Product details, refurbishment notes..."
              rows={3}
              className={`text-[12px] resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.description ? <p className="text-[10px] text-red-500">{errors.description}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.description.length}/1000</span>
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Checkbox checked={form.isHotDeal} onCheckedChange={(v) => setForm({ ...form, isHotDeal: v as boolean })} />
              <Label className="text-[11px] text-slate-600">Hot Deal</Label>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox checked={form.isNew} onCheckedChange={(v) => setForm({ ...form, isNew: v as boolean })} />
              <Label className="text-[11px] text-slate-600">New Arrival</Label>
            </div>
            <div className="flex items-center gap-1.5">
              <Checkbox checked={form.isTopPick} onCheckedChange={(v) => setForm({ ...form, isTopPick: v as boolean })} />
              <Label className="text-[11px] text-slate-600">Top Pick</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
              <Label className="text-[11px] text-slate-600">Active</Label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1.5 rounded px-5"
            >
              {submitting ? "Saving..." : "Add Product"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
