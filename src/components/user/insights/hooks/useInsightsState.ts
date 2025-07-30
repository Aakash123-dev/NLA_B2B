'use client';

import { useEffect, useState } from 'react';
import type {
  InsightsState,
  SummaryType,
  ChartData,
  InsightType,
} from '../types';
import {
  priceComparisonData,
  priceSlopeData,
  sensitivityData,
  merchandisingData,
  colorSchemes,
  getAnalysisSummary,
} from '../data';

export const useInsightsState = () => {
  // Tab and insight states
  const [selectedTab, setSelectedTab] = useState('all');
  const [expandedInsight, setExpandedInsight] = useState<string | null>(
    'base-1'
  );
  const [selectedInsightType, setSelectedInsightType] = useState('base-1');
  const [apiData, setApiData] = useState<InsightType[]>([]);

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('rma');
  const [selectedCategory, setSelectedCategory] = useState('ground-coffee');
  const [selectedRetailer, setSelectedRetailer] = useState('all');
  const [selectedBrand, setSelectedBrand] = useState('black-rifle');
  const [selectedPPG, setSelectedPPG] = useState('ppg-01');
  const [selectedUPC, setSelectedUPC] = useState('all');

  // New multiselect filter states
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Chart states
  const [selectedColorScheme, setSelectedColorScheme] = useState('default');
  const [showLegend, setShowLegend] = useState(true);
  const [showDataLabels, setShowDataLabels] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [viewBy, setViewBy] = useState('brand');
  const [downloadType, setDownloadType] = useState('category');

  // Modal and drawer states
  const [showPasswordShare, setShowPasswordShare] = useState(false);
  const [isTopProductsModalOpen, setIsTopProductsModalOpen] = useState(false);
  const [isSummaryDrawerOpen, setIsSummaryDrawerOpen] = useState(false);
  const [isSmartInsightsOpen, setIsSmartInsightsOpen] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [showTextBot, setShowTextBot] = useState(false);

  // Summary states
  const [summaryType, setSummaryType] = useState<SummaryType>('overall');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');

  // Notes and text bot states
  const [notes, setNotes] = useState('');
  const [textBotPrompt, setTextBotPrompt] = useState('');
  const [textBotResponse, setTextBotResponse] = useState('');
  const [isGeneratingTextBotResponse, setIsGeneratingTextBotResponse] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chartData1, setChartData1] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await fetch(
          'https://nla-api-u3zputq5qq-uc.a.run.app/insights/chart1?project_id=1149&model_id=1365'
        );
        const data = await response.json();
        setChartData1(data?.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };
    fetchChartData();
  }, []);

  console.log(chartData1, 'chartData1');
  // Helper functions
  const getChartData = (): ChartData[] => {
    switch (selectedInsightType) {
      case 'base-1':
        return priceComparisonData.map((item) => ({
          name: item.retailer,
          value: item.price,
          volume: item.volume,
          product: item.product,
        }));
      case 'base-2':
        return priceSlopeData.map((item) => ({
          name: item.size,
          value: item.price,
          product: item.product,
          pricePerOz: parseFloat(
            (item.price / parseFloat(item.size)).toFixed(2)
          ),
        }));
      case 'base-3':
        return sensitivityData.map((item) => ({
          name: `$${item.price}`,
          value: item.volume,
          profit: item.profit,
          elasticity: item.elasticity,
        }));
      case 'promo-7':
        return merchandisingData.map((item) => ({
          name: item.type,
          value: item.lift,
          revenue: item.revenue,
          cost: item.cost,
          roi: item.roi,
        }));
      default:
        return priceComparisonData.map((item) => ({
          name: item.retailer,
          value: item.price,
          volume: item.volume,
          product: item.product,
        }));
    }
  };

  // const getChartData1 = ():ChartData => {
  // 		try {
  // 			const response = await fetch(
  // 				"https://nla-api-u3zputq5qq-uc.a.run.app/insights/chart1?project_id=1149&model_id=1365"
  // 			);
  // 			const data = await response.json();
  // 			setChartData1(data?.data);
  // 			return response;
  // 		} catch (error) {
  // 			console.error("Error fetching chart data:", error);
  // 		}
  // 	};
  // };

  const getCurrentColors = () => {
    const scheme = colorSchemes.find((c) => c.id === selectedColorScheme);
    return scheme ? scheme.colors : colorSchemes[0].colors;
  };

  const generateSummary = () => {
    setGeneratedSummary(
      getAnalysisSummary(selectedInsightType.split('-')[0] as SummaryType)
    );
    setSummaryType(selectedInsightType.split('-')[0] as SummaryType);
    setIsSummaryDrawerOpen(true);
  };

  const state: InsightsState = {
    selectedTab,
    expandedInsight,
    selectedInsightType,
    searchQuery,
    selectedRegion,
    selectedCategory,
    selectedRetailer,
    selectedBrand,
    selectedPPG,
    selectedUPC,
    selectedColorScheme,
    showLegend,
    showDataLabels,
    animationEnabled,
    viewBy,
    downloadType,
    showPasswordShare,
    isTopProductsModalOpen,
    isSummaryDrawerOpen,
    isSmartInsightsOpen,
    showSummary,
    showTextBot,
    summaryType,
    isGeneratingSummary,
    generatedSummary,
    notes,
    textBotPrompt,
    textBotResponse,
    isGeneratingTextBotResponse,
    isLoading,
    setApiData,
    apiData,
    // New multiselect filter states
    selectedRetailers,
    selectedBrands,
    selectedProducts,
  };

  const actions = {
    setSelectedTab,
    setExpandedInsight,
    setSelectedInsightType,
    setSearchQuery,
    setSelectedRegion,
    setSelectedCategory,
    setSelectedRetailer,
    setSelectedBrand,
    setSelectedPPG,
    setSelectedUPC,
    setSelectedColorScheme,
    setShowLegend,
    setShowDataLabels,
    setAnimationEnabled,
    setViewBy,
    setDownloadType,
    setShowPasswordShare,
    setIsTopProductsModalOpen,
    setIsSummaryDrawerOpen,
    setIsSmartInsightsOpen,
    setShowSummary,
    setShowTextBot,
    setSummaryType,
    setIsGeneratingSummary,
    setGeneratedSummary,
    setNotes,
    setTextBotPrompt,
    setTextBotResponse,
    setIsGeneratingTextBotResponse,
    setIsLoading,
    getChartData,
    getCurrentColors,
    generateSummary,
    apiData,
    setApiData,
    // New multiselect filter actions
    setSelectedRetailers,
    setSelectedBrands,
    setSelectedProducts,
    clearAllFilters: () => {
      setSelectedRetailers([]);
      setSelectedBrands([]);
      setSelectedProducts([]);
    },
  };

  return { state, actions };
};
