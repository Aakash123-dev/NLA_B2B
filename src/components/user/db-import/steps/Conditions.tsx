'use client';

import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package, Store, Tag, Search } from 'lucide-react';

export default function Conditions() {
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [retailerSearch, setRetailerSearch] = useState<string>('');
  const [productSearch, setProductSearch] = useState<string>('');
  const [brandSearch, setBrandSearch] = useState<string>('');

  // Sample data - replace with actual data from your API
  const availableRetailers = [
    'Walmart', 'Target', 'Amazon', 'Costco', 'Home Depot', 
    'Kroger', 'Best Buy', 'CVS Health', 'Walgreens', 'Lowe\'s'
  ];
  
  const availableProducts = [
    'Smartphones', 'Laptops', 'Tablets', 'Headphones', 'Cameras',
    'Gaming Consoles', 'Smart TVs', 'Speakers', 'Smartwatches', 'Keyboards'
  ];
  
  const availableBrands = [
    'Apple', 'Samsung', 'Microsoft', 'Sony', 'LG',
    'HP', 'Dell', 'Canon', 'Nike', 'Adidas'
  ];

  const handleRetailerSelection = (retailer: string) => {
    setSelectedRetailers(prev => {
      if (prev.includes(retailer)) {
        return prev.filter(r => r !== retailer);
      } else {
        return [...prev, retailer];
      }
    });
  };

  const handleProductSelection = (product: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(product)) {
        return prev.filter(p => p !== product);
      } else {
        return [...prev, product];
      }
    });
  };

  const handleBrandSelection = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  // Select All functions
  const handleSelectAllRetailers = () => {
    setSelectedRetailers([...filteredRetailers]);
  };

  const handleDeselectAllRetailers = () => {
    setSelectedRetailers([]);
  };

  const handleSelectAllProducts = () => {
    setSelectedProducts([...filteredProducts]);
  };

  const handleDeselectAllProducts = () => {
    setSelectedProducts([]);
  };

  const handleSelectAllBrands = () => {
    setSelectedBrands([...filteredBrands]);
  };

  const handleDeselectAllBrands = () => {
    setSelectedBrands([]);
  };

  // Filter functions
  const filteredRetailers = availableRetailers.filter(retailer =>
    retailer.toLowerCase().includes(retailerSearch.toLowerCase())
  );

  const filteredProducts = availableProducts.filter(product =>
    product.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredBrands = availableBrands.filter(brand =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Selection Conditions</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select retailers, products, and brands as conditions for data import
        </p>
      </div>

      {/* Retailers Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-600" />
            <h4 className="text-lg font-medium">Retailers</h4>
            <span className="text-sm text-gray-500">({selectedRetailers.length} selected)</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAllRetailers}
              disabled={filteredRetailers.length === 0}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAllRetailers}
              disabled={selectedRetailers.length === 0}
              className="text-xs"
            >
              Deselect All
            </Button>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search retailers..."
            value={retailerSearch}
            onChange={(e) => setRetailerSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
          {filteredRetailers.map((retailer) => (
            <div key={retailer} className="flex items-center space-x-2">
              <Checkbox
                id={`retailer-${retailer}`}
                checked={selectedRetailers.includes(retailer)}
                onCheckedChange={() => handleRetailerSelection(retailer)}
              />
              <Label 
                htmlFor={`retailer-${retailer}`} 
                className="text-sm cursor-pointer text-gray-700"
              >
                {retailer}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Products Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-green-600" />
            <h4 className="text-lg font-medium">Products</h4>
            <span className="text-sm text-gray-500">({selectedProducts.length} selected)</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAllProducts}
              disabled={filteredProducts.length === 0}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAllProducts}
              disabled={selectedProducts.length === 0}
              className="text-xs"
            >
              Deselect All
            </Button>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
          {filteredProducts.map((product) => (
            <div key={product} className="flex items-center space-x-2">
              <Checkbox
                id={`product-${product}`}
                checked={selectedProducts.includes(product)}
                onCheckedChange={() => handleProductSelection(product)}
              />
              <Label 
                htmlFor={`product-${product}`} 
                className="text-sm cursor-pointer text-gray-700"
              >
                {product}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Brands Selection */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-purple-600" />
            <h4 className="text-lg font-medium">Brands</h4>
            <span className="text-sm text-gray-500">({selectedBrands.length} selected)</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAllBrands}
              disabled={filteredBrands.length === 0}
              className="text-xs"
            >
              Select All
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAllBrands}
              disabled={selectedBrands.length === 0}
              className="text-xs"
            >
              Deselect All
            </Button>
          </div>
        </div>
        
        {/* Search Input */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search brands..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
          {filteredBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandSelection(brand)}
              />
              <Label 
                htmlFor={`brand-${brand}`} 
                className="text-sm cursor-pointer text-gray-700"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary */}
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md">
        <h5 className="font-medium text-purple-800 dark:text-purple-300 mb-2">Selection Summary</h5>
        <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
          <div>
            <strong>Retailers:</strong> {selectedRetailers.length > 0 ? selectedRetailers.join(', ') : 'None selected'}
          </div>
          <div>
            <strong>Products:</strong> {selectedProducts.length > 0 ? selectedProducts.join(', ') : 'None selected'}
          </div>
          <div>
            <strong>Brands:</strong> {selectedBrands.length > 0 ? selectedBrands.join(', ') : 'None selected'}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm text-blue-800 dark:text-blue-300">
        <p><strong>Selection Guidelines:</strong></p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Select any number of retailers for your data import</li>
          <li>Choose any number of products to include in the import</li>
          <li>Pick any number of brands to filter your data</li>
          <li>These selections will be used as conditions for filtering the imported data</li>
        </ul>
      </div>
    </div>
  );
}
