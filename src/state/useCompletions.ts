import type OpenAI from 'openai';
import type { LayoutPromptParams } from '@/agents/layout/api';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

export interface HandleCompletionsParams {
  completion: OpenAI.ChatCompletion,
  additionalFields?: {
    userPrompt?: string;
  },
}

export interface GetCompletionsParams extends LayoutPromptParams {}

const useCompletions = () => {
  const { appState, setAppState } = useAppState();

  const handleCompletion = ({ completion, additionalFields }: HandleCompletionsParams) => {
    const promptHistory = [...appState.app.promptHistory, additionalFields?.userPrompt ?? ''];
    const inputToken = appState.stats.inputToken + (completion.usage?.prompt_tokens ?? 0);
    const outputToken = appState.stats.outputToken + (completion.usage?.completion_tokens ?? 0);
    const totalToken = appState.stats.totalToken + (completion.usage?.total_tokens ?? 0);

    setAppState('app.completion', completion);
    setAppState('stats.inputToken', inputToken);
    setAppState('stats.outputToken', outputToken);
    setAppState('stats.totalToken', totalToken);
    setAppState('app.promptHistory', promptHistory);
    if (additionalFields?.userPrompt) {
      setAppState('app.currentPrompt', additionalFields.userPrompt);
    }
  };

  return { handleCompletion };
};

export default useCompletions;
