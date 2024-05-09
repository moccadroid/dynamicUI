// Utils.ts
import { useCallback } from 'react';

export const textFormatters = {
  UPPERCASE: (text: string) => {
    console.log('uppercase', text);
    return text?.toUpperCase();
  },

  LOWERCASE: (text: string) => text?.toLowerCase(),
  CAPITALIZE: (text: string) => text?.charAt(0).toUpperCase() + text?.slice(1).toLowerCase(),
  REMOVE_UNDERSCORES: (text: string) => text?.replace(/_/g, ' ')
};

const useFormat = (formatters?: (keyof typeof textFormatters)[]): (text: string) => string => {
  // Cache for memoizing results based on text input
  const cache = new Map<string, string>();

  return useCallback((text: string): string => {
    if (!formatters || !text) return text;

    // Check if the result is already in the cache
    const cachedResult = cache.get(text);
    if (cachedResult !== undefined) {
      return cachedResult;
    }

    // If not in cache, compute and store the result
    const formattedText = formatters.reduce((currentText, key) => {
      const formatter = textFormatters[key];
      return formatter ? formatter(currentText) : currentText;
    }, text);

    cache.set(text, formattedText);
    return formattedText;
  }, [formatters]);
};

export default useFormat;
