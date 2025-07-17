'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import { CanvasNode, Connection } from './types'

import InsightsNodeConfig from '@/components/features/design-studio/InsightsNodeConfig'
import TradeCalendarNodeConfig from '@/components/features/design-studio/TradeCalendarNodeConfig'
import TradePlanOptimizationNodeConfig from '@/components/features/design-studio/TradePlanOptimizationNodeConfig'

interface NodeTabsProps {
  openTabs: CanvasNode[]
  nodes: CanvasNode[]
  connections: Connection[]
  activeTab: string
  setActiveTab: (tabId: string) => void
  openNodeTab: (nodeId: string) => void
  handleCloseTab: (e: React.MouseEvent, nodeIdToClose: string) => void
}

export default function NodeTabs({
  openTabs,
  nodes,
  connections,
  activeTab,
  setActiveTab,
  openNodeTab,
  handleCloseTab
}: NodeTabsProps) {
  return (
    <>
      {openTabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-0 flex-grow flex flex-col min-w-0">
          <div className="flex-shrink-0">
            <Button variant="ghost" onClick={() => setActiveTab('design-studio')} className="m-4 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Design Studio
            </Button>
          </div>
          <div className="flex-grow min-h-0 overflow-y-auto p-2 pb-20">
            <div className="p-2">
              <h3 className="mb-2 text-lg font-semibold tracking-wider text-slate-800">
                {tab.name}{tab.version > 0 && ` v${tab.version}`}
              </h3>
              {/* Debug information */}
              <div className="mb-1 p-1 bg-blue-50 text-blue-600 text-xs rounded">
                Current tab type: {tab.type}
              </div>

              {tab.type === 'insights' && (
                <InsightsNodeConfig 
                  node={tab} 
                  nodes={nodes} 
                  connections={connections}
                  onOpenNodeTab={openNodeTab}
                />
              )}
              {tab.type === 'calendar' && (
                <TradeCalendarNodeConfig 
                  node={tab} 
                  nodes={nodes} 
                  connections={connections}
                  onOpenNodeTab={openNodeTab}
                />
              )}
              {tab.type === 'trade-plan-optimization' && (
                <TradePlanOptimizationNodeConfig 
                  node={tab} 
                  nodes={nodes} 
                  connections={connections}
                  onOpenNodeTab={openNodeTab}
                />
              )}
              {!['pricing', 'insights', 'calendar', 'trade-plan-optimization'].includes(tab.type) && (
                <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <p className="font-medium mb-2">Node Type: {tab.type}</p>
                  <p>Configuration component for this node type is not yet implemented.</p>
                  <p className="mt-2 text-xs">Available configurations: Pricing Model, Insights Analysis, Trade Calendar, Trade Plan Optimization</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      ))}
    </>
  )
}
