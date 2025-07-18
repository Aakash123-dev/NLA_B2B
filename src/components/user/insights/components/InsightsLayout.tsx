import React from 'react';
import { 
  InsightsHeaderSection,
  InsightsContentSection,
  InsightsModalsSection
} from '../components';

export const InsightsLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <InsightsHeaderSection />
      <InsightsContentSection />
      <InsightsModalsSection />
    </div>
  );
};
