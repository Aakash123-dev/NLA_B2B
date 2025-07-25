'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ComparisonColumn } from '../types'
import { detailedMetrics } from '../constants'

interface DetailedMetricsExpansionProps {
  attribute: string
  columns: ComparisonColumn[]
  numberOfTpos: number
}

// Generate mock detailed data for demonstration
const generateDetailedData = (columnId: string, metric: string): number | string => {
  const hash = columnId.charCodeAt(0) + metric.charCodeAt(0)
  const seedValue = Math.abs(hash * 123456) % 10000
  
  // Currency values (higher ranges for revenue/profit)
  if (metric.includes('Revenue') || metric.includes('Profit')) {
    return (seedValue * 100) + 50000 // $50K - $1M range
  }
  
  if (metric.includes('$') || metric.includes('Price') || metric.includes('Cost') || metric.includes('Spend')) {
    if (metric.includes('Per Unit')) {
      return (seedValue % 50) + 5 // $5 - $55 per unit
    }
    return (seedValue * 10) + 1000 // $1K - $100K range
  }
  
  // Percentage values
  if (metric.includes('%') || metric.includes('ROI') || metric.includes('Margin')) {
    if (metric.includes('ROI')) {
      return (seedValue % 300) + 50 // 50% - 350% ROI range
    }
    if (metric.includes('Margin')) {
      return (seedValue % 40) + 10 // 10% - 50% margin range
    }
    if (metric.includes('ACV')) {
      return (seedValue % 90) + 10 // 10% - 100% ACV range
    }
    if (metric.includes('Lift')) {
      return (seedValue % 200) + 5 // 5% - 205% lift range
    }
    return (seedValue % 50) + 5 // General 5% - 55% range
  }
  
  // Unit values
  if (metric.includes('Units') || metric.includes('@')) {
    return (seedValue * 50) + 1000 // 1K - 500K units
  }
  
  // Handle special cases
  if (metric === 'Promotion') {
    return seedValue // Will be converted to promotion type in formatting
  }
  
  return (seedValue % 100) + 10 // Default numeric values
}

const formatValue = (value: number | string, metric: string): string => {
  if (typeof value === 'string') return value
  
  if (metric.includes('$') || metric.includes('Revenue') || metric.includes('Price') || 
      metric.includes('Cost') || metric.includes('Profit') || metric.includes('Spend') ||
      metric.includes('Dollars')) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }
  
  if (metric.includes('%') || metric.includes('ROI') || metric.includes('Margin') ||
      metric.includes('ACV') || metric.includes('Lift')) {
    return `${value.toFixed(1)}%`
  }
  
  if (metric.includes('@') || metric.includes('Units')) {
    return new Intl.NumberFormat('en-US').format(value)
  }
  
  // Handle promotion-specific metrics
  if (metric === 'Promotion') {
    const promotionTypes = ['TPR', 'Feature Only', 'Display Only', 'Feature & Display']
    return promotionTypes[Math.floor(Math.abs(value) % promotionTypes.length)]
  }
  
  return value.toFixed(2)
}

const getMetricColor = (metric: string): string => {
  if (metric.includes('Revenue') || metric.includes('Profit')) return 'text-green-600'
  if (metric.includes('Cost') || metric.includes('Spend') || metric.includes('Discount')) return 'text-red-600'
  if (metric.includes('%') || metric.includes('ROI') || metric.includes('ACV') || metric.includes('Lift')) return 'text-blue-600'
  if (metric.includes('Units') || metric.includes('@')) return 'text-purple-600'
  if (metric.includes('Price') || metric.includes('$')) return 'text-emerald-600'
  if (metric === 'Promotion') return 'text-indigo-600'
  return 'text-gray-700'
}

export function DetailedMetricsExpansion({ 
  attribute, 
  columns, 
  numberOfTpos 
}: DetailedMetricsExpansionProps) {
  // Show all metric categories for comprehensive comparison
  const relevantCategories = ['Financial Details', 'Financial Results', 'Promotion Results']

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="bg-gray-50 border-t border-gray-200 overflow-hidden"
    >
      <div className="px-6 py-4">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-lg font-bold text-gray-900 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full"></div>
            Comprehensive Metrics Comparison for "{attribute}"
          </h4>
          <div className="text-xs text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-1.5 rounded-full border border-gray-200">
            {relevantCategories.length} categories • {relevantCategories.reduce((total, cat) => total + detailedMetrics[cat as keyof typeof detailedMetrics].length, 0)} total metrics
          </div>
        </div>

        {relevantCategories.map((category, categoryIndex) => {
          const categoryColors = {
            'Financial Details': { bg: 'bg-blue-500', border: 'border-blue-200', bgLight: 'bg-blue-50' },
            'Financial Results': { bg: 'bg-pink-500', border: 'border-pink-200', bgLight: 'bg-pink-50' },
            'Promotion Results': { bg: 'bg-purple-500', border: 'border-purple-200', bgLight: 'bg-purple-50' }
          }
          
          const colors = categoryColors[category as keyof typeof categoryColors]
          
          return (
            <div key={category} className="mb-6 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full ${colors.bg}`}></div>
                <h5 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                  {category}
                </h5>
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {detailedMetrics[category as keyof typeof detailedMetrics].length} metrics
                </span>
              </div>
              
              <div className={`space-y-2 p-4 rounded-lg ${colors.bgLight} ${colors.border} border`}>
                {detailedMetrics[category as keyof typeof detailedMetrics].map((metric, metricIndex) => (
                  <div
                    key={metric}
                    className="grid gap-4 py-3 px-4 rounded-lg bg-white border border-gray-150 hover:border-gray-250 hover:shadow-sm transition-all duration-200"
                    style={{ gridTemplateColumns: `280px repeat(${numberOfTpos}, 1fr)` }}
                  >
                    <div className="text-sm font-medium text-gray-700 flex items-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="truncate">{metric}</span>
                    </div>
                    
                    {columns.map((column) => {
                      const value = generateDetailedData(column.id, metric)
                      const formattedValue = formatValue(value, metric)
                      const colorClass = getMetricColor(metric)
                      
                      return (
                        <div 
                          key={`${column.id}-${metric}`} 
                          className={`text-center flex items-center justify-center ${
                            column.isBestPerforming ? 'bg-green-50/70 rounded-md' : ''
                          }`}
                        >
                          <span className={`text-sm font-semibold ${colorClass} bg-white/80 px-3 py-1 rounded-md border ${
                            column.isBestPerforming ? 'border-green-200 shadow-sm' : 'border-gray-100'
                          }`}>
                            {formattedValue}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {/* Comprehensive Performance Summary */}
        <div className="mt-8 pt-6 border-t-2 border-gray-300">
          <div
            className="grid gap-4 py-4 px-5 bg-gradient-to-r from-slate-50 via-blue-50 to-indigo-50 rounded-xl border-2 border-slate-200 shadow-sm"
            style={{ gridTemplateColumns: `280px repeat(${numberOfTpos}, 1fr)` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              <div>
                <div className="text-sm font-bold text-slate-900">Performance Summary</div>
                <div className="text-xs text-slate-600">Overall comparison for {attribute}</div>
              </div>
            </div>
            {columns.map((column, index) => {
              const totalMetrics = relevantCategories.reduce((total, cat) => total + detailedMetrics[cat as keyof typeof detailedMetrics].length, 0)
              const performanceScore = Math.floor(Math.random() * 40) + 60 // Mock score between 60-100
              const getScoreColor = (score: number, isBest: boolean) => {
                if (isBest) return 'text-green-800 bg-green-100 border-green-400 shadow-md'
                if (score >= 85) return 'text-green-700 bg-green-100 border-green-300'
                if (score >= 70) return 'text-blue-700 bg-blue-100 border-blue-300'
                return 'text-orange-700 bg-orange-100 border-orange-300'
              }
              
              return (
                <div 
                  key={`${column.id}-summary`} 
                  className={`text-center space-y-2 ${
                    column.isBestPerforming ? 'bg-green-50 rounded-lg p-2' : ''
                  }`}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg border-2 ${getScoreColor(performanceScore, column.isBestPerforming || false)}`}>
                    {performanceScore}
                  </div>
                  <div className={`text-xs ${column.isBestPerforming ? 'text-green-700' : 'text-slate-600'}`}>
                    <div className="font-medium">
                      {column.isBestPerforming ? 'Best Performer' : `Campaign ${index + 1}`}
                    </div>
                    <div>{totalMetrics} metrics analyzed</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
