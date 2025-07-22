'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  Users, 
  PieChart, 
  LineChart,
  ChevronDown,
  ChevronUp,
  Calculator,
  Target,
  Percent,
  Activity,
  Info,
  Zap
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell, 
  LineChart as RechartsLineChart, 
  Line,
  ComposedChart,
  Area,
  AreaChart
} from 'recharts';

interface Product {
  id: number;
  name: string;
  latestPrice: number;
  totalUnits: number;
  totalDollars: number;
  newPrice: string;
  newUnits: string;
  changeInUnits: string;
  percentChangeUnits: string;
  newDollars: string;
  changeInDollars: string;
  percentChangeDollars: string;
}

interface MarginData {
  costPerUnit: number;
  currentMargin: number;
  projectedMargin: number;
  marginChange: number;
  marginPercentChange: number;
  grossProfit: number;
  projectedGrossProfit: number;
}

interface ProductSectionProps {
  products: Product[];
  onPriceChange: (productId: number, newPrice: string) => void;
}

export function ProductSection({ products, onPriceChange }: ProductSectionProps) {
  const [expandedProducts, setExpandedProducts] = useState<Set<number>>(new Set());
  const [marginInputs, setMarginInputs] = useState<Record<number, { costPerUnit: number; targetMargin: number }>>({});

  const toggleProductExpansion = (productId: number) => {
    const newExpanded = new Set(expandedProducts);
    if (newExpanded.has(productId)) {
      newExpanded.delete(productId);
    } else {
      newExpanded.add(productId);
      // Initialize margin data if not exists
      if (!marginInputs[productId]) {
        const product = products.find(p => p.id === productId);
        setMarginInputs(prev => ({
          ...prev,
          [productId]: {
            costPerUnit: product ? Math.round(product.latestPrice * 0.6 * 100) / 100 : 0,
            targetMargin: 35
          }
        }));
      }
    }
    setExpandedProducts(newExpanded);
  };

  const updateMarginInput = (productId: number, field: 'costPerUnit' | 'targetMargin', value: number) => {
    setMarginInputs(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value
      }
    }));
  };

  const calculateMarginData = (product: Product): MarginData => {
    const inputs = marginInputs[product.id];
    if (!inputs) return {
      costPerUnit: 0,
      currentMargin: 0,
      projectedMargin: 0,
      marginChange: 0,
      marginPercentChange: 0,
      grossProfit: 0,
      projectedGrossProfit: 0
    };

    const newPrice = parseFloat(product.newPrice) || product.latestPrice;
    const currentMargin = ((product.latestPrice - inputs.costPerUnit) / product.latestPrice) * 100;
    const projectedMargin = ((newPrice - inputs.costPerUnit) / newPrice) * 100;
    const marginChange = projectedMargin - currentMargin;
    const marginPercentChange = currentMargin !== 0 ? (marginChange / currentMargin) * 100 : 0;
    
    const grossProfit = (product.latestPrice - inputs.costPerUnit) * product.totalUnits;
    const newUnits = product.newUnits ? parseInt(product.newUnits.replace(/,/g, '')) : Math.round(product.totalUnits * 0.92);
    const projectedGrossProfit = (newPrice - inputs.costPerUnit) * newUnits;

    return {
      costPerUnit: inputs.costPerUnit,
      currentMargin,
      projectedMargin,
      marginChange,
      marginPercentChange,
      grossProfit,
      projectedGrossProfit
    };
  };

  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };

  const formatNumber = (value: number) => {
    return value.toLocaleString();
  };

  // Prepare chart data
  const prepareChartData = () => {
    return products.map((product, index) => {
      const newPrice = parseFloat(product.newPrice) || product.latestPrice;
      const newUnits = product.newUnits ? parseInt(product.newUnits.replace(/,/g, '')) : Math.round(product.totalUnits * 0.92);
      const newDollars = newUnits * newPrice;
      
      return {
        name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
        fullName: product.name,
        currentPrice: product.latestPrice,
        newPrice: newPrice,
        currentUnits: product.totalUnits,
        newUnits: newUnits,
        currentRevenue: product.totalDollars,
        newRevenue: newDollars,
        revenueChange: newDollars - product.totalDollars,
        unitsChange: newUnits - product.totalUnits,
        priceChange: newPrice - product.latestPrice,
        id: product.id,
        color: `hsl(${(index * 137.5) % 360}, 70%, 60%)` // Golden ratio color distribution
      };
    });
  };

  const chartData = prepareChartData();

  // Chart configurations
  const chartConfig = {
    currentRevenue: { label: 'Current Revenue', color: '#3b82f6' },
    newRevenue: { label: 'Projected Revenue', color: '#10b981' },
    currentUnits: { label: 'Current Units', color: '#6366f1' },
    newUnits: { label: 'Projected Units', color: '#f59e0b' },
    currentPrice: { label: 'Current Price', color: '#ef4444' },
    newPrice: { label: 'New Price', color: '#8b5cf6' }
  };

  const pieChartData = chartData.map(item => ({
    name: item.name,
    value: item.currentRevenue,
    color: item.color
  }));

  const revenueComparisonData = chartData.map(item => ({
    name: item.name,
    current: item.currentRevenue,
    projected: item.newRevenue,
    change: item.revenueChange
  }));

  const priceImpactData = chartData.map(item => ({
    name: item.name,
    priceChange: ((item.newPrice - item.currentPrice) / item.currentPrice * 100).toFixed(1),
    unitsChange: ((item.newUnits - item.currentUnits) / item.currentUnits * 100).toFixed(1),
    revenueChange: ((item.newRevenue - item.currentRevenue) / item.currentRevenue * 100).toFixed(1)
  }));

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="bg-white/98 backdrop-blur-md border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-50/80 to-blue-50/80 border-b border-indigo-100/50 px-6 py-5">
            <CardTitle className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-indigo-100 rounded-xl">
                <BarChart3 className="w-5 h-5 text-indigo-600" />
              </div>
              Product Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gradient-to-r from-slate-50/80 to-gray-50/80 border-b border-slate-200/60">
                  <tr>
                    <th className="text-left px-6 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-80">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-slate-500" />
                        Product
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="w-4 h-4 text-green-500" />
                        Latest Price
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="w-4 h-4 text-blue-500" />
                        <div>
                          Total Units
                          <br/>
                          <span className="text-[10px] text-slate-500 normal-case">(Last 52 Weeks)</span>
                        </div>
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        Total Dollars
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-32">
                      <div className="flex items-center justify-center gap-1">
                        <DollarSign className="w-4 h-4 text-indigo-500" />
                        New Price
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">New Units</th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingDown className="w-4 h-4 text-red-500" />
                        Change Units
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">% Change</th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        New Dollars
                      </div>
                    </th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-28">Change $</th>
                    <th className="text-center px-4 py-5 text-xs font-semibold text-slate-700 uppercase tracking-wider w-24">% Change</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60 bg-white">
                  {products.map((product, index) => {
                    const isExpanded = expandedProducts.has(product.id);
                    const marginData = calculateMarginData(product);
                    
                    return (
                      <React.Fragment key={product.id}>
                        <motion.tr 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className="hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-blue-50/30 transition-all duration-200 group cursor-pointer"
                          onClick={() => toggleProductExpansion(product.id)}
                        >
                          <td className="px-6 py-6">
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-8 w-8 rounded-full hover:bg-indigo-100"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-indigo-600" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-slate-600" />
                                )}
                              </Button>
                              <div className="text-sm text-slate-900 font-medium leading-5 line-clamp-3">
                                {product.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/50 rounded-lg">
                              <span className="text-sm font-bold text-green-700">
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
                          <td className="px-4 py-6" onClick={(e) => e.stopPropagation()}>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="$0.00"
                              value={product.newPrice}
                              onChange={(e) => onPriceChange(product.id, e.target.value)}
                              className="w-full text-center text-sm border-slate-200 rounded-lg focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all bg-white/80"
                            />
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className="text-sm font-semibold text-slate-700">
                              {product.newUnits || (product.newPrice ? `${Math.round(product.totalUnits * 0.92).toLocaleString()}` : '—')}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className={`text-sm font-semibold ${product.changeInUnits || product.newPrice ? 'text-red-600' : 'text-slate-400'}`}>
                              {product.changeInUnits || (product.newPrice ? `-${Math.round(product.totalUnits * 0.08).toLocaleString()}` : '—')}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              product.percentChangeUnits || product.newPrice 
                                ? 'bg-gradient-to-r from-red-50 to-red-100 text-red-700 border border-red-200/50' 
                                : 'bg-slate-50 text-slate-400'
                            }`}>
                              {product.percentChangeUnits || (product.newPrice ? '-8.2%' : '—')}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className="text-sm font-semibold text-slate-700">
                              {product.newDollars || (product.newPrice ? `$${Math.round(product.totalUnits * 0.92 * parseFloat(product.newPrice)).toLocaleString()}` : '—')}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className={`text-sm font-semibold ${product.changeInDollars || product.newPrice ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {product.changeInDollars || (product.newPrice ? `+$${Math.round((product.totalUnits * 0.92 * parseFloat(product.newPrice)) - product.totalDollars).toLocaleString()}` : '—')}
                            </div>
                          </td>
                          <td className="px-4 py-6 text-center">
                            <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                              product.percentChangeDollars || product.newPrice 
                                ? 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border border-emerald-200/50' 
                                : 'bg-slate-50 text-slate-400'
                            }`}>
                              {product.percentChangeDollars || (product.newPrice ? '+12.8%' : '—')}
                            </div>
                          </td>
                        </motion.tr>
                        
                        {/* Expanded Margin Analysis Section */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.tr
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <td colSpan={11} className="px-0 py-0 bg-gradient-to-br from-indigo-50/50 to-blue-50/50 border-b border-indigo-100/50">
                                <div className="p-8">
                                  <div className="max-w-7xl mx-auto">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-6">
                                      <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                                        <Calculator className="w-6 h-6 text-white" />
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-bold text-slate-800">Margin Analysis</h3>
                                        <p className="text-sm text-slate-600">Test and optimize your profit margins</p>
                                      </div>
                                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                                        Interactive Testing
                                      </Badge>
                                    </div>

                                    {/* Margin Configuration & Results */}
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                      {/* Configuration Panel */}
                                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm rounded-2xl">
                                        <CardHeader className="pb-4">
                                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                                            <Zap className="w-5 h-5 text-amber-500" />
                                            Configuration
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-6">
                                          <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                              Cost Per Unit
                                            </label>
                                            <div className="relative">
                                              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                              <Input
                                                type="number"
                                                step="0.01"
                                                value={marginInputs[product.id]?.costPerUnit || 0}
                                                onChange={(e) => updateMarginInput(product.id, 'costPerUnit', parseFloat(e.target.value) || 0)}
                                                className="pl-10 bg-white border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                                                placeholder="0.00"
                                              />
                                            </div>
                                          </div>
                                          
                                          <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-3">
                                              Target Margin: {marginInputs[product.id]?.targetMargin || 35}%
                                            </label>
                                            <Slider
                                              value={[marginInputs[product.id]?.targetMargin || 35]}
                                              onValueChange={([value]) => updateMarginInput(product.id, 'targetMargin', value)}
                                              max={80}
                                              min={5}
                                              step={1}
                                              className="w-full"
                                            />
                                            <div className="flex justify-between text-xs text-slate-500 mt-1">
                                              <span>5%</span>
                                              <span>80%</span>
                                            </div>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Current vs Projected Metrics */}
                                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm rounded-2xl">
                                        <CardHeader className="pb-4">
                                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                                            <Target className="w-5 h-5 text-blue-500" />
                                            Margin Metrics
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                                              <p className="text-xs font-medium text-blue-600 mb-1">Current Margin</p>
                                              <p className="text-2xl font-bold text-blue-800">
                                                {marginData.currentMargin.toFixed(1)}%
                                              </p>
                                            </div>
                                            <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                                              <p className="text-xs font-medium text-emerald-600 mb-1">Projected Margin</p>
                                              <p className="text-2xl font-bold text-emerald-800">
                                                {marginData.projectedMargin.toFixed(1)}%
                                              </p>
                                            </div>
                                          </div>
                                          
                                          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200/50">
                                            <div className="flex items-center justify-between">
                                              <p className="text-xs font-medium text-purple-600">Margin Change</p>
                                              <Badge 
                                                variant={marginData.marginChange >= 0 ? "default" : "destructive"}
                                                className={marginData.marginChange >= 0 
                                                  ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                                                  : "bg-red-100 text-red-700 border-red-200"
                                                }
                                              >
                                                {marginData.marginChange >= 0 ? '+' : ''}{marginData.marginChange.toFixed(1)}%
                                              </Badge>
                                            </div>
                                            <p className="text-xl font-bold text-purple-800 mt-1">
                                              {marginData.marginPercentChange >= 0 ? '+' : ''}{marginData.marginPercentChange.toFixed(1)}%
                                            </p>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Profit Impact */}
                                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm rounded-2xl">
                                        <CardHeader className="pb-4">
                                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-emerald-500" />
                                            Profit Impact
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                          <div className="p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl border border-emerald-200/50">
                                            <p className="text-xs font-medium text-emerald-600 mb-1">Current Gross Profit</p>
                                            <p className="text-xl font-bold text-emerald-800">
                                              ${marginData.grossProfit.toLocaleString()}
                                            </p>
                                          </div>
                                          
                                          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
                                            <p className="text-xs font-medium text-blue-600 mb-1">Projected Gross Profit</p>
                                            <p className="text-xl font-bold text-blue-800">
                                              ${marginData.projectedGrossProfit.toLocaleString()}
                                            </p>
                                          </div>
                                          
                                          <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200/50">
                                            <p className="text-xs font-medium text-amber-600 mb-1">Profit Change</p>
                                            <p className={`text-xl font-bold ${
                                              (marginData.projectedGrossProfit - marginData.grossProfit) >= 0 
                                                ? 'text-emerald-800' 
                                                : 'text-red-800'
                                            }`}>
                                              {(marginData.projectedGrossProfit - marginData.grossProfit) >= 0 ? '+' : ''}
                                              ${(marginData.projectedGrossProfit - marginData.grossProfit).toLocaleString()}
                                            </p>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Visual Charts */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                      {/* Margin Comparison Chart */}
                                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm rounded-2xl">
                                        <CardHeader className="pb-4">
                                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                                            <BarChart3 className="w-5 h-5 text-indigo-500" />
                                            Margin Comparison
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                              <BarChart
                                                data={[
                                                  {
                                                    name: 'Current',
                                                    margin: marginData.currentMargin,
                                                    profit: marginData.grossProfit / 1000
                                                  },
                                                  {
                                                    name: 'Projected',
                                                    margin: marginData.projectedMargin,
                                                    profit: marginData.projectedGrossProfit / 1000
                                                  }
                                                ]}
                                              >
                                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <ChartTooltip
                                                  content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                      const marginValue = payload[0]?.value;
                                                      const profitValue = payload[1]?.value;
                                                      return (
                                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                                                          <p className="font-medium text-slate-800">{label}</p>
                                                          <p className="text-indigo-600">
                                                            Margin: {typeof marginValue === 'number' ? marginValue.toFixed(1) : marginValue}%
                                                          </p>
                                                          <p className="text-emerald-600">
                                                            Profit: ${typeof profitValue === 'number' ? (profitValue * 1000).toLocaleString() : 'N/A'}
                                                          </p>
                                                        </div>
                                                      );
                                                    }
                                                    return null;
                                                  }}
                                                />
                                                <Bar dataKey="margin" fill="#6366f1" radius={[4, 4, 0, 0]} />
                                                <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                                              </BarChart>
                                            </ResponsiveContainer>
                                          </div>
                                        </CardContent>
                                      </Card>

                                      {/* Price Elasticity Visualization */}
                                      <Card className="bg-white/80 backdrop-blur-sm border-slate-200/50 shadow-sm rounded-2xl">
                                        <CardHeader className="pb-4">
                                          <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                                            <LineChart className="w-5 h-5 text-purple-500" />
                                            Price Elasticity
                                          </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                          <div className="h-64">
                                            <ResponsiveContainer width="100%" height="100%">
                                              <RechartsLineChart
                                                data={[
                                                  { price: product.latestPrice * 0.9, units: product.totalUnits * 1.1, revenue: (product.latestPrice * 0.9) * (product.totalUnits * 1.1) },
                                                  { price: product.latestPrice, units: product.totalUnits, revenue: product.totalDollars },
                                                  { price: parseFloat(product.newPrice) || product.latestPrice, units: Math.round(product.totalUnits * 0.92), revenue: (parseFloat(product.newPrice) || product.latestPrice) * Math.round(product.totalUnits * 0.92) },
                                                  { price: product.latestPrice * 1.1, units: product.totalUnits * 0.85, revenue: (product.latestPrice * 1.1) * (product.totalUnits * 0.85) }
                                                ]}
                                              >
                                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                                <XAxis dataKey="price" tickFormatter={(value) => `$${value.toFixed(2)}`} />
                                                <YAxis />
                                                <ChartTooltip
                                                  content={({ active, payload, label }) => {
                                                    if (active && payload && payload.length) {
                                                      const priceValue = typeof label === 'string' ? parseFloat(label) : label;
                                                      const unitsValue = payload[0]?.value;
                                                      const revenueValue = payload[1]?.value;
                                                      return (
                                                        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
                                                          <p className="font-medium text-slate-800">Price: ${typeof priceValue === 'number' ? priceValue.toFixed(2) : 'N/A'}</p>
                                                          <p className="text-purple-600">
                                                            Units: {typeof unitsValue === 'number' ? unitsValue.toLocaleString() : unitsValue}
                                                          </p>
                                                          <p className="text-emerald-600">
                                                            Revenue: ${typeof revenueValue === 'number' ? revenueValue.toLocaleString() : 'N/A'}
                                                          </p>
                                                        </div>
                                                      );
                                                    }
                                                    return null;
                                                  }}
                                                />
                                                <Line type="monotone" dataKey="units" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }} />
                                                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
                                              </RechartsLineChart>
                                            </ResponsiveContainer>
                                          </div>
                                        </CardContent>
                                      </Card>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-end gap-3 mt-6">
                                      <Button
                                        variant="outline"
                                        className="bg-white/80 border-slate-300 text-slate-700 hover:bg-slate-50"
                                        onClick={() => toggleProductExpansion(product.id)}
                                      >
                                        <ChevronUp className="w-4 h-4 mr-2" />
                                        Collapse
                                      </Button>
                                      <Button
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                                      >
                                        <Target className="w-4 h-4 mr-2" />
                                        Apply Optimization
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Current Revenue</p>
                <p className="text-2xl font-bold text-blue-900">
                  ${chartData.reduce((sum, item) => sum + item.currentRevenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-600">Projected Revenue</p>
                <p className="text-2xl font-bold text-emerald-900">
                  ${chartData.reduce((sum, item) => sum + item.newRevenue, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200/50 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Revenue Change</p>
                <p className="text-2xl font-bold text-purple-900">
                  ${chartData.reduce((sum, item) => sum + item.revenueChange, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
