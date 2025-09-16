import { meetingsService } from '@/api/meetings/meetingsService';

export const fetchClassifications = meetingsService.getClassifications;
export const transformClassificationsToTableData = meetingsService.transformClassificationsToTableData;
export const getMeetingDetail = meetingsService.getMeetingDetailFromClassifications;
export const fetchMeetingTranscript = meetingsService.getMeetingTranscript;
