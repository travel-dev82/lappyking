"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Truck, Phone, Mail, MapPin, Building } from "lucide-react";
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

interface SupplierForm {
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  supplierType: string;
  taxId: string;
  paymentTerms: string;
  notes: string;
  isActive: boolean;
}

const initialForm: SupplierForm = {
  name: "",
  contactPerson: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  country: "",
  supplierType: "",
  taxId: "",
  paymentTerms: "",
  notes: "",
  isActive: true,
};

const supplierTypes = ["OEM Partner", "Wholesaler", "Distributor", "Recycling Partner", "Independent Seller"];
const paymentTermOptions = ["Net 15", "Net 30", "Net 45", "Net 60", "Prepaid", "COD"];

export function AddSupplierForm() {
  const [form, setForm] = useState<SupplierForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof SupplierForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof SupplierForm, string>> = {};
    if (!form.name.trim()) errs.name = "Supplier name is required";
    else if (form.name.trim().length < 2) errs.name = "Name must be at least 2 characters";
    if (!form.contactPerson.trim()) errs.contactPerson = "Contact person is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email format";
    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone)) errs.phone = "Invalid phone format";
    if (!form.supplierType) errs.supplierType = "Supplier type is required";
    if (!form.paymentTerms) errs.paymentTerms = "Payment terms are required";
    if (!form.city.trim()) errs.city = "City is required";
    if (!form.country.trim()) errs.country = "Country is required";
    if (form.notes.length > 500) errs.notes = "Notes must be under 500 characters";
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
      title: "Supplier Added!",
      html: `<strong>${form.name}</strong> has been registered as a supplier.<br/>
        <span style="color:#94a3b8;font-size:13px">
          ${form.supplierType} · ${form.paymentTerms}
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
          <div className="bg-amber-50 p-1.5 rounded">
            <Truck className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <CardTitle className="text-xs font-semibold text-gray-900 tracking-tight">Add Supplier</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-2.5 pt-1">
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Name + Contact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Building className="w-3 h-3" /> Supplier Name <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                placeholder="e.g. TechRefurb Global"
                className={`h-8 text-[12px] ${errors.name ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Contact Person <span className="text-red-500">*</span></Label>
              <Input
                value={form.contactPerson}
                onChange={(e) => { setForm({ ...form, contactPerson: e.target.value }); if (errors.contactPerson) setErrors({ ...errors, contactPerson: undefined }); }}
                placeholder="e.g. John Smith"
                className={`h-8 text-[12px] ${errors.contactPerson ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.contactPerson && <p className="text-[10px] text-red-500">{errors.contactPerson}</p>}
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> Email <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.email}
                onChange={(e) => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                placeholder="supplier@example.com"
                type="email"
                className={`h-8 text-[12px] ${errors.email ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> Phone <span className="text-red-500">*</span></span>
              </Label>
              <Input
                value={form.phone}
                onChange={(e) => { setForm({ ...form, phone: e.target.value }); if (errors.phone) setErrors({ ...errors, phone: undefined }); }}
                placeholder="+1 (555) 123-4567"
                className={`h-8 text-[12px] ${errors.phone ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
            </div>
          </div>

          {/* Supplier Type + Payment Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Supplier Type <span className="text-red-500">*</span></Label>
              <Select value={form.supplierType} onValueChange={(v) => { setForm({ ...form, supplierType: v }); if (errors.supplierType) setErrors({ ...errors, supplierType: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.supplierType ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {supplierTypes.map((t) => (<SelectItem key={t} value={t} className="text-[12px]">{t}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.supplierType && <p className="text-[10px] text-red-500">{errors.supplierType}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Payment Terms <span className="text-red-500">*</span></Label>
              <Select value={form.paymentTerms} onValueChange={(v) => { setForm({ ...form, paymentTerms: v }); if (errors.paymentTerms) setErrors({ ...errors, paymentTerms: undefined }); }}>
                <SelectTrigger className={`h-8 text-[12px] ${errors.paymentTerms ? "border-red-400" : "border-slate-200"}`}>
                  <SelectValue placeholder="Select terms" />
                </SelectTrigger>
                <SelectContent>
                  {paymentTermOptions.map((p) => (<SelectItem key={p} value={p} className="text-[12px]">{p}</SelectItem>))}
                </SelectContent>
              </Select>
              {errors.paymentTerms && <p className="text-[10px] text-red-500">{errors.paymentTerms}</p>}
            </div>
          </div>

          {/* Address */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Address</span>
            </Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="123 Business Park, Suite 456"
              className="h-8 text-[12px] border-slate-200"
            />
          </div>

          {/* City + Country + Tax ID */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">City <span className="text-red-500">*</span></Label>
              <Input
                value={form.city}
                onChange={(e) => { setForm({ ...form, city: e.target.value }); if (errors.city) setErrors({ ...errors, city: undefined }); }}
                placeholder="e.g. Shenzhen"
                className={`h-8 text-[12px] ${errors.city ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.city && <p className="text-[10px] text-red-500">{errors.city}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Country <span className="text-red-500">*</span></Label>
              <Input
                value={form.country}
                onChange={(e) => { setForm({ ...form, country: e.target.value }); if (errors.country) setErrors({ ...errors, country: undefined }); }}
                placeholder="e.g. China"
                className={`h-8 text-[12px] ${errors.country ? "border-red-400 focus-visible:ring-red-200" : "border-slate-200"}`}
              />
              {errors.country && <p className="text-[10px] text-red-500">{errors.country}</p>}
            </div>
            <div className="space-y-1">
              <Label className="text-[11px] font-medium text-slate-700">Tax ID / VAT</Label>
              <Input
                value={form.taxId}
                onChange={(e) => setForm({ ...form, taxId: e.target.value })}
                placeholder="e.g. US123456789"
                className="h-8 text-[12px] font-mono border-slate-200"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label className="text-[11px] font-medium text-slate-700">Notes</Label>
            <Textarea
              value={form.notes}
              onChange={(e) => { setForm({ ...form, notes: e.target.value }); if (errors.notes) setErrors({ ...errors, notes: undefined }); }}
              placeholder="Additional notes about this supplier..."
              rows={2}
              className={`text-[12px] resize-none ${errors.notes ? "border-red-400" : "border-slate-200"}`}
            />
            <div className="flex justify-between">
              {errors.notes ? <p className="text-[10px] text-red-500">{errors.notes}</p> : <span />}
              <span className="text-[9px] text-slate-400">{form.notes.length}/500</span>
            </div>
          </div>

          {/* Active switch */}
          <div className="flex items-center gap-2">
            <Switch checked={form.isActive} onCheckedChange={(v) => setForm({ ...form, isActive: v })} />
            <Label className="text-[11px] text-slate-600">Active Supplier</Label>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-1">
            <Button
              type="submit"
              disabled={submitting}
              className="h-8 text-[11px] bg-sky-500 hover:bg-sky-600 text-white gap-1.5 rounded px-5"
            >
              {submitting ? "Saving..." : "Add Supplier"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
