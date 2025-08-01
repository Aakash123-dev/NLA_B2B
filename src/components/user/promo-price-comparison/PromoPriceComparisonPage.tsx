'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ComparisonHeader, ScenarioSelection, ComparisonTable } from './components'
import { usePromoPriceComparison } from './hooks'

export function PromoPriceComparisonPage() {
  const router = useRouter()
  const { 
    selectedScenarios,
    numberOfScenarios, 
    columns, 
    isConfiguring,
    scenarioTypes,
    expandedRows,
    handleScenarioSelection, 
    resetComparison, 
    toggleMetric,
    toggleRowExpansion
  } = usePromoPriceComparison()

  const handleBackToUser = () => {
    router.push('/user')
  }

  if (!isConfiguring || selectedScenarios.length === 0) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <ComparisonHeader 
          numberOfScenarios={numberOfScenarios}
          onBack={handleBackToUser}
          onNewComparison={resetComparison}
          scenarioTypes={scenarioTypes}
        />
        <ScenarioSelection onScenarioSelection={handleScenarioSelection} />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <ComparisonHeader 
        numberOfScenarios={numberOfScenarios}
        onBack={resetComparison}
        onNewComparison={resetComparison}
        showNewComparisonButton={true}
        scenarioTypes={scenarioTypes}
      />
      <ComparisonTable 
        columns={columns}
        scenarios={selectedScenarios}
        numberOfScenarios={numberOfScenarios || 0}
        onToggleMetric={toggleMetric}
        expandedRows={expandedRows}
        onToggleRowExpansion={toggleRowExpansion}
      />
    </div>
  )
}
