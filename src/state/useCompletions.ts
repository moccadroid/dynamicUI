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
  const { setState } = useStateContext();

  const handleCompletion = ({ completion, additionalFields }: HandleCompletionsParams) => {
    //const content = completion.choices[0].message.content;
    //if (content) {
    setState((prevState: State) => {
      const newState = { ...prevState };
      //newState.layout = JSON.parse(content);
      newState.app.completion = completion;
      newState.stats.inputToken += completion.usage?.prompt_tokens ?? 0;
      newState.stats.outputToken += completion.usage?.completion_tokens ?? 0;
      newState.stats.totalToken += completion.usage?.total_tokens ?? 0;

      if (additionalFields?.userPrompt) {
        newState.app.currentPrompt = additionalFields.userPrompt;
        newState.app.promptHistory = [...newState.app.promptHistory, additionalFields.userPrompt];
      }

      return newState;
    });
    /*
    } else {
      console.error('handleCompletion failed. No completion content.');
    }

       */
  };

  return { handleCompletion };
};

export default useCompletions;
