"use client";

import { X, TrendingUp, ShieldCheck, Gift, Percent, CheckCircle2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MutualFundExplainerModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-slideUp">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-[#582BE8] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider">
              1Fi Innovation
            </span>
          </div>
          <h3 className="text-xl font-bold">How Mutual Fund Backed EMIs Work</h3>
          <p className="text-xs text-indigo-100 mt-1">
            Finance your dream smartphone while keeping your investments compounding
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#582BE8] shrink-0 mt-0.5">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">1. Portfolio Never Stops Growing</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Rather than liquidating your equity or debt mutual funds to make upfront payments, a digital lien is placed on selected units. You continue earning daily NAV returns and dividends throughout your tenure.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">2. True 0% Interest & Ultra-Low Cost</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Because mutual fund units serve as high-quality collateral, 1Fi partners with leading AMCs and NBFCs to offer genuine 0% interest on tenures up to 24 months.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600 shrink-0 mt-0.5">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">3. Direct Cashbacks Credited to MF Folio</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Enjoy additional promotional cashback (up to ₹7,500) credited directly to your mutual fund folio, accelerating your wealth accumulation while enjoying your new phone.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">4. Automated Lien Release</h4>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                Once the final monthly installment is cleared, the digital lien on your mutual fund units is released instantaneously with zero paperwork.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 mt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Paperless • Zero Preclosure Charges</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#582BE8] hover:bg-[#471ec2] text-white text-sm font-semibold transition-colors shadow-sm"
          >
            Got It, View EMI Plans
          </button>
        </div>
      </div>
    </div>
  );
}
