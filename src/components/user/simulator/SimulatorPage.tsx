'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { 
  SimulatorPageHeader,
  SimulatorFilters,
  ProductSection,
  RelevantCompetitorsSection
} from './components';

export default function SimulatorPage() {
  const [simulationData, setSimulationData] = useState({
    testDate: "09/04/2025 Test",
    company: "ALBSCO Jewel Div TA",
    selectedBrand: "JACK DANIELS",
    products: [
      {
        id: 1,
        name: "Completely Fresh Foods Jack Daniels Old No 7 Brand Bbqck Pulled Chicken Entree 160Z 089533400108-JACK DANIELS",
        latestPrice: 9.45,
        totalUnits: 19919,
        totalDollars: 188258,
        newPrice: "9.99",
        newUnits: "18,325",
        changeInUnits: "-1,594",
        percentChangeUnits: "-8.0%",
        newDollars: "$183,142",
        changeInDollars: "-$5,116",
        percentChangeDollars: "-2.7%"
      },
      {
        id: 2,
        name: "Completely Fresh Foods Jack Daniels Honey Liqueur Bbq Pulled Pork Entree 160Z 081166302903-JACK DANIELS",
        latestPrice: 9.47,
        totalUnits: 18031,
        totalDollars: 170742,
        newPrice: "10.25",
        newUnits: "16,589",
        changeInUnits: "-1,442",
        percentChangeUnits: "-8.0%",
        newDollars: "$170,037",
        changeInDollars: "-$705",
        percentChangeDollars: "-0.4%"
      },
      {
        id: 3,
        name: "Completely Fresh Foods Jack Daniels Old No 7 Brand Bbqck Pulled Pork Entree 160Z 089533400106-JACK DANIELS",
        latestPrice: 9.48,
        totalUnits: 37374,
        totalDollars: 354371,
        newPrice: "9.75",
        newUnits: "34,384",
        changeInUnits: "-2,990",
        percentChangeUnits: "-8.0%",
        newDollars: "$335,244",
        changeInDollars: "-$19,127",
        percentChangeDollars: "-5.4%"
      },
      {
        id: 4,
        name: "Completely Fresh Foods Jack Daniels Whiskey Glazed Ribs 160Z 089533400145-JACK DANIELS",
        latestPrice: 10.29,
        totalUnits: 15642,
        totalDollars: 160958,
        newPrice: "10.99",
        newUnits: "14,391",
        changeInUnits: "-1,251",
        percentChangeUnits: "-8.0%",
        newDollars: "$158,157",
        changeInDollars: "-$2,801",
        percentChangeDollars: "-1.7%"
      },
      {
        id: 5,
        name: "Completely Fresh Foods Jack Daniels Tennessee Hot Wings 140Z 089533400289-JACK DANIELS",
        latestPrice: 8.99,
        totalUnits: 22156,
        totalDollars: 199182,
        newPrice: "9.49",
        newUnits: "20,383",
        changeInUnits: "-1,773",
        percentChangeUnits: "-8.0%",
        newDollars: "$193,434",
        changeInDollars: "-$5,748",
        percentChangeDollars: "-2.9%"
      }
    ],
    selectedProducts: ["Completely Fresh Foods Jack Daniels Honey Liqueur B...", "Completely Fresh Foods Jack Daniels Old No 7 Brand B...", "Completely Fresh Foods Jack Daniels Old No 7 Brand B..."]
  });

  const [isRunning, setIsRunning] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [hasRunAnalysis, setHasRunAnalysis] = useState(false);

  const handleBackToHome = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project');
    const modelId = urlParams.get('model');
    
    const params = new URLSearchParams();
    if (projectId) params.set('project', projectId);
    if (modelId) params.set('model', modelId);
    
    window.location.href = `/user/dashboard?${params.toString()}`;
  };

  const handlePriceChange = (productId: number, newPrice: string) => {
    setSimulationData(prev => ({
      ...prev,
      products: prev.products.map(product => 
        product.id === productId 
          ? { ...product, newPrice }
          : product
      )
    }));
  };

  const runSimulation = () => {
    setIsRunning(true);
    setSimulationProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunning(false);
          setHasRunAnalysis(true);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      {/* Header */}
      <SimulatorPageHeader
        testDate={simulationData.testDate}
        company={simulationData.company}
        selectedBrand={simulationData.selectedBrand}
        onBackToHome={handleBackToHome}
      />

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-8 py-8">
        <div className="space-y-8">

          {/* Filters Section */}
          <SimulatorFilters
            onRunAnalysis={runSimulation}
            isRunning={isRunning}
          />

          {/* Analysis Results - Only show after running analysis */}
          {hasRunAnalysis && (
            <>
              {/* Product Analysis Section */}
              <ProductSection
                products={simulationData.products}
                onPriceChange={handlePriceChange}
              />

              {/* Relevant Competitors Section */}
              <RelevantCompetitorsSection />
            </>
          )}

          {/* Loading State */}
          {isRunning && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Running Analysis</h3>
              <p className="text-gray-600 mb-4">Processing your simulation data...</p>
              <div className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
                  initial={{ width: 0 }}
                  animate={{ width: `${simulationProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-gray-500 mt-2">{simulationProgress}% complete</p>
            </div>
          )}

          {/* Empty State */}
          {!hasRunAnalysis && !isRunning && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Analyze</h3>
              <p className="text-gray-600">Configure your filters above and run the analysis to see results.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
