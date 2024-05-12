import { Button, FormControl, FormLabel, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import useCompletions from '@/state/useCompletions';
import DataCleanupAgentFactory from '@/agents/dataCleanup/DataCleanupAgent';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import { useLayout } from '@/state/useLayout';

const FetchUrl = () => {
  const [url, setUrl] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(1000);
  const { setState, state } = useStateContext();
  const { setLayout } = useLayout();
  const [isLoading, setIsLoading] = useState(false);
  const { handleCompletion } = useCompletions();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleOnLimitChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(event.target.value));
  };

  const handleFetch = async () => {
    if (url && url.trim() !== '') {
      setIsLoading(true);
      const result = await fetch(url);
      const fullData = await result.json();

      const dataCleanupAgent = DataCleanupAgentFactory.create({ data: fullData, limit });
      const { data } = await dataCleanupAgent.run();
      const dataCleanupCompletion = dataCleanupAgent.getProperty<ChatCompletion>('lastCompletion');
      handleCompletion({ completion: dataCleanupCompletion });
      console.log('cleaned data', data);
      const layoutAgent = LayoutAgentFactory.create({ params: { exampleData: data, definitions: state.app.selectedDefinitions } });
      const { layout } = await layoutAgent.run();
      setLayout(layout);
      console.log('layout', layout);
      const layoutCompletion = layoutAgent.getProperty<ChatCompletion>('lastCompletion');
      handleCompletion({ completion: layoutCompletion });

      if (fullData) {
        setState((prevState: State) => {
          const newState = { ...prevState };
          newState.data = fullData;
          newState.exampleData = data;
          return newState;
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Text as="b">Fetch data from a URL</Text>
      <Stack direction="row" spacing={8}>
        <FormControl>
          <FormLabel>Max Character Count to parse:</FormLabel>
          <Input value={limit} onChange={handleOnLimitChange} />
        </FormControl>
        <FormControl>
          <FormLabel>URL:</FormLabel>
          <Input onChange={handleOnChange} />
        </FormControl>
      </Stack>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleFetch}>{isLoading ? <Spinner /> : 'Fetch URL'}</Button>
    </Stack>
  );
};

export default FetchUrl;
