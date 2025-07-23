'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Option {
  id: string;
  name: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SearchableSelect({
  options,
  value,
  onValueChange,
  placeholder,
  searchPlaceholder,
  icon,
  className,
  disabled = false
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(option => option.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "h-11 justify-between border border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 hover:border-gray-300 transition-all duration-200 bg-white",
            !selectedOption && "text-gray-500",
            className
          )}
          disabled={disabled}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {icon && <div className="shrink-0">{icon}</div>}
            <span className="truncate text-left">
              {selectedOption ? selectedOption.name : placeholder}
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
              No options found.
            </CommandEmpty>
            <CommandGroup className="p-1">
              {options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.name}
                  onSelect={() => {
                    onValueChange(option.id === value ? "" : option.id);
                    setOpen(false);
                  }}
                  className="cursor-pointer flex items-center gap-3 px-3 py-2.5 text-sm hover:bg-gray-50 focus:bg-gray-50 rounded-md"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 text-blue-600",
                      value === option.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="flex-1">{option.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
