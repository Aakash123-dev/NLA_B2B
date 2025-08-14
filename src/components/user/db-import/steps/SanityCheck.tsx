'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Check, X } from 'lucide-react';

export default function SanityCheck() {
  // Mock data for demonstration
  const validationResults = [
    { column: 'Product', status: 'valid', message: 'All values are valid' },
    { column: 'Brand', status: 'valid', message: 'All values are valid' },
    { column: 'Retailer', status: 'warning', message: '3 missing values detected' },
    { column: 'Price', status: 'invalid', message: '5 non-numeric values found' },
    { column: 'Date', status: 'valid', message: 'All values are valid' },
    { column: 'Quantity', status: 'warning', message: '2 zero values detected' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Sanity Check</h3>
        <p className="text-sm text-gray-600">
          Review the validation results for your imported data
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
              <div>
                <h4 className="font-medium text-gray-800">{result.column}</h4>
                <p className="text-sm text-gray-600">{result.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 mt-6">
        <Button 
          variant="outline" 
          className="flex-1 border-yellow-500 text-yellow-700 hover:bg-yellow-50"
        >
          Fix Warnings
        </Button>
        <Button 
          variant="outline" 
          className="flex-1 border-red-500 text-red-700 hover:bg-red-50"
        >
          Fix Errors
        </Button>
      </div>
    </div>
  );
}
