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
import { Box, Button } from '@chakra-ui/react';
import { useStateContext } from '@/state/Provider';
import { Editor } from '@monaco-editor/react';

export interface EditorModalProps {
  value: any;
  schema?: any;
  onSave?: (value: string) => void;
}

export const EditorModal: FC<EditorModalProps> = ({ value, onSave, schema }) => {
  const { state } = useStateContext();
  const [isOpen, setIsOpen] = useState(false);
  const [editorState, setEditorState] = useState<string |undefined>(undefined);

  const handleOnSave = () => {
    if (onSave) {
      onSave(editorState ?? '');
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (value) {
      setEditorState(JSON.stringify(value, null, '\t'));
    }
  }, [state.layout]);

  const handleOnOpen = () => {
    setIsOpen(true);
  };

  const handleOnCancel = () => {
    setIsOpen(false);
  };

  const handleOnEditorChange = (value: string | undefined) => {
    setEditorState(value);
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
      <Button onClick={handleOnOpen}>Open in Editor</Button>

      <Modal isOpen={isOpen} onClose={handleOnCancel} size="full">
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
              onChange={handleOnEditorChange}
              onMount={handleOnMount}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleOnSave}>Save</Button>
            <Button variant="ghost" onClick={handleOnCancel}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
