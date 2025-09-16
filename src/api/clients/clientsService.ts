import http from '../http';

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

export interface ClientsResponse {
  success: boolean;
  data: {
    topSectors: SectorData[];
    topLeadSources: LeadSourceData[];
    topTechnologies: TechnologyData[];
    topUseCases: UseCaseData[];
    topPrimaryPainPoints: PainPointData[];
    totalAnalyzedMeetings: number;
  };
}

export const clientsService = {
  getClientsData: async (): Promise<ClientsResponse['data']> => {
    const response = await http.get('/api/v1/kpis/clients/analysis', {});
    const data: ClientsResponse = response.data;
    
    if (!data.success) {
      throw new Error('API returned unsuccessful response');
    }
    
    return data.data;
  },

  getSectorsData: async (): Promise<SectorData[]> => {
    const data = await clientsService.getClientsData();
    return data.topSectors;
  },

  getLeadSourcesData: async (): Promise<LeadSourceData[]> => {
    const data = await clientsService.getClientsData();
    return data.topLeadSources;
  },

  getTechnologiesData: async (): Promise<TechnologyData[]> => {
    const data = await clientsService.getClientsData();
    return data.topTechnologies;
  },

  getUseCasesData: async (): Promise<UseCaseData[]> => {
    const data = await clientsService.getClientsData();
    return data.topUseCases;
  },

  getPainPointsData: async (): Promise<PainPointData[]> => {
    const data = await clientsService.getClientsData();
    return data.topPrimaryPainPoints;
  }
};
