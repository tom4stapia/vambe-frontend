// Purchase Stage Mappings
export const purchaseStageMapping: Record<string, string> = {
  discovery: 'Descubrimiento',
  negotiation: 'Negociación',
  closure: 'Cierre'
};

// Function to get Spanish purchase stage
export const getSpanishPurchaseStage = (stage: string): string => {
  return purchaseStageMapping[stage.toLowerCase()] || stage;
};
