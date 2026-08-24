export interface Product {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  shortDescription: string;
  fullDescription: string;
  volumeOrWeight?: string;
  usage?: string;
  ingredients?: string;
  brand?: string;
  sku: string;
  dateAdded: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
}

export interface Review {
  id: string;
  productId?: string;
  authorName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  productName?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  heroSlogan: string;
  heroBadge: string;
  heroCtaText: string;
  heroImageUrl: string;
  announcementText: string;
  isAnnouncementActive: boolean;
  aboutTitle: string;
  aboutStory: string;
  aboutMission: string;
  aboutValues: string[];
  contactPhone: string;
  contactViber: string;
  contactEmail: string;
  contactAddress: string;
  workingHoursWeekdays: string;
  workingHoursSaturday: string;
  workingHoursSunday: string;
  freeShippingThreshold: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  note?: string;
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  totalPrice: number;
  paymentMethod: 'cash_on_delivery' | 'card';
  status: 'new' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export type ActivePage = 'home' | 'products' | 'about' | 'reviews' | 'contact';
