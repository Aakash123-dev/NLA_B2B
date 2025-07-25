'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ComparisonHeader, ComparisonSelection, ComparisonTable } from './components'
import { useComparison } from './hooks'

export function ComparisonMainPage() {
  const router = useRouter()
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
        />
        <ComparisonSelection onTPOSelection={handleTPOSelection} />
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
      />
      <ComparisonTable 
        columns={columns}
        numberOfTpos={numberOfTpos}
        onToggleAttribute={toggleAttribute}
      />
    </div>
  )
}
