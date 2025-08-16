'use client'

import React from 'react'
import { PricingModelConfig, ProgressState } from '../types'
import { DatabaseSelectionStep } from './steps/DatabaseSelectionStep'
import { ColumnSelectionStep } from './steps/ColumnSelectionStep'
import { ConfigurationSummaryStep } from './steps/ConfigurationSummaryStep'
import { ExecutionStep } from './steps/ExecutionStep'
import { ResultsStep } from './steps/ResultsStep'

interface ConfigStepRendererProps {
  step: number
  config: PricingModelConfig
  updateConfig: (field: keyof PricingModelConfig, value: any) => void
  progress: ProgressState
  handleSelection: (list: string[], id: string, field: 'selectedRetailers' | 'selectedBrands' | 'selectedProducts' | 'selectedColumns') => void
  startModeling: () => void
  cancelProcess: () => void
}

export function ConfigStepRenderer({
  step,
  config,
  updateConfig,
  progress,
  handleSelection,
  startModeling,
  cancelProcess,
}: ConfigStepRendererProps) {
  // Create wrapper functions to handle type mismatches
  const handleFormDataChange = (data: Partial<any>) => {
    // Handle the form data change by calling updateConfig for each field
    Object.entries(data).forEach(([key, value]) => {
      updateConfig(key as keyof PricingModelConfig, value);
    });
  };

  switch (step) {
    case 1:
      return (
        <DatabaseSelectionStep
          config={config}
          updateConfig={updateConfig}
          handleSelection={handleSelection}
        />
      )
    case 2:
      return (
        <ColumnSelectionStep
          formData={config}
          onFormDataChange={handleFormDataChange}
          onNext={() => {}}
          onBack={() => {}}
        />
      )
    case 3:
      return (
        <ConfigurationSummaryStep config={config} />
      )
    case 4:
      return (
        <ExecutionStep
          processingState={progress}
          onRunModel={startModeling}
          onCancel={cancelProcess}
        />
      )
    case 5:
      return (
        <ResultsStep 
          formData={config}
          onFormDataChange={handleFormDataChange}
          onNext={() => {}}
          onBack={() => {}}
          onRestart={() => {}}
          onBackToSummary={() => {}}
        />
      )
    default:
      return null
  }
}
