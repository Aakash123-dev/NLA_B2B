import { ComparisonSimulationScenario, PromoSimulationScenario, PriceSimulationScenario } from '../types'

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(value)
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export const getScenarioTitle = (scenario: ComparisonSimulationScenario): string => {
  return scenario.name
}

export const getScenarioSubtitle = (scenario: ComparisonSimulationScenario): string => {
  if (scenario.type === 'promo') {
    const data = scenario.data as PromoSimulationScenario
    return `${data.brand} - ${data.product}`
  } else {
    const data = scenario.data as PriceSimulationScenario
    return `${data.brand} - ${data.product}`
  }
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800'
    case 'Completed':
      return 'bg-blue-100 text-blue-800'
    case 'Scheduled':
      return 'bg-yellow-100 text-yellow-800'
    case 'Draft':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export const getTypeColor = (type: 'promo' | 'price'): string => {
  return type === 'promo' 
    ? 'bg-purple-100 text-purple-800' 
    : 'bg-indigo-100 text-indigo-800'
}

export const getEventTypeColor = (eventType: string): string => {
  switch (eventType) {
    case 'TPR':
      return 'bg-blue-100 text-blue-700'
    case 'Display':
      return 'bg-green-100 text-green-700'
    case 'Feature':
      return 'bg-orange-100 text-orange-700'
    case 'Feature + Display':
      return 'bg-purple-100 text-purple-700'
    case 'BOGO':
      return 'bg-pink-100 text-pink-700'
    case 'Bundle':
      return 'bg-cyan-100 text-cyan-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export const getCompetitorResponseColor = (response: string): string => {
  switch (response) {
    case 'None':
      return 'bg-gray-100 text-gray-700'
    case 'Follow':
      return 'bg-yellow-100 text-yellow-700'
    case 'Aggressive':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export const filterScenarios = (
  scenarios: ComparisonSimulationScenario[], 
  filters: {
    type: ('promo' | 'price')[]
    brand: string[]
    retailer: string[]
    status: string[]
    searchQuery: string
  }
): ComparisonSimulationScenario[] => {
  return scenarios.filter(scenario => {
    // Type filter
    if (filters.type.length > 0 && !filters.type.includes(scenario.type)) {
      return false
    }

    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      const searchText = `${scenario.name} ${scenario.data.brand} ${scenario.data.retailer} ${scenario.data.product}`.toLowerCase()
      if (!searchText.includes(query)) {
        return false
      }
    }

    // Brand filter
    if (filters.brand.length > 0 && !filters.brand.includes(scenario.data.brand)) {
      return false
    }

    // Retailer filter
    if (filters.retailer.length > 0 && !filters.retailer.includes(scenario.data.retailer)) {
      return false
    }

    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(scenario.data.status)) {
      return false
    }

    return true
  })
}

export const sortScenarios = (
  scenarios: ComparisonSimulationScenario[], 
  sortBy: 'name' | 'date' | 'revenue' | 'status' = 'name'
): ComparisonSimulationScenario[] => {
  return [...scenarios].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'date':
        const dateA = new Date(a.data.createdDate).getTime()
        const dateB = new Date(b.data.createdDate).getTime()
        return dateB - dateA // Most recent first
      case 'revenue':
        const revenueA = a.data.projectedRevenue
        const revenueB = b.data.projectedRevenue
        return revenueB - revenueA // Highest first
      case 'status':
        return a.data.status.localeCompare(b.data.status)
      default:
        return 0
    }
  })
}

export const getBestPerformingScenario = (
  scenarios: ComparisonSimulationScenario[],
  metric: 'revenue' | 'units' | 'roi'
): ComparisonSimulationScenario | null => {
  if (scenarios.length === 0) return null

  return scenarios.reduce((best, current) => {
    let bestValue: number = 0
    let currentValue: number = 0

    switch (metric) {
      case 'revenue':
        bestValue = best.data.projectedRevenue
        currentValue = current.data.projectedRevenue
        break
      case 'units':
        bestValue = best.data.projectedUnits
        currentValue = current.data.projectedUnits
        break
      case 'roi':
        if (best.type === 'promo' && current.type === 'promo') {
          bestValue = (best.data as PromoSimulationScenario).roi
          currentValue = (current.data as PromoSimulationScenario).roi
        } else {
          return best // Can't compare ROI across different types
        }
        break
    }

    return currentValue > bestValue ? current : best
  })
}

export const generateComparisonInsights = (scenarios: ComparisonSimulationScenario[]): string[] => {
  const insights: string[] = []

  if (scenarios.length < 2) return insights

  const bestRevenue = getBestPerformingScenario(scenarios, 'revenue')
  const bestUnits = getBestPerformingScenario(scenarios, 'units')

  if (bestRevenue) {
    insights.push(`${bestRevenue.name} generates the highest projected revenue of ${formatCurrency(bestRevenue.data.projectedRevenue)}`)
  }

  if (bestUnits) {
    insights.push(`${bestUnits.name} achieves the best unit performance with ${formatNumber(bestUnits.data.projectedUnits)} projected units`)
  }

  // Type-specific insights
  const promoScenarios = scenarios.filter(s => s.type === 'promo')
  const priceScenarios = scenarios.filter(s => s.type === 'price')

  if (promoScenarios.length > 0 && priceScenarios.length > 0) {
    const avgPromoRevenue = promoScenarios.reduce((sum, s) => sum + s.data.projectedRevenue, 0) / promoScenarios.length
    const avgPriceRevenue = priceScenarios.reduce((sum, s) => sum + s.data.projectedRevenue, 0) / priceScenarios.length

    if (avgPromoRevenue > avgPriceRevenue) {
      insights.push('Promotional scenarios show higher average revenue potential than price adjustment scenarios')
    } else {
      insights.push('Price adjustment scenarios demonstrate better average revenue performance than promotional campaigns')
    }
  }

  return insights
}
