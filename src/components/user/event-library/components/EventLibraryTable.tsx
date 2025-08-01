'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronRight, Building, Calendar } from 'lucide-react'
import { EventData } from '../types'
import { eventNames, attributeNames } from '../constants'

interface EventLibraryTableProps {
  eventData: EventData[]
  selectedBrands: any[]
}

export function EventLibraryTable({ eventData }: EventLibraryTableProps) {
  const [expandedBrands, setExpandedBrands] = useState<Set<string>>(new Set())

  const handleToggleBrand = (brandId: string) => {
    setExpandedBrands(prev => {
      const newSet = new Set(prev)
      if (newSet.has(brandId)) {
        newSet.delete(brandId)
      } else {
        newSet.add(brandId)
      }
      return newSet
    })
  }

  const handleExpandAll = () => {
    setExpandedBrands(new Set(eventData.map(data => data.brandId)))
  }

  const handleCollapseAll = () => {
    setExpandedBrands(new Set())
  }

  return (
    <div className="w-full px-6 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden"
      >
        {/* Controls */}
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {expandedBrands.size} of {eventData.length} brands expanded
          </div>
          <div className="flex gap-2">
            {expandedBrands.size > 0 && (
              <button
                onClick={handleCollapseAll}
                className="text-sm text-gray-600 hover:text-gray-900 px-3 py-1 rounded-md hover:bg-gray-200 transition-all duration-200"
              >
                Collapse All
              </button>
            )}
            {expandedBrands.size < eventData.length && (
              <button
                onClick={handleExpandAll}
                className="text-sm text-blue-600 hover:text-blue-700 px-3 py-1 rounded-md hover:bg-blue-50 transition-all duration-200"
              >
                Expand All
              </button>
            )}
          </div>
        </div>

        {/* Brand List */}
        <div>
          {eventData.map((brandData, brandIndex) => {
            const isExpanded = expandedBrands.has(brandData.brandId)
            
            return (
              <div key={brandData.brandId} className="border-b border-gray-100 last:border-b-0">
                {/* Brand Header */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: brandIndex * 0.1, duration: 0.2 }}
                  onClick={() => handleToggleBrand(brandData.brandId)}
                  className={`
                    flex items-center justify-between p-4 cursor-pointer transition-all duration-200
                    ${isExpanded 
                      ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-50'
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <button
                      className={`
                        p-1.5 rounded-lg transition-all duration-200 border
                        ${isExpanded 
                          ? 'bg-blue-100 border-blue-300 text-blue-700 hover:bg-blue-200' 
                          : 'bg-gray-100 border-gray-300 text-gray-600 hover:bg-gray-200'
                        }
                      `}
                    >
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isExpanded ? 'bg-blue-500' : 'bg-gray-200'}
                    `}>
                      <Building className={`w-5 h-5 ${isExpanded ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isExpanded ? 'text-gray-900' : 'text-gray-700'}`}>
                        {brandData.brandName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {eventNames.length} events saved
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Click to {isExpanded ? 'collapse' : 'expand'} events
                  </div>
                </motion.div>

                {/* Events Table */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white"
                  >
                    <div className="px-4 py-2 bg-gray-25 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        Events for {brandData.brandName}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-gray-200">
                              <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50 rounded-tl-lg w-40">
                                Attributes
                              </th>
                              {eventNames.map((eventName, index) => (
                                <th 
                                  key={eventName} 
                                  className={`text-center py-3 px-4 font-medium text-gray-900 bg-gray-50 ${
                                    index === eventNames.length - 1 ? 'rounded-tr-lg' : ''
                                  }`}
                                >
                                  {eventName}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {attributeNames.map((attributeName, attributeIndex) => (
                              <motion.tr
                                key={attributeName}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: attributeIndex * 0.05, duration: 0.2 }}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200"
                              >
                                <td className="py-3 px-4 font-medium text-gray-900 bg-gray-25">
                                  {attributeName}
                                </td>
                                {eventNames.map((eventName) => (
                                  <td key={`${eventName}-${attributeName}`} className="py-3 px-4 text-gray-600 text-center">
                                    {(() => {
                                      const eventData = brandData.events[eventName]
                                      if (attributeName === 'Attribute 1') return eventData?.attribute1 || 'N/A'
                                      if (attributeName === 'Attribute 2') return eventData?.attribute2 || 'N/A'
                                      if (attributeName === 'Attribute 3') return eventData?.attribute3 || 'N/A'
                                      return 'N/A'
                                    })()}
                                  </td>
                                ))}
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )
          })}
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 border-t border-gray-200 p-4">
          <div className="text-center">
            <div className="text-sm text-gray-600">
              Total: <span className="font-medium text-gray-900">{eventData.length} brands</span> × 
              <span className="font-medium text-gray-900"> {eventNames.length} events</span> = 
              <span className="font-medium text-gray-900"> {eventData.length * eventNames.length} total events</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
