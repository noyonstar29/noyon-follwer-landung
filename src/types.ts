export type ServiceCategory =
  | 'all'
  | 'bangladeshi'
  | 'global'
  | 'page-likes';

export interface FollowerPackage {
  id: string;
  name: string; // e.g. "1K Global Followers", "1K Bangladeshi Followers"
  serviceType: 'bangladeshi' | 'global' | 'page-likes';
  amount: number;
  priceBDT: number; // e.g. 80, 120, 599, 1199
  oldPriceBDT: number; // e.g. 150, 220, 999, 1999
  rating: number; // e.g. 4.9, 5.0
  reviewsCount: number;
  image: string;
  deliveryTime: string;
  badge?: string; // e.g. "Most Popular", "Best Value", "Top Selling"
  features: string[];
  checkoutUrl?: string; // Direct link to existing website product checkout page
  code?: string; // Unique product checkout code (e.g. lr05xDInngGpMfZDkwiw)
}

export interface ReviewScreenshot {
  id: string;
  customerName: string;
  customerHandle: string;
  customerAvatar: string;
  date: string;
  rating: number;
  orderInfo: string;
  verified: boolean;
  messageText: string;
  likesCount?: number;
  growthProof?: {
    before: string;
    after: string;
    gain: string;
    pageName: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface OrderDetails {
  orderId: string;
  package: FollowerPackage;
  pageUrl: string;
  whatsappOrPhone: string;
  paymentMethod: 'bKash' | 'Nagad' | 'Rocket' | 'Card';
  trxId?: string;
  totalPriceBDT: number;
  placedAt: string;
  status?: 'pending' | 'processing' | 'completed' | 'cancelled';
}
