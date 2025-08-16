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
  // Additional properties used in the actual data
  _id?: string;
  Product?: string;
  Price_avg_last_4_weeks?: number;
  total_units_sum?: string;
  newVolume?: number;
  percentageChangeInVolume?: number;
  changeInVolume?: number;
  percentageChangeInDollars?: number;
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
  showProductResults?: any;
  selectedProducts: any;
  type: any;
  marginPriceValues?: any;
  marginSimulationData?: any[];
  marginChartData?: any;
  isPriceSimulationLoading?: boolean;
  handleMarginPriceInputChange?: any;
  setSelectedProduct1: (product: any) => void;
  showResults: any;
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
