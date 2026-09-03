export interface EmiPlanData {
  id: string;
  tenureMonths: number;
  monthlyAmount: number;
  interestRate: number;
  cashbackAmount: number;
  isRecommended: boolean;
  mfSchemeName: string;
}

export interface VariantData {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  storage: string;
  mrp: number;
  price: number;
  imageUrl: string;
  inStock: boolean;
  isDefault: boolean;
  emiPlans: EmiPlanData[];
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  tagline?: string | null;
  badge?: string | null;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  mrp: number;
  startingMonthlyEmi: number;
  previewImage: string;
  variantCount: number;
  variants: VariantData[];
}

export const FALLBACK_PRODUCTS: ProductData[] = [
  {
    id: "prod_iphone17pro",
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
    startingPrice: 127400,
    mrp: 134900,
    startingMonthlyEmi: 2842,
    previewImage: "/images/products/iphone-17-pro-desert.svg",
    variantCount: 3,
    variants: [
      {
        id: "var_iphone_desert_256",
        name: "iPhone 17 Pro 256GB - Desert Titanium",
        colorName: "Desert Titanium",
        colorHex: "#C58B68",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-desert.svg",
        inStock: true,
        isDefault: true,
        emiPlans: [
          { id: "emi_1", tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_2", tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_3", tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_4", tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_5", tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_6", tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_7", tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
        ],
      },
      {
        id: "var_iphone_white_256",
        name: "iPhone 17 Pro 256GB - White Titanium",
        colorName: "White Titanium",
        colorHex: "#E3E4E5",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-white.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_w1", tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w2", tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w3", tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w4", tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w5", tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w6", tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_w7", tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
        ],
      },
      {
        id: "var_iphone_black_256",
        name: "iPhone 17 Pro 256GB - Black Titanium",
        colorName: "Black Titanium",
        colorHex: "#3C3B40",
        storage: "256GB",
        mrp: 134900,
        price: 127400,
        imageUrl: "/images/products/iphone-17-pro-black.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_b1", tenureMonths: 3, monthlyAmount: 44967, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b2", tenureMonths: 6, monthlyAmount: 22483, interestRate: 0.0, cashbackAmount: 7500, isRecommended: true, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b3", tenureMonths: 12, monthlyAmount: 11242, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b4", tenureMonths: 24, monthlyAmount: 5621, interestRate: 0.0, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b5", tenureMonths: 36, monthlyAmount: 4297, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b6", tenureMonths: 48, monthlyAmount: 3385, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
          { id: "emi_b7", tenureMonths: 60, monthlyAmount: 2842, interestRate: 10.5, cashbackAmount: 7500, isRecommended: false, mfSchemeName: "1Fi Liquid & Arbitrage Yield Fund" },
        ],
      },
    ],
  },
  {
    id: "prod_samsung_s24",
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
    startingPrice: 119999,
    mrp: 134999,
    startingMonthlyEmi: 2689,
    previewImage: "/images/products/samsung-s24-gray.svg",
    variantCount: 3,
    variants: [
      {
        id: "var_s24_gray",
        name: "Samsung Galaxy S24 Ultra 256GB - Titanium Gray",
        colorName: "Titanium Gray",
        colorHex: "#6F6F74",
        storage: "256GB",
        mrp: 134999,
        price: 119999,
        imageUrl: "/images/products/samsung-s24-gray.svg",
        inStock: true,
        isDefault: true,
        emiPlans: [
          { id: "emi_s1", tenureMonths: 3, monthlyAmount: 40799, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s2", tenureMonths: 6, monthlyAmount: 20415, interestRate: 0.0, cashbackAmount: 7000, isRecommended: true, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s3", tenureMonths: 12, monthlyAmount: 10207, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s4", tenureMonths: 24, monthlyAmount: 5103, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s5", tenureMonths: 36, monthlyAmount: 4047, interestRate: 10.5, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s6", tenureMonths: 48, monthlyAmount: 3188, interestRate: 10.5, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_s7", tenureMonths: 60, monthlyAmount: 2689, interestRate: 10.5, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
        ],
      },
      {
        id: "var_s24_black",
        name: "Samsung Galaxy S24 Ultra 256GB - Titanium Black",
        colorName: "Titanium Black",
        colorHex: "#2C2C2E",
        storage: "256GB",
        mrp: 134999,
        price: 119999,
        imageUrl: "/images/products/samsung-s24-black.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_sb1", tenureMonths: 3, monthlyAmount: 40799, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_sb2", tenureMonths: 6, monthlyAmount: 20415, interestRate: 0.0, cashbackAmount: 7000, isRecommended: true, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_sb3", tenureMonths: 12, monthlyAmount: 10207, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_sb4", tenureMonths: 24, monthlyAmount: 5103, interestRate: 0.0, cashbackAmount: 7000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
        ],
      },
      {
        id: "var_s24_violet",
        name: "Samsung Galaxy S24 Ultra 512GB - Titanium Violet",
        colorName: "Titanium Violet",
        colorHex: "#4C4656",
        storage: "512GB",
        mrp: 144999,
        price: 129999,
        imageUrl: "/images/products/samsung-s24-violet.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_sv1", tenureMonths: 3, monthlyAmount: 44133, interestRate: 0.0, cashbackAmount: 8000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_sv2", tenureMonths: 6, monthlyAmount: 22082, interestRate: 0.0, cashbackAmount: 8000, isRecommended: true, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
          { id: "emi_sv3", tenureMonths: 12, monthlyAmount: 11041, interestRate: 0.0, cashbackAmount: 8000, isRecommended: false, mfSchemeName: "1Fi Multi-Asset Yield Advantage Fund" },
        ],
      },
    ],
  },
  {
    id: "prod_pixel_9",
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
    startingPrice: 99999,
    mrp: 109999,
    startingMonthlyEmi: 2259,
    previewImage: "/images/products/pixel-9-porcelain.svg",
    variantCount: 3,
    variants: [
      {
        id: "var_pixel_porcelain",
        name: "Google Pixel 9 Pro 128GB - Porcelain",
        colorName: "Porcelain",
        colorHex: "#F2EFEB",
        storage: "128GB",
        mrp: 109999,
        price: 99999,
        imageUrl: "/images/products/pixel-9-porcelain.svg",
        inStock: true,
        isDefault: true,
        emiPlans: [
          { id: "emi_p1", tenureMonths: 3, monthlyAmount: 34133, interestRate: 0.0, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p2", tenureMonths: 6, monthlyAmount: 17082, interestRate: 0.0, cashbackAmount: 6000, isRecommended: true, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p3", tenureMonths: 12, monthlyAmount: 8541, interestRate: 0.0, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p4", tenureMonths: 24, monthlyAmount: 4270, interestRate: 0.0, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p5", tenureMonths: 36, monthlyAmount: 3388, interestRate: 10.5, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p6", tenureMonths: 48, monthlyAmount: 2670, interestRate: 10.5, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_p7", tenureMonths: 60, monthlyAmount: 2259, interestRate: 10.5, cashbackAmount: 6000, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
        ],
      },
      {
        id: "var_pixel_obsidian",
        name: "Google Pixel 9 Pro 256GB - Obsidian",
        colorName: "Obsidian",
        colorHex: "#1E1F22",
        storage: "256GB",
        mrp: 119999,
        price: 109999,
        imageUrl: "/images/products/pixel-9-obsidian.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_po1", tenureMonths: 3, monthlyAmount: 37466, interestRate: 0.0, cashbackAmount: 6500, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_po2", tenureMonths: 6, monthlyAmount: 18749, interestRate: 0.0, cashbackAmount: 6500, isRecommended: true, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
        ],
      },
      {
        id: "var_pixel_rose",
        name: "Google Pixel 9 Pro 256GB - Rose Quartz",
        colorName: "Rose Quartz",
        colorHex: "#E5C8CC",
        storage: "256GB",
        mrp: 119999,
        price: 109999,
        imageUrl: "/images/products/pixel-9-rose.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_pr1", tenureMonths: 3, monthlyAmount: 37466, interestRate: 0.0, cashbackAmount: 6500, isRecommended: false, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
          { id: "emi_pr2", tenureMonths: 6, monthlyAmount: 18749, interestRate: 0.0, cashbackAmount: 6500, isRecommended: true, mfSchemeName: "1Fi Smart Equity & Arbitrage Growth Fund" },
        ],
      },
    ],
  },
  {
    id: "prod_oneplus_12",
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
    startingPrice: 64999,
    mrp: 69999,
    startingMonthlyEmi: 1507,
    previewImage: "/images/products/oneplus-12-black.svg",
    variantCount: 2,
    variants: [
      {
        id: "var_op_black",
        name: "OnePlus 12 256GB - Silky Black",
        colorName: "Silky Black",
        colorHex: "#222326",
        storage: "256GB",
        mrp: 69999,
        price: 64999,
        imageUrl: "/images/products/oneplus-12-black.svg",
        inStock: true,
        isDefault: true,
        emiPlans: [
          { id: "emi_op1", tenureMonths: 3, monthlyAmount: 22466, interestRate: 0.0, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op2", tenureMonths: 6, monthlyAmount: 11249, interestRate: 0.0, cashbackAmount: 4500, isRecommended: true, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op3", tenureMonths: 12, monthlyAmount: 5624, interestRate: 0.0, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op4", tenureMonths: 24, monthlyAmount: 2812, interestRate: 0.0, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op5", tenureMonths: 36, monthlyAmount: 2225, interestRate: 10.5, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op6", tenureMonths: 48, monthlyAmount: 1754, interestRate: 10.5, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_op7", tenureMonths: 60, monthlyAmount: 1507, interestRate: 10.5, cashbackAmount: 4500, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
        ],
      },
      {
        id: "var_op_emerald",
        name: "OnePlus 12 512GB - Flowy Emerald",
        colorName: "Flowy Emerald",
        colorHex: "#2E534C",
        storage: "512GB",
        mrp: 74999,
        price: 69999,
        imageUrl: "/images/products/oneplus-12-emerald.svg",
        inStock: true,
        isDefault: false,
        emiPlans: [
          { id: "emi_ope1", tenureMonths: 3, monthlyAmount: 24133, interestRate: 0.0, cashbackAmount: 5000, isRecommended: false, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
          { id: "emi_ope2", tenureMonths: 6, monthlyAmount: 12082, interestRate: 0.0, cashbackAmount: 5000, isRecommended: true, mfSchemeName: "1Fi Balanced Tech Savings Fund" },
        ],
      },
    ],
  },
];
