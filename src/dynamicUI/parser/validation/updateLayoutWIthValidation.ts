import type { ComponentConfig, LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export const updateLayoutWithValidation = (
  layout: LayoutConfig,
  position: string,
  validation: any
): LayoutConfig => {
  const indices = position.split('.').filter(Boolean).map(Number);

  const updateValidation = (components: ComponentConfig[], indices: number[], validation: any) => {
    const currentIndex = indices[0];

    if (!components || !components[currentIndex]) return;

    const currentComponent = components[currentIndex];

    if (indices.length === 1) {
      // Base case: if this is the last index, update the validation
      if (currentComponent.type === 'Form' && currentComponent.properties && 'validation' in currentComponent.properties) {
        currentComponent.properties.validation = validation;
      }
    } else {
      // Recursive case: go deeper into the component tree
      const remainingIndices = indices.slice(1);

      if (currentComponent.properties) {
        if ('components' in currentComponent.properties) {
          updateValidation(currentComponent.properties.components, remainingIndices, validation);
        } else if ('layout' in currentComponent.properties && currentComponent.properties.layout.components) {
          updateValidation(currentComponent.properties.layout.components, remainingIndices, validation);
        }
      }
    }
  };

  const updatedLayout = JSON.parse(JSON.stringify(layout)); // Deep clone the layout to avoid direct mutation
  updateValidation(updatedLayout.components, indices, validation);
  return updatedLayout;
};

