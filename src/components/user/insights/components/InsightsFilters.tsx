'use client';

import React, { useState, useMemo } from 'react';
import { Check, ChevronDown, Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// Dummy data for filters when no API data is available
const DUMMY_RETAILERS = [
  'Walmart', 'Target', 'Kroger', 'Safeway', 'Whole Foods', 
  'Costco', 'Publix', 'Meijer', 'H-E-B', 'King Soopers'
];

const DUMMY_BRANDS = [
  'Starbucks', 'Dunkin', 'Folgers', 'Maxwell House', 'Peet\'s Coffee',
  'Caribou Coffee', 'Green Mountain', 'Lavazza', 'Illy', 'Eight O\'Clock'
];

const DUMMY_PRODUCTS = [
  'Pike Place Roast K-Cups', 'Original Blend Ground Coffee', 'Dark Roast Whole Bean',
  'French Roast K-Cups', 'Medium Roast Ground Coffee', 'Espresso Blend',
  'Breakfast Blend K-Cups', 'Decaf Colombian', 'Cold Brew Concentrate',
  'Vanilla Flavored Coffee', 'Hazelnut Ground Coffee', 'Italian Roast'
];

interface InsightsFiltersProps {
  selectedRetailers: string[];
  setSelectedRetailers: (retailers: string[]) => void;
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedProducts: string[];
  setSelectedProducts: (products: string[]) => void;
  onClearAll: () => void;
}

export const InsightsFilters: React.FC<InsightsFiltersProps> = ({
  selectedRetailers,
  setSelectedRetailers,
  selectedBrands,
  setSelectedBrands,
  selectedProducts,
  setSelectedProducts,
  onClearAll,
}) => {
  const [openRetailer, setOpenRetailer] = useState(false);
  const [openBrand, setOpenBrand] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);

  // Get data from Redux store to extract unique values
  const { data: chartItems } = useSelector((state: RootState) => state.chart);

  // Extract unique values from chart data or use dummy data
  const { retailers, brands, products } = useMemo(() => {
    if (!chartItems || chartItems.length === 0) {
      return { 
        retailers: DUMMY_RETAILERS, 
        brands: DUMMY_BRANDS, 
        products: DUMMY_PRODUCTS 
      };
    }

    const retailerSet = new Set<string>();
    const brandSet = new Set<string>();
    const productSet = new Set<string>();

    chartItems.forEach((item: any) => {
      if (item.Retailer) retailerSet.add(item.Retailer);
      if (item.Brand) brandSet.add(item.Brand);
      if (item.Product) productSet.add(item.Product);
    });

    return {
      retailers: Array.from(retailerSet).sort(),
      brands: Array.from(brandSet).sort(),
      products: Array.from(productSet).sort(),
    };
  }, [chartItems]);

  const handleRetailerSelect = (retailer: string) => {
    if (selectedRetailers.includes(retailer)) {
      setSelectedRetailers(selectedRetailers.filter(r => r !== retailer));
    } else {
      setSelectedRetailers([...selectedRetailers, retailer]);
    }
  };

  const handleBrandSelect = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handleProductSelect = (product: string) => {
    if (selectedProducts.includes(product)) {
      setSelectedProducts(selectedProducts.filter(p => p !== product));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const hasActiveFilters = selectedRetailers.length > 0 || selectedBrands.length > 0 || selectedProducts.length > 0;
  const getTotalFilters = () => selectedRetailers.length + selectedBrands.length + selectedProducts.length;

  return (
    <div className="w-full bg-white border-b border-gray-100">
      <div className="px-6 lg:px-12 py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                {getTotalFilters()}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="text-xs text-gray-500 hover:text-gray-700 h-7 px-2"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Retailer Filter */}
          <div className="space-y-2">
            <Popover open={openRetailer} onOpenChange={setOpenRetailer}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openRetailer}
                  className="w-full justify-between h-10 text-sm font-normal bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs text-gray-500 shrink-0">Retailer:</span>
                    <span className="truncate text-gray-700">
                      {selectedRetailers.length === 0
                        ? "All retailers"
                        : selectedRetailers.length === 1
                        ? selectedRetailers[0]
                        : `${selectedRetailers.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput 
                      placeholder="Search retailers..." 
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-0"
                    />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No retailers found.
                    </CommandEmpty>
                    <CommandGroup>
                      {retailers.map((retailer) => (
                        <CommandItem
                          key={retailer}
                          value={retailer}
                          onSelect={() => handleRetailerSelect(retailer)}
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                            selectedRetailers.includes(retailer) ? 'bg-blue-500 border-blue-500' : ''
                          }`}>
                            {selectedRetailers.includes(retailer) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{retailer}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedRetailers.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedRetailers.slice(0, 3).map((retailer) => (
                  <Badge
                    key={retailer}
                    variant="secondary"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer"
                    onClick={() => handleRetailerSelect(retailer)}
                  >
                    {retailer}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedRetailers.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{selectedRetailers.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Brand Filter */}
          <div className="space-y-2">
            <Popover open={openBrand} onOpenChange={setOpenBrand}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openBrand}
                  className="w-full justify-between h-10 text-sm font-normal bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs text-gray-500 shrink-0">Brand:</span>
                    <span className="truncate text-gray-700">
                      {selectedBrands.length === 0
                        ? "All brands"
                        : selectedBrands.length === 1
                        ? selectedBrands[0]
                        : `${selectedBrands.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput 
                      placeholder="Search brands..." 
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-0"
                    />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No brands found.
                    </CommandEmpty>
                    <CommandGroup>
                      {brands.map((brand) => (
                        <CommandItem
                          key={brand}
                          value={brand}
                          onSelect={() => handleBrandSelect(brand)}
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                            selectedBrands.includes(brand) ? 'bg-green-500 border-green-500' : ''
                          }`}>
                            {selectedBrands.includes(brand) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{brand}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedBrands.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedBrands.slice(0, 3).map((brand) => (
                  <Badge
                    key={brand}
                    variant="secondary"
                    className="text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-pointer"
                    onClick={() => handleBrandSelect(brand)}
                  >
                    {brand}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedBrands.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{selectedBrands.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>

          {/* Product Filter */}
          <div className="space-y-2">
            <Popover open={openProduct} onOpenChange={setOpenProduct}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openProduct}
                  className="w-full justify-between h-10 text-sm font-normal bg-gray-50 border-gray-200 hover:bg-gray-100 focus:bg-white focus:border-blue-300"
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-xs text-gray-500 shrink-0">Product:</span>
                    <span className="truncate text-gray-700">
                      {selectedProducts.length === 0
                        ? "All products"
                        : selectedProducts.length === 1
                        ? selectedProducts[0]
                        : `${selectedProducts.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput 
                      placeholder="Search products..." 
                      className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 border-0"
                    />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No products found.
                    </CommandEmpty>
                    <CommandGroup>
                      {products.map((product) => (
                        <CommandItem
                          key={product}
                          value={product}
                          onSelect={() => handleProductSelect(product)}
                          className="cursor-pointer flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${
                            selectedProducts.includes(product) ? 'bg-purple-500 border-purple-500' : ''
                          }`}>
                            {selectedProducts.includes(product) && (
                              <Check className="w-3 h-3 text-white" />
                            )}
                          </div>
                          <span className="flex-1">{product}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            {selectedProducts.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedProducts.slice(0, 3).map((product) => (
                  <Badge
                    key={product}
                    variant="secondary"
                    className="text-xs bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100 cursor-pointer"
                    onClick={() => handleProductSelect(product)}
                  >
                    {product}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {selectedProducts.length > 3 && (
                  <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                    +{selectedProducts.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
