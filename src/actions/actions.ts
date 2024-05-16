
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { ComponentConfig } from '@/dynamicUI/components/ComponentConfig';
import type { ActionParams, Actions, SubmitFormParams, UpdateFieldParams } from '@/interfaces/actions/ActionConfig';
import { ActionNames } from '@/interfaces/actions/ActionConfig';

export const actions: Actions = {
  updateField: () => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

  },
  submitForm: ({ formData }: SubmitFormParams) => () => {
    console.log('Form submission logic goes here', formData);
  },
  refreshData: () => {
    console.log('Data refresh logic goes here');
  }
};

const noop = () => {};

export interface AdditionalActionParameter {
  state?: any;
  setState?: Dispatch<SetStateAction<any>>;
}

export const getAction = (properties: ComponentConfig['properties'], actionParams: ActionParams): any => {

  if ('action' in properties) {

    const actionName = properties.action ?? 'none';
    if (actionName === ActionNames.updateField && 'fieldName' in properties) {
      return actions[actionName](actionParams as UpdateFieldParams);
    }
    if (actionName === ActionNames.submitForm) {
      return actions[actionName](actionParams as SubmitFormParams);
    }
    if (actionName === ActionNames.refreshData) {
      return actions[actionName];
    }
  }

  console.log('no action found for ', properties);
  return noop;
};
