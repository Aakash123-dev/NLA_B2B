import React from 'react';
import { useInsightsContext } from '../contexts';
import { InsightsHeader, MetricsWidgets } from '../components';
import { widgetData } from '../data';

export const InsightsHeaderSection: React.FC = () => {
  const { state, actions } = useInsightsContext();

  return (
    <>
      <InsightsHeader onShowPasswordShare={() => actions.setShowPasswordShare(true)} />
      <MetricsWidgets 
        widgetData={widgetData}
        isTopProductsModalOpen={state.isTopProductsModalOpen}
        setIsTopProductsModalOpen={actions.setIsTopProductsModalOpen}
      />
    </>
  );
};
