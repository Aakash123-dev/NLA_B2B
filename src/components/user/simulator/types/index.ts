export * from './product';

export interface SimulationProduct {
  id: number;
  name: string;
  upc: string;
  currentPrice: number;
  totalUnits: number;
  totalDollars: number;
  newPrice: string;
  newUnits: number;
  changeInUnits: number;
  percentChangeUnits: number;
  newDollars: number;
  changeInDollars: number;
  percentChangeDollars: number;
}

export interface SimulationCompetitor {
  brand: string;
  totalUnits: number;
  totalDollars: number;
}

export interface SimulationData {
  testDate: string;
  retailer: string;
  brand: string;
  products: SimulationProduct[];
  competitors: SimulationCompetitor[];
}

export interface ExpandedSections {
  summary: boolean;
  competitors: boolean;
  pricing: boolean;
}

export interface SimulationMetrics {
  totalWeeklyDollarChange: number;
  totalPercentWeeklyDollarChange: number;
}
