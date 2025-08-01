'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Plus, Library, Brain } from 'lucide-react'

interface EventLibraryHeaderProps {
  onBack: () => void
  onNewLibrary: () => void
  showNewLibraryButton?: boolean
  onOpenSmartInsights?: () => void
}

export function EventLibraryHeader({ 
  onBack, 
  onNewLibrary, 
  showNewLibraryButton = false,
  onOpenSmartInsights 
}: EventLibraryHeaderProps) {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-40 shadow-sm">
      <div className="max-w-full px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 rounded-full"
              onClick={onBack}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-sm">
                <Library className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Event Library
                </h1>
                <p className="text-sm text-gray-500">
                  Save, manage and organize events from Trade Calendar
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {onOpenSmartInsights && (
              <Button
                variant="outline"
                size="sm"
                className="gap-2 bg-gradient-to-r from-indigo-50 to-violet-50 border-indigo-200 text-indigo-700 hover:from-indigo-100 hover:to-violet-100 hover:border-indigo-300 hover:text-indigo-800 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform rounded-full px-5"
                onClick={onOpenSmartInsights}
              >
                <Brain className="w-4 h-4" />
                Smart Insights
              </Button>
            )}
            {showNewLibraryButton && (
              <Button 
                variant="outline"
                size="sm"
                onClick={onNewLibrary}
                className="h-8 px-4 text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 rounded-full"
              >
                <Plus className="w-4 h-4 mr-1" />
                New
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
