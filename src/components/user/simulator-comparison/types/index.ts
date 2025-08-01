export interface PromoSimulationScenario {
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
  eventType: 'TPR' | 'Display' | 'Feature' | 'Feature + Display' | 'BOGO' | 'Bundle'
  status: 'Active' | 'Completed' | 'Scheduled' | 'Draft'
  projectedRevenue: number
  actualRevenue?: number
  projectedUnits: number
  actualUnits?: number
  roi: number
  lift: number
  description: string
  createdDate: string
}

export interface PriceSimulationScenario {
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
  projectedUnits: number
  actualUnits?: number
  elasticity: number
  competitorResponse: 'None' | 'Follow' | 'Aggressive'
  description: string
  createdDate: string
}

export interface ComparisonSimulationScenario {
  id: string
  name: string
  type: 'promo' | 'price'
  data: PromoSimulationScenario | PriceSimulationScenario
  isSelected: boolean
}

export interface ComparisonSimulationColumn {
  id: string
  title: string
  type: 'promo' | 'price'
  scenario: ComparisonSimulationScenario
  metrics: Record<string, boolean>
  detailedMetrics?: Record<string, Record<string, number | string>>
}

export interface SimulatorComparisonState {
  selectedScenarios: ComparisonSimulationScenario[]
  numberOfScenarios: number | null
  columns: ComparisonSimulationColumn[]
  isConfiguring: boolean
  currentStep: 'selection' | 'comparison'
  expandedRows: Set<string>
  scenarioTypes: ('promo' | 'price')[]
  filters: SimulatorFilterOptions
}

export interface SimulatorFilterOptions {
  type: ('promo' | 'price')[]
  brand: string[]
  retailer: string[]
  status: string[]
  dateRange: {
    startDate: string | null
    endDate: string | null
  }
  searchQuery: string
}

export interface ScenarioSelectionProps {
  onScenarioSelection: (scenarios: ComparisonSimulationScenario[]) => void
  onBack: () => void
}

export interface ComparisonTableProps {
  scenarios: ComparisonSimulationScenario[]
  columns: ComparisonSimulationColumn[]
  onToggleMetric: (metricId: string) => void
  expandedRows: Set<string>
  onToggleRowExpansion: (rowId: string) => void
  onBack: () => void
  onNewComparison: () => void
  onOpenSmartInsights?: () => void
}

export interface MetricDefinition {
  id: string
  label: string
  type: 'currency' | 'percentage' | 'number' | 'text'
  category: 'performance' | 'financial' | 'operational'
  description?: string
}

export interface SimulatorComparisonSummary {
  bestPerforming: {
    revenue: string
    units: string
    roi: string
  }
  insights: string[]
}
