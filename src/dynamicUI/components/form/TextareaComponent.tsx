import type { InputProperties, TextareaProperties, TextFormatter } from '@/dynamicUI/components/ComponentConfig';
import type { FC } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { FormControl, FormErrorMessage, FormLabel, Textarea } from '@chakra-ui/react';
import type { FieldInputProps, FormikProps } from 'formik';
import { useFormikContext } from 'formik';
import { Field } from 'formik';
import useFormat from '@/dynamicUI/actions/format';

const TextareaComponent: FC<{ properties: TextareaProperties }> = ({ properties }) => {
  const { fieldName, placeholder, label, format } = properties;

  const formikContext = useFormikContext();

  if (!formikContext) {
    console.error('TextareaComponent must be used within a Formik context.');
    return null;
  }

  return (
    <Field name={fieldName} format={format} placeholder={placeholder} label={label} component={InternalInput} />
  );
};

const InternalInput: FC<InputProperties & { field: FieldInputProps<any>,  format: TextFormatter[] | undefined, form: FormikProps<any> }> =
    ({ field,  form, format, label, placeholder }) => {
      const hasFormattedInitialValue = useRef(false);
      const formatText = useFormat(format);

      useEffect(() => {
        if (format && field.value && !hasFormattedInitialValue.current) {
          void form.setFieldValue(field.name, formatText(field.value as string));
          hasFormattedInitialValue.current = true;
        }
      }, [field]);

      return (
        <FormControl variant="floating" isInvalid={!!(form.errors[field.name] && form.touched[field.name])}>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
          <Textarea placeholder={placeholder} {...field} id={field.name} />
          <FormLabel>{label}</FormLabel>
          <FormErrorMessage>{form.errors[field.name] as any}</FormErrorMessage>
        </FormControl>
      );
    };

export default TextareaComponent;
