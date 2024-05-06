import type { UrlPromptParams } from '@/agents/url/api';

const MAX_DATA_LENGTH = 1000;

export const generateUrlPrompt = (promptParams: UrlPromptParams, data: any) => {
  const truncatedData = JSON.stringify(data).substring(0, MAX_DATA_LENGTH);

  return `
    ${truncatedData}
    
    Return only valid JSON.
    Compress the values of the fields { key: value } as much as possible without losing its meaning.
    If the data is an array only return one representative entity of it. 
    If the data is truncated or corrupted try your best to repair it.
  `;
};
