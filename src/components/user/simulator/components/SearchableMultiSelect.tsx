'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
}

interface SearchableMultiSelectProps {
  options: Option[];
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder: string;
  searchPlaceholder: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  maxDisplayItems?: number;
}

export function SearchableMultiSelect({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  icon,
  className,
  disabled = false,
  maxDisplayItems = 2
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOptions = options.filter(option => value.includes(option.id));

  const handleSelect = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter(id => id !== optionId)
      : [...value, optionId];
    onValueChange(newValue);
  };

  const removeItem = (optionId: string) => {
    onValueChange(value.filter(id => id !== optionId));
  };

  const displayText = () => {
    if (value?.length === 0) return placeholder;
    if (value?.length === 1) return selectedOptions[0]?.name;
    return `${value?.length} selected`;
  };

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-11 justify-between border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300 transition-all duration-200 bg-white",
              value?.length === 0 && "text-gray-500",
              className
            )}
            disabled={disabled}
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              {icon && <div className="shrink-0">{icon}</div>}
              <span className="truncate text-left">
                {displayText()}
              </span>
            </div>
            <ChevronDown className={cn(
              "h-4 w-4 shrink-0 transition-transform duration-200",
              open && "transform rotate-180"
            )} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 shadow-lg border-gray-200 bg-white">
          <Command>
            <CommandInput 
              placeholder={searchPlaceholder}
              className="h-10 border-b border-gray-100"
            />
            <CommandList className="max-h-[300px] overflow-y-auto p-1">
              <CommandEmpty className="py-6 text-center text-sm text-gray-500">
                No products found.
              </CommandEmpty>
              <CommandGroup className="p-1">
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.name}
                    onSelect={() => handleSelect(option.id)}
                    className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-50 focus:bg-gray-50 rounded-md"
                  >
                    <div className={cn(
                      "h-4 w-4 border border-gray-300 rounded flex items-center justify-center transition-colors",
                      value.includes(option.id) ? "bg-blue-500 border-blue-500" : "bg-white hover:border-blue-300"
                    )}>
                      {value.includes(option.id) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <span className="flex-1">{option.name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected Items Display */}
      {value?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedOptions.slice(0, maxDisplayItems).map((option) => (
            <Badge 
              key={option.id}
              variant="secondary" 
              className="bg-blue-50 text-blue-700 border-blue-200 px-2 py-1 text-xs font-medium max-w-[200px] hover:bg-blue-100 transition-colors"
            >
              <span className="truncate">{option?.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(option?.id);
                }}
                className="ml-1 hover:text-blue-900 transition-colors rounded-full p-0.5 hover:bg-blue-200"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
          {selectedOptions?.length > maxDisplayItems && (
            <Badge variant="secondary" className="bg-gray-100 text-gray-600 px-2 py-1 text-xs">
              +{selectedOptions?.length - maxDisplayItems} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
