'use client'

import React, { useState, useEffect } from 'react'
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
  Zap,
  Settings,
  FileText,
  TrendingUp,
  Target,
  Gauge
} from 'lucide-react'
import { ProcessingState } from '../types'

interface ExecutionStepProps {
  processingState: ProcessingState
  onRunModel: () => void
  onCancel: () => void
}

interface ProcessingPhase {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  color: string
  bgColor: string
  duration: number
}

const processingPhases: ProcessingPhase[] = [
  {
    id: 'fetch',
    title: 'Data Retrieval',
    description: 'Connecting to databases and fetching retail data',
    icon: Database,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    duration: 3000
  },
  {
    id: 'processing',
    title: 'Data Processing',
    description: 'Cleaning and preparing data for analysis',
    icon: Settings,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    duration: 2500
  },
  {
    id: 'modeling',
    title: 'Model Execution',
    description: 'Running advanced pricing algorithms',
    icon: Brain,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    duration: 4000
  },
  {
    id: 'analysis',
    title: 'Analysis Generation',
    description: 'Computing insights and recommendations',
    icon: TrendingUp,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    duration: 2000
  },
  {
    id: 'results',
    title: 'Results Compilation',
    description: 'Preparing final reports and visualizations',
    icon: FileText,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    duration: 1500
  }
]

export function ExecutionStep({ processingState, onRunModel, onCancel }: ExecutionStepProps) {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(-1)
  const [phaseProgress, setPhaseProgress] = useState(0)
  const [processingStarted, setProcessingStarted] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [currentTask, setCurrentTask] = useState('')

  const {
    fetchProgress,
    modelProgress,
    isFetching,
    isModeling,
    isFetchComplete,
    isModelComplete
  } = processingState

  // Processing simulation with detailed phases
  useEffect(() => {
    if (!processingStarted || currentPhaseIndex >= processingPhases.length) return

    const currentPhase = processingPhases[currentPhaseIndex]
    const interval = currentPhase.duration / 100 // Progress increment interval

    const timer = setInterval(() => {
      setPhaseProgress(prev => {
        const newProgress = Math.min(prev + 1, 100)
        
        // Update overall progress
        const phaseWeight = 100 / processingPhases.length
        const totalProgress = (currentPhaseIndex * phaseWeight) + (newProgress * phaseWeight / 100)
        setOverallProgress(Math.round(totalProgress))

        // Update current task based on progress
        if (newProgress < 30) {
          setCurrentTask(`Initializing ${currentPhase.title.toLowerCase()}...`)
        } else if (newProgress < 70) {
          setCurrentTask(`Processing ${currentPhase.description.toLowerCase()}...`)
        } else if (newProgress < 100) {
          setCurrentTask(`Finalizing ${currentPhase.title.toLowerCase()}...`)
        }

        if (newProgress >= 100) {
          setCurrentTask(`${currentPhase.title} completed successfully`)
          
          // Move to next phase after a brief delay
          setTimeout(() => {
            if (currentPhaseIndex < processingPhases.length - 1) {
              setCurrentPhaseIndex(prev => prev + 1)
              setPhaseProgress(0)
            } else {
              // All phases complete
              setCurrentTask('Analysis complete - preparing results...')
              // Note: The main navigation will be handled by PricingModelConfigLayout
              // when processingState.isModelComplete becomes true
            }
          }, 500)
        }

        return newProgress
      })
    }, interval)

    return () => clearInterval(timer)
  }, [currentPhaseIndex, processingStarted])

  const handleStartAnalysis = () => {
    setProcessingStarted(true)
    setCurrentPhaseIndex(0)
    setPhaseProgress(0)
    setOverallProgress(0)
    
    // Also start the original processing simulation
    onRunModel()
  }

  const handleCancelAnalysis = () => {
    setProcessingStarted(false)
    setCurrentPhaseIndex(-1)
    setPhaseProgress(0)
    setOverallProgress(0)
    setCurrentTask('')
    onCancel()
  }

  const isProcessingComplete = overallProgress >= 100
  const isProcessingActive = processingStarted && !isProcessingComplete

  return (
    <div className="h-full max-w-full mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className={`p-3 rounded-xl shadow-sm transition-colors duration-300 ${
            isProcessingActive ? 'bg-blue-50' : isProcessingComplete ? 'bg-emerald-50' : 'bg-slate-50'
          }`}>
            <Activity className={`w-6 h-6 ${
              isProcessingActive ? 'text-blue-600' : isProcessingComplete ? 'text-emerald-600' : 'text-slate-600'
            }`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              {isProcessingComplete ? 'Analysis Complete' : 
               isProcessingActive ? 'Analysis in Progress' : 
               'Ready to Execute Analysis'}
            </h2>
            <p className="text-slate-600">
              {isProcessingComplete ? 'Your pricing model analysis has been completed successfully' :
               isProcessingActive ? 'Monitor the real-time progress of your pricing model analysis' :
               'Start the execution of your configured pricing model'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 h-full">
        {/* Left Section - Execution Pipeline */}
        <div className="col-span-8 space-y-6">
          
          {/* Overall Progress Card */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className={`p-2 rounded-lg transition-all duration-300 ${
                  isProcessingComplete ? 'bg-emerald-50' :
                  isProcessingActive ? 'bg-blue-50 animate-pulse' : 
                  'bg-slate-50'
                }`}>
                  {isProcessingComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  ) : isProcessingActive ? (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  ) : (
                    <Gauge className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                Overall Progress
                <Badge 
                  variant="secondary" 
                  className={`ml-auto text-xs ${
                    isProcessingComplete ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 
                    isProcessingActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 
                    'bg-slate-100 text-slate-600'
                  }`}
                >
                  {isProcessingComplete ? 'Complete' : 
                   isProcessingActive ? 'Processing' : 'Ready'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Progress Bar */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                  <span className="text-2xl font-bold text-slate-800">{overallProgress}%</span>
                </div>
                <Progress 
                  value={overallProgress} 
                  className="h-3 bg-slate-100"
                />
                
                {currentTask && (
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    {currentTask}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              {!processingStarted && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleStartAnalysis}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white h-12 text-base font-medium"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Analysis
                  </Button>
                  
                  <Button 
                    onClick={onCancel} 
                    variant="outline"
                    className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 h-12 px-6"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}

              {isProcessingActive && (
                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCancelAnalysis}
                    variant="outline"
                    className="bg-white border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 h-12 px-6"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel Analysis
                  </Button>
                </div>
              )}

              {isProcessingComplete && (
                <div className="flex items-center gap-2 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    Analysis completed successfully! Results are ready for review.
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Processing Phases */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                Processing Phases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processingPhases.map((phase, index) => {
                  const Icon = phase.icon
                  const isActive = index === currentPhaseIndex
                  const isComplete = index < currentPhaseIndex || (index === currentPhaseIndex && phaseProgress >= 100)
                  const isPending = index > currentPhaseIndex

                  return (
                    <div 
                      key={phase.id}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-300 ${
                        isComplete ? 'bg-emerald-50 border-emerald-200' :
                        isActive ? 'bg-blue-50 border-blue-200' :
                        'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${
                        isComplete ? 'bg-emerald-100' :
                        isActive ? 'bg-blue-100' :
                        'bg-slate-100'
                      }`}>
                        {isComplete ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isActive ? (
                          <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                        ) : (
                          <Icon className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-slate-800">{phase.title}</h4>
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              isComplete ? 'bg-emerald-100 text-emerald-700' :
                              isActive ? 'bg-blue-100 text-blue-700' :
                              'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {isComplete ? 'Complete' : isActive ? 'Processing' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-600 mb-2">{phase.description}</p>
                        
                        {isActive && (
                          <div className="space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-slate-500">Progress</span>
                              <span className="text-xs font-medium text-slate-700">{phaseProgress}%</span>
                            </div>
                            <Progress value={phaseProgress} className="h-1.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Section - Status Overview */}
        <div className="col-span-4">
          <div className="sticky top-6">
            <Card className="border border-slate-200 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-3">
                  <div className="p-2 bg-orange-50 rounded-lg">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  Execution Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Status Cards */}
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-300 ${
                    isProcessingComplete ? 'bg-emerald-50 border-emerald-200' :
                    isProcessingActive ? 'bg-blue-50 border-blue-200' :
                    'bg-slate-50 border-slate-200'
                  }`}>
                    <div className={`p-2 rounded-lg ${
                      isProcessingComplete ? 'bg-emerald-100' :
                      isProcessingActive ? 'bg-blue-100' :
                      'bg-slate-100'
                    }`}>
                      <Activity className={`w-4 h-4 ${
                        isProcessingComplete ? 'text-emerald-600' :
                        isProcessingActive ? 'text-blue-600' :
                        'text-slate-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-800">Analysis Status</div>
                      <div className={`text-xs ${
                        isProcessingComplete ? 'text-emerald-600' :
                        isProcessingActive ? 'text-blue-600' :
                        'text-slate-500'
                      }`}>
                        {isProcessingComplete ? 'Complete' :
                         isProcessingActive ? 'Processing' :
                         'Ready'}
                      </div>
                    </div>
                    <div className="text-sm font-bold text-slate-700">
                      {overallProgress}%
                    </div>
                  </div>

                  {processingStarted && currentPhaseIndex >= 0 && (
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                          <Clock className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-slate-800">Current Phase</span>
                      </div>
                      <div className="text-sm text-slate-700">
                        {processingPhases[currentPhaseIndex]?.title}
                      </div>
                      <div className="text-xs text-slate-600 mt-1">
                        Phase {currentPhaseIndex + 1} of {processingPhases.length}
                      </div>
                    </div>
                  )}
                </div>

                {/* Processing Summary */}
                <div className="p-4 bg-slate-50 rounded-lg border">
                  <h4 className="text-sm font-semibold text-slate-800 mb-3">Process Summary</h4>
                  <div className="space-y-2 text-xs text-slate-600">
                    {processingPhases.map((phase, index) => (
                      <div key={phase.id} className="flex justify-between items-center">
                        <span>{phase.title}</span>
                        <span className={
                          index < currentPhaseIndex || (index === currentPhaseIndex && phaseProgress >= 100) ? 
                          'text-emerald-600 font-medium' : 
                          index === currentPhaseIndex ? 
                          'text-blue-600 font-medium' :
                          'text-slate-500'
                        }>
                          {index < currentPhaseIndex || (index === currentPhaseIndex && phaseProgress >= 100) ? 
                           '✓ Done' : 
                           index === currentPhaseIndex ? 
                           `${phaseProgress}%` :
                           'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Time Estimation */}
                {isProcessingActive && (
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">Estimated Time</span>
                    </div>
                    <div className="text-sm text-orange-700">
                      ~{Math.max(1, Math.ceil((100 - overallProgress) / 10))} minutes remaining
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
