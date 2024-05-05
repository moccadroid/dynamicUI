'use client';

import { Box, Flex, Text, Button, Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { POSTChatRequest } from '@/api/chat/api';
import DrawerComponent from '@/app/components/app/DrawerComponent';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { state, setState } = useStateContext();

  const handleRandomize = async () => {
    setIsLoading(true);
    const promptParams = {
      data: state.data,
    };
    const completion = await POSTChatRequest({ promptParams });
    setIsLoading(false);
    const content = completion.choices[0].message.content;
    if (content) {
      const chatLayout = JSON.parse(content);
      console.log('chatLayout', chatLayout);

      setState((prevState: State) => {
        const newState = { ...prevState };
        newState.layout = chatLayout;
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

  const handleOpenDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="teal.500">
      <Flex align="center" mr={5}>
        <Stack direction={'row'}>
          <Text fontSize="lg" fontWeight="bold">dynamicUI</Text>
          <Stack>
            <Text fontSize="xs">inputToken: {state.stats.inputToken}</Text>
            <Text fontSize="xs">outputToken: {state.stats.outputToken}</Text>
            <Text fontSize="xs">totalToken: {state.stats.totalToken}</Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex direction='row'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={handleRandomize}>{isLoading ? <Spinner /> : 'Randomize' }</Button>
      </Flex>
      <Box display="flex" width="auto" alignItems="center">
        <Button onClick={handleOpenDrawer} variant="outline" _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}>Sidebar</Button>
      </Box>
      <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>
    </Flex>
  );
};

export default Navbar;
