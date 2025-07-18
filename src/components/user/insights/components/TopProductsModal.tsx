import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TopProduct } from '../types';

interface TopProductsModalProps {
  isOpen: boolean;
  onClose: () => void;
  topProducts: TopProduct[];
}

export const TopProductsModal: React.FC<TopProductsModalProps> = ({
  isOpen,
  onClose,
  topProducts
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Top Performing Products
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-6">
          {topProducts.map((product, idx) => (
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
  );
};