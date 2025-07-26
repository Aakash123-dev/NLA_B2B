'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Calculator, 
  Target, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  BarChart3
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Product, MarginData, MarginInputs } from '../types/product';

interface MarginAnalysisSectionProps {
  product: Product;
  marginData: MarginData;
  marginInputs: MarginInputs | undefined;
  updateMarginInput: (productId: number, field: 'costPerUnit' | 'targetMargin', value: number) => void;
  toggleProductExpansion: (productId: number) => void;
}

export function MarginAnalysisSection({
  product,
  marginData,
  marginInputs,
  updateMarginInput,
  toggleProductExpansion
}: MarginAnalysisSectionProps) {
  const [formData, setFormData] = useState({
    bestPrice: '',
    listPrice: '',
    dollarValue: '',
    edlpSpend: '',
    netUnitPrice: '0',
    cogs: '',
    basePriceElasticity: '0.00',
    basePrice: '0.00'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Comparison chart data
  const comparisonData = [
    {
      name: 'My Product',
      currentPrice: product.latestPrice,
      projectedPrice: parseFloat(product.newPrice) || product.latestPrice,
      margin: marginData.currentMargin,
      projectedMargin: marginData.projectedMargin
    },
    {
      name: 'Competitor A',
      currentPrice: product.latestPrice * 1.05,
      projectedPrice: product.latestPrice * 1.08,
      margin: marginData.currentMargin * 0.9,
      projectedMargin: marginData.currentMargin * 0.95
    },
    {
      name: 'Competitor B',
      currentPrice: product.latestPrice * 0.92,
      projectedPrice: product.latestPrice * 0.94,
      margin: marginData.currentMargin * 1.1,
      projectedMargin: marginData.currentMargin * 1.05
    }
  ];

  const colors = ['#3b82f6', '#10b981', '#f59e0b'];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-white">
      <div className="w-full px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Margin Analysis</h2>
            <p className="text-gray-600">Compare pricing strategies and optimize margins</p>
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-blue-600 font-medium">Revenue Impact</p>
                  <p className="text-lg font-bold text-blue-900">+12.4%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-green-600 font-medium">Margin Improvement</p>
                  <p className="text-lg font-bold text-green-900">+8.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-orange-600 font-medium">Units Sold</p>
                  <p className="text-lg font-bold text-orange-900">-3.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 rounded-xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <TrendingDown className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-600 font-medium">Market Share</p>
                  <p className="text-lg font-bold text-purple-900">-1.2%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side - Comparison Chart */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl h-[500px] flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-100 flex-shrink-0">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Price & Margin Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-6 flex flex-col min-h-0">
              <div className="flex-1 min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={comparisonData} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    barCategoryGap="20%"
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      height={40}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      width={50}
                    />
                    <Bar dataKey="currentPrice" radius={[4, 4, 0, 0]} name="Current Price" fill="#3b82f6" opacity={0.7} />
                    <Bar dataKey="projectedPrice" radius={[4, 4, 0, 0]} name="Projected Price" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 opacity-70 rounded"></div>
                  <span className="text-sm text-gray-600">Current Price</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span className="text-sm text-gray-600">Projected Price</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Metrics Table */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl h-[500px] flex flex-col">
            <CardHeader className="pb-3 border-b border-gray-100 flex-shrink-0">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Pricing Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                
                {/* Best Price */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">Best Price</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.bestPrice}
                      onChange={(e) => handleInputChange('bestPrice', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* List Price */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">List Price</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.listPrice}
                      onChange={(e) => handleInputChange('listPrice', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Dollar Value */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">Enter Value</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.dollarValue}
                      onChange={(e) => handleInputChange('dollarValue', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* EDLP Spend */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">EDLP Spend</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.edlpSpend}
                      onChange={(e) => handleInputChange('edlpSpend', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Net Unit Price - Now Editable */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">Net Unit Price</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cogs}
                      onChange={(e) => handleInputChange('cogs', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* COGS */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">COGS</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cogs}
                      onChange={(e) => handleInputChange('cogs', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Base Price Elasticity */}
                <div className="flex items-center justify-between py-1.5 border-b border-gray-100">
                  <label className="text-sm font-medium text-gray-700">Base Price Elasticity</label>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cogs}
                      onChange={(e) => handleInputChange('cogs', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Base Price */}
                <div className="flex items-center justify-between py-1.5">
                  <label className="text-sm font-medium text-gray-700">Base Price</label>
                  <div className="flex items-center gap-2">
                   <DollarSign className="w-4 h-4 text-gray-900" />
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.cogs}
                      onChange={(e) => handleInputChange('cogs', e.target.value)}
                      className="w-20 h-7 text-xs text-right border-gray-200 rounded-md"
                      placeholder="0.00"
                    />
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Tables Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* First Table - Manufacturer Data */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                Manufacturer Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-700">Product Name</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Net Unit Price ($)</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Total EDLP Spend ($)</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Manufacturer Margin %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-sm font-medium text-blue-700">
                          ${parseFloat(formData.netUnitPrice || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-green-50 border border-green-200 rounded-lg">
                        <span className="text-sm font-medium text-green-700">
                          ${parseFloat(formData.edlpSpend || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-purple-50 border border-purple-200 rounded-lg">
                        <span className="text-sm font-medium text-purple-700">
                          {marginData.currentMargin.toFixed(1)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Second Table - Retailer Data */}
          <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
            <CardHeader className="pb-4 border-b border-gray-100">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Retailer Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-left font-semibold text-gray-700">Product Name</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Net Unit Price ($)</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Base Price ($)</TableHead>
                    <TableHead className="text-center font-semibold text-gray-700">Retailer Margin %</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="hover:bg-gray-50">
                    <TableCell className="font-medium text-gray-900">{product.name}</TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg">
                        <span className="text-sm font-medium text-blue-700">
                          ${parseFloat(formData.netUnitPrice || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-orange-50 border border-orange-200 rounded-lg">
                        <span className="text-sm font-medium text-orange-700">
                          ${parseFloat(formData.basePrice || '0').toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="inline-flex items-center px-2 py-1 bg-emerald-50 border border-emerald-200 rounded-lg">
                        <span className="text-sm font-medium text-emerald-700">
                          {((parseFloat(formData.basePrice || '0') - parseFloat(formData.netUnitPrice || '0')) / parseFloat(formData.basePrice || '1') * 100).toFixed(1)}%
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
