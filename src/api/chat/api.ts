'use server';

import OpenAI from 'openai';
import { generatePrompt } from '@/prompts/system';

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface POSTChatRequestParams {
  promptParams: {
    sendAll?: boolean;
    userMessage?: string;
    layout?: any;
    promptHistory?: string[];
    data: any;
  };
}

export async function POSTChatRequest({ promptParams }: POSTChatRequestParams) {
  'use server';

  console.log('POSTChatRequest');
  const prompt = generatePrompt(promptParams);
  //console.log(prompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [{
      role: 'user',
      content: prompt
    }],
    response_format: { type: 'json_object' },
    model: 'gpt-3.5-turbo-0125',
  });
  return chatCompletion;
}
