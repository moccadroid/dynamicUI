import Ajv from 'ajv';

export function validateJson(json: any, schema: any): any {
  const ajv = new Ajv();
  const validate = ajv.compile(schema);
  const valid = validate(json);

  if (!valid) {
    console.error(validate.errors);
    return validate.errors;
  }
  return false;
}
