import type { FormProperties, LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export interface FormType {
  type: string;
  properties: FormProperties;
}

export const extractFormObjects = (schema: LayoutConfig) => {
  const forms: FormType[] = [];

  const traverse = (components: any) => {
    components.forEach((component: any) => {
      if (component.type === 'Form') {
        forms.push(component as FormType);
      }

      if (component.properties) {
        if (component.properties.components) {
          traverse(component.properties.components);
        } else if (component.properties.layout && component.properties.layout.components) {
          traverse(component.properties.layout.components);
        }
      }
    });
  };

  if (schema.components) {
    traverse(schema.components);
  }

  return forms;
};
