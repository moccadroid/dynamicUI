import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text, useDisclosure
} from '@chakra-ui/react';
import Section from '@/dynamicUI/components/Section';
import sidebarLayout from './layouts/sidebar.layout.json';
import sidebarData from './data/sidebar.data.json';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import ManageLayouts from '@/app/components/app/ManageLayouts';
import { useMemo } from 'react';
import InterfaceSelect from '@/app/components/app/InterfaceSelect';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import layoutSchema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import { EditorModal } from '@/app/components/app/EditorModal';

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { appState, setAppState } = useAppState();

  const initialData= useMemo(() => {
    return {
      ...sidebarData,
      promptHistory: appState.app.promptHistory,
      currentPrompt: appState.app.currentPrompt,
      layout: appState.layout,
      exampleData: appState.exampleData,
      selectedDefinition: appState.app.selectedDefinitions
    };
  }, [appState]);

  const handleModalSave = (fieldName: string) => (value: string | undefined) => {
    if (!value) return;
    const editorState = JSON.parse(value);
    setAppState(fieldName, editorState);
  };

  return (
    <Box>
      <Button onClick={onOpen}>Sidebar</Button>
      <Drawer isOpen={isOpen} onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Text>Do some stuff</Text>
          </DrawerHeader>
          <DrawerBody>
            <ManageLayouts />
            <Section layout={sidebarLayout as LayoutConfig} data={initialData} />
            <EditorModal onSave={handleModalSave('layout')} value={appState.layout} schema={layoutSchema}/>
            <InterfaceSelect />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Sidebar;
