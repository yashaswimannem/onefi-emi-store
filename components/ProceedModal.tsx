"use client";

import { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Loader2, ArrowRight, Sparkles, Building2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    slug: string;
  };
  variant: {
    id: string;
    name: string;
    storage: string;
    colorName: string;
    price: number;
    mrp: number;
    imageUrl: string;
  };
  emiPlan: {
    id: string;
    tenureMonths: number;
    monthlyAmount: number;
    interestRate: number;
    cashbackAmount: number;
    mfSchemeName: string;
  };
}

export default function ProceedModal({
  isOpen,
  onClose,
  product,
  variant,
  emiPlan,
}: Props) {
  const [formData, setFormData] = useState({
    name: "Yashaswi Sharma",
    phone: "9876543210",
    email: "yashaswi@example.com",
    pan: "ABCDE1234F",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedData, setSubmittedData] = useState<any>(null);

  if (!isOpen) return null;

  const totalAmountPayable = emiPlan.monthlyAmount * emiPlan.tenureMonths;
  const netEffectiveCost = totalAmountPayable - emiPlan.cashbackAmount;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          variantId: variant.id,
          emiPlanId: emiPlan.id,
          customerName: formData.name,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          customerPan: formData.pan,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application");
      }

      setSubmittedData(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 animate-slideUp max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-[#582BE8] p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
              Instant Prequalification
            </span>
          </div>
          <h3 className="text-xl font-extrabold mt-1">1Fi Mutual Fund Backed Plan</h3>
          <p className="text-xs text-indigo-200 mt-0.5">
            Proceed with your chosen tenure of {emiPlan.tenureMonths} Months
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {submittedData ? (
            /* Success confirmation screen */
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-slate-900">
                  Application Prequalified!
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your mutual fund backed financing for {product.name} ({variant.storage} • {variant.colorName}) is approved.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Application ID</span>
                  <span className="font-mono font-bold text-indigo-600">
                    {submittedData.applicationId}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Device</span>
                  <span className="font-semibold text-slate-800">{product.name} ({variant.storage})</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Monthly EMI</span>
                  <span className="font-semibold text-slate-800">
                    ₹{emiPlan.monthlyAmount.toLocaleString("en-IN")} / mo ({emiPlan.tenureMonths} mo)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Mutual Fund Scheme</span>
                  <span className="font-semibold text-slate-800">{emiPlan.mfSchemeName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Cashback Locked</span>
                  <span className="font-bold text-emerald-600">
                    ₹{emiPlan.cashbackAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Our 1Fi loan advisor will contact you within 15 minutes to verify your mutual fund folio link.</span>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 px-4 rounded-xl bg-[#582BE8] hover:bg-[#471ec2] text-white font-semibold text-sm transition-all shadow-md"
              >
                Back to Product
              </button>
            </div>
          ) : (
            /* Order review and application form */
            <>
              {/* Product and Plan Summary Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-white rounded-xl border border-slate-200 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={variant.imageUrl}
                      alt={variant.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-500">
                      {variant.storage} • {variant.colorName}
                    </p>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{variant.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{variant.mrp.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial breakdown */}
                <div className="mt-4 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Selected Plan:</span>
                    <span className="font-bold text-slate-900">
                      ₹{emiPlan.monthlyAmount.toLocaleString("en-IN")} × {emiPlan.tenureMonths} Months
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Interest Rate:</span>
                    <span className="font-semibold text-emerald-600">
                      {emiPlan.interestRate === 0 ? "0% (Subsidized No-Cost)" : `${emiPlan.interestRate}% APR`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Additional Cashback:</span>
                    <span className="font-bold text-emerald-600">
                      - ₹{emiPlan.cashbackAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Secured Against:</span>
                    <span className="font-medium text-slate-700 flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                      {emiPlan.mfSchemeName}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold text-slate-900 text-sm">
                    <span>Net Effective Cost:</span>
                    <span className="text-[#582BE8]">
                      ₹{netEffectiveCost.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Applicant Information
                </h4>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#582BE8]"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Mobile Number (+91) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#582BE8]"
                      placeholder="9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#582BE8]"
                      placeholder="user@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      PAN Card (For MF Lien)
                    </label>
                    <input
                      type="text"
                      value={formData.pan}
                      onChange={(e) =>
                        setFormData({ ...formData, pan: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#582BE8] uppercase"
                      placeholder="ABCDE1234F"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      required
                      className="mt-0.5 rounded text-[#582BE8] focus:ring-[#582BE8]"
                    />
                    <span className="text-[11px] text-slate-500 leading-tight">
                      I authorize 1Fi Financial Technologies to fetch CAMS/KFintech mutual fund portfolio records to create a digital lien for zero-cost EMI financing.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#582BE8] hover:bg-[#471ec2] text-white font-bold text-sm transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application to Database...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Confirm & Submit EMI Application</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
