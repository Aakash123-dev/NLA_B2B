'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Building, Search, Lock, Unlock } from 'lucide-react';

export default function ConfigRetailers() {
  // Mock data for demonstration
  const [retailers, setRetailers] = useState([
    { id: 1, name: 'Walmart', selected: true, count: 1250, locked: true },
    { id: 2, name: 'Target', selected: true, count: 980, locked: true },
    { id: 3, name: 'Costco', selected: true, count: 720, locked: true },
    { id: 4, name: 'Amazon', selected: false, count: 1520, locked: false },
    { id: 5, name: 'Kroger', selected: true, count: 650, locked: false },
    { id: 6, name: 'Whole Foods', selected: false, count: 420, locked: false },
    { id: 7, name: 'CVS', selected: false, count: 380, locked: false },
    { id: 8, name: 'Walgreens', selected: false, count: 310, locked: false },
  ]);
  
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleRetailer = (id: number) => {
    setRetailers(
      retailers.map(retailer => {
        if (retailer.id === id && !retailer.locked) {
          return { ...retailer, selected: !retailer.selected };
        }
        return retailer;
      })
    );
  };
  
  const toggleLock = (id: number) => {
    setRetailers(
      retailers.map(retailer => {
        if (retailer.id === id) {
          return { ...retailer, locked: !retailer.locked };
        }
        return retailer;
      })
    );
  };
  
  const filteredRetailers = retailers.filter(retailer => 
    retailer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const selectAll = () => {
    setRetailers(retailers.map(retailer => {
      if (!retailer.locked) {
        return { ...retailer, selected: true };
      }
      return retailer;
    }));
  };
  
  const selectNone = () => {
    setRetailers(retailers.map(retailer => {
      if (!retailer.locked) {
        return { ...retailer, selected: false };
      }
      return retailer;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Configuration Retailers</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review and customize retailers from your configuration
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
            className={`p-3 transition-all ${
              retailer.locked ? 'bg-gray-50 dark:bg-gray-800/50' : 'cursor-pointer hover:shadow-md'
            } ${
              retailer.selected 
                ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' 
                : ''
            }`}
            onClick={() => toggleRetailer(retailer.id)}
          >
            <div className="flex items-center gap-3">
              <Checkbox 
                checked={retailer.selected}
                onCheckedChange={() => toggleRetailer(retailer.id)}
                className="h-4 w-4"
                disabled={retailer.locked}
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">{retailer.name}</span>
                  {retailer.locked && (
                    <Lock className="h-3 w-3 text-gray-400" />
                  )}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {retailer.count} records in configuration
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLock(retailer.id);
                }}
                className={`${retailer.locked ? 'text-gray-400' : 'text-purple-600'}`}
              >
                {retailer.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredRetailers.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No retailers found matching "{searchTerm}"
        </div>
      )}
      
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md text-sm text-purple-800 dark:text-purple-300">
        <p>Configuration Notes:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Locked retailers are required by your configuration</li>
          <li>You can unlock any retailer to change its selection status</li>
          <li>Configuration may include predefined mappings for these retailers</li>
        </ul>
      </div>
    </div>
  );
}
