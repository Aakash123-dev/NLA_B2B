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
  handleProductChange?: (productString: string) => void; // ✅ Added
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
  handleProductChange, // ✅ Added
  placeholder,
  searchPlaceholder,
  icon,
  className,
  disabled = false,
  maxDisplayItems = 2,
}: SearchableMultiSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOptions = options.filter((option) => value.includes(option.id));

  const handleSelect = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];

    onValueChange(newValue);

    if (handleProductChange) {
      const newSelectedOptions = options.filter((option) =>
        newValue.includes(option.id)
      );
      const productString = newSelectedOptions.map((opt) => opt.name).join(',');
      handleProductChange(productString); // ✅ Call handler
    }
  };

  const removeItem = (optionId: string) => {
    const newValue = value.filter((id) => id !== optionId);
    onValueChange(newValue);

    if (handleProductChange) {
      const newSelectedOptions = options.filter((option) =>
        newValue.includes(option.id)
      );
      const productString = newSelectedOptions.map((opt) => opt.name).join(',');
      handleProductChange(productString); // ✅ Call handler
    }
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
              'h-11 justify-between border border-gray-200 bg-white transition-all duration-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500/20',
              value?.length === 0 && 'text-gray-500',
              className
            )}
            disabled={disabled}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              {icon && <div className="shrink-0">{icon}</div>}
              <span className="truncate text-left">{displayText()}</span>
            </div>
            <ChevronDown
              className={cn(
                'h-4 w-4 shrink-0 transition-transform duration-200',
                open && 'rotate-180 transform'
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] border-gray-200 bg-white p-0 shadow-lg">
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
                    className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm hover:bg-gray-50 focus:bg-gray-50"
                  >
                    <div
                      className={cn(
                        'flex h-4 w-4 items-center justify-center rounded border border-gray-300 transition-colors',
                        value.includes(option.id)
                          ? 'border-blue-500 bg-blue-500'
                          : 'bg-white hover:border-blue-300'
                      )}
                    >
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
        <div className="mt-2 flex flex-wrap gap-1">
          {selectedOptions.slice(0, maxDisplayItems).map((option) => (
            <Badge
              key={option.id}
              variant="secondary"
              className="max-w-[200px] border-blue-200 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
            >
              <span className="truncate">{option?.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeItem(option?.id);
                }}
                className="ml-1 rounded-full p-0.5 transition-colors hover:bg-blue-200 hover:text-blue-900"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {selectedOptions?.length > maxDisplayItems && (
            <Badge
              variant="secondary"
              className="bg-gray-100 px-2 py-1 text-xs text-gray-600"
            >
              +{selectedOptions?.length - maxDisplayItems} more
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
