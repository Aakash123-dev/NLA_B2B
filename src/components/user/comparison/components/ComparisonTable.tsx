'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { ComparisonColumn } from '../types'
import { defaultAttributes } from '../constants'
import { ComparisonTableHeader } from './ComparisonTableHeader'
import { AttributeRow } from './AttributeRow'
import { ComparisonSummaryFooter } from './ComparisonSummaryFooter'

interface ComparisonTableProps {
  columns: ComparisonColumn[]
  numberOfTpos: number
  onToggleAttribute: (columnId: string, attribute: string) => void
}

export function ComparisonTable({ columns, numberOfTpos, onToggleAttribute }: ComparisonTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  const handleToggleExpansion = (attribute: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(attribute)) {
        newSet.delete(attribute)
      } else {
        newSet.add(attribute)
      }
      return newSet
    })
  }

  const handleExpandAll = () => {
    setExpandedRows(new Set(defaultAttributes))
  }

  const handleCollapseAll = () => {
    setExpandedRows(new Set())
  }

  const isAllExpanded = expandedRows.size === defaultAttributes.length
  const hasAnyExpanded = expandedRows.size > 0

  return (
    <div className="w-full px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        <ComparisonTableHeader columns={columns} numberOfTpos={numberOfTpos} />
        
        {/* Expand/Collapse Controls */}
        <div className="bg-gray-25 border-b border-gray-100 px-4 py-2 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {expandedRows.size} of {defaultAttributes.length} attributes expanded
          </div>
          <div className="flex gap-2">
            {hasAnyExpanded && (
              <button
                onClick={handleCollapseAll}
                className="text-xs px-3 py-1 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1"
              >
                <ChevronUp className="w-3 h-3" />
                Collapse All
              </button>
            )}
            {!isAllExpanded && (
              <button
                onClick={handleExpandAll}
                className="text-xs px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full hover:bg-emerald-100 transition-colors flex items-center gap-1"
              >
                <ChevronDown className="w-3 h-3" />
                Expand All
              </button>
            )}
          </div>
        </div>
        
        <div>
          {defaultAttributes.map((attribute, index) => (
            <AttributeRow
              key={attribute}
              attribute={attribute}
              index={index}
              columns={columns}
              numberOfTpos={numberOfTpos}
              onToggleAttribute={onToggleAttribute}
              isExpanded={expandedRows.has(attribute)}
              onToggleExpansion={handleToggleExpansion}
            />
          ))}
        </div>

        <ComparisonSummaryFooter columns={columns} numberOfTpos={numberOfTpos} />
      </motion.div>
    </div>
  )
}
