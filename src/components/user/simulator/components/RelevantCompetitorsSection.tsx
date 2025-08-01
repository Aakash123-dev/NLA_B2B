'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Users2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  Target,
} from 'lucide-react';

interface CompetitorProduct {
  id: number;
  name: string;
  latestPrice: number;
  totalUnits: number;
  totalDollars: number;
  newPrice?: string;
  newUnits?: string;
  changeInUnits?: string;
  percentChangeUnits?: string;
  newDollars?: string;
  changeInDollars?: string;
  percentChangeDollars?: string;
}

export function RelevantCompetitorsSection({
  type,
  newPrice,
  filteredSelectedPriceProducts,
  handleNewPriceChange,
  showResults,
  selctedProducts,
}) {
 console.log(filteredSelectedPriceProducts, "allFilteredPriceProducts")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-white/98 overflow-hidden rounded-2xl border-0 shadow-lg backdrop-blur-md">
        <CardHeader className="border-b border-purple-100/50 bg-gradient-to-r from-purple-50/80 to-violet-50/80 px-6 py-5">
          <CardTitle className="flex items-center gap-3 text-xl font-bold tracking-tight text-gray-900">
            <div className="rounded-xl bg-purple-100 p-2">
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            Relevant Competitors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="border-b border-violet-200/60 bg-gradient-to-r from-violet-50/80 to-purple-50/80">
                <tr>
                  <th className="w-80 px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-violet-500" />
                      Product
                    </div>
                  </th>
                  <th className="w-24 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="h-4 w-4 text-orange-500" />
                      Latest Price
                    </div>
                  </th>
                  <th className="w-28 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <Users2 className="h-4 w-4 text-blue-500" />
                      <div>
                        Total Units
                        <br />
                        <span className="text-[10px] normal-case text-violet-500">
                          (Last 52 Weeks)
                        </span>
                      </div>
                    </div>
                  </th>
                  <th className="w-28 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Total Dollars
                    </div>
                  </th>
                  <th className="w-32 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="h-4 w-4 text-purple-500" />
                      New Price
                    </div>
                  </th>
                  <th className="w-24 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    New Units
                  </th>
                  <th className="w-28 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      Change Units
                    </div>
                  </th>
                  <th className="w-24 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    % Change
                  </th>
                  <th className="w-28 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      New Dollars
                    </div>
                  </th>
                  <th className="w-28 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    Change $
                  </th>
                  <th className="w-24 px-4 py-5 text-center text-xs font-semibold uppercase tracking-wider text-violet-700">
                    % Change
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100/60 bg-white">
                {filteredSelectedPriceProducts?.map((product, index) => {
                  const { Price_avg_last_4_weeks, total_units_sum } = product;
                  const totalVolumeSum = parseFloat(total_units_sum);
                  const totalVolume = totalVolumeSum * Price_avg_last_4_weeks;
                  return (
                    <motion.tr
                      key={product._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="group transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-violet-50/30"
                    >
                      <td className="px-6 py-6">
                        <div className="line-clamp-3 text-sm font-medium leading-5 text-slate-900">
                          {product?.Product}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div className="inline-flex items-center rounded-lg border border-orange-200/50 bg-gradient-to-r from-orange-50 to-amber-50 px-3 py-1.5">
                          <span className="text-sm font-bold text-orange-700">
                            {!isNaN(Price_avg_last_4_weeks)
                              ? '$' +
                                Price_avg_last_4_weeks.toFixed(
                                  2
                                ).toLocaleString()
                              : '-'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div className="text-sm font-semibold text-slate-800">
                          {!isNaN(total_units_sum)
                            ? Math.round(total_units_sum).toLocaleString()
                            : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div className="text-sm font-semibold text-slate-800">
                          {'$' +
                            (!isNaN(totalVolume)
                              ? Math.round(totalVolume).toLocaleString()
                              : '-')}
                        </div>
                      </td>
                      <td className="px-4 py-6">
                        <Input
                          type="text"
                          inputMode="decimal"
                          placeholder="Enter new price:($)"
                          value={
                            newPrice[index]
                              ? newPrice[index]
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                              : ''
                          }
                          onChange={(event) => {
                            const value = event.target.value.replace(/,/g, '');
                            if (!isNaN(value)) {
                              handleNewPriceChange(index, value, product, type);
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === '-') {
                              e.preventDefault();
                            }
                          }}
                          className="w-full rounded-lg border-violet-200 bg-white/80 text-center text-sm transition-all focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                        />
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div className="text-sm font-semibold text-slate-700">
                          {newPrice[index] && !showResults
                            ? Math.round(product?.newVolume).toLocaleString()
                            : showResults && product?.percentageChangeInVolume
                              ? Math.round(product?.newVolume).toLocaleString()
                              : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`text-sm font-semibold ${newPrice ? 'text-red-600' : 'text-slate-400'}`}
                        >
                          {newPrice[index] && !showResults
                            ? Math.round(
                                product?.changeInVolume
                              ).toLocaleString()
                            : showResults && product?.changeInVolume
                              ? Math.round(
                                  product?.changeInVolume
                                ).toLocaleString()
                              : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                            newPrice[product._id]
                              ? 'border border-red-200/50 bg-gradient-to-r from-red-50 to-red-100 text-red-700'
                              : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          {newPrice[index] && !showResults
                            ? product?.percentageChangeInVolume?.toFixed(2) +
                              '%'
                            : showResults && product?.percentageChangeInVolume
                              ? product?.percentageChangeInVolume?.toFixed(2) +
                                '%'
                              : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div className="text-sm font-semibold text-slate-700">
                          {newPrice[index] && !showResults
                            ? '$' +
                              Math.round(product?.newDollars).toLocaleString()
                            : showResults && product?.percentageChangeInVolume
                              ? '$' +
                                Math.round(product?.newDollars).toLocaleString()
                              : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`text-sm font-semibold ${newPrice[product._id] ? 'text-emerald-600' : 'text-slate-400'}`}
                        >
                          {newPrice[index] && !showResults
                            ? '$' +
                              Math.round(
                                product?.changeInDollars
                              ).toLocaleString()
                            : showResults && product?.percentageChangeInVolume
                              ? '$' +
                                Math.round(
                                  product?.changeInDollars
                                ).toLocaleString()
                              : '-'}
                        </div>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <div
                          className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
                            newPrice[product._id]
                           
                              ? 'border border-emerald-200/50 bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700'
                              : 'bg-slate-50 text-slate-400'
                          }`}
                        >
                          {newPrice[index] && !showResults
                            ? product?.percentageChangeInDollars?.toFixed(2) +
                              '%'
                            : showResults && product?.percentageChangeInVolume
                              ? product?.percentageChangeInDollars?.toFixed(2) +
                                '%'
                              : '-'}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
