'use client'

import React from 'react'
import { Check, X, ChevronDown, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ComparisonColumn } from '../types'
import { DetailedMetricsExpansion } from './DetailedMetricsExpansion'

interface AttributeRowProps {
  attribute: string
  index: number
  columns: ComparisonColumn[]
  numberOfTpos: number
  onToggleAttribute: (columnId: string, attribute: string) => void
  isExpanded: boolean
  onToggleExpansion: (attribute: string) => void
}

export function AttributeRow({ 
  attribute, 
  index, 
  columns, 
  numberOfTpos, 
  onToggleAttribute,
  isExpanded,
  onToggleExpansion
}: AttributeRowProps) {
  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.02, duration: 0.2 }}
        className={`grid gap-4 p-4 transition-all duration-200 ${
          isExpanded 
            ? 'bg-blue-50/50 border-l-4 border-l-blue-500' 
            : 'hover:bg-gray-50'
        }`}
        style={{ gridTemplateColumns: `300px repeat(${numberOfTpos}, 1fr)` }}
      >
        <div className="font-medium text-gray-700 flex items-center">
          <button
            onClick={() => onToggleExpansion(attribute)}
            className={`mr-3 p-1.5 rounded-lg transition-all duration-200 border ${
              isExpanded 
                ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' 
                : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200 hover:border-gray-400'
            }`}
            title={isExpanded ? 'Collapse detailed metrics' : 'Expand detailed metrics'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          <div className={`w-2.5 h-2.5 rounded-full mr-3 ${isExpanded ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
          <span className={isExpanded ? 'text-gray-900 font-semibold' : ''}>{attribute}</span>
        </div>
        {columns.map((column) => (
          <div 
            key={`${column.id}-${attribute}`} 
            className={`flex justify-center ${
              column.isBestPerforming ? 'bg-green-50/50 rounded-lg' : ''
            }`}
          >
            <button
              onClick={() => onToggleAttribute(column.id, attribute)}
              className="group"
            >
              {column.attributes[attribute] ? (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-150 ${
                  column.isBestPerforming 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}>
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-150 ${
                  column.isBestPerforming 
                    ? 'bg-red-400 hover:bg-red-500 opacity-60' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}>
                  <X className="w-4 h-4 text-white" />
                </div>
              )}
            </button>
          </div>
        ))}
      </motion.div>
      
      <AnimatePresence>
        {isExpanded && (
          <DetailedMetricsExpansion
            attribute={attribute}
            columns={columns}
            numberOfTpos={numberOfTpos}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
