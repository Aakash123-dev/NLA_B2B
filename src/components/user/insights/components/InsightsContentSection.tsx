'use client';
import React, { useEffect, useState } from 'react';
import { useInsightsContext } from '../contexts';
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
import {
  postInsightsFilterData,
} from '@/services/filterServices/chartFilters';
import { fetchGlobalFiltersThunk } from '@/store/slices/globalFilterSlice';

export const InsightsContentSection: React.FC = () => {
  const searchParams = useSearchParams();
  const projectId = Number(searchParams.get('project'));
  const modelId = Number(searchParams.get('model'));

  const dispatch = useDispatch<AppDispatch>();

  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const insightsListProps = useInsightsListProps();
  const { state, actions } = useInsightsContext();

  const { data: chartFilterData } = useSelector(
    (state: RootState) => state.chartFilter
  );

  // Fetch chart filters initially
  useEffect(() => {
    if (projectId && modelId) {
      dispatch(fetchChartFilterData({ projectId, modelId }));
    }
  }, [dispatch, projectId, modelId]);

  const filterPayload = {
    projectId,
    modelId,
    Product: selectedProducts.length ? selectedProducts.join(',') : undefined,
    Brand: selectedBrands.length ? selectedBrands.join(',') : undefined,
    Retailer: selectedRetailers.length
      ? selectedRetailers.join(',')
      : undefined,
  };

  // Fetch all chart data based on filters
  useEffect(() => {
    dispatch(fetchChartData(filterPayload));
    dispatch(fetchChart2Data(filterPayload));
    dispatch(fetchChart3DataThunk(filterPayload));
    dispatch(fetchChart4DataThunk(filterPayload));
    dispatch(fetchChart5DataThunk(filterPayload));
    dispatch(fetchChart6DataThunk(filterPayload));
    dispatch(fetchChart7DataThunk(filterPayload));
    dispatch(fetchChart8DataThunk(filterPayload));
    dispatch(fetchChart9DataThunk(filterPayload));
  }, [
    dispatch,
    projectId,
    modelId,
    selectedRetailers,
    selectedBrands,
    selectedProducts,
  ]);

  // Clear filters when new filter data arrives
  useEffect(() => {
    setSelectedRetailers([]);
    setSelectedBrands([]);
    setSelectedProducts([]);
  }, [chartFilterData]);

  // POST filters + FETCH global filters on change
  useEffect(() => {
    const updateFilters = async () => {
      try {
        if (!modelId || !chartFilterData) return;

        let brandsToPost = selectedBrands;
        let productsToPost: string[] = [];

        // If only retailers are selected (no brands), fetch all brands/products under those retailers
        if (selectedRetailers.length > 0 && selectedBrands.length === 0) {
          const relatedBrandsSet = new Set<string>();
          const relatedProductsSet = new Set<string>();

          chartFilterData.forEach((retailer: { name: string; brands: { name: string; products: { name: string }[] }[] }) => {
            if (selectedRetailers.includes(retailer.name)) {
              retailer.brands.forEach((brand: { name: string; products: { name: string }[] }) => {
                relatedBrandsSet.add(brand.name);
                brand.products.forEach((product: { name: string }) => {
                  relatedProductsSet.add(product.name);
                });
              });
            }
          });

          brandsToPost = Array.from(relatedBrandsSet);
          productsToPost = Array.from(relatedProductsSet);
        }

        // If both retailers and brands are selected, fetch only products under those brands from the selected retailers
        else if (selectedRetailers.length > 0 && selectedBrands.length > 0) {
          const relatedProductsSet = new Set<string>();

          chartFilterData.forEach((retailer: { name: string; brands: { name: string; products: { name: string }[] }[] }) => {
            if (selectedRetailers.includes(retailer.name)) {
              retailer.brands.forEach((brand: { name: string; products: { name: string }[] }) => {
                if (selectedBrands.includes(brand.name)) {
                  brand.products.forEach((product: { name: string }) => {
                    relatedProductsSet.add(product.name);
                  });
                }
              });
            }
          });

          productsToPost = Array.from(relatedProductsSet);
        }

        // Else use explicitly selected values (like for standalone brand/product filters)
        else {
          productsToPost = selectedProducts;
        }

        await postInsightsFilterData(
          modelId,
          selectedRetailers,
          brandsToPost,
          productsToPost,
          null,
          null
        );

        dispatch(fetchGlobalFiltersThunk(modelId));
      } catch (error) {
        console.error('Error updating filters:', error);
      }
    };

    updateFilters();
  }, [
    selectedRetailers,
    selectedBrands,
    selectedProducts,
    modelId,
    chartFilterData,
    dispatch,
  ]);

  return (
    <>
      <InsightsFilters
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
