import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductDetailClient from "@/components/ProductDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findFirst({
    where: {
      OR: [{ slug: slug }, { id: slug }],
    },
  });

  if (!product) {
    return {
      title: "Product Not Found | 1Fi Store",
    };
  }

  return {
    title: `${product.name} on Mutual Fund Backed EMI | 1Fi Store`,
    description: `Buy ${product.name} with 0% interest EMI backed by your mutual funds. Instant lien approval and up to ₹7,500 cashback.`,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  // Query product dynamically from database via Prisma
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

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product as any} />;
}
