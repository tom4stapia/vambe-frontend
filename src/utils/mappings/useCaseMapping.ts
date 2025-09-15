export const useCaseMapping: Record<string, string> = {
  lead_scoring: 'Scoring de Leads',
  customer_segmentation: 'Segmentación de Clientes',
  churn_prediction: 'Predicción de Churn',
  marketing_attribution: 'Atribución de Marketing',
  campaign_optimization: 'Optimización de Campañas',
  demand_forecasting: 'Pronóstico de Demanda',
  voice_analytics: 'Análisis de Voz',
  operations_automation: 'Automatización de Operaciones',
  real_time_reporting: 'Reportes en Tiempo Real',
  dw_modernization: 'Modernización de Data Warehouse',
  fraud_detection: 'Detección de Fraude',
  conversational_support: 'Soporte Conversacional'
};

export const getSpanishUseCase = (useCase: string): string => {
  return useCaseMapping[useCase.toLowerCase()] || useCase;
};
