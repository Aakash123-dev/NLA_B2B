'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, Package, DollarSign, Users, TrendingDown, TrendingUp } from 'lucide-react';
import { Product, MarginInputs } from '../types/product';
import { ProductTableRow } from './ProductTableRow';
import { ProductTableHeader } from './ProductTableHeader';

interface ProductTableProps {
  products: Product[];
  expandedProducts: Set<number>;
  marginInputs: Record<number, MarginInputs>;
  onPriceChange: (productId: number, newPrice: string) => void;
  toggleProductExpansion: (productId: number) => void;
  updateMarginInput: (productId: number, field: 'costPerUnit' | 'targetMargin', value: number) => void;
}

export function ProductTable({
  products,
  expandedProducts,
  marginInputs,
  onPriceChange,
  toggleProductExpansion,
  updateMarginInput
}: ProductTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="bg-white/98 backdrop-blur-md border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border-b border-indigo-100/50 px-6 py-5">
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
            </div>
            Product Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <ProductTableHeader />
              <tbody className="divide-y divide-slate-100/60 bg-white">
                {products.map((product, index) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    index={index}
                    isExpanded={expandedProducts.has(product.id)}
                    marginInputs={marginInputs}
                    onPriceChange={onPriceChange}
                    toggleProductExpansion={toggleProductExpansion}
                    updateMarginInput={updateMarginInput}
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
