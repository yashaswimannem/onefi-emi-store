"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Sparkles, Smartphone, ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      {/* Top micro banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        <span>1Fi Exclusive: Get up to ₹10,000 instant cashback on Mutual Fund backed EMI plans</span>
        <span className="hidden md:inline text-indigo-200">• 0% Interest Available</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-[#582BE8] flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                <span className="tracking-tighter">↑Fi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                  1Fi <span className="text-[#582BE8]">Store</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wide uppercase mt-0.5">
                  Mutual Fund Backed Credit
                </span>
              </div>
            </Link>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === "/" ? "text-[#582BE8] bg-indigo-50 font-semibold" : "hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              All Products
            </Link>
            <Link
              href="/products/iphone-17-pro"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.includes("iphone-17-pro")
                  ? "text-[#582BE8] bg-indigo-50 font-semibold"
                  : "hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              iPhone 17 Pro
            </Link>
            <Link
              href="/products/samsung-s24-ultra"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.includes("samsung-s24-ultra")
                  ? "text-[#582BE8] bg-indigo-50 font-semibold"
                  : "hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Galaxy S24 Ultra
            </Link>
            <Link
              href="/products/pixel-9-pro"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.includes("pixel-9-pro")
                  ? "text-[#582BE8] bg-indigo-50 font-semibold"
                  : "hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              Pixel 9 Pro
            </Link>
          </nav>

          {/* Trust Badge / Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>SEBI & RBI Compliant</span>
            </div>

            <Link
              href="/products/iphone-17-pro"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#582BE8] hover:bg-[#471ec2] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow-indigo-200 hover:shadow-md"
            >
              <Smartphone className="w-4 h-4" />
              <span>Explore Demo</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-75" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
