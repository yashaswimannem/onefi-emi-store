import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Percent,
  ArrowRight,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    include: {
      variants: {
        include: {
          emiPlans: {
            orderBy: {
              monthlyAmount: "asc",
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        {/* Background decorative glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#582BE8]/25 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-indigo-200 mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>1Fi SDE1 Project • Dynamic Mutual Fund EMI Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15]">
            Upgrade Your Smartphone. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-indigo-300">
              Keep Your Investments Growing.
            </span>
          </h1>

          <p className="mt-5 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Borrow against your mutual funds at genuine 0% interest without selling your units.
            Enjoy low monthly EMIs and up to ₹10,000 instant cashback credited to your portfolio.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products/iphone-17-pro"
              className="px-6 py-3.5 rounded-2xl bg-[#582BE8] hover:bg-[#471ec2] text-white font-bold text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 hover:gap-3"
            >
              <span>View Reference: iPhone 17 Pro</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#products"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all backdrop-blur-sm"
            >
              Browse All Devices
            </a>
          </div>

          {/* Quick value badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Percent className="w-5 h-5 text-emerald-400 mb-1.5" />
              <div className="text-xs font-bold text-white">0% No-Cost EMI</div>
              <div className="text-[11px] text-slate-400">Available up to 24 months</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-amber-400 mb-1.5" />
              <div className="text-xs font-bold text-white">Lien Backed</div>
              <div className="text-[11px] text-slate-400">No portfolio liquidation</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <Zap className="w-5 h-5 text-indigo-400 mb-1.5" />
              <div className="text-xs font-bold text-white">Instant Approval</div>
              <div className="text-[11px] text-slate-400">100% digital OTP journey</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-5 h-5 text-cyan-400 mb-1.5" />
              <div className="text-xs font-bold text-white">SEBI & RBI Regulated</div>
              <div className="text-[11px] text-slate-400">Bank-grade security</div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid Section */}
      <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#582BE8]">
              <Smartphone className="w-4 h-4" />
              <span>Available Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Smartphones on Mutual Fund EMI
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select any device to view custom mutual fund backed EMI plans, variant finishes, and instant approval options.
            </p>
          </div>

          <div className="text-xs font-medium text-slate-500 bg-white px-3.5 py-2 rounded-xl border border-slate-200 self-start md:self-auto">
            Showing <strong className="text-slate-800">{products.length}</strong> dynamic products
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            const defaultVar =
              product.variants.find((v) => v.isDefault) || product.variants[0];
            const lowestEmi = defaultVar?.emiPlans[0]?.monthlyAmount || 0;
            const discount = (defaultVar?.mrp || 0) - (defaultVar?.price || 0);

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-indigo-200 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-6">
                  {/* Top row: Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {product.badge ? (
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100">
                        {product.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <div className="flex items-center gap-1 text-xs text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                  </div>

                  {/* Image container */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center h-52 my-3 group-hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={defaultVar?.imageUrl}
                      alt={product.name}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md"
                    />
                  </Link>

                  {/* Brand & Title */}
                  <div className="mt-4">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {product.brand}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="text-base font-extrabold text-slate-900 hover:text-[#582BE8] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {defaultVar?.storage} • {product.variants.length} finishes
                    </p>
                  </div>

                  {/* Color dots preview */}
                  <div className="flex items-center gap-1.5 mt-3">
                    {product.variants.slice(0, 4).map((v) => (
                      <span
                        key={v.id}
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner"
                        style={{ backgroundColor: v.colorHex }}
                        title={v.colorName}
                      />
                    ))}
                    {product.variants.length > 4 && (
                      <span className="text-[10px] text-slate-400 font-semibold">
                        +{product.variants.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Footer: Pricing & CTA */}
                <div className="p-6 pt-0 border-t border-slate-100 mt-2">
                  <div className="pt-4 flex items-baseline justify-between">
                    <div>
                      <div className="text-xs text-slate-400 line-through">
                        ₹{defaultVar?.mrp.toLocaleString("en-IN")}
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        ₹{defaultVar?.price.toLocaleString("en-IN")}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-[10px] text-indigo-600 font-bold uppercase">
                        EMI Starts At
                      </div>
                      <div className="text-sm font-black text-[#582BE8]">
                        ₹{lowestEmi.toLocaleString("en-IN")}/mo
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/products/${product.slug}`}
                    className="mt-4 w-full py-2.5 px-4 rounded-xl bg-slate-900 group-hover:bg-[#582BE8] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <span>View EMI Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
