'use client';

import React from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReactEcharts from "echarts-for-react";

interface EventConfigurationSectionProps {
  formData: {
    basePrice: number;
    promoPrice: number;
    discountPercent: number;
    units: number;
    tprACV: number;
    displayOnlyACV: number;
    featureOnlyACV: number;
    featureDisplayACV: number;
  };
  onInputChange: (field: string, value: any) => void;
  promoEventPriceValues?: any;
  promoSimulationData?: any;
  promoEventChartData?: any;
  isPriceSimulationLoading?: boolean;
  handlePromoEventPriceInputChange?: (data: any) => void;
  discount?: any;
  units?: any;
  lift?: any;
  dollars?: any;
}

export function EventConfigurationSection({
  promoEventPriceValues,
  promoEventChartData,
  isPriceSimulationLoading,
  handlePromoEventPriceInputChange,
  discount,
}: EventConfigurationSectionProps) {

  // Debug logging to track chart data
  React.useEffect(() => {
    console.log("EventConfigurationSection - Chart data received:", {
      promoEventChartData,
      chartDataLength: promoEventChartData?.length,
      hasData: promoEventChartData && promoEventChartData.length > 0
    });
  }, [promoEventChartData]);

  const getOption = (data: any) => {
    const { xAxisTitle, leftyAxisTitle, data: chartData } = data;
    const datasets = chartData.datasets;
    const labels = chartData.labels;
    
    console.log('EventConfigurationSection - Processing chart data:', {
      datasets: datasets,
      labels: labels,
      datasetsCount: datasets?.length,
      firstDatasetData: datasets?.[0]?.data,
      secondDatasetData: datasets?.[1]?.data
    });

    // Ensure we have valid datasets
    if (!datasets || datasets.length === 0) {
      console.log('EventConfigurationSection - No datasets found');
      return {
        tooltip: { trigger: "axis" },
        legend: { data: [] },
        grid: { left: 50, right: 110, bottom: 50, top: 50, containLabel: true },
        xAxis: { type: "category", data: labels || [] },
        yAxis: [{ type: "value", name: leftyAxisTitle }],
        series: []
      };
    }

    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
            },
        },
        legend: {
            data: datasets.map((dataset: any) => dataset.label),
            top: -5,
        },
        grid: {
            left: 50,
            right: 110,
            bottom: 50,
            top: 50,
            containLabel: true,
        },
        toolbox: {
            show: true,
            orient: "horizontal",
            left: "left",
            top: "top",
            feature: {
                mark: { show: true },
                dataView: { show: true, readOnly: true },
                magicType: {
                    show: true,
                    type: ["line", "stack"],
                },
                restore: { show: true },
                saveAsImage: { show: true },
            },
        },
        xAxis: {
            type: "category",
            splitLine: { show: false },
            boundaryGap: true,
            data: labels || ["TPR", "Feature Only", "Display Only", "Feature and Display", "Event Incremental"],
            interval: 0,
            name: xAxisTitle,
            axisLabel: {
                rotate: 45,
                fontSize: 10,
            },
            nameLocation: "middle",
            nameGap: 70,
            nameTextStyle: {
                fontWeight: "bold",
            },
        },
        yAxis: [
            {
                type: "value",
                name: leftyAxisTitle,
                position: "left",
                axisLabel: {
                    formatter: "{value} %",
                },
                splitLine: {
                    show: false,
                },
                nameLocation: "middle",
                nameGap: 60,
                nameTextStyle: {
                    fontWeight: "bold",
                },
                show: true,
            },
        ],
        series: datasets.map((dataset: any, i: number) => {
            // Convert string values to numbers and handle invalid values
            const validData = dataset.data.map((value: any) => {
                if (value === '-' || value === null || value === undefined) {
                    return 0;
                }
                return Number(value) || 0;
            });

            return {
                name: dataset.label,
                type: "bar",
                stack: "Total",
                data: validData,
                yAxisIndex: dataset.yAxisID === "right-y-axis" ? 1 : 0,
                borderColor: dataset.borderColor,
                backgroundColor: dataset.backgroundColor,
                smooth: true,
                barGap: "20%",
                barCategoryGap: "40%",
                label: {
                    show: true,
                    position: "top",
                    formatter: (params: any) => {
                        return params.value > 0 ? params.value.toFixed(2) : '';
                    }
                },
            };
        }),
        graphic: [
            {
                type: "rect",
                position: [100, 100],
                shape: {
                    width: 0,
                    height: 0,
                },
                draggable: false,
            },
        ],
    };
};

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      {/* Charts Section */}
      <div className="flex-1">
        {isPriceSimulationLoading ? (
          <div className="flex items-center justify-center h-96">
            <p className="text-slate-600">Please wait, while we are fetching the data for you . . .</p>
          </div>
        ) : (
          <div className="space-y-6">
            {promoEventChartData && promoEventChartData.length > 0 ? (
              promoEventChartData.map((val: any, i: number) => {
                return (
                  <div key={i} className="bg-white rounded-lg border border-slate-200 p-4">
                    <ReactEcharts
                      option={getOption(val)}
                      style={{
                        height: "400px",
                        width: "100%",
                      }}
                    />
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                <p className="text-slate-600">No chart data available. Please configure the event parameters to see the chart.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Event Configuration Section */}
      <div className="lg:w-96">
        <Card className="h-full border border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800">
              <div className="rounded-lg bg-blue-50 p-2">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              Event Configuration
            </CardTitle>
            <p className="mt-1 text-sm text-slate-600">
              Configure pricing and promotional parameters
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Configuration Section */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 text-slate-700">
                Price Configuration
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Base Price
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">$</span>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="basePrice"
                      step="0.01"
                      value={
                        promoEventPriceValues?.basePrice
                          ? typeof promoEventPriceValues?.basePrice === 'number'
                            ? promoEventPriceValues?.basePrice
                                ?.toFixed(2)
                                ?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                            : promoEventPriceValues?.basePrice
                          : null
                      }
                      onChange={(e) => {
                        const value = e.target.value?.replace(/,/g, '');
                        if (!isNaN(Number(value)) && Number(value) >= 0) {
                          handlePromoEventPriceInputChange?.(e);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Promo Price
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">$</span>
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="promoPrice"
                      step="0.01"
                      value={promoEventPriceValues?.promoPrice}
                      onChange={handlePromoEventPriceInputChange}
                      min={0}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Discount %
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <span className="text-sm font-medium text-slate-600">%</span>
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      step="0.1"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="discount"
                      value={
                        promoEventPriceValues?.promoPrice && discount
                      }
                      onChange={handlePromoEventPriceInputChange}
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Units
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="total_units_sum"
                      value={
                        promoEventPriceValues?.total_units_sum
                          ? typeof promoEventPriceValues?.total_units_sum ===
                            'number'
                            ? promoEventPriceValues?.total_units_sum.toFixed(2)
                            : promoEventPriceValues?.total_units_sum
                          : null
                      }
                      onChange={handlePromoEventPriceInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ACV Distribution Section */}
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-2 text-sm font-semibold uppercase tracking-wide text-slate-500 text-slate-700">
                ACV Distribution
              </div>

              <div className="grid gap-4">
                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    TPR ACV %
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="tprDist"
                      value={promoEventPriceValues?.tprDist}
                      onChange={handlePromoEventPriceInputChange}
                      min={0}
                      max={100}
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Display Only ACV %
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="doDist"
                      value={promoEventPriceValues?.doDist}
                      onChange={handlePromoEventPriceInputChange}
                      min={0}
                      max={100}
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Feature Only ACV %
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="foDist"
                      value={promoEventPriceValues?.foDist}
                      onChange={handlePromoEventPriceInputChange}
                      min={0}
                      max={100}
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <Label className="min-w-0 flex-1 text-sm font-medium text-slate-700">
                    Feature & Display ACV %
                  </Label>
                  <div className="flex flex-shrink-0 items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter the value"
                      className="h-9 w-20 border-slate-300 bg-white text-right transition-colors hover:border-slate-400 focus:border-blue-500"
                      name="fdDist"
                      value={promoEventPriceValues?.fdDist}
                      onChange={handlePromoEventPriceInputChange}
                      min={0}
                      max={100}
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
