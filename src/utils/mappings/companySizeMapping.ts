export const companySizeMapping: Record<string, string> = {
  small: 'Pequeña',
  medium: 'Mediana',
  large: 'Grande',
  enterprise: 'Empresa'
};

export const getSpanishCompanySize = (size: string): string => {
  return companySizeMapping[size.toLowerCase()] || size;
};
