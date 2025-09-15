// Region Mappings
export const regionMapping: Record<string, string> = {
  latam_south: 'LATAM Sur',
  latam_north: 'LATAM Norte',
  north_america: 'Norteamérica',
  europe: 'Europa',
  asia: 'Asia',
  africa: 'África',
  oceania: 'Oceanía'
};

// Function to get Spanish region
export const getSpanishRegion = (region: string): string => {
  return regionMapping[region.toLowerCase()] || region;
};
