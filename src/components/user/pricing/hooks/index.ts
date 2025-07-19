import { useState, useEffect } from 'react';
import { PricingModelConfig, ProgressState } from '../types';

export const usePricingModelConfig = () => {
  const [step, setStep] = useState(1);
  
  // Configuration state
  const [config, setConfig] = useState<PricingModelConfig>({
    selectedDatabase: 'db1',
    selectedRetailers: [],
    selectedBrands: [],
    selectedProducts: [],
    marketShare: '',
    minRevenue: '',
    numWeeks: '',
    selectedColumns: [],
  });

  // Progress state
  const [progress, setProgress] = useState<ProgressState>({
    fetchProgress: 0,
    modelProgress: 0,
    isFetching: false,
    isModeling: false,
    isFetchComplete: false,
    isModelComplete: false,
  });

  const updateConfig = (field: keyof PricingModelConfig, value: any) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleSelection = (
    list: string[],
    id: string,
    field: 'selectedRetailers' | 'selectedBrands' | 'selectedProducts' | 'selectedColumns'
  ) => {
    const newList = list.includes(id) 
      ? list.filter(item => item !== id)
      : [...list, id];
    updateConfig(field, newList);
  };

  const resetProgress = () => {
    setProgress({
      fetchProgress: 0,
      modelProgress: 0,
      isFetching: false,
      isModeling: false,
      isFetchComplete: false,
      isModelComplete: false,
    });
  };

  const startFetching = () => {
    setStep(4);
    resetProgress();
    setProgress(prev => ({ ...prev, isFetching: true }));
  };

  const startModeling = () => {
    setProgress(prev => ({ ...prev, isModeling: true }));
  };

  const cancelProcess = () => {
    resetProgress();
    setStep(3);
  };

  return {
    step,
    setStep,
    config,
    updateConfig,
    progress,
    setProgress,
    handleSelection,
    resetProgress,
    startFetching,
    startModeling,
    cancelProcess,
  };
};

export const useProgressSimulation = (
  progress: ProgressState,
  setProgress: React.Dispatch<React.SetStateAction<ProgressState>>,
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  // Fetch progress simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress.isFetching && progress.fetchProgress < 100) {
      timer = setTimeout(() => 
        setProgress(prev => ({ ...prev, fetchProgress: prev.fetchProgress + 5 })), 100
      );
    } else if (progress.fetchProgress >= 100) {
      setProgress(prev => ({ ...prev, isFetching: false, isFetchComplete: true }));
    }
    return () => clearTimeout(timer);
  }, [progress.isFetching, progress.fetchProgress, setProgress]);

  // Model progress simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (progress.isModeling && progress.modelProgress < 100) {
      timer = setTimeout(() => 
        setProgress(prev => ({ ...prev, modelProgress: prev.modelProgress + 2 })), 100
      );
    } else if (progress.modelProgress >= 100) {
      setProgress(prev => ({ ...prev, isModeling: false, isModelComplete: true }));
      setStep(5);
    }
    return () => clearTimeout(timer);
  }, [progress.isModeling, progress.modelProgress, setProgress, setStep]);
};
