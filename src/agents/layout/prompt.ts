import type { LayoutPromptParams } from '@/agents/layout/api';
import { getDefinitions } from '@/dynamicUI/ai/definitions/getDefinitions';
import { textFormatters } from '@/dynamicUI/actions/format';


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

const example = {
  components: [{
    type: 'FlexLayout',
    properties: {
      direction: 'column',
      components: [{
        type: 'Input',
        properties: {
          // input properties
        }
      }],
    }
  }]
};

const getTextFormatters = () => {
  return Object.keys(textFormatters).join(', ');
};

export const generatePrompt = (params: LayoutPromptParams) => {

  /*
  const systemPrompt = `
    You're a UI/UX Designer who creates beautiful designs based on the data using the provided interfaces.
    You're building the template for a website builder. All components will be rendered from your output.
    Use all the components that are relevant to display the data.
    It is important that you use a List Component to display ANY array in the data.
    It is VERY important that you only include a layout for the FIRST entry. All others will be rendered with that template.
    LayoutConfig is the root of your JSON.
    Represent all the data faithfully.
    Return only valid JSON.
  `;
  */
  const systemPrompt = `
    You're job is to create a JSON representation of the supplied DATA by following the rules in INTERFACES.
    Always start the JSON with { components: []}.
    ARRAYS:
    If you encounter an array, ALWAYS use List component: { type: "List", layout: LayoutConfig }
    If the array has more than one entry, only create a layout for the first entry. This is the template for the rest of the array.
    If the array is at the top level, fieldName is an empty string.
    LAYOUTS:
    Layouts can be nested to create more complex visual representations. Child objects go into the "components" field.
    Use Layouts and Cards to group data that belongs together.
    Use a Headline in the first layout to explain the data.
    Represent all the data according to the rules in INTERFACES.
    COMPONENTS:
    Every component has "type" and "properties" at its root. The properties are described in INTERFACES.
    fieldName always points to the key in the data. If it doesn't exist or is wrong, no data will be displayed.
    Property fields like direction, fieldName, label, etc. always have to be in properties.
    For Links always make sure to put the href into the fieldName.
    FORMATTER:
    For components that have a format field, you can use the textformatters as described. 
    Let's think step by step to make sure you get this right, and stick closely to the rules.
  `;

  const userPrompt = `
    // DATA EXAMPLE
    ${JSON.stringify(params.exampleData)}
    
    // INTERFACES
    ${getDefinitions(params.definitions)}
    
    // FORMATTERS
    ${getTextFormatters()}
    
    ${params.layout ? `
      // CURRENT LAYOUT
      ${JSON.stringify(params.layout)}` : ''}

    ${params.userMessage ? `
      // INSTRUCTIONS
      ${params.userMessage}` : ''}
  `;

  return { userPrompt, systemPrompt };

};


