'use client'

import React from 'react'
import { ArrowLeft, RotateCcw, TrendingUp, Settings } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ComparisonHeaderProps {
  numberOfScenarios: number | null
  onBack: () => void
  onNewComparison: () => void
  showNewComparisonButton?: boolean
  scenarioTypes?: ('promo' | 'price')[]
}

export function ComparisonHeader({ 
  numberOfScenarios, 
  onBack, 
  onNewComparison, 
  showNewComparisonButton = false,
  scenarioTypes = []
}: ComparisonHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <div className="h-6 w-px bg-gray-300" />

            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Scenario Comparison
                </h1>
                {numberOfScenarios && (
                  <p className="text-sm text-gray-600">
                    Comparing {numberOfScenarios} scenario{numberOfScenarios !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Scenario Type Badges */}
            {scenarioTypes.length > 0 && (
              <div className="flex items-center gap-2 ml-4">
                {scenarioTypes.includes('promo') && (
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                    🏷️ Promo
                  </Badge>
                )}
                {scenarioTypes.includes('price') && (
                  <Badge variant="secondary" className="bg-indigo-100 text-indigo-800">
                    💰 Price
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {showNewComparisonButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onNewComparison}
                className="text-gray-700 border-gray-200 hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Comparison
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
