'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Copy, 
  FileText, 
  Database,
  Target,
  BarChart3,
  Calendar,
  Users,
  ArrowRight,
  Settings,
  Eye
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { Template } from './types';

// Mock data for templates
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Q4 Promo Analysis Template',
    description: 'Comprehensive promotional analysis for Q4 campaigns',
    companyOrganization: 'Real Good Foods',
    dbSelection: 'DB1',
    questions: [],
    type: 'promo',
    model: 'TPO',
    variables: [
      { id: '1', name: 'Revenue', type: 'x', aggregate: 'sum' },
      { id: '2', name: 'ROI', type: 'y1', aggregate: 'average' }
    ],
    dateRange: 'quarterly',
    yAxisLabel: 'ROI (%)',
    xAxisLabel: 'Revenue ($)',
    appliedProjects: ['project-1', 'project-2'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-20')
  },
  {
    id: '2',
    name: 'Pricing Elasticity Dashboard',
    description: 'Price sensitivity analysis across product categories',
    companyOrganization: 'Real Good Foods',
    dbSelection: 'DB2',
    questions: [],
    type: 'base',
    model: 'Pricing',
    variables: [
      { id: '3', name: 'Price', type: 'x', aggregate: 'average' },
      { id: '4', name: 'Demand', type: 'y1', aggregate: 'sum' },
      { id: '5', name: 'Elasticity', type: 'y2', aggregate: 'average' }
    ],
    dateRange: 'monthly',
    yAxisLabel: 'Units Sold',
    xAxisLabel: 'Price Point ($)',
    appliedProjects: ['project-1'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-07-18')
  },
  {
    id: '3',
    name: 'Strategic Forecast Model',
    description: 'Long-term forecasting and strategic planning template',
    companyOrganization: 'Real Good Foods',
    dbSelection: 'DB1',
    questions: [],
    type: 'strat',
    model: 'Forecast',
    variables: [
      { id: '6', name: 'Time Period', type: 'x', aggregate: 'sum' },
      { id: '7', name: 'Projected Sales', type: 'y1', aggregate: 'sum' },
      { id: '8', name: 'Market Share', type: 'y2', aggregate: 'average' }
    ],
    dateRange: 'yearly',
    yAxisLabel: 'Sales Volume',
    xAxisLabel: 'Time Period',
    appliedProjects: ['project-2', 'project-3'],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-07-15')
  }
];

export default function InsightsManagementPage() {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterModel, setFilterModel] = useState<string>('all');

  // Filter templates based on search and filters
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesModel = filterModel === 'all' || template.model === filterModel;
    
    return matchesSearch && matchesType && matchesModel;
  });

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      promo: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      base: 'bg-blue-100 text-blue-800 border-blue-200',
      strat: 'bg-purple-100 text-purple-800 border-purple-200',
      overall: 'bg-orange-100 text-orange-800 border-orange-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getModelIcon = (model: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      Pricing: Target,
      TPO: BarChart3,
      Forecast: Calendar
    };
    return icons[model] || Settings;
  };

  const handleCreateTemplate = () => {
    // Navigate to the full page template creation
    window.location.href = '/user/insights-management/create-template';
  };

  const handleEditTemplate = (template: Template) => {
    // Navigate to the full page template creation with template ID
    window.location.href = `/user/insights-management/create-template?id=${template.id}`;
  };

  const handleDuplicateTemplate = (template: Template) => {
    const duplicated: Template = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTemplates(prev => [duplicated, ...prev]);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Insights Management</h1>
              <p className="text-gray-600">Create and manage insight templates and questions</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleCreateTemplate}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="promo">Promo</SelectItem>
              <SelectItem value="base">Base</SelectItem>
              <SelectItem value="strat">Strategic</SelectItem>
              <SelectItem value="overall">Overall</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterModel} onValueChange={setFilterModel}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Models</SelectItem>
              <SelectItem value="Pricing">Pricing</SelectItem>
              <SelectItem value="TPO">TPO</SelectItem>
              <SelectItem value="Forecast">Forecast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredTemplates.map((template, index) => {
              const ModelIcon = getModelIcon(template.model);
              
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-gray-200 group">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <ModelIcon className="w-4 h-4 text-white" />
                          </div>
                          <Badge className={`text-xs ${getTypeColor(template.type)}`}>
                            {template.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEditTemplate(template)}
                            className="h-8 w-8 p-0 hover:bg-blue-50"
                          >
                            <Edit3 className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDuplicateTemplate(template)}
                            className="h-8 w-8 p-0 hover:bg-green-50"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="h-8 w-8 p-0 hover:bg-red-50 text-red-500"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                        {template.name}
                      </CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {template.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Database className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{template.dbSelection}</span>
                          <Badge variant="outline" className="ml-auto text-xs">
                            {template.model}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">
                            {template.appliedProjects.length} project(s)
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 capitalize">
                            {template.dateRange}
                          </span>
                        </div>
                        
                        <div className="pt-2 border-t border-gray-100">
                          <div className="text-xs text-gray-500">
                            Variables: {template.variables.length}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Updated: {template.updatedAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery || filterType !== 'all' || filterModel !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Create your first insight template to get started'
              }
            </p>
            {(!searchQuery && filterType === 'all' && filterModel === 'all') && (
              <Button onClick={handleCreateTemplate} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Template
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
