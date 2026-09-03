import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase() || "";
    const category = searchParams.get("category") || "";

    // Attempt DB query
    try {
      if (process.env.DATABASE_URL) {
        const where: any = {};
        if (query) {
          where.OR = [
            { name: { contains: query } },
            { brand: { contains: query } },
            { description: { contains: query } },
          ];
        }
        if (category) {
          where.category = category;
        }

        const products = await prisma.product.findMany({
          where,
          include: {
            variants: {
              include: {
                emiPlans: {
                  orderBy: {
                    tenureMonths: "asc",
                  },
                },
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        if (products && products.length > 0) {
          const formatted = products.map((p) => {
            const defaultVariant =
              p.variants.find((v) => v.isDefault) || p.variants[0];
            const minEmi = defaultVariant?.emiPlans?.reduce(
              (min, plan) => (plan.monthlyAmount < min ? plan.monthlyAmount : min),
              defaultVariant.emiPlans[0]?.monthlyAmount || 0
            );

            return {
              id: p.id,
              slug: p.slug,
              name: p.name,
              brand: p.brand,
              category: p.category,
              description: p.description,
              tagline: p.tagline,
              badge: p.badge,
              rating: p.rating,
              reviewCount: p.reviewCount,
              startingPrice: defaultVariant?.price || 0,
              mrp: defaultVariant?.mrp || 0,
              startingMonthlyEmi: minEmi,
              previewImage: defaultVariant?.imageUrl || "",
              variantCount: p.variants.length,
              variants: p.variants,
            };
          });

          return NextResponse.json({
            success: true,
            count: formatted.length,
            data: formatted,
          });
        }
      }
    } catch (dbErr) {
      console.warn("Prisma DB query failed, falling back to static catalog:", dbErr);
    }

    // Resilient fallback (guarantees 100% uptime on Vercel even if DATABASE_URL is not set)
    let filtered = FALLBACK_PRODUCTS;
    if (query) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query)
      );
    }
    if (category) {
      filtered = filtered.filter((p) => p.category === category);
    }

    return NextResponse.json({
      success: true,
      count: filtered.length,
      data: filtered,
    });
  } catch (error: any) {
    console.error("GET /api/products fatal error:", error);
    return NextResponse.json(
      {
        success: true,
        count: FALLBACK_PRODUCTS.length,
        data: FALLBACK_PRODUCTS,
      },
      { status: 200 }
    );
  }
}
