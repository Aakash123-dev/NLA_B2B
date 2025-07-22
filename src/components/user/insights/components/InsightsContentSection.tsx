'use client';
import React, { useEffect } from 'react';
import { useInsightsContext } from '../contexts';
import { useInsightsListProps } from '../hooks';
import { InsightsTabs, InsightsList, InsightsFilters } from '../components';
import { useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useSelector } from 'react-redux';
import {
  fetchChart2Data,
  fetchChart3DataThunk,
  fetchChart4DataThunk,
  fetchChart5DataThunk,
  fetchChart6DataThunk,
  fetchChart7DataThunk,
  fetchChart8DataThunk,
  fetchChart9DataThunk,
  fetchChartData,
} from '@/store/slices/chartsSlices';

export const InsightsContentSection: React.FC = () => {
  const { state, actions } = useInsightsContext();
  const insightsListProps = useInsightsListProps();

  const dispatch = useDispatch<AppDispatch>();
  const { hasLoaded } = useSelector((state: RootState) => state.chart);

  // ✅ Dispatch only once when not already loaded
  useEffect(() => {
    if (!hasLoaded) {
      dispatch(fetchChartData({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart2Data({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart3DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart4DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart5DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart6DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart7DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart8DataThunk({ projectId: 762, modelId: 916 }));
      dispatch(fetchChart9DataThunk({ projectId: 762, modelId: 916 }));
    }
  }, [dispatch, hasLoaded]);

  return (
    <>
      <InsightsFilters
        selectedRetailers={state.selectedRetailers}
        setSelectedRetailers={actions.setSelectedRetailers}
        selectedBrands={state.selectedBrands}
        setSelectedBrands={actions.setSelectedBrands}
        selectedProducts={state.selectedProducts}
        setSelectedProducts={actions.setSelectedProducts}
        onClearAll={actions.clearAllFilters}
      />
      <InsightsTabs
        selectedTab={state.selectedTab}
        setSelectedTab={actions.setSelectedTab}
        setIsSmartInsightsOpen={actions.setIsSmartInsightsOpen}
      />
      <InsightsList {...insightsListProps} />
    </>
  );
};
