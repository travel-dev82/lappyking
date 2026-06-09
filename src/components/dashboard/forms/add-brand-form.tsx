"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Tag, Upload, Globe, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface BrandForm {
  name: string;
  slug: string;
  logo: string;
  website: string;
  description: string;
  isActive: boolean;
  isFeatured: boolean;
  country: string;
}

const initialForm: BrandForm = {
  name: "",
  slug: "",
  logo: "",
  website: "",
  description: "",
  isActive: true,
  isFeatured: false,
  country: "",
};

export function AddBrandForm() {
  const [form, setForm] = useState<BrandForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof BrandForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const validate = (): boolean => {
    const errs: Partial<Record<keyof BrandForm, string>> = {};
    if (!form.name.trim()) errs.name = "Brand name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.slug.trim()) errs.slug = "Slug is required";
    else if (!/^[a-z0-9-]+$/.test(form.slug)) errs.slug = "Slug must be lowercase, numbers, and hyphens only";
    if (form.website && !/^https?:\/\/.+/.test(form.website)) errs.website = "Website must be a valid URL (https://...)";
    if (form.description.length > 500) errs.description = "Description must be under 500 characters";
    if (!form.country.trim()) errs.country = "Country of origin is required";
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
    // Simulate API call
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    await Swal.fire({
      icon: "success",
      title: "Brand Added!",
      html: `<strong>${form.name}</strong> has been added to the brand catalog.<br/><span style="color:#94a3b8;font-size:13px">Slug: ${form.slug}</span>`,
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
          <div className="bg-sky-50 p-1.5 rounded">
            <Tag className="w-3.5 h-3.5 text-sky-500" />
          </div>
          <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Add Brand</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-1">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Row 1: Name + Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                Brand Name <span className="text-red-500">*</span>
              </Label>
              <Input
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value, slug: generateSlug(e.target.value) });
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                placeholder="e.g. Lenovo"
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
                placeholder="e.g. lenovo"
                className={`h-8 text-[12px] font-mono ${errors.slug ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.slug && <p className="text-[10px] text-red-500">{errors.slug}</p>}
            </div>
          </div>

          {/* Row 2: Country + Website */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> Country of Origin <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.country}
                onChange={(e) => {
                  setForm({ ...form, country: e.target.value });
                  if (errors.country) setErrors({ ...errors, country: undefined });
                }}
                placeholder="e.g. China"
                className={`h-8 text-[12px] ${errors.country ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.country && <p className="text-[10px] text-red-500">{errors.country}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Website</span>
              </Label>
              <Input
                value={form.website}
                onChange={(e) => {
                  setForm({ ...form, website: e.target.value });
                  if (errors.website) setErrors({ ...errors, website: undefined });
                }}
                placeholder="https://www.lenovo.com"
                className={`h-8 text-[12px] ${errors.website ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.website && <p className="text-[10px] text-red-500">{errors.website}</p>}
            </div>
          </div>

          {/* Logo URL */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1"><Upload className="w-3 h-3" /> Logo URL</span>
            </Label>
            <Input
              value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
              placeholder="https://example.com/logo.png"
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
              placeholder="Brief brand description..."
              rows={2}
              className={`text-[12px] resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.description ? <p className="text-[10px] text-red-500">{errors.description}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.description.length}/500</span>
            </div>
          </div>

          {/* Switches */}
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
              <Label className="text-[11px] text-slate-600">Active</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.isFeatured} onCheckedChange={(v) => setForm({ ...form, isFeatured: v })} />
              <Label className="text-[11px] text-slate-600">Featured</Label>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1.5 rounded px-5"
            >
              {submitting ? "Saving..." : "Add Brand"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
