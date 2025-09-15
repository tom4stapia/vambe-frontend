import { getClassificationsUrl, getMeetingDetailUrl } from '@/config/api';
import { ClassificationsResponse, Classification, MeetingTableRow, MeetingDetail, MeetingTranscriptResponse, MeetingTranscript } from '../types';

export const fetchClassifications = async (): Promise<Classification[]> => {
  try {
    const response = await fetch(getClassificationsUrl());
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ClassificationsResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching classifications:', error);
    throw error;
  }
};

export const transformClassificationsToTableData = (classifications: Classification[]): MeetingTableRow[] => {
  return classifications
    .map(classification => ({
      meetingId: classification.meeting_id,
      clientName: classification.client_name,
      sellerName: classification.seller_name,
      urgency: classification.urgency,
      decisionMakerRole: classification.decision_maker_role,
      vambeProduct: classification.vambe_product
    }))
    .sort((a, b) => a.meetingId - b.meetingId); // Ordenar por ID de menor a mayor
};

export const getMeetingDetail = (classifications: Classification[], meetingId: number): MeetingDetail | null => {
  const classification = classifications.find(c => c.meeting_id === meetingId);
  return classification || null;
};

export const fetchMeetingTranscript = async (meetingId: number): Promise<MeetingTranscript> => {
  try {
    const response = await fetch(getMeetingDetailUrl(meetingId));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: MeetingTranscriptResponse = await response.json();
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  } catch (error) {
    console.error('Error fetching meeting transcript:', error);
    throw error;
  }
};
