"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { ShieldCheck, Calendar, DollarSign, FileText } from "lucide-react";
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

interface WarrantyForm {
  planName: string;
  planType: string;
  durationMonths: string;
  price: string;
  coverageLevel: string;
  maxClaimValue: string;
  description: string;
  termsAndConditions: string;
  isExtended: boolean;
  includesAccidental: boolean;
  includesBattery: boolean;
  isActive: boolean;
}

const initialForm: WarrantyForm = {
  planName: "",
  planType: "",
  durationMonths: "",
  price: "",
  coverageLevel: "",
  maxClaimValue: "",
  description: "",
  termsAndConditions: "",
  isExtended: false,
  includesAccidental: false,
  includesBattery: true,
  isActive: true,
};

const planTypes = ["Standard", "Premium", "Extended", "Accidental Damage"];
const coverageLevels = ["Basic", "Comprehensive", "Full Coverage"];
const durationOptions = ["6", "12", "18", "24", "36", "48", "60"];

export function AddWarrantyPlanForm() {
  const [form, setForm] = useState<WarrantyForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof WarrantyForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof WarrantyForm, string>> = {};
    if (!form.planName.trim()) errs.planName = "Plan name is required";
    else if (form.planName.trim().length < 3) errs.planName = "Name must be at least 3 characters";
    if (!form.planType) errs.planType = "Plan type is required";
    if (!form.durationMonths) errs.durationMonths = "Duration is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      errs.price = "Valid price is required";
    if (!form.coverageLevel) errs.coverageLevel = "Coverage level is required";
    if (!form.maxClaimValue || isNaN(Number(form.maxClaimValue)) || Number(form.maxClaimValue) <= 0)
      errs.maxClaimValue = "Valid max claim value is required";
    if (form.description.length > 500) errs.description = "Description must be under 500 characters";
    if (form.termsAndConditions.length > 2000) errs.termsAndConditions = "Terms must be under 2000 characters";
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
      title: "Warranty Plan Created!",
      html: `<strong>${form.planName}</strong> has been added.<br/>
        <span style="color:#94a3b8;font-size:13px">
          ${form.planType} · ${form.durationMonths} months · $${form.price}
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
          <div className="bg-rose-50 p-1.5 rounded">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500" />
          </div>
          <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Add Warranty Plan</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-1">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Plan Name */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              Plan Name <span className="text-red-500">*</span>
            </Label>
            <Input
              value={form.planName}
              onChange={(e) => { setForm({ ...form, planName: e.target.value }); if (errors.planName) setErrors({ ...errors, planName: undefined }); }}
              placeholder="e.g. Premium Care Plus"
              className={`h-8 text-[12px] ${errors.planName ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
            />
            {errors.planName && <p className="text-[10px] text-red-500">{errors.planName}</p>}
          </div>

          {/* Plan Type + Duration + Coverage */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Plan Type <span className="text-red-500">*</span></Label>
              <Select value={form.planType} onValueChange={(v) => { setForm({ ...form, planType: v }); if (errors.planType) setErrors({ ...errors, planType: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.planType ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {planTypes.map((p) => (<SelectItem key={p} value={p} className="text-[12px]">{p}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.planType && <p className="text-[10px] text-red-500">{errors.planType}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> Duration (months) <span className="text-red-500">*</span></span>
              </Label>
              <Select value={form.durationMonths} onValueChange={(v) => { setForm({ ...form, durationMonths: v }); if (errors.durationMonths) setErrors({ ...errors, durationMonths: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.durationMonths ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {durationOptions.map((d) => (<SelectItem key={d} value={d} className="text-[12px]">{d} months</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.durationMonths && <p className="text-[10px] text-red-500">{errors.durationMonths}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Coverage Level <span className="text-red-500">*</span></Label>
              <Select value={form.coverageLevel} onValueChange={(v) => { setForm({ ...form, coverageLevel: v }); if (errors.coverageLevel) setErrors({ ...errors, coverageLevel: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.coverageLevel ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {coverageLevels.map((c) => (<SelectItem key={c} value={c} className="text-[12px]">{c}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.coverageLevel && <p className="text-[10px] text-red-500">{errors.coverageLevel}</p>}
            </div>
          </div>

          {/* Price + Max Claim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Plan Price <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.price}
                onChange={(e) => { setForm({ ...form, price: e.target.value }); if (errors.price) setErrors({ ...errors, price: undefined }); }}
                placeholder="49.99"
                type="number"
                step="0.01"
                className={`h-8 text-[12px] font-mono ${errors.price ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.price && <p className="text-[10px] text-red-500">{errors.price}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> Max Claim Value <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.maxClaimValue}
                onChange={(e) => { setForm({ ...form, maxClaimValue: e.target.value }); if (errors.maxClaimValue) setErrors({ ...errors, maxClaimValue: undefined }); }}
                placeholder="1500"
                type="number"
                className={`h-8 text-[12px] font-mono ${errors.maxClaimValue ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.maxClaimValue && <p className="text-[10px] text-red-500">{errors.maxClaimValue}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) => { setForm({ ...form, description: e.target.value }); if (errors.description) setErrors({ ...errors, description: undefined }); }}
              placeholder="What this warranty plan covers..."
              rows={2}
              className={`text-[12px] resize-none ${errors.description ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.description ? <p className="text-[10px] text-red-500">{errors.description}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.description.length}/500</span>
            </div>
          </div>

          {/* Terms */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> Terms & Conditions</span>
            </Label>
            <Textarea
              value={form.termsAndConditions}
              onChange={(e) => { setForm({ ...form, termsAndConditions: e.target.value }); if (errors.termsAndConditions) setErrors({ ...errors, termsAndConditions: undefined }); }}
              placeholder="Full terms and conditions text..."
              rows={3}
              className={`text-[12px] resize-none ${errors.termsAndConditions ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.termsAndConditions ? <p className="text-[10px] text-red-500">{errors.termsAndConditions}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.termsAndConditions.length}/2000</span>
            </div>
          </div>

          {/* Flags */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={form.isExtended} onCheckedChange={(v) => setForm({ ...form, isExtended: v })} />
              <Label className="text-[11px] text-slate-600">Extended Warranty</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.includesAccidental} onCheckedChange={(v) => setForm({ ...form, includesAccidental: v })} />
              <Label className="text-[11px] text-slate-600">Accidental Damage</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.includesBattery} onCheckedChange={(v) => setForm({ ...form, includesBattery: v })} />
              <Label className="text-[11px] text-slate-600">Battery Coverage</Label>
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
              {submitting ? "Saving..." : "Add Warranty Plan"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
