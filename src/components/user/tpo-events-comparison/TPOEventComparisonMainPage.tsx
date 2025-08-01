'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { TPOEventComparisonHeader, TPOEventSelection, TPOEventComparisonTable } from './components'
import { useTPOEventComparison } from './hooks'
import { SharedSmartInsightsDrawer } from '@/components/common'

export function TPOEventComparisonMainPage() {
  const router = useRouter()
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  
  const { 
    selectedEvents,
    numberOfEvents, 
    columns, 
    isConfiguring,
    currentStep,
    selectedBrand,
    visibleMetrics,
    expandedCategories,
    handleEventSelection,
    handleBrandSelection, 
    toggleMetricVisibility,
    toggleCategoryExpansion,
    resetComparison,
    goBackToSelection
  } = useTPOEventComparison()

  const handleBackToUser = () => {
    router.push('/user')
  }

  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <TPOEventComparisonHeader 
            numberOfEvents={numberOfEvents}
            onBack={handleBackToUser}
            onNewComparison={resetComparison}
            brand={selectedBrand}
            onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
            visibleMetrics={visibleMetrics}
            onToggleMetric={toggleMetricVisibility}
          />
          <TPOEventSelection 
            onEventSelection={handleEventSelection}
            onBrandSelection={handleBrandSelection}
            selectedBrand={selectedBrand}
          />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full"
      >
        <TPOEventComparisonHeader 
          numberOfEvents={numberOfEvents}
          onBack={goBackToSelection}
          onNewComparison={resetComparison}
          showNewComparisonButton={true}
          brand={selectedBrand}
          onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
          visibleMetrics={visibleMetrics}
          onToggleMetric={toggleMetricVisibility}
        />
        <TPOEventComparisonTable 
          columns={columns}
          numberOfEvents={numberOfEvents}
          visibleMetrics={visibleMetrics}
          expandedCategories={expandedCategories}
          onToggleCategoryExpansion={toggleCategoryExpansion}
        />
      </motion.div>
      
      <SharedSmartInsightsDrawer 
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
