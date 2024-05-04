import type { Dispatch, SetStateAction } from 'react';

export interface SetValueParams {
  setState: Dispatch<SetStateAction<any>>;
  path: string;
  value: any;
  defaultValue?: any;
}

export const setValueToState = ({ setState, path, value, defaultValue = null }: SetValueParams): void => {
  setState((currentState: any) => {
    const keys = path.split('.');
    const newState = { ...currentState };
    let current = newState;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || current[key] === null || typeof current[key] !== 'object') {
        current[key] = i === keys.length - 2 ? defaultValue : {};
      }
      current[key] = { ...current[key] };
      current = current[key];
    }

    const finalKey = keys[keys.length - 1];
    // Perform type checking and handle casting carefully
    if (typeof current[finalKey] !== 'undefined' && typeof current[finalKey] !== typeof value) {
      // Cast to number only if the value can be reliably converted
      if (typeof current[finalKey] === 'number') {
        const numValue = Number(value);
        current[finalKey] = isNaN(numValue) ? defaultValue : numValue;
      } else if (typeof current[finalKey] === 'string') {
        current[finalKey] = String(value);
      } else if (typeof current[finalKey] === 'boolean') {
        // Simplistic conversion to boolean: Any truthy or 'true' string value becomes true, others become false
        current[finalKey] = value === 'true' ? true : Boolean(value);
      }
    } else {
      // If types are the same or field is undefined, set the new value directly
      current[finalKey] = value;
    }

    return newState;
  });
};

