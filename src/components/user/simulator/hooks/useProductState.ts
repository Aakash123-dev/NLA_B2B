import { useState } from 'react';
import { Product, MarginInputs } from '../types/product';

export const useProductExpansion = () => {
  const [expandedProducts, setExpandedProducts] = useState<string | null>(null);

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts((prevId) => (prevId === productId ? null : productId));
  };
  return {
    expandedProducts,
    toggleProductExpansion,
  };
};

export const useMarginInputs = (products: Product[]) => {
  const [marginInputs, setMarginInputs] = useState<
    Record<number, MarginInputs>
  >({});

  const updateMarginInput = (
    productId: number,
    field: 'costPerUnit' | 'targetMargin',
    value: number
  ) => {
    setMarginInputs((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const initializeMarginInputs = (productId: number) => {
    if (!marginInputs[productId]) {
      const product = products.find((p) => p.id === productId);
      setMarginInputs((prev) => ({
        ...prev,
        [productId]: {
          costPerUnit: product
            ? Math.round(product.latestPrice * 0.6 * 100) / 100
            : 0,
          targetMargin: 35,
        },
      }));
    }
  };

  return {
    marginInputs,
    updateMarginInput,
    initializeMarginInputs,
  };
};
