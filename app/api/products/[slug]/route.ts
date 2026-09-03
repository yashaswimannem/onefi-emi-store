import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { FALLBACK_PRODUCTS } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // 1. Try querying Database via Prisma
    try {
      if (process.env.DATABASE_URL) {
        const product = await prisma.product.findFirst({
          where: {
            OR: [{ slug: slug }, { id: slug }],
          },
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
        });

        if (product) {
          return NextResponse.json({
            success: true,
            data: product,
          });
        }
      }
    } catch (dbErr) {
      console.warn("Prisma query failed, using fallback data for slug:", slug, dbErr);
    }

    // 2. Resilient fallback
    const fallbackProduct = FALLBACK_PRODUCTS.find(
      (p) => p.slug === slug || p.id === slug
    );

    if (!fallbackProduct) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
          message: `No product matches slug "${slug}"`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: fallbackProduct,
    });
  } catch (error: any) {
    console.error("GET /api/products/[slug] error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch product details",
        message: error.message,
      },
      { status: 500 }
    );
  }
}
