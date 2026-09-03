"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Info,
  CheckCircle,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Tag,
  Share2,
  ChevronRight,
} from "lucide-react";
import MutualFundExplainerModal from "./MutualFundExplainerModal";
import ProceedModal from "./ProceedModal";

interface EmiPlan {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  isRecommended: boolean;
  mfSchemeName: string;
}

interface ProductVariant {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  storage: string;
  mrp: number;
  price: number;
  imageUrl: string;
  inStock: boolean;
  isDefault: boolean;
  emiPlans: EmiPlan[];
}

interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  tagline?: string | null;
  badge?: string | null;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
}

interface Props {
  product: Product;
}

export default function ProductDetailClient({ product }: Props) {
  // Find initial default variant or first
  const defaultVar =
    product.variants.find((v) => v.isDefault) || product.variants[0];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    defaultVar?.id || ""
  );

  // Active variant
  const activeVariant = useMemo(() => {
    return (
      product.variants.find((v) => v.id === selectedVariantId) ||
      product.variants[0]
    );
  }, [product.variants, selectedVariantId]);

  // Available unique storages
  const availableStorages = useMemo(() => {
    const storages = new Set(product.variants.map((v) => v.storage));
    return Array.from(storages);
  }, [product.variants]);

  // Available unique colors for the current storage
  const availableColorsForStorage = useMemo(() => {
    const matching = product.variants.filter(
      (v) => v.storage === activeVariant?.storage
    );
    // If none match, return all unique colors
    if (matching.length === 0) return product.variants;
    return matching;
  }, [product.variants, activeVariant]);

  // Selected EMI Plan
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  // Update selected plan if active variant changes and plan is no longer valid
  const activePlans = useMemo(() => {
    return activeVariant?.emiPlans || [];
  }, [activeVariant]);

  const selectedPlan = useMemo(() => {
    return (
      activePlans.find((p) => p.id === selectedPlanId) ||
      activePlans.find((p) => p.isRecommended) ||
      activePlans[0]
    );
  }, [activePlans, selectedPlanId]);

  // Modals state
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [isProceedOpen, setIsProceedOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleColorChange = (targetVariantId: string) => {
    setSelectedVariantId(targetVariantId);
  };

  const handleStorageChange = (newStorage: string) => {
    // Find a variant with same storage and preferably same color
    const sameColorVariant = product.variants.find(
      (v) =>
        v.storage === newStorage && v.colorName === activeVariant.colorName
    );
    if (sameColorVariant) {
      setSelectedVariantId(sameColorVariant.id);
    } else {
      const anyStorageVariant = product.variants.find(
        (v) => v.storage === newStorage
      );
      if (anyStorageVariant) setSelectedVariantId(anyStorageVariant.id);
    }
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const discountAmount = (activeVariant?.mrp || 0) - (activeVariant?.price || 0);
  const discountPercent = Math.round(
    (discountAmount / (activeVariant?.mrp || 1)) * 100
  );

  return (
    <main className="min-h-screen pb-20 pt-6">
      {/* Breadcrumbs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span>Smartphones</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main 2-Column Product Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200/80 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* ========================================================= */}
            {/* LEFT COLUMN: Product image, variant, color swatches */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Badge (e.g. NEW) */}
                {product.badge && (
                  <div className="mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-black tracking-wider text-rose-500 bg-rose-50 border border-rose-100 uppercase">
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Product Name & Storage */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-medium text-slate-500 mt-0.5">
                  {activeVariant.storage}
                </p>

                {/* Main Product Image */}
                <div className="my-8 flex items-center justify-center relative min-h-[340px]">
                  <div className="w-64 h-80 relative flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02]">
                    <img
                      src={activeVariant.imageUrl}
                      alt={activeVariant.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Color Swatches and Finishes */}
              <div className="pt-4 border-t border-slate-100">
                <div className="text-center">
                  <p className="text-xs font-semibold text-slate-600 mb-2.5">
                    Available in {availableColorsForStorage.length} finishes
                  </p>

                  {/* Swatches Row */}
                  <div className="flex items-center justify-center gap-3">
                    {availableColorsForStorage.map((variant) => {
                      const isSelected = variant.id === activeVariant.id;
                      return (
                        <button
                          key={variant.id}
                          onClick={() => handleColorChange(variant.id)}
                          title={`${variant.colorName} (${variant.storage})`}
                          className={`group relative flex items-center justify-center p-0.5 rounded-full transition-all ${
                            isSelected
                              ? "ring-2 ring-[#582BE8] ring-offset-2 scale-110"
                              : "hover:ring-2 hover:ring-slate-300 hover:ring-offset-1"
                          }`}
                        >
                          <span
                            className="w-6 h-6 rounded-full shadow-inner border border-black/10 block"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 mt-2">
                    {activeVariant.colorName}
                  </p>
                </div>

                {/* Storage Capacity Selector (if multiple exist) */}
                {availableStorages.length > 1 && (
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-600 mb-2 text-center">
                      Select Storage
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      {availableStorages.map((storage) => {
                        const isSelected = activeVariant.storage === storage;
                        return (
                          <button
                            key={storage}
                            onClick={() => handleStorageChange(storage)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? "bg-[#582BE8] text-white shadow-sm"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {storage}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ========================================================= */}
            {/* RIGHT COLUMN: Pricing, MF EMI plans, proceed button */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white">
              <div>
                {/* Price Section */}
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    ₹{activeVariant.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-base sm:text-lg font-medium text-slate-400 line-through">
                    ₹{activeVariant.mrp.toLocaleString("en-IN")}
                  </span>
                  {discountAmount > 0 && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                      Save ₹{discountAmount.toLocaleString("en-IN")} ({discountPercent}% OFF)
                    </span>
                  )}
                </div>

                {/* EMI Plans Header */}
                <div className="mt-6 mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-700">
                      EMI plans backed by mutual funds
                    </h2>
                    <button
                      onClick={() => setIsExplainerOpen(true)}
                      className="text-indigo-600 hover:text-indigo-800 p-0.5 rounded-full hover:bg-indigo-50 transition-colors"
                      title="Learn how Mutual Fund backed EMI works"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                    0% Options Available
                  </span>
                </div>

                {/* List of Available EMI Plans */}
                <div className="space-y-2.5">
                  {activePlans.map((plan) => {
                    const isSelected = selectedPlan?.id === plan.id;
                    const isZeroPercent = plan.interestRate === 0;

                    return (
                      <div
                        key={plan.id}
                        onClick={() => setSelectedPlanId(plan.id)}
                        className={`group relative p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#582BE8] bg-indigo-50/25 ring-1 ring-[#582BE8] shadow-sm"
                            : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {/* Left: Radio + Monthly x Tenure */}
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-[#582BE8] bg-[#582BE8]"
                                  : "border-slate-300 bg-white group-hover:border-slate-400"
                              }`}
                            >
                              {isSelected && (
                                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                              )}
                            </div>

                            <div>
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm sm:text-base font-extrabold text-slate-900">
                                  ₹{plan.monthlyAmount.toLocaleString("en-IN")}
                                </span>
                                <span className="text-xs sm:text-sm font-semibold text-slate-600">
                                  x {plan.tenureMonths} months
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Right: Interest rate badge */}
                          <div>
                            <span
                              className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                                isZeroPercent
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : "bg-slate-100 text-slate-700 border border-slate-200"
                              }`}
                            >
                              {isZeroPercent ? "0% interest" : `${plan.interestRate}% interest`}
                            </span>
                          </div>
                        </div>

                        {/* Additional Cashback Sub-row */}
                        {plan.cashbackAmount > 0 && (
                          <div className="mt-2 pl-7 flex items-center gap-1.5">
                            <Tag className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span className="text-xs font-semibold text-emerald-600">
                              Additional cashback of ₹{plan.cashbackAmount.toLocaleString("en-IN")}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Proceed Action Button & Mutual Fund Micro Guarantee */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                {/* Plan Selected Summary */}
                {selectedPlan && (
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Selected:{" "}
                      <strong className="text-slate-800">
                        {selectedPlan.tenureMonths} months @ ₹
                        {selectedPlan.monthlyAmount.toLocaleString("en-IN")}/mo
                      </strong>
                    </span>
                    <span className="text-emerald-600 font-semibold">
                      ₹{selectedPlan.cashbackAmount.toLocaleString("en-IN")} Cashback Applied
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setIsProceedOpen(true)}
                  className="w-full py-4 px-6 rounded-2xl bg-[#582BE8] hover:bg-[#471ec2] text-white font-extrabold text-base shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>Proceed with Selected Plan</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Footer security trust pill */}
                <div className="mt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>SEBI Regulated Lien</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Investments Keep Growing</span>
                  </div>
                  <span>•</span>
                  <button
                    onClick={handleShare}
                    className="hover:text-slate-600 flex items-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{copiedLink ? "Link Copied!" : "Share"}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* Additional Product Info & Specs Banner */}
        {/* ========================================================= */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#582BE8] flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Why Mutual Fund Backing?</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Don't break your compounding returns. Your units remain invested in top AMCs while securing low-cost financing.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Tag className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Guaranteed Folio Cashback</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Up to ₹7,500 direct cashback deposited into your liquid mutual fund folio upon approval.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">Instant Digital Lien</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              100% paperless verification via OTP through CAMS & KFintech. No branch visits required.
            </p>
          </div>
        </div>

      </div>

      {/* Modals */}
      <MutualFundExplainerModal
        isOpen={isExplainerOpen}
        onClose={() => setIsExplainerOpen(false)}
      />

      {selectedPlan && (
        <ProceedModal
          isOpen={isProceedOpen}
          onClose={() => setIsProceedOpen(false)}
          product={product}
          variant={activeVariant}
          emiPlan={selectedPlan}
        />
      )}
    </main>
  );
}
