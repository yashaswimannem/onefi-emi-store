import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function calculateEmiPlans(price: number, cashback = 7500) {
  return [
    {
      tenureMonths: 3,
      monthlyAmount: Math.round(price / 3 + 800), // e.g. 44967
      interestRate: 0.0,
      cashbackAmount: cashback,
      isRecommended: false,
    },
    {
      tenureMonths: 6,
      monthlyAmount: Math.round(price / 6 + 416), // e.g. 22483
      interestRate: 0.0,
      cashbackAmount: cashback,
      isRecommended: true,
    },
    {
      tenureMonths: 12,
      monthlyAmount: Math.round(price / 12 + 208), // e.g. 11242
      interestRate: 0.0,
      cashbackAmount: cashback,
      isRecommended: false,
    },
    {
      tenureMonths: 24,
      monthlyAmount: Math.round(price / 24 + 104), // e.g. 5621
      interestRate: 0.0,
      cashbackAmount: cashback,
      isRecommended: false,
    },
    {
      tenureMonths: 36,
      // 10.5% reducing balance / standard EMI
      monthlyAmount: Math.round(
        (price * (10.5 / 1200) * Math.pow(1 + 10.5 / 1200, 36)) /
          (Math.pow(1 + 10.5 / 1200, 36) - 1) +
          150
      ), // e.g. ~4297
      interestRate: 10.5,
      cashbackAmount: cashback,
      isRecommended: false,
    },
    {
      tenureMonths: 48,
      monthlyAmount: Math.round(
        (price * (10.5 / 1200) * Math.pow(1 + 10.5 / 1200, 48)) /
          (Math.pow(1 + 10.5 / 1200, 48) - 1) +
          130
      ), // e.g. ~3385
      interestRate: 10.5,
      cashbackAmount: cashback,
      isRecommended: false,
    },
    {
      tenureMonths: 60,
      monthlyAmount: Math.round(
        (price * (10.5 / 1200) * Math.pow(1 + 10.5 / 1200, 60)) /
          (Math.pow(1 + 10.5 / 1200, 60) - 1) +
          110
      ), // e.g. ~2842
      interestRate: 10.5,
      cashbackAmount: cashback,
      isRecommended: false,
    },
  ];
}

async function main() {
  console.log("Seeding database...");

  // Clean existing records
  await prisma.orderApplication.deleteMany();
  await prisma.emiPlan.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();

  // 1. Apple iPhone 17 Pro (Reference Product)
  const iphone = await prisma.product.create({
    data: {
      slug: "iphone-17-pro",
      name: "iPhone 17 Pro",
      brand: "Apple",
      category: "Smartphones",
      description:
        "iPhone 17 Pro features a forged titanium design, advanced camera system with 5x telephoto, A19 Pro Bionic chip with hardware-accelerated ray tracing, and next-gen Ceramic Shield.",
      tagline: "Titanium. So strong. So light. So Pro.",
      badge: "NEW",
      rating: 4.9,
      reviewCount: 342,
    },
  });

  const iphoneVariants = [
    {
      name: "iPhone 17 Pro 256GB - Desert Titanium",
      colorName: "Desert Titanium",
      colorHex: "#C58B68",
      storage: "256GB",
      mrp: 134900,
      price: 127400,
      imageUrl: "/images/products/iphone-17-pro-desert.svg",
      isDefault: true,
      customPlans: [
        { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true },
        { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
      ],
    },
    {
      name: "iPhone 17 Pro 256GB - White Titanium",
      colorName: "White Titanium",
      colorHex: "#E3E4E5",
      storage: "256GB",
      mrp: 134900,
      price: 127400,
      imageUrl: "/images/products/iphone-17-pro-white.svg",
      isDefault: false,
      customPlans: [
        { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true },
        { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
      ],
    },
    {
      name: "iPhone 17 Pro 256GB - Black Titanium",
      colorName: "Black Titanium",
      colorHex: "#3C3B40",
      storage: "256GB",
      mrp: 134900,
      price: 127400,
      imageUrl: "/images/products/iphone-17-pro-black.svg",
      isDefault: false,
      customPlans: [
        { tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true },
        { tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
        { tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false },
      ],
    },
    {
      name: "iPhone 17 Pro 512GB - Desert Titanium",
      colorName: "Desert Titanium",
      colorHex: "#C58B68",
      storage: "512GB",
      mrp: 154900,
      price: 147400,
      imageUrl: "/images/products/iphone-17-pro-desert.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(147400, 8500),
    },
    {
      name: "iPhone 17 Pro 512GB - Black Titanium",
      colorName: "Black Titanium",
      colorHex: "#3C3B40",
      storage: "512GB",
      mrp: 154900,
      price: 147400,
      imageUrl: "/images/products/iphone-17-pro-black.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(147400, 8500),
    },
    {
      name: "iPhone 17 Pro 1TB - Desert Titanium",
      colorName: "Desert Titanium",
      colorHex: "#C58B68",
      storage: "1TB",
      mrp: 174900,
      price: 167400,
      imageUrl: "/images/products/iphone-17-pro-desert.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(167400, 10000),
    },
  ];

  for (const v of iphoneVariants) {
    const { customPlans, ...variantData } = v;
    const variant = await prisma.productVariant.create({
      data: {
        ...variantData,
        productId: iphone.id,
      },
    });

    for (const plan of customPlans) {
      await prisma.emiPlan.create({
        data: {
          variantId: variant.id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          isRecommended: plan.isRecommended,
          mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund",
        },
      });
    }
  }

  // 2. Samsung Galaxy S24 Ultra
  const samsung = await prisma.product.create({
    data: {
      slug: "samsung-s24-ultra",
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      category: "Smartphones",
      description:
        "Galaxy S24 Ultra features Galaxy AI built-in, titanium exterior, built-in S Pen, 200MP quad telephoto camera, and Snapdragon 8 Gen 3 for Galaxy.",
      tagline: "Galaxy AI is here. Epic in every detail.",
      badge: "AI FLAGSHIP",
      rating: 4.8,
      reviewCount: 289,
    },
  });

  const samsungVariants = [
    {
      name: "Samsung Galaxy S24 Ultra 256GB - Titanium Gray",
      colorName: "Titanium Gray",
      colorHex: "#6F6F74",
      storage: "256GB",
      mrp: 134999,
      price: 119999,
      imageUrl: "/images/products/samsung-s24-gray.svg",
      isDefault: true,
      customPlans: calculateEmiPlans(119999, 7000),
    },
    {
      name: "Samsung Galaxy S24 Ultra 256GB - Titanium Black",
      colorName: "Titanium Black",
      colorHex: "#2C2C2E",
      storage: "256GB",
      mrp: 134999,
      price: 119999,
      imageUrl: "/images/products/samsung-s24-black.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(119999, 7000),
    },
    {
      name: "Samsung Galaxy S24 Ultra 512GB - Titanium Violet",
      colorName: "Titanium Violet",
      colorHex: "#4C4656",
      storage: "512GB",
      mrp: 144999,
      price: 129999,
      imageUrl: "/images/products/samsung-s24-violet.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(129999, 8000),
    },
  ];

  for (const v of samsungVariants) {
    const { customPlans, ...variantData } = v;
    const variant = await prisma.productVariant.create({
      data: {
        ...variantData,
        productId: samsung.id,
      },
    });

    for (const plan of customPlans) {
      await prisma.emiPlan.create({
        data: {
          variantId: variant.id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          isRecommended: plan.isRecommended,
          mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund",
        },
      });
    }
  }

  // 3. Google Pixel 9 Pro
  const pixel = await prisma.product.create({
    data: {
      slug: "pixel-9-pro",
      name: "Google Pixel 9 Pro",
      brand: "Google",
      category: "Smartphones",
      description:
        "Pixel 9 Pro with Gemini Nano built-in, pro triple rear camera system with 30x Super Res Zoom, Google Tensor G4 chip, and 7 years of Pixel Drops.",
      tagline: "Engineered by Google. Guided by Gemini.",
      badge: "GEMINI AI",
      rating: 4.7,
      reviewCount: 194,
    },
  });

  const pixelVariants = [
    {
      name: "Google Pixel 9 Pro 128GB - Porcelain",
      colorName: "Porcelain",
      colorHex: "#F2EFEB",
      storage: "128GB",
      mrp: 109999,
      price: 99999,
      imageUrl: "/images/products/pixel-9-porcelain.svg",
      isDefault: true,
      customPlans: calculateEmiPlans(99999, 6000),
    },
    {
      name: "Google Pixel 9 Pro 256GB - Obsidian",
      colorName: "Obsidian",
      colorHex: "#1E1F22",
      storage: "256GB",
      mrp: 119999,
      price: 109999,
      imageUrl: "/images/products/pixel-9-obsidian.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(109999, 6500),
    },
    {
      name: "Google Pixel 9 Pro 256GB - Rose Quartz",
      colorName: "Rose Quartz",
      colorHex: "#E5C8CC",
      storage: "256GB",
      mrp: 119999,
      price: 109999,
      imageUrl: "/images/products/pixel-9-rose.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(109999, 6500),
    },
  ];

  for (const v of pixelVariants) {
    const { customPlans, ...variantData } = v;
    const variant = await prisma.productVariant.create({
      data: {
        ...variantData,
        productId: pixel.id,
      },
    });

    for (const plan of customPlans) {
      await prisma.emiPlan.create({
        data: {
          variantId: variant.id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          isRecommended: plan.isRecommended,
          mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund",
        },
      });
    }
  }

  // 4. OnePlus 12
  const oneplus = await prisma.product.create({
    data: {
      slug: "oneplus-12",
      name: "OnePlus 12 5G",
      brand: "OnePlus",
      category: "Smartphones",
      description:
        "OnePlus 12 pairs Snapdragon 8 Gen 3 with 4th Gen Hasselblad Camera System, 2K 120Hz ProXDR display, and 100W SUPERVOOC charging.",
      tagline: "Smooth Beyond Belief.",
      badge: "POPULAR",
      rating: 4.8,
      reviewCount: 412,
    },
  });

  const oneplusVariants = [
    {
      name: "OnePlus 12 256GB - Silky Black",
      colorName: "Silky Black",
      colorHex: "#222326",
      storage: "256GB",
      mrp: 69999,
      price: 64999,
      imageUrl: "/images/products/oneplus-12-black.svg",
      isDefault: true,
      customPlans: calculateEmiPlans(64999, 4500),
    },
    {
      name: "OnePlus 12 512GB - Flowy Emerald",
      colorName: "Flowy Emerald",
      colorHex: "#2E534C",
      storage: "512GB",
      mrp: 74999,
      price: 69999,
      imageUrl: "/images/products/oneplus-12-emerald.svg",
      isDefault: false,
      customPlans: calculateEmiPlans(69999, 5000),
    },
  ];

  for (const v of oneplusVariants) {
    const { customPlans, ...variantData } = v;
    const variant = await prisma.productVariant.create({
      data: {
        ...variantData,
        productId: oneplus.id,
      },
    });

    for (const plan of customPlans) {
      await prisma.emiPlan.create({
        data: {
          variantId: variant.id,
          tenureMonths: plan.tenureMonths,
          monthlyAmount: plan.monthlyAmount,
          interestRate: plan.interestRate,
          cashbackAmount: plan.cashbackAmount,
          isRecommended: plan.isRecommended,
          mfSchemeName: "1Fi Balanced Tech Savings Fund",
        },
      });
    }
  }

  console.log("Database seeded successfully with 4 products, 14 variants, and 98 EMI plans!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
