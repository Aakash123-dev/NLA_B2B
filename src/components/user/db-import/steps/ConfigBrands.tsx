'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Tag, Search, Lock, Unlock } from 'lucide-react';

export default function ConfigBrands() {
  // Mock data for demonstration
  const [brands, setBrands] = useState([
    { id: 1, name: 'Nestlé', selected: true, count: 1250, locked: true },
    { id: 2, name: 'Kellogg\'s', selected: true, count: 980, locked: true },
    { id: 3, name: 'Coca-Cola', selected: true, count: 920, locked: false },
    { id: 4, name: 'PepsiCo', selected: false, count: 880, locked: false },
    { id: 5, name: 'Unilever', selected: true, count: 750, locked: true },
    { id: 6, name: 'Kraft Heinz', selected: false, count: 720, locked: false },
    { id: 7, name: 'Danone', selected: false, count: 650, locked: false },
    { id: 8, name: 'General Mills', selected: true, count: 620, locked: false },
    { id: 9, name: 'Mars', selected: false, count: 580, locked: false },
    { id: 10, name: 'Mondelez', selected: true, count: 540, locked: false },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleBrand = (id: number) => {
    setBrands(
      brands.map(brand => {
        if (brand.id === id && !brand.locked) {
          return { ...brand, selected: !brand.selected };
        }
        return brand;
      })
    );
  };
  
  const toggleLock = (id: number) => {
    setBrands(
      brands.map(brand => {
        if (brand.id === id) {
          return { ...brand, locked: !brand.locked };
        }
        return brand;
      })
    );
  };
  
  const filteredBrands = brands.filter(brand => 
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectAll = () => {
    setBrands(brands.map(brand => {
      if (!brand.locked) {
        return { ...brand, selected: true };
      }
      return brand;
    }));
  };
  
  const selectNone = () => {
    setBrands(brands.map(brand => {
      if (!brand.locked) {
        return { ...brand, selected: false };
      }
      return brand;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Configuration Brands</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review and customize brands from your configuration
        </p>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {brands.filter(b => b.selected).length} of {brands.length} selected
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
        {filteredBrands.map((brand) => (
          <Card 
            key={brand.id} 
            className={`p-3 transition-all ${
              brand.locked ? 'bg-gray-50 dark:bg-gray-800/50' : 'cursor-pointer hover:shadow-md'
            } ${
              brand.selected 
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' 
                : ''
            }`}
            onClick={() => toggleBrand(brand.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={brand.selected}
                onCheckedChange={() => toggleBrand(brand.id)}
                className="h-4 w-4"
                disabled={brand.locked}
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{brand.name}</span>
                  {brand.locked && (
                    <Lock className="h-3 w-3 text-gray-400" />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {brand.count} records in configuration
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(brand.id);
                }}
                className={`${brand.locked ? 'text-gray-400' : 'text-purple-600'}`}
              >
                {brand.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredBrands.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No brands found matching "{searchTerm}"
        </div>
      )}
      
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md text-sm text-purple-800 dark:text-purple-300">
        <p className="font-medium">Final Step!</p>
        <p className="mt-1">
          After completing this step, your data will be imported according to your selected configuration.
          Click "Finish" on the next screen to complete the import process.
        </p>
      </div>
    </div>
  );
}
