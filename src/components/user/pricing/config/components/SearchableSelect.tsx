'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, ChevronDown, Check } from 'lucide-react';

interface SearchableSelectProps {
  title: string;
  items: string[]; // 🔄 changed from object array to string array
  selectedItem: string;
  onSelectionChange: (selectedId: string) => void;
  placeholder?: string;
  maxHeight?: string;
}

export const SearchableSelect = React.memo(function SearchableSelect({
  title,
  items,
  selectedItem,
  onSelectionChange,
  placeholder = 'Search items...',
  maxHeight = '300px',
}: SearchableSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const handleSelect = useCallback(
    (item: string) => {
      onSelectionChange(item);
      setIsOpen(false);
    },
    [onSelectionChange]
  );

  console.log(items, 'AllItemsListFdata');

  return (
    <div className="space-y-2">
      {/* Header with Title */}
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-slate-700">{title}</Label>
        {selectedItem && (
          <Badge
            variant="outline"
            className="border-blue-200 bg-blue-50 text-xs text-blue-600"
          >
            Selected
          </Badge>
        )}
      </div>

      {/* Dropdown Selector */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-11 w-full justify-between border-2 border-slate-300 bg-white shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 focus:border-blue-500"
          >
            <span className="truncate text-sm font-medium text-slate-600">
              {selectedItem ? selectedItem : `Select ${title.toLowerCase()}...`}
            </span>
            <ChevronDown
              className={`h-4 w-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[var(--radix-dropdown-menu-trigger-width)] rounded-lg border border-slate-200 bg-white p-0 shadow-lg"
          align="start"
          sideOffset={4}
        >
          <Card className="border-0 shadow-none">
            <CardContent className="p-0">
              {/* Search Header */}
              <div className="border-b border-slate-100 p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-slate-400" />
                  <Input
                    placeholder={placeholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 rounded-md border-slate-200 bg-slate-50 pl-10 text-sm focus:border-blue-500 focus:bg-white"
                  />
                </div>
                {searchQuery && (
                  <div className="mt-2 text-xs text-slate-500">
                    {filteredItems.length} result
                    {filteredItems.length !== 1 ? 's' : ''} found
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="p-2">
                <ScrollArea style={{ maxHeight }} className="pr-2">
                  <div className="space-y-1">
                    {filteredItems.length > 0 ? (
                      filteredItems.map((item) => {
                        const isSelected = selectedItem === item;
                        return (
                          <div
                            key={item}
                            className={`flex cursor-pointer items-center space-x-3 rounded-md p-2.5 transition-colors duration-200 hover:bg-slate-50 ${
                              isSelected
                                ? 'border border-blue-200 bg-blue-50'
                                : 'border border-transparent'
                            }`}
                            onClick={() => handleSelect(item)}
                          >
                            <div
                              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                                isSelected
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-slate-300'
                              }`}
                            >
                              {isSelected && (
                                <Check className="h-2.5 w-2.5 text-white" />
                              )}
                            </div>
                            <Label
                              className={`flex-1 cursor-pointer text-sm font-normal ${
                                isSelected
                                  ? 'font-medium text-blue-800'
                                  : 'text-slate-700'
                              }`}
                            >
                              {item}
                            </Label>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-8 text-center text-slate-500">
                        <Search className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                        <div className="text-sm">No items found</div>
                        {searchQuery && (
                          <div className="mt-1 text-xs text-slate-400">
                            Try a different search term
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 p-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">
                    {selectedItem ? '1 selected' : 'None selected'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedItem && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSelectionChange('')}
                      className="h-6 px-2 py-1 text-xs text-slate-600 hover:bg-red-50 hover:text-red-600"
                    >
                      Clear
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="h-6 rounded-md bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
});
