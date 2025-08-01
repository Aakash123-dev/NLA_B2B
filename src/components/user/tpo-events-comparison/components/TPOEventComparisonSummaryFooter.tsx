'use client'

import React from 'react'
import { ComparisonColumn } from '../types'
import { Trophy, BarChart3 } from 'lucide-react'

interface TPOEventComparisonSummaryFooterProps {
  columns: ComparisonColumn[]
  numberOfEvents: number
}

export function TPOEventComparisonSummaryFooter({ columns, numberOfEvents }: TPOEventComparisonSummaryFooterProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-t border-gray-200/80 p-6">
      <div className="grid gap-6" style={{ gridTemplateColumns: `280px repeat(${numberOfEvents}, 1fr)` }}>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-semibold text-gray-900">
            Performance Score
          </span>
        </div>
        {columns.map((column) => {
          // Calculate average performance score based on multiple metrics
          const roiScore = typeof column.metrics['Sales ROI'] === 'number' ? column.metrics['Sales ROI'] : 0
          const revenueScore = typeof column.metrics['Gross Revenue'] === 'number' ? column.metrics['Gross Revenue'] / 1000 : 0
          const liftScore = typeof column.metrics['Event Total %Lift'] === 'number' ? column.metrics['Event Total %Lift'] : 0
          const performanceScore = Math.round((roiScore + revenueScore + liftScore) / 3)
          
          return (
            <div 
              key={`${column.id}-summary`} 
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl text-lg font-bold mb-2 transition-all ${
                column.isBestPerforming 
                  ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700'
              }`}>
                {Math.min(performanceScore, 100)}
              </div>
              {column.isBestPerforming && (
                <div className="flex items-center justify-center gap-1 text-xs text-emerald-700 font-semibold">
                  <Trophy className="w-3 h-3" />
                  Winner
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
