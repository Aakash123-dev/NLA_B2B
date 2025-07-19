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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section */}
      <div className="w-full px-6 lg:px-12 py-6">
        {/* Navigation & Title */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link 
              href="/user/pricing"
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 text-slate-700 bg-white hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transform"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="h-6 w-px bg-slate-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pricing Model Configuration</h1>
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                Step {currentStep} of {TOTAL_STEPS}
              </Badge>
            </div>
          </div>
        </div>

   {/* Progress Section */}
<div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-lg font-semibold text-slate-800">Configuration Progress</h2>
    <span className="text-sm text-slate-600">{Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete</span>
  </div>

  {/* Step Icons with Labels */}
  <div className="flex justify-between items-end mb-4">
    {[1, 2, 3, 4, 5].map((step, index) => {
      const StepIcon = getStepIcon(step);
      const isCompleted = step < currentStep;
      const isCurrent = step === currentStep;

      return (
        <div key={step} className="flex-1 flex flex-col items-center relative">
          {/* Connecting Line - Left */}
          {step > 1 && (
            <div className="absolute left-0 top-5 w-1/2 h-1 bg-slate-200 -z-10">
              <div className={`h-full ${step <= currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            </div>
          )}
          {/* Connecting Line - Right */}
          {step < 5 && (
            <div className="absolute right-0 top-5 w-1/2 h-1 bg-slate-200 -z-10">
              <div className={`h-full ${step < currentStep ? 'bg-emerald-500' : 'bg-slate-200'}`} />
            </div>
          )}

          {/* Step Icon */}
          <div className={`
            flex items-center justify-center w-10 h-10 rounded-full mb-2 z-10
            ${isCompleted ? 'bg-emerald-500 text-white' : 
              isCurrent ? 'bg-blue-500 text-white' : 
              'bg-slate-200 text-slate-400'}
          `}>
            <StepIcon className="w-5 h-5" />
          </div>

          {/* Step Title */}
          <span className={`
            text-sm text-center
            ${step === currentStep ? 'text-blue-600 font-medium' : 
              step < currentStep ? 'text-emerald-600 font-medium' : 'text-slate-500'}
          `}>
            {STEP_TITLES[step - 1]}
          </span>
        </div>
      );
    })}
  </div>

  {/* Overall Progress Bar */}
  <Progress value={(currentStep / TOTAL_STEPS) * 100} className="h-2" />
</div>


        {/* Main Configuration Section */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-800">{STEP_TITLES[currentStep - 1]}</h2>
                <p className="text-slate-600">Configure your pricing model parameters</p>
              </div>
            </div>

            {/* Step Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Navigation Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              <div>
                {currentStep > 1 && currentStep < 5 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="px-6 py-2 gap-2 bg-slate-50 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                  </Button>
                )}
                {currentStep === 5 && (
                  <Button
                    variant="outline"
                    onClick={() => goToStep(3)}
                    className="px-6 py-2 gap-2 bg-slate-50 border-slate-300 text-slate-700 hover:bg-white hover:border-slate-400 transition-all duration-200"
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
                    className="px-8 py-2 gap-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-sm"
                  >
                    Next Step
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Button>
                )}
                {currentStep === 3 && (
                  <Button
                    onClick={handleRun}
                    className="px-8 py-2 gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Run Analysis
                  </Button>
                )}
                {currentStep === 5 && (
                  <Button
                    onClick={handleRestart}
                    className="px-8 py-2 gap-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 transform"
                  >
                    <Settings className="w-4 h-4" />
                    Start Over
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
