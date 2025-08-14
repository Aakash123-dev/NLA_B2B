'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, RefreshCw, Edit } from 'lucide-react';

export default function ConfigRenameFields() {
  // Mock data for demonstration
  const [fields, setFields] = useState([
    { sourceField: 'ProductName', targetField: 'Product', locked: true },
    { sourceField: 'BrandName', targetField: 'Brand', locked: true },
    { sourceField: 'RetailerName', targetField: 'Retailer', locked: false },
    { sourceField: 'PriceAmount', targetField: 'Price', locked: true },
    { sourceField: 'TransactionDate', targetField: 'Date', locked: true },
    { sourceField: 'Quantity', targetField: 'Quantity', locked: false },
  ]);

  const handleFieldChange = (index: number, value: string) => {
    if (!fields[index].locked) {
      const newFields = [...fields];
      newFields[index].targetField = value;
      setFields(newFields);
    }
  };
  
  const toggleLock = (index: number) => {
    const newFields = [...fields];
    newFields[index].locked = !newFields[index].locked;
    setFields(newFields);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium">Configuration Field Mappings</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Review and customize field mappings from your configuration
        </p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Label htmlFor={`source-${index}`} className="text-xs text-gray-500 dark:text-gray-400">
                  Source Field
                </Label>
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md text-sm font-mono">
                  {field.sourceField}
                </div>
              </div>
              
              <ArrowRight className="h-5 w-5 text-gray-400" />
              
              <div className="flex-1">
                <Label htmlFor={`target-${index}`} className="text-xs text-gray-500 dark:text-gray-400">
                  Target Field
                </Label>
                <Input
                  id={`target-${index}`}
                  value={field.targetField}
                  onChange={(e) => handleFieldChange(index, e.target.value)}
                  className={`font-medium ${field.locked ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
                  disabled={field.locked}
                />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleLock(index)}
                className={field.locked ? 'text-gray-400' : 'text-purple-600'}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <Button 
          variant="outline" 
          className="flex items-center gap-2 text-purple-700 border-purple-300 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
        >
          <RefreshCw className="h-4 w-4" />
          Reset to Default Mappings
        </Button>
      </div>
      
      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-md text-sm text-purple-800 dark:text-purple-300">
        <p>Note:</p>
        <ul className="list-disc pl-5 mt-1 space-y-1">
          <li>Some fields are locked by the configuration and cannot be changed</li>
          <li>Click the edit icon to unlock fields that can be customized</li>
          <li>Changes to field mappings will affect how your data is imported</li>
        </ul>
      </div>
    </div>
  );
}
