import { clientsService } from '@/api/clients/clientsService';
import { meetingsService } from '@/api/meetings/meetingsService';

export interface SectorData {
  sector: string;
  count: number;
  percentage: number;
}

export interface LeadSourceData {
  source: string;
  count: number;
  percentage: number;
}

export interface TechnologyData {
  vambe_product: string;
  count: number;
  percentage: number;
}

export interface UseCaseData {
  use_case: string;
  count: number;
  percentage: number;
}

export interface PainPointData {
  primary_pain_point: string;
  count: number;
  percentage: number;
}

export interface ClassificationData {
  id: number;
  meeting_id: number;
  business_sector: string;
  company_size: string;
  region: string;
  lead_source: string;
  vambe_product: string;
  use_case: string;
  primary_pain_point: string;
  urgency: boolean;
  decision_maker_role: string;
  purchase_stage: string;
  language: string;
  lost_client_bad_meeting: boolean;
  categories: string[];
  confidence_score: string;
  sentiment: string;
  key_topics: string[];
  action_items: string[];
  next_steps: string;
  summary: string;
  model_used: string;
  processed_at: string;
  processing_time_ms: number;
  created_at: string;
  updated_at: string;
  client_name: string;
  seller_name: string;
  meeting_at: string;
}

export interface ClientAnalysisData {
  topSectors: SectorData[];
  topLeadSources: LeadSourceData[];
  topTechnologies: TechnologyData[];
  topUseCases: UseCaseData[];
  topPrimaryPainPoints: PainPointData[];
  totalAnalyzedMeetings: number;
}

export const clientApi = {
  async getClientAnalysis(): Promise<ClientAnalysisData> {
    try {
      const data = await clientsService.getClientsData();
      
      return {
        topSectors: data.topSectors,
        topLeadSources: data.topLeadSources,
        topTechnologies: data.topTechnologies,
        topUseCases: data.topUseCases,
        topPrimaryPainPoints: data.topPrimaryPainPoints,
        totalAnalyzedMeetings: data.totalAnalyzedMeetings
      };
    } catch (error) {
      console.error('Error fetching client analysis:', error);
      throw error;
    }
  },

  async getClassifications(): Promise<ClassificationData[]> {
    try {
      return await meetingsService.getClassifications();
    } catch (error) {
      console.error('Error fetching classifications:', error);
      throw error;
    }
  }
};
