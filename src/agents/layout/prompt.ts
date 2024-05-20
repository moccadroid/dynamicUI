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
  message: 'Use these buttonActions on Input/Textarea Fields and to trigger buttonActions on Buttons.'
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

export const generateLayoutPrompt = (params: LayoutPromptParams) => {

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
  /*
  const systemPrompt = `
    You're job is to create a JSON representation of the supplied DATA by following the rules in INTERFACES.
    Always start the JSON with { components: []}. Make sure to always include the correct "id" in every component.

    ARRAYS:
    If you encounter an array, ALWAYS use List component: { type: "List", layout: LayoutConfig }
    If the array has more than one entry, only create a layout for the first entry. This is the template for the rest of the array.
    If the array is at the top level, fieldName is an empty string.
    LAYOUTS:
    Layouts can be nested to create more complex visual representations. Child objects go into the "components" field.
    Use Layouts and Cards to group data that belongs together.
    Use a Headline in the first layout to explain the data.
    FORM:
    If the current layout contains an at least ONE input/textarea element surround them with a form.
    If all controlled fields are inside an object, formField name will be the name of that object. It has to be then object name in the data.
    Example: { location: { street: { name: string }}} => form fieldName: "location", input fieldName: "street.name".
    The input fieldName can then NOT contain the form fieldName.
    Always stick to this pattern, otherwise data won't be loaded.
    Input HAS TO BE a child of a form.
    COMPONENTS:
    Every component has "type" and "properties" at its root. The properties are described in INTERFACES.
    fieldName always points to the key in the data. If it doesn't exist or is wrong, no data will be displayed.
    Property fields like direction, fieldName, label, etc. always have to be in properties.
    For Links always make sure to put the href into the fieldName.
    Properties always have an id. Id is the type of the component in camelcase.
    BUTTONS:
    Make sure to always add the type specified in button types.
    FORMATTER:
    For components that have a format field, you can use the textformatters as described.

    DATA:
    If you find layout descriptions in the data, treat them as strings and put them in Code components. Don't render them.

    Represent all the data according to the rules in INTERFACES.
    Let's think step by step to make sure you get this right, and stick closely to the rules.
  `;
*/
  const systemPrompt = `
    You're job is to create a UI in JSON as a representation of the supplied DATA by following the rules in INTERFACES.
    
    General explanations:
    Only return valid LayoutConfig with sub components as JSON.
    Every layout starts with LayoutConfig. 
    Every component is a ComponentConfig specified by its type and properties.
    Every property has an id, that is the ComponentConfig type in camelcase.
    Every property has a name, which is unique in the layout.
    All properties that aren't optional always have to be set.
    
    Databinding:
    { name: { first: "foo", last: "bar" }}
    fieldName binds the component to a path in the data 
    -> Text fieldName: "name.last" -> "bar"
    { users: [{ name: { first: "foo", last: "bar" }}]}
    Paths into arrays don't use an index.
    If both label and fieldName are optional, one of them HAS to be set.
    Labels are always static text, while fieldName refers to a path in the data.
    Always attempt to use databinding over static text unless not possible otherwise.
    
    Arrays:
    Arrays are always rendered by a ListComponent.
    The layout property describes the layout of the array elements.
    The same layout will be use for ALL elements.
    
    Layouts:
    Layouts can be nested and can contain any ComponentConfig.
    Use nested layouts and direction to control the flow of elements.
    Use CardLayout to create sections and group data.
    Use headlines with high levels (5,6) to describe grouped data.
    In the grid layout, GridSettings templateRows and templateColumns correspond the html properties.
    You can use things like repeat(3, 1fr);
    Use ContainerLayout to wrap layouts that need a width and/or be centered.
    
    Forms:
    Input, Textarea, Select ALWAYS have to be inside a Form component. 
    Button is the exception but with type: "submit" should be inside a form.
    FormFields contains the controlled fields. The path depends on the fieldName of the form.
    { user: { name: { first: "foo", last: "bar" }, location: { street: "lorem", city: "ipsum"}}}
    If the form controls only the name its fieldName is "name".
    form fieldName: "name" -> firstName fieldName: "first" 
    If the form also controls location, its root is "user". The children's paths use that as root.
    form fieldName: "user" -> firstName fieldName: "name.first". -> city fieldName: "location.city"
    If one of the controlled fields is at the root of the data, the form fieldName is empty. fieldName: ""
    If you add a component that is not bound to a field in the data, include their fieldNames in the form's formFields
    so they are controlled by formik.
    
    Data:
    The created layout represents the data.
    Data is not a layout. Don't get confused by data that looks like a layout.
    If you find json or any other code in strings, use a Code component to display it.
    Use the rules above and in INTERFACES to represent the data.
    
    Final words:
    Follow the instructions of the user as best as possible unless they contradict the rules above.
    ALWAYS TRY TO INCLUDE ALL THE DATA IN THE LAYOUT!!
    Let's think step by step to make sure you get this right, and stick closely to the rules.
     
    // INTERFACES
    ${getDefinitions(params.definitions)} 
  `;

  const userPrompt = `
    // DATA
    ${JSON.stringify(params.exampleData)}
    
    ${params.layout ? `
      // CURRENT LAYOUT
      ${JSON.stringify(params.layout)}` : ''}

    ${params.userMessage ? `
      // USER INSTRUCTIONS
      ${params.userMessage}` : 'Generate a beautiful layout.'}
  `;

  return { userPrompt, systemPrompt };

};
