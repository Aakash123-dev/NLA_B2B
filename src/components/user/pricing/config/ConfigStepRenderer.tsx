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
          config={config}
          handleSelection={handleSelection}
        />
      )
    case 3:
      return (
        <ConfigurationSummaryStep config={config} />
      )
    case 4:
      return (
        <ExecutionStep
          progress={progress}
          startModeling={startModeling}
          cancelProcess={cancelProcess}
        />
      )
    case 5:
      return (
        <ResultsStep config={config} />
      )
    default:
      return null
  }
}
