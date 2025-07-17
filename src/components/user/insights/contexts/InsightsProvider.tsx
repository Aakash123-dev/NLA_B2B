import React, { createContext, useContext, ReactNode } from 'react';
import { useInsightsState } from '../hooks/useInsightsState';
import { useInsightsFilters } from '../hooks/useInsightsFilters';
import type { InsightsState } from '../types';

interface InsightsContextType {
  state: InsightsState;
  actions: ReturnType<typeof useInsightsState>['actions'];
  filteredInsights: ReturnType<typeof useInsightsFilters>['filteredInsights'];
  chartData: ReturnType<typeof useInsightsState>['actions']['getChartData'] extends () => infer R ? R : never;
}

const InsightsContext = createContext<InsightsContextType | undefined>(undefined);

interface InsightsProviderProps {
  children: ReactNode;
}

export const InsightsProvider: React.FC<InsightsProviderProps> = ({ children }) => {
  const { state, actions } = useInsightsState();
  const { filteredInsights } = useInsightsFilters(state.selectedTab, state.apiData, state.setApiData);
  const chartData = actions.getChartData();

  const value: InsightsContextType = {
    state,
    actions,
    filteredInsights,
    chartData
  };

  return (
    <InsightsContext.Provider value={value}>
      {children}
    </InsightsContext.Provider>
  );
};

export const useInsightsContext = () => {
  const context = useContext(InsightsContext);
  if (context === undefined) {
    throw new Error('useInsightsContext must be used within an InsightsProvider');
  }
  return context;
};
