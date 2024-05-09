'use server';

import OpenAI from 'openai';
import { generatePrompt } from '@/agents/dataCleanup/prompt';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface DataCleanupPromptParams {
  data: any;
  length?: number;
}

export async function POSTDataCleanupRequest({ data, length }: DataCleanupPromptParams) {
  'use server';

  console.log('POSTDataCleanupRequest');
  const { userPrompt, systemPrompt } = generatePrompt(data, length);
  console.log(systemPrompt);
  console.log(userPrompt);

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
