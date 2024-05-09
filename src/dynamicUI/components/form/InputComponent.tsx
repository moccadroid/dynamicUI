import type { InputProperties } from '@/dynamicUI/components/ComponentConfig';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import type { ChangeEvent, FC } from 'react';
import { getAction } from '@/actions/actions';
import { useStateContext } from '@/state/Provider';
import { getValueFromState } from '@/state/getValueFromState';
import type { UpdateFieldParams } from '@/interfaces/actions/ActionConfig';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { useFullPath } from '@/dynamicUI/state/PathProvider';

const InputComponent: FC<{ properties: InputProperties }> = ({ properties }) => {
  const { label, fieldName, placeholder } = properties;
  const fullPath = useFullPath(fieldName);
  const { getState, setState } = useSectionDataContext();
  const value = getState<string>(properties.fieldName) ?? '';

  const updateAction = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setState(fullPath, event.target.value);
  };

  return (
    <FormControl variant="floating">
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
      <Input placeholder={placeholder} value={value} onChange={updateAction}/>
      <FormLabel>{label}</FormLabel>
    </FormControl>
  );
};

export default InputComponent;
