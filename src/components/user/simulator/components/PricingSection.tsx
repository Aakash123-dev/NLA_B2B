'use client';

import React from 'react';
import { 
  Calculator,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { SimulationProduct } from '../types';

interface PricingSectionProps {
  isExpanded: boolean;
  onToggle: () => void;
  products: SimulationProduct[];
  onPriceChange: (productId: number, newPrice: string) => void;
}

export function PricingSection({
  isExpanded,
  onToggle,
  products,
  onPriceChange
}: PricingSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <button
        onClick={onToggle}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50/40 transition-all duration-200"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-900">Product Pricing Simulation</h3>
            <p className="text-sm text-gray-500">Adjust prices and see impact on units and revenue</p>
          </div>
        </div>
        <div className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-gray-500" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="border-t border-gray-50"
          >
            <div className="p-8 bg-gradient-to-br from-gray-50/30 to-green-50/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700 w-1/4">Product</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Latest Price</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Units<br/>(Last 52 Weeks)</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Total Dollars</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Enter New Price</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">New Units</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Change in Units</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">% Change in Units</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">New Dollars</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Change in Dollars</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">% Change in Dollars</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                        <td className="py-4 px-4">
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 text-sm leading-tight">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.upc}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-medium text-gray-900">${product.currentPrice}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-gray-700">{product.totalUnits.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-gray-700">${product.totalDollars.toLocaleString()}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="$"
                            value={product.newPrice}
                            onChange={(e) => onPriceChange(product.id, e.target.value)}
                            className="w-20 text-center"
                          />
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${product.newUnits ? 'text-blue-600' : 'text-gray-400'}`}>
                            {product.newUnits ? product.newUnits.toLocaleString() : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${
                            product.changeInUnits > 0 ? 'text-green-600' : 
                            product.changeInUnits < 0 ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {product.changeInUnits ? (product.changeInUnits > 0 ? '+' : '') + product.changeInUnits.toLocaleString() : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${
                            product.percentChangeUnits > 0 ? 'text-green-600' : 
                            product.percentChangeUnits < 0 ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {product.percentChangeUnits ? (product.percentChangeUnits > 0 ? '+' : '') + product.percentChangeUnits + '%' : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${product.newDollars ? 'text-blue-600' : 'text-gray-400'}`}>
                            {product.newDollars ? '$' + product.newDollars.toLocaleString() : '-'}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${
                            product.changeInDollars > 0 ? 'text-green-600' : 
                            product.changeInDollars < 0 ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {product.changeInDollars ? 
                              (product.changeInDollars > 0 ? '+$' : '-$') + Math.abs(product.changeInDollars).toLocaleString() : 
                              '-'
                            }
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-medium ${
                            product.percentChangeDollars > 0 ? 'text-green-600' : 
                            product.percentChangeDollars < 0 ? 'text-red-600' : 'text-gray-400'
                          }`}>
                            {product.percentChangeDollars ? 
                              (product.percentChangeDollars > 0 ? '+' : '') + product.percentChangeDollars + '%' : 
                              '-'
                            }
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
