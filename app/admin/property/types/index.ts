export interface Property {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  location: string;
  state: string;
  city: string;
  full_address: string | null;
  latitude: number | null;
  longitude: number | null;
  type: "LAND" | "HOUSE" | "APARTMENT" | string;
  status: "ACTIVE" | "INACTIVE" | "DRAFT" | string;

  featured_image: string | null;
  gallery_urls: string[] | null;

  approved_by_admin_id: string;
  created_by_admin_id: string;
  approved_at: string;

  is_provider_verified: boolean;
  is_insured: boolean;
  is_installment_available: boolean;

  provider: unknown | null;

  view_count: number;
  popularity_score: number;
  is_featured: boolean;

  total_units: number;
  sold_units: number;

  initial_deposit: string;

  bedrooms: number | null;
  bathrooms: number | null;
  square_footage: number | null;

  amenities: string[] | null;
  media: {
    id: string;
    created_at: string;
    updated_at: string;
    property_id: string;
    media_url: string;
    media_type: "image" | "video";
  }[];

  payment_plans: PaymentPlan[];
  documents: unknown[];

  created_by_admin: Admin;
  approved_by_admin: Admin;

  min_price: number;
  max_price: number;
}
export interface PaymentPlan {
  id: string;
  created_at: string;
  updated_at: string;
  property_id: string;
  plan_name: string;
  duration_months: number;
  installment_amount: string;
  price: string;
  created_by_admin_id: string;
}
export interface Admin {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  email: string;
  password: string;
  is_active: boolean;
  role: "ADMIN" | "SUPER_ADMIN" | string;
  last_login_at: string | null;
}
