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

export interface TradePlan {
  id: string
  trade_plan_name: string
  project?: string
  model?: string
  retailer: string
  brand: string
  products?: string[]
  year: string
  total_volume: number
  total_revenue: number
  total_contribution: number
  total_spend: number
  incremental_volume: number
  incremental_revenue: number
  plan_roi: number
  budget_remaining: number
  target_volume: number
  target_spend: number
  target_revenue: number
  created_date: string
}

export interface TradePlanFormData {
  trade_plan_name: string
  project?: string
  model?: string
  selectedDatabase?: string
  selectedRetailers: string[]
  selectedBrands: string[]
  selectedProducts?: string[]
  year: string | number
  marketShare?: string
  minRevenue?: string
  numWeeks?: string
  targetVolume?: string
  targetRevenue?: string
  targetSpend?: string
}

export interface TradePlanEvent {
  id: string
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'planned' | 'active' | 'completed' | 'draft'
  ppgName: string
  products?: string[]
  channels?: string[]
  planValue?: number
  actualValue?: number
  tradePlanId: string
}

export interface EventFormData {
  title: string
  description: string
  startDate: string
  endDate: string
  status: 'planned' | 'active' | 'completed' | 'draft'
  ppgName: string
  products?: string[]
  channels?: string[]
  planValue?: number
}

export interface FormErrors {
  [key: string]: string
}
