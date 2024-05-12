type TextFormatter = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE' | 'REMOVE_UNDERSCORES';
type ButtonType = 'submit';

type GridSettings = { // standard html grid settings, use only the fields detailed here!
    templateRows?: string; // this applies to the grid itself
    templateColumns?: string; // same as above
    childSettings?: { rowSpan?: number; colSpan?: number; }[]; // if set it should have an entry for each child in components. it will be applied to the child at index position
}

export interface TextareaProperties {
    id: 'textarea';
    label: string;
    placeholder?: string;
    fieldName: string; // binds the field to the data. must include the path to the data. example: user.name.firstName
    action?: string; // String identifier for the action
}

export interface ButtonProperties {
    id: 'button';
    text: string;
    type: ButtonType;
    format?: TextFormatter[]; // Array of formatter keys
}

export interface HeadlineProperties {
    id: 'headline';
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface InputProperties { // used for editable data
    id: 'input';
    label: string;
    placeholder?: string;
    fieldName: string;
    action?: string;
}

export interface ImageProperties {
    id: 'image';
    fieldName: string; // path to src in the data
    alt: string;
}

export interface LinkProperties {
    id: 'link';
    fieldName: string; // path to the src in the data
}

export interface TextProperties { // used for plain text
    id: 'text';
    fieldName: string;
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface LabeledTextProperties {
    id: 'labeledText';
    fieldName: string;
    label: string // the label of the value
    separator: ':' // label : text
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface ConcatTextProperties { // used to concat multiple data fields into one text component
    id: 'concatText';
    fields: string[];  // Array of field paths
    separator: string; // Separator for concatenation
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}


export interface FormProperties extends LayoutConfig { // wraps input components
    id: 'form';
    fieldName: string; // the root name of the object this form controls
    formFields: string[]; // the field names that this form controls
    //submitFormat: Record<string, any>;
    validation: any; // don't fill this out yourself. always call createValidation function if the user asks for validation
    components: ComponentConfig[];
}

export interface ListProperties { // always used for arrays!!
    id: 'list';
    direction?: 'row' | 'column';
    as?: 'grid'; // uses a grid layout internally to layout the elements. use this if you want to show an array in a grid.
    gridSettings?: GridSettings; // this has to be set if 'as': 'grid'!
    fieldName: string; // name of the field where the array can be found
    layout: LayoutConfig; // the layout of a list entry
}

export interface GridLayoutProperties extends LayoutConfig { // don't use this to display arrays or single lists!!
    id: 'grid';
    gridSettings: GridSettings;
    components: ComponentConfig[];
}

export interface FlexLayoutProperties extends LayoutConfig { // can be nested
    id: 'flexLayout';
    direction: 'row' | 'column';
    components: ComponentConfig[];
}

export interface CardLayoutProperties extends LayoutConfig { // can be nested
    id: 'cardLayout';
    components: ComponentConfig[]; // the body of the card
}

export interface ComponentConfig { // describes the above components
    type: 'Input' | 'Button' | 'Headline' | 'Textarea' | 'FlexLayout' | 'CardLayout'
      | 'Image' | 'Text' | 'LabeledText' | 'List' | 'Link' | 'ConcatText' | 'Form' | 'GridLayout';
    properties: InputProperties | ButtonProperties | HeadlineProperties | TextareaProperties
      | FlexLayoutProperties | ImageProperties | CardLayoutProperties | TextProperties | LabeledTextProperties
      | ListProperties | LinkProperties | ConcatTextProperties | FormProperties | GridLayoutProperties;
}

export interface LayoutConfig { // the root of the components
    components: ComponentConfig[];
}
