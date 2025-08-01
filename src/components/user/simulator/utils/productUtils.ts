import { Product, MarginData, MarginInputs } from '../types/product';

export const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString()}`;
};

export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

export const calculateMarginData = (
  product: Product, 
  inputs: MarginInputs | undefined
): MarginData => {
  if (!inputs) {
    return {
      costPerUnit: 0,
      currentMargin: 0,
      projectedMargin: 0,
      marginChange: 0,
      marginPercentChange: 0,
      grossProfit: 0,
      projectedGrossProfit: 0
    };
  }

  const newPrice = parseFloat(product.newPrice) || product.latestPrice;
  const currentMargin = ((product.latestPrice - inputs.costPerUnit) / product.latestPrice) * 100;
  const projectedMargin = ((newPrice - inputs.costPerUnit) / newPrice) * 100;
  const marginChange = projectedMargin - currentMargin;
  const marginPercentChange = currentMargin !== 0 ? (marginChange / currentMargin) * 100 : 0;
  
  const grossProfit = (product.latestPrice - inputs.costPerUnit) * product.totalUnits;
  const newUnits = product.newUnits ? parseInt(product.newUnits.replace(/,/g, '')) : Math.round(product.totalUnits * 0.92);
  const projectedGrossProfit = (newPrice - inputs.costPerUnit) * newUnits;

  return {
    costPerUnit: inputs.costPerUnit,
    currentMargin,
    projectedMargin,
    marginChange,
    marginPercentChange,
    grossProfit,
    projectedGrossProfit
  };
};

export const prepareChartData = (products: Product[]) => {
  return products.map((product, index) => {
    const newPrice = parseFloat(product.newPrice) || product.latestPrice;
    const newUnits = product.newUnits ? parseInt(product.newUnits.replace(/,/g, '')) : Math.round(product.totalUnits * 0.92);
    const newDollars = newUnits * newPrice;
    
    return {
      name: product?.name ? product.name.substring(0, 15) + '...' : product?.name,
      fullName: product?.name,
      currentPrice: product.latestPrice,
      newPrice: newPrice,
      currentUnits: product.totalUnits,
      newUnits: newUnits,
      currentRevenue: product.totalDollars,
      newRevenue: newDollars,
      revenueChange: newDollars - product.totalDollars,
      unitsChange: newUnits - product.totalUnits,
      priceChange: newPrice - product.latestPrice,
      id: product.id,
      color: `hsl(${(index * 137.5) % 360}, 70%, 60%)` // Golden ratio color distribution
    };
  });
};
