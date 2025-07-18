'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Star } from 'lucide-react';
import { allProducts } from '../data/mockData';

export const ProductsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-400 to-cyan-300 bg-clip-text text-transparent">
            All Products
          </h2>
          <p className="text-xl text-gray-300">
            Comprehensive suite of business analytics tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {allProducts.map((product, index) => {
            const Icon = product.icon;
            const colors = [
              { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40', shadow: 'hover:shadow-blue-500/20' },
              { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/20', hover: 'hover:border-purple-500/40', shadow: 'hover:shadow-purple-500/20' },
              { bg: 'bg-emerald-500/10', text: 'text-emerald-500', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40', shadow: 'hover:shadow-emerald-500/20' },
              { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/20', hover: 'hover:border-cyan-500/40', shadow: 'hover:shadow-cyan-500/20' }
            ];
            const colorScheme = colors[index % colors.length];
            
            return (
              <Card 
                key={product.id} 
                className={`bg-[#0C0E22]/80 backdrop-blur-sm ${colorScheme.border} ${colorScheme.hover} transition-all duration-300 hover:shadow-2xl ${colorScheme.shadow} rounded-2xl relative group`}
              >
                {product.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 font-semibold shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 ${colorScheme.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${colorScheme.text}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-white">{product.name}</CardTitle>
                  <p className="text-gray-400 text-sm">{product.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <ul className="space-y-2">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <CheckCircle className={`w-4 h-4 ${colorScheme.text} mr-2`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className={`w-full ${colorScheme.bg} hover:bg-opacity-30 ${colorScheme.text} border ${colorScheme.border} rounded-xl transition-all duration-300 hover:shadow-lg`}>
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
