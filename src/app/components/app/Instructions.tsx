'use client';

import { Text, Button, Spinner, Stack, Textarea } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import useCompletions from '@/state/useCompletions';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;

const Instructions = () => {
  const { state, setState } = useStateContext();
  const [userPrompt, setUserPrompt] = useState<string>(state.app.currentPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const { handleCompletion } = useCompletions();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value);
  };

  const handleOnClick = async () => {
    if (userPrompt === '') return;

    const promptParams = {
      userMessage: userPrompt,
      sendAll: true,
      layout: state.layout,
      exampleData: state.exampleData,
      definitions: state.app.selectedDefinitions,
    };

    setIsLoading(true);
    const layoutAgent = LayoutAgentFactory.create({ params: promptParams });
    const layout = await layoutAgent.run();
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.layout = layout;
      return newState;
    });
    console.log('layout', layout);
    const completion = layoutAgent.getProperty<ChatCompletion>('lastCompletion');
    handleCompletion({ completion, additionalFields: { userPrompt } });
    setIsLoading(false);
  };

  return (
    <Stack direction="column">
      <Stack>
        <Text as="b">Instruction History:</Text>
        <Textarea value={JSON.stringify(state.app.promptHistory.join('\n'))} onChange={() => {}} />
      </Stack>
      <Text as="b">Instructions:</Text>
      <Textarea value={userPrompt} onChange={handleChange}/>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleOnClick}>{isLoading ? <Spinner /> : 'Send Instructions' }</Button>
    </Stack>
  );
};

export default Instructions;
