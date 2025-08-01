import { ComparisonScenario, PromoScenario, PriceScenario } from '../types'

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value)
}

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US').format(value)
}

export const calculateDuration = (startDate: string, endDate: string): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

export const getScenarioTitle = (scenario: ComparisonScenario): string => {
  return scenario.name
}

export const getScenarioSubtitle = (scenario: ComparisonScenario): string => {
  if (scenario.type === 'promo') {
    const data = scenario.data as PromoScenario
    return `${data.brand} - ${data.product}`
  } else {
    const data = scenario.data as PriceScenario
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

export const exportToCSV = (scenarios: ComparisonScenario[], filename: string = 'scenario-comparison.csv'): void => {
  const headers = ['Name', 'Type', 'Brand', 'Retailer', 'Product', 'Status', 'Projected Revenue', 'ROI/Change %']
  
  const rows = scenarios.map(scenario => {
    if (scenario.type === 'promo') {
      const data = scenario.data as PromoScenario
      return [
        data.name,
        'Promo',
        data.brand,
        data.retailer,
        data.product,
        data.status,
        data.projectedRevenue.toString(),
        data.roi.toString()
      ]
    } else {
      const data = scenario.data as PriceScenario
      return [
        data.name,
        'Price',
        data.brand,
        data.retailer,
        data.product,
        data.status,
        data.projectedRevenue.toString(),
        data.priceChangePercent.toString()
      ]
    }
  })

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
