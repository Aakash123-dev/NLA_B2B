'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Database, 
  Brain, 
  CheckCircle2, 
  Loader2, 
  Play, 
  X, 
  BarChart3,
  Clock,
  Activity,
  Zap
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

  const getStepStatus = (isActive: boolean, isComplete: boolean) => {
    if (isComplete) return 'complete'
    if (isActive) return 'active'
    return 'pending'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mb-6 shadow-lg">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Execution</h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">Monitor the real-time progress of your pricing model analysis</p>
      </div>

      {/* Execution Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Data Fetching */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                isFetching ? 'bg-blue-500' : isFetchComplete ? 'bg-emerald-500' : 'bg-slate-300'
              }`}>
                {isFetching ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : isFetchComplete ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Database className="w-5 h-5 text-white" />
                )}
              </div>
              Data Fetching
              <Badge 
                variant="secondary" 
                className={`ml-auto ${
                  isFetchComplete ? 'bg-emerald-100 text-emerald-800' : 
                  isFetching ? 'bg-blue-100 text-blue-800' : 
                  'bg-slate-100 text-slate-600'
                }`}
              >
                {isFetchComplete ? 'Complete' : isFetching ? 'Active' : 'Pending'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              {isFetching ? 'Retrieving data from selected sources...' : 
               isFetchComplete ? 'Data successfully retrieved and processed' : 
               'Ready to fetch data from your configured sources'}
            </p>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm font-bold text-slate-800">{fetchProgress}%</span>
              </div>
              <Progress 
                value={fetchProgress} 
                className={`h-2 transition-all duration-300 ${
                  isFetchComplete ? 'bg-emerald-100' : 'bg-slate-100'
                }`} 
              />
            </div>

            {isFetchComplete && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Data fetch completed successfully</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Model Processing */}
        <Card className={`border-slate-200 shadow-sm transition-all duration-300 ${
          isFetchComplete ? 'opacity-100' : 'opacity-50'
        }`}>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
              <div className={`p-2 rounded-lg transition-colors duration-300 ${
                isModeling ? 'bg-purple-500' : modelProgress >= 100 ? 'bg-emerald-500' : 'bg-slate-300'
              }`}>
                {isModeling ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : modelProgress >= 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <Brain className="w-5 h-5 text-white" />
                )}
              </div>
              Model Processing
              <Badge 
                variant="secondary" 
                className={`ml-auto ${
                  modelProgress >= 100 ? 'bg-emerald-100 text-emerald-800' : 
                  isModeling ? 'bg-purple-100 text-purple-800' : 
                  'bg-slate-100 text-slate-600'
                }`}
              >
                {modelProgress >= 100 ? 'Complete' : isModeling ? 'Active' : 'Pending'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-slate-600">
              {isModeling ? 'Running advanced pricing analysis algorithms...' :
               modelProgress >= 100 ? 'Model analysis completed successfully' :
               'Ready to process your pricing model'}
            </p>

            {(isModeling || modelProgress > 0) && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Progress</span>
                  <span className="text-sm font-bold text-slate-800">{modelProgress}%</span>
                </div>
                <Progress 
                  value={modelProgress} 
                  className={`h-2 transition-all duration-300 ${
                    modelProgress >= 100 ? 'bg-emerald-100' : 'bg-slate-100'
                  }`} 
                />
              </div>
            )}

            {modelProgress >= 100 && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-800">Model processing completed successfully</span>
              </div>
            )}

            {isFetchComplete && (
              <div className="flex gap-3 mt-6">
                <Button 
                  onClick={onRunModel} 
                  disabled={isModeling || modelProgress > 0}
                  className="flex-1 px-6 py-3 gap-2 rounded-lg bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isModeling ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : modelProgress >= 100 ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Complete
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Run Model
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={onCancel} 
                  variant="outline"
                  className="px-6 py-3 gap-2 bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Overview */}
      <Card className="border-blue-200 shadow-sm">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Execution Status
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <div className="text-sm text-slate-600 font-medium">Data Fetch</div>
                <div className={`text-lg font-bold ${
                  isFetchComplete ? 'text-emerald-600' : isFetching ? 'text-blue-600' : 'text-slate-500'
                }`}>
                  {isFetchComplete ? 'Complete' : isFetching ? 'Running' : 'Pending'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Brain className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="text-sm text-slate-600 font-medium">Model Processing</div>
                <div className={`text-lg font-bold ${
                  modelProgress >= 100 ? 'text-emerald-600' : isModeling ? 'text-purple-600' : 'text-slate-500'
                }`}>
                  {modelProgress >= 100 ? 'Complete' : isModeling ? 'Running' : 'Pending'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Zap className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <div className="text-sm text-slate-600 font-medium">Overall Progress</div>
                <div className="text-lg font-bold text-slate-800">
                  {Math.round((fetchProgress + modelProgress) / 2)}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
