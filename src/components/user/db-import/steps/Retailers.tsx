'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, Search } from 'lucide-react';

export default function Retailers() {
  // Mock data for demonstration
  const [retailers, setRetailers] = useState([
    { id: 1, name: 'Walmart', selected: true, count: 1250 },
    { id: 2, name: 'Target', selected: true, count: 980 },
    { id: 3, name: 'Costco', selected: true, count: 720 },
    { id: 4, name: 'Amazon', selected: false, count: 1520 },
    { id: 5, name: 'Kroger', selected: true, count: 650 },
    { id: 6, name: 'Whole Foods', selected: false, count: 420 },
    { id: 7, name: 'CVS', selected: false, count: 380 },
    { id: 8, name: 'Walgreens', selected: false, count: 310 },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleRetailer = (id: number) => {
    setRetailers(
      retailers.map(retailer => 
        retailer.id === id 
          ? { ...retailer, selected: !retailer.selected } 
          : retailer
      )
    );
  };
  
  const filteredRetailers = retailers.filter(retailer => 
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectAll = () => {
    setRetailers(retailers.map(retailer => ({ ...retailer, selected: true })));
  };
  
  const selectNone = () => {
    setRetailers(retailers.map(retailer => ({ ...retailer, selected: false })));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Retailers</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select which retailers to include in your import
        </p>
      </div>
      
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search retailers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex justify-between mb-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {retailers.filter(r => r.selected).length} of {retailers.length} selected
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filteredRetailers.map((retailer) => (
          <Card 
            key={retailer.id} 
            className={`p-3 cursor-pointer transition-all hover:shadow-md ${
              retailer.selected 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                : ''
            }`}
            onClick={() => toggleRetailer(retailer.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={retailer.selected}
                onCheckedChange={() => toggleRetailer(retailer.id)}
                className="h-4 w-4"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{retailer.name}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {retailer.count} records in dataset
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredRetailers.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No retailers found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
