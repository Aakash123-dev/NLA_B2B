import { useState, useEffect } from 'react';
import { SimulationData, ExpandedSections, SimulationMetrics } from '../types';
import { INITIAL_SIMULATION_DATA, PRICE_ELASTICITY } from '../constants';

export function useSimulation() {
  const [simulationData, setSimulationData] = useState<SimulationData>(INITIAL_SIMULATION_DATA);
  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    summary: true,
    competitors: true,
    pricing: true
  });
  const [metrics, setMetrics] = useState<SimulationMetrics>({
    totalWeeklyDollarChange: 0,
    totalPercentWeeklyDollarChange: 0
  });

  const toggleSection = (section: keyof ExpandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handlePriceChange = (productId: number, newPrice: string) => {
    setSimulationData(prev => ({
      ...prev,
      products: prev.products.map(product => {
        if (product.id === productId) {
          const priceValue = parseFloat(newPrice) || 0;
          const priceChange = priceValue - product.currentPrice;
          const priceChangePercent = product.currentPrice > 0 ? (priceChange / product.currentPrice) * 100 : 0;
          
          // Simple elasticity simulation (price increase reduces units)
          const elasticity = PRICE_ELASTICITY;
          const unitChangePercent = elasticity * priceChangePercent;
          const newUnits = Math.max(0, product.totalUnits * (1 + unitChangePercent / 100));
          const changeInUnits = newUnits - product.totalUnits;
          const newDollars = newUnits * priceValue;
          const changeInDollars = newDollars - product.totalDollars;
          const percentChangeDollars = product.totalDollars > 0 ? (changeInDollars / product.totalDollars) * 100 : 0;

          return {
            ...product,
            newPrice: newPrice,
            newUnits: Math.round(newUnits),
            changeInUnits: Math.round(changeInUnits),
            percentChangeUnits: Math.round(unitChangePercent * 100) / 100,
            newDollars: Math.round(newDollars),
            changeInDollars: Math.round(changeInDollars),
            percentChangeDollars: Math.round(percentChangeDollars * 100) / 100
          };
        }
        return product;
      })
    }));
  };

  const runSimulation = () => {
    setIsRunning(true);
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const resetSimulation = () => {
    setSimulationData(prev => ({
      ...prev,
      products: prev.products.map(product => ({
        ...product,
        newPrice: '',
        newUnits: 0,
        changeInUnits: 0,
        percentChangeUnits: 0,
        newDollars: 0,
        changeInDollars: 0,
        percentChangeDollars: 0
      }))
    }));
    setSimulationProgress(0);
    setIsRunning(false);
  };

  // Calculate total metrics whenever products change
  useEffect(() => {
    const totalChange = simulationData.products.reduce((sum, product) => sum + product.changeInDollars, 0);
    const totalCurrent = simulationData.products.reduce((sum, product) => sum + product.totalDollars, 0);
    const percentChange = totalCurrent > 0 ? (totalChange / totalCurrent) * 100 : 0;
    
    setMetrics({
      totalWeeklyDollarChange: totalChange,
      totalPercentWeeklyDollarChange: Math.round(percentChange * 100) / 100
    });
  }, [simulationData.products]);

  return {
    simulationData,
    isRunning,
    simulationProgress,
    expandedSections,
    metrics,
    toggleSection,
    handlePriceChange,
    runSimulation,
    resetSimulation
  };
}
