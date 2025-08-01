'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { EventLibraryHeader, BrandSelection, EventLibraryTable } from './components'
import { useEventLibrary } from './hooks'
import { SmartInsightsDrawer } from '../comparison/components/SmartInsightsDrawer'

export function EventLibraryMainPage() {
  const router = useRouter()
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false)
  
  const { 
    selectedBrands,
    eventData, 
    isConfiguring,
    handleBrandSelection, 
    resetEventLibrary
  } = useEventLibrary()

  const handleBackToUser = () => {
    router.push('/user')
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <EventLibraryHeader 
        onBack={handleBackToUser}
        onNewLibrary={resetEventLibrary}
        onOpenSmartInsights={() => setIsSmartInsightsOpen(true)}
        showNewLibraryButton={isConfiguring && selectedBrands.length > 0}
      />
      
      <div className="p-6">
        {!isConfiguring || selectedBrands.length === 0 ? (
          <BrandSelection onBrandSelection={handleBrandSelection} />
        ) : (
          <EventLibraryTable 
            eventData={eventData}
            selectedBrands={selectedBrands}
          />
        )}
      </div>
      
      <SmartInsightsDrawer 
        isSmartInsightsOpen={isSmartInsightsOpen}
        setIsSmartInsightsOpen={setIsSmartInsightsOpen}
      />
    </div>
  )
}
