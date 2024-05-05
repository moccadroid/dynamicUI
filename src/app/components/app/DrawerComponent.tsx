import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text, Select, Box, Stack, Textarea, Button,
} from '@chakra-ui/react';
import Instructions from '@/app/components/app/Instructions';
import LayoutSelect from '@/app/components/app/LayoutSelect';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import { useState } from 'react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ isOpen, onClose }: DrawerProps) => {
  const { state, setState } = useStateContext();
  const [data, setData] = useState(JSON.stringify(state.data));

  const handleDataChange = (event: any) => {
    console.log(data);
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.data = JSON.parse(data);
      return newState;
    });
  };

  const handleSetData = (event: any) => {
    setData(event.target.value);
  };

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
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
              <Textarea value={JSON.stringify(state.layout)} onChange={() => {}} />
            </Stack>
            <Stack>
              <Text as="b">Current Data</Text>
              <Textarea value={data} onChange={handleSetData}/>
              <Button onClick={handleDataChange}>Set new data</Button>
            </Stack>
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
