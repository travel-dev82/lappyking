"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { FolderTree, ImageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryForm {
  name: string;
  slug: string;
  parentCategory: string;
  description: string;
  image: string;
  isActive: boolean;
  showInMenu: boolean;
  sortOrder: string;
}

const initialForm: CategoryForm = {
  name: "",
  slug: "",
  parentCategory: "",
  description: "",
  image: "",
  isActive: true,
  showInMenu: true,
  sortOrder: "0",
};

const parentCategories = [
  { value: "none", label: "None (Top Level)" },
  { value: "laptops", label: "Laptops" },
  { value: "accessories", label: "Accessories" },
  { value: "components", label: "Components" },
  { value: "software", label: "Software" },
];

export function AddCategoryForm() {
  const [form, setForm] = useState<CategoryForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CategoryForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const validate = (): boolean => {
    const errs: Partial<Record<keyof CategoryForm, string>> = {};
    if (!form.name.trim()) errs.name = "Category name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    else if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = "Slug must be lowercase, numbers, and hyphens only";
    if (form.description.length > 300) errs.description = "Description must be under 300 characters";
    if (form.sortOrder && isNaN(Number(form.sortOrder))) errs.sortOrder = "Sort order must be a number";
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
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    await Swal.fire({
      icon: "success",
      title: "Category Added!",
      html: `<strong>${form.name}</strong> has been created successfully.<br/><span style="color:#94a3b8;font-size:13px">Parent: ${form.parentCategory === "none" || !form.parentCategory ? "Top Level" : form.parentCategory}</span>`,
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
          <div className="bg-violet-50 p-1.5 rounded">
            <FolderTree className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Add Category</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-1">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Row 1: Name + Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Business Laptops"
                className={`h-8 text-[12px] ${errors.name ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                URL Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.slug}
                onChange={(e) => {
                  setForm({ ...form, slug: e.target.value });
                  if (errors.slug) setErrors({ ...errors, slug: undefined });
                }}
                placeholder="e.g. business-laptops"
                className={`h-8 text-[12px] font-mono ${errors.slug ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.slug && <p className="text-[10px] text-red-500">{errors.slug}</p>}
            </div>
          </div>

          {/* Row 2: Parent + Sort */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Parent Category</Label>
              <Select value={form.parentCategory} onValueChange={(v) => setForm({ ...form, parentCategory: v })}>
                <SelectTrigger className="h-8 text-[12px] border-slate-200">
                  <SelectValue placeholder="Select parent" />
                </SelectTrigger>
                <SelectContent>
                  {parentCategories.map((pc) => (
                    <SelectItem key={pc.value} value={pc.value} className="text-[12px]">
                      {pc.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Sort Order</Label>
              <Input
                value={form.sortOrder}
                onChange={(e) => {
                  setForm({ ...form, sortOrder: e.target.value });
                  if (errors.sortOrder) setErrors({ ...errors, sortOrder: undefined });
                }}
                placeholder="0"
                className={`h-8 text-[12px] font-mono ${errors.sortOrder ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.sortOrder && <p className="text-[10px] text-red-500">{errors.sortOrder}</p>}
            </div>
          </div>

          {/* Image */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1"><ImageIcon className="w-3 h-3" /> Category Image URL</span>
            </Label>
            <Input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/category.jpg"
              className="h-8 text-[12px] border-slate-200"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: undefined });
              }}
              placeholder="Brief category description..."
              rows={2}
              className={`text-[12px] resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.description ? <p className="text-[10px] text-red-500">{errors.description}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.description.length}/300</span>
            </div>
          </div>

          {/* Switches */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
              <Label className="text-[11px] text-slate-600">Active</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.showInMenu} onCheckedChange={(v) => setForm({ ...form, showInMenu: v })} />
              <Label className="text-[11px] text-slate-600">Show in Menu</Label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1.5 rounded px-5"
            >
              {submitting ? "Saving..." : "Add Category"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
