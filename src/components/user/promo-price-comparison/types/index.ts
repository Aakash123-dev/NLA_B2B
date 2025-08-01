export interface PromoScenario {
  id: string
  name: string
  brand: string
  retailer: string
  product: string
  basePrice: number
  promoPrice: number
  discountPercent: number
  startDate: string
  endDate: string
  eventType: 'TPR' | 'Display' | 'Feature' | 'Feature + Display'
  status: 'Active' | 'Completed' | 'Scheduled' | 'Draft'
  projectedRevenue: number
  actualRevenue?: number
  roi: number
  units: number
  description: string
  createdDate: string
}

export interface PriceScenario {
  id: string
  name: string
  brand: string
  retailer: string
  product: string
  currentPrice: number
  newPrice: number
  priceChangePercent: number
  effectiveDate: string
  simulationType: 'Immediate' | 'Gradual' | 'Competitive Response'
  status: 'Active' | 'Completed' | 'Scheduled' | 'Draft'
  projectedRevenue: number
  actualRevenue?: number
  expectedUnits: number
  actualUnits?: number
  elasticity: number
  description: string
  createdDate: string
}

export interface ComparisonScenario {
  id: string
  name: string
  type: 'promo' | 'price'
  data: PromoScenario | PriceScenario
}

export interface ComparisonColumn {
  id: string
  title: string
  type: 'promo' | 'price'
  metrics: Record<string, boolean>
  detailedMetrics?: Record<string, Record<string, number | string>>
  isBestPerforming?: boolean
}

export interface ComparisonState {
  selectedScenarios: ComparisonScenario[]
  numberOfScenarios: number | null
  columns: ComparisonColumn[]
  isConfiguring: boolean
  expandedRows: Set<string>
  scenarioTypes: ('promo' | 'price')[]
}

export interface ComparisonSummary {
  totalTrue: number
  percentage: number
}

export interface DetailedMetric {
  name: string
  value: number | string
  type: 'currency' | 'percentage' | 'number' | 'text'
}

export interface MetricCategory {
  title: string
  metrics: DetailedMetric[]
}

export interface ScenarioSelectionProps {
  onScenarioSelection: (scenarios: ComparisonScenario[]) => void
}

export interface ScenarioFilterOptions {
  type: ('promo' | 'price')[]
  brand: string[]
  retailer: string[]
  status: string[]
  dateRange: {
    startDate: string | null
    endDate: string | null
  }
}
