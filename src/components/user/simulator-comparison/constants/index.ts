export const MAX_COMPARISON_SCENARIOS = 4
export const MIN_COMPARISON_SCENARIOS = 2

export const SCENARIO_TYPES = [
  { value: 'promo', label: 'Promo Scenarios', icon: '🏷️', color: 'bg-purple-100 text-purple-800' },
  { value: 'price', label: 'Price Scenarios', icon: '💰', color: 'bg-indigo-100 text-indigo-800' }
] as const

export const EVENT_TYPES = [
  'TPR',
  'Display', 
  'Feature',
  'Feature + Display',
  'BOGO',
  'Bundle'
] as const

export const SIMULATION_TYPES = [
  'Immediate',
  'Gradual', 
  'Competitive Response'
] as const

export const STATUS_OPTIONS = [
  'Active',
  'Completed', 
  'Scheduled',
  'Draft'
] as const

export const COMPETITOR_RESPONSE_OPTIONS = [
  'None',
  'Follow',
  'Aggressive'
] as const

// Metrics for comparison - excluding margin-related metrics
export const COMPARISON_METRICS = {
  promo: [
    { id: 'basePrice', label: 'Base Price', type: 'currency', category: 'financial' },
    { id: 'promoPrice', label: 'Promo Price', type: 'currency', category: 'financial' },
    { id: 'discountPercent', label: 'Discount %', type: 'percentage', category: 'financial' },
    { id: 'projectedRevenue', label: 'Projected Revenue', type: 'currency', category: 'performance' },
    { id: 'actualRevenue', label: 'Actual Revenue', type: 'currency', category: 'performance' },
    { id: 'projectedUnits', label: 'Projected Units', type: 'number', category: 'performance' },
    { id: 'actualUnits', label: 'Actual Units', type: 'number', category: 'performance' },
    { id: 'roi', label: 'ROI %', type: 'percentage', category: 'performance' },
    { id: 'lift', label: 'Sales Lift %', type: 'percentage', category: 'performance' },
    { id: 'eventType', label: 'Event Type', type: 'text', category: 'operational' },
    { id: 'duration', label: 'Duration (days)', type: 'number', category: 'operational' },
    { id: 'status', label: 'Status', type: 'text', category: 'operational' }
  ],
  price: [
    { id: 'currentPrice', label: 'Current Price', type: 'currency', category: 'financial' },
    { id: 'newPrice', label: 'New Price', type: 'currency', category: 'financial' },
    { id: 'priceChangePercent', label: 'Price Change %', type: 'percentage', category: 'financial' },
    { id: 'projectedRevenue', label: 'Projected Revenue', type: 'currency', category: 'performance' },
    { id: 'actualRevenue', label: 'Actual Revenue', type: 'currency', category: 'performance' },
    { id: 'projectedUnits', label: 'Projected Units', type: 'number', category: 'performance' },
    { id: 'actualUnits', label: 'Actual Units', type: 'number', category: 'performance' },
    { id: 'elasticity', label: 'Price Elasticity', type: 'number', category: 'performance' },
    { id: 'competitorResponse', label: 'Competitor Response', type: 'text', category: 'operational' },
    { id: 'simulationType', label: 'Simulation Type', type: 'text', category: 'operational' },
    { id: 'status', label: 'Status', type: 'text', category: 'operational' }
  ]
} as const

export const METRIC_CATEGORIES = [
  { id: 'performance', label: 'Performance Metrics', icon: '📈' },
  { id: 'financial', label: 'Financial Metrics', icon: '💵' },
  { id: 'operational', label: 'Operational Metrics', icon: '⚙️' }
] as const

export const COMPARISON_INSIGHTS = {
  revenue: 'Best performing scenario by revenue generation',
  units: 'Best performing scenario by unit sales',
  roi: 'Best performing scenario by return on investment',
  efficiency: 'Most cost-effective scenario'
} as const
