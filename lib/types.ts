// Types for landing page data
export interface PartnerLogo {
  name: string;
  logoUrl: string;
}

export interface PropertyType {
  type: "houses" | "lands" | "apartments";
  title: string;
  imageUrl: string;
  icon: string;
}

export interface Location {
  city: string;
  avatarUrl: string;
}

export interface Feature {
  title: string;
  description: string;
  illustrationUrl?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
}

export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PricingFeature[];
  highlighted?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SocialLink {
  platform: "twitter" | "facebook" | "linkedin";
  url: string;
}