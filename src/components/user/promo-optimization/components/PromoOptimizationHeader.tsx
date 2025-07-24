'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calculator, Zap } from 'lucide-react'

interface PromoOptimizationHeaderProps {
  onBack: () => void
}

export function PromoOptimizationHeader({ onBack }: PromoOptimizationHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left side - Back button and title */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 transition-colors duration-200"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home Page
            </Button>
            
            <div className="h-6 w-px bg-gray-300" />
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Promo Optimization
                </h1>
                <p className="text-sm text-gray-500">
                  09/04/2025 Test
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Save Configuration
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-blue-500/25">
              <Zap className="mr-2 h-4 w-4" />
              Quick Calculate
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
