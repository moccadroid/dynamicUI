import type { ValidationPromptParams } from '@/agents/validation/api';


export const generateValidationPrompt = (promptParams: ValidationPromptParams) => {

  const systemPrompt = `
    Create a JSON that can be used to create a Yup validation to validate the data based on the schema provided.
    The result is not a schema, it's a JSON file that describes the validation and can be validated against the schema definition.
    Make sure to stick exactly to the schema definition, so the resulting JSON will be valid!
    Let's think step by step to make sure we get this right.
    {
      'fields': {
        'username': {
          'type': 'string',
          'validations': [
            {
              'type': 'required',
              'args': {
                'message': 'Username is required'
              }
            }
          ]
        }
      }
    }
    This is a simple but correct validation. The can be more complex but rarely simpler. 
    Use the attached SCHEMA to create validations that correspond to the user request.  
    
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
