import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, Eye } from 'lucide-react';

interface TemplateCreationHeaderProps {
  templateId: string | null;
  isLoading: boolean;
  onBack: () => void;
  onPreview: () => void;
  onSave: () => void;
}

export function TemplateCreationHeader({
  templateId,
  isLoading,
  onBack,
  onPreview,
  onSave
}: TemplateCreationHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
      <div className="w-full px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Insights Management
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {templateId ? 'Edit Template' : 'Create New Template'}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Configure your insight template settings and variables
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={onPreview}
              className="flex items-center gap-2 hover:bg-gray-50"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            <Button
              onClick={onSave}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white flex items-center gap-2 shadow-lg"
            >
              <Save className="w-4 h-4" />
              {isLoading ? 'Saving...' : templateId ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
