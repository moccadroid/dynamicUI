
import { conditionalTestsDictionary, validationsDictionary } from '@/dynamicUI/parser/validation/dictionary';
import * as Yup from 'yup';
import type { ObjectSchema } from 'yup';
import type {
  ConditionArgs, ConditionTest,
  SchemaSpec,
} from '@/dynamicUI/parser/validation/types';

type SchemaObject = { [key: string]: any };

const buildTestFunction = (condition: ConditionTest) => (value: any, context: Yup.TestContext): boolean => {
  const conditionFunc = conditionalTestsDictionary[condition.test];
  if (!conditionFunc) {
    throw new Error(`No condition function found for type '${condition.test}'`);
  }
  return conditionFunc(context, value, condition);
};

const setNestedSchema = (schemaObject: SchemaObject, path: string[], schemaToAdd: any) => {
  let current = schemaObject;

  // Iterate through the path and build the schema object structure
  for (let i = 0; i < path.length; i++) {
    const part = path[i];

    // If we're at the last part, set the schema
    if (i === path.length - 1) {
      current[part] = schemaToAdd;
    } else {
      // Create a nested object if it does not exist
      current[part] = current[part] || {};
      // Move into the next level of the schema object
      current = current[part];
    }
  }
};

export const createYupSchema = (schemaSpec: SchemaSpec) => {
  const schemaObject: SchemaObject = {};
  Object.keys(schemaSpec.fields).forEach(fullFieldName => {
    const field = schemaSpec.fields[fullFieldName];
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    let schema = Yup[field.type]();
    field.validations.forEach(validation => {
      if (validation.type === 'conditional') {
        const { condition, message } = validation.args as ConditionArgs;
        const testName = `${condition.test}: ${fullFieldName} - ${condition.referenceField}`;
        schema = schema.test(testName, message, buildTestFunction(condition));
      } else {
        const validationFunction = validationsDictionary[validation.type];
        if (validationFunction) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          schema = validationFunction(schema, validation.args);
        }
      }
    });

    // Handle nested fields
    const path = fullFieldName.split('.');
    setNestedSchema(schemaObject, path, schema);
  });

  function convertToYupObject(obj: SchemaObject): ObjectSchema<any> {
    return Yup.object().shape(
      Object.keys(obj).reduce((acc: Record<string, any>, key: string) => {
        // Check if the value at the key is already a Yup schema
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        acc[key] = Yup.isSchema(obj[key]) ? obj[key] : convertToYupObject(obj[key]);
        return acc;
      }, {})
    );
  }


  return convertToYupObject(schemaObject);
};
