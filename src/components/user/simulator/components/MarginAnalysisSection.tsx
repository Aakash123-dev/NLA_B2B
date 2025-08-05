'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ApexCharts from 'react-apexcharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Calculator,
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Product, MarginData, MarginInputs } from '../types/product';

interface MarginAnalysisSectionProps {
  product: Product;
  marginData: MarginData;
  marginInputs: MarginInputs | undefined;
  updateMarginInput: (
    productId: number,
    field: 'costPerUnit' | 'targetMargin',
    value: number
  ) => void;
  toggleProductExpansion: (productId: number) => void;
  marginPriceValues?: any;
  marginSimulationData?: any[];
  marginChartData?: any;
  isPriceSimulationLoading?: boolean;
  handleMarginPriceInputChange?: (event: any) => void;
}

export function MarginAnalysisSection({
  product,
  marginData,
  marginInputs,
  updateMarginInput,
  marginPriceValues,
  marginSimulationData,
  marginChartData,
  isPriceSimulationLoading,
  handleMarginPriceInputChange,
  toggleProductExpansion,
}: MarginAnalysisSectionProps) {
  const [isStacked, setIsStacked] = React.useState(false);
  const productName = marginSimulationData?.[0]?.Product ?? '';
  const netUnitPrice =
    marginPriceValues?.listPrice - marginPriceValues?.edlpSpend;
  const manufacturerMargin =
    ((netUnitPrice - marginPriceValues?.cogs) / marginPriceValues?.listPrice) *
    100;
  const retailerMargin =
    ((marginPriceValues?.basePrice - netUnitPrice) /
      marginPriceValues?.basePrice) *
    100;

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];
  const data = {
    manufacturerProfit: marginChartData?.manufacturerProfit,
    annualProfit: marginChartData?.annualProfit,
    changeInPrice: [
      '-25%',
      '-24%',
      '-23%',
      '-22%',
      '-21%',
      '-20%',
      '-19%',
      '-18%',
      '-17%',
      '-16%',
      '-15%',
      '-14%',
      '-13%',
      '-12%',
      '-11%',
      '-10%',
      '-9%',
      '-8%',
      '-7%',
      '-6%',
      '-5%',
      '-4%',
      '-3%',
      '-2%',
      '-1%',
      '0%',
      '1%',
      '2%',
      '3%',
      '4%',
      '5%',
      '6%',
      '7%',
      '8%',
      '9%',
      '10%',
      '11%',
      '12%',
      '13%',
      '14%',
      '15%',
      '16%',
      '17%',
      '18%',
      '19%',
      '20%',
      '21%',
      '22%',
      '23%',
      '24%',
      '25%',
    ],
  };

  // Function to calculate nice round numbers for axis scaling (same as PPT)
  const calculateAxisValues = (values) => {
    if (!values || values.length === 0)
      return { min: 0, max: 100, majorUnit: 20, tickAmount: 5 };

    const max = Math.max(...values);
    const min = Math.min(...values);

    // Function to get the magnitude (power of 10)
    const getMagnitude = (num) =>
      Math.pow(10, Math.floor(Math.log10(Math.abs(num))));

    // Function to round to nice numbers
    const getNiceNumber = (num, round = true) => {
      const magnitude = getMagnitude(num);
      const fraction = num / magnitude;

      let niceFraction;
      if (round) {
        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;
      } else {
        if (fraction <= 1) niceFraction = 1;
        else if (fraction <= 2) niceFraction = 2;
        else if (fraction <= 5) niceFraction = 5;
        else niceFraction = 10;
      }

      return niceFraction * magnitude;
    };

    const range = max - min;
    const targetTicks = 5; // Target number of divisions
    const roughStep = range / (targetTicks - 1);
    const stepSize = getNiceNumber(roughStep);

    const niceMin = Math.floor(min / stepSize) * stepSize;
    const niceMax = Math.ceil(max / stepSize) * stepSize;

    return {
      min: min < 0 ? niceMin : 0,
      max: niceMax,
      majorUnit: stepSize,
      tickAmount: Math.ceil((niceMax - (min < 0 ? niceMin : 0)) / stepSize),
    };
  };

  // Calculate axis values for both datasets
  const manufacturerAxis = calculateAxisValues(data.manufacturerProfit);
  const annualSalesAxis = calculateAxisValues(data.annualProfit);

  const option45s = {
    chart: {
      type: 'line',
      toolbar: {
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [
            {
              icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M32,5H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V7A2,2,0,0,0,32,5ZM4,29V7H32V29Z"></path><path d="M 7 10 L 13 10 L 13 26 L 11.4 26 L 11.4 11.6 L 8.6 11.6 L 8.6 26 L 7 26 Z" class="clr-i-outline clr-i-outline-path-2"></path><path d="M 15 19 L 21 19 L 21 26 L 19.4 26 L 19.4 20.6 L 16.6 20.6 L 16.6 26 L 15 26 Z" class="clr-i-outline clr-i-outline-path-3"></path><path d="M 23 16 L 29 16 L 29 26 L 27.4 26 L 27.4 17.6 L 24.6 17.6 L 24.6 26 L 23 26 Z" class="clr-i-outline clr-i-outline-path-4"></path><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
              title: 'Switch to Bar Chart',
              class: 'custom-icon-bar',
              index: -1,
              // click: () => setChartType('bar')
            },
            // {
            //   icon: `<svg fill="#000000" width="20px" height="20px" viewBox="0 -2 30 40" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path class="clr-i-outline clr-i-outline-path-1" d="M 32 5 L 4 5 C 2.895 5 2 5.895 2 7 L 2 29 C 2 30.105 2.895 31 4 31 L 32 31 C 33.105 31 34 30.105 34 29 L 34 7 C 34 5.895 33.105 5 32 5 Z M 4 29 L 4 7 L 32 7 L 32 29 Z"></path><polygon points="15.62 15.222 9.602 23.968 5.55 20.384 6.61 19.186 9.308 21.572 15.634 12.38 22.384 22.395 29.138 13.47 30.414 14.436 22.308 25.145" class="clr-i-outline clr-i-outline-path-2"></polygon><rect x="0" y="0" width="36" height="36" fill-opacity="0"/></svg>`,
            //   title: 'Switch to Line Chart',
            //   class: 'custom-icon-line',
            //   index: -1,
            //   click: () => setChartType('line')
            // },
            {
              icon: `<svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19 8.04144L12 3.99999L5 8.04145V9.7735L12 13.8149L19 9.7735V8.04144ZM6.5 8.90747L12 5.73204L17.5 8.90747L12 12.0829L6.5 8.90747Z" fill="#1F2328"/><path d="M19 14.1789V15.911L12 19.9524L5 15.911V14.1789L12 18.2204L19 14.1789Z" fill="#1F2328"/><path d="M19 11.1765V12.9086L12 16.95L5 12.9086V11.1765L12 15.218L19 11.1765Z" fill="#1F2328"/></svg>`,
              title: isStacked ? 'Tile' : 'Stack',
              class: 'custom-icon-line',
              index: -1,
              click: () => setIsStacked(isStacked ? false : true),
            },
          ],
        },
      },

      // zoom: {
      //   enable: false,
      // },
      zoom: false,
      zoomin: false,
      zoomout: false,

      // zoom: {
      //   enable: true,
      // },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
    },
    title: {
      text: 'Price Effects On Margin',
      // text: "Effects of Change In Price",
      align: 'center',
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      style: {
        fontSize: '16px',
      },
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // Alternating row colors
        opacity: 0.5,
      },
    },
    xaxis: {
      title: {
        text: '% Change in Price',
      },
      categories: [
        '-25%',
        '-24%',
        '-23%',
        '-22%',
        '-21%',
        '-20%',
        '-19%',
        '-18%',
        '-17%',
        '-16%',
        '-15%',
        '-14%',
        '-13%',
        '-12%',
        '-11%',
        '-10%',
        '-9%',
        '-8%',
        '-7%',
        '-6%',
        '-5%',
        '-4%',
        '-3%',
        '-2%',
        '-1%',
        '0%',
        '1%',
        '2%',
        '3%',
        '4%',
        '5%',
        '6%',
        '7%',
        '8%',
        '9%',
        '10%',
        '11%',
        '12%',
        '13%',
        '14%',
        '15%',
        '16%',
        '17%',
        '18%',
        '19%',
        '20%',
        '21%',
        '22%',
        '23%',
        '24%',
        '25%',
      ],
    },
    yaxis: [
      {
        title: {
          text: 'Manufacturer Profit ($) ',
        },
        min: manufacturerAxis.min,
        max: manufacturerAxis.max,
        tickAmount: manufacturerAxis.tickAmount,
        labels: {
          formatter: function (val) {
            return '$' + Math.round(val).toLocaleString();
          },
        },
      },
      {
        opposite: true,
        title: {
          text: 'Annual Dollar Sales ($)',
        },
        min: annualSalesAxis.min,
        max: annualSalesAxis.max,
        tickAmount: annualSalesAxis.tickAmount,
        labels: {
          formatter: function (val) {
            return '$' + Math.round(val).toLocaleString();
          },
        },
      },
      // {
      //   title: {
      //     text: "Annual Dollar Sales ($)",
      //   },
      // },
      // {
      //   opposite: true,
      //   title: {
      //     text: 'Manufacturer Profit',
      //   },
      // },
    ],
    series: [
      {
        name: 'Manufacturer Profit',
        data:
          data.manufacturerProfit &&
          formatArrayToTwoDecimals(data.manufacturerProfit),
      },
      {
        name: 'Annual Dollar Sales',
        // data: data.annualProfit.concat(new Array(data.changeInPrice.length - data.annualProfit.length).fill(null)),
        data: data.annualProfit && formatArrayToTwoDecimals(data.annualProfit),
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
      zoom: false,
      zoomin: false,
      zoomout: false,
      x: {
        show: true,
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          const basePrice = Number(marginPriceValues?.basePrice || 0);
          const percentageChange = w.globals.categoryLabels[value];
          const percentValue = parseFloat(percentageChange);

          let calculatedPrice;
          if (percentValue < 0) {
            calculatedPrice = Number(
              basePrice - Math.abs(basePrice * (percentValue / 100))
            );
          } else {
            calculatedPrice = Number(
              basePrice + basePrice * (percentValue / 100)
            );
          }
          return `Price: $${isNaN(calculatedPrice) ? '0.00' : calculatedPrice.toFixed(2)} (${percentageChange})`;
        },
      },
      y: {
        formatter: function (
          value,
          { series, seriesIndex, dataPointIndex, w }
        ) {
          // Format as $ and comma separated, no decimals
          if (value === null || isNaN(value)) return '$0';
          return '$' + Math.round(value).toLocaleString();
        },
      },
      // Custom tooltip for both series
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        // Get values for both series at this data point
        const priceLabel = w.globals.categoryLabels[dataPointIndex];
        const manufacturerProfit = series[0][dataPointIndex];
        const annualDollarSales = series[1][dataPointIndex];
        return `
          <div style="padding: 8px 12px;">
            <div style="font-weight: bold; margin-bottom: 4px;">Price: ${priceLabel}</div>
            <div style="display: flex; align-items: center; margin-bottom: 2px;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #1E90FF; border-radius: 50%; margin-right: 8px;"></span>
              <span>Manufacturer Profit:</span>
              <span style="font-weight: bold; margin-left: 8px;">$${Math.round(manufacturerProfit).toLocaleString()}</span>
            </div>
            <div style="display: flex; align-items: center;">
              <span style="display: inline-block; width: 10px; height: 10px; background: #00E396; border-radius: 50%; margin-right: 8px;"></span>
              <span>Annual Dollar Sales:</span>
              <span style="font-weight: bold; margin-left: 8px;">$${Math.round(annualDollarSales).toLocaleString()}</span>
            </div>
          </div>
        `;
      },
    },
    legend: {
      position: 'top',
    },
  };

  function formatArrayToTwoDecimals(arr) {
    return arr.map((num) => Math.floor(num * 100) / 100);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Margin Analysis
            </h2>
            <p className="text-gray-600">
              Compare pricing strategies and optimize margins
            </p>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card className="rounded-xl border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-xs font-medium text-blue-600">
                    Revenue Impact
                  </p>
                  <p className="text-lg font-bold text-blue-900">+12.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-xs font-medium text-green-600">
                    Margin Improvement
                  </p>
                  <p className="text-lg font-bold text-green-900">+8.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-xs font-medium text-orange-600">
                    Units Sold
                  </p>
                  <p className="text-lg font-bold text-orange-900">-3.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl border-purple-200 bg-gradient-to-r from-purple-50 to-violet-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs font-medium text-purple-600">
                    Market Share
                  </p>
                  <p className="text-lg font-bold text-purple-900">-1.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Side - Comparison Chart */}
          <Card className="flex h-[500px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex-shrink-0 border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Price & Margin Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="flex min-h-0 flex-1 flex-col p-6">
              <div className="min-h-[300px] flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <ApexCharts
                    options={option45s}
                    series={option45s.series}
                    height={500}
                    width="100%"
                  />
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-shrink-0 items-center justify-center gap-6 border-t border-gray-100 pt-4">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-blue-500 opacity-70"></div>
                  <span className="text-sm text-gray-600">Current Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded bg-green-500"></div>
                  <span className="text-sm text-gray-600">Projected Price</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Metrics Table */}
          <Card className="flex h-[500px] flex-col rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex-shrink-0 border-b border-gray-100 pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Target className="h-5 w-5 text-green-500" />
                Pricing Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between p-4">
              <div className="space-y-2">
                {/* List Price */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    List Price
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      prefix="$"
                      name="listPrice"
                      value={marginPriceValues.listPrice}
                      onChange={handleMarginPriceInputChange}
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                      placeholder="Enter the value"
                      min={0}
                    />
                  </div>
                </div>

                {/* EDLP Spend */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    EDLP Spend
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      name="edlpSpend"
                      value={marginPriceValues.edlpSpend}
                      onChange={handleMarginPriceInputChange}
                      min={0}
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                    />
                  </div>
                </div>

                {/* Net Unit Price - Now Editable */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Net Unit Price
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      name="netUnitPrice"
                      value={netUnitPrice}
                      onChange={handleMarginPriceInputChange}
                      readOnly
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                    />
                  </div>
                </div>

                {/* COGS */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    COGS
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      name="cogs"
                      value={marginPriceValues.cogs}
                      onChange={handleMarginPriceInputChange}
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                    />
                  </div>
                </div>

                {/* Base Price Elasticity */}
                <div className="flex items-center justify-between border-b border-gray-100 py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Base Price Elasticity
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      name="basePriceElasticity"
                      value={
                        marginPriceValues?.basePriceElasticity
                          ? Number(
                              marginPriceValues?.basePriceElasticity
                            ).toFixed(2)
                          : '0.00'
                      }
                      onChange={handleMarginPriceInputChange}
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Base Price */}
                <div className="flex items-center justify-between py-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Base Price
                  </label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-900" />
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      value={
                        marginPriceValues?.basePrice
                          ? marginPriceValues.basePrice
                          : '0.00'
                      }
                      onChange={handleMarginPriceInputChange}
                      className="h-7 w-20 rounded-md border-gray-200 text-right text-xs"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables Section */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* First Table - Manufacturer Data */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <BarChart3 className="h-5 w-5 text-blue-500" />
                Manufacturer Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-700">
                      Product Name
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Net Unit Price ($)
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Total EDLP Spend ($)
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Manufacturer Margin %
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {product.Product}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-1">
                        <span className="text-sm font-medium text-blue-700">
                          ${parseFloat(netUnitPrice || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-green-200 bg-green-50 px-2 py-1">
                        <span className="text-sm font-medium text-green-700">
                          $
                          {parseFloat(
                            marginPriceValues.edlpSpend || '0'
                          ).toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-purple-200 bg-purple-50 px-2 py-1">
                        <span className="text-sm font-medium text-purple-700">
                          {manufacturerMargin
                            ? manufacturerMargin.toFixed(2) + '%'
                            : '-'}
                          %
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Second Table - Retailer Data */}
          <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
            <CardHeader className="border-b border-gray-100 pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                <Target className="h-5 w-5 text-green-500" />
                Retailer Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-700">
                      Product Name
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Net Unit Price ($)
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Base Price ($)
                    </TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">
                      Retailer Margin %
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">
                      {product.Product}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-2 py-1">
                        <span className="text-sm font-medium text-blue-700">
                          ${parseFloat(netUnitPrice || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-orange-200 bg-orange-50 px-2 py-1">
                        <span className="text-sm font-medium text-orange-700">
                          {marginPriceValues?.basePrice
                            ? '$ ' +
                              Number(marginPriceValues?.basePrice).toFixed(2)
                            : '-'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1">
                        <span className="text-sm font-medium text-emerald-700">
                          {retailerMargin
                            ? retailerMargin.toFixed(2) + '%'
                            : '-'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
