'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Check, Database } from 'lucide-react';

interface ConfigFirstStepProps {
  onConfigSelected: () => void;
}

export default function ConfigFirstStep({ onConfigSelected }: ConfigFirstStepProps) {
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  
  // Mock data for demonstration
  const configOptions = [
    { id: 'retail-standard', name: 'Retail Standard Configuration' },
    { id: 'retail-advanced', name: 'Retail Advanced Configuration' },
    { id: 'consumer-goods', name: 'Consumer Goods Configuration' },
    { id: 'custom-2023', name: 'Custom Configuration 2023' },
    { id: 'custom-2024', name: 'Custom Configuration 2024' },
  ];
  
  const handleSelectConfig = (configId: string) => {
    setSelectedConfig(configId);
    onConfigSelected();
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <h3 className="text-lg font-medium text-gray-800">Select Configuration</h3>
        <p className="text-sm text-gray-600">
          Choose a predefined configuration for your database import
        </p>
      </div>

      <div className="space-y-4">
        <Label htmlFor="config-select" className="text-sm font-medium text-gray-700">
          Configuration
        </Label>
        <Select
          value={selectedConfig}
          onValueChange={handleSelectConfig}
        >
          <SelectTrigger id="config-select" className="w-full border-gray-300 h-12 text-base">
            <SelectValue placeholder="Select a configuration" />
          </SelectTrigger>
          <SelectContent>
            {configOptions.map((config) => (
              <SelectItem key={config.id} value={config.id}>
                {config.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedConfig && (
        <Card className="p-8 bg-purple-50 border-purple-200 mt-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center shrink-0">
              <Settings className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-xl text-gray-800">
                {configOptions.find(c => c.id === selectedConfig)?.name}
              </h4>
              <p className="text-base text-gray-600 mt-2">
                This configuration includes predefined settings for field mappings, data validation rules,
                and filtering options optimized for retail data analysis.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-base text-gray-700">Includes standard field mappings</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-base text-gray-700">Data validation rules preconfigured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-base text-gray-700">Standard retailers and brands included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-base text-gray-700">Compatible with most retail datasets</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="pt-6">
        <h4 className="text-base font-medium mb-3 text-gray-800">Configuration Settings Include:</h4>
        <ul className="list-disc pl-6 text-base text-gray-600 space-y-2">
          <li>Field mappings for standard database columns</li>
          <li>Data validation and sanity check rules</li>
          <li>Filtering conditions for data quality</li>
          <li>Predefined retailers, products, and brands lists</li>
          <li>Import options optimized for your data type</li>
        </ul>
      </div>
    </div>
  );
}
