import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";

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

    // Augment with summary info (starting price, min EMI)
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
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch products",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
