'use client';

import React from 'react';
import { ProductSectionProps } from '../types/product';
import { ProductSummaryCards } from './ProductSummaryCards';
import { ProductTable } from './ProductTable';
import { useProductExpansion, useMarginInputs } from '../hooks/useProductState';
import { prepareChartData } from '../utils/productUtils';

export function ProductSectionRefactored({
  products,
  onPriceChange,
  newPrice,
  filteredSelectedPriceProducts,
  type,
  showResults,
  showProductResults,
  selectedProducts,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleMarginPriceInputChange,
  setSelectedProduct1,
}: ProductSectionProps) {
  const { expandedProducts, toggleProductExpansion } = useProductExpansion();
  const { marginInputs, updateMarginInput, initializeMarginInputs } =
    useMarginInputs(products);

  console.log(products, 'allProductsWehave');

  const chartData = prepareChartData(products);

  const handleToggleProductExpansion = (productId: string) => {
    const shouldExpand = expandedProducts !== productId;
    toggleProductExpansion(productId);

    if (shouldExpand) {
      // Convert string productId to number for initializeMarginInputs
      const numericProductId = parseInt(productId, 10);
      if (!isNaN(numericProductId)) {
        initializeMarginInputs(numericProductId);
      }
    }
  };

  // Use showResults if available, otherwise fall back to showProductResults
  const finalShowResults = showResults !== undefined ? showResults : showProductResults;

  return (
    <div className="space-y-8">
      <ProductSummaryCards chartData={chartData} />
      <ProductTable
        products={products}
        expandedProducts={expandedProducts}
        marginInputs={marginInputs}
        onPriceChange={onPriceChange}
        toggleProductExpansion={handleToggleProductExpansion}
        updateMarginInput={updateMarginInput}
        newPrice={newPrice}
        filteredSelectedPriceProducts={filteredSelectedPriceProducts || []}
        type={type}
        showResults={finalShowResults || false}
        selectedProducts={selectedProducts}
        marginPriceValues={marginPriceValues}
        marginSimulationData={marginSimulationData || []}
        marginChartData={marginChartData}
        isPriceSimulationLoading={isPriceSimulationLoading || false}
        handleMarginPriceInputChange={handleMarginPriceInputChange}
        setSelectedProduct1={setSelectedProduct1}
      />
    </div>
  );
}
