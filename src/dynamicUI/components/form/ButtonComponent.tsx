import type { ButtonProperties } from '@/dynamicUI/components/ComponentConfig';
import { Button } from '@chakra-ui/react';
import type { FC } from 'react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

const ButtonComponent: FC<{ properties: ButtonProperties }> = ({ properties }) => {
  const { getFullPath } = useFullPath();
  const { getState } = useSectionDataContext();
  const { label, fieldName, type } = properties;

  const value = fieldName ? getState<string>(getFullPath(fieldName)) : (label ?? 'undefined');
  return <Button type={type}>{value}</Button>;
};

export default ButtonComponent;
