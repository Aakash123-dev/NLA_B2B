import React from 'react';
import { 
  CheckCircle,
  XCircle,
  TrendingUp as Growth,
  DollarSign,
  Target,
  Package,
  Eye
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { WidgetData } from '../types';

interface MetricsWidgetsProps {
  widgetData: WidgetData;
  isTopProductsModalOpen: boolean;
  setIsTopProductsModalOpen: (open: boolean) => void;
}

export const MetricsWidgets: React.FC<MetricsWidgetsProps> = ({
  widgetData,
  isTopProductsModalOpen,
  setIsTopProductsModalOpen
}) => {
  return (
    <div className="w-full px-6 lg:px-12 py-6">
      <h2 className="text-lg font-semibold mb-6 text-slate-800">Key Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {/* Elastic Products Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-emerald-50 to-green-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-900">{widgetData.elasticProducts}</div>
              <div className="text-sm font-medium text-emerald-700">Elastic Products</div>
              <div className="text-xs text-emerald-600">Price sensitive items</div>
            </div>
          </CardContent>
        </Card>

        {/* Inelastic Products Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-red-50 to-rose-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-rose-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-red-900">{widgetData.inelasticProducts}</div>
              <div className="text-sm font-medium text-red-700">Inelastic Products</div>
              <div className="text-xs text-red-600">Price stable items</div>
            </div>
          </CardContent>
        </Card>

        {/* Growth Percentage Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Growth className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-900">{widgetData.growthPercentage}%</div>
              <div className="text-sm font-medium text-blue-700">Growth Percentage</div>
              <div className="text-xs text-blue-600">Month over month</div>
            </div>
          </CardContent>
        </Card>

        {/* Total Sales Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-50 to-violet-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-900">${(widgetData.totalSales / 1000000).toFixed(1)}M</div>
              <div className="text-sm font-medium text-purple-700">Total Sales</div>
              <div className="text-xs text-purple-600">Revenue generated</div>
            </div>
          </CardContent>
        </Card>

        {/* Recommended Uplift Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-amber-900">{widgetData.recommendedUplift}%</div>
              <div className="text-sm font-medium text-amber-700">Recommended Uplift</div>
              <div className="text-xs text-amber-600">Optimized pricing</div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Products Card */}
        <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-50 to-rose-100 border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-fuchsia-600/10"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-full -translate-y-4 translate-x-4"></div>
          <CardContent className="relative p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gradient-to-br from-pink-500 to-fuchsia-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-pink-900">{widgetData.topProducts.length}</div>
                  <div className="text-sm font-medium text-pink-700">Top Products</div>
                </div>
                <Dialog open={isTopProductsModalOpen} onOpenChange={setIsTopProductsModalOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full px-4 py-1.5 bg-gradient-to-r from-pink-50 to-fuchsia-50 border-pink-200 text-pink-700 hover:from-pink-100 hover:to-fuchsia-100 hover:border-pink-300 hover:text-fuchsia-800 transition-all duration-300 shadow hover:shadow-md hover:-translate-y-0.5 transform"
                    >
                      <div className="h-4 w-4 rounded-full bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center mr-1.5">
                        <Eye className="w-2.5 h-2.5 text-white" />
                      </div>
                      View
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-semibold text-slate-800">Top Performing Products</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-6">
                      {widgetData.topProducts.map((product, idx) => (
                        <Card key={idx} className="border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="space-y-3 flex-1">
                                <div>
                                  <h3 className="font-semibold text-lg text-slate-900">{product.name}</h3>
                                  <p className="text-sm text-slate-600">{product.category}</p>
                                </div>
                                
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Price</p>
                                    <p className="font-semibold text-slate-900">{product.price}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Units Sold</p>
                                    <p className="font-semibold text-slate-900">{product.units}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Revenue</p>
                                    <p className="font-semibold text-slate-900">{product.revenue}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 mb-1">Growth</p>
                                    <p className="font-semibold text-green-600">{product.metric}</p>
                                  </div>
                                </div>
                              </div>
                              
                              <Badge 
                                variant="outline"
                                className={`ml-4 ${
                                  product.performance === 'High Volume' ? 'border-blue-200 text-blue-700 bg-blue-50' :
                                  product.performance === 'High Margin' ? 'border-green-200 text-green-700 bg-green-50' :
                                  product.performance === 'Trending Up' ? 'border-purple-200 text-purple-700 bg-purple-50' :
                                  product.performance === 'Stable Growth' ? 'border-amber-200 text-amber-700 bg-amber-50' :
                                  'border-indigo-200 text-indigo-700 bg-indigo-50'
                                }`}
                              >
                                {product.performance}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-xs text-slate-600">Click to view details</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
