import { Select, Stack, Text } from '@chakra-ui/react';
import { userData } from '@/api/db/dataAndLayouts';
import { useLayout } from '@/state/useLayout';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

const LayoutSelect = () => {
  const { setLayout } = useLayout();

  const handleSelect = (event: any) => {
    const key: any = String(event.target.value);
    const selectedLayout = userData.layouts.find((layout) => key in layout);
    if (selectedLayout && key in selectedLayout) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setLayout(selectedLayout[key] as LayoutConfig);
    }
  };

  return (
    <Stack direction="column">
      <Text as="b">Select a fixed Layout</Text>
      <Select onChange={handleSelect}>
        {userData.layouts.map((layout: any) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          const key = Object.keys(layout)[0];
          return <option key={key} value={key}>{key}</option>;
        })}
      </Select>
    </Stack>
  );

};

export default LayoutSelect;
