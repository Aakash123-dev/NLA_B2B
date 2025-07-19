'use client';

import React from 'react';
import { InsightsProvider } from './contexts';
import { InsightsLayout, InsightsLayoutFallback } from './components';

interface InsightsPageProps {
  projectId?: string;
  modelId?: string;
}

const InsightsPage: React.FC<InsightsPageProps> = ({ projectId, modelId }) => {
  // Always provide default values to ensure the insights page works
  const effectiveProjectId = projectId || '1009';
  const effectiveModelId = modelId || '1195';

  return (
    <InsightsProvider modelId={effectiveModelId}>
      <InsightsLayout />
    </InsightsProvider>
  );
};

export default InsightsPage;
