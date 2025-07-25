export interface TPOEvent {
  id: string
  name: string
  brand: string
  retailer: string
  startDate: string
  endDate: string
  eventType: 'Promotion' | 'Discount' | 'Bundle' | 'BOGO'
  status: 'Active' | 'Completed' | 'Scheduled'
  revenue: number
  description: string
}

export interface ComparisonColumn {
  id: string
  title: string
  attributes: Record<string, boolean>
  detailedMetrics?: Record<string, Record<string, number | string>>
  isBestPerforming?: boolean
}

export interface ComparisonState {
  selectedTPOs: TPOEvent[]
  numberOfTpos: number | null
  columns: ComparisonColumn[]
  isConfiguring: boolean
  expandedRows: Set<string>
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
