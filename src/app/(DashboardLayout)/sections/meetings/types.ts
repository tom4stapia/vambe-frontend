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

export interface MeetingDetail extends Classification {
  // This extends the full Classification interface
}

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
