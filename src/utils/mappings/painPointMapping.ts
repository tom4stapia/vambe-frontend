export const painPointMapping: Record<string, string> = {
  lack_visibility: 'Falta de Visibilidad',
  slow_reporting: 'Reportes Lentos',
  low_conversion: 'Baja Conversión',
  high_churn: 'Alto Churn',
  high_advertising_costs: 'Altos Costos de Publicidad',
  difficult_integrations: 'Integraciones Difíciles',
  regulatory_compliance: 'Cumplimiento Regulatorio',
  dispersed_data: 'Datos Dispersos',
  saturated_support: 'Soporte Saturado',
  scalability: 'Escalabilidad'
};

export const getSpanishPainPoint = (painPoint: string): string => {
  return painPointMapping[painPoint.toLowerCase()] || painPoint;
};
