import {
  Box,
  Button,
  Grid, GridItem,
  Stack, Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal';
import type { FormType } from '@/dynamicUI/parser/validation/extractForms';
import { extractFormObjects } from '@/dynamicUI/parser/validation/extractForms';
import validationSchema from '@/dynamicUI/parser/schema/validation.schema.json';
import ValidationAgentFactory from '@/agents/validation/ValidationAgent';
import { updateFormValidation } from '@/dynamicUI/parser/validation/updateFormValidation';
import { useLayout } from '@/state/useLayout';

const Validation = () => {
  const [extractedForms, setExtractedForms] = useState<FormType[]>([]);
  const { appState, getAppState } = useAppState();
  const { setLayout } = useLayout();
  const [selectedForm, setSelectedForm] = useState<FormType>();
  const [prompt, setPrompt] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentValidation, setCurrentValidation] = useState('');

  useEffect(() => {
    const layout = getAppState<LayoutConfig>('layout');
    if (layout) {
      const extractedForms = extractFormObjects(layout);
      setExtractedForms(extractedForms);
    }
  }, [appState]);

  useEffect(() => {
    setSelectedForm(undefined);
  }, [appState.layout]);

  const createValidation = async () => {
    if (selectedForm) {

      const props = { prompt, data: selectedForm, schema: JSON.stringify(validationSchema) };
      const validationAgent = ValidationAgentFactory.create(props);
      const { validation } = await validationAgent.run();

      const newForm = { ...selectedForm };
      newForm.properties.validation = validation;
      setSelectedForm(newForm);
      setCurrentValidation(JSON.stringify(validation, null, 4));
      setExtractedForms(prev => prev.map(form => form.properties.name === newForm.properties.name ? newForm : form));
    }
  };

  const handleSaveValidation = () => {
    if (currentValidation !== '' && selectedForm) {
      const updatedLayout = updateFormValidation(
        (appState.layout as LayoutConfig), selectedForm.properties.name, JSON.parse(currentValidation));
      console.log(updatedLayout);
      setLayout(updatedLayout);
      onClose();
    }
  };

  const handleSelect = (name: string) => () => {
    const selected = extractedForms.find(form => form.properties.name === name);
    if (selected) {
      setSelectedForm(selected);
      const { validation } = selected.properties;
      setCurrentValidation(JSON.stringify(validation, null, 4));
    }
  };


  const showForm = { ...selectedForm };
  if (showForm?.properties) {
    showForm.properties.components = [];
  }

  return (
    <Box>
      <Button onClick={onOpen}>Open Validations</Button>
      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Form Validations</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              h={'80vh'}
              templateColumns="repeat(8, 1fr)"
              templateRows="repeat(7, 1fr)"
              gap={3}>
              <GridItem rowSpan={8} colSpan={2}>
                { extractedForms.map((form) => {
                  const name = form.properties.name;
                  const selected = name === selectedForm?.properties.name;
                  return (
                    <Box
                      key={name}
                      onClick={handleSelect(name)}
                      bg={selected ? 'tomato' : 'white'}
                      padding={3}>
                      {name}
                    </Box>
                  );
                })}
              </GridItem>
              <GridItem rowSpan={3} colSpan={6} overflow="auto">
                <Box padding={3}>
                  { selectedForm &&
                  <pre>{ JSON.stringify(showForm, null, 4)}</pre>
                  }
                </Box>
              </GridItem>
              <GridItem rowSpan={3} colSpan={6}>
                <Box height="100%">
                  { selectedForm &&
                    <Textarea
                      onChange={(event) => setCurrentValidation(event.target.value)}
                      height={'100%'}
                      value={currentValidation} />
                  }
                </Box>
              </GridItem>
              <GridItem rowSpan={1} colSpan={6}>
                <Stack height="100%" direction="row" alignItems={'flex-end'}>
                  <Textarea
                    value={prompt}
                    onChange={(event) => setPrompt(event.target.value)} />
                  <Stack>
                    <Button colorScheme="green" onClick={handleSaveValidation}>Save Validation</Button>
                    {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
                    <Button onClick={createValidation}>Create Validation</Button>
                  </Stack>
                </Stack>
              </GridItem>
            </Grid>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>


  );
};

export default Validation;
