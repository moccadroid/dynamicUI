import type { Agent } from '@/agents/Agent';
import type { LayoutPromptParams } from '@/agents/layout/api';
import { GEMINILayoutRequest } from '@/agents/layout/api';
import { OPENAILayoutRequest } from '@/agents/layout/api';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { validateAndFixJson } from '@/dynamicUI/parser/layout/fixLayout';

export interface LayoutAgentProperties {
  params: LayoutPromptParams
  lastCompletion?: ChatCompletion;
  [key: string]: any;
  model: 'GEMINI' | 'OPENAI';
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
        const { model } = properties;
        if (model === 'GEMINI') {
          const layout = await GEMINILayoutRequest({ promptParams: properties.params });
          return { layout: validateAndFixJson(layout) };
        }
        else if (model === 'OPENAI') {
          const completion = await OPENAILayoutRequest({ promptParams: properties.params });
          if (completion?.choices[0].message.content) {
            properties.lastCompletion = completion;
            const content = completion.choices[0].message.content;
            const layout = typeof content === 'string' ? JSON.parse(completion.choices[0].message.content) : content;
            return { layout: validateAndFixJson(layout) };
          }
          console.log('something went wrong, no completion!');
        }
      }
      return { layout: { components: [] } };
    };

    return { setProperties, getProperty, run };
  }
};

export default LayoutAgentFactory;
