import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Checkbox, Grid, GridItem,
  Stack,
  Text
} from '@chakra-ui/react';
import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import { useEffect, useState } from 'react';
import componentConfig from '@/dynamicUI/ai/definitions/componentConfig.json';

const InterfaceSelect = () => {
  const { setState, state } = useStateContext();
  const [definitions, setDefinitions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const object = state.app.selectedDefinitions.reduce((acc, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      acc[key] = true;
      return acc;
    }, {});
    setDefinitions(object);
  }, []);

  const handleSelect = (key: string) => () => {
    const selection = { ...definitions, [key]: !definitions[key] };
    setDefinitions(selection);
    const selectedDefinitions = Object.entries(selection).filter(([_, value]) => value).map(([key, _]) => key);
    setState(((prevState: State) => {
      const newState = { ...prevState };
      newState.app.selectedDefinitions = selectedDefinitions;
      return newState;
    }));
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
