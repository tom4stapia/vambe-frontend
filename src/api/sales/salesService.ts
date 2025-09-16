import http from '../http';

export interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  active: boolean;
  total_meetings: number;
  successful_meetings: number;
  success_rate: number;
  total_revenue: number;
  average_deal_size: number;
  last_activity: string;
  prompt?: string;
  created_at?: string;
  updated_at?: string;
}

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

export interface SalesPerformance {
  total_sellers: number;
  active_sellers: number;
  total_meetings: number;
  successful_meetings: number;
  overall_success_rate: number;
  total_revenue: number;
  average_deal_size: number;
  top_performers: Seller[];
  recent_activities: {
    seller_name: string;
    activity: string;
    timestamp: string;
    type: 'meeting' | 'deal' | 'follow_up';
  }[];
}

export interface SalesResponse {
  success: boolean;
  data: SalesPerformance;
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

export const salesService = {
  getSalesPerformance: async (): Promise<SalesPerformance> => {
    const response = await http.get('/api/v1/sales/performance', {});
    const data: SalesResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  },

  
  getSellers: async (): Promise<Seller[]> => {
    const response = await http.get('/api/v1/sellers', {});
    return response.data;
  },

  
  getSeller: async (sellerId: number): Promise<Seller> => {
    const response = await http.get(`/api/v1/sellers/${sellerId}`, {});
    return response.data;
  },

  createSeller: async (sellerData: CreateSellerRequest): Promise<Seller> => {
    const response = await http.post('/api/v1/sellers', sellerData);
    return response.data.data;
  },

  updateSeller: async (sellerId: number, sellerData: UpdateSellerRequest): Promise<Seller> => {
    const response = await http.put(`/api/v1/sellers/${sellerId}`, sellerData);
    return response.data.data;
  },

  deleteSeller: async (sellerId: number): Promise<void> => {
    await http.delete(`/api/v1/sellers/${sellerId}`);
  },

  getSellerPerformance: async (): Promise<SellerPerformance[]> => {
    const response = await http.get('/api/v1/kpis/sellers/performance', {});
    return response.data.data;
  },

  getSellersPaginated: async (): Promise<SellersResponse> => {
    const response = await http.get('/api/v1/sellers', {});
    return response.data;
  }
};
