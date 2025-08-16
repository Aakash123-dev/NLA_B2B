'use client';

import React from 'react';
import { ProductSectionProps } from '../types/product';
import { ProductSectionRefactored } from './ProductSectionRefactored';

export function ProductSection({
  products,
  onPriceChange,
  newPrice,
  filteredSelectedPriceProducts,
  showProductResults,
  selectedProducts,
  type,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleMarginPriceInputChange,
  setSelectedProduct1
}: ProductSectionProps) {
  return (
    <ProductSectionRefactored
      products={products}
      onPriceChange={onPriceChange}
      newPrice={newPrice}
      filteredSelectedPriceProducts={filteredSelectedPriceProducts}
      type={type}
      showResults={showProductResults}
      selectedProducts={selectedProducts}
      marginPriceValues={marginPriceValues}
      marginSimulationData={marginSimulationData}
      marginChartData={marginChartData}
      isPriceSimulationLoading={isPriceSimulationLoading}
      handleMarginPriceInputChange={handleMarginPriceInputChange}
      setSelectedProduct1={setSelectedProduct1}
    />
  );
}
