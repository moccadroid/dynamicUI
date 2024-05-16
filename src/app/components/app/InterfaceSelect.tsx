import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox, Grid, GridItem,
  Stack,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import componentConfig from '@/dynamicUI/ai/definitions/componentConfig.json';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

const InterfaceSelect = () => {
  const { appState, setAppState } = useAppState();
  const [definitions, setDefinitions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const selectedDefinitions: any[] = appState.app?.selectedDefinitions;

    if (Array.isArray(selectedDefinitions)) {
      const object = selectedDefinitions.reduce<Record<string, boolean>>((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setDefinitions(object);
    }
  }, [appState]);

  const handleSelect = (key: string) => () => {
    const selection = { ...definitions, [key]: !definitions[key] };
    setDefinitions(selection);
    const selectedDefinitions = Object.entries(selection).filter(([_, value]) => value).map(([key, _]) => key);
    setAppState('app.selectedDefinitions', selectedDefinitions);
  };

  return (
    <Stack direction="column">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Text as="b">Select Components to use:</Text>
          </AccordionButton>
          <AccordionPanel>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
              {Object.keys(componentConfig).map((key) => {
                return (
                  <GridItem key={key}>
                    <Checkbox isChecked={definitions[key]} onChange={handleSelect(key)}>{key}</Checkbox>
                  </GridItem>
                );
              })}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
};

export default InterfaceSelect;
