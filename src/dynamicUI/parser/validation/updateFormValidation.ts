import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export const updateFormValidation = (layout: LayoutConfig, formName: string, validationValue: any) => {
  const traverseAndUpdate = (components: any) => {
    components.forEach((component: any) => {
      if (component.type === 'Form' && component.properties && component.properties.name === formName) {
        component.properties.validation = validationValue;
      }

      if (component.properties) {
        if (component.properties.components) {
          traverseAndUpdate(component.properties.components);
        } else if (component.properties.layout && component.properties.layout.components) {
          traverseAndUpdate(component.properties.layout.components);
        }
      }
    });
  };

  if (layout.components) {
    traverseAndUpdate(layout.components);
  }

  return layout;
};

