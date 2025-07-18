'use client';

import { PREDEFINED_BRANDS } from '../ProjectData';
import SelectField from './SelectField';

interface BrandsFieldProps {
  brands: string[];
  customInputs: Record<number, string>;
  addField: () => void;
  removeField: (index: number) => void;
  updateField: (index: number, value: string) => void;
  handleCustomInput: (index: number, value: string) => void;
}

const BrandsField = ({
  brands,
  customInputs,
  addField,
  removeField,
  updateField,
  handleCustomInput,
}: BrandsFieldProps) => {
  return (
    <SelectField
      fieldName="Brands"
      buttonLabel="Add Brand"
      placeholderPrefix="Select brand"
      items={brands}
      customInputs={customInputs}
      predefinedOptions={PREDEFINED_BRANDS}
      addField={addField}
      removeField={removeField}
      updateField={updateField}
      handleCustomInput={handleCustomInput}
    />
  );
};

export default BrandsField;
