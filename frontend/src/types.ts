export interface ReviewDetails {
  count: number;
  stars: number;
  rating: number;
  questions: number;
  users: string;
}

export interface VolumeOption {
  id: string;
  name: string;
  price: number;
  img: string;
}

export interface WelcomeKitItem {
  name: string;
  price: string;
  img: string;
}

export interface SubscriptionOption {
  id: string;
  title: string;
  saveBadge: string;
  bestValue: boolean;
  priceMonthly: number;
  priceOriginal: number;
  billingInfo: string;
  features: string[];
  welcomeKitTitle: string;
  welcomeKitItems: WelcomeKitItem[];
}

export interface TrustBadgeItem {
  label: string;
  sub: string;
  icon: string;
}

export interface ProductDetails {
  title: string;
  subtitle: string;
  reviews: ReviewDetails;
  bullets: string[];
  images: string[];
  volumes: VolumeOption[];
  subscriptionOptions: SubscriptionOption[];
  trustBadges: TrustBadgeItem[];
  bottomChecklist: string[];
}

export interface SiteContent {
  announcement: string;
  benefitsTop: string[];
  siteName: string;
  navigation: string[];
  product: ProductDetails;
}
