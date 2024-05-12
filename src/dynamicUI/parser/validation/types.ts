// Define basic types for common properties
import type * as Yup from 'yup';

export type RegexType = string;


// Define the structure for conditional tests
export interface ConditionTest {
  test: string; // This could be 'equals', 'notEquals', etc.
  referenceField: string;
  value?: any;
}

export interface ConditionArgs {
  message: string;
  condition: ConditionTest,
}

// Define the structure for arguments passed to validation functions
export interface ValidationArgs {
  message: string;
  regex?: RegexType;
  referenceField?: string;
}

// Define the structure for individual validations
export interface ValidationSpec {
  type: string;
  args?: ValidationArgs | ConditionArgs;
}

export interface FieldSpec {
  type: string;
  validations: ValidationSpec[];
}

export interface SchemaSpec {
  fields: { [key: string]: FieldSpec };
}

export type ValidationFunction = (schema: Yup.AnySchema, args?: ValidationArgs) => Yup.AnySchema;
export type ConditionFunction = (context: Yup.TestContext, value: any, args: ConditionTest) => boolean;
