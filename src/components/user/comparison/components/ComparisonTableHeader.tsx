'use client'

import React from 'react'
import { ChevronRight, Info, Crown } from 'lucide-react'
import { ComparisonColumn } from '../types'

interface ComparisonTableHeaderProps {
  columns: ComparisonColumn[]
  numberOfTpos: number
}

export function ComparisonTableHeader({ columns, numberOfTpos }: ComparisonTableHeaderProps) {
  return (
    <div className="bg-gray-50 border-b border-gray-200 p-4">
      <div className="grid gap-4" style={{ gridTemplateColumns: `300px repeat(${numberOfTpos}, 1fr)` }}>
        <div className="font-medium text-gray-900 flex items-center gap-2">
          <span>Attributes</span>
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400 cursor-help" />
            <div className="absolute top-6 left-0 z-10 hidden group-hover:block bg-gray-900 text-white text-xs rounded-lg p-2 w-48">
              Click <ChevronRight className="w-3 h-3 inline mx-1" /> to expand detailed metrics comparison
            </div>
          </div>
        </div>
        {columns.map((column, index) => (
          <div 
            key={column.id} 
            className={`text-center relative ${
              column.isBestPerforming 
                ? 'bg-green-50/70 rounded-lg p-3 border border-green-100' 
                : ''
            }`}
          >
            {column.isBestPerforming && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            )}
            <div className={`font-medium mb-1 ${
              column.isBestPerforming ? 'text-green-800' : 'text-gray-900'
            }`}>
              {column.title}
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
              column.isBestPerforming 
                ? 'bg-green-100 text-green-700 border border-green-200' 
                : 'bg-gray-200 text-gray-600'
            }`}>
              {column.isBestPerforming ? 'Best Performer' : `Plan ${index + 1}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
