'use client';

import { Text, Button, Spinner, Stack, Textarea } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import useCompletions from '@/state/useCompletions';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { useLayout } from '@/state/useLayout';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

const Instructions = () => {
  const { appState, getAppState } = useAppState();
  const { setLayout } = useLayout();
  const currentPrompt = getAppState<string>('currentPrompt') ?? '';
  const [userPrompt, setUserPrompt] = useState<string>(currentPrompt);
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
      layout: appState.layout,
      exampleData: appState.exampleData,
      definitions: appState.app.selectedDefinitions
    };

    setIsLoading(true);
    const layoutAgent = LayoutAgentFactory.create({ params: promptParams, model: 'OPENAI' });
    const { layout } = await layoutAgent.run();
    setLayout(layout);
    //console.log('layout', layout);
    const completion = layoutAgent.getProperty<ChatCompletion>('lastCompletion');
    handleCompletion({ completion, additionalFields: { userPrompt } });
    setIsLoading(false);
  };

  return (
    <Stack direction="column">
      <Stack>
        <Text as="b">Instruction History:</Text>
        <Textarea value={appState.app.promptHistory.join('\n')} onChange={() => {}} />
      </Stack>
      <Text as="b">Instructions:</Text>
      <Textarea value={userPrompt} onChange={handleChange}/>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleOnClick}>{isLoading ? <Spinner /> : 'Send Instructions' }</Button>
    </Stack>
  );
};

export default Instructions;
