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
      const data = await fetchInsights(modelId, selectedTab);
      setApiData(data);
      dispatch(setInsights(data));
    };
    fetchData();
  }, [modelId, selectedTab, setApiData]);

  const insights = useSelector((state: RootState) => state.question.insights);

  console.log(insights, 'apidata');

  const filteredInsights = useMemo(() => {
    return selectedTab === 'all'
      ? apiData
      : apiData.filter((insight) => insight.type === selectedTab);
  }, [selectedTab, apiData]);

  return {
    filteredInsights,
  };
};
