import type { GetAppState, SetAppState } from '@/dynamicUI/state/AppStateProvider';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';

export interface Action {
    (...args: any[]): void;
}

export interface Actions {
  [key: string]: Action;
}

export function createActions(setAppState: SetAppState, getAppState: GetAppState) {

  const sendInstructions: Action = (values: any) => {
    console.log(values);

    const promptParams = {
      userMessage: values.currentPrompt,
      sendAll: true,
      layout: values.layout,
      exampleData: values.exampleData,
      definitions: values.selectedDefinitions,
    };

    const promptHistory = getAppState<string[]>('app.promptHistory') ?? [];
    promptHistory.push(values.currentPrompt as string);
    setAppState('app.promptHistory', promptHistory);
    setAppState('app.currentPrompt', '');


    const layoutAgent = LayoutAgentFactory.create({ params: promptParams });
    layoutAgent.run().then(({ layout }) => {
      setAppState('layout', layout);
    }).catch(error => console.error(error));
  };

  return {
    sendInstructions
  } as Actions;
}


