import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

export interface ActionParams {

}

export interface UpdateFieldParams extends ActionParams {
  setState: Dispatch<SetStateAction<any>>;
  fieldName: string;
  defaultValue: any;
}

export interface Actions {
  updateField: (params: UpdateFieldParams) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  submitForm: (formData: any) => () => void;
  refreshData: () => void;
}

export enum ActionNames {
  updateField = 'updateField', // used to update the state of fields (use on form elements)
  submitForm = 'submitForm', // used to submit state (use on buttons)
  refreshData = 'refreshData' // use on buttons
}
