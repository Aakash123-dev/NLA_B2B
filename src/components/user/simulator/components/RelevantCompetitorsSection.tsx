'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users2, DollarSign, TrendingUp, TrendingDown, Package, Target } from 'lucide-react';

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

const competitorProducts: CompetitorProduct[] = [
  {
    id: 1,
    name: "Sweet Baby Ray's BBQ Pulled Pork Sandwich 16oz - SWEET BABY RAY'S",
    latestPrice: 8.99,
    totalUnits: 24856,
    totalDollars: 223456,
    newPrice: "9.49",
    newUnits: "22,885",
    changeInUnits: "-1,971",
    percentChangeUnits: "-7.9%",
    newDollars: "$217,181",
    changeInDollars: "-$6,275",
    percentChangeDollars: "-2.8%"
  },
  {
    id: 2,
    name: "KC Masterpiece BBQ Beef Brisket Entree 14oz - KC MASTERPIECE",
    latestPrice: 9.29,
    totalUnits: 18734,
    totalDollars: 174059,
    newPrice: "9.79",
    newUnits: "17,235",
    changeInUnits: "-1,499",
    percentChangeUnits: "-8.0%",
    newDollars: "$168,745",
    changeInDollars: "-$5,314",
    percentChangeDollars: "-3.1%"
  },
  {
    id: 3,
    name: "Hormel BBQ Pulled Chicken Bowl 12oz - HORMEL",
    latestPrice: 7.49,
    totalUnits: 31245,
    totalDollars: 234227,
    newPrice: "7.99",
    newUnits: "28,745",
    changeInUnits: "-2,500",
    percentChangeUnits: "-8.0%",
    newDollars: "$229,673",
    changeInDollars: "-$4,554",
    percentChangeDollars: "-1.9%"
  },
  {
    id: 4,
    name: "Lloyd's BBQ Shredded Beef Brisket 16oz - LLOYD'S",
    latestPrice: 8.79,
    totalUnits: 16892,
    totalDollars: 148521,
    newPrice: "9.29",
    newUnits: "15,541",
    changeInUnits: "-1,351",
    percentChangeUnits: "-8.0%",
    newDollars: "$144,376",
    changeInDollars: "-$4,145",
    percentChangeDollars: "-2.8%"
  },
  {
    id: 5,
    name: "Armour BBQ Pulled Pork 12oz - ARMOUR",
    latestPrice: 6.99,
    totalUnits: 28456,
    totalDollars: 198948,
    newPrice: "7.49",
    newUnits: "26,179",
    changeInUnits: "-2,277",
    percentChangeUnits: "-8.0%",
    newDollars: "$196,081",
    changeInDollars: "-$2,867",
    percentChangeDollars: "-1.4%"
  }
];

export function RelevantCompetitorsSection() {
  const [priceInputs, setPriceInputs] = useState<{[key: number]: string}>({});

  const handlePriceChange = (productId: number, newPrice: string) => {
    setPriceInputs(prev => ({
      ...prev,
      [productId]: newPrice
    }));
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card className="bg-white/98 backdrop-blur-md border-0 shadow-lg rounded-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50/80 to-violet-50/80 border-b border-purple-100/50 px-6 py-5">
          <CardTitle className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-xl">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            Relevant Competitors
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gradient-to-r from-violet-50/80 to-purple-50/80 border-b border-violet-200/60">
                <tr>
                  <th className="text-left px-6 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-80">
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-violet-500" />
                      Product
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-24">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-4 h-4 text-orange-500" />
                      Latest Price
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-28">
                    <div className="flex items-center justify-center gap-1">
                      <Users2 className="w-4 h-4 text-blue-500" />
                      <div>
                        Total Units
                        <br/>
                        <span className="text-[10px] text-violet-500 normal-case">(Last 52 Weeks)</span>
                      </div>
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-28">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-4 h-4 text-emerald-500" />
                      Total Dollars
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-32">
                    <div className="flex items-center justify-center gap-1">
                      <DollarSign className="w-4 h-4 text-purple-500" />
                      New Price
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-24">New Units</th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-28">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingDown className="w-4 h-4 text-red-500" />
                      Change Units
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-24">% Change</th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-28">
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      New Dollars
                    </div>
                  </th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-28">Change $</th>
                  <th className="text-center px-4 py-5 text-xs font-semibold text-violet-700 uppercase tracking-wider w-24">% Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-violet-100/60 bg-white">
                {competitorProducts.map((product, index) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gradient-to-r hover:from-purple-50/30 hover:to-violet-50/30 transition-all duration-200 group"
                  >
                    <td className="px-6 py-6">
                      <div className="text-sm text-slate-900 font-medium leading-5 line-clamp-3">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/50 rounded-lg">
                        <span className="text-sm font-bold text-orange-700">
                          ${product.latestPrice.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="text-sm font-semibold text-slate-800">
                        {formatNumber(product.totalUnits)}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="text-sm font-semibold text-slate-800">
                        {formatCurrency(product.totalDollars)}
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="$0.00"
                        value={priceInputs[product.id] || product.newPrice || ''}
                        onChange={(e) => handlePriceChange(product.id, e.target.value)}
                        className="w-full text-center text-sm border-violet-200 rounded-lg focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all bg-white/80"
                      />
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="text-sm font-semibold text-slate-700">
                        {priceInputs[product.id] ? `${Math.round(product.totalUnits * 0.94).toLocaleString()}` : (product.newUnits || '—')}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className={`text-sm font-semibold ${priceInputs[product.id] || product.changeInUnits ? 'text-red-600' : 'text-slate-400'}`}>
                        {priceInputs[product.id] ? `-${Math.round(product.totalUnits * 0.06).toLocaleString()}` : (product.changeInUnits || '—')}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        priceInputs[product.id] || product.percentChangeUnits 
                          ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200/50' 
                          : 'bg-slate-50 text-slate-400'
                      }`}>
                        {priceInputs[product.id] ? '-6.1%' : (product.percentChangeUnits || '—')}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className="text-sm font-semibold text-slate-700">
                        {priceInputs[product.id] ? `$${Math.round(product.totalUnits * 0.94 * parseFloat(priceInputs[product.id])).toLocaleString()}` : (product.newDollars || '—')}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className={`text-sm font-semibold ${priceInputs[product.id] || product.changeInDollars ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {priceInputs[product.id] ? `+$${Math.round((product.totalUnits * 0.94 * parseFloat(priceInputs[product.id])) - product.totalDollars).toLocaleString()}` : (product.changeInDollars || '—')}
                      </div>
                    </td>
                    <td className="px-4 py-6 text-center">
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                        priceInputs[product.id] || product.percentChangeDollars 
                          ? 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border border-emerald-200/50' 
                          : 'bg-slate-50 text-slate-400'
                      }`}>
                        {priceInputs[product.id] ? '+8.5%' : (product.percentChangeDollars || '—')}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
