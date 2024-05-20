import { createAction } from '@/dynamicUI/actions/actions';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import DataCleanupAgentFactory from '@/agents/dataCleanup/DataCleanupAgent';
import type { GetAppState, SetAppState } from '@/dynamicUI/state/AppStateProvider';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;

export const sidebarActions = {

  fetchUrl: createAction((params) => async (name, values) => {
    const { setAppState, setLoading } = params;
    setLoading(name, true);
    const { url, maxCharacters }: { url: string, maxCharacters: number } = values;
    if (url === '') return;
    const result = await fetch(url);
    const fullData = await result.json();

    const dataCleanupAgent = DataCleanupAgentFactory.create({ data: fullData, limit: maxCharacters });
    const { data } = await dataCleanupAgent.run();
    console.log('cleaned data', data);
    setLoading(name, false);
    if (fullData) {
      setAppState('data', data);
    }
  }),

  sendInstructions: createAction((params) => async (name, values: any) => {
    const { setAppState, getAppState, setLoading } = params;
    setLoading(name, true);
    const promptParams = {
      userMessage: values.currentPrompt,
      sendAll: true,
      layout: values.layout,
      exampleData: values.data,
      definitions: values.selectedDefinitions,
    };

    const promptHistory = getAppState<string[]>('app.promptHistory') ?? [];
    promptHistory.push(values.currentPrompt as string);
    setAppState('app.promptHistory', promptHistory);
    setAppState('app.currentPrompt', '');

    console.log('Sending to LayoutAgent', promptParams);
    const layoutAgent = LayoutAgentFactory.create({ params: promptParams, model: 'OPENAI' });
    const { layout } = await layoutAgent.run();
    setAppState('layout', layout);
    console.log('new layout', layout);
    const completion = layoutAgent.getProperty<ChatCompletion>('lastCompletion');
    setTokens(setAppState, getAppState, completion);
    setLoading(name, false);
  })
};

const setTokens = (setAppState: SetAppState, getAppState: GetAppState, completion: ChatCompletion) => {
  const inputToken = (getAppState<number>('stats.inputToken')  ?? 0) + (completion.usage?.prompt_tokens ?? 0);
  const outputToken = (getAppState<number>('stats.outputToken')  ?? 0) + (completion.usage?.completion_tokens ?? 0);
  const totalToken = (getAppState<number>('stats.totalToken')  ?? 0) + (completion.usage?.total_tokens ?? 0);

  setAppState('app.completion', completion);
  setAppState('stats.inputToken', inputToken);
  setAppState('stats.outputToken', outputToken);
  setAppState('stats.totalToken', totalToken);
};
