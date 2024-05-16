import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel, Button, Radio,
  RadioGroup,
  Text,
  Textarea
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { ExtractionType } from '@/dynamicUI/parser/validation/extractForms';
import { extractFormPathsAndData } from '@/dynamicUI/parser/validation/extractForms';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import ValidationAgentFactory from '@/agents/validation/ValidationAgent';
import validationSchema from '@/dynamicUI/parser/schema/validation.schema.json';
import { updateLayoutWithValidation } from '@/dynamicUI/parser/validation/updateLayoutWIthValidation';

const Validation = () => {
  const [extractions, setExtractions] = useState<ExtractionType[]>([]);
  const { appState, getAppState, setAppState } = useAppState();
  const [selectedExtraction, setSelectedExtraction] = useState<ExtractionType>();
  const [prompt, setPrompt] = useState<string>('');

  useEffect(() => {
    const layout = getAppState<LayoutConfig>('layout');
    if (layout) {
      const extractions = extractFormPathsAndData(layout, appState.data);
      setExtractions(extractions);
    }
  }, [appState]);

  const handleOnRadioChange = (value: string) => {
    const selected = extractions.find(ex => ex.form.position === value);
    setSelectedExtraction(selected);
  };

  const createValidation = async () => {
    if (selectedExtraction) {
      const props = { prompt, data: selectedExtraction.data, schema: JSON.stringify(validationSchema) };
      const validationAgent = ValidationAgentFactory.create(props);
      const result = await validationAgent.run();

      const updatedLayout = updateLayoutWithValidation((appState.layout as LayoutConfig), selectedExtraction.form.position, result.validation);

      setAppState('layout', updatedLayout);

      setExtractions(prevExtractions =>
        prevExtractions.map(extraction =>
          extraction.form.position === selectedExtraction.form.position
            ? { ...extraction, validation: result.validation }
            : extraction
        )
      );

    }
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Text as="b">Create a validation:</Text>
        </AccordionButton>
        <AccordionPanel>
          <RadioGroup onChange={handleOnRadioChange}>
            { extractions.map((extraction) => {
              return (
                <Radio
                  key={extraction.form.position}
                  value={extraction.form.position}>
                  <pre>
                    { JSON.stringify(extraction.data, null, 4)}
                  </pre>
                </Radio>
              );
            })}
          </RadioGroup>
          <Textarea onChange={event => setPrompt(event.target.value)}></Textarea>
          <Button onClick={createValidation}>Create Validation</Button>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default Validation;
