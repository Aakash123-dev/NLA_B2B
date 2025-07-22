'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Play, X, Building, Package, ShoppingCart } from 'lucide-react';

interface SimulatorFiltersProps {
  onRunAnalysis: () => void;
  isRunning?: boolean;
}

const retailers = [
  { id: 'walmart', name: 'Walmart' },
  { id: 'target', name: 'Target' },
  { id: 'kroger', name: 'Kroger' },
  { id: 'costco', name: 'Costco' },
  { id: 'amazon', name: 'Amazon' },
  { id: 'safeway', name: 'Safeway' },
  { id: 'publix', name: 'Publix' },
  { id: 'jewel', name: 'Jewel' },
  { id: 'alb-s', name: 'Alb S' }
];

const brands = [
  { id: 'jack-daniels', name: 'Jack Daniels' },
  { id: 'black-rifle', name: 'Black Rifle Coffee Company' },
  { id: 'starbucks', name: 'Starbucks' },
  { id: 'dunkin', name: 'Dunkin Donuts' },
  { id: 'folgers', name: 'Folgers' },
  { id: 'maxwell-house', name: 'Maxwell House' },
  { id: 'peets', name: 'Peets Coffee' }
];

const products = [
  { id: 'jd-bbq-chicken', name: 'Jack Daniels BBQ Pulled Chicken Entree' },
  { id: 'jd-bbq-pork', name: 'Jack Daniels BBQ Pulled Pork Entree' },
  { id: 'jd-honey-pork', name: 'Jack Daniels Honey Liqueur BBQ Pulled Pork' },
  { id: 'jd-whiskey-ribs', name: 'Jack Daniels Whiskey Glazed Ribs' },
  { id: 'jd-bourbon-beef', name: 'Jack Daniels Bourbon Beef Brisket' },
  { id: 'jd-tennessee-wings', name: 'Jack Daniels Tennessee Hot Wings' }
];

export function SimulatorFilters({ onRunAnalysis, isRunning = false }: SimulatorFiltersProps) {
  const [selectedRetailer, setSelectedRetailer] = useState<string>('');
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const handleProductSelection = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const removeProduct = (productId: string) => {
    setSelectedProducts(prev => prev.filter(id => id !== productId));
  };

  const clearAllFilters = () => {
    setSelectedRetailer('');
    setSelectedBrand('');
    setSelectedProducts([]);
  };

  const isAnalysisReady = selectedRetailer && selectedBrand && selectedProducts.length > 0;

  const getSelectedProductNames = () => {
    return selectedProducts.map(id => products.find(p => p.id === id)?.name || '').filter(Boolean);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-sm">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Analysis Filters</h3>
              <p className="text-sm text-gray-600">Configure your simulation parameters</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Retailer Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Retailer <span className="text-red-500">*</span>
                </label>
              </div>
              <Select value={selectedRetailer} onValueChange={setSelectedRetailer}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select retailer" />
                </SelectTrigger>
                <SelectContent>
                  {retailers.map((retailer) => (
                    <SelectItem key={retailer.id} value={retailer.id}>
                      {retailer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
              </div>
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Product Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Products <span className="text-red-500">*</span>
                </label>
              </div>
              <Select onValueChange={handleProductSelection}>
                <SelectTrigger className="h-11 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="Select products" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem 
                      key={product.id} 
                      value={product.id}
                      disabled={selectedProducts.includes(product.id)}
                    >
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selected Products Display */}
          {selectedProducts.length > 0 && (
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-3 block">
                Selected Products ({selectedProducts.length})
              </label>
              <div className="flex flex-wrap gap-2">
                {getSelectedProductNames().map((productName, index) => (
                  <Badge 
                    key={selectedProducts[index]} 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1.5 text-xs font-medium"
                  >
                    {productName}
                    <button
                      onClick={() => removeProduct(selectedProducts[index])}
                      className="ml-2 hover:text-blue-900 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Button 
              variant="outline" 
              onClick={clearAllFilters}
              className="text-gray-600 hover:text-gray-800 border-gray-200 hover:border-gray-300"
              disabled={!selectedRetailer && !selectedBrand && selectedProducts.length === 0}
            >
              Clear All
            </Button>

            <Button 
              onClick={onRunAnalysis}
              disabled={!isAnalysisReady || isRunning}
              className={`px-8 py-2.5 font-medium transition-all duration-200 ${
                isAnalysisReady && !isRunning
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full"
                  />
                  Running Analysis...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Run Analysis
                </>
              )}
            </Button>
          </div>

          {!isAnalysisReady && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                Please select a retailer, brand, and at least one product to run the analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
