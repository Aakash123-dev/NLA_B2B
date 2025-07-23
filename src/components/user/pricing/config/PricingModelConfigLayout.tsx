'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  DollarSign, 
  Settings, 
  CheckCircle,
  Clock,
  Database,
  Target,
  BarChart3
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { usePricingConfiguration, useProcessingSimulation } from './hooks'
import { validateStepData } from './utils'
import { STEP_TITLES, TOTAL_STEPS } from './constants'
import { 
  SetupStep, 
  ColumnSelectionStep, 
  SummaryStep, 
  ExecutionStep, 
  ResultsStep 
} from './steps'

export function PricingModelConfigLayout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get project and model parameters from URL
  const projectId = searchParams.get('project')
  const modelId = searchParams.get('model')

  const {
    currentStep,
    formData,
    processingState,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    resetConfiguration,
    resetProcessing,
    setProcessingState,
  } = usePricingConfiguration()

  const { startFetching, startModeling, cancelProcess } = useProcessingSimulation(
    processingState,
    setProcessingState
  )

  const handleBack = () => {
    // Preserve the project and model parameters when going back
    const params = new URLSearchParams()
    if (projectId) params.set('project', projectId)
    if (modelId) params.set('model', modelId)
    
    router.push(`/user/pricing?${params.toString()}`)
  }

  const handleNext = () => {
    if (validateStepData(currentStep, formData)) {
      nextStep()
    }
  }

  const handleRun = () => {
    goToStep(4)
    resetProcessing()
    startFetching()
  }

  const handleCancel = () => {
    resetProcessing()
    goToStep(3)
  }

  const handleRestart = () => {
    resetConfiguration()
  }

  const canProceed = validateStepData(currentStep, formData)

  // Mock connected nodes and handlers for results step
  const connectedNodes: any[] = []
  const onOpenNodeTab = (nodeId: string) => {
    console.log('Opening node tab:', nodeId)
  }

  const getStepIcon = (step: number) => {
    switch (step) {
      case 1: return Database
      case 2: return Target
      case 3: return BarChart3
      case 4: return Clock
      case 5: return CheckCircle
      default: return Settings
    }
  }

  const renderStep = () => {
    const stepProps = {
      formData,
      onFormDataChange: updateFormData,
      onNext: handleNext,
      onBack: prevStep,
    }

    switch (currentStep) {
      case 1:
        return <SetupStep {...stepProps} />
      case 2:
        return <ColumnSelectionStep {...stepProps} />
      case 3:
        return <SummaryStep {...stepProps} />
      case 4:
        return (
          <ExecutionStep
            processingState={processingState}
            onRunModel={startModeling}
            onCancel={handleCancel}
          />
        )
      case 5:
        return (
          <ResultsStep
            {...stepProps}
            connectedNodes={connectedNodes}
            onOpenNodeTab={onOpenNodeTab}
            onRestart={handleRestart}
            onBackToSummary={() => goToStep(3)}
          />
        )
      default:
        return <SetupStep {...stepProps} />
    }
  }

  // Auto-advance to next step when model is complete
  React.useEffect(() => {
    if (processingState.isModelComplete && currentStep === 4) {
      goToStep(5)
    }
  }, [processingState.isModelComplete, currentStep, goToStep])

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/user/pricing"
              onClick={handleBack}
              className="flex items-center justify-center w-9 h-9 text-slate-600 hover:bg-slate-100 hover:text-slate-800 transition-colors rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-slate-800">Pricing Model Configuration</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 text-sm">
            Step {currentStep} of {TOTAL_STEPS}
          </Badge>
        </div>

        {/* Compact Progress */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2, 3, 4, 5].map((step) => {
            const StepIcon = getStepIcon(step);
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;

            return (
              <React.Fragment key={step}>
                <div className="flex items-center gap-2">
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full text-xs
                    ${isCompleted ? 'bg-emerald-500 text-white' : 
                      isCurrent ? 'bg-blue-500 text-white' : 
                      'bg-slate-200 text-slate-400'}
                  `}>
                    <StepIcon className="w-4 h-4" />
                  </div>
                  <span className={`
                    text-sm
                    ${step === currentStep ? 'text-blue-600 font-medium' : 
                      step < currentStep ? 'text-emerald-600' : 'text-slate-500'}
                  `}>
                    {STEP_TITLES[step - 1]}
                  </span>
                </div>
                {step < 5 && (
                  <div className={`flex-1 h-0 border-t-2 ${step < currentStep ? 'border-emerald-500' : 'border-slate-200'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Step Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderStep()}
        </div>
      </div>

      {/* Footer */}
      <div className="flex-shrink-0 bg-white border-t border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            {currentStep > 1 && currentStep < 5 && (
              <Button
                variant="outline"
                onClick={prevStep}
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            )}
            {currentStep === 5 && (
              <Button
                variant="outline"
                onClick={() => goToStep(3)}
                size="sm"
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Summary
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {currentStep < 3 && (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                size="sm"
                className="px-6 gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Next Step
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Button>
            )}
            {currentStep === 3 && (
              <Button
                onClick={handleRun}
                size="sm"
                className="px-6 gap-2 bg-emerald-600 hover:bg-emerald-700"
              >
                <BarChart3 className="w-4 h-4" />
                Run Analysis
              </Button>
            )}
            {currentStep === 5 && (
              <Button
                onClick={handleRestart}
                size="sm"
                className="px-6 gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Settings className="w-4 h-4" />
                Start Over
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
