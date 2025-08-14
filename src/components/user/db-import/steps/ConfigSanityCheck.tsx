'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check, X, Edit } from 'lucide-react';

export default function ConfigSanityCheck() {
  // Mock data for demonstration
  const validationResults = [
    { column: 'Product', status: 'valid', message: 'Field mapping valid' },
    { column: 'Brand', status: 'valid', message: 'Field mapping valid' },
    { column: 'Retailer', status: 'warning', message: 'Some mappings may require review' },
    { column: 'Price', status: 'valid', message: 'Field mapping valid' },
    { column: 'Date', status: 'valid', message: 'Field mapping valid' },
    { column: 'Quantity', status: 'invalid', message: 'Mapping not defined in configuration' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Configuration Sanity Check</h3>
        <p className="text-sm text-gray-600">
          Review validation results for the selected configuration
        </p>
      </div>

      <div className="space-y-4">
        {validationResults.map((result, index) => (
          <Card 
            key={index} 
            className={`p-4 border-l-4 ${
              result.status === 'valid' 
                ? 'border-l-green-500 bg-green-50' 
                : result.status === 'warning'
                  ? 'border-l-yellow-500 bg-yellow-50' 
                  : 'border-l-red-500 bg-red-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`mr-3 p-1 rounded-full ${
                result.status === 'valid' 
                  ? 'bg-green-100' 
                  : result.status === 'warning'
                    ? 'bg-yellow-100' 
                    : 'bg-red-100'
              }`}>
                {result.status === 'valid' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : result.status === 'warning' ? (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                ) : (
                  <X className="h-4 w-4 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{result.column}</h4>
                <p className="text-sm text-gray-600">{result.message}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-purple-600"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button 
          variant="outline" 
          className="flex-1 border-purple-500 text-purple-700 hover:bg-purple-50"
        >
          Fix Configuration Issues
        </Button>
      </div>
    </div>
  );
}
