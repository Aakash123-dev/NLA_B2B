'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Database, 
  Brain, 
  CheckCircle2, 
  Loader2, 
  Play, 
  X, 
  BarChart3,
  Clock
} from 'lucide-react'
import { ProcessingState } from '../types'

interface ExecutionStepProps {
  processingState: ProcessingState
  onRunModel: () => void
  onCancel: () => void
}

export function ExecutionStep({ processingState, onRunModel, onCancel }: ExecutionStepProps) {
  const {
    fetchProgress,
    modelProgress,
    isFetching,
    isModeling,
    isFetchComplete,
  } = processingState

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-orange-100 rounded-lg">
          <Clock className="w-5 h-5 text-orange-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Model Execution</h3>
          <p className="text-slate-600 text-sm">Monitor the progress of your pricing model analysis</p>
        </div>
      </div>

      {/* Data Fetching Section */}
      <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
        <div className="flex items-center gap-3 mb-4">
          <div className={`p-2 rounded-lg ${isFetching ? 'bg-blue-500' : isFetchComplete ? 'bg-emerald-500' : 'bg-slate-300'}`}>
            {isFetching ? (
              <Loader2 className="w-5 h-5 text-white animate-spin" />
            ) : isFetchComplete ? (
              <CheckCircle2 className="w-5 h-5 text-white" />
            ) : (
              <Database className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Data Fetching</h4>
            <p className="text-sm text-slate-600">
              {isFetching ? 'Retrieving data from selected sources...' : 
               isFetchComplete ? 'Data successfully retrieved' : 
               'Ready to fetch data from your configured sources'}
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-700">Progress</span>
            <span className="text-sm text-slate-600">{fetchProgress}%</span>
          </div>
          <Progress value={fetchProgress} className="h-3" />
        </div>
      </div>

      {/* Model Processing Section */}
      {isFetchComplete && (
        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-lg ${isModeling ? 'bg-purple-500' : modelProgress >= 100 ? 'bg-emerald-500' : 'bg-slate-300'}`}>
              {isModeling ? (
                <Loader2 className="w-5 h-5 text-white animate-spin" />
              ) : modelProgress >= 100 ? (
                <CheckCircle2 className="w-5 h-5 text-white" />
              ) : (
                <Brain className="w-5 h-5 text-white" />
              )}
            </div>
            <div>
              <h4 className="font-semibold text-slate-800">Model Processing</h4>
              <p className="text-sm text-slate-600">
                {isModeling ? 'Running pricing analysis algorithms...' :
                 modelProgress >= 100 ? 'Model analysis completed successfully' :
                 'Ready to process your pricing model'}
              </p>
            </div>
          </div>

          {(isModeling || modelProgress > 0) && (
            <div className="space-y-2 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm text-slate-600">{modelProgress}%</span>
              </div>
              <Progress value={modelProgress} className="h-3" />
            </div>
          )}

          <div className="flex gap-3">
            <Button 
              onClick={onRunModel} 
              disabled={isModeling || modelProgress > 0}
              className="flex-1 px-6 py-3 gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isModeling ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing Model...
                </>
              ) : modelProgress >= 100 ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Model Complete
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Run Pricing Model
                </>
              )}
            </Button>
            
            <Button 
              onClick={onCancel} 
              variant="outline"
              className="px-6 py-3 gap-2 bg-slate-50 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-200"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Status Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h4 className="font-medium text-blue-800">Execution Status</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700">Data Fetch:</span>
            <span className={`font-medium ${isFetchComplete ? 'text-emerald-600' : isFetching ? 'text-blue-600' : 'text-slate-500'}`}>
              {isFetchComplete ? 'Complete' : isFetching ? 'In Progress' : 'Pending'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700">Model Processing:</span>
            <span className={`font-medium ${modelProgress >= 100 ? 'text-emerald-600' : isModeling ? 'text-purple-600' : 'text-slate-500'}`}>
              {modelProgress >= 100 ? 'Complete' : isModeling ? 'In Progress' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
