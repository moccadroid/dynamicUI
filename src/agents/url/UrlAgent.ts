import type { Agent } from '@/agents/Agent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { POSTUrlRequest } from '@/agents/url/api';

export interface UrlAgentProperties {
  url: string;
  lastCompletion?: ChatCompletion
}

export interface UrlAgentResult {
  data: any;
}

const UrlAgentFactory = {

  create: (initialProperties: UrlAgentProperties) : Agent<UrlAgentProperties, UrlAgentResult> => {
    let properties: any = initialProperties;

    const setProperties = (props: UrlAgentProperties): void => {
      properties = { ...props };
    };

    const getProperty = <T extends keyof UrlAgentProperties>(name: string): any => {
      if (name in properties) {
        return properties[name] as T;
      }
      return undefined;
    };

    const run = async (): Promise<UrlAgentResult> => {
      const completion = await POSTUrlRequest({ promptParams: { url: properties.url } });
      if (completion && completion.choices[0].message.content) {
        properties.lastCompletion = completion;
        return { data: JSON.parse(completion.choices[0].message.content) };
      }
      console.log('something went wrong. no completion!');
      return { data: undefined };
    };

    return { setProperties, getProperty, run };
  }
};

export default UrlAgentFactory;

