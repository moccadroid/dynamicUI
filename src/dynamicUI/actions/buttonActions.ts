interface ButtonActions {
  [key: string]: unknown;
}

export const buttonActions: ButtonActions = {
  'SUBMIT_FORM': (form: any) => () => {
    console.log('calling submit form');
    form.submitForm();
  },
};

export const getButtonAction = (name: string) => {
  return buttonActions[name];
};
