// actions.ts
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { ComponentConfig } from '@/interfaces/components/ComponentConfig';
import type { ActionParams, Actions, SubmitFormParams, UpdateFieldParams } from '@/interfaces/actions/ActionConfig';
import { ActionNames } from '@/interfaces/actions/ActionConfig';
import { setValueToState } from '@/state/setValueToState';

export const actions: Actions = {
  updateField: ({ setState, fieldName, defaultValue }) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const params = {
      path: fieldName,
      setState,
      value: event.target.value,
      defaultValue
    };
    setValueToState(params);
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
