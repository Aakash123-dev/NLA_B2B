'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Search, Check, Building, ArrowRight } from 'lucide-react'
import { Brand } from '../types'
import { availableBrands } from '../constants'
import { filterBrandsBySearch } from '../utils'

interface BrandSelectionProps {
  onBrandSelection: (selectedBrands: Brand[]) => void
}

export function BrandSelection({ onBrandSelection }: BrandSelectionProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  const filteredBrands = filterBrandsBySearch(availableBrands, searchQuery)

  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId) 
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    )
  }

  const handleContinue = () => {
    const selectedBrandObjects = availableBrands.filter(brand => 
      selectedBrands.includes(brand.id)
    )
    onBrandSelection(selectedBrandObjects)
  }

  const handleSelectAll = () => {
    const allIds = filteredBrands.map(brand => brand.id)
    setSelectedBrands(allIds)
  }

  const handleClearAll = () => {
    setSelectedBrands([])
  }

  return (
    <div className="w-full px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Select Brands
          </h2>
          <p className="text-gray-600">
            Choose multiple brands to create your event library
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredBrands.map((brand, index) => {
            const isSelected = selectedBrands.includes(brand.id)
            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                onClick={() => handleBrandToggle(brand.id)}
                className={`
                  relative p-4 border rounded-lg cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`
                      w-10 h-10 rounded-lg flex items-center justify-center
                      ${isSelected ? 'bg-blue-500' : 'bg-gray-100'}
                    `}>
                      <Building className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{brand.name}</h3>
                      <p className="text-sm text-gray-500">{brand.category}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{brand.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <Button
            onClick={handleContinue}
            disabled={selectedBrands.length === 0}
            size="lg"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue with {selectedBrands.length} Brand{selectedBrands.length !== 1 ? 's' : ''}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
