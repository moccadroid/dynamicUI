'use client';

import { Box, Flex, Text, Button, Spinner, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import DrawerComponent from '@/app/components/app/DrawerComponent';
import { useStateContext } from '@/state/Provider';
import useCompletions from '@/state/useCompletions';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { useLayout } from '@/state/useLayout';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { handleCompletion } = useCompletions();
  const { state } = useStateContext();
  const { setLayout } = useLayout();

  const handleRandomize = async () => {
    const promptParams = {
      exampleData: state.exampleData,
      definitions: state.app.selectedDefinitions
    };
    setIsLoading(true);
    const layoutAgent = LayoutAgentFactory.create({ params: promptParams,  });
    const { layout } = await layoutAgent.run();
    setLayout(layout);
    const completion = layoutAgent.getProperty<ChatCompletion>('lastCompletion');
    handleCompletion({ completion });
    setIsLoading(false);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(prev => !prev);
  };

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="#778899">
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
        <Button onClick={handleRandomize}>{isLoading ? <Spinner /> : 'Try your luck' }</Button>
      </Flex>
      <Box display="flex" width="auto" alignItems="center">
        <Button onClick={handleOpenDrawer} variant="outline" _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}>Sidebar</Button>
      </Box>
      <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}/>
    </Flex>
  );
};

export default Navbar;
