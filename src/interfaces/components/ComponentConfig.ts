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
