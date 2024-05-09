import type { Agent } from '@/agents/Agent';
import type { LayoutPromptParams } from '@/agents/layout/api';
import { POSTLayoutRequest } from '@/agents/layout/api';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;

export interface LayoutAgentProperties {
  params: LayoutPromptParams
  lastCompletion?: ChatCompletion;
  [key: string]: any;
}

export interface LayoutAgentResult {
  layout: LayoutConfig;
}

const LayoutAgentFactory = {

  create: (initialProperties?: LayoutAgentProperties): Agent<LayoutAgentProperties, LayoutAgentResult> => {
    let properties: LayoutAgentProperties | undefined = initialProperties;

    const setProperties = (props?: LayoutAgentProperties): void => {
      properties = props;
    };

    const getProperty = <T extends keyof LayoutAgentProperties>(name: string): any => {
      if (properties) {
        if (name in properties) {
          return properties[name] as T;
        }
      }
      return undefined;
    };

    const run = async (): Promise<LayoutAgentResult> => {
      if (properties) {
        const completion = await POSTLayoutRequest({ promptParams: properties.params });
        if (completion?.choices[0].message.content) {
          properties.lastCompletion = completion;
          return { layout: JSON.parse(completion.choices[0].message.content) };
        }
        console.log('something went wrong, no completion!');
      }
      return { layout: { components: [] } };
    };

    return { setProperties, getProperty, run };
  }
};

export default LayoutAgentFactory;
