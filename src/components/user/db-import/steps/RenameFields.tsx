'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, RefreshCw } from 'lucide-react';

export default function RenameFields() {
  // Mock data for demonstration
  const [fields, setFields] = useState([
    { originalName: 'prod_name', mappedName: 'Product' },
    { originalName: 'brand_name', mappedName: 'Brand' },
    { originalName: 'retailer', mappedName: 'Retailer' },
    { originalName: 'price_amt', mappedName: 'Price' },
    { originalName: 'trans_date', mappedName: 'Date' },
    { originalName: 'qty', mappedName: 'Quantity' },
  ]);

  const handleFieldChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].mappedName = value;
    setFields(newFields);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Rename Fields</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Map your CSV columns to standard field names
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor={`original-${index}`} className="text-xs text-gray-500 dark:text-gray-400">
                  Original Field Name
                </Label>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm font-mono">
                  {field.originalName}
                </div>
              </div>
              
              <ArrowRight className="h-5 w-5 text-gray-400" />
              
              <div className="flex-1">
                <Label htmlFor={`mapped-${index}`} className="text-xs text-gray-500 dark:text-gray-400">
                  Mapped Field Name
                </Label>
                <Input
                  id={`mapped-${index}`}
                  value={field.mappedName}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className="font-medium"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-indigo-700 border-indigo-300 hover:bg-indigo-50 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
        >
          <RefreshCw className="h-4 w-4" />
          Auto Map Fields
        </Button>
      </div>
    </div>
  );
}
