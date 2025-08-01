'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from '@/components/ui/dialog';
import { 
  Plus, 
  Minus, 
  Database, 
  Target, 
  BarChart3, 
  Calendar,
  Settings,
  LineChart,
  TrendingUp,
  PieChart,
  X
} from 'lucide-react';
import { Template, Question, TemplateVariable, TemplateFormData, Project } from '../types';

interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: TemplateFormData) => void;
  template?: Template | null;
  questions: Question[];
}

// Mock data for projects
const mockProjects: Project[] = [
  { id: 'project-1', name: 'Q4 Marketing Campaign', status: 'active', type: 'Marketing' },
  { id: 'project-2', name: 'Product Launch Analysis', status: 'active', type: 'Product' },
  { id: 'project-3', name: 'Seasonal Forecasting', status: 'active', type: 'Forecasting' },
  { id: 'project-all', name: 'All Projects', status: 'active', type: 'Global' }
];

// Mock data for model configurations
const modelConfigs = {
  Pricing: [
    { id: 'price_point', name: 'Price Point', type: 'number' as const },
    { id: 'elasticity', name: 'Price Elasticity', type: 'number' as const },
    { id: 'demand', name: 'Demand Volume', type: 'number' as const },
    { id: 'revenue', name: 'Revenue', type: 'number' as const },
    { id: 'margin', name: 'Profit Margin', type: 'number' as const },
    { id: 'competitor_price', name: 'Competitor Price', type: 'number' as const }
  ],
  TPO: [
    { id: 'roi', name: 'ROI', type: 'number' as const },
    { id: 'spend', name: 'Trade Spend', type: 'number' as const },
    { id: 'volume', name: 'Volume Lift', type: 'number' as const },
    { id: 'incremental_sales', name: 'Incremental Sales', type: 'number' as const },
    { id: 'promotional_depth', name: 'Promotional Depth', type: 'number' as const },
    { id: 'event_duration', name: 'Event Duration', type: 'number' as const }
  ],
  Forecast: [
    { id: 'projected_sales', name: 'Projected Sales', type: 'number' as const },
    { id: 'market_share', name: 'Market Share', type: 'number' as const },
    { id: 'seasonal_factor', name: 'Seasonal Factor', type: 'number' as const },
    { id: 'trend', name: 'Trend Coefficient', type: 'number' as const },
    { id: 'confidence_interval', name: 'Confidence Interval', type: 'number' as const },
    { id: 'variance', name: 'Forecast Variance', type: 'number' as const }
  ]
};

const TemplateCreationModal: React.FC<TemplateCreationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  template,
  questions
}) => {
  const [formData, setFormData] = useState<TemplateFormData>({
    name: '',
    description: '',
    companyOrganization: 'Real Good Foods',
    dbSelection: 'DB1',
    selectedQuestions: [],
    type: 'promo',
    model: 'Pricing',
    variables: [],
    dateRange: 'monthly',
    yAxisLabel: '',
    xAxisLabel: '',
    appliedProjects: []
  });

  const [availableFields, setAvailableFields] = useState<any[]>([]);

  // Initialize form data when template changes
  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        companyOrganization: template.companyOrganization,
        dbSelection: template.dbSelection,
        selectedQuestions: template.questions.map(q => q.id),
        type: template.type,
        model: template.model,
        variables: template.variables,
        dateRange: template.dateRange,
        yAxisLabel: template.yAxisLabel,
        xAxisLabel: template.xAxisLabel,
        appliedProjects: template.appliedProjects
      });
    } else {
      setFormData({
        name: '',
        description: '',
        companyOrganization: 'Real Good Foods',
        dbSelection: 'DB1',
        selectedQuestions: [],
        type: 'promo',
        model: 'Pricing',
        variables: [],
        dateRange: 'monthly',
        yAxisLabel: '',
        xAxisLabel: '',
        appliedProjects: []
      });
    }
  }, [template]);

  // Update available fields when model changes
  useEffect(() => {
    if (formData.model && modelConfigs[formData.model]) {
      setAvailableFields(modelConfigs[formData.model]);
    }
  }, [formData.model]);

  const handleInputChange = (field: keyof TemplateFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleQuestionToggle = (questionId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedQuestions: checked 
        ? [...prev.selectedQuestions, questionId]
        : prev.selectedQuestions.filter((id: string) => id !== questionId)
    }));
  };

  const handleProjectToggle = (projectId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      appliedProjects: checked 
        ? [...prev.appliedProjects, projectId]
        : prev.appliedProjects.filter(id => id !== projectId)
    }));
  };

  const addVariable = () => {
    const newVariable: TemplateVariable = {
      id: Date.now().toString(),
      name: '',
      type: 'y1',
      aggregate: 'sum'
    };
    setFormData(prev => ({
      ...prev,
      variables: [...prev.variables, newVariable]
    }));
  };

  const updateVariable = (index: number, field: keyof TemplateVariable, value: any) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.map((variable, i) => 
        i === index ? { ...variable, [field]: value } : variable
      )
    }));
  };

  const removeVariable = (index: number) => {
    setFormData(prev => ({
      ...prev,
      variables: prev.variables.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const filteredQuestions = questions.filter(q => q.category === formData.type);

  // Mock chart data for preview
  const generateMockChartData = () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
      const point: any = { name: `Point ${i + 1}` };
      formData.variables.forEach(variable => {
        if (variable.name) {
          point[variable.name] = Math.floor(Math.random() * 1000) + 100;
        }
      });
      data.push(point);
    }
    return data;
  };

  const mockChartData = generateMockChartData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Edit Template' : 'Create New Template'}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Template Name
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter template name"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Description
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter template description"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Company/Organization
                  </label>
                  <Input
                    value={formData.companyOrganization}
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Database Selection
                  </label>
                  <Select 
                    value={formData.dbSelection} 
                    onValueChange={(value: 'DB1' | 'DB2') => handleInputChange('dbSelection', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DB1">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Database 1
                        </div>
                      </SelectItem>
                      <SelectItem value="DB2">
                        <div className="flex items-center gap-2">
                          <Database className="w-4 h-4" />
                          Database 2
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Type and Model */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Type & Model Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Type
                  </label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value: any) => handleInputChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="promo">Promo</SelectItem>
                      <SelectItem value="base">Base</SelectItem>
                      <SelectItem value="strat">Strategic</SelectItem>
                      <SelectItem value="overall">Overall</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Model
                  </label>
                  <Select 
                    value={formData.model} 
                    onValueChange={(value: any) => handleInputChange('model', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pricing">
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Pricing
                        </div>
                      </SelectItem>
                      <SelectItem value="TPO">
                        <div className="flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          TPO
                        </div>
                      </SelectItem>
                      <SelectItem value="Forecast">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Forecast
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Date Range
                  </label>
                  <Select 
                    value={formData.dateRange} 
                    onValueChange={(value: any) => handleInputChange('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="halfyearly">Half Yearly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="2yr">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {filteredQuestions.map(question => (
                    <div key={question.id} className="flex items-start gap-3">
                      <Checkbox
                        checked={formData.selectedQuestions.includes(question.id)}
                        onCheckedChange={(checked) => 
                          handleQuestionToggle(question.id, checked as boolean)
                        }
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{question.text}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {question.category}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredQuestions.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No questions available for the selected type.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Applied Projects */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Applied Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockProjects.map(project => (
                    <div key={project.id} className="flex items-center gap-3">
                      <Checkbox
                        checked={formData.appliedProjects.includes(project.id)}
                        onCheckedChange={(checked) => 
                          handleProjectToggle(project.id, checked as boolean)
                        }
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{project.name}</p>
                        <p className="text-xs text-gray-500">{project.type}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Variables & Chart Preview */}
          <div className="space-y-6">
            {/* Variables Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Variables Configuration
                  <Button
                    size="sm"
                    onClick={addVariable}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Variable
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {formData.variables.map((variable, index) => (
                    <div key={variable.id} className="border rounded-lg p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Variable {index + 1}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeVariable(index)}
                          className="h-6 w-6 p-0 text-red-500 hover:bg-red-50"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-gray-600">Field</label>
                          <Select
                            value={variable.name}
                            onValueChange={(value) => updateVariable(index, 'name', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue placeholder="Select field" />
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
                          <label className="text-xs text-gray-600">Type</label>
                          <Select
                            value={variable.type}
                            onValueChange={(value: any) => updateVariable(index, 'type', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="x">X Axis</SelectItem>
                              <SelectItem value="y1">Y1 Axis</SelectItem>
                              <SelectItem value="y2">Y2 Axis</SelectItem>
                              <SelectItem value="y3">Y3 Axis</SelectItem>
                              <SelectItem value="yn">Yn Axis</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="col-span-2">
                          <label className="text-xs text-gray-600">Aggregate</label>
                          <Select
                            value={variable.aggregate}
                            onValueChange={(value: any) => updateVariable(index, 'aggregate', value)}
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="min">Minimum</SelectItem>
                              <SelectItem value="max">Maximum</SelectItem>
                              <SelectItem value="average">Average</SelectItem>
                              <SelectItem value="sum">Sum</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {formData.variables.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Add variables to configure your chart</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Chart Labels */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chart Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    X-Axis Label
                  </label>
                  <Input
                    value={formData.xAxisLabel}
                    onChange={(e) => handleInputChange('xAxisLabel', e.target.value)}
                    placeholder="Enter X-axis label"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Y-Axis Label
                  </label>
                  <Input
                    value={formData.yAxisLabel}
                    onChange={(e) => handleInputChange('yAxisLabel', e.target.value)}
                    placeholder="Enter Y-axis label"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Chart Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Chart Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-dashed border-blue-200 p-4">
                  {formData.variables.length > 0 ? (
                    <div className="h-full flex flex-col">
                      {/* Chart Header */}
                      <div className="text-center mb-4">
                        <h4 className="text-sm font-semibold text-gray-700">
                          {formData.name || 'Template Chart Preview'}
                        </h4>
                        <p className="text-xs text-gray-500 mt-1">
                          Date Range: {formData.dateRange} | Model: {formData.model}
                        </p>
                      </div>
                      
                      {/* Mock Chart Area */}
                      <div className="flex-1 relative bg-white rounded border">
                        {/* Y-Axis Label */}
                        <div className="absolute left-2 top-1/2 transform -rotate-90 origin-center text-xs text-gray-600 whitespace-nowrap">
                          {formData.yAxisLabel || 'Y-Axis'}
                        </div>
                        
                        {/* Chart Content */}
                        <div className="h-full flex items-end justify-center p-8 pl-12 pb-8">
                          {/* Mock Bar Chart */}
                          <div className="flex items-end space-x-2 h-full w-full max-w-xs">
                            {[0.3, 0.7, 0.5, 0.8, 0.4, 0.9, 0.6].map((height, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center">
                                <div 
                                  className={`w-full rounded-t ${
                                    idx % 3 === 0 ? 'bg-blue-500' : 
                                    idx % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                                  }`}
                                  style={{ height: `${height * 100}%` }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* X-Axis Label */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                          {formData.xAxisLabel || 'X-Axis'}
                        </div>
                        
                        {/* Legend */}
                        <div className="absolute top-2 right-2 text-xs">
                          <div className="bg-white rounded shadow-sm p-2 border">
                            {formData.variables.filter(v => v.type.startsWith('y')).map((variable, idx) => (
                              <div key={variable.id} className="flex items-center space-x-2 mb-1">
                                <div 
                                  className={`w-3 h-3 rounded ${
                                    idx % 3 === 0 ? 'bg-blue-500' : 
                                    idx % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                                  }`}
                                />
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
                          <span>Type: {formData.type.toUpperCase()}</span>
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
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!formData.name || !formData.description}
          >
            {template ? 'Update Template' : 'Create Template'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateCreationModal;
