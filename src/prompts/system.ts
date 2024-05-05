import { GETComponentConfig } from '@/api/db/api';
import type { POSTChatRequestParams } from '@/api/chat/api';

export const systemInstructions = {
  message: ''
};

export const defaultInstructions = {
  message: `Please construct a JSON that will use the typescript interfaces to construct a GUI that displays all the data. 
  Make sure to show ALL of the data. Use the different components to structure the data visually.`
};

export const actionInstructions = {
  message: 'Use these actions on Input/Textarea Fields and to trigger actions on Buttons.'
};

export const detailedInstructions = {
  message: ''
};

export const interfaceInstructions = {
  message: `
  The root is LayoutConfig. 
  You can nest Layouts within each other to create more complex layouts. 
  Use Cards to group data that belongs together
  .`
};

export const dataInstructions = {
  message: `
    This is a representation of an api call.
  `
};

const actions = `
export enum ActionNames {
  updateField = 'updateField', // used to update the state of fields (use on form elements)
  submitForm = 'submitForm', // used to submit state (use on buttons)
  refreshData = 'refreshData' // use on buttons
}`;

export const generatePrompt = async (params: POSTChatRequestParams['promptParams']) => {

  //const data = await GETData();
  const componentConfig = await GETComponentConfig();
  let prompt = '';

  prompt = `
    // SYSTEM
    ${systemInstructions.message}
    
    // DATA
    ${dataInstructions.message}
    ${JSON.stringify(params.data)}
    
    // INTERFACES
    ${interfaceInstructions.message}
    ${componentConfig}
    
    // ACTIONS
    ${actionInstructions.message}
    ${actions}
  `;

  if (params?.layout) {
    prompt += `
    // CURRENT LAYOUT
    ${JSON.stringify(params.layout)}
    `;
  }

  prompt += `
    // INSTRUCTIONS
    ${defaultInstructions.message}
  `;

  if (params?.userMessage) {
    prompt += `
    // USER MESSAGE
    ${params.promptHistory?.length ? params.promptHistory?.join('\n') : ''}
    ${params.userMessage}
    `;
  }

  return prompt;
};
