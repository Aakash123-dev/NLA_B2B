'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Filter, Building, Package, ShoppingCart } from 'lucide-react';
import { SearchableSelect } from './SearchableSelect';
import { SearchableMultiSelect } from './SearchableMultiSelect';

interface SimulatorFiltersProps {
  onRunAnalysis: () => void;
  isRunning?: boolean;
  selectedRetailer: string;
  setSelectedRetailer: (value: string) => void;
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  selectedProducts: string[];
  setSelectedProducts: (value: string[]) => void;
  retailers: string[];
  brands: string[];
  products: string[];
  handleRetailerChange: any;
  handleBrandChange: any;
  handleProductsChangeForPrice: any;
}

export function SimulatorFilters({
  onRunAnalysis,
  isRunning = false,
  selectedRetailer,
  setSelectedRetailer,
  selectedBrand,
  setSelectedBrand,
  selectedProducts,
  setSelectedProducts,
  retailers,
  brands,
  products,
  handleRetailerChange,
  handleBrandChange,
  handleProductsChangeForPrice,
  handleProductChange,
}: SimulatorFiltersProps) {
  // Build options for selects from props
  const retailerOptions = useMemo(
    () =>
      retailers.map((retailer) => ({
        id: retailer,
        name: retailer,
      })),
    [retailers]
  );

  const brandOptions = useMemo(
    () =>
      brands.map((brand) => ({
        id: brand,
        name: brand,
      })),
    [brands]
  );

  const productOptions = useMemo(
    () =>
      products.map((product) => ({
        id: product,
        name: product,
      })),
    [products]
  );

  // const handleRetailerChange = (value: string) => {
  //   setSelectedRetailer(value);
  //   setSelectedBrand('');
  //   setSelectedProducts([]);
  // };

  // const handleBrandChange = (value: string) => {
  //   setSelectedBrand(value);
  //   setSelectedProducts([]);
  // };

  const clearAllFilters = () => {
    setSelectedRetailer('');
    setSelectedBrand('');
    setSelectedProducts([]);
  };

  const isAnalysisReady =
    !!selectedRetailer && !!selectedBrand && selectedProducts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="overflow-hidden rounded-2xl border-0 bg-white/80 shadow-xl backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 shadow-sm">
              <Filter className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Analysis Filters
              </h3>
              <p className="text-sm text-gray-600">
                Configure your simulation parameters
              </p>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Retailer Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Retailer <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableSelect
                options={retailerOptions}
                value={selectedRetailer}
                onValueChange={handleRetailerChange}
                placeholder="Select retailer"
                searchPlaceholder="Search retailers..."
                className="w-full"
              />
            </div>

            {/* Brand Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Brand <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableSelect
                options={brandOptions}
                value={selectedBrand}
                onValueChange={handleBrandChange}
                placeholder="Select brand"
                searchPlaceholder="Search brands..."
                className="w-full"
                disabled={!selectedRetailer}
              />
            </div>

            {/* Products Filter */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4 text-gray-500" />
                <label className="text-sm font-medium text-gray-700">
                  Products <span className="text-red-500">*</span>
                </label>
              </div>
              <SearchableMultiSelect
                options={productOptions}
                value={selectedProducts}
                onValueChange={handleProductsChangeForPrice}
                handleProductChange={handleProductChange}
                
                placeholder="Select products"
                searchPlaceholder="Search products..."
                className="w-full"
                maxDisplayItems={2}
                disabled={!selectedBrand}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-800"
              disabled={
                !selectedRetailer &&
                !selectedBrand &&
                selectedProducts.length === 0
              }
            >
              Clear All
            </Button>

            <Button
              onClick={onRunAnalysis}
              disabled={!isAnalysisReady || isRunning}
              className={`px-8 py-2.5 font-medium transition-all duration-200 ${
                isAnalysisReady && !isRunning
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'
                  : 'cursor-not-allowed bg-gray-200 text-gray-500'
              }`}
            >
              {isRunning ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                  />
                  Running ...
                </>
              ) : (
                <>Apply</>
              )}
            </Button>
          </div>

          {!isAnalysisReady && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-3">
              <p className="text-sm text-amber-700">
                Please select a retailer, brand, and at least one product to run
                the analysis.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
