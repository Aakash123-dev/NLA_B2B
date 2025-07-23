'use client';

import React from 'react';
import { ProductSectionProps } from '../types/product';
import { ProductSectionRefactored } from './ProductSectionRefactored';

export function ProductSection({ products, onPriceChange }: ProductSectionProps) {
  return <ProductSectionRefactored products={products} onPriceChange={onPriceChange} />;
}
