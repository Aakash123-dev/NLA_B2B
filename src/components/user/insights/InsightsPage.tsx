'use client';

import React from 'react';
import { InsightsProvider } from './contexts';
import { InsightsLayout, InsightsLayoutFallback } from './components';

interface InsightsPageProps {
  projectId?: string;
  modelId?: string;
}

const InsightsPage: React.FC<InsightsPageProps> = ({ projectId, modelId }) => {
  if (!projectId || !modelId) {
    return (
      <InsightsLayoutFallback 
        projectId={projectId}
        modelId={modelId}
        error="Please select a project and model to view insights."
      />
    );
  }

  return (
    <InsightsProvider modelId={modelId}>
      <InsightsLayout />
    </InsightsProvider>
  );
};

export default InsightsPage;
