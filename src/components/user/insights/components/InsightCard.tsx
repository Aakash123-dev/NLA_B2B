

"use client";

import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  FileText,
  Save,
  Download,
  ChevronDown,
  X,
  Loader2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ResponsiveContainer } from 'recharts';
import type { InsightType } from '../types';
import { retailers, brands, ppgCategories } from '../data';
import dynamic from 'next/dynamic';
import { useDispatch } from 'react-redux';
import { RootState, useAppSelector } from '@/store';

import {
  setSelectedRetailerId,
  setSelectedRetailer1,
  setSelectedRetailer2,
  setSelectedRetailer3,
  setSelectedRetailer4,
  setSelectedRetailer5,
  setSelectedRetailer6,
  setSelectedRetailer7,
  setSelectedRetailer8,
  setSelectedBrandId,
  setSelectedBrand1,
  setSelectedBrand2,
  setSelectedBrand3,
  setSelectedBrand4,
  setSelectedBrand5,
  setSelectedBrand6,
  setSelectedBrand7,
  setSelectedBrand8,
  setSelectedProductId,
  setSelectedProduct1,
  setSelectedProduct2,
  setSelectedProduct3,
  setSelectedProduct4,
  setSelectedProduct5,
  setSelectedProduct6,
  setSelectedProduct7,
  setSelectedProduct8,
} from '@/store/slices/filterSlices';

// Dynamic imports for client-side only packages
import pptxgen from 'pptxgenjs';
const htmlToImage = typeof window !== 'undefined' ? require('html-to-image') : null;
import PriceSlopeChart from './PriceSlopeChart';
import MyChart from './LineBar';
import StackedLineChart from './MultiLine';
import MultiLine2 from './MultiLine2';
import PromotedDepthChart from './PromotedDepthChart';
import PromotionalLiftChart from './PromotionalLiftCharts';
import LiftChart from './LiftChart';
import ElasticityStratagyChart from './ElasticityStratagyChart';
import ProfitCurvesChart from './ProfitCurvesCharts';

const ChartOnly = dynamic(() => import('./chart1'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      <span className="ml-2 text-sm text-gray-600">Loading chart...</span>
    </div>
  ),
});

// Actions map for dispatching multi-value arrays as strings (comma-separated)
const filterActionMaps = {
  retailer: [
    setSelectedRetailerId,
    setSelectedRetailer1,
    setSelectedRetailer2,
    setSelectedRetailer3,
    setSelectedRetailer4,
    setSelectedRetailer5,
    setSelectedRetailer6,
    setSelectedRetailer7,
    setSelectedRetailer8,
  ],
  brand: [
    setSelectedBrandId,
    setSelectedBrand1,
    setSelectedBrand2,
    setSelectedBrand3,
    setSelectedBrand4,
    setSelectedBrand5,
    setSelectedBrand6,
    setSelectedBrand7,
    setSelectedBrand8,
  ],
  product: [
    setSelectedProductId,
    setSelectedProduct1,
    setSelectedProduct2,
    setSelectedProduct3,
    setSelectedProduct4,
    setSelectedProduct5,
    setSelectedProduct6,
    setSelectedProduct7,
    setSelectedProduct8,
  ],
};

// Selector hook that returns comma-separated string for each filter type & index
const useSelectedFilter = (
  type: 'retailer' | 'brand' | 'product',
  index: number
) => {
  const filterKeys = {
    retailer: [
      'selectedRetailerId',
      'selectedRetailer1',
      'selectedRetailer2',
      'selectedRetailer3',
      'selectedRetailer4',
      'selectedRetailer5',
      'selectedRetailer6',
      'selectedRetailer7',
      'selectedRetailer8',
    ],
    brand: [
      'selectedBrandId',
      'selectedBrand1',
      'selectedBrand2',
      'selectedBrand3',
      'selectedBrand4',
      'selectedBrand5',
      'selectedBrand6',
      'selectedBrand7',
      'selectedBrand8',
    ],
    product: [
      'selectedProductId',
      'selectedProduct1',
      'selectedProduct2',
      'selectedProduct3',
      'selectedProduct4',
      'selectedProduct5',
      'selectedProduct6',
      'selectedProduct7',
      'selectedProduct8',
    ],
  };

  const val = useAppSelector(
    (state: RootState) => state.filters[filterKeys[type][index]] ?? ''
  );
  return val as string;
};

interface FilterSelectProps {
  label: string;
  value: string;
  options: string[];
  onChangeValue: (val: string) => void;
  isMultiple?: boolean;
  isLoading?: boolean;
  placeholder?: string;
}

// Custom styled multi-select component
const FilterSelect: React.FC<FilterSelectProps> = ({
  label,
  value,
  options,
  onChangeValue,
  isMultiple = true,
  isLoading = false,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedArray = value ? value.split(',').filter(Boolean) : [];

  const displayValue = useMemo(() => {
    if (selectedArray.length === 0) {
      return placeholder || `Select ${label}`;
    }
    if (!isMultiple) {
      return selectedArray[0];
    }
    if (selectedArray.length === 1) {
      return selectedArray[0];
    }
    return `${selectedArray[0]} +${selectedArray.length - 1} more`;
  }, [selectedArray, label, isMultiple, placeholder]);

  const handleOptionClick = useCallback(
    (option: string) => {
      if (option === 'all') {
        if (selectedArray.length === options.length) {
          onChangeValue(''); // Deselect all if all are selected
        } else {
          onChangeValue(options.join(',')); // Select all
        }
        setIsOpen(false);
        return;
      }

      if (!isMultiple) {
        onChangeValue(option);
        setIsOpen(false);
        return;
      }

      const newSelection = selectedArray.includes(option)
        ? selectedArray.filter((item) => item !== option)
        : [...selectedArray, option];

      onChangeValue(newSelection.join(','));
    },
    [selectedArray, isMultiple, onChangeValue, options]
  );

  const handleRemoveTag = useCallback(
    (option: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newSelection = selectedArray.filter((item) => item !== option);
      onChangeValue(newSelection.join(','));
    },
    [selectedArray, onChangeValue]
  );

  const handleClearAll = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChangeValue('');
    },
    [onChangeValue]
  );

  // Ensure 'All' is not duplicated
  const updatedOptions = useMemo(() => {
    const uniqueOptions = Array.from(new Set(options));
    return ['all', ...uniqueOptions.filter(option => option.toLowerCase() !== 'all')];
  }, [options]);

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-gray-700">{label}</Label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          disabled={isLoading}
          className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm transition-colors hover:border-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span
            className={`truncate ${selectedArray.length === 0 ? 'text-gray-500' : 'text-gray-900'}`}
          >
            {isLoading ? 'Loading...' : displayValue}
          </span>
          <div className="flex items-center space-x-1">
            {selectedArray.length > 0 && (
              <button
                type="button"
                onClick={handleClearAll}
                className="rounded-full p-1 hover:bg-gray-100"
              >
                <X className="h-3 w-3 text-gray-400" />
              </button>
            )}
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
            ) : (
              <ChevronDown
                className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            )}
          </div>
        </button>

        {/* Dropdown */}
        {isOpen && !isLoading && (
          <div className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-200 bg-white py-1 shadow-lg">
            {updatedOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">
                No options available
              </div>
            ) : (
              updatedOptions.map((option) => {
                const isSelected = selectedArray.includes(option) || (option === 'all' && selectedArray.length === options.length);
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleOptionClick(option)}
                    className={`flex w-full items-center px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-900'
                    }`}
                  >
                    {isMultiple && (
                      <div
                        className={`mr-2 h-4 w-4 rounded border-2 ${
                          isSelected
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-300'
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="h-full w-full text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    )}
                    <span className="truncate">{option === 'all' ? 'All' : option}</span>
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Click outside to close */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
};

interface InsightCardProps {
  insight: InsightType;
  chartData: any[];
  showLegend: boolean;
  getCurrentColors: () => string[];
  selectedRetailer: string;
  setSelectedRetailer: (val: string) => void;
  selectedBrand: string;
  setSelectedBrand: (val: string) => void;
  selectedPPG: string;
  setSelectedPPG: (val: string) => void;
  viewBy: string;
  setViewBy: (val: string) => void;
  downloadType: string;
  setDownloadType: (val: string) => void;
  notes: string;
  setNotes: (val: string) => void;
  toast: (options: {
    title: string;
    description: string;
    duration: number;
  }) => void;
  index: number;
}

export const InsightCard: React.FC<InsightCardProps> = ({
  insight,
  viewBy,
  setViewBy,
  downloadType,
  setDownloadType,
  notes,
  setNotes,
  toast,
  index,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const dispatch = useDispatch();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
      setIsDataLoading(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  // Selected values as comma-separated strings
  const selectedRetailer = useSelectedFilter('retailer', index);
  const selectedBrand = useSelectedFilter('brand', index);
  const selectedProduct = useSelectedFilter('product', index);

  const setSelectedFilter = useCallback(
    (type: 'retailer' | 'brand' | 'product', values: string) => {
      dispatch(filterActionMaps[type][index](values));
    },
    [dispatch, index]
  );

  const {
    products,
    retailers: retailerList,
    brands: brandList,
  } = useAppSelector((state: RootState) => state.globalFilters);

  // Adjust filtering logic to handle products as strings
  const filteredProducts = useMemo(() => {
    if (selectedBrand === 'all' || !selectedBrand) {
      return products || ppgCategories;
    }
    const selectedBrandsArray = selectedBrand.split(',').filter(Boolean);
    // If products are strings, filter based on inclusion
    return (products || ppgCategories).filter(product =>
      selectedBrandsArray.some(brand => product.includes(brand))
    );
  }, [selectedBrand, products, ppgCategories]);

  const chartMap: { [k: number]: React.ReactElement | null } = useMemo(
    () => ({
      0: <ChartOnly />,
      1: <PriceSlopeChart />,
      2: <MyChart />,
      3: <StackedLineChart />,
      4: <MultiLine2 />,
      5: <PromotedDepthChart />,
      6: <PromotionalLiftChart />,
      7: <LiftChart />,
      8: <ElasticityStratagyChart isLoading={false} />,
      9: <ProfitCurvesChart />,
    }),
    []
  );

  const handleDownloadChart = async () => {
    if (isDownloading) return;

    // Check if we're on the client side and modules are available
    if (!pptxgen || !htmlToImage) {
      toast({
        title: 'Download failed',
        description: 'Required modules are not available.',
        duration: 2000,
      });
      return;
    }

    setIsDownloading(true);
    try {
      if (chartRef.current) {
        console.log('Attempting to generate chart image...');

        const pptx = new pptxgen();
        pptx.layout = 'LAYOUT_WIDE';
        const slide = pptx.addSlide();
        slide.background = { color: 'FFFFFF' };

        // Check if the chart is an SVG element
        const svgElement = chartRef.current.querySelector('svg');
        let chartImageDataUrl;

        if (svgElement) {
          const svgData = new XMLSerializer().serializeToString(svgElement);
          const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
          const svgUrl = URL.createObjectURL(svgBlob);

          // Convert SVG to PNG using html-to-image
          chartImageDataUrl = await htmlToImage.toPng(svgElement as unknown as HTMLElement, {
            backgroundColor: 'white',
            quality: 1.0,
            pixelRatio: 2,
            skipAutoScale: true,
            cacheBust: true,
          });

          URL.revokeObjectURL(svgUrl);
        } else {
          // Fallback to PNG if not SVG
          chartImageDataUrl = await htmlToImage.toPng(chartRef.current, {
            backgroundColor: 'white',
            quality: 1.0,
            pixelRatio: 2,
            skipAutoScale: true,
            cacheBust: true,
          });
        }

        if (chartImageDataUrl) {
          slide.addImage({
            data: chartImageDataUrl,
            x: 0.5,
            y: 2,
            w: 9,
            h: 4,
          });

          await pptx.writeFile({
            fileName: `${insight.name || 'insight'}-chart.pptx`,
          });

          toast({
            title: 'Download successful',
            description: 'Charts have been downloaded as PPTX.',
            duration: 3000,
          });
        } else {
          throw new Error('Failed to generate chart image.');
        }
      } else {
        throw new Error('Chart reference is not set.');
      }
    } catch (error: any) {
      console.error('Download error:', error);
      toast({
        title: 'Download failed',
        description: `An error occurred while downloading the PPTX: ${error.message}`,
        duration: 3000,
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border-t border-gray-200 bg-gray-50 p-6">
      <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {insight.name}
                </CardTitle>
                {insight.question && (
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">
                    Q&A
                  </span>
                )}
              </div>
              {insight.question && (
                <p className="mt-2 text-sm text-gray-600">{insight.question}</p>
              )}
            </CardHeader>
            <CardContent>
              <div
                className="mb-4 h-80 w-full rounded-lg border bg-white"
                ref={chartRef}
              >
                {isVisible ? (
                  <ResponsiveContainer width="100%" height="100%">
                    {chartMap[index] || (
                      <div className="flex h-full items-center justify-center text-sm text-slate-500">
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                            <FileText className="h-8 w-8 text-gray-400" />
                          </div>
                          <p>No chart data available</p>
                        </div>
                      </div>
                    )}
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <div className="mt-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-600" />
                  <CardTitle className="text-sm font-medium text-gray-700">
                    Quick Notes
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Textarea
                    placeholder="Add your insights, observations, or notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="max-h-[120px] min-h-[80px] resize-none border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-indigo-200 bg-indigo-50 text-indigo-700 hover:border-indigo-300 hover:bg-indigo-100"
                      onClick={() =>
                        toast({
                          title: 'Notes saved',
                          description:
                            'Your notes have been saved successfully.',
                          duration: 3000,
                        })
                      }
                    >
                      <Save className="mr-1.5 h-3 w-3" />
                      Save Notes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Filters Panel */}
        <div className="space-y-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-base font-semibold text-gray-900">
                <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                Chart Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FilterSelect
                label="Retailer"
                options={['all', ...(retailerList || retailers)]}
                value={selectedRetailer}
                onChangeValue={(str) => setSelectedFilter('retailer', str)}
                isLoading={isDataLoading}
                placeholder="Select retailers..."
              />

              <FilterSelect
                label="Brand"
                options={brandList || brands}
                value={selectedBrand}
                onChangeValue={(str) => setSelectedFilter('brand', str)}
                isLoading={isDataLoading}
                placeholder="Select brands..."
              />

              <FilterSelect
                label="PPG Categories"
                options={filteredProducts}
                value={selectedProduct}
                onChangeValue={(str) => setSelectedFilter('product', str)}
                isLoading={isDataLoading}
                placeholder="Select categories..."
              />

              <FilterSelect
                label="View By"
                options={['retailer', 'brand', 'ppg']}
                value={viewBy}
                onChangeValue={setViewBy}
                isMultiple={false}
                placeholder="Select view..."
              />

              <FilterSelect
                label="Download Chart Type"
                options={['category', 'retailer', 'brand', 'ppg', 'upc']}
                value={downloadType}
                onChangeValue={setDownloadType}
                isMultiple={false}
                placeholder="Select download type..."
              />

              <div className="border-t border-gray-200 pt-4">
                <Button
                  variant="default"
                  className="w-full bg-indigo-600 text-white hover:bg-indigo-700"
                  onClick={handleDownloadChart}
                  disabled={isDownloading}
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download{' '}
                      {downloadType.charAt(0).toUpperCase() +
                        downloadType.slice(1)}{' '}
                      Chart
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
