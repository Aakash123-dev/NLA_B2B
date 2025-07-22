import { SimulationProduct } from '../types';

/**
 * Format a number as currency
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/**
 * Format a number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Calculate price elasticity impact
 */
export function calculatePriceElasticity(
  product: SimulationProduct,
  newPrice: number,
  elasticity: number = -1.2
): Partial<SimulationProduct> {
  const priceChange = newPrice - product.currentPrice;
  const priceChangePercent = product.currentPrice > 0 ? (priceChange / product.currentPrice) * 100 : 0;
  
  const unitChangePercent = elasticity * priceChangePercent;
  const newUnits = Math.max(0, product.totalUnits * (1 + unitChangePercent / 100));
  const changeInUnits = newUnits - product.totalUnits;
  const newDollars = newUnits * newPrice;
  const changeInDollars = newDollars - product.totalDollars;
  const percentChangeDollars = product.totalDollars > 0 ? (changeInDollars / product.totalDollars) * 100 : 0;

  return {
    newUnits: Math.round(newUnits),
    changeInUnits: Math.round(changeInUnits),
    percentChangeUnits: Math.round(unitChangePercent * 100) / 100,
    newDollars: Math.round(newDollars),
    changeInDollars: Math.round(changeInDollars),
    percentChangeDollars: Math.round(percentChangeDollars * 100) / 100
  };
}

/**
 * Export simulation data to CSV
 */
export function exportToCSV(products: SimulationProduct[], filename: string = 'simulation-results.csv'): void {
  const headers = [
    'Product Name',
    'UPC',
    'Current Price',
    'Total Units',
    'Total Dollars',
    'New Price',
    'New Units',
    'Change in Units',
    '% Change in Units',
    'New Dollars',
    'Change in Dollars',
    '% Change in Dollars'
  ];

  const rows = products.map(product => [
    product.name,
    product.upc,
    product.currentPrice,
    product.totalUnits,
    product.totalDollars,
    product.newPrice || '',
    product.newUnits || '',
    product.changeInUnits || '',
    product.percentChangeUnits || '',
    product.newDollars || '',
    product.changeInDollars || '',
    product.percentChangeDollars || ''
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
