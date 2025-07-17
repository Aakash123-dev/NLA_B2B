'use client';

import { PREDEFINED_PRODUCTS } from '../ProjectData';
import SelectField from './SelectField';

interface ProductsFieldProps {
  products: string[];
  customInputs: Record<number, string>;
  addField: () => void;
  removeField: (index: number) => void;
  updateField: (index: number, value: string) => void;
  handleCustomInput: (index: number, value: string) => void;
}

const ProductsField = ({
  products,
  customInputs,
  addField,
  removeField,
  updateField,
  handleCustomInput,
}: ProductsFieldProps) => {
  return (
    <SelectField
      fieldName="Products"
      buttonLabel="Add Product"
      placeholderPrefix="Select product"
      items={products}
      customInputs={customInputs}
      predefinedOptions={PREDEFINED_PRODUCTS}
      addField={addField}
      removeField={removeField}
      updateField={updateField}
      handleCustomInput={handleCustomInput}
    />
  );
};

export default ProductsField;
