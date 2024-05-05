import { Text, Button, Spinner, Stack, Textarea } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { POSTChatRequest } from '@/api/chat/api';
import OpenAI from 'openai';
import { type State, useStateContext } from '@/state/Provider';

export interface InstructionsProps {
}

const Instructions = () => {
  const { state, setState } = useStateContext();
  const [userPrompt, setUserPrompt] = useState(state.app.currentPrompt);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value);
  };

  const handleOnClick = async () => {
    const promptParams = {
      userMessage: userPrompt,
      sendAll: true,
      layout: state.layout,
      data: state.data,
    };

    setIsLoading(true);
    const completion = await POSTChatRequest({ promptParams });
    setIsLoading(false);
    const content = completion.choices[0].message.content;
    if (content) {
      const chatLayout = JSON.parse(content);
      console.log('chatLayout', chatLayout);

      setState((prevState: State) => {
        const newState = { ...prevState };
        newState.layout = chatLayout;
        newState.app.promptHistory.push(userPrompt);
        newState.app.currentPrompt = userPrompt;
        newState.app.completion = completion;
        newState.stats.inputToken += completion && completion.usage ? completion.usage.prompt_tokens : 0;
        newState.stats.outputToken += completion && completion.usage ? completion.usage.completion_tokens : 0;
        newState.stats.totalToken += completion && completion.usage ? completion.usage.total_tokens : 0;
        return newState;
      });
    } else {
      console.log('no content?');
    }
  };

  return (
    <Stack direction="column">
      <Stack>
        <Text as="b">Instruction History:</Text>
        <Textarea value={JSON.stringify(state.app.promptHistory.join('\n'))} onChange={() => {}} />
      </Stack>
      <Text as="b">Instructions:</Text>
      <Textarea value={userPrompt} onChange={handleChange}/>
      <Button onClick={handleOnClick}>{isLoading ? <Spinner /> : 'Send Instructions' }</Button>
    </Stack>
  );
};

export default Instructions;
