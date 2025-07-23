// Database and selection types
export interface DatabaseOption {
  id: string
  name: string
}

export interface RetailerOption {
  id: string
  name: string
}

export interface BrandOption {
  id: string
  name: string
}

export interface ProductOption {
  id: string
  name: string
}

// Trade Plan types
export interface TradePlanFormData {
  trade_plan_name: string
  project: string
  model: string
  selectedDatabase: string
  selectedRetailers: string[]
  selectedBrands: string[]
  selectedProducts: string[]
  year: number
  marketShare: string
  minRevenue: string
  numWeeks: string
  targetVolume: string
  targetSpend: string
  targetRevenue: string
}

export interface TradePlan {
  id: string
  trade_plan_name: string
  project: string
  model: string
  retailer: string
  brand: string
  products: string[]
  year: number
  total_volume: number
  total_revenue: number
  total_contribution: number
  total_spend: number
  incremental_volume: number
  incremental_revenue: number
  plan_roi: number
  budget_remaining: number
  target_volume?: number
  target_spend?: number
  target_revenue?: number
  created_date: string
}

// Event types
export interface TradeEvent {
  id: string
  trade_plan_id: string
  title: string
  description: string
  start_date: string
  end_date: string
  color: string
  status: 'draft' | 'planned' | 'active' | 'completed' | 'cancelled'
  channels: string[]
  ppg_name: string
  products: string[]
  plan_value: number
  actual_value: number
}

// Form validation types
export interface FormErrors {
  [key: string]: string
}

// Processing and execution types
export interface ProcessingState {
  fetchProgress: number
  modelProgress: number
  isFetching: boolean
  isModeling: boolean
  isFetchComplete: boolean
  isModelComplete: boolean
}

// Chart and analytics types
export interface ChartQuestion {
  id: number
  question: string
  hasChart: boolean
}

export interface ChartData {
  name: string
  value: number
  roi: number
}

export interface TableData {
  category: string
  events: string | number
  tradeSpend: string
  roi: string
}
