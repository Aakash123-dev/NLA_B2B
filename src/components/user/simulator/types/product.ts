export interface Product {
  id: number;
  name: string;
  latestPrice: number;
  totalUnits: number;
  totalDollars: number;
  newPrice: string;
  newUnits: string;
  changeInUnits: string;
  percentChangeUnits: string;
  newDollars: string;
  changeInDollars: string;
  percentChangeDollars: string;
}

export interface MarginData {
  costPerUnit: number;
  currentMargin: number;
  projectedMargin: number;
  marginChange: number;
  marginPercentChange: number;
  grossProfit: number;
  projectedGrossProfit: number;
}

export interface ProductSectionProps {
  products: Product[];
  onPriceChange: any;
  newPrice: any;
  filteredSelectedPriceProducts: any[];
  showProductResults: any;
  selectedProducts: any;
  type: any;
  marginPriceValues?: any;
  marginSimulationData?: any[];
  marginChartData?: any;
  isPriceSimulationLoading?: boolean;
  handleMarginPriceInputChange?: any;
}

export interface MarginInputs {
  costPerUnit: number;
  targetMargin: number;
}

export interface ChartData {
  name: string;
  fullName: string;
  currentPrice: number;
  newPrice: number;
  currentUnits: number;
  newUnits: number;
  currentRevenue: number;
  newRevenue: number;
  revenueChange: number;
  unitsChange: number;
  priceChange: number;
  id: number;
  color: string;
}
