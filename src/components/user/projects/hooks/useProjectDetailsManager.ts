'use client';

import { useState, useCallback } from 'react';
import { NewProjectData, CustomInputsState } from '../ProjectTypes';

type ProjectDetailField = 'retailers' | 'brands' | 'products';

export const useProjectDetailsManager = (
  initialProject: NewProjectData,
  initialCustomInputs: CustomInputsState
) => {
  const [newProject, setNewProject] = useState<NewProjectData>(initialProject);
  const [customInputs, setCustomInputs] = useState<CustomInputsState>(initialCustomInputs);

  // Add a new empty field
  const addField = useCallback((field: ProjectDetailField) => {
    setNewProject(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  }, []);

  // Remove a field at specified index
  const removeField = useCallback((field: ProjectDetailField, index: number) => {
    // Remove the field itself
    setNewProject(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
    
    // Also clean up any custom input state for this field
    setCustomInputs(prev => {
      const updatedFieldInputs = { ...prev[field] };
      delete updatedFieldInputs[index];
      
      // Remap keys if needed for remaining fields
      const newFieldInputs: Record<number, string> = {};
      const remainingIndices = Object.keys(updatedFieldInputs).map(Number);
      
      remainingIndices.forEach((oldIndex, i) => {
        if (oldIndex > index) {
          // Shift down indices for fields after the deleted one
          newFieldInputs[oldIndex - 1] = updatedFieldInputs[oldIndex];
        } else {
          // Keep the same indices for fields before the deleted one
          newFieldInputs[oldIndex] = updatedFieldInputs[oldIndex];
        }
      });
      
      return {
        ...prev,
        [field]: newFieldInputs
      };
    });
  }, []);

  // Update a field with a new value
  const updateField = useCallback((field: ProjectDetailField, index: number, value: string) => {
    setNewProject(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
    
    // If a value is selected, clear any custom input for this field
    if (value) {
      setCustomInputs(prev => {
        const updatedFieldInputs = { ...prev[field] };
        delete updatedFieldInputs[index];
        
        return {
          ...prev,
          [field]: updatedFieldInputs
        };
      });
    }
  }, []);

  // Handle custom input for new items
  const handleCustomInput = useCallback((field: ProjectDetailField, index: number, value: string) => {
    setCustomInputs(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [index]: value
      }
    }));
  }, []);

  // Add a custom item to the list
  const addCustomItem = useCallback((field: ProjectDetailField, index: number) => {
    const customValue = customInputs[field][index];
    if (customValue && customValue.trim()) {
      updateField(field, index, customValue.trim());
      
      // Clear the custom input after adding
      setCustomInputs(prev => {
        const updatedFieldInputs = { ...prev[field] };
        delete updatedFieldInputs[index];
        
        return {
          ...prev,
          [field]: updatedFieldInputs
        };
      });
    }
  }, [customInputs, updateField]);

  // Validate if all selected fields have values
  const validateFields = useCallback(() => {
    const fieldsToValidate: ProjectDetailField[] = ['retailers', 'brands', 'products'];
    const validations = fieldsToValidate.map(field => {
      // Check if there's at least one field with a value
      return newProject[field].some(value => value && value.trim() !== '');
    });
    
    // All fields should have at least one value
    return validations.every(isValid => isValid);
  }, [newProject]);

  // Clear all fields
  const clearAllFields = useCallback(() => {
    setNewProject(prev => ({
      ...prev,
      retailers: [''],
      brands: [''],
      products: ['']
    }));
    
    setCustomInputs({
      retailers: {},
      brands: {},
      products: {}
    });
  }, []);

  return {
    newProject,
    setNewProject,
    customInputs,
    setCustomInputs,
    addField,
    removeField,
    updateField,
    handleCustomInput,
    addCustomItem,
    validateFields,
    clearAllFields,
  };
};
