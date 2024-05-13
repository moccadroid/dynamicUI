import type { InputProperties } from '@/dynamicUI/components/ComponentConfig';
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import type { FC } from 'react';
import type { FieldInputProps, FormikProps } from 'formik';
import { Field } from 'formik';

const InputComponent: FC<{ properties: InputProperties }> = ({ properties }) => {
  const { label, fieldName, placeholder, type } = properties;
  return (
    <Field name={fieldName} type={type} placeholder={placeholder} label={label} component={InternalInput} />
  );
};

const InternalInput: FC<InputProperties & { field: FieldInputProps<any>, form: FormikProps<any> }> =
  ({ field, form, label, placeholder }) => {
    return (
      <FormControl variant="floating" isInvalid={!!(form.errors[field.name] && form.touched[field.name])}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
        <Input placeholder={placeholder} {...field} id={field.name} />
        <FormLabel>{label}</FormLabel>
        <FormErrorMessage>{form.errors[field.name] as any}</FormErrorMessage>
      </FormControl>
    );
  };

export default InputComponent;
