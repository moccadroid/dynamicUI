import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import type { FormProperties } from '@/dynamicUI/components/ComponentConfig';
import { Form, Formik } from 'formik';
import { PathProvider, useFullPath } from '@/dynamicUI/state/PathProvider';
import { createYupSchema } from '@/dynamicUI/parser/validation/createYupSchema';
import type { SchemaSpec } from '@/dynamicUI/parser/validation/types';
import { FormDataProvider } from '@/dynamicUI/state/FormDataProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { Stack } from '@chakra-ui/react';

const FormComponent: FC<{ children: ReactNode, properties: FormProperties }> = ({ children, properties }) => {
  const { fieldName, validation } = properties;
  const { fullPath } = useFullPath(fieldName);
  const { getState } = useSectionDataContext();

  let validationSchema = null;
  try {
    validationSchema = createYupSchema(validation as SchemaSpec);
  } catch (e) {
    console.error('Validation could not be parsed', validation);
  }

  const createInitialValues = () => {

    function setNestedValue(obj: any, path: string, value: any) {
      const keys = path.split('.');
      const lastKey = keys.pop();
      const lastObj = keys.reduce((acc, key) => {
        if (!acc[key]) acc[key] = {};
        return acc[key];
      }, obj);
      if (lastKey) {
        lastObj[lastKey] = value;
      }
    }

    const initialValues = {};
    properties.formFields.forEach(field => {
      const path = fullPath !== '' ? `${fullPath}.${field}` : field;
      const value = getState(path);
      if (value !== undefined) { // Ensure the value exists before setting it
        setNestedValue(initialValues, field, value);
      }
    });
    return initialValues;
  };

  const handleOnSubmit = (values: any) => {
    console.log('formValues', values);
  };

  const initialValues = useMemo(() => createInitialValues(), []);
  return (
    <PathProvider path={''}>
      <FormDataProvider initialData={initialValues}>
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
          validationSchema={validationSchema}
        >
          <Form>
            <Stack spacing={4}>
              { children }
            </Stack>
          </Form>
        </Formik>
      </FormDataProvider>
    </PathProvider>
  );
};

export default FormComponent;
