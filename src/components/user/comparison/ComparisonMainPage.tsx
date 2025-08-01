'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ComparisonHeader, ComparisonSelection, ComparisonTable, SmartInsightsDrawer } from './components'
import { useComparison } from './hooks'

export function ComparisonMainPage() {
  const router = useRouter()
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  const { 
    selectedTPOs,
    numberOfTpos, 
    columns, 
    isConfiguring,
    handleTPOSelection, 
    resetComparison, 
    toggleAttribute 
  } = useComparison()

  const handleBackToUser = () => {
    router.push('/user')
  }

  if (!isConfiguring || selectedTPOs.length === 0) {
    return (
      <div className="min-h-screen w-full bg-white">
        <ComparisonHeader 
          numberOfTpos={numberOfTpos}
          onBack={handleBackToUser}
          onNewComparison={resetComparison}
          onSmartInsightsOpen={() => setIsSmartInsightsOpen(true)}
        />
        <ComparisonSelection onTPOSelection={handleTPOSelection} />
        <SmartInsightsDrawer 
          isSmartInsightsOpen={isSmartInsightsOpen}
          setIsSmartInsightsOpen={setIsSmartInsightsOpen}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <ComparisonHeader 
        numberOfTpos={numberOfTpos}
        onBack={resetComparison}
        onNewComparison={resetComparison}
        showNewComparisonButton={true}
        onSmartInsightsOpen={() => setIsSmartInsightsOpen(true)}
      />
      <ComparisonTable 
        columns={columns}
        numberOfTpos={numberOfTpos}
        onToggleAttribute={toggleAttribute}
      />
      <SmartInsightsDrawer 
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
