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
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import type { ChangeEvent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import FetchUrl from '@/app/components/app/FetchUrl';
import InterfaceSelect from '@/app/components/app/InterfaceSelect';
import { EditorModal } from '@/app/components/app/EditorModal';
import layoutSchema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import ManageLayouts from '@/app/components/app/ManageLayouts';
import { useLayoutHistory } from '@/state/useLayoutHistory';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ isOpen, onClose }: DrawerProps) => {
  const { state, setState } = useStateContext();
  const [data, setData] = useState(JSON.stringify(state.exampleData));
  const [layout, setLayout] = useState(JSON.stringify(state.layout));
  const { goBack, goForward } = useLayoutHistory();

  useEffect(() => {
    setLayout(JSON.stringify(state.layout));
    setData(JSON.stringify(state.data));
  }, [state.exampleData, state.layout]);

  const handleSetData = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  };

  const handleSetLayout = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLayout(event.target.value);
  };

  const handleDataChange = () => {
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.exampleData = JSON.parse(data);
      return newState;
    });
  };

  const handleLayoutChange = () => {
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.layout = JSON.parse(layout);
      return newState;
    });
  };

  const handleModalSave = (fieldName: string) => (value: string | undefined) => {
    if (!value) return;

    setState((prevState: State) => {
      const newState = { ...prevState };
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        newState[fieldName] = JSON.parse(value);
      } catch (e) {
        console.error('Could not parse editorState', e);
      }
      return newState;
    });
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="lg">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Text>Do some stuff</Text>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <LayoutSelect />
            <ManageLayouts />
            <Instructions />
            <InterfaceSelect />
            <Stack>
              <Text as="b">Current Layout</Text>
              <Textarea value={layout} onChange={handleSetLayout} />
              <Stack direction="row">
                <Button onClick={handleLayoutChange}>Set new Layout</Button>
                <EditorModal onSave={handleModalSave('layout')} value={state.layout} schema={layoutSchema}/>
                <Button onClick={goBack}>Go Back</Button>
                <Button onClick={goForward}>Go Forward</Button>
              </Stack>
            </Stack>
            <Stack>
              <Text as="b">Example Data</Text>
              <Textarea value={data} onChange={handleSetData}/>
              <Stack direction="row">
                <Button onClick={handleDataChange}>Set new data</Button>
                <EditorModal onSave={handleModalSave('data')} value={state.exampleData}/>
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
