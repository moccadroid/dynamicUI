'use client';

import { Flex, Text, Stack } from '@chakra-ui/react';
import Sidebar from '@/app/components/app/Sidebar';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

const Navbar = () => {
  const { appState } = useAppState();

  return (
    <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding=".5rem" bg="#778899" >
      <Flex align="center" mr={5}>

        <Flex direction="column" paddingLeft="1rem">
          <Text fontSize="lg" fontWeight="bold">dynamicUI</Text>
          <Stack direction={'row'}>
            <Text fontSize="xs">inputToken: {appState.stats.inputToken}</Text>
            <Text fontSize="xs">outputToken: {appState.stats.outputToken}</Text>
            <Text fontSize="xs">totalToken: {appState.stats.totalToken}</Text>
          </Stack>
        </Flex>
      </Flex>
      <Stack direction={'row'}>
        <Sidebar />
      </Stack>
    </Flex>
  );
};

export default Navbar;
