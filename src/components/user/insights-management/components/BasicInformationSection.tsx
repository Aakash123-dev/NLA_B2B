import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TemplateFormData } from '../types';

interface BasicInformationSectionProps {
  formData: TemplateFormData;
  onInputChange: (field: keyof TemplateFormData, value: any) => void;
}

export function BasicInformationSection({ formData, onInputChange }: BasicInformationSectionProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-900">Basic Information</CardTitle>
        <p className="text-sm text-gray-600 mt-1">
          Set up the basic details for your template
        </p>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Template Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => onInputChange('name', e.target.value)}
            placeholder="Enter template name"
            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-700 mb-2 block">
            Description *
          </label>
          <Textarea
            value={formData.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            placeholder="Enter template description"
            rows={3}
            className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Company/Organization
            </label>
            <Input
              value={formData.companyOrganization}
              disabled
              className="bg-gray-50 border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-2 block">
              Database Selection *
            </label>
            <Select value={formData.dbSelection} onValueChange={(value: 'DB1' | 'DB2') => onInputChange('dbSelection', value)}>
              <SelectTrigger className="bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DB1">Database 1</SelectItem>
                <SelectItem value="DB2">Database 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
