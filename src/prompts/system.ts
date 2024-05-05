import type { POSTChatRequestParams } from '@/api/chat/api';

export const systemInstructions = {
  message: ''
};

export const defaultInstructions = {
  message: `Please construct a JSON that will use the typescript interfaces to construct a GUI that displays all the data. 
  Make sure to show ALL of the data. Use the different components to structure the data visually. 
  
  `
};

export const actionInstructions = {
  message: 'Use these actions on Input/Textarea Fields and to trigger actions on Buttons.'
};

export const detailedInstructions = {
  message: ''
};

export const interfaceInstructions = {
  message: `
  The root is LayoutConfig {components: []}. 
  You can nest Layouts within each other to create more complex layouts. 
  Use Cards to group data that belongs together.
  Create a User Information card with image and information. 
  Use nested Layouts (vertical/horizontal) in cards to make more interesting Cards Layouts. 
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

const componentConfig = `
import type { ActionNames } from '@/interfaces/actions/ActionConfig';

export interface TextareaProperties {
    label: string;
    placeholder?: string;
    fieldName: string; // binds the field to the data. must include the path to the data. example: user.name.firstName
    action: ActionNames; // String identifier for the action
}

export interface ButtonProperties {
    text: string;
    action: ActionNames;
}

export interface HeadlineProperties {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface InputProperties { // used for editable data
    label: string;
    placeholder?: string;
    fieldName: string;
    action: ActionNames;
}

export interface ImageProperties {
    fieldName: string; // path to src in the data
    alt: string;
}

export interface TextProperties { // used for plain text
    fieldName: string;
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface LabeledTextProperties {
    fieldName: string;
    label: string // the label of the value
    separator: ':' // label : text
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export interface FlexLayoutProperties extends LayoutConfig{ // can be nested
    direction: 'row' | 'column';
    components: ComponentConfig[];
}

export interface CardLayoutProperties extends LayoutConfig{ // can be nested
    title: string; // the title of the card
    components: ComponentConfig[]; // the body of the card
}

export interface ComponentConfig { // describes the above components
    type: 'Input' | 'Button' | 'Headline' | 'Textarea' | 'FlexLayout' | 'CardLayout' | 'Image' | 'Text' | 'LabeledText';
    properties: InputProperties | ButtonProperties | HeadlineProperties | TextareaProperties | FlexLayoutProperties | ImageProperties | CardLayoutProperties | TextProperties | LabeledTextProperties;
}

export interface LayoutConfig { // the root of the components
    components: ComponentConfig[];
}

`;

export const generatePrompt = (params: POSTChatRequestParams['promptParams']) => {

  let prompt = `
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
