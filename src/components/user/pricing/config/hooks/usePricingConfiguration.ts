
'use client'

import { useState, useEffect } from 'react'
import { ConfigFormData, ProcessingState } from '../types'

const initialFormData: ConfigFormData = {
  selectedDatabase: '',
  selectedRetailers: [],
  selectedBrands: [],
  selectedProducts: [],
  marketShare: '',
  minRevenue: '',
  numWeeks: '',
  selectedColumns: [],
}

const initialProcessingState: ProcessingState = {
  fetchProgress: 0,
  modelProgress: 0,
  isFetching: false,
  isModeling: false,
  isFetchComplete: false,
  isModelComplete: false,
}

export function usePricingConfiguration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ConfigFormData>(initialFormData)
  const [processingState, setProcessingState] = useState<ProcessingState>(initialProcessingState)

  const updateFormData = (updates: Partial<ConfigFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 5))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const goToStep = (step: number) => {
    setCurrentStep(Math.max(1, Math.min(step, 5)))
  }

  const resetConfiguration = () => {
    setCurrentStep(1)
    setFormData(initialFormData)
    setProcessingState(initialProcessingState)
  }

  const resetProcessing = () => {
    setProcessingState(initialProcessingState)
  }

  return {
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
  }
}
