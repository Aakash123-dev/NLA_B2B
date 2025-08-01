import { useState } from 'react'
import { ComparisonColumn, ComparisonState, TPOEvent } from '../types'
import { generateEventComparisonColumns } from '../utils'
import { eventComparisonAttributes } from '../constants'

export const useTPOEventComparison = () => {
  const [selectedEvents, setSelectedEvents] = useState<TPOEvent[]>([])
  const [columns, setColumns] = useState<ComparisonColumn[]>([])
  const [isConfiguring, setIsConfiguring] = useState(false)
  const [currentStep, setCurrentStep] = useState<'selection' | 'comparison'>('selection')
  const [selectedBrand, setSelectedBrand] = useState<string>('')
  const [visibleMetrics, setVisibleMetrics] = useState<Set<string>>(
    new Set(eventComparisonAttributes)
  )
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['Financial Details', 'Financial Results', 'Promotion Results'])
  )

  const handleEventSelection = (events: TPOEvent[]) => {
    setSelectedEvents(events)
    const newColumns = generateEventComparisonColumns(events)
    setColumns(newColumns)
    setIsConfiguring(true)
    setCurrentStep('comparison')
  }

  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand)
  }

  const toggleMetricVisibility = (metric: string) => {
    setVisibleMetrics(prev => {
      const newSet = new Set(prev)
      if (newSet.has(metric)) {
        newSet.delete(metric)
      } else {
        newSet.add(metric)
      }
      return newSet
    })
  }

  const toggleCategoryExpansion = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(category)) {
        newSet.delete(category)
      } else {
        newSet.add(category)
      }
      return newSet
    })
  }

  const resetComparison = () => {
    setSelectedEvents([])
    setColumns([])
    setIsConfiguring(false)
    setCurrentStep('selection')
    setSelectedBrand('')
    setVisibleMetrics(new Set(eventComparisonAttributes))
    setExpandedCategories(new Set(['Financial Details', 'Financial Results', 'Promotion Results']))
  }

  const goBackToSelection = () => {
    setCurrentStep('selection')
    setIsConfiguring(false)
  }

  return {
    selectedEvents,
    numberOfEvents: selectedEvents.length,
    columns,
    isConfiguring,
    currentStep,
    selectedBrand,
    visibleMetrics,
    expandedCategories,
    handleEventSelection,
    handleBrandSelection,
    toggleMetricVisibility,
    toggleCategoryExpansion,
    resetComparison,
    goBackToSelection
  }
}
