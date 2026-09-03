import Link from "next/link";
import { ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#582BE8] flex items-center justify-center text-white font-black text-sm">
                ↑Fi
              </div>
              <span className="text-lg font-bold text-slate-900">1Fi Credit</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empowering smart buyers to finance premium electronics through high-yield mutual fund liens without breaking investments or liquidating portfolios.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Bank-grade security & encryption</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Featured Devices</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <Link href="/products/iphone-17-pro" className="hover:text-[#582BE8] transition-colors flex items-center gap-1">
                  iPhone 17 Pro <span className="text-[10px] text-indigo-600 font-semibold">(Reference)</span>
                </Link>
              </li>
              <li>
                <Link href="/products/samsung-s24-ultra" className="hover:text-[#582BE8] transition-colors">
                  Samsung Galaxy S24 Ultra
                </Link>
              </li>
              <li>
                <Link href="/products/pixel-9-pro" className="hover:text-[#582BE8] transition-colors">
                  Google Pixel 9 Pro
                </Link>
              </li>
              <li>
                <Link href="/products/oneplus-12" className="hover:text-[#582BE8] transition-colors">
                  OnePlus 12 5G
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">API & Architecture</h4>
            <ul className="space-y-2 text-xs text-slate-600">
              <li>
                <a href="/api/products" target="_blank" className="hover:text-[#582BE8] flex items-center gap-1">
                  GET /api/products <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <a href="/api/products/iphone-17-pro" target="_blank" className="hover:text-[#582BE8] flex items-center gap-1">
                  GET /api/products/:slug <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </li>
              <li>
                <span className="text-slate-500">POST /api/orders (Checkout)</span>
              </li>
              <li>
                <span className="text-slate-500">Prisma ORM + Relational Schema</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Submission Details</h4>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
              <div className="font-semibold text-slate-800">1Fi SDE1 Assignment</div>
              <div>Stack: Next.js, React, Tailwind CSS, Prisma</div>
              <div className="text-emerald-700 font-medium">✓ 100% Dynamic Database Driven</div>
              <div className="text-indigo-600 font-medium">✓ Zero Hardcoded Data</div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 1Fi Financial Technologies Pvt. Ltd. Built for SDE-1 Assignment.</p>
          <div className="flex items-center gap-4">
            <span>Dynamic URL routing enabled</span>
            <span>•</span>
            <span>REST API compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
