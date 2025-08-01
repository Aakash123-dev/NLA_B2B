export interface TPOEvent {
  id: string
  name: string
  brand: string
  retailer: string
  startDate: string
  endDate: string
  eventType: 'Promotion' | 'Discount' | 'Bundle' | 'BOGO' | 'TPR' | 'Feature' | 'Display'
  status: 'Active' | 'Completed' | 'Scheduled'
  basePrice: number
  promoPrice: number
  description: string
  metrics: EventMetrics
}

export interface EventMetrics {
  // Financial Details
  basePrice: number
  promoPrice: number
  discount: number
  units: number
  listPrice: number
  spoilPerUnit: number
  edlpPerUnitRate: number
  promoPerUnitRate: number
  netPrice: number
  cogsPerUnit: number
  vcm: number
  fixedFees: number

  // Financial Results
  grossRevenue: number
  totalSpend: number
  incrementalRevenue: number
  incrementalProfit: number
  salesROI: number
  retailPromoMarginPercent: number
  retailEverydayMarginPercent: number
  retailProfit: number
  sharedProfitCreated: number
  percentFundedByRetailer: number

  // Promotion Results
  tprACV: number
  tprLift: number
  tprUnits: number
  tprDollars: number
  featureOnlyACV: number
  featureOnlyLift: number
  featureOnlyUnits: number
  featureOnlyDollars: number
  displayOnlyACV: number
  displayOnlyLift: number
  displayOnlyUnits: number
  displayOnlyDollars: number
  featureAndDisplayACV: number
  featureAndDisplayLift: number
  featureAndDisplayUnits: number
  featureAndDisplayDollars: number
  eventIncrementalACV: number
  eventIncrementalLift: number
  eventIncrementalUnits: number
  eventIncrementalDollars: number
  eventTotalACV: number
  eventTotalLift: number
  eventTotalUnits: number
  eventTotalDollars: number
}

export interface ComparisonColumn {
  id: string
  title: string
  event: TPOEvent
  metrics: Record<string, number | string>
  isBestPerforming?: boolean
}

export interface ComparisonState {
  selectedEvents: TPOEvent[]
  numberOfEvents: number | null
  columns: ComparisonColumn[]
  isConfiguring: boolean
  expandedRows: Set<string>
  selectedBrand?: string
}

export interface ComparisonSummary {
  totalEvents: number
  averageROI: number
  bestPerformer: string
  totalRevenue: number
}

export interface MetricCategory {
  name: string
  metrics: string[]
  color: string
}
