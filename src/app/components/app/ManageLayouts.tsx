import { Button, Input, Select, Stack, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useLayout } from '@/state/useLayout';
import { useData } from '@/state/useData';
import { validateAndFixJson } from '@/dynamicUI/parser/layout/fixLayout';

export interface StorageLayout { name: string; layout: string, data: string }

const ManageLayouts = () => {
  const { layout, setLayout, layoutName, setLayoutName } = useLayout();
  const { data, setData } = useData();
  const [storageLayouts, setStorageLayouts] = useState<StorageLayout[]>([]);
  const [name, setName] = useState(layoutName);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);

  useEffect(() => {
    const storageLayouts = loadStorageLayouts();
    setStorageLayouts(storageLayouts);

    if (!layout && storageLayouts[0]) {
      setLayout(JSON.parse(storageLayouts[0].layout) as LayoutConfig);
      setLayoutName(storageLayouts[0].name);
      if (storageLayouts[0].data) {
        setData(JSON.parse(storageLayouts[0].data));
      }
    }
  }, []);

  const handleSave = () => {
    if (!name) {
      onOpen();
    } else {
      onClose();
      if (layout) {
        saveLayout(layout as LayoutConfig, name as string);
      }
    }
  };

  const handleSaveAs = () => {
    onOpen();
  };

  const handleDelete = () => {
    setIsDelete(true);
    onOpen();
  };

  const handleNew = () => {
    setLayout(undefined);
    setData(undefined);
    setLayoutName(undefined);
  };

  const handleSelect = (event: any) => {
    const selectedName = event.target.value;
    const selectedLayout = storageLayouts.find(sl => sl.name === selectedName);
    if (selectedLayout) {
      const layout = validateAndFixJson(JSON.parse(selectedLayout.layout));
      setLayout(layout);
      setLayoutName(selectedLayout.name);
      setName(selectedLayout.name);
      setData(JSON.parse(selectedLayout.data));
      console.log(`Layout ${selectedLayout.name} selected`);
    }
  };

  const saveLayout = (layout: LayoutConfig, name: string) => {
    const storageLayouts = loadStorageLayouts();
    const index = storageLayouts.findIndex((item: StorageLayout) => item.name === name);
    if (index !== -1) {
      storageLayouts[index] = { data: JSON.stringify(data), name, layout: JSON.stringify(layout) };
    } else {
      storageLayouts.push({ data: JSON.stringify(data), name, layout: JSON.stringify(layout) });
    }
    localStorage.setItem('layouts', JSON.stringify(storageLayouts));
    setStorageLayouts(storageLayouts);
    setLayoutName(name);
    console.log(`Layout ${name} saved`);
  };

  const deleteLayout = () => {
    const storageLayouts = loadStorageLayouts();
    const newStorageLayouts = storageLayouts.filter(layout => layout.name !== name);
    localStorage.setItem('layouts', JSON.stringify(newStorageLayouts));
    setStorageLayouts(newStorageLayouts);
    onClose();

    const newLayout = newStorageLayouts[0];
    if (newLayout) {
      setLayout(JSON.parse(newLayout.layout) as LayoutConfig);
      setLayoutName(newLayout.name);
    } else {
      setLayout(undefined);
      setLayoutName(undefined);
    }

  };

  const loadStorageLayouts = (): StorageLayout[] => {
    const storageLayouts = localStorage.getItem('layouts');
    if (storageLayouts) {
      return JSON.parse(storageLayouts);
    }
    return [];
  };

  return (
    <Stack direction="column">
      <Text as="b">Your collection:</Text>
      <Select onChange={handleSelect} value={name}>
        {storageLayouts.map((storageLayout: StorageLayout, index) => {
          return <option key={storageLayout.name + index} value={storageLayout.name}>{storageLayout.name}</option>;
        })}
      </Select>
      <Stack direction="row">
        <Button onClick={handleSave}>Save</Button>
        <Button onClick={handleSaveAs}>Save As...</Button>
        <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
        <Button colorScheme='green' onClick={handleNew}>New</Button>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ isDelete ? 'Are you sure?' : 'Choose a name' }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            { isDelete
              ? <Text fontSize='2xl'>Deleting this layout will permanently remove it from your collection!</Text>
              : <Input onChange={(event) => setName(event.target.value)} />
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={ isDelete ? 'red' : 'blue'} mr={3} onClick={isDelete ? deleteLayout : handleSave}>
              { isDelete ? 'Delete' : 'Save' }
            </Button>
            <Button variant='alert' onClick={() => { onClose(); setIsDelete(false);}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );

};

export default ManageLayouts;
