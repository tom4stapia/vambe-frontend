import http from '../http';

export interface Classification {
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

export interface ClassificationsResponse {
  success: boolean;
  data: Classification[];
}

export interface MeetingTableRow {
  meetingId: number;
  clientName: string;
  sellerName: string;
  urgency: boolean;
  decisionMakerRole: string;
  vambeProduct: string;
}

export interface MeetingDetail extends Classification {}

export interface MeetingTranscript {
  id: number;
  client_id: number;
  seller_id: number;
  meeting_at: string;
  closed: boolean;
  transcript: string;
  created_at: string;
  updated_at: string;
  client: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  seller: {
    id: number;
    name: string;
    email: string;
    phone: string;
    active: boolean;
  };
}

export interface MeetingTranscriptResponse {
  success: boolean;
  data: MeetingTranscript;
  message: string;
}

export const meetingsService = {
  getClassifications: async (): Promise<Classification[]> => {
    const response = await http.get('/api/v1/classifications', {});
    const data: ClassificationsResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  },

  getMeetingDetail: async (meetingId: number): Promise<MeetingDetail> => {
    const response = await http.get(`/api/v1/meetings/${meetingId}`, {});   
    const data: MeetingTranscriptResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data as any; 
  },

  getMeetingTranscript: async (meetingId: number): Promise<MeetingTranscript> => {
    const response = await http.get(`/api/v1/meetings/${meetingId}`, {});
    const data: MeetingTranscriptResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  },

  transformClassificationsToTableData: (classifications: Classification[]): MeetingTableRow[] => {
    return classifications
      .map(classification => ({
        meetingId: classification.meeting_id,
        clientName: classification.client_name,
        sellerName: classification.seller_name,
        urgency: classification.urgency,
        decisionMakerRole: classification.decision_maker_role,
        vambeProduct: classification.vambe_product
      }))
      .sort((a, b) => a.meetingId - b.meetingId); // Sort by ID ascending
  },

  // Find meeting detail from classifications array
  getMeetingDetailFromClassifications: (classifications: Classification[], meetingId: number): MeetingDetail | null => {
    const classification = classifications.find(c => c.meeting_id === meetingId);
    return classification || null;
  }
};
