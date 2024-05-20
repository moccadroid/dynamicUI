import type { ValidationPromptParams } from '@/agents/validation/api';


export const generateValidationPrompt = (promptParams: ValidationPromptParams) => {

  const systemPrompt = `
    Create a JSON that can be used to create a Yup validation to validate the data based on the schema provided.
    Use the supplied SCHEMA definition of validations to create a validation according to the DATA and the INSTRUCTIONS.
    The fields that can be validated are in "formFields".
    Make sure to stick exactly to the schema definition, so the resulting JSON will be valid!
    Your response should start with this: { "fields": {} }. The fields and their validations are keys in "fields".
    If you create a validation that depends on another field, use a conditional validation. 
    Let's think step by step to make sure we get this right.
    
    
    // SCHEMA
    ${promptParams.schema}
  `;

  const userPrompt = `
    // DATA
    ${JSON.stringify(promptParams.data)}
    
    // INSTRUCTIONS
    ${promptParams.prompt}

  `;

  return { systemPrompt, userPrompt };
};
