import type { TextareaProperties } from '@/dynamicUI/components/ComponentConfig';
import type { ChangeEvent, FC } from 'react';
import { FormControl, FormLabel, Textarea } from '@chakra-ui/react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const TextareaComponent: FC<{ properties: TextareaProperties }> = ({ properties }) => {

  const { label, fieldName, placeholder } = properties;
  const { fullPath } = useFullPath(fieldName);
  const { getState, setState } = useSectionDataContext();
  const value = getState<string>(fullPath);

  const updateAction = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(fullPath, event.target.value);
  };

  return (
    <FormControl variant="floating">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Textarea placeholder={placeholder} value={value} onChange={updateAction}/>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
};

export default TextareaComponent;
