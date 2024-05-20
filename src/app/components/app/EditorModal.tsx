'use client';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Box, Button, useDisclosure } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';

export interface EditorModalProps {
  label: string;
  value: any;
  schema?: any;
  onSave?: (value: string) => void;
}

export const EditorModal: FC<EditorModalProps> = ({ label, value, onSave, schema }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editorState, setEditorState] = useState<string |undefined>(undefined);

  useEffect(() => {
    if (value) {
      setEditorState(JSON.stringify(value, null, '\t'));
    } else {
      setEditorState('');
    }
  }, [value]);

  const handleOnSave = () => {
    if (onSave) {
      onSave(editorState ?? '');
    }
    onClose();
  };

  const handleOnMount = (editor: any, monaco: any) => {
    if (schema) {
      monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
        validate: true,
        schemas: [{
          fileMatch: ['*'],
          schema: schema,
        }]
      });
    }
  };

  return (
    <Box>
      <Button onClick={onOpen}>{label}</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Layout Schema</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Editor
              height="80vh"
              width="90vw"
              defaultLanguage="json"
              value={editorState}
              onChange={setEditorState}
              onMount={handleOnMount}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnSave}>Save</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
