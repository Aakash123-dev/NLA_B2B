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
  type
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
    />
  );
}
