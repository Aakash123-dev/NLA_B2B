'use client';

import React from 'react';
import { ProductSectionProps } from '../types/product';
import { ProductSummaryCards } from './ProductSummaryCards';
import { ProductTable } from './ProductTable';
import { useProductExpansion, useMarginInputs } from '../hooks/useProductState';
import { prepareChartData } from '../utils/productUtils';

export function ProductSectionRefactored({ products, onPriceChange }: ProductSectionProps) {
  const { expandedProducts, toggleProductExpansion } = useProductExpansion();
  const { marginInputs, updateMarginInput, initializeMarginInputs } = useMarginInputs(products);

  const chartData = prepareChartData(products);

  const handleToggleProductExpansion = (productId: number) => {
    toggleProductExpansion(productId);
    // Initialize margin inputs when expanding
    if (!expandedProducts.has(productId)) {
      initializeMarginInputs(productId);
    }
  };

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
      />
    </div>
  );
}
