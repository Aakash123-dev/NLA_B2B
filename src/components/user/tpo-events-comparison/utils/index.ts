import { ComparisonColumn, ComparisonSummary, TPOEvent } from '../types'
import { eventComparisonAttributes } from '../constants'

export const generateRandomMetrics = (): Record<string, number | string> => {
  const metrics: Record<string, number | string> = {}
  eventComparisonAttributes.forEach(attr => {
    // Generate realistic metric values based on attribute type
    if (attr.includes('$') || attr.includes('Price') || attr.includes('Revenue')) {
      metrics[attr] = Math.floor(1000 + Math.random() * 9000) // $1000-10000
    } else if (attr.includes('%') || attr.includes('Percent')) {
      metrics[attr] = Math.floor(10 + Math.random() * 80) // 10-90%
    } else if (attr.includes('Units') || attr.includes('@')) {
      metrics[attr] = Math.floor(100 + Math.random() * 900) // 100-1000 units
    } else {
      metrics[attr] = Math.floor(50 + Math.random() * 50) // 50-100 for other metrics
    }
  })
  return metrics
}

export const generateEventComparisonColumns = (events: TPOEvent[]): ComparisonColumn[] => {
  const columns = events.map((event, index) => ({
    id: event.id,
    title: event.name,
    event: event,
    metrics: {
      // Financial Details
      '$ Base Price': event.metrics.basePrice,
      'Promo Price': event.metrics.promoPrice,
      '$ Discount': event.metrics.discount,
      '@ Units': event.metrics.units,
      '$ List Price': event.metrics.listPrice,
      '$ Spoil Per Unit': event.metrics.spoilPerUnit,
      '$ EDLP Per Unit Rate': event.metrics.edlpPerUnitRate,
      '$ Promo Per Unit Rate': event.metrics.promoPerUnitRate,
      '$ Net Price': event.metrics.netPrice,
      '$ COGS Per Unit': event.metrics.cogsPerUnit,
      '$ VCM': event.metrics.vcm,
      '$ Fixed Fees': event.metrics.fixedFees,

      // Financial Results
      'Gross Revenue': event.metrics.grossRevenue,
      'Total Spend': event.metrics.totalSpend,
      'Incremental Revenue': event.metrics.incrementalRevenue,
      'Incremental Profit': event.metrics.incrementalProfit,
      'Sales ROI': event.metrics.salesROI,
      'Retail Promo Margin %': event.metrics.retailPromoMarginPercent,
      'Retail Everyday Margin %': event.metrics.retailEverydayMarginPercent,
      'Retail Profit': event.metrics.retailProfit,
      'Shared Profit Created': event.metrics.sharedProfitCreated,
      '% Funded by Retailer': event.metrics.percentFundedByRetailer,

      // Promotion Results
      'Promotion': event.eventType,
      'TPR %ACV': event.metrics.tprACV,
      'TPR %Lift': event.metrics.tprLift,
      'TPR Units': event.metrics.tprUnits,
      'TPR Dollars': event.metrics.tprDollars,
      'Feature Only %ACV': event.metrics.featureOnlyACV,
      'Feature Only %Lift': event.metrics.featureOnlyLift,
      'Feature Only %Units': event.metrics.featureOnlyUnits,
      'Feature Only Dollars': event.metrics.featureOnlyDollars,
      'Display Only %ACV': event.metrics.displayOnlyACV,
      'Display Only %Lift': event.metrics.displayOnlyLift,
      'Display Only %Units': event.metrics.displayOnlyUnits,
      'Display Only Dollars': event.metrics.displayOnlyDollars,
      'Feature and Display %ACV': event.metrics.featureAndDisplayACV,
      'Feature and Display %Lift': event.metrics.featureAndDisplayLift,
      'Feature and Display %Units': event.metrics.featureAndDisplayUnits,
      'Feature and Display %Dollars': event.metrics.featureAndDisplayDollars,
      'Event Incremental %ACV': event.metrics.eventIncrementalACV,
      'Event Incremental %Lift': event.metrics.eventIncrementalLift,
      'Event Incremental %Units': event.metrics.eventIncrementalUnits,
      'Event Incremental %Dollars': event.metrics.eventIncrementalDollars,
      'Event Total %ACV': event.metrics.eventTotalACV,
      'Event Total %Lift': event.metrics.eventTotalLift,
      'Event Total %Units': event.metrics.eventTotalUnits,
      'Event Total %Dollars': event.metrics.eventTotalDollars
    }
  }))
  return markBestPerformingColumn(columns)
}

export const calculateComparisonSummary = (events: TPOEvent[]): ComparisonSummary => {
  const totalRevenue = events.reduce((sum, event) => sum + event.metrics.grossRevenue, 0)
  const averageROI = events.reduce((sum, event) => sum + event.metrics.salesROI, 0) / events.length
  const bestPerformer = events.reduce((best, current) => 
    current.metrics.salesROI > best.metrics.salesROI ? current : best
  ).name
  
  return {
    totalEvents: events.length,
    averageROI,
    bestPerformer,
    totalRevenue
  }
}

export const markBestPerformingColumn = (columns: ComparisonColumn[]): ComparisonColumn[] => {
  if (columns.length === 0) return columns
  
  // Calculate performance based on ROI
  const bestColumn = columns.reduce((best, current) => {
    const currentROI = typeof current.metrics['Sales ROI'] === 'number' 
      ? current.metrics['Sales ROI'] 
      : current.event.metrics.salesROI
    const bestROI = typeof best.metrics['Sales ROI'] === 'number' 
      ? best.metrics['Sales ROI'] 
      : best.event.metrics.salesROI
    return currentROI > bestROI ? current : best
  })
  
  return columns.map(column => ({
    ...column,
    isBestPerforming: column.id === bestColumn.id
  }))
}

export const formatMetricValue = (value: number | string, metric: string): string => {
  if (typeof value === 'string') return value
  
  if (metric.includes('$')) {
    return `$${value.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
  } else if (metric.includes('%')) {
    return `${value.toFixed(1)}%`
  } else if (metric.includes('Units') || metric.includes('@')) {
    return value.toLocaleString()
  } else {
    return value.toFixed(2)
  }
}

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
