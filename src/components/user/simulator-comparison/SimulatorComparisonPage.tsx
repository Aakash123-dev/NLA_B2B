'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { SimulatorScenarioSelection } from './components/SimulatorScenarioSelection'
import { SimulatorComparisonTable } from './components/SimulatorComparisonTable'
import { useSimulatorComparison } from './hooks'
import { SharedSmartInsightsDrawer } from '@/components/common'

export function SimulatorComparisonPage() {
  const router = useRouter()
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  
  const {
    selectedScenarios,
    numberOfScenarios,
    columns,
    isConfiguring,
    currentStep,
    expandedRows,
    scenarioTypes,
    handleScenarioSelection,
    resetComparison,
    goBackToSelection,
    toggleMetric,
    toggleRowExpansion,
    getComparisonInsights
  } = useSimulatorComparison()

  const handleBackToUser = () => {
    router.push('/user')
  }

  // Default to expand all categories for initial view
  React.useEffect(() => {
    if (currentStep === 'comparison' && expandedRows.size === 0) {
      const categories = ['performance', 'financial', 'operational']
      categories.forEach(category => toggleRowExpansion(category))
    }
  }, [currentStep, expandedRows.size, toggleRowExpansion])

  if (currentStep === 'selection') {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full"
        >
          <SimulatorScenarioSelection 
            onScenarioSelection={handleScenarioSelection}
            onBack={handleBackToUser}
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
        <SimulatorComparisonTable
          scenarios={selectedScenarios}
          columns={columns}
          onToggleMetric={toggleMetric}
          expandedRows={expandedRows}
          onToggleRowExpansion={toggleRowExpansion}
          onBack={goBackToSelection}
          onNewComparison={resetComparison}
          onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
        />
      </motion.div>
      
      <SharedSmartInsightsDrawer
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
