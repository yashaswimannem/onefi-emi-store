import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productId,
      variantId,
      emiPlanId,
      customerName,
      customerPhone,
      customerEmail,
      customerPan,
    } = body;

    if (!productId || !variantId || !emiPlanId || !customerName || !customerPhone) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation error",
          message: "Missing required fields (productId, variantId, emiPlanId, customerName, customerPhone)",
        },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    const emiPlan = await prisma.emiPlan.findUnique({
      where: { id: emiPlanId },
    });

    if (!product || !variant || !emiPlan) {
      return NextResponse.json(
        {
          success: false,
          error: "Not found",
          message: "One or more of product, variant, or EMI plan does not exist in the database",
        },
        { status: 404 }
      );
    }

    const application = await prisma.orderApplication.create({
      data: {
        productId: product.id,
        variantId: variant.id,
        emiPlanId: emiPlan.id,
        productName: product.name,
        variantDetails: `${variant.storage} • ${variant.colorName}`,
        tenureMonths: emiPlan.tenureMonths,
        monthlyAmount: emiPlan.monthlyAmount,
        interestRate: emiPlan.interestRate,
        cashbackAmount: emiPlan.cashbackAmount,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail?.trim() || "customer@example.com",
        customerPan: customerPan?.trim() || null,
        status: "APPROVED_PREQUALIFIED",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Mutual Fund Backed EMI Application submitted successfully!",
      applicationId: application.id,
      data: application,
    });
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process EMI application",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applications = await prisma.orderApplication.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    return NextResponse.json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
