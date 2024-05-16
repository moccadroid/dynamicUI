import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text, Stack, Textarea, Button,
} from '@chakra-ui/react';
import Instructions from '@/app/components/app/Instructions';
import LayoutSelect from '@/app/components/app/LayoutSelect';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FetchUrl from '@/app/components/app/FetchUrl';
import InterfaceSelect from '@/app/components/app/InterfaceSelect';
import { EditorModal } from '@/app/components/app/EditorModal';
import layoutSchema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import ManageLayouts from '@/app/components/app/ManageLayouts';
import { useLayoutHistory } from '@/state/useLayoutHistory';
import Screenshot from '@/app/components/app/ScreenShot';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import Validation from '@/app/components/app/Validation';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onScreenshot: (state: string) => void;
}

const DrawerComponent = ({ isOpen, onClose, onScreenshot }: DrawerProps) => {
  const { appState, setAppState } = useAppState();
  const [data, setData] = useState(JSON.stringify(appState.exampleData));
  const [layout, setLayout] = useState(JSON.stringify(appState.layout));
  const { goBack, goForward } = useLayoutHistory();

  useEffect(() => {
    if (appState.layout) {
      setLayout(JSON.stringify(appState.layout));
    } else {
      setLayout('');
    }
    if (appState.exampleData) {
      setData(JSON.stringify(appState.exampleData));
    } else {
      setData('');
    }
  }, [appState.exampleData, appState.layout, appState.data]);

  const handleSetData = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  };

  const handleSetLayout = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLayout(event.target.value);
  };

  const handleDataChange = () => {
    setAppState('exampleData', JSON.parse(data));
    setAppState('data', JSON.parse(data));
  };

  const handleLayoutChange = () => {
    setAppState('layout', JSON.parse(layout));
  };

  const handleModalSave = (fieldName: string) => (value: string | undefined) => {
    if (!value) return;

    const editorState = JSON.parse(value);
    setAppState(fieldName, editorState);
  };

  const handleOnScreenshot = (state: string) => {
    onScreenshot(state);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="xl">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>Do some stuff</Text>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <Screenshot onScreenshot={handleOnScreenshot}/>
            <LayoutSelect />
            <ManageLayouts />
            <Instructions />
            <InterfaceSelect />
            <Validation />
            <Stack>
              <Text as="b">Current Layout</Text>
              <Textarea value={layout} onChange={handleSetLayout} />
              <Stack direction="row">
                <Button onClick={handleLayoutChange}>Set new Layout</Button>
                <EditorModal onSave={handleModalSave('layout')} value={appState.layout} schema={layoutSchema}/>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={goForward}>Go Forward</Button>
              </Stack>
            </Stack>
            <Stack>
              <Text as="b">Example Data</Text>
              <Textarea value={data} onChange={handleSetData}/>
              <Stack direction="row">
                <Button onClick={handleDataChange}>Set new data</Button>
                <EditorModal onSave={handleModalSave('data')} value={appState.exampleData}/>
              </Stack>
            </Stack>
            <FetchUrl />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
