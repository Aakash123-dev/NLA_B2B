'use client';

import { useState } from 'react';
import { BrandSelectionStep } from './BrandSelectionStep';
import { EventLibraryDisplay } from './EventLibraryDisplay';

export interface Brand {
  id: number;
  name: string;
  selected: boolean;
}

export interface Event {
  id: number;
  name: string;
  attributes: {
    id: number;
    name: string;
    value: string;
  }[];
}

export interface BrandWithEvents extends Brand {
  events: Event[];
}

const EventLibraryPage = () => {
  const [currentStep, setCurrentStep] = useState<'selection' | 'display'>('selection');
  const [selectedBrands, setSelectedBrands] = useState<BrandWithEvents[]>([]);

  const handleBrandSelection = (brands: BrandWithEvents[]) => {
    setSelectedBrands(brands);
    setCurrentStep('display');
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C0E22] via-[#0D0E23] to-[#0C0E22] text-white">
      <div className="container mx-auto px-4 py-8">
        {currentStep === 'selection' ? (
          <BrandSelectionStep onNext={handleBrandSelection} />
        ) : (
          <EventLibraryDisplay 
            brands={selectedBrands} 
            onBack={handleBackToSelection} 
          />
        )}
      </div>
    </div>
  );
};

export default EventLibraryPage;
