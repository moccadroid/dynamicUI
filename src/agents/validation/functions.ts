export interface CreateValidationProps {
  data: string;
  prompt: string;
}

export const validationFunctions = [
  {
    'type': 'function',
    'function': {
      'name': 'createValidation',
      'description': 'Creates a form validation schema for the fields managed by the form',
      'parameters': {
        'type': 'object',
        'properties': {
          'data': {
            'type': 'string',
            'description': 'The data that is to be validated',
          },
          'prompt': {
            'type': 'string',
            'description': 'The fields and how they are to be validated',
          },
        },
        'required': ['data', 'prompt'],
      },
    }
  }
];
