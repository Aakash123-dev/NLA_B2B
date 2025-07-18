'use client';

import RetailersField from './RetailersField';
import BrandsField from './BrandsField';
import ProductsField from './ProductsField';
import { NewProjectData, CustomInputsState } from '../ProjectTypes';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type ProjectDetailField = 'retailers' | 'brands' | 'products';

interface ProjectDetailsContainerProps {
  newProject: NewProjectData;
  customInputs: CustomInputsState;
  onAddField: (field: ProjectDetailField) => void;
  onRemoveField: (field: ProjectDetailField, index: number) => void;
  onUpdateField: (field: ProjectDetailField, index: number, value: string) => void;
  onCustomInputChange: (field: ProjectDetailField, index: number, value: string) => void;
}

const ProjectDetailsContainer = ({
  newProject,
  customInputs,
  onAddField,
  onRemoveField,
  onUpdateField,
  onCustomInputChange
}: ProjectDetailsContainerProps) => {
  // Count non-empty values for each field
  const retailerCount = newProject.retailers.filter(r => r.trim() !== '').length;
  const brandCount = newProject.brands.filter(b => b.trim() !== '').length;
  const productCount = newProject.products.filter(p => p.trim() !== '').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-200 pb-2">Project Details</h3>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              onAddField('retailers');
              onAddField('brands');
              onAddField('products');
            }}
          >
            <PlusCircle className="w-4 h-4 mr-1" />
            Add All Fields
          </Button>
        </div>
      </div>
      
      {/* Field counts summary */}
      <div className="flex items-center justify-between gap-4 text-sm text-slate-600 bg-slate-50 p-3 rounded-md">
        <div>
          <span className="font-medium">Retailers:</span> {retailerCount}
        </div>
        <div>
          <span className="font-medium">Brands:</span> {brandCount}
        </div>
        <div>
          <span className="font-medium">Products:</span> {productCount}
        </div>
      </div>
      
      {/* Retailers */}
      <RetailersField
        retailers={newProject.retailers}
        customInputs={customInputs.retailers}
        addField={() => onAddField('retailers')}
        removeField={(index) => onRemoveField('retailers', index)}
        updateField={(index, value) => onUpdateField('retailers', index, value)}
        handleCustomInput={(index, value) => onCustomInputChange('retailers', index, value)}
      />
      
      {/* Brands */}
      <BrandsField
        brands={newProject.brands}
        customInputs={customInputs.brands}
        addField={() => onAddField('brands')}
        removeField={(index) => onRemoveField('brands', index)}
        updateField={(index, value) => onUpdateField('brands', index, value)}
        handleCustomInput={(index, value) => onCustomInputChange('brands', index, value)}
      />
      
      {/* Products */}
      <ProductsField
        products={newProject.products}
        customInputs={customInputs.products}
        addField={() => onAddField('products')}
        removeField={(index) => onRemoveField('products', index)}
        updateField={(index, value) => onUpdateField('products', index, value)}
        handleCustomInput={(index, value) => onCustomInputChange('products', index, value)}
      />
    </div>
  );
};

export default ProjectDetailsContainer;
