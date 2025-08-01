import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  BarChart3,
  X
} from 'lucide-react';
import { TemplateFormData, TemplateVariable } from '../types';

interface VariablesConfigurationSectionProps {
  formData: TemplateFormData;
  availableFields: any[];
  onInputChange: (field: keyof TemplateFormData, value: any) => void;
  onAddVariable: () => void;
  onUpdateVariable: (index: number, field: keyof TemplateVariable, value: any) => void;
  onRemoveVariable: (index: number) => void;
}

export function VariablesConfigurationSection({
  formData,
  availableFields,
  onInputChange,
  onAddVariable,
  onUpdateVariable,
  onRemoveVariable
}: VariablesConfigurationSectionProps) {
  
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Select Variables
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Configure variables and preview your chart visualization
            </p>
          </div>
          <Button
            onClick={onAddVariable}
            size="sm"
            className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Variable
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Variables and Chart Configuration */}
          <div className="space-y-6">
            {/* Variables List */}
            <div className="space-y-4">
              {formData.variables.map((variable, index) => (
                <div key={variable.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-800">Variable {index + 1}</h4>
                    <Button
                      onClick={() => onRemoveVariable(index)}
                      size="sm"
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Variable Name
                      </label>
                      <Select 
                        value={variable.name || ''} 
                        onValueChange={(value) => onUpdateVariable(index, 'name', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select variable" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableFields.map(field => (
                            <SelectItem key={field.id} value={field.name}>
                              {field.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Axis Type
                      </label>
                      <Select 
                        value={variable.type} 
                        onValueChange={(value: 'x' | 'y1' | 'y2' | 'y3' | 'yn') => onUpdateVariable(index, 'type', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="x">X-Axis</SelectItem>
                          <SelectItem value="y1">Y-Axis Primary</SelectItem>
                          <SelectItem value="y2">Y-Axis Secondary</SelectItem>
                          <SelectItem value="y3">Y-Axis Tertiary</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Aggregation
                      </label>
                      <Select 
                        value={variable.aggregate} 
                        onValueChange={(value: 'min' | 'max' | 'average' | 'sum') => onUpdateVariable(index, 'aggregate', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sum">Sum</SelectItem>
                          <SelectItem value="average">Average</SelectItem>
                          <SelectItem value="min">Minimum</SelectItem>
                          <SelectItem value="max">Maximum</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        Unit
                      </label>
                      <Input
                        value={variable.unit || ''}
                        onChange={(e) => onUpdateVariable(index, 'unit', e.target.value)}
                        placeholder="e.g., $, %, units"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {formData.variables.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Add variables to configure your chart</p>
                </div>
              )}
            </div>

            {/* Chart Configuration */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date Range
                  </label>
                  <Select 
                    value={formData.dateRange} 
                    onValueChange={(value: 'weekly' | 'monthly' | 'quarterly' | 'halfyearly' | 'yearly' | '2yr') => onInputChange('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="halfyearly">Half-yearly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="2yr">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    X-Axis Label
                  </label>
                  <Input
                    value={formData.xAxisLabel}
                    onChange={(e) => onInputChange('xAxisLabel', e.target.value)}
                    placeholder="Enter X-axis label"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Y-Axis Label
                  </label>
                  <Input
                    value={formData.yAxisLabel}
                    onChange={(e) => onInputChange('yAxisLabel', e.target.value)}
                    placeholder="Enter Y-axis label"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Chart Preview */}
          <div className="lg:sticky lg:top-4">
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Chart Preview</h3>
              <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-200 p-4">
                {formData.variables.length > 0 ? (
                  <div className="h-full flex flex-col">
                    {/* Chart Header */}
                    <div className="text-center mb-4">
                      <h4 className="text-sm font-semibold text-gray-700">
                        {formData.name || 'Template Preview'}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Date Range: {formData.dateRange} | Model: {formData.model}
                      </p>
                    </div>
                    
                    {/* Mock Chart Area */}
                    <div className="flex-1 relative bg-white rounded border">
                      {/* Y-axis label */}
                      <div className="absolute left-2 top-1/2 transform -rotate-90 origin-center text-xs text-gray-600 whitespace-nowrap">
                        {formData.yAxisLabel || 'Y-Axis'}
                      </div>
                      
                      {/* Chart bars (mock) */}
                      <div className="h-full flex items-end justify-center p-8 pl-12 pb-8">
                        {Array.from({length: 5}).map((_, i) => (
                          <div 
                            key={i}
                            className={`w-8 mx-1 bg-gradient-to-t ${
                              i % 2 === 0 ? 'from-blue-400 to-blue-600' : 'from-green-400 to-green-600'
                            } rounded-t`}
                            style={{ height: `${30 + Math.random() * 50}%` }}
                          />
                        ))}
                      </div>
                      
                      {/* X-axis label */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                        {formData.xAxisLabel || 'X-Axis'}
                      </div>
                      
                      {/* Legend */}
                      <div className="absolute top-2 right-2 text-xs">
                        <div className="flex flex-col gap-1">
                          {formData.variables.slice(0, 2).map((variable, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <div className={`w-2 h-2 rounded ${i === 0 ? 'bg-blue-500' : 'bg-green-500'}`} />
                              <span className="text-gray-600">{variable.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Variable Summary */}
                    <div className="mt-3 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Variables: {formData.variables.length}</span>
                        <span>Range: {formData.dateRange}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Configure variables to see chart preview</p>
                      <p className="text-xs mt-1">Add X and Y variables to generate visualization</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
