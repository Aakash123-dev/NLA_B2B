'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Play, X, Building, Package, ShoppingCart } from 'lucide-react';
import { SearchableSelect } from './SearchableSelect';
import { SearchableMultiSelect } from './SearchableMultiSelect';

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
  { id: 'alb-s', name: 'Alb S' },
  { id: 'wegmans', name: 'Wegmans' },
  { id: 'harris-teeter', name: 'Harris Teeter' },
  { id: 'food-lion', name: 'Food Lion' },
  { id: 'giant', name: 'Giant' },
  { id: 'stop-shop', name: 'Stop & Shop' },
  { id: 'acme', name: 'Acme Markets' }
];

const brands = [
  { id: 'jack-daniels', name: 'Jack Daniels' },
  { id: 'black-rifle', name: 'Black Rifle Coffee Company' },
  { id: 'starbucks', name: 'Starbucks' },
  { id: 'dunkin', name: 'Dunkin Donuts' },
  { id: 'folgers', name: 'Folgers' },
  { id: 'maxwell-house', name: 'Maxwell House' },
  { id: 'peets', name: 'Peets Coffee' },
  { id: 'gevalia', name: 'Gevalia' },
  { id: 'green-mountain', name: 'Green Mountain Coffee' },
  { id: 'caribou', name: 'Caribou Coffee' },
  { id: 'lavazza', name: 'Lavazza' },
  { id: 'nescafe', name: 'Nescafé' }
];

const products = [
  { id: 'jd-bbq-chicken', name: 'Jack Daniels BBQ Pulled Chicken Entree' },
  { id: 'jd-bbq-pork', name: 'Jack Daniels BBQ Pulled Pork Entree' },
  { id: 'jd-honey-pork', name: 'Jack Daniels Honey Liqueur BBQ Pulled Pork' },
  { id: 'jd-whiskey-ribs', name: 'Jack Daniels Whiskey Glazed Ribs' },
  { id: 'jd-bourbon-beef', name: 'Jack Daniels Bourbon Beef Brisket' },
  { id: 'jd-tennessee-wings', name: 'Jack Daniels Tennessee Hot Wings' },
  { id: 'br-coffee-dark', name: 'Black Rifle Dark Roast Coffee' },
  { id: 'br-coffee-medium', name: 'Black Rifle Medium Roast Coffee' },
  { id: 'br-coffee-light', name: 'Black Rifle Light Roast Coffee' },
  { id: 'sb-pike-place', name: 'Starbucks Pike Place Roast' },
  { id: 'sb-french-roast', name: 'Starbucks French Roast' },
  { id: 'sb-breakfast-blend', name: 'Starbucks Breakfast Blend' },
  { id: 'dd-original', name: 'Dunkin Original Blend' },
  { id: 'dd-dark-roast', name: 'Dunkin Dark Roast' },
  { id: 'folgers-classic', name: 'Folgers Classic Roast' },
  { id: 'folgers-breakfast', name: 'Folgers Breakfast Blend' },
  { id: 'maxwell-original', name: 'Maxwell House Original Roast' },
  { id: 'peets-major', name: 'Peets Major Dickasons Blend' }
];

export function SimulatorFilters({ onRunAnalysis, isRunning = false }: SimulatorFiltersProps) {
  const [selectedRetailer, setSelectedRetailer] = useState<string>('costco');
  const [selectedBrand, setSelectedBrand] = useState<string>('black-rifle');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(['jd-bbq-chicken', 'jd-bbq-pork']);

  const clearAllFilters = () => {
    setSelectedRetailer('');
    setSelectedBrand('');
    setSelectedProducts([]);
  };

  const isAnalysisReady = selectedRetailer && selectedBrand && selectedProducts.length > 0;

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
              <div className="flex items-center gap-2 ">
                <Building className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Retailer <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableSelect
                options={retailers}
                value={selectedRetailer}
                onValueChange={setSelectedRetailer}
                placeholder="Select retailer"
                searchPlaceholder="Search retailers..."
                className="w-full"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableSelect
                options={brands}
                value={selectedBrand}
                onValueChange={setSelectedBrand}
                placeholder="Select brand"
                searchPlaceholder="Search brands..."
                className="w-full"
              />
            </div>

            {/* Product Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Products <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableMultiSelect
                options={products}
                value={selectedProducts}
                onValueChange={setSelectedProducts}
                placeholder="Select products"
                searchPlaceholder="Search products..."
                className="w-full"
                maxDisplayItems={2}
              />
            </div>
          </div>

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
                  Running ...
                </>
              ) : (
                <>
                  Apply
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
