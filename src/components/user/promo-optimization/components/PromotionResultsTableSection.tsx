'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface PromotionResultsTableSectionProps {
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

export function PromotionResultsTableSection({
  promoEventPriceValues,
  promoSimulationData,
  promoEventChartData,
  isPriceSimulationLoading,
  handlePromoEventPriceInputChange,
  discount,  units,
  lift,
  dollars
,
}: PromotionResultsTableSectionProps) {
  // Debug logging to track data state
  React.useEffect(() => {
    console.log("PromotionResultsTableSection - Data received:", {
      lift,
      units,
      dollars,
      promoEventPriceValues,
      hasLiftData: lift && Object.keys(lift).length > 0,
      hasUnitsData: units && Object.keys(units).length > 0,
      hasDollarsData: dollars && Object.keys(dollars).length > 0
    });
  }, [lift, units, dollars, promoEventPriceValues]);

  // Helper function to get promotion name based on index
  const getPromotionName = (index: number): string => {
    switch (index) {
      case 0: return 'TPR';
      case 1: return 'Feature Only';
      case 2: return 'Display Only';
      case 3: return 'Feature and Display';
      default: return '';
    }
  };

  // Helper function to get ACV value based on index
  const getACVValue = (index: number): string => {
    if (!promoEventPriceValues) return '-';
    
    switch (index) {
      case 0: return promoEventPriceValues.tprDist ? `${promoEventPriceValues.tprDist}%` : '-';
      case 1: return promoEventPriceValues.foDist ? `${promoEventPriceValues.foDist}%` : '-';
      case 2: return promoEventPriceValues.doDist ? `${promoEventPriceValues.doDist}%` : '-';
      case 3: return promoEventPriceValues.fdDist ? `${promoEventPriceValues.fdDist}%` : '-';
      default: return '-';
    }
  };

  // Helper function to get units value based on index
  const getUnitsValue = (index: number): string => {
    if (!units) return '-';
    
    switch (index) {
      case 0: return units.tprUnits ? units.tprUnits.toFixed(2) : '-';
      case 1: return units.foUnits ? units.foUnits.toFixed(2) : '-';
      case 2: return units.doUnits ? units.doUnits.toFixed(2) : '-';
      case 3: return units.fdUnits ? units.fdUnits.toFixed(2) : '-';
      default: return '-';
    }
  };

  // Helper function to get dollars value based on index
  const getDollarsValue = (index: number): string => {
    if (!dollars) return '-';
    
    switch (index) {
      case 0: return dollars.tprDollars ? `$${dollars.tprDollars.toFixed(2)}` : '-';
      case 1: return dollars.foDollars ? `$${dollars.foDollars.toFixed(2)}` : '-';
      case 2: return dollars.doDollars ? `$${dollars.doDollars.toFixed(2)}` : '-';
      case 3: return dollars.fdDollars ? `$${dollars.fdDollars.toFixed(2)}` : '-';
      default: return '-';
    }
  };

  // Calculate Event Incremental values - using the same logic as your original code
  const getEventIncrementalLift = (): string => {
    if (!lift) return '-';
    const tprLift = lift.tprLift || 0;
    const foLift = lift.foLift || 0;
    const doLift = lift.doLift || 0;
    const fdLift = lift.fdLift || 0;
    const totalLift = tprLift + foLift + doLift + fdLift;
    return !isNaN(totalLift) && totalLift !== 0 ? `${totalLift.toFixed(2)}%` : '-';
  };

  const getEventIncrementalUnits = (): string => {
    if (!units) return '-';
    const tprUnits = units.tprUnits || 0;
    const foUnits = units.foUnits || 0;
    const doUnits = units.doUnits || 0;
    const fdUnits = units.fdUnits || 0;
    const totalUnits = tprUnits + foUnits + doUnits + fdUnits;
    return !isNaN(totalUnits) && totalUnits !== 0 ? totalUnits.toFixed(2) : '-';
  };

  const getEventIncrementalDollars = (): string => {
    if (!dollars) return '-';
    const tprDollars = dollars.tprDollars || 0;
    const foDollars = dollars.foDollars || 0;
    const doDollars = dollars.doDollars || 0;
    const fdDollars = dollars.fdDollars || 0;
    const totalDollars = tprDollars + foDollars + doDollars + fdDollars;
    return !isNaN(totalDollars) && totalDollars !== 0 ? `$${totalDollars.toFixed(2)}` : '-';
  };

  // Calculate Event Total values - using the same logic as your original code
  const getEventTotalLift = (): string => {
    if (!lift) return '-';
    const tprLift = lift.tprLift || 0;
    const foLift = lift.foLift || 0;
    const doLift = lift.doLift || 0;
    const fdLift = lift.fdLift || 0;
    const totalLift = tprLift + foLift + doLift + fdLift;
    return !isNaN(totalLift) && totalLift !== 0 ? `${(totalLift + 100).toFixed(2)}%` : '-';
  };

  const getEventTotalUnits = (): string => {
    if (!units || !promoEventPriceValues?.total_units_sum) return '-';
    const tprUnits = units.tprUnits || 0;
    const foUnits = units.foUnits || 0;
    const doUnits = units.doUnits || 0;
    const fdUnits = units.fdUnits || 0;
    const totalUnits = tprUnits + foUnits + doUnits + fdUnits;
    return !isNaN(totalUnits) && totalUnits !== 0 
      ? (totalUnits + parseInt(promoEventPriceValues.total_units_sum)).toFixed(2) 
      : '-';
  };

  const getEventTotalDollars = (): string => {
    if (!dollars || !promoEventPriceValues?.total_units_sum || !promoEventPriceValues?.promoPrice) return '-';
    const tprDollars = dollars.tprDollars || 0;
    const foDollars = dollars.foDollars || 0;
    const doDollars = dollars.doDollars || 0;
    const fdDollars = dollars.fdDollars || 0;
    const totalDollars = tprDollars + foDollars + doDollars + fdDollars;
    return !isNaN(totalDollars) && totalDollars !== 0 
      ? `$${(totalDollars + promoEventPriceValues.total_units_sum * promoEventPriceValues.promoPrice).toFixed(2)}` 
      : '-';
  };

  const promotionColors = [
    { bg: 'bg-blue-500', hover: 'hover:bg-blue-50/50' },
    { bg: 'bg-emerald-500', hover: 'hover:bg-emerald-50/50' },
    { bg: 'bg-amber-500', hover: 'hover:bg-amber-50/50' },
    { bg: 'bg-red-500', hover: 'hover:bg-red-50/50' },
  ];

  // Check if we have any data to show
  const hasData = lift || dollars || units || promoEventPriceValues;

  return (
    <Card className="border border-slate-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-slate-800">
          <div className="rounded-lg bg-purple-50 p-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          Promotion Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-hidden border-t border-slate-200">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="px-4 py-3 font-semibold text-slate-700">
                  Promotion Type
                </TableHead>
                <TableHead className="px-4 py-3 text-center font-semibold text-slate-700">
                  % ACV
                </TableHead>
                <TableHead className="px-4 py-3 text-center font-semibold text-slate-700">
                  % Lift
                </TableHead>
                <TableHead className="px-4 py-3 text-center font-semibold text-slate-700">
                  Units
                </TableHead>
                <TableHead className="px-4 py-3 text-center font-semibold text-slate-700">
                  Dollars
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Show promotion rows if we have lift data */}
              {lift && Object.values(lift).map((value, i) => (
                <TableRow key={i} className={`transition-colors ${promotionColors[i]?.hover}`}>
                  <TableCell className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${promotionColors[i]?.bg}`}></div>
                      {getPromotionName(i)}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-slate-500">
                    {getACVValue(i)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-slate-500">
                    {value && typeof value === 'number' ? `${value.toFixed(2)}%` : '-'}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-slate-500">
                    {getUnitsValue(i)}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-center text-slate-500">
                    {getDollarsValue(i)}
                  </TableCell>
                </TableRow>
              ))}
              
              {/* Event Incremental Row */}
              <TableRow className="bg-purple-50/70 transition-colors hover:bg-purple-100/70">
                <TableCell className="px-4 py-3 font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    Event Incremental
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-slate-500">
                  -
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-slate-500">
                  {getEventIncrementalLift()}
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-slate-500">
                  {getEventIncrementalUnits()}
                </TableCell>
                <TableCell className="px-4 py-3 text-center text-slate-500">
                  {getEventIncrementalDollars()}
                </TableCell>
              </TableRow>
              
              {/* Event Total Row */}
              <TableRow className="border-t-2 border-slate-300 bg-slate-100/70 transition-colors hover:bg-slate-200/70">
                <TableCell className="px-4 py-3 font-bold">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                    Event Total
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold text-slate-500">
                  -
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold text-slate-500">
                  {getEventTotalLift()}
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold text-slate-500">
                  {getEventTotalUnits()}
                </TableCell>
                <TableCell className="px-4 py-3 text-center font-semibold text-slate-500">
                  {getEventTotalDollars()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    
  );
}
