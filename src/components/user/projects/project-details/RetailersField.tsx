'use client';

import { PREDEFINED_RETAILERS } from '../ProjectData';
import SelectField from './SelectField';

interface RetailersFieldProps {
  retailers: string[];
  customInputs: Record<number, string>;
  addField: () => void;
  removeField: (index: number) => void;
  updateField: (index: number, value: string) => void;
  handleCustomInput: (index: number, value: string) => void;
}

const RetailersField = ({
  retailers,
  customInputs,
  addField,
  removeField,
  updateField,
  handleCustomInput,
}: RetailersFieldProps) => {
  console.log(retailers, 'retailers')
  return (
    <SelectField
      fieldName="Retailers"
      buttonLabel="Add Retailer"
      placeholderPrefix="Select retailer"
      items={retailers}
      customInputs={customInputs}
      predefinedOptions={PREDEFINED_RETAILERS}
      addField={addField}
      removeField={removeField}
      updateField={updateField}
      handleCustomInput={handleCustomInput}
    />
  );
};

export default RetailersField;
