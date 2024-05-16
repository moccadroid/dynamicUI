import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { generateRandomString } from '@/dynamicUI/utils/generateRandom';

interface Properties {
  id?: string;
  components?: Component[];
  layout?: LayoutConfig;
  [key: string]: any;
}

interface Component {
  type: string;
  properties: Properties;
}


/**
 * Converts a string to camelCase.
 */
function toCamelCase(str: string): string {
  return str
    .replace(/^\w|[A-Z]|\b\w/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase())
    .replace(/\s+/g, '');
}

/**
 * Ensures all components have an 'id' property based on their 'type'.
 */
function ensureComponentIds(components: Component[]): void {
  components.forEach(component => {
    if (!component.properties.id) {
      component.properties.id = toCamelCase(component.type);
      console.log('fixed id: ', component.properties.id);
    }
    if (component.properties && !component.properties.name) {
      component.properties.name = generateRandomString(4);
    }
    // Check for nested components
    if (component.properties.components) {
      ensureComponentIds(component.properties.components);
    }
    if (component.properties.layout) {
      ensureComponentIds(component.properties.layout.components);
    }
  });
}

/**
 * Parses JSON and ensures all components have valid IDs.
 */
export function validateAndFixJson(json: any): LayoutConfig {

  if (!json) return json;

  let data: LayoutConfig = json;
  if (typeof json === 'string') {
    data = JSON.parse(json) as LayoutConfig;
  }

  if (data.components) {
    ensureComponentIds(data.components);
  }

  return data;
}
