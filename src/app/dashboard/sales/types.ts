export interface SellerPerformance {
  sellerId: number;
  sellerName: string;
  totalMeetings: number;
  completedMeetings: number;
  completionRate: number;
  averagePositiveSentiment: number;
  totalClassifications: number;
  averageConfidence: number | null;
  ranking: number;
}

export interface Seller {
  id?: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  prompt: string;
  created_at?: string;
  updated_at?: string;
}

export interface SellersResponse {
  success: boolean;
  data: {
    sellers: Seller[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface CreateSellerRequest {
  name: string;
  email: string;
  phone: string;
  active: boolean;
  prompt: string;
}

export interface UpdateSellerRequest {
  name?: string;
  email?: string;
  phone?: string;
  active?: boolean;
  prompt?: string;
}
