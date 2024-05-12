'use server';

import OpenAI from 'openai';
import { generateValidationPrompt } from '@/agents/validation/prompt';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface ValidationPromptParams {
  data: any;
  schema: any;
  prompt: string;
}

export interface POSTValidationRequestParams {
  promptParams: ValidationPromptParams
}

export async function POSTValidationRequest({ promptParams }: POSTValidationRequestParams) {
  'use server';

  console.log('POSTValidationRequest');
  const { userPrompt, systemPrompt } = generateValidationPrompt(promptParams);
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
