'use client'
import { useEffect } from 'react'
import { ProcessingState } from '../types'

export function useProcessingSimulation(
  processingState: ProcessingState,
  setProcessingState: (state: ProcessingState) => void
) {
  const { isFetching, isModeling, fetchProgress, modelProgress } = processingState

  // Enhanced fetch progress simulation with realistic timing
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isFetching && fetchProgress < 100) {
      // Variable speed - faster at the beginning, slower near the end
      const increment = fetchProgress < 20 ? 8 : fetchProgress < 80 ? 4 : 2
      const delay = fetchProgress < 20 ? 150 : fetchProgress < 80 ? 200 : 300
      
      timer = setTimeout(() => {
        const newProgress = Math.min(fetchProgress + increment, 100)
        setProcessingState({
          fetchProgress: newProgress,
          modelProgress,
          isFetching: newProgress < 100,
          isModeling,
          isFetchComplete: newProgress >= 100,
          isModelComplete: processingState.isModelComplete
        })
      }, delay)
    }
    return () => clearTimeout(timer)
  }, [isFetching, fetchProgress, modelProgress, isModeling, processingState.isModelComplete, setProcessingState])

  // Enhanced model progress simulation with realistic timing
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isModeling && modelProgress < 100) {
      // Variable speed - slower processing to simulate complex model calculations
      const increment = modelProgress < 10 ? 3 : modelProgress < 70 ? 2 : 1
      const delay = modelProgress < 10 ? 200 : modelProgress < 70 ? 250 : 400
      
      timer = setTimeout(() => {
        const newProgress = Math.min(modelProgress + increment, 100)
        setProcessingState({
          fetchProgress,
          modelProgress: newProgress,
          isFetching,
          isModeling: newProgress < 100,
          isFetchComplete: processingState.isFetchComplete,
          isModelComplete: newProgress >= 100
        })
      }, delay)
    }
    return () => clearTimeout(timer)
  }, [isModeling, modelProgress, fetchProgress, isFetching, processingState.isFetchComplete, setProcessingState])

  const startFetching = () => {
    setProcessingState({
      fetchProgress: 0,
      modelProgress: 0,
      isFetching: true,
      isModeling: false,
      isFetchComplete: false,
      isModelComplete: false
    })
  }

  const startModeling = () => {
    setProcessingState({
      fetchProgress: processingState.fetchProgress,
      modelProgress: 0,
      isFetching: false,
      isModeling: true,
      isFetchComplete: processingState.isFetchComplete,
      isModelComplete: false
    })
  }

  const cancelProcess = () => {
    setProcessingState({
      fetchProgress: 0,
      modelProgress: 0,
      isFetching: false,
      isModeling: false,
      isFetchComplete: false,
      isModelComplete: false,
    })
  }

  return {
    startFetching,
    startModeling,
    cancelProcess,
  }
}
