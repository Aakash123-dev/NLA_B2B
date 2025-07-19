'use client'
import { useEffect } from 'react'
import { ProcessingState } from '../types'

export function useProcessingSimulation(
  processingState: ProcessingState,
  setProcessingState: (state: ProcessingState) => void
) {
  const { isFetching, isModeling, fetchProgress, modelProgress } = processingState

  // Fetch progress simulation
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isFetching && fetchProgress < 100) {
      timer = setTimeout(() => {
        setProcessingState({
          fetchProgress: fetchProgress + 5,
          modelProgress,
          isFetching,
          isModeling,
          isFetchComplete: false,
          isModelComplete: processingState.isModelComplete
        })
      }, 100)
    } else if (fetchProgress >= 100 && isFetching) {
      setProcessingState({
        fetchProgress: 100,
        modelProgress,
        isFetching: false,
        isModeling,
        isFetchComplete: true,
        isModelComplete: processingState.isModelComplete
      })
    }
    return () => clearTimeout(timer)
  }, [isFetching, fetchProgress])

  // Model progress simulation
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isModeling && modelProgress < 100) {
      timer = setTimeout(() => {
        setProcessingState({
          fetchProgress,
          modelProgress: modelProgress + 2,
          isFetching,
          isModeling,
          isFetchComplete: processingState.isFetchComplete,
          isModelComplete: false
        })
      }, 100)
    } else if (modelProgress >= 100 && isModeling) {
      setProcessingState({
        fetchProgress,
        modelProgress: 100,
        isFetching,
        isModeling: false,
        isFetchComplete: processingState.isFetchComplete,
        isModelComplete: true
      })
    }
    return () => clearTimeout(timer)
  }, [isModeling, modelProgress])

  const startFetching = () => {
    setProcessingState({
      fetchProgress: 0,
      modelProgress,
      isFetching: true,
      isModeling,
      isFetchComplete: false,
      isModelComplete: processingState.isModelComplete
    })
  }

  const startModeling = () => {
    setProcessingState({
      fetchProgress,
      modelProgress: 0,
      isFetching,
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
