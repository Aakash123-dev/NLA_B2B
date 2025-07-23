'use client'
import React, { useEffect, useState, useMemo } from 'react';
import { useInsightsContext } from '../contexts'; // Assuming you have a context for state
import { useInsightsListProps } from '../hooks';
import { InsightsTabs, InsightsList, InsightsFilters } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
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
import { useSearchParams } from 'next/navigation';
import { fetchChartFilterData } from '@/store/slices/chartFilterSlices';

export const InsightsContentSection: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  // You can manage the selection states here or use context
  // In this example, local state for clarity
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const insightsListProps = useInsightsListProps();

  const { state, actions } = useInsightsContext();

  const {
    data: chartFilterData,
    loading,
    error,
  } = useSelector((state: RootState) => state.chartFilter);

  const dispatch = useDispatch<AppDispatch>();
  const { hasLoaded } = useSelector((state: RootState) => state.chart);

  // Load the filter data
  useEffect(() => {
    dispatch(fetchChartFilterData({ projectId, modelId }));
  }, [dispatch, projectId, modelId]);

  // Load charts data
  useEffect(() => {
    if (!hasLoaded) {
      dispatch(fetchChartData({ projectId, modelId }));
      dispatch(fetchChart2Data({ projectId, modelId }));
      dispatch(fetchChart3DataThunk({ projectId, modelId }));
      dispatch(fetchChart4DataThunk({ projectId, modelId }));
      dispatch(fetchChart5DataThunk({ projectId, modelId }));
      dispatch(fetchChart6DataThunk({ projectId, modelId }));
      dispatch(fetchChart7DataThunk({ projectId, modelId }));
      dispatch(fetchChart8DataThunk({ projectId, modelId }));
      dispatch(fetchChart9DataThunk({ projectId, modelId }));
    }
  }, [dispatch, hasLoaded, projectId, modelId]);

  // Optional memoized lists of all options for UI or debugging (not selected by default)
  const allRetailers = useMemo(
    () => chartFilterData?.map((r) => r.name) ?? [],
    [chartFilterData]
  );

  const allBrands = useMemo(() => {
    if (!chartFilterData) return [];
    const brands = chartFilterData.flatMap((r) => r.brands.map((b) => b.name));
    return Array.from(new Set(brands)).sort();
  }, [chartFilterData]);

  const allProducts = useMemo(() => {
    if (!chartFilterData) return [];
    const products = chartFilterData.flatMap((r) =>
      r.brands.flatMap((b) => b.products.map((p) => p.name))
    );
    return Array.from(new Set(products)).sort();
  }, [chartFilterData]);

  // Optional: clear filters when chartFilterData changes (meaning data reloaded)
  useEffect(() => {
    setSelectedRetailers([]);
    setSelectedBrands([]);
    setSelectedProducts([]);
  }, [chartFilterData]);

  return (
    <>
      <InsightsFilters
        chartFilterData={chartFilterData}
        selectedRetailers={selectedRetailers}
        setSelectedRetailers={setSelectedRetailers}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedProducts={selectedProducts}
        setSelectedProducts={setSelectedProducts}
        onClearAll={() => {
          setSelectedRetailers([]);
          setSelectedBrands([]);
          setSelectedProducts([]);
        }}
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
