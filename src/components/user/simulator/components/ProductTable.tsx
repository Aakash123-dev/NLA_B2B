'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart3,
  Package,
  DollarSign,
  Users,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import { Product, MarginInputs } from '../types/product';
import { ProductTableRow } from './ProductTableRow';
import { ProductTableHeader } from './ProductTableHeader';

interface ProductTableProps {
  products: Product[];
  expandedProducts: any;
  toggleProductExpansion: (productId: string) => void;
  marginInputs: Record<number, MarginInputs>;
  onPriceChange: any;
  updateMarginInput: (
    productId: number,
    field: 'costPerUnit' | 'targetMargin',
    value: number
  ) => void;
  newPrice: any;
  filteredSelectedPriceProducts: any[];
  type: string;
  showResults: boolean;
  selectedProducts: string[];
  marginPriceValues: any;
  marginSimulationData: any[];
  marginChartData: any;
  isPriceSimulationLoading: boolean;
  handleMarginPriceInputChange: any;
  setSelectedProduct1: (product: any) => void;
}

export function ProductTable({
  products,
  expandedProducts,
  marginInputs,
  onPriceChange,
  toggleProductExpansion,
  updateMarginInput,
  newPrice,
  filteredSelectedPriceProducts,
  type,
  showResults,
  selectedProducts,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleMarginPriceInputChange,
  setSelectedProduct1,
}: ProductTableProps) {
  console.log(expandedProducts, 'ExapadedProps');
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white/98 overflow-hidden rounded-2xl border-0 shadow-lg backdrop-blur-md">
        <CardHeader className="border-b border-indigo-100/50 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900">
            <div className="rounded-xl bg-indigo-100 p-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
            </div>
            Product Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <ProductTableHeader />
              <tbody className="divide-y divide-slate-100/60 bg-white">
                {filteredSelectedPriceProducts.map((product, index) => (
                  <ProductTableRow
                    key={product?._id}
                    product={product}
                    index={index}
                    isExpanded={expandedProducts === product?._id}
                    marginInputs={marginInputs}
                    onPriceChange={onPriceChange}
                    toggleProductExpansion={toggleProductExpansion}
                    updateMarginInput={updateMarginInput}
                    newPrice={newPrice}
                    type={type}
                    showResults={showResults}
                    selectedProducts={selectedProducts}
                    marginPriceValues={marginPriceValues}
                    marginSimulationData={marginSimulationData}
                    marginChartData={marginChartData}
                    isPriceSimulationLoading={isPriceSimulationLoading}
                    handleMarginPriceInputChange={handleMarginPriceInputChange}
                    setSelectedProduct1={setSelectedProduct1}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
