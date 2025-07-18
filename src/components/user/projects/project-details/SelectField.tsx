'use client';

import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SelectFieldProps {
  fieldName: string;
  buttonLabel: string;
  placeholderPrefix: string;
  items: string[];
  customInputs: Record<number, string>;
  predefinedOptions: string[];
  addField: () => void;
  removeField: (index: number) => void;
  updateField: (index: number, value: string) => void;
  handleCustomInput: (index: number, value: string) => void;
}

const SelectField = ({
  fieldName,
  buttonLabel,
  placeholderPrefix,
  items,
  customInputs,
  predefinedOptions,
  addField,
  removeField,
  updateField,
  handleCustomInput,
}: SelectFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-slate-700">{fieldName}</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addField}
        >
          <Plus className="w-4 h-4 mr-1" />
          {buttonLabel}
        </Button>
      </div>
      
      {items.map((item, index) => (
        <div key={index} className="space-y-2">
          {item === '' ? (
            <div className="flex items-center gap-2">
              <Select 
                value={item} 
                onValueChange={(value) => {
                  if (value === 'custom') {
                    handleCustomInput(index, '');
                  } else {
                    updateField(index, value);
                  }
                }}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder={`${placeholderPrefix} ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {predefinedOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add Custom {fieldName.slice(0, -1)} {/* Remove 's' from fieldName */}
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-md text-sm">
                {item}
              </div>
              {items.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeField(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
          
          {customInputs[index] !== undefined && item === '' && (
            <div className="flex items-center gap-2">
              <Input
                value={customInputs[index] || ''}
                onChange={(e) => handleCustomInput(index, e.target.value)}
                placeholder={`Enter custom ${fieldName.slice(0, -1).toLowerCase()} name`}
                className="flex-1"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (customInputs[index]?.trim()) {
                    updateField(index, customInputs[index].trim());
                    handleCustomInput(index, '');
                  }
                }}
              >
                Add
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectField;
