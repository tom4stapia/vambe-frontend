import { getClientAnalysisUrl } from '@/config/api';

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
      const response = await fetch(getClientAnalysisUrl(), {
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
      console.error('Error fetching client analysis:', error);
      throw error;
    }
  },

  async getClassifications(): Promise<ClassificationData[]> {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001';
      const response = await fetch(`${baseURL}/api/v1/classifications`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching classifications:', error);
      throw error;
    }
  }
};
