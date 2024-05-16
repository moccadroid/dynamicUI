'use client';

import { Flex, Text, Button, Spinner, Stack } from '@chakra-ui/react';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import DrawerComponent from '@/app/components/app/DrawerComponent';
import useCompletions from '@/state/useCompletions';
import LayoutAgentFactory from '@/agents/layout/LayoutAgent';
import OpenAI from 'openai';
import ChatCompletion = OpenAI.ChatCompletion;
import { useLayout } from '@/state/useLayout';
import Sidebar from '@/app/components/app/Sidebar';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { handleCompletion } = useCompletions();
  const { appState } = useAppState();
  const { setLayout } = useLayout();
  const [hideNavbar, setHideNavbar] = useState(false);



  const handleRandomize = async () => {
    const promptParams = {
      exampleData: appState.exampleData,
      definitions: appState.app.selectedDefinitions
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

  const handleOnScreenshot = (state: string) => {
    if (state === 'before') {
      setIsDrawerOpen(false);
      setHideNavbar(true);
    }
    if (state === 'after') {
      setIsDrawerOpen(true);
      setHideNavbar(false);
    }
  };

  const navStyle = hideNavbar ? { position: 'absolute', top: '-500px' } as CSSProperties : undefined;

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding="1.5rem" bg="#778899" style={navStyle}>
      <Flex align="center" mr={5}>
        <Stack direction={'row'}>
          <Text fontSize="lg" fontWeight="bold">dynamicUI</Text>
          <Stack>
            <Text fontSize="xs">inputToken: {appState.stats.inputToken}</Text>
            <Text fontSize="xs">outputToken: {appState.stats.outputToken}</Text>
            <Text fontSize="xs">totalToken: {appState.stats.totalToken}</Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex direction='row'>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <Button onClick={handleRandomize}>{isLoading ? <Spinner /> : 'Try your luck' }</Button>
      </Flex>
      <Stack>
        <Button onClick={handleOpenDrawer} variant="outline" _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}>Drawer</Button>
        <Sidebar />
      </Stack>
      <DrawerComponent isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onScreenshot={handleOnScreenshot}/>
    </Flex>
  );
};

export default Navbar;
