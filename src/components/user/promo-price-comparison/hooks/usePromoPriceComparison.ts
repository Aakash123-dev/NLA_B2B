import { useState, useCallback } from 'react'
import { ComparisonState, ComparisonScenario, ComparisonColumn } from '../types'
import { MAX_COMPARISON_SCENARIOS, COMPARISON_METRICS } from '../constants'
import { formatCurrency, formatPercentage, formatNumber, calculateDuration } from '../utils'

const initialState: ComparisonState = {
  selectedScenarios: [],
  numberOfScenarios: null,
  columns: [],
  isConfiguring: false,
  expandedRows: new Set(),
  scenarioTypes: []
}

export function usePromoPriceComparison() {
  const [state, setState] = useState<ComparisonState>(initialState)

  const handleScenarioSelection = useCallback((scenarios: ComparisonScenario[]) => {
    if (scenarios.length < 2 || scenarios.length > MAX_COMPARISON_SCENARIOS) {
      return
    }

    const columns = scenarios.map((scenario, index) => {
      const metrics: Record<string, boolean> = {}
      const detailedMetrics: Record<string, Record<string, number | string>> = {}
      
      // Get metrics based on scenario type
      const scenarioMetrics = COMPARISON_METRICS[scenario.type]
      
      scenarioMetrics.forEach(metric => {
        metrics[metric.id] = true
        
        if (!detailedMetrics[metric.label]) {
          detailedMetrics[metric.label] = {}
        }
        
        let value: number | string = ''
        
        if (scenario.type === 'promo') {
          const data = scenario.data as any
          switch (metric.id) {
            case 'basePrice':
              value = data.basePrice
              break
            case 'promoPrice':
              value = data.promoPrice
              break
            case 'discountPercent':
              value = data.discountPercent
              break
            case 'projectedRevenue':
              value = data.projectedRevenue
              break
            case 'actualRevenue':
              value = data.actualRevenue || 0
              break
            case 'roi':
              value = data.roi
              break
            case 'units':
              value = data.units
              break
            case 'eventType':
              value = data.eventType
              break
            case 'duration':
              value = calculateDuration(data.startDate, data.endDate)
              break
            default:
              value = ''
          }
        } else {
          const data = scenario.data as any
          switch (metric.id) {
            case 'currentPrice':
              value = data.currentPrice
              break
            case 'newPrice':
              value = data.newPrice
              break
            case 'priceChangePercent':
              value = data.priceChangePercent
              break
            case 'projectedRevenue':
              value = data.projectedRevenue
              break
            case 'actualRevenue':
              value = data.actualRevenue || 0
              break
            case 'expectedUnits':
              value = data.expectedUnits
              break
            case 'actualUnits':
              value = data.actualUnits || 0
              break
            case 'elasticity':
              value = data.elasticity
              break
            case 'simulationType':
              value = data.simulationType
              break
            default:
              value = ''
          }
        }
        
        // Format value based on type
        if (typeof value === 'number') {
          if (metric.type === 'currency') {
            detailedMetrics[metric.label][`scenario_${index}`] = formatCurrency(value)
          } else if (metric.type === 'percentage') {
            detailedMetrics[metric.label][`scenario_${index}`] = formatPercentage(value)
          } else if (metric.type === 'number') {
            detailedMetrics[metric.label][`scenario_${index}`] = formatNumber(value)
          } else {
            detailedMetrics[metric.label][`scenario_${index}`] = value.toString()
          }
        } else {
          detailedMetrics[metric.label][`scenario_${index}`] = value
        }
      })

      return {
        id: scenario.id,
        title: scenario.name,
        type: scenario.type,
        metrics,
        detailedMetrics,
        isBestPerforming: false
      }
    })

    setState(prev => ({
      ...prev,
      selectedScenarios: scenarios,
      numberOfScenarios: scenarios.length,
      columns,
      isConfiguring: true,
      scenarioTypes: [...new Set(scenarios.map(s => s.type))]
    }))
  }, [])

  const resetComparison = useCallback(() => {
    setState(initialState)
  }, [])

  const toggleMetric = useCallback((metricId: string) => {
    setState(prev => ({
      ...prev,
      columns: prev.columns.map(column => ({
        ...column,
        metrics: {
          ...column.metrics,
          [metricId]: !column.metrics[metricId]
        }
      }))
    }))
  }, [])

  const toggleRowExpansion = useCallback((rowId: string) => {
    setState(prev => {
      const newExpandedRows = new Set(prev.expandedRows)
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId)
      } else {
        newExpandedRows.add(rowId)
      }
      return {
        ...prev,
        expandedRows: newExpandedRows
      }
    })
  }, [])

  return {
    selectedScenarios: state.selectedScenarios,
    numberOfScenarios: state.numberOfScenarios,
    columns: state.columns,
    isConfiguring: state.isConfiguring,
    expandedRows: state.expandedRows,
    scenarioTypes: state.scenarioTypes,
    handleScenarioSelection,
    resetComparison,
    toggleMetric,
    toggleRowExpansion
  }
}
