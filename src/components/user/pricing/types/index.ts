export interface Database {
  id: string;
  name: string;
}

export interface Retailer {
  id: string;
  name: string;
}

export interface Brand {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
}

export interface Column {
  id: string;
  name: string;
}

export interface PricingModelConfig {
  selectedDatabase: string;
  selectedRetailers: string[];
  selectedBrands: string[];
  selectedProducts: string[];
  marketShare: string;
  minRevenue: string;
  numWeeks: string;
  selectedColumns: string[];
}

export interface ProgressState {
  fetchProgress: number;
  modelProgress: number;
  isFetching: boolean;
  isModeling: boolean;
  isFetchComplete: boolean;
  isModelComplete: boolean;
}
