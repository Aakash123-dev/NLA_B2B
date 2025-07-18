'use client';

import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ToolCategory } from '../types';

interface ToolPaletteProps {
  toolCategories: ToolCategory[];
  toolVersions: Record<string, number>;
  onDragStart: (e: React.DragEvent, toolId: string, toolName: string) => void;
}

export function ToolPalette({ 
  toolCategories, 
  toolVersions, 
  onDragStart 
}: ToolPaletteProps) {
  // Predefined pastel colors with safelist-friendly class names
  const pastelColorClasses = [
    'bg-gradient-to-br from-rose-100 to-rose-200 dark:from-rose-900/30 dark:to-rose-800/30',
    'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
    'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30',
    'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30',
    'bg-gradient-to-br from-lime-100 to-lime-200 dark:from-lime-900/30 dark:to-lime-800/30',
    'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
    'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30',
    'bg-gradient-to-br from-teal-100 to-teal-200 dark:from-teal-900/30 dark:to-teal-800/30',
    'bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900/30 dark:to-cyan-800/30',
    'bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/30 dark:to-sky-800/30',
    'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
    'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/30',
    'bg-gradient-to-br from-violet-100 to-violet-200 dark:from-violet-900/30 dark:to-violet-800/30',
    'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
    'bg-gradient-to-br from-fuchsia-100 to-fuchsia-200 dark:from-fuchsia-900/30 dark:to-fuchsia-800/30',
    'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30',
  ];

  // Function to get unique color for each tool
  const getToolColor = (categoryIndex: number, toolIndex: number) => {
    const colorIndex = (categoryIndex * 3 + toolIndex) % pastelColorClasses.length;
    return pastelColorClasses[colorIndex];
  };

  return (
    <div className="w-80 flex-shrink-0 bg-gradient-to-br from-slate-50/95 via-purple-50/90 to-pink-50/95 dark:bg-gradient-to-br dark:from-slate-800/95 dark:via-purple-900/90 dark:to-pink-900/95 backdrop-blur-lg border-r-2 border-purple-200/50 dark:border-purple-700/50 flex flex-col shadow-xl">
      {/* Tools Header */}
      <div className="flex-shrink-0 p-3 border-b border-purple-200/50 dark:border-purple-700/50 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
        <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent">
          Design Toolkit
        </h2>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Drag tools to canvas
        </p>
      </div>

      {/* Scrollable Tools Area */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {toolCategories.map((category, categoryIndex) => (
            <div key={category.name}>
              <h3 className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider px-2">
                {category.name}
              </h3>
              <div className="space-y-2">
                {category.tools.map((tool, toolIndex) => {
                  const Icon = tool.icon;
                  const toolColorClass = getToolColor(categoryIndex, toolIndex);
                  
                  return (
                    <div
                      key={tool.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, tool.id, tool.name)}
                      className="flex items-center space-x-3 p-2 bg-white/80 dark:bg-slate-700/30 backdrop-blur-sm rounded-lg border border-slate-200/50 dark:border-slate-600/30 hover:shadow-md hover:bg-white/90 dark:hover:bg-slate-700/50 transition-all duration-300 cursor-grab active:cursor-grabbing group"
                    >
                      <div className={`p-2 rounded-lg ${toolColorClass} transition-all duration-300 group-hover:scale-105`}>
                        <Icon className="w-4 h-4 text-slate-600 dark:text-slate-400 transition-colors duration-300" />
                      </div>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors duration-300">
                          {tool.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
