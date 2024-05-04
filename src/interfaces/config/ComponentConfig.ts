import type { ActionNames } from '@/interfaces/actions/ActionConfig';

export interface TextareaProperties {
    label: string;
    placeholder?: string;
    fieldName: string; // Binding for the textarea
    action: ActionNames; // String identifier for the action
}

export interface ButtonProperties {
    text: string;
    action: ActionNames; // String corresponding to function name
}

export interface HeadlineProperties {
    text: string;
    level: 1 | 2 | 3 | 4 | 5 | 6;
}

export interface InputProperties {
    label: string;
    placeholder?: string;
    fieldName: string; // This is to bind the input value to a key in the state object
    action: ActionNames; // Updated to be a string that matches a key in our actions object
}

export interface ImageProperties {
    fieldName: string;
    alt: string;
}

export interface FlexLayoutProperties extends LayoutConfig{
    direction: 'row' | 'column';
    components: ComponentConfig[];
}

export interface ComponentConfig {
    type: 'Input' | 'Button' | 'Headline' | 'Textarea' | 'FlexLayout' | 'Image';
    properties: InputProperties | ButtonProperties | HeadlineProperties | TextareaProperties | FlexLayoutProperties | ImageProperties;
}

export interface LayoutConfig {
    components: ComponentConfig[];
}
