'use server';

import OpenAI from 'openai';
import { generatePrompt } from '@/agents/layout/prompt';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface LayoutPromptParams {
  sendAll?: boolean;
  userMessage?: string;
  layout?: any;
  promptHistory?: string[];
  data: any;
}

export interface POSTLayoutRequestParams {
  promptParams: LayoutPromptParams
}

export async function POSTLayoutRequest({ promptParams }: POSTLayoutRequestParams) {
  'use server';

  console.log('POSTLayoutRequest');
  const { userPrompt, systemPrompt } = generatePrompt(promptParams);
  //console.log(systemPrompt);
  //console.log(userPrompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt
      },
      {
        role: 'user',
        content: userPrompt
      }
    ],
    response_format: { type: 'json_object' },
    //model: 'gpt-4-turbo',
    model: 'gpt-3.5-turbo-0125',
  });
  return chatCompletion;
}
