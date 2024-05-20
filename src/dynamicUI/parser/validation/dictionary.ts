import * as Yup from 'yup';
import type { ConditionFunction, ValidationFunction } from '@/dynamicUI/parser/validation/types';

export const validationsDictionary: { [key: string]: ValidationFunction } = {
  required: (schema, args) => schema.required(args?.message),
  email: (schema, args) => {
    if (schema.type === 'string') {
      return (schema as Yup.StringSchema).email(args?.message);
    }
    console.warn('Email validation applied to a non-string field');
    return schema;
  },
  positive: (schema, args) => {
    if (schema.type === 'number') {
      return (schema as Yup.NumberSchema).positive(args?.message);
    }
    return schema;
  },
  equalTo: (schema, args) => {
    if (args && 'referenceField' in args) {
      console.log(args);
      schema.oneOf([Yup.ref(args.referenceField as string), null], args.message);
    }
    return schema;
  },
  matches: (schema, args) => {
    if (schema.type === 'string') {
      return (schema as Yup.StringSchema).matches(new RegExp(args?.regex as string), args?.message);
    }
    console.warn('Matches validation applied to a non-string field');
    return schema;
  }
};

export const conditionalTestsDictionary: Record<string, ConditionFunction> = {
  equals: (context, value, args, ) => value === context.parent[args.referenceField],
  notEquals: (context, value, args) => value !== context.parent[args.referenceField],
  greaterThan: (context, value, args) => value > context.parent[args.referenceField],
  exists: (context, value, args) => !!value && !!context.parent[args.referenceField],
  // Add more condition functions as needed
};
