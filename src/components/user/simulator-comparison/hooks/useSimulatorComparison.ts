'use client'

import { useState, useCallback } from 'react'
import { 
  SimulatorComparisonState, 
  ComparisonSimulationScenario, 
  ComparisonSimulationColumn,
  SimulatorFilterOptions 
} from '../types'
import { COMPARISON_METRICS } from '../constants'
import { 
  formatCurrency, 
  formatPercentage, 
  formatNumber, 
  calculateDuration,
  generateComparisonInsights
} from '../utils'

const initialState: SimulatorComparisonState = {
  selectedScenarios: [],
  numberOfScenarios: null,
  columns: [],
  isConfiguring: false,
  currentStep: 'selection',
  expandedRows: new Set(),
  scenarioTypes: [],
  filters: {
    type: [],
    brand: [],
    retailer: [],
    status: [],
    dateRange: {
      startDate: null,
      endDate: null
    },
    searchQuery: ''
  }
}

export function useSimulatorComparison() {
  const [state, setState] = useState<SimulatorComparisonState>(initialState)

  const handleScenarioSelection = useCallback((scenarios: ComparisonSimulationScenario[]) => {
    if (scenarios.length < 2) {
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
            case 'projectedUnits':
              value = data.projectedUnits
              break
            case 'actualUnits':
              value = data.actualUnits || 0
              break
            case 'roi':
              value = data.roi
              break
            case 'lift':
              value = data.lift
              break
            case 'eventType':
              value = data.eventType
              break
            case 'duration':
              value = calculateDuration(data.startDate, data.endDate)
              break
            case 'status':
              value = data.status
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
            case 'projectedUnits':
              value = data.projectedUnits
              break
            case 'actualUnits':
              value = data.actualUnits || 0
              break
            case 'elasticity':
              value = data.elasticity
              break
            case 'competitorResponse':
              value = data.competitorResponse
              break
            case 'simulationType':
              value = data.simulationType
              break
            case 'status':
              value = data.status
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
        scenario,
        metrics,
        detailedMetrics
      }
    })

    setState(prev => ({
      ...prev,
      selectedScenarios: scenarios,
      numberOfScenarios: scenarios.length,
      columns,
      isConfiguring: true,
      currentStep: 'comparison',
      scenarioTypes: [...new Set(scenarios.map(s => s.type))]
    }))
  }, [])

  const resetComparison = useCallback(() => {
    setState(initialState)
  }, [])

  const goBackToSelection = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: 'selection',
      isConfiguring: false
    }))
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

  const updateFilters = useCallback((filters: Partial<SimulatorFilterOptions>) => {
    setState(prev => ({
      ...prev,
      filters: {
        ...prev.filters,
        ...filters
      }
    }))
  }, [])

  const clearFilters = useCallback(() => {
    setState(prev => ({
      ...prev,
      filters: initialState.filters
    }))
  }, [])

  const getComparisonInsights = useCallback(() => {
    return generateComparisonInsights(state.selectedScenarios)
  }, [state.selectedScenarios])

  return {
    // State
    selectedScenarios: state.selectedScenarios,
    numberOfScenarios: state.numberOfScenarios,
    columns: state.columns,
    isConfiguring: state.isConfiguring,
    currentStep: state.currentStep,
    expandedRows: state.expandedRows,
    scenarioTypes: state.scenarioTypes,
    filters: state.filters,
    
    // Actions
    handleScenarioSelection,
    resetComparison,
    goBackToSelection,
    toggleMetric,
    toggleRowExpansion,
    updateFilters,
    clearFilters,
    getComparisonInsights
  }
}
