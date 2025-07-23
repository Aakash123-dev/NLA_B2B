'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Product, MarginInputs } from '../types/product';
import { MarginAnalysisSection } from './MarginAnalysisSection';
import { formatCurrency, formatNumber, calculateMarginData } from '../utils/productUtils';

interface ProductTableRowProps {
  product: Product;
  index: number;
  isExpanded: boolean;
  marginInputs: Record<number, MarginInputs>;
  onPriceChange: (productId: number, newPrice: string) => void;
  toggleProductExpansion: (productId: number) => void;
  updateMarginInput: (productId: number, field: 'costPerUnit' | 'targetMargin', value: number) => void;
}

export function ProductTableRow({
  product,
  index,
  isExpanded,
  marginInputs,
  onPriceChange,
  toggleProductExpansion,
  updateMarginInput
}: ProductTableRowProps) {
  const marginData = calculateMarginData(product, marginInputs[product.id]);

  return (
    <React.Fragment key={product.id}>
      <motion.tr 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
        className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-blue-50/30 transition-all duration-200 group cursor-pointer"
        onClick={() => toggleProductExpansion(product.id)}
      >
        <td className="px-6 py-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-1 h-8 w-8 rounded-full hover:bg-indigo-100"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-indigo-600" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-600" />
              )}
            </Button>
            <div className="text-sm text-slate-900 font-medium leading-5 line-clamp-3">
              {product.name}
            </div>
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-lg">
            <span className="text-sm font-bold text-green-700">
              ${product.latestPrice.toFixed(2)}
            </span>
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-800">
            {formatNumber(product.totalUnits)}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-800">
            {formatCurrency(product.totalDollars)}
          </div>
        </td>
        <td className="px-4 py-6" onClick={(e) => e.stopPropagation()}>
          <Input
            type="number"
            step="0.01"
            placeholder="$0.00"
            value={product.newPrice}
            onChange={(e) => onPriceChange(product.id, e.target.value)}
            className="w-full text-center text-sm border-slate-200 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/80"
          />
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700">
            {product.newUnits || (product.newPrice ? `${Math.round(product.totalUnits * 0.92).toLocaleString()}` : '—')}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className={`text-sm font-semibold ${product.changeInUnits || product.newPrice ? 'text-red-600' : 'text-slate-400'}`}>
            {product.changeInUnits || (product.newPrice ? `-${Math.round(product.totalUnits * 0.08).toLocaleString()}` : '—')}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
            product.percentChangeUnits || product.newPrice 
              ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200/50' 
              : 'bg-slate-50 text-slate-400'
          }`}>
            {product.percentChangeUnits || (product.newPrice ? '-8.2%' : '—')}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className="text-sm font-semibold text-slate-700">
            {product.newDollars || (product.newPrice ? `$${Math.round(product.totalUnits * 0.92 * parseFloat(product.newPrice)).toLocaleString()}` : '—')}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className={`text-sm font-semibold ${product.changeInDollars || product.newPrice ? 'text-emerald-600' : 'text-slate-400'}`}>
            {product.changeInDollars || (product.newPrice ? `+$${Math.round((product.totalUnits * 0.92 * parseFloat(product.newPrice)) - product.totalDollars).toLocaleString()}` : '—')}
          </div>
        </td>
        <td className="px-4 py-6 text-center">
          <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
            product.percentChangeDollars || product.newPrice 
              ? 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border border-emerald-200/50' 
              : 'bg-slate-50 text-slate-400'
          }`}>
            {product.percentChangeDollars || (product.newPrice ? '+12.8%' : '—')}
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
            <td colSpan={11} className="px-0 py-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-b border-indigo-100/50">
              <MarginAnalysisSection
                product={product}
                marginData={marginData}
                marginInputs={marginInputs[product.id]}
                updateMarginInput={updateMarginInput}
                toggleProductExpansion={toggleProductExpansion}
              />
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
}
