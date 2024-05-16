'use server';

import OpenAI from 'openai';
import { generateLayoutPrompt } from '@/agents/layout/prompt';
import { validationFunctions } from '@/agents/validation/functions';
import type { ValidationAgentProperties } from '@/agents/validation/ValidationAgent';
import ValidationAgentFactory from '@/agents/validation/ValidationAgent';
import validationSchema from '@/dynamicUI/parser/schema/validation.schema.json';
import Chat = OpenAI.Chat;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import type { ChatCompletionMessageToolCall } from 'openai/resources';
import ChatCompletionMessageParam = Chat.ChatCompletionMessageParam;

const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export interface LayoutPromptParams {
  sendAll?: boolean;
  userMessage?: string;
  layout?: any;
  promptHistory?: string[];
  exampleData: any;
  definitions: string[];
}

export interface LayoutRequest {
  promptParams: LayoutPromptParams
}

export async function OPENAILayoutRequest({ promptParams }: LayoutRequest) {
  'use server';

  console.log('POSTLayoutRequest');
  const { userPrompt, systemPrompt } = generateLayoutPrompt(promptParams);
  console.log(systemPrompt);
  console.log(userPrompt);

  const callTool = async (toolCalls: ChatCompletionMessageToolCall[]) => {
    const toolCall = toolCalls[0];
    if (toolCall.function.name === 'createValidation') {
      const functionArguments = JSON.parse(toolCall.function.arguments as string);
      const prompt: ValidationAgentProperties = {
        data: functionArguments.data,
        schema: JSON.stringify(validationSchema),
        prompt: functionArguments.prompt,
      };
      console.log(prompt);
      const validationAgent = ValidationAgentFactory.create(prompt);
      const { validation } = await validationAgent.run();

      return { validation, name: toolCall.function.name };
    }

  };

  const ask = async (messages: ChatCompletionMessageParam[]) => {
    console.log('\n');
    console.log('calling completion');
    console.log('\n');
    return openai.chat.completions.create({
      messages,
      //tools: validationFunctions as any,
      //tool_choice: 'auto',
      response_format: { type: 'json_object' },
      //model: 'gpt-4-turbo',
      model: 'gpt-3.5-turbo-0125',
      //model: 'gpt-4o',
    });
  };

  const messages: ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: userPrompt
    }
  ];
  let completion = await ask(messages);
  const message = completion.choices[0].message;

  if (message.tool_calls) {
    const result = await callTool(message.tool_calls);
    messages.push({
      role: 'function',
      content: JSON.stringify(result!.validation),
      name: result!.name
    });
    console.log('messages before ask', JSON.stringify(messages));
    completion = await ask(messages);
    console.log('final layout message', JSON.stringify(completion.choices[0].message));
  }
  console.log('completion finished', message.content);
  return completion;
}

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

export async function GEMINILayoutRequest({ promptParams }: LayoutRequest) {
  const { systemPrompt, userPrompt } = generateLayoutPrompt(promptParams);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
    systemInstruction: systemPrompt
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  const chatSession = model.startChat({
    generationConfig,
    safetySettings,
    history: [
    ],
  });

  const result = await chatSession.sendMessage(userPrompt);
  console.log(result.response.text());

}


