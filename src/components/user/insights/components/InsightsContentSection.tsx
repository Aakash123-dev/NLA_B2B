import React from 'react';
import { useInsightsContext } from '../contexts';
import { useInsightsListProps } from '../hooks';
import { InsightsTabs, InsightsList } from '../components';

export const InsightsContentSection: React.FC = () => {
  const { state, actions } = useInsightsContext();
  const insightsListProps = useInsightsListProps();

  return (
    <>
      <InsightsTabs 
        selectedTab={state.selectedTab}
        setSelectedTab={actions.setSelectedTab}
        setIsSmartInsightsOpen={actions.setIsSmartInsightsOpen}
      />
      <InsightsList {...insightsListProps} />
    </>
  );
};
