export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  ENDPOINTS: {
    MEETING_TRENDS: '/api/v1/kpis/meetings/trends',
    KPI_OVERVIEW: '/api/v1/kpis/overview',
    CLIENT_ANALYSIS: '/api/v1/kpis/clients/analysis',
    CLASSIFICATIONS: '/api/v1/classifications',
    MEETING_DETAIL: '/api/v1/meetings'
  }
};

export const getMeetingTrendsUrl = (period: 'monthly' | 'quarterly') => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEETING_TRENDS}?period=${period}`;
};

export const getKPIOverviewUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.KPI_OVERVIEW}`;
};

export const getClientAnalysisUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLIENT_ANALYSIS}`;
};

export const getClassificationsUrl = () => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CLASSIFICATIONS}`;
};

export const getMeetingDetailUrl = (meetingId: number) => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.MEETING_DETAIL}/${meetingId}`;
};
