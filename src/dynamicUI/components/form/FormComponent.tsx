import type { FC, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useMemo } from 'react';
import type { FormProperties } from '@/dynamicUI/components/ComponentConfig';
import { Form, Formik } from 'formik';
import { PathProvider, useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { Stack } from '@chakra-ui/react';
import { useActions } from '@/dynamicUI/hooks/useActions';
import { createYupSchema } from '@/dynamicUI/parser/validation/createYupSchema';
import type { SchemaSpec } from '@/dynamicUI/parser/validation/types';
import type { AnySchema } from 'yup';

const FormComponent: FC<{ children: ReactNode, properties: FormProperties }> = ({ children, properties }) => {
  const { name, fieldName, validation, onSubmit } = properties;
  const { fullPath } = useFullPath(fieldName);
  const { sectionState, getSectionState } = useSectionDataContext();
  const actions = useActions();
  const [validationSchema, setValidationSchema] = useState<AnySchema>();

  useEffect(() => {
    try {
      if (validation && validation !== '')
        setValidationSchema(createYupSchema(validation as SchemaSpec));

    } catch (e) {
      console.log('Validation could not be parsed', validation);
    }
  }, [validation]);

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
      const value = getSectionState(path);
      if (value !== undefined) { // Ensure the value exists before setting it
        setNestedValue(initialValues, field, value);
      }
    });
    return initialValues;
  };
  const initialValues = useMemo(() => createInitialValues(), [sectionState]);

  const handleOnSubmit = async (values: any) => {
    const action = actions[onSubmit];
    if (action) {
      await action(name, values);
    }
    console.log('formValues', values);
  };


  return (
    <PathProvider path={''}>
      <Formik
        initialValues={initialValues}
        onSubmit={handleOnSubmit}
        validationSchema={validationSchema}
        enableReinitialize
      >
        <Form>
          <Stack spacing={4}>
            { children }
          </Stack>
        </Form>
      </Formik>
    </PathProvider>
  );
};

export default FormComponent;
