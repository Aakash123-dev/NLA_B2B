'use client'

import React from 'react'
import { Target, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export function FormHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/25">
          <Target className="w-8 h-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-4">
        Create Trade Plan
      </h1>
      
      <p className="text-lg text-gray-600 max-w-md mx-auto">
        Set up your strategic trade plan with comprehensive optimization parameters
      </p>
      
      <div className="flex items-center justify-center space-x-2 mt-6">
        <Sparkles className="w-5 h-5 text-blue-500" />
        <span className="text-sm font-medium text-blue-600">Step 1 of 2</span>
      </div>
    </motion.div>
  )
}
