'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Package2, Search } from 'lucide-react';

export default function Products() {
  // Mock data for demonstration
  const [products, setProducts] = useState([
    { id: 1, name: 'Organic Milk 1L', selected: true, count: 850 },
    { id: 2, name: 'White Bread 700g', selected: true, count: 780 },
    { id: 3, name: 'Free Range Eggs (12pk)', selected: true, count: 620 },
    { id: 4, name: 'Cheddar Cheese 250g', selected: false, count: 590 },
    { id: 5, name: 'Salted Butter 250g', selected: true, count: 550 },
    { id: 6, name: 'Orange Juice 1L', selected: false, count: 520 },
    { id: 7, name: 'Greek Yogurt 500g', selected: false, count: 480 },
    { id: 8, name: 'Pasta Sauce 350g', selected: true, count: 450 },
    { id: 9, name: 'Chicken Breast 500g', selected: false, count: 420 },
    { id: 10, name: 'Bananas (5pk)', selected: true, count: 390 },
    { id: 11, name: 'Ground Coffee 200g', selected: false, count: 360 },
    { id: 12, name: 'Sparkling Water 6x330ml', selected: true, count: 320 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleProduct = (id: number) => {
    setProducts(
      products.map(product => 
        product.id === id 
          ? { ...product, selected: !product.selected } 
          : product
      )
    );
  };
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectAll = () => {
    setProducts(products.map(product => ({ ...product, selected: true })));
  };
  
  const selectNone = () => {
    setProducts(products.map(product => ({ ...product, selected: false })));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Products</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select which products to include in your import
        </p>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {products.filter(p => p.selected).length} of {products.length} selected
        </div>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={selectNone}>
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredProducts.map((product) => (
          <Card 
            key={product.id} 
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              product.selected 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : ''
            }`}
            onClick={() => toggleProduct(product.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={product.selected}
                onCheckedChange={() => toggleProduct(product.id)}
                className="h-4 w-4"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Package2 className="h-4 w-4 text-gray-500" />
                  <span className="font-medium truncate">{product.name}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {product.count} records in dataset
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No products found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
