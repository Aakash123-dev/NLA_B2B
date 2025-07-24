import { useState } from 'react';

export const useFilters = () => {
  const [selectedRetailerId, setSelectedRetailerId] = useState<string>(''); // Single string
  const [selectedBrandId, setSelectedBrandId] = useState<string>('');       // Single string
  const [selectedProductId, setSelectedProductId] = useState<string>('');   // Single string

  const clearSelections = () => {
    setSelectedRetailerId('');
    setSelectedBrandId('');
    setSelectedProductId('');
  };

  return {
    selectedRetailerId,
    setSelectedRetailerId,
    selectedBrandId,
    setSelectedBrandId,
    selectedProductId,
    setSelectedProductId,
    clearSelections,
  };
};
