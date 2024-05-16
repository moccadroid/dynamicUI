export type TextFormatter = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE' | 'REMOVE_UNDERSCORES' | 'JSON_STRINGIFY';
type ButtonType = 'submit';

type GridSettings = {
    templateRows?: string;
    templateColumns?: string;
}

/**
 * ACTIONS
 */
export interface ActionProperties {
    name: string;
    params: string[];
}

/**
 * TEXT
 */
export interface HeadlineProperties {
    id: 'headline';
    fieldName?: string; // dynamic text
    label?: string; // static text
    level: 1 | 2 | 3 | 4 | 5 | 6; // higher numbers are more useful
}

export interface LinkProperties {
    id: 'link';
    fieldName: string; // src
    label?: string;
    labelFieldName?: string; // if the data provides a label for the link
}

export interface TextProperties { // used for plain text
    id: 'text';
    fieldName: string;
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    align?: string;
    format?: TextFormatter[];
}

export interface LabeledTextProperties {
    id: 'labeledText';
    fieldName: string;
    label: string;
    separator: ':';
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface CodeProperties {
    id: 'code';
    fieldName: string;
    description?: string;
    type?: 'json';
}

export interface ConcatTextProperties { // used to concat multiple data fields into one text component
    id: 'concatText';
    fields: string[];  // Array of field paths
    separator: string;
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

/**
 * MEDIA
 */
export interface ImageProperties {
    id: 'image';
    fieldName: string;
    alt: string;
    size?: string; // size in px "100px"
}

/**
 * FORM form wraps input components
 */
export interface FormProperties extends LayoutConfig { // wraps input components
    id: 'form';
    fieldName: string;
    formFields: string[];
    onSubmit: string;
    validation: any;
    components: ComponentConfig[];
}

export interface InputProperties {
    id: 'input';
    fieldName: string;
    label: string;
    placeholder?: string;
    type?: 'text' | 'password' | 'number' | 'email'; // defaults to text
}

export interface TextareaProperties {
    id: 'textarea';
    fieldName: string;
    label: string;
    placeholder?: string;
    format?: TextFormatter[];
}

export interface ButtonProperties {
    id: 'button';
    fieldName?: string;
    label?: string;
    type?: ButtonType;
    format?: TextFormatter[]; // Array of formatter keys
}

export interface SelectProperties {
    id: 'select';
    fieldName?: string;
    label: string;
}

/**
 * ARRAYS used to display arrays
 */
export interface ListProperties {
    id: 'list';
    fieldName: string;
    direction?: 'row' | 'column';
    as?: 'grid'; // uses a grid layout internally to layout the elements. use this if you want to show an array in a grid.
    gridSettings?: GridSettings; // this has to be set if 'as': 'grid'!
    layout: LayoutConfig;
}

/**
 * LAYOUTS used to layout data objects that are not arrays. Have child components.
 */
export interface GridLayoutProperties extends LayoutConfig {
    id: 'grid';
    gridSettings: GridSettings;
    components: ComponentConfig[];
}

export interface FlexLayoutProperties extends LayoutConfig { // can be nested
    id: 'flexLayout';
    direction: 'row' | 'column';
    justify?: string;
    align?: string;
    components: ComponentConfig[];
}

export interface CardLayoutProperties extends LayoutConfig { // can be nested
    id: 'cardLayout';
    components: ComponentConfig[]; // the body of the card
}


/**
 * CONFIGS (the actual components)
 */
export interface ComponentConfig { // describes the above components
    type: 'Input' | 'Button' | 'Headline' | 'Textarea' | 'FlexLayout' | 'CardLayout' | 'Code'
      | 'Image' | 'Text' | 'LabeledText' | 'List' | 'Link' | 'ConcatText' | 'Form' | 'GridLayout' | 'Select';
    properties: InputProperties | ButtonProperties | HeadlineProperties | TextareaProperties | CodeProperties
      | FlexLayoutProperties | ImageProperties | CardLayoutProperties | TextProperties | LabeledTextProperties
      | ListProperties | LinkProperties | ConcatTextProperties | FormProperties | GridLayoutProperties | SelectProperties;
}

export interface LayoutConfig { // the root of the components
    components: ComponentConfig[];
}
