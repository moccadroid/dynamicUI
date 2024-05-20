import type { ButtonProperties } from '@/dynamicUI/components/ComponentConfig';
import { Button, Spinner } from '@chakra-ui/react';
import type { FC } from 'react';
import { useFullPath } from '@/dynamicUI/state/PathProvider';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import useSafeFormikContext from '@/dynamicUI/hooks/useSafeFormikContext';

const ButtonComponent: FC<{ properties: ButtonProperties }> = ({ properties }) => {
  const { getFullPath } = useFullPath();
  const { getSectionState } = useSectionDataContext();
  const { label, fieldName, type } = properties;
  const value = fieldName ? getSectionState<string>(getFullPath(fieldName)) : (label ?? 'undefined');
  const formikContext = useSafeFormikContext();

  let isLoading = false;
  if (formikContext) {
    isLoading = formikContext.isSubmitting;
  }

  return <Button minWidth={100} type={type}>{isLoading ? <Spinner /> : value}</Button>;
};

export default ButtonComponent;
