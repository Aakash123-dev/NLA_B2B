'use client'

import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CanvasNode, Connection } from './types'

import PricingNodeConfig from '@/components/features/design-studio/PricingNodeConfig'
import ForecastingNodeConfig from '@/components/features/design-studio/ForecastingNodeConfig'

interface ConfigDrawerProps {
  isConfigDrawerOpen: boolean
  setIsConfigDrawerOpen: (isOpen: boolean) => void
  activeConfigNode: CanvasNode | null
  nodes: CanvasNode[]
  connections: Connection[]
  openNodeTab: (nodeId: string) => void
}

export default function ConfigDrawer({
  isConfigDrawerOpen,
  setIsConfigDrawerOpen,
  activeConfigNode,
  nodes,
  connections,
  openNodeTab
}: ConfigDrawerProps) {
  return (
    <Sheet open={isConfigDrawerOpen} onOpenChange={setIsConfigDrawerOpen}>
      <SheetContent side="right" className="w-full sm:max-w-[38rem] p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-gray-100 flex-shrink-0">
          <SheetTitle className="text-xl font-semibold text-gray-900">
            {activeConfigNode?.name} Configuration
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto">
          {activeConfigNode?.type === 'pricing' && (
            <PricingNodeConfig 
              node={activeConfigNode} 
              nodes={nodes} 
              connections={connections} 
              onOpenNodeTab={openNodeTab} 
            />
          )}
          {activeConfigNode?.type === 'forecasting' && (
            <ForecastingNodeConfig 
              node={activeConfigNode} 
              nodes={nodes} 
              connections={connections} 
              onOpenNodeTab={openNodeTab} 
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
