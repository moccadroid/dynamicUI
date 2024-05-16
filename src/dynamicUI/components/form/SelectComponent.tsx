import type { SelectProperties } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import type { FieldInputProps } from 'formik';
import { Field, type FormikProps } from 'formik';
import { FormControl, FormErrorMessage, FormLabel, Select } from '@chakra-ui/react';

const SelectComponent: FC<{ properties: SelectProperties}> = ({ properties }) => {
  const { fieldName, label } = properties;

  /*
  if (!fieldName) {
    return (
      <FormControl>
        <FormLabel>{label}</FormLabel>
        <Select>

        </Select>
      </FormControl>
    );
  }
  */

  return (
    <Field name={fieldName} label={label} component={InternalSelect}/>
  );
};

const InternalSelect: FC<SelectProperties & { field: FieldInputProps<any>, form: FormikProps<any> }> =
    ({ field, form, label }) => {
      return (
        <FormControl isInvalid={!!(form.errors[field.name] && form.touched[field.name])}>
          <FormLabel>{label}</FormLabel>
          <Select {...field} id={field.name}>

          </Select>
          <FormErrorMessage>{form.errors[field.name] as any}</FormErrorMessage>
        </FormControl>
      );
    };

export default SelectComponent;
