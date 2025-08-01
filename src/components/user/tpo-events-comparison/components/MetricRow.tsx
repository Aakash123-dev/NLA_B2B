'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { ComparisonColumn } from '../types'
import { formatMetricValue } from '../utils'

interface MetricRowProps {
  metric: string
  index: number
  columns: ComparisonColumn[]
  numberOfEvents: number
}

export function MetricRow({ 
  metric, 
  index, 
  columns, 
  numberOfEvents
}: MetricRowProps) {
  return (
    <div className="border-b border-gray-100/60 last:border-b-0 hover:bg-gray-50/30 transition-colors duration-200">
      <div className="grid gap-6 py-4 px-6" style={{ gridTemplateColumns: `280px repeat(${numberOfEvents}, 1fr)` }}>
        {/* Metric Name */}
        <div className="flex items-center">
          <div className="text-sm font-medium text-gray-700">
            {metric}
          </div>
        </div>

        {/* Values for each event */}
        {columns.map((column) => {
          const value = column.metrics[metric]
          const displayValue = formatMetricValue(value, metric)
          
          // Determine if this value is the best in this row
          const numericValues = columns
            .map(col => typeof col.metrics[metric] === 'number' ? col.metrics[metric] as number : 0)
            .filter(val => val > 0)
          
          const isBest = typeof value === 'number' && value > 0 && numericValues.length > 1 
            ? value === Math.max(...numericValues)
            : false
          
          return (
            <div 
              key={`${column.id}-${metric}`}
              className="flex items-center justify-center"
            >
              <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium text-sm transition-colors ${
                isBest 
                  ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' 
                  : 'text-gray-900'
              }`}>
                {isBest && <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />}
                {displayValue}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
