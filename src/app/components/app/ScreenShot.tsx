import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import { checkIfBrowserSupported, takeScreenshot } from '@xata.io/screenshot';
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
import { saveBase64Image } from '@/api/base64ToPng/api';
import { useAppState } from '@/dynamicUI/state/AppStateProvider';

export interface ScreenshotProps {
  onScreenshot: (state: string) => void;
}

const Screenshot: FC<ScreenshotProps> = ({ onScreenshot }) => {
  const { setAppState, appState } = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleTakeScreenshot = () => {
    if (checkIfBrowserSupported()) {
      onScreenshot('before');
      setTimeout(async () => {
        const screenshot = await takeScreenshot();
        setAppState('app.screenshot', screenshot);
        const path = await saveBase64Image(screenshot);
        console.log('screenshot saved to ', path);
        onScreenshot('after');
      }, 500);
    }
  };

  const handleShowScreenshot = () => {
    onOpen();
  };

  return (
    <Stack direction="row">
      <Button onClick={handleTakeScreenshot}>Take Screenshot</Button>
      <Button onClick={handleShowScreenshot}>Show last screenshot</Button>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Layout Schema</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <img src={appState.app.screenshot} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Screenshot;
