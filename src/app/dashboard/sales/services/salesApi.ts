import { salesService, SellerPerformance, Seller, CreateSellerRequest, UpdateSellerRequest, SellersResponse } from '@/api';

export const salesApi = {
  async getSellerPerformance(): Promise<SellerPerformance[]> {
    try {
      return await salesService.getSellerPerformance();
    } catch (error) {
      console.error('Error fetching seller performance:', error);
      throw new Error('Failed to fetch seller performance data');
    }
  },

  async getSellers(): Promise<Seller[]> {
    try {
      const response = await salesService.getSellersPaginated();
      return response.data.sellers;
    } catch (error) {
      console.error('Error fetching sellers:', error);
      throw new Error('Failed to fetch sellers data');
    }
  },

  async createSeller(sellerData: CreateSellerRequest): Promise<Seller> {
    try {
      return await salesService.createSeller(sellerData);
    } catch (error) {
      console.error('Error creating seller:', error);
      throw new Error('Failed to create seller');
    }
  },

  async updateSeller(id: number, sellerData: UpdateSellerRequest): Promise<Seller> {
    try {
      return await salesService.updateSeller(id, sellerData);
    } catch (error) {
      console.error('Error updating seller:', error);
      throw new Error('Failed to update seller');
    }
  },

  async deleteSeller(id: number): Promise<void> {
    try {
      await salesService.deleteSeller(id);
    } catch (error) {
      console.error('Error deleting seller:', error);
      throw new Error('Failed to delete seller');
    }
  },
};
