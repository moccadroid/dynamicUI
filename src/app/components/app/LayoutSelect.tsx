import { Select, Stack, Text } from '@chakra-ui/react';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import { setValueToState } from '@/state/setValueToState';
import { userData } from '@/api/db/dataAndLayouts';

const LayoutSelect = () => {
  const { setState } = useStateContext();


  const handleSelect = (event: any) => {
    const key: any = String(event.target.value);
    const selectedLayout = userData.layouts.find((layout) => key in layout);
    if (selectedLayout && key in selectedLayout) {

      setState((prevState: State) => {
        const newState = { ...prevState };
        // @ts-ignore
        newState.layout = selectedLayout[key];
        return newState;
      });
    }
  };

  return (
    <Stack direction="column">
      <Text as="b">Select a fixed Layout</Text>
      <Select onChange={handleSelect}>
        {userData.layouts.map((layout: any) => {
          const key = Object.keys(layout)[0];
          return <option key={key} value={key}>{key}</option>;
        })}
      </Select>
    </Stack>
  );

};

export default LayoutSelect;
