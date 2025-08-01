'use client'

import React from 'react'
import { Award, TrendingUp } from 'lucide-react'
import { ComparisonColumn } from '../types'

interface TPOEventComparisonTableHeaderProps {
  columns: ComparisonColumn[]
  numberOfEvents: number
}

export function TPOEventComparisonTableHeader({ columns, numberOfEvents }: TPOEventComparisonTableHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 border-b border-gray-200/80 p-6">
      <div className="grid gap-6" style={{ gridTemplateColumns: `280px repeat(${numberOfEvents}, 1fr)` }}>
        <div className="flex items-center">
          <div className="text-sm font-semibold text-gray-900">
            Metrics
          </div>
        </div>
        {columns.map((column, index) => (
          <div 
            key={column.id} 
            className="text-center"
          >
            <div className="mb-3">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                column.isBestPerforming 
                  ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md' 
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}>
                {column.isBestPerforming && <Award className="w-4 h-4" />}
                {column.title}
              </div>
            </div>
            <div className={`text-xs font-medium ${
              column.isBestPerforming ? 'text-emerald-700' : 'text-gray-500'
            }`}>
              {column.isBestPerforming ? (
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Best Performer
                </div>
              ) : (
                `Event ${index + 1}`
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
