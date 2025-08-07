'use client';

import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import type { InsightType } from '../types';
import { fetchInsights } from '@/services/questionServices/questionServices';
import { setInsights } from '@/store/slices/questionSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export const useInsightsFilters = (
  selectedTab: string,
  apiData: InsightType[],
  setApiData: (data: InsightType[]) => void,
  modelIdProp?: string
) => {
  const dispatch = useDispatch();
  let modelIdFromUrl: string | null = null;

  try {
    const searchParams = useSearchParams();
    modelIdFromUrl = searchParams.get('model');
  } catch (error) {
    console.log('useSearchParams not available, using prop modelId');
  }

  const modelId = modelIdProp || modelIdFromUrl;

  useEffect(() => {
    if (!modelId) return;

    const fetchData = async () => {
      try {
        console.log(`Fetching insights for tab: ${selectedTab}, modelId: ${modelId}`);
        const data = await fetchInsights(modelId, selectedTab);
        console.log(`Fetched ${data.length} insights for ${selectedTab}`, data);
        setApiData(data);
        dispatch(setInsights(data));
      } catch (error) {
        console.error(`Error fetching insights for ${selectedTab}:`, error);
        setApiData([]);
        dispatch(setInsights([]));
      }
    };
    
    fetchData();
  }, [modelId, selectedTab, setApiData, dispatch]);

  const insights = useSelector((state: RootState) => state.question.insights);

  const filteredInsights = useMemo(() => {
    if (selectedTab === 'all') {
      return apiData;
    }
    
    // Filter by the selected tab type
    const filtered = apiData.filter((insight) => {
      const insightType = insight.category || insight.type;
      return insightType === selectedTab;
    });
    
    console.log(`Filtered ${filtered.length} insights for ${selectedTab}`, filtered);
    return filtered;
  }, [selectedTab, apiData]);

  return {
    filteredInsights,
  };
};
