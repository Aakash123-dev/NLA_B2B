'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText, Upload, Plus, Building, Brain } from 'lucide-react'
import { motion } from 'framer-motion'
import { CreateEventModal } from './CreateEventModal'
import { SetupImportModal } from '../../setup/components/SetupImportModal'
import { TradePlan } from '../../types'

interface DashboardHeaderProps {
  tradePlan: TradePlan
  onOpenSmartInsights?: () => void
}

export function DashboardHeader({ tradePlan, onOpenSmartInsights }: DashboardHeaderProps) {
  const router = useRouter()
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [showImport, setShowImport] = useState(false)

  const handleEventCreated = () => {
    // Refresh the page or update state as needed
    window.location.reload()
  }

  const handleBackToDesignStudio = () => {
    // Get URL parameters and preserve them when going back
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    router.push(`/user/design-studio?${params.toString()}`);
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            
            {/* Left Section - Navigation */}
            <div className="flex items-center gap-6">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-9 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-all duration-200"
                onClick={() => router.push('/user/tpo')}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="font-medium">TPO Home</span>
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none">
                    {tradePlan.trade_plan_name}
                  </h1>
                  <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-2">
                    <Building className="w-3 h-3" />
                    {tradePlan.brand} • {tradePlan.retailer} • {tradePlan.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Smart Insights Button */}
              {onOpenSmartInsights && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-4 h-9"
                  onClick={onOpenSmartInsights}
                >
                  <Brain className="w-4 h-4" />
                  Smart Insights
                </Button>
              )}
              
              <Button
                onClick={() => router.push('/user/tpo/reports')}
                className="h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 rounded-lg shadow-lg shadow-blue-500/25 px-4"
              >
                <FileText className="w-4 h-4 mr-2" />
                Promotion Report
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-9 bg-gray-50/50 hover:bg-gray-50 border-gray-200 rounded-lg shadow-sm px-4"
                onClick={() => setShowImport(true)}
              >
                <Upload className="w-4 h-4 mr-2" />
                Import Events
              </Button>

              <Button
                size="sm"
                className="h-9 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg shadow-lg shadow-green-500/25 px-4"
                onClick={() => setShowCreateEvent(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <CreateEventModal
        isOpen={showCreateEvent}
        onClose={() => setShowCreateEvent(false)}
        onEventCreated={handleEventCreated}
        tradePlanId={tradePlan.id}
      />

      <SetupImportModal
        isOpen={showImport}
        onClose={() => setShowImport(false)}
        retailer={tradePlan.retailer}
        brand={tradePlan.brand}
      />
    </>
  )
}
