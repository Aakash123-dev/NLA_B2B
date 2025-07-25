'use client'

import React from 'react'
import { ComparisonColumn } from '../types'
import { calculateComparisonSummary } from '../utils'
import { defaultAttributes } from '../constants'

interface ComparisonSummaryFooterProps {
  columns: ComparisonColumn[]
  numberOfTpos: number
}

export function ComparisonSummaryFooter({ columns, numberOfTpos }: ComparisonSummaryFooterProps) {
  return (
    <div className="bg-gray-50 border-t border-gray-200 p-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: `300px repeat(${numberOfTpos}, 1fr)` }}>
        <div className="font-medium text-gray-900">
          Summary
        </div>
        {columns.map((column) => {
          const { totalTrue, percentage } = calculateComparisonSummary(column)
          
          return (
            <div 
              key={`${column.id}-summary`} 
              className={`text-center ${
                column.isBestPerforming ? 'bg-green-50 rounded-lg p-2' : ''
              }`}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-sm font-semibold mb-1 ${
                column.isBestPerforming 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-900 text-white'
              }`}>
                {percentage}%
              </div>
              <div className={`text-xs ${
                column.isBestPerforming ? 'text-green-700 font-medium' : 'text-gray-500'
              }`}>
                {totalTrue} of {defaultAttributes.length}
              </div>
              {column.isBestPerforming && (
                <div className="text-xs text-green-600 font-medium mt-1">
                  Top Performer
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
