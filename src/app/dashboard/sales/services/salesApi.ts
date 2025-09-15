import { SellerPerformance, Seller, CreateSellerRequest, UpdateSellerRequest, SellersResponse } from '../types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const salesApi = {
  async getSellerPerformance(): Promise<SellerPerformance[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/kpis/sellers/performance`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching seller performance:', error);
      throw new Error('Failed to fetch seller performance data');
    }
  },

  async getSellers(): Promise<Seller[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/sellers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData: SellersResponse = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to fetch sellers');
      }

      return responseData.data.sellers;
    } catch (error) {
      console.error('Error fetching sellers:', error);
      throw new Error('Failed to fetch sellers data');
    }
  },

  async createSeller(sellerData: CreateSellerRequest): Promise<Seller> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/sellers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to create seller');
      }

      return responseData.data;
    } catch (error) {
      console.error('Error creating seller:', error);
      throw new Error('Failed to create seller');
    }
  },

  async updateSeller(id: number, sellerData: UpdateSellerRequest): Promise<Seller> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/sellers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sellerData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to update seller');
      }

      return responseData.data;
    } catch (error) {
      console.error('Error updating seller:', error);
      throw new Error('Failed to update seller');
    }
  },

  async deleteSeller(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/sellers/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      
      if (!responseData.success) {
        throw new Error(responseData.message || 'Failed to delete seller');
      }
    } catch (error) {
      console.error('Error deleting seller:', error);
      throw new Error('Failed to delete seller');
    }
  },
};
