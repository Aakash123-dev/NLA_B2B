'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { X, ArrowLeft } from 'lucide-react';
import { NodeConfigProps } from '../../types';

interface NodeConfigWrapperProps {
  nodeId: string;
  nodeType: string;
  nodeName: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function NodeConfigWrapper({ 
  nodeId, 
  nodeType, 
  nodeName, 
  onClose, 
  children 
}: NodeConfigWrapperProps) {
  return (
    <div className="h-full flex flex-col bg-white dark:bg-slate-900 min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Configure {nodeName}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {nodeType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} • Node ID: {nodeId}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto min-h-0">
        {children}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex-shrink-0">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="space-x-2">
          <Button variant="outline">
            Reset
          </Button>
          <Button>
            Apply Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
