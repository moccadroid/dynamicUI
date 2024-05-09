import type { Agent } from '@/agents/Agent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { POSTDataCleanupRequest } from '@/agents/dataCleanup/api';

export interface DataCleanupAgentProperties {
  data: any;
  limit?: number;
  lastCompletion?: ChatCompletion;
  [key: string]: any;
}

export interface DataCleanupAgentResult {
  data: any;
}

const DataCleanupAgentFactory = {

  create: (initialProperties?: DataCleanupAgentProperties): Agent<DataCleanupAgentProperties, DataCleanupAgentResult> => {
    let properties: DataCleanupAgentProperties | undefined = initialProperties;

    const setProperties = (props?: DataCleanupAgentProperties): void => {
      properties = props;
    };

    const getProperty = <T extends keyof DataCleanupAgentProperties>(name: string): any => {
      if (properties) {
        if (name in properties) {
          return properties[name] as T;
        }
      }
      return undefined;
    };

    const run = async (): Promise<DataCleanupAgentResult> => {
      if (properties) {
        const completion = await POSTDataCleanupRequest({ data: initialProperties?.data });
        if (completion.choices[0].message.content) {
          properties.lastCompletion = completion;
          return { data: JSON.parse(completion.choices[0].message.content).data };
        }
        console.log('something went wrong, no completion!');
      }
      return { data: undefined };
    };

    return { setProperties, getProperty, run };
  }
};

export default DataCleanupAgentFactory;
