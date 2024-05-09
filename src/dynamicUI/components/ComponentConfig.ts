import type { ActionNames } from '@/interfaces/actions/ActionConfig';

type TextFormatter = 'UPPERCASE' | 'LOWERCASE' | 'CAPITALIZE' | 'REMOVE_UNDERSCORES';

export interface TextareaProperties {
    label: string;
    placeholder?: string;
    fieldName: string; // binds the field to the data. must include the path to the data. example: user.name.firstName
    action: ActionNames; // String identifier for the action
}

export interface ButtonProperties {
    text: string;
    action: ActionNames;
    format?: TextFormatter[]; // Array of formatter keys
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

export interface LinkProperties {
    fieldName: string; // path to the src in the data
}

export interface TextProperties { // used for plain text
    fieldName: string;
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface LabeledTextProperties {
    fieldName: string;
    label: string // the label of the value
    separator: ':' // label : text
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface ConcatTextProperties { // used to concat multiple data fields into one text component
    fields: string[];  // Array of field paths
    separator: string; // Separator for concatenation
    fontSize: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    format?: TextFormatter[];
}

export interface ListProperties { // always used for arrays
    fieldName: string; // name of the field where the array can be found
    layout: LayoutConfig; // the layout of a list entry
}

export interface FlexLayoutProperties extends LayoutConfig { // can be nested
    direction: 'row' | 'column';
    components: ComponentConfig[];
}

export interface CardLayoutProperties extends LayoutConfig { // can be nested
    components: ComponentConfig[]; // the body of the card
}

export interface ComponentConfig { // describes the above components
    type: 'Input' | 'Button' | 'Headline' | 'Textarea' | 'FlexLayout' | 'CardLayout' | 'Image' | 'Text' | 'LabeledText' | 'List' | 'Link' | 'ConcatText';
    properties: InputProperties | ButtonProperties | HeadlineProperties | TextareaProperties | FlexLayoutProperties | ImageProperties | CardLayoutProperties | TextProperties | LabeledTextProperties | ListProperties | LinkProperties | ConcatTextProperties;
}

export interface LayoutConfig { // the root of the components
    components: ComponentConfig[];
}
