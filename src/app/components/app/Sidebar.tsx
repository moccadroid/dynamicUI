import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay, FormControl, FormLabel, Stack, Switch,
  Text, useDisclosure
} from '@chakra-ui/react';
import Section from '@/dynamicUI/components/Section';
import promptLayout from './layouts/prompt.layout.json';
import fetchUrlLayout from './layouts/fetchUrl.layout.json';
import promptData from './data/prompt.data.json';
import fetchUrlData from './data/fetchUrl.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import ManageLayouts from '@/app/components/app/ManageLayouts';
import { useMemo } from 'react';
import InterfaceSelect from '@/app/components/app/InterfaceSelect';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import layoutSchema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import { EditorModal } from '@/app/components/app/EditorModal';
import { useLayoutHistory } from '@/state/useLayoutHistory';
import { sidebarActions } from '@/app/components/app/actions/actions';
import Validation from '@/app/components/app/Validation';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appState, setAppState } = useAppState();
  const { goBack, goForward } = useLayoutHistory();

  const initialPromptData= useMemo(() => {
    return {
      ...promptData,
      promptHistory: appState.app.promptHistory,
      currentPrompt: appState.app.currentPrompt,
      layout: appState.layout,
      data: appState.data,
      selectedDefinition: appState.app.selectedDefinitions
    };
  }, [appState]);

  const initialFetchUrlData = useMemo(() => {
    return {
      ...fetchUrlData,
    };
  }, []);

  const handleModalSave = (fieldName: string) => (value: string | undefined) => {
    if (!value) return;
    const editorState = JSON.parse(value);
    setAppState(fieldName, editorState);
  };

  const handleDebugChange = () => {
    setAppState('debug', !appState.debug);
  };

  return (
    <Box>
      <Button onClick={onOpen}>Sidebar</Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack direction="row" justify="space-between">
              <Text>Do some stuff</Text>
              <FormControl display='flex' alignItems='center' width="auto" marginRight={10}>
                <FormLabel htmlFor='debug-mode' mb='0'>
                  Enable Debug Mode
                </FormLabel>
                <Switch id='debug-mode' isChecked={appState.debug} onChange={handleDebugChange}/>
              </FormControl>
            </Stack>
          </DrawerHeader>
          <DrawerBody>
            <ManageLayouts />
            <Section layout={promptLayout as LayoutConfig} data={initialPromptData} actions={sidebarActions}/>
            <Stack paddingTop={3}>
              <Stack direction="row">
                <EditorModal label="Open Layout" value={appState.layout} schema={layoutSchema} onSave={handleModalSave('layout')}/>
                <EditorModal label="Open data" value={appState.data} onSave={handleModalSave('data')} />
                <Validation />
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={goForward}>Go Forward</Button>
              </Stack>
              <InterfaceSelect />
              <Section layout={fetchUrlLayout as LayoutConfig} data={initialFetchUrlData} actions={sidebarActions}/>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
