export type CurrencyCode = 'PKR' | 'USD' | 'GBP' | 'EUR' | 'AED';

export type UserRole = 'buyer' | 'admin' | 'artisan';

export type ArtisanTown = 'Bhit Shah' | 'Hala' | 'Matiari' | 'Sukkur' | 'Tharparkar';

export type CraftTechnique = 
  | 'Hand-block printed' 
  | 'Natural Veg-dye (Teli)' 
  | 'Hand-stitched Appliqué (Tuk)' 
  | 'Patchwork Rilli' 
  | 'Cobalt Kashi Glaze'
  | 'Handloom Khaddar';

export type BaseMaterial = 
  | 'Cambric Cotton' 
  | 'Pure Mulberry Silk' 
  | 'Handloom Khaddar' 
  | 'Fine Voile' 
  | 'Natural Terracotta Clay';

export type IntendedUse = 
  | 'Apparel / Chaddar' 
  | 'Bedding / Quilt' 
  | 'Wall Décor' 
  | 'Cushion Covers' 
  | 'Artisanal Ceramic';

export type LightingMode = 'sunlight' | 'indoor' | 'gallery';

export interface Artisan {
  id: string;
  name: string;
  honorific: string;
  town: ArtisanTown;
  region: string;
  generationCount: number;
  craftSpecialty: string;
  bio: string;
  avatarUrl: string;
  workshopLocation: string;
  cooperativeSharePercentage: number; // e.g. 70% direct to artisan
  quote: string;
}

export interface ProductDimensions {
  lengthInches: number;
  widthInches: number;
  lengthCm: number;
  widthCm: number;
  weightGrams: number;
  categoryScaleType: 'bedding' | 'shawl' | 'wall_hanging' | 'pottery' | 'cushion';
}

export interface ProductReview {
  id: string;
  userName: string;
  userCity: string;
  rating: number; // 1-5
  date: string;
  comment: string;
  verifiedBuyer: boolean;
  userImageUrl?: string;
}

export interface Product {
  id: string;
  title: string;
  sindhiName: string; // e.g. "تيلى اجرڪ" (Teli Ajrak)
  subtitle: string;
  category: 'Ajrak' | 'Rilli' | 'Kashi Pottery' | 'Khadi Handloom';
  pricePKR: number;
  originalPricePKR?: number;
  artisanId: string;
  artisanTown: ArtisanTown;
  technique: CraftTechnique;
  baseMaterial: BaseMaterial;
  intendedUse: IntendedUse;
  isOneOfAKind: boolean;
  stockQuantity: number;
  inStock: boolean;
  isNaturalDyeCertified: boolean;
  dyeIngredients: string[]; // e.g. ["Natural Indigofera Tinctoria", "Madder Root (Majith)", "Tamarind Seed", "Iron Rust"]
  numberOfStages: number; // e.g. 14 stages
  dimensions: ProductDimensions;
  mainImage: string;
  secondaryImage: string;
  detailImage: string;
  lightingImages?: {
    sunlight: string;
    indoor: string;
    gallery: string;
  };
  description: string;
  provenanceDetails: string;
  careInstructions: string[];
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedLighting?: LightingMode;
  reservationExpiry?: number; // timestamp
}

export type OrderStatus = 
  | 'Pending' 
  | 'Processing' 
  | 'Awaiting Courier Pickup' 
  | 'In Transit' 
  | 'Delivered' 
  | 'Cancelled'
  | 'Refunded';

export type CourierService = 'TCS Express' | 'Leopards Domestic' | 'DHL Express Worldwide';

export interface OrderItem {
  productId: string;
  productTitle: string;
  productImage: string;
  pricePKR: number;
  quantity: number;
}

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotalPKR: number;
  shippingFeePKR: number;
  totalPKR: number;
  currencyPaid: CurrencyCode;
  paymentMethod: 'Stripe Card' | 'JazzCash' | 'EasyPaisa' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending Cash Collection' | 'Refunded';
  status: OrderStatus;
  courier: CourierService;
  trackingNumber: string;
  trackingSteps: {
    status: OrderStatus;
    timestamp: string;
    description: string;
    location: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  savedAddresses: {
    id: string;
    label: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
}

export interface CraftArticle {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  date: string;
  category: string;
  content: string;
  imageUrl: string;
  tags: string[];
}
