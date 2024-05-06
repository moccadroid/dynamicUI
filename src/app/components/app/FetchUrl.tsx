import { Button, Input, Spinner, Stack, Text } from '@chakra-ui/react';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import UrlAgentFactory from '@/agents/url/UrlAgent';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import useCompletions from '@/state/useCompletions';

const FetchUrl = () => {
  const [url, setUrl] = useState<string | null>(null);
  const { setState } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const { handleCompletion } = useCompletions();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const handleFetch = async () => {
    if (url && url.trim() !== '') {
      setIsLoading(true);
      const urlAgent = UrlAgentFactory.create({ url });
      const data = await urlAgent.run();
      const completion = urlAgent.getProperty<ChatCompletion>('lastCompletion');
      handleCompletion({ completion });
      if (data) {
        setState((prevState: State) => {
          const newState = { ...prevState };
          newState.data = data;
          return newState;
        });
      }
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Text as="b">Fetch data from a URL</Text>
      <Input onChange={handleOnChange} />
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleFetch}>{isLoading ? <Spinner /> : 'Fetch URL'}</Button>
    </Stack>
  );
};

export default FetchUrl;
