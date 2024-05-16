// Utils.ts
import { useCallback } from 'react';

export interface TextFormatters {
  [key: string]: (param: any) => string;
}

export const textFormatters: TextFormatters = {
  UPPERCASE: (text: string) => {
    console.log('uppercase', text);
    return text?.toUpperCase();
  },

  LOWERCASE: (text: string) => text?.toLowerCase(),
  CAPITALIZE: (text: string) => text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase(),
  REMOVE_UNDERSCORES: (text: string) => text?.replace(/_/g, ' '),

  JSON_STRINGIFY: (object: any) => {
    if (typeof object !== 'string') {
      return JSON.stringify(object);
    }
    return object;
  },
};

const useFormat = (formatters?: (keyof typeof textFormatters)[]): (param: string) => string => {
  return useCallback((text: string): string => {
    if (!formatters || !text) return text;

    // Apply the formatters to the text
    return formatters.reduce<string>((currentText, key) => {
      const formatter = textFormatters[key];
      return formatter ? formatter(currentText) : currentText;
    }, text);
  }, [formatters]);
};

export default useFormat;
