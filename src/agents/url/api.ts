'use server';

import OpenAI from 'openai';
import { generateUrlPrompt } from '@/agents/url/prompt';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface UrlPromptParams {
  url: string;
}

export interface POSTUrlRequestParams {
  promptParams: UrlPromptParams
}

export async function POSTUrlRequest({ promptParams }: POSTUrlRequestParams) {
  'use server';

  const { url } = promptParams;
  const response = await fetch(url);
  const data = await response.json();
  const { userPrompt, systemPrompt } = generateUrlPrompt(promptParams, data);

  console.log('POSTUrlRequest');

  const completion = await openai.chat.completions.create({
    messages: [{
      role: 'system',
      content: systemPrompt
    }, {
      role: 'user',
      content: userPrompt
    }],
    response_format: { type: 'json_object' },
    //model: 'gpt-4-turbo',
    model: 'gpt-3.5-turbo-0125',
  });
  return completion;
}
