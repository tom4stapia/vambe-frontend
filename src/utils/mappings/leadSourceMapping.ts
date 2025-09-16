export const leadSourceMapping: Record<string, string> = {
  referral: 'Referidos',
  seo: 'Optimización en Motores de Búsqueda',
  sem_ads: 'Anuncios de Búsqueda Pagados',
  email: 'Correo Electrónico',
  event: 'Eventos',
  partner: 'Socios',
  outbound_call: 'Llamadas Salientes',
  cold_email: 'Correo Electrónico Frío',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  facebook: 'Facebook',
  webchat: 'Chat en Sitio Web',
  pr: 'Relaciones Públicas',
  marketplace: 'Marketplace'
};

export const getSpanishLeadSource = (source: string): string => {
  return leadSourceMapping[source.toLowerCase()] || source;
};

export const getLeadSourceInitial = (source: string): string => {
  switch (source.toLowerCase()) {
    case 'referral': return 'R';
    case 'seo': return 'S';
    case 'sem_ads': return 'A';
    case 'email': return 'E';
    case 'event': return 'E';
    case 'partner': return 'P';
    case 'outbound_call': return 'C';
    case 'cold_email': return 'F';
    case 'linkedin': return 'L';
    case 'instagram': return 'I';
    case 'facebook': return 'F';
    case 'webchat': return 'W';
    case 'pr': return 'P';
    case 'marketplace': return 'M';
    default: return source.charAt(0).toUpperCase();
  }
};
