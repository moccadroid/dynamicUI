import type { Agent } from '@/agents/Agent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { POSTValidationRequest } from '@/agents/validation/api';

export interface ValidationAgentProperties {
  schema: any;
  data: any;
  prompt: string;
  lastCompletion?: ChatCompletion
}

export interface ValidationAgentResult {
  validation?: string;
}

const ValidationAgentFactory = {

  create: (initialProperties: ValidationAgentProperties) : Agent<ValidationAgentProperties, ValidationAgentResult> => {
    let properties: any = initialProperties;

    const setProperties = (props: ValidationAgentProperties): void => {
      properties = { ...props };
    };

    const getProperty = <T extends keyof ValidationAgentProperties>(name: string): any => {
      if (name in properties) {
        return properties[name] as T;
      }
      return undefined;
    };

    const run = async (): Promise<ValidationAgentResult> => {
      const prompt = {
        promptParams: {
          schema: properties.schema,
          data: properties.data,
          prompt: properties.prompt,
        }
      };
      console.log('prompt', prompt);
      const completion = await POSTValidationRequest(prompt);
      if (completion && completion.choices[0].message.content) {
        properties.lastCompletion = completion;
        console.log('completion message', JSON.stringify(completion.choices[0].message));
        const content = JSON.parse(completion.choices[0].message.content);
        console.log('content', content);
        return { validation: content };
      }
      console.log('something went wrong. no completion!');
      return { validation: undefined };
    };

    return { setProperties, getProperty, run };
  }
};

export default ValidationAgentFactory;

