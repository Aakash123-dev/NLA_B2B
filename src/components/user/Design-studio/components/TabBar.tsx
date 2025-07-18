'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { X, Home, Settings, Database, BarChart3, Filter, MoreHorizontal, Copy, Edit3 } from 'lucide-react';
import { DesignStudioTab } from '../types';
import { canCloseTab, getTabDisplayName } from '../utils/tabUtils';

interface TabBarProps {
  tabs: DesignStudioTab[];
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onTabCloseAll?: () => void;
  onTabCloseOthers?: (tabId: string) => void;
  onTabRename?: (tabId: string, newName: string) => void;
}

// Helper function to get icon for tab type
const getTabIcon = (tabType: string) => {
  switch (tabType) {
    case 'canvas':
      return <Home className="w-3 h-3" />;
    case 'pricing':
      return <BarChart3 className="w-3 h-3" />;
    case 'forecasting':
      return <Filter className="w-3 h-3" />;
    case 'trade-plan-optimization':
      return <Settings className="w-3 h-3" />;
    default:
      return <Database className="w-3 h-3" />;
  }
};

export function TabBar({ 
  tabs, 
  onTabClick, 
  onTabClose, 
  onTabCloseAll,
  onTabCloseOthers,
  onTabRename 
}: TabBarProps) {
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (tab: DesignStudioTab) => {
    setEditingTab(tab.id);
    setEditValue(tab.name);
  };

  const handleEditSubmit = (tabId: string) => {
    if (onTabRename && editValue.trim()) {
      onTabRename(tabId, editValue.trim());
    }
    setEditingTab(null);
    setEditValue('');
  };

  const handleEditCancel = () => {
    setEditingTab(null);
    setEditValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEditSubmit(tabId);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleEditCancel();
    }
  };

  return (
    <div className="flex-shrink-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700/50 flex items-center px-6 overflow-x-auto">
      <div className="flex items-center space-x-1 min-w-0">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 whitespace-nowrap group ${
              tab.isActive
                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400 bg-cyan-50/50 dark:bg-cyan-900/10'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50/50 dark:hover:bg-slate-700/30'
            }`}
          >
            <button
              onClick={() => onTabClick(tab.id)}
              className="flex items-center space-x-2 text-sm font-medium"
              title={`Switch to ${tab.name}`}
            >
              {getTabIcon(tab.type)}
              {editingTab === tab.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, tab.id)}
                  onBlur={() => handleEditSubmit(tab.id)}
                  className="bg-transparent border-none outline-none text-sm font-medium w-24 truncate min-w-0 focus:ring-0"
                  autoFocus
                  maxLength={50}
                />
              ) : (
                <span className="truncate max-w-32">{tab.name}</span>
              )}
            </button>
            
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {canCloseTab(tab.id) && (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                        variant="ghost"
                        size="sm"
                        title="Tab options"
                      >
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditStart(tab)}>
                        <Edit3 className="w-4 h-4 mr-2" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onTabClose(tab.id)}>
                        <X className="w-4 h-4 mr-2" />
                        Close
                      </DropdownMenuItem>
                      {onTabCloseOthers && (
                        <DropdownMenuItem onClick={() => onTabCloseOthers(tab.id)}>
                          <Copy className="w-4 h-4 mr-2" />
                          Close Others
                        </DropdownMenuItem>
                      )}
                      {onTabCloseAll && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={onTabCloseAll}>
                            <X className="w-4 h-4 mr-2" />
                            Close All
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button
                    onClick={() => onTabClose(tab.id)}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                    variant="ghost"
                    size="sm"
                    title={`Close ${tab.name}`}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Tab Actions */}
      <div className="flex items-center space-x-2 ml-auto">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {tabs.length} tab{tabs.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
