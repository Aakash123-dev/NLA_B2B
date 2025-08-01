export const MAX_COMPARISON_SCENARIOS = 4
export const MIN_COMPARISON_SCENARIOS = 2

export const SCENARIO_TYPES = [
  { value: 'promo', label: 'Promo Scenarios', icon: '🏷️' },
  { value: 'price', label: 'Price Scenarios', icon: '💰' }
] as const

export const EVENT_TYPES = [
  'TPR',
  'Display', 
  'Feature',
  'Feature + Display'
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

export const COMPARISON_METRICS = {
  promo: [
    { id: 'basePrice', label: 'Base Price', type: 'currency' },
    { id: 'promoPrice', label: 'Promo Price', type: 'currency' },
    { id: 'discountPercent', label: 'Discount %', type: 'percentage' },
    { id: 'projectedRevenue', label: 'Projected Revenue', type: 'currency' },
    { id: 'actualRevenue', label: 'Actual Revenue', type: 'currency' },
    { id: 'roi', label: 'ROI', type: 'percentage' },
    { id: 'units', label: 'Units', type: 'number' },
    { id: 'eventType', label: 'Event Type', type: 'text' },
    { id: 'duration', label: 'Duration (days)', type: 'number' }
  ],
  price: [
    { id: 'currentPrice', label: 'Current Price', type: 'currency' },
    { id: 'newPrice', label: 'New Price', type: 'currency' },
    { id: 'priceChangePercent', label: 'Price Change %', type: 'percentage' },
    { id: 'projectedRevenue', label: 'Projected Revenue', type: 'currency' },
    { id: 'actualRevenue', label: 'Actual Revenue', type: 'currency' },
    { id: 'expectedUnits', label: 'Expected Units', type: 'number' },
    { id: 'actualUnits', label: 'Actual Units', type: 'number' },
    { id: 'elasticity', label: 'Price Elasticity', type: 'number' },
    { id: 'simulationType', label: 'Simulation Type', type: 'text' }
  ]
} as const
