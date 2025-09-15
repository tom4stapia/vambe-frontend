// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    MEETING_TRENDS: '/api/v1/kpis/meetings/trends',
    KPI_OVERVIEW: '/api/v1/kpis/overview'
  }
};

export const getMeetingTrendsUrl = (period: 'monthly' | 'quarterly') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEETING_TRENDS}?period=${period}`;
};

export const getKPIOverviewUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.KPI_OVERVIEW}`;
};
