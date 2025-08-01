'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, ChevronDown, ChevronRight, TrendingUp, Star, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ComparisonColumn } from '../types'
import { eventComparisonAttributes, metricCategories } from '../constants'
import { formatMetricValue, formatCurrency, formatNumber } from '../utils'

interface TPOEventComparisonTableProps {
  columns: ComparisonColumn[]
  numberOfEvents: number
  visibleMetrics: Set<string>
  expandedCategories?: Set<string>
  onToggleCategoryExpansion?: (category: string) => void
}

export function TPOEventComparisonTable({ 
  columns, 
  numberOfEvents, 
  visibleMetrics,
  expandedCategories = new Set(['Financial Details', 'Financial Results', 'Promotion Results']),
  onToggleCategoryExpansion
}: TPOEventComparisonTableProps) {
  const [localExpandedCategories, setLocalExpandedCategories] = useState<Set<string>>(expandedCategories)

  const toggleCategory = (category: string) => {
    if (onToggleCategoryExpansion) {
      onToggleCategoryExpansion(category)
    } else {
      const newExpanded = new Set(localExpandedCategories)
      if (newExpanded.has(category)) {
        newExpanded.delete(category)
      } else {
        newExpanded.add(category)
      }
      setLocalExpandedCategories(newExpanded)
    }
  }

  const currentExpandedCategories = onToggleCategoryExpansion ? expandedCategories : localExpandedCategories

  // Get all metrics organized by category, filtered by visibility
  const allMetrics = Object.values(metricCategories)
    .flatMap(category => category.metrics)
    .filter(metric => visibleMetrics.has(metric))
  
  // Get filtered metric categories with only visible metrics
  const filteredMetricCategories = Object.fromEntries(
    Object.entries(metricCategories).map(([categoryName, categoryData]) => [
      categoryName,
      {
        ...categoryData,
        metrics: categoryData.metrics.filter(metric => visibleMetrics.has(metric))
      }
    ]).filter(([_, categoryData]) => (categoryData as { metrics: string[]; color: string }).metrics.length > 0)
  )
  
  // Function to get the best performing event for a specific metric
  const getBestPerformingEvent = (metric: string) => {
    const numericValues = columns
      .map((col, index) => ({ value: col.metrics[metric], index }))
      .filter(item => typeof item.value === 'number' && item.value > 0)
    
    if (numericValues.length === 0) return -1
    
    const maxValue = Math.max(...numericValues.map(item => item.value as number))
    const bestEvent = numericValues.find(item => item.value === maxValue)
    return bestEvent ? bestEvent.index : -1
  }

  // Generate comparison insights
  const generateInsights = () => {
    if (columns.length === 0) return []
    
    const insights = []
    
    // Find best revenue performer
    let bestRevenueColumn = columns[0]
    let maxRevenue = typeof bestRevenueColumn.metrics['Gross Revenue'] === 'number' 
      ? bestRevenueColumn.metrics['Gross Revenue'] as number 
      : 0

    columns.forEach(column => {
      const revenue = typeof column.metrics['Gross Revenue'] === 'number' 
        ? column.metrics['Gross Revenue'] as number 
        : 0
      if (revenue > maxRevenue) {
        maxRevenue = revenue
        bestRevenueColumn = column
      }
    })

    if (maxRevenue > 0) {
      insights.push(`${bestRevenueColumn.title} generates the highest projected revenue of ${formatCurrency(maxRevenue)}`)
    }

    // Find best ROI performer
    let bestROIColumn = columns[0]
    let maxROI = typeof bestROIColumn.metrics['Sales ROI'] === 'number' 
      ? bestROIColumn.metrics['Sales ROI'] as number 
      : 0

    columns.forEach(column => {
      const roi = typeof column.metrics['Sales ROI'] === 'number' 
        ? column.metrics['Sales ROI'] as number 
        : 0
      if (roi > maxROI) {
        maxROI = roi
        bestROIColumn = column
      }
    })

    if (maxROI > 0) {
      insights.push(`${bestROIColumn.title} achieves the best ROI performance with ${maxROI.toFixed(1)}%`)
    }

    // Overall performance insight
    insights.push(`All events show strong performance across ${Object.keys(filteredMetricCategories).length} metric categories`)

    return insights
  }

  const insights = generateInsights()

  // Calculate best performers for summary cards
  const getBestRevenue = () => {
    let best = columns[0]
    let maxValue = 0
    
    columns.forEach(column => {
      const value = typeof column.metrics['Gross Revenue'] === 'number' 
        ? column.metrics['Gross Revenue'] as number 
        : 0
      if (value > maxValue) {
        maxValue = value
        best = column
      }
    })
    
    return { column: best, value: maxValue }
  }

  const getBestROI = () => {
    let best = columns[0]
    let maxValue = 0
    
    columns.forEach(column => {
      const value = typeof column.metrics['Sales ROI'] === 'number' 
        ? column.metrics['Sales ROI'] as number 
        : 0
      if (value > maxValue) {
        maxValue = value
        best = column
      }
    })
    
    return { column: best, value: maxValue }
  }

  const bestRevenue = getBestRevenue()
  const bestROI = getBestROI()

  return (
    <div className="w-full px-4 py-4 space-y-4 lg:space-y-6">
      {/* Insights Summary */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <TrendingUp className="w-5 h-5" />
                Comparison Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {insights.map((insight, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm text-blue-800">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Metric Categories Control */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <Card className="bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-gray-900">
              <Settings className="w-5 h-5" />
              Metric Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {Object.entries(filteredMetricCategories).map(([categoryName, categoryData]) => {
                const typedCategoryData = categoryData as { metrics: string[]; color: string }
                return (
                  <Button
                    key={categoryName}
                    variant={currentExpandedCategories.has(categoryName) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleCategory(categoryName)}
                    className="gap-2"
                  >
                    {currentExpandedCategories.has(categoryName) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    📈 {categoryName} ({typedCategoryData.metrics.length})
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
      >
        {/* Table Container */}
        <div 
          className="overflow-x-auto custom-scrollbar"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db #f3f4f6',
          }}
        >
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-semibold text-gray-900 min-w-[250px] sticky left-0 bg-gray-50 z-10">
                  Event Name
                </th>
                {Object.entries(filteredMetricCategories).map(([categoryName, categoryData]) => {
                  const typedCategoryData = categoryData as { metrics: string[]; color: string }
                  return currentExpandedCategories.has(categoryName) && typedCategoryData.metrics.map((metric: string) => (
                    <th key={metric} className="text-center p-4 font-semibold text-gray-900 min-w-[140px]">
                      <div className="space-y-1">
                        <div className="text-xs text-gray-500">📈 {categoryName}</div>
                        <div className="font-medium text-sm text-gray-900">{metric}</div>
                      </div>
                    </th>
                  ))
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {columns.map((column, index) => (
                <motion.tr
                  key={column.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="hover:bg-gray-50"
                >
                  {/* Event Info Column */}
                  <td className="p-4 sticky left-0 bg-white z-10 border-r border-gray-100">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-800">
                          📊 TPO
                        </Badge>
                        {column.isBestPerforming && (
                          <Badge className="bg-yellow-100 text-yellow-800">⭐ Best</Badge>
                        )}
                      </div>
                      <div className="font-semibold text-gray-900">{column.title}</div>
                      <div className="text-sm text-gray-600">
                        <div>{column.event?.brand || 'N/A'}</div>
                        <div>{column.event?.retailer || 'N/A'}</div>
                        <div className="text-xs text-gray-500">{column.event?.eventType || 'N/A'}</div>
                      </div>
                      {column.event?.status && (
                        <Badge className="bg-green-100 text-green-800">
                          {column.event.status}
                        </Badge>
                      )}
                    </div>
                  </td>
                  
                  {/* Metric Values */}
                  {Object.entries(filteredMetricCategories).map(([categoryName, categoryData]) => {
                    const typedCategoryData = categoryData as { metrics: string[]; color: string }
                    return currentExpandedCategories.has(categoryName) && typedCategoryData.metrics.map((metric: string) => {
                      const value = column.metrics[metric]
                      const displayValue = formatMetricValue(value, metric)
                      
                      // Check if this is the best value for revenue or ROI metrics
                      const isBest = (metric === 'Gross Revenue' && bestRevenue.column.id === column.id) ||
                                    (metric === 'Sales ROI' && bestROI.column.id === column.id)
                      
                      return (
                        <td key={metric} className="p-4 text-center">
                          <div className={`${isBest ? 'bg-yellow-50 rounded px-2 py-1' : ''}`}>
                            <span className={`${isBest ? 'font-semibold text-yellow-800' : 'text-gray-900'}`}>
                              {displayValue}
                            </span>
                            {isBest && <span className="ml-1">⭐</span>}
                          </div>
                        </td>
                      )
                    })
                  })}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 border-t border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                Performance Summary
              </h4>
              <p className="text-xs text-gray-600">
                {numberOfEvents} events across {allMetrics.length} metrics
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                <span>Best metric</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-600" />
                <span>Best event</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
      >
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Best Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-lg font-semibold text-green-600">
                {formatCurrency(bestRevenue.value)}
              </div>
              <div className="text-sm text-gray-600 mt-1">{bestRevenue.column.title}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Best ROI</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-lg font-semibold text-blue-600">
                {bestROI.value.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600 mt-1">{bestROI.column.title}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-purple-600">{numberOfEvents}</div>
            <div className="text-sm text-gray-600 mt-1">
              TPO Events Compared
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold text-orange-600">{Object.keys(filteredMetricCategories).length}</div>
            <div className="text-sm text-gray-600 mt-1">
              Metric Categories
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
