'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useInsightsState } from '../hooks/useInsightsState';
import { useInsightsFilters } from '../hooks/useInsightsFilters';
import type { InsightsState, ChartData } from '../types';

interface InsightsContextType {
  state: InsightsState;
  actions: any;
  filteredInsights: any[];
  chartData: ChartData[];
  modelId?: string;
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

export const useInsightsContext = () => {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsightsContext must be used within an InsightsProvider');
  }
  return context;
};

interface InsightsProviderProps {
  children: ReactNode;
  modelId?: string;
}

export const InsightsProvider: React.FC<InsightsProviderProps> = ({ children, modelId }) => {
  const { state, actions } = useInsightsState();
  const { filteredInsights } = useInsightsFilters(state.selectedTab, state.apiData, actions.setApiData, modelId);
  const chartData = actions.getChartData();

  const contextValue: InsightsContextType = {
    state,
    actions,
    filteredInsights,
    chartData,
    modelId,
  };

  return (
    <InsightsContext.Provider value={contextValue}>
      {children}
    </InsightsContext.Provider>
  );
};
