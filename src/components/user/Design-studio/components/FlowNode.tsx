'use client';

import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Settings } from 'lucide-react';
import { FlowNodeData } from '../types';

export function FlowNode({ data, selected }: NodeProps<FlowNodeData>) {
  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    data.onDoubleClick?.();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    data.onDelete();
  };

  const handleConfigure = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    data.onConfigure?.();
  };

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    e.preventDefault();
    action();
  };

  // Get node color based on type
  const getNodeColor = (type: string) => {
    const colors = {
      'pricing': 'from-emerald-400 to-emerald-600',
      'forecasting': 'from-violet-400 to-violet-600',
      'insights-template': 'from-yellow-400 to-yellow-600',
      'pie-chart': 'from-rose-400 to-rose-600',
      'standard-insights-report': 'from-blue-400 to-blue-600',
      'template-1': 'from-sky-400 to-sky-600',
      'template-2': 'from-orange-400 to-orange-600',
      'template-3': 'from-amber-400 to-amber-600',
      'trade-calendar': 'from-green-400 to-green-600',
      'trade-plan-optimization': 'from-lime-400 to-lime-600',
      'data-filter': 'from-purple-400 to-purple-600',
      'import-file': 'from-indigo-400 to-indigo-600',
      'export-file': 'from-cyan-400 to-cyan-600',
      'design-canvas': 'from-pink-400 to-pink-600',
      'shape-builder': 'from-slate-400 to-slate-600',
      'insights-generator': 'from-teal-400 to-teal-600',
      'default': 'from-gray-400 to-gray-600'
    };
    return colors[type as keyof typeof colors] || colors.default;
  };

  return (
    <div 
      className={`group relative min-w-[180px] max-w-[200px] bg-white dark:bg-slate-900 rounded-xl border transition-all duration-200 ${
        selected 
          ? 'border-blue-400 shadow-lg shadow-blue-500/20 ring-1 ring-blue-400/30' 
          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md'
      }`}
      onDoubleClick={handleDoubleClick}
    >
      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        id="top"
        className="w-3 h-3 !bg-blue-500 !border-2 !border-white !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-125 hover:!bg-blue-600 shadow-sm"
        style={{ top: -6, zIndex: 10 }}
        isConnectable={true}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-3 h-3 !bg-blue-500 !border-2 !border-white !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-125 hover:!bg-blue-600 shadow-sm"
        style={{ left: -6, zIndex: 10 }}
        isConnectable={true}
      />

      {/* Node Header with Gradient */}
      <div className={`drag-handle px-3 py-2 bg-gradient-to-r ${getNodeColor(data.type)} rounded-t-[10px] cursor-move pointer-events-auto`}>
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white truncate">
              {data.label}
            </h3>
            <p className="text-xs text-white/70 mt-0.5">
              {data.type.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
          
          <div className="flex items-center space-x-1 pointer-events-auto">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-200"
              onClick={(e) => handleButtonClick(e, () => data.onConfigure?.())}
              title="Configure"
            >
              <Settings className="h-3 w-3" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-red-500/20 text-white/80 hover:text-red-300 transition-all duration-200"
              onClick={(e) => handleButtonClick(e, () => data.onDelete())}
              title="Delete"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Node Content */}
      <div className="px-3 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              v{data.version}
            </span>
          </div>
        </div>
      </div>

      {/* Output Handles */}
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom"
        className="w-3 h-3 !bg-green-500 !border-2 !border-white !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-125 hover:!bg-green-600 shadow-sm"
        style={{ bottom: -6, zIndex: 10 }}
        isConnectable={true}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-3 h-3 !bg-green-500 !border-2 !border-white !rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-125 hover:!bg-green-600 shadow-sm"
        style={{ right: -6, zIndex: 10 }}
        isConnectable={true}
      />
    </div>
  );
}
