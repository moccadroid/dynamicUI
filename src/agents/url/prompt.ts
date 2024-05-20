import type { UrlPromptParams } from '@/agents/url/api';

const MAX_DATA_LENGTH = 1000;

export const generateUrlPrompt = (promptParams: UrlPromptParams, data: any) => {
  const truncatedData = JSON.stringify(data).substring(0, MAX_DATA_LENGTH);

  const systemPrompt = `
    Return only valid JSON.
    If the data is an array only return one representative entity of it. 
    Don't lose any data! If an object appears truncated, repair it with plausible data.
    Return all the data fields in the original data.
  `;

  const userPrompt = `
    // DATA
    ${truncatedData}
  `;

  return { userPrompt, systemPrompt };
};
