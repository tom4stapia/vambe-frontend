export const purchaseStageMapping: Record<string, string> = {
  discovery: 'Descubrimiento',
  negotiation: 'Negociación',
  closure: 'Cierre'
};

export const getSpanishPurchaseStage = (stage: string): string => {
  return purchaseStageMapping[stage.toLowerCase()] || stage;
};
