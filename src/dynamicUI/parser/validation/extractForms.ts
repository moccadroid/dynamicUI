import type { ComponentConfig, LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export interface ExtractionType {
  form: { position: string; paths: string[] },
  data: any;
  validation: any;
}

export const extractFormPathsAndData = (schema: LayoutConfig, data: any): ExtractionType[] => {
  const results: Array<{ form: { position: string, paths: string[] }, data: any, validation: any }> = [];

  const extractData = (data: any, path: string[]): any => {
    return path.reduce((acc, key, index) => {
      if (index === path.length - 1) {
        return acc[key];
      } else {
        return acc[key] || {};
      }
    }, data);
  };

  const setData = (result: any, path: string[], value: any) => {
    path.reduce((acc, key, index) => {
      if (index === path.length - 1) {
        acc[key] = value;
      } else {
        if (!acc[key]) {
          acc[key] = {};
        }
        return acc[key];
      }
    }, result);
  };

  const traverse = (components: ComponentConfig[], parentPath = '') => {
    components.forEach((component, index) => {
      const currentPath = parentPath ? `${parentPath}.${index}` : `${index}`;

      if (component.type === 'Form' && 'formFields' in component.properties) {
        const { fieldName = '', formFields = [] } = component.properties;
        const basePath = fieldName ? fieldName.split('.') : [];
        const formPaths = formFields.map(field => basePath.length ? `${basePath.join('.')}.${field}` : field);

        const formData = formFields.reduce((acc, field) => {
          const fieldPath = [...basePath, ...field.split('.')];
          const value = extractData(data, fieldPath);
          setData(acc, fieldPath, value);
          return acc;
        }, {});

        results.push({
          form: { position: currentPath, paths: formPaths },
          data: formData,
          validation: {} // Placeholder for validation
        });
      }

      if ('components' in component.properties) {
        traverse(component.properties.components, currentPath);
      } else if ('layout' in component.properties && 'components' in component.properties.layout) {
        traverse(component.properties.layout.components, currentPath);
      }
    });
  };

  traverse(schema.components);
  return results;
};
