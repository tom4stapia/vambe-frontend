export { authService } from './auth/authService';
export { meetingsService } from './meetings/meetingsService';
export { clientsService } from './clients/clientsService';
export { salesService } from './sales/salesService';
export { kpisService } from './kpis/kpisService';

export type { LoginRequest, LoginResponse, User } from './auth/authService';
export type { 
  Classification, 
  ClassificationsResponse, 
  MeetingTableRow, 
  MeetingDetail, 
  MeetingTranscript, 
  MeetingTranscriptResponse 
} from './meetings/meetingsService';
export type { 
  SectorData, 
  LeadSourceData, 
  TechnologyData, 
  UseCaseData, 
  PainPointData, 
  ClientsResponse 
} from './clients/clientsService';
export type { 
  Seller, 
  SalesPerformance, 
  SalesResponse, 
  CreateSellerRequest, 
  UpdateSellerRequest,
  SellerPerformance,
  SellersResponse
} from './sales/salesService';
export type { 
  MeetingData, 
  KPIData, 
  MeetingTrendsResponse, 
  KPIOverviewResponse 
} from './kpis/kpisService';
