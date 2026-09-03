import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "@/components/ProductDetailClient";
import { FALLBACK_PRODUCTS } from "@/lib/catalog-data";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let name = "Flagship Smartphone";

  try {
    if (process.env.DATABASE_URL) {
      const product = await prisma.product.findFirst({
        where: { OR: [{ slug: slug }, { id: slug }] },
      });
      if (product) name = product.name;
    }
  } catch (e) {
    const fb = FALLBACK_PRODUCTS.find((p) => p.slug === slug || p.id === slug);
    if (fb) name = fb.name;
  }

  return {
    title: `${name} on Mutual Fund Backed EMI | 1Fi Store`,
    description: `Buy ${name} with 0% interest EMI backed by your mutual funds. Instant lien approval and up to ₹7,500 cashback.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let product: any = null;

  // 1. Try Prisma DB query
  try {
    if (process.env.DATABASE_URL) {
      product = await prisma.product.findFirst({
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
    }
  } catch (err) {
    console.warn("ProductDetailPage DB query failed, using fallback:", err);
  }

  // 2. Resilient fallback
  if (!product) {
    product = FALLBACK_PRODUCTS.find(
      (p) => p.slug === slug || p.id === slug
    );
  }

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product as any} />;
}
