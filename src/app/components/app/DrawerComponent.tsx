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

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ isOpen, onClose }: DrawerProps) => {
  const { state, setState } = useStateContext();
  const [data, setData] = useState(JSON.stringify(state.data));
  const [layout, setLayout] = useState(JSON.stringify(state.layout));

  useEffect(() => {
    setLayout(JSON.stringify(state.layout));
    setData(JSON.stringify(state.data));
  }, [state.data, state.layout]);

  const handleSetData = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setData(event.target.value);
  };

  const handleSetLayout = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLayout(event.target.value);
  };

  const handleDataChange = () => {
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.data = JSON.parse(data);
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
            <Instructions />
            <Stack>
              <Text as="b">Current Layout</Text>
              <Textarea value={layout} onChange={handleSetLayout} />
              <Button onClick={handleLayoutChange}>Set new Layout</Button>
            </Stack>
            <Stack>
              <Text as="b">Current Data</Text>
              <Textarea value={data} onChange={handleSetData}/>
              <Button onClick={handleDataChange}>Set new data</Button>
            </Stack>
            <FetchUrl />
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
