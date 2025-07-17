'use client';

import React from 'react';
import { InsightsProvider } from './contexts';
import { InsightsLayout } from './components';

export default function InsightsPage() {
  return (
    <InsightsProvider>
      <InsightsLayout />
    </InsightsProvider>
  );
}
