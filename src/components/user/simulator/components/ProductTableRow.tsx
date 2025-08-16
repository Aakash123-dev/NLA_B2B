'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Product, MarginInputs } from '../types/product';
import { MarginAnalysisSection } from './MarginAnalysisSection';
import {
  formatCurrency,
  formatNumber,
  calculateMarginData,
} from '../utils/productUtils';

interface ProductTableRowProps {
  product: Product;
  index: number;
  isExpanded: boolean;
  marginInputs: Record<number, MarginInputs>;
  onPriceChange: (index: number, event: any, product: any, type: string) => void;
  toggleProductExpansion: (productId: string) => void;
  updateMarginInput: (
    productId: number,
    field: 'costPerUnit' | 'targetMargin',
    value: number
  ) => void;
  type: string;
  showResults: boolean;
  newPrice: any;
  marginPriceValues: any;
  marginSimulationData: any[];
  marginChartData: any;
  isPriceSimulationLoading: boolean;
  handleMarginPriceInputChange: any;
  setSelectedProduct1: (product: any) => void;
  selectedProducts: string[];
}

export function ProductTableRow({
  product,
  index,
  isExpanded,
  marginInputs,
  type,
  showResults,
  onPriceChange,
  toggleProductExpansion,
  updateMarginInput,
  newPrice,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleMarginPriceInputChange,
  setSelectedProduct1,
  selectedProducts,
}: ProductTableRowProps) {
  console.log(product?._id, 'newrice');
  const marginData = calculateMarginData(product, marginInputs[product.id]);
  const { Price_avg_last_4_weeks, total_units_sum } = product;
  const totalVolumeSum = parseFloat(total_units_sum || '0');
  const totalVolume = totalVolumeSum * (Price_avg_last_4_weeks || 0);
  return (
    <React.Fragment key={product.id}>
      <motion.tr
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className="group cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-blue-50/30"
        onClick={() => {
          setSelectedProduct1(product);
          if (product._id) {
            toggleProductExpansion(product._id);
          }
        }}
      >
        <td className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-1 hover:bg-indigo-100"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-indigo-600" />
              ) : (
                <ChevronDown className="h-4 w-4 text-slate-600" />
              )}
            </Button>
            <div className="line-clamp-3 text-sm font-medium leading-5 text-slate-900">
              {product?.Product || product.name}
            </div>
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="inline-flex items-center rounded-lg border border-green-200/50 bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5">
            <span className="text-sm font-bold text-green-700">
              {!isNaN(Price_avg_last_4_weeks || 0)
                ? '$' + (Price_avg_last_4_weeks || 0).toFixed(2).toLocaleString()
                : '-'}
            </span>
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-800">
            {!isNaN(parseFloat(total_units_sum || '0'))
              ? Math.round(parseFloat(total_units_sum || '0')).toLocaleString()
              : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-800">
            {'$' +
              (!isNaN(totalVolume)
                ? Math.round(totalVolume).toLocaleString()
                : '-')}
          </div>
        </td>
        <td className="px-4 py-6" onClick={(e) => e.stopPropagation()}>
          <Input
            type="test"
            inputMode="decimal"
            placeholder="Enter new price:($)"
            value={
              newPrice[index]
                ? newPrice[index]
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                : ''
            }
            onChange={(event) => {
              const value = event.target.value.replace(/,/g, '');
              if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
                onPriceChange(index, event, product, type);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === '-') {
                e.preventDefault();
              }
            }}
            min={1}
            className="w-full rounded-lg border-slate-200 bg-white/80 text-center text-sm transition-all focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
          />
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700">
            {newPrice[index] && !showResults
              ? Math.round(product?.newVolume || 0).toLocaleString()
              : showResults && product?.percentageChangeInVolume
                ? Math.round(product?.newVolume || 0).toLocaleString()
                : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div
            className={`text-sm font-semibold ${product.changeInUnits || product.newPrice ? 'text-red-600' : 'text-slate-400'}`}
          >
            {newPrice[index] && !showResults
              ? Math.round(product?.changeInVolume || 0).toLocaleString()
              : showResults && product?.changeInVolume
                ? Math.round(product?.changeInVolume || 0).toLocaleString()
                : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
              product.percentChangeUnits || product.newPrice
                ? 'border border-red-200/50 bg-gradient-to-r from-red-50 to-red-100 text-red-700'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            {newPrice[index] && !showResults
              ? (product?.percentageChangeInVolume || 0).toFixed(2) + '%'
              : showResults && product?.percentageChangeInVolume
                ? (product?.percentageChangeInVolume || 0).toFixed(2) + '%'
                : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700">
            {newPrice[index] && !showResults
              ? '$' + Math.round(parseFloat(product?.newDollars || '0')).toLocaleString()
              : showResults && product?.percentageChangeInVolume
                ? '$' + Math.round(parseFloat(product?.newDollars || '0')).toLocaleString()
                : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div
            className={`text-sm font-semibold ${product.changeInDollars || product.newPrice ? 'text-emerald-600' : 'text-slate-400'}`}
          >
            {newPrice[index] && !showResults
              ? '$' + Math.round(parseFloat(product?.changeInDollars || '0')).toLocaleString()
              : showResults && product?.percentageChangeInVolume
                ? '$' + Math.round(parseFloat(product?.changeInDollars || '0')).toLocaleString()
                : '-'}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
              product.percentChangeDollars || product.newPrice
                ? 'border border-emerald-200/50 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-700'
                : 'bg-slate-50 text-slate-400'
            }`}
          >
            {newPrice[index] && !showResults
              ? (product?.percentageChangeInDollars || 0).toFixed(2) + '%'
              : showResults && product?.percentageChangeInDollars
                ? (product?.percentageChangeInDollars || 0).toFixed(2) + '%'
                : '-'}
          </div>
        </td>
      </motion.tr>

      {/* Expanded Margin Analysis Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.tr
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <td
              colSpan={11}
              className="border-b border-indigo-100/50 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 px-0 py-0"
            >
              <MarginAnalysisSection
                product={product}
                marginData={marginData}
                marginInputs={marginInputs[product.id]}
                updateMarginInput={updateMarginInput}
                toggleProductExpansion={toggleProductExpansion}
                marginPriceValues={marginPriceValues}
                marginSimulationData={marginSimulationData}
                marginChartData={marginChartData}
                isPriceSimulationLoading={isPriceSimulationLoading}
                handleMarginPriceInputChange={handleMarginPriceInputChange}
              />
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
