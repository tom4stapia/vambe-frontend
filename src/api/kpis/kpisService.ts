import http from '../http';

export interface MeetingData {
  period: string;
  totalMeetings: number;
  completedMeetings: number;
  cancelledMeetings: number;
  completionRate: number;
  averageDuration: number;
}

export interface KPIData {
  totalClients: number;
  totalSellers: number;
  totalMeetings: number;
  totalClassifications: number;
  meetingsThisMonth: number;
  meetingsLastWeek: number;
  averageConversionRate: number;
  averageMeetingDuration: number;
}

export interface MeetingTrendsResponse {
  success: boolean;
  data: MeetingData[];
}

export interface KPIOverviewResponse {
  success: boolean;
  data: KPIData;
}

export const kpisService = {
  getMeetingTrends: async (period: 'monthly' | 'quarterly'): Promise<MeetingData[]> => {
    const response = await http.get(`/api/v1/kpis/meetings/trends?period=${period}`, {});
    const data: MeetingTrendsResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  },

  getKPIOverview: async (): Promise<KPIData> => {
    const response = await http.get('/api/v1/kpis/overview', {});
    const data: KPIOverviewResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  }
};
