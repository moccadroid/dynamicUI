import { useStateContext } from '@/state/Provider';
import type { State } from '@/state/Provider';
import type OpenAI from 'openai';
import type { LayoutPromptParams } from '@/agents/layout/api';

export interface HandleCompletionsParams {
  completion: OpenAI.ChatCompletion,
  additionalFields?: {
    userPrompt?: string;
  },
}

export interface GetCompletionsParams extends LayoutPromptParams {}

const useCompletions = () => {
  const { state, setState } = useStateContext();

  const handleCompletion = ({ completion, additionalFields }: HandleCompletionsParams) => {
    const promptHistory = [...state.app.promptHistory, additionalFields?.userPrompt ?? ''];
    const inputToken = state.stats.inputToken + (completion.usage?.prompt_tokens ?? 0);
    const outputToken = state.stats.outputToken + (completion.usage?.completion_tokens ?? 0);
    const totalToken = state.stats.totalToken + (completion.usage?.total_tokens ?? 0);

    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.app.completion = completion;
      newState.stats.inputToken = inputToken;
      newState.stats.outputToken = outputToken;
      newState.stats.totalToken = totalToken;
      newState.app.promptHistory = promptHistory;

      if (additionalFields?.userPrompt) {
        newState.app.currentPrompt = additionalFields.userPrompt;
      }

      return newState;
    });
  };

  return { handleCompletion };
};

export default useCompletions;
