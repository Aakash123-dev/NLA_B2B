'use client';
import React, { useMemo } from 'react';
import { Check, ChevronDown, Filter, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  // Fetch chartFilterData from Redux
  const { data: chartFilterData } = useSelector(
    (state: RootState) => state.chartFilter
  );


  const retailers = useMemo(
    () => (chartFilterData ? chartFilterData.map((r) => r.name) : []),
    [chartFilterData]
  );

  // Filter brands only belonging to selected retailers
  const brands = useMemo(() => {
    if (!chartFilterData || selectedRetailers.length === 0) return [];
    const selectedRetailerData = chartFilterData.filter((r) =>
      selectedRetailers.includes(r.name)
    );
    const brandsSet = new Set<string>();
    selectedRetailerData.forEach((r) => {
      r.brands.forEach((b) => brandsSet.add(b.name));
    });
    return Array.from(brandsSet).sort();
  }, [chartFilterData, selectedRetailers]);

  // Filter products only belonging to selected brands (and their selected retailers)
  const products = useMemo(() => {
    if (!chartFilterData || selectedBrands?.length === 0) return [];
    let result: string[] = [];
    chartFilterData.forEach((r) => {
      if (
        selectedRetailers.length === 0 ||
        selectedRetailers.includes(r.name)
      ) {
        r.brands.forEach((b) => {
          if (selectedBrands.includes(b.name)) {
            result.push(...b.products.map((p) => p.name));
          }
        });
      }
    });
    return Array.from(new Set(result)).sort();
  }, [chartFilterData, selectedRetailers, selectedBrands]);

  // === Helpers for updating selected Brands/Products ===
  const getBrandsForRetailers = (retailers: string[]): string[] => {
    if (!chartFilterData) return [];
    const brandsSet = new Set<string>();
    chartFilterData.forEach((r) => {
      if (retailers.includes(r.name)) {
        r.brands.forEach((b) => brandsSet.add(b.name));
      }
    });
    return Array.from(brandsSet);
  };

  const getProductsForBrandsAndRetailers = (
    brands: string[],
    retailers: string[]
  ): string[] => {
    if (!chartFilterData) return [];
    const productsSet = new Set<string>();
    chartFilterData.forEach((r) => {
      if (retailers.length === 0 || retailers.includes(r.name)) {
        r.brands.forEach((b) => {
          if (brands.includes(b.name)) {
            b.products.forEach((p) => productsSet.add(p.name));
          }
        });
      }
    });
    return Array.from(productsSet);
  };

  // === 3. Select/deselect logic ===

  const handleRetailerSelect = (retailer: string) => {
    let updated: string[];
    if (selectedRetailers.includes(retailer)) {
      updated = selectedRetailers.filter((r) => r !== retailer);
    } else {
      updated = [...selectedRetailers, retailer];
    }
    setSelectedRetailers(updated);

    // Only keep brands still possible for these retailers
    const possibleBrands = getBrandsForRetailers(updated);
    setSelectedBrands((prev) => prev.filter((b) => possibleBrands.includes(b)));

    // Only keep products that are still possible for those brands+retailers
    const updatedBrands = selectedBrands.filter((b) =>
      possibleBrands.includes(b)
    );
    const possibleProducts = getProductsForBrandsAndRetailers(
      updatedBrands,
      updated
    );
    setSelectedProducts((prev) =>
      prev.filter((p) => possibleProducts.includes(p))
    );
  };

  const handleBrandSelect = (brand: string) => {
    let updated: string[];
    if (selectedBrands.includes(brand)) {
      updated = selectedBrands.filter((b) => b !== brand);
    } else {
      updated = [...selectedBrands, brand];
    }
    setSelectedBrands(updated);

    const possibleProducts = getProductsForBrandsAndRetailers(
      updated,
      selectedRetailers
    );
    setSelectedProducts((prev) =>
      prev.filter((p) => possibleProducts.includes(p))
    );
  };

  const handleProductSelect = (product: string) => {
    let updated: string[];
    if (selectedProducts.includes(product)) {
      updated = selectedProducts.filter((p) => p !== product);
    } else {
      updated = [...selectedProducts, product];
    }
    setSelectedProducts(updated);
  };

  const hasActiveFilters =
    selectedRetailers?.length > 0 ||
    selectedBrands?.length > 0 ||
    selectedProducts?.length > 0;

  const getTotalFilters = () =>
    selectedRetailers?.length + selectedBrands?.length + selectedProducts?.length;

  // --- 4. UI (UI stays as in your base version) ---

  return (
    <div className="w-full border-b border-gray-100 bg-white">
      <div className="px-6 py-4 lg:px-12">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters</span>
            {hasActiveFilters && (
              <Badge
                variant="secondary"
                className="border-blue-200 bg-blue-50 text-xs text-blue-600"
              >
                {getTotalFilters()}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearAll}
              className="h-7 px-2 text-xs text-gray-500 hover:text-gray-700"
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Retailer Filter */}
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded="false"
                  className="h-10 w-full justify-between border-gray-200 bg-gray-50 text-sm font-normal hover:bg-gray-100"
                  disabled={retailers.length === 0}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 text-xs text-gray-500">
                      Retailer:
                    </span>
                    <span className="truncate text-gray-700">
                      {selectedRetailers?.length === 0
                        ? 'All retailers'
                        : selectedRetailers?.length === 1
                          ? selectedRetailers[0]
                          : `${selectedRetailers?.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput placeholder="Search retailers..." />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No retailers found.
                    </CommandEmpty>
                    <CommandGroup>
                      {retailers?.map((retailer) => (
                        <CommandItem
                          key={retailer}
                          value={retailer}
                          onSelect={() => handleRetailerSelect(retailer)}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border ${selectedRetailers.includes(retailer) ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}
                          >
                            {selectedRetailers?.includes(retailer) && (
                              <Check className="h-3 w-3 text-white" />
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
            {/* Selected retailers chips */}
            {selectedRetailers?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedRetailers?.slice(0, 3).map((r) => (
                  <Badge
                    key={r}
                    variant="secondary"
                    className="cursor-pointer border-blue-200 bg-blue-50 text-xs text-blue-700 hover:bg-blue-100"
                    onClick={() => handleRetailerSelect(r)}
                  >
                    {r} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedRetailers?.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-xs text-gray-600"
                  >
                    +{selectedRetailers?.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          {/* Brand Filter */}
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded="false"
                  className="h-10 w-full justify-between border-gray-200 bg-gray-50 text-sm font-normal hover:bg-gray-100"
                  disabled={brands?.length === 0}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 text-xs text-gray-500">
                      Brand:
                    </span>
                    <span className="truncate text-gray-700">
                      {selectedBrands?.length === 0
                        ? 'All brands'
                        : selectedBrands?.length === 1
                          ? selectedBrands[0]
                          : `${selectedBrands?.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput placeholder="Search brands..." />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No brands found.
                    </CommandEmpty>
                    <CommandGroup>
                      {brands?.map((brand) => (
                        <CommandItem
                          key={brand}
                          value={brand}
                          onSelect={() => handleBrandSelect(brand)}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border ${selectedBrands.includes(brand) ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}
                          >
                            {selectedBrands?.includes(brand) && (
                              <Check className="h-3 w-3 text-white" />
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
            {selectedBrands?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedBrands?.slice(0, 3).map((b) => (
                  <Badge
                    key={b}
                    variant="secondary"
                    className="cursor-pointer border-green-200 bg-green-50 text-xs text-green-700 hover:bg-green-100"
                    onClick={() => handleBrandSelect(b)}
                  >
                    {b} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedBrands?.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-xs text-gray-600"
                  >
                    +{selectedBrands?.length - 3} more
                  </Badge>
                )}
              </div>
            )}
          </div>
          {/* Product Filter */}
          <div className="space-y-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded="false"
                  className="h-10 w-full justify-between border-gray-200 bg-gray-50 text-sm font-normal hover:bg-gray-100"
                  disabled={products.length === 0}
                >
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 text-xs text-gray-500">
                      Product:
                    </span>
                    <span className="truncate text-gray-700">
                      {selectedProducts?.length === 0
                        ? 'All products'
                        : selectedProducts?.length === 1
                          ? selectedProducts[0]
                          : `${selectedProducts?.length} selected`}
                    </span>
                  </div>
                  <ChevronDown className="h-3 w-3 shrink-0 text-gray-400" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <div className="flex items-center border-b px-3">
                    <Search className="mr-2 h-4 w-4 shrink-0 text-gray-400" />
                    <CommandInput placeholder="Search products..." />
                  </div>
                  <CommandList className="max-h-[300px]">
                    <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                      No products found.
                    </CommandEmpty>
                    <CommandGroup>
                      {products?.map((product) => (
                        <CommandItem
                          key={product}
                          value={product}
                          onSelect={() => handleProductSelect(product)}
                          className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-50"
                        >
                          <div
                            className={`flex h-4 w-4 items-center justify-center rounded border ${selectedProducts?.includes(product) ? 'border-purple-500 bg-purple-500' : 'border-gray-300'}`}
                          >
                            {selectedProducts?.includes(product) && (
                              <Check className="h-3 w-3 text-white" />
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
            {selectedProducts?.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {selectedProducts?.slice(0, 3).map((p) => (
                  <Badge
                    key={p}
                    variant="secondary"
                    className="cursor-pointer border-purple-200 bg-purple-50 text-xs text-purple-700 hover:bg-purple-100"
                    onClick={() => handleProductSelect(p)}
                  >
                    {p} <X className="ml-1 h-3 w-3" />
                  </Badge>
                ))}
                {selectedProducts?.length > 3 && (
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-xs text-gray-600"
                  >
                    +{selectedProducts?.length - 3} more
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
