export const productMapping: Record<string, string> = {
  mercur: 'Mercur',
  iris: 'Iris',
  ads: 'Ads',
  axis: 'Axis'
};

export const capitalizeWord = (product: string): string => {
  return product.charAt(0).toUpperCase() + product.slice(1);
};

export const getSpanishProduct = (product: string): string => {
  return productMapping[product.toLowerCase()] || capitalizeWord(product);
};
