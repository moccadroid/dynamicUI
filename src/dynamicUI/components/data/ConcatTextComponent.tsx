import type { FC } from 'react';
import { useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import type { ConcatTextProperties } from '@/dynamicUI/components/ComponentConfig';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import useFormat from '@/dynamicUI/actions/format';

const ConcatTextComponent: FC<{ properties: ConcatTextProperties }> = ({ properties }) => {
  const { getState } = useSectionDataContext();
  const { fields, separator, fontSize } = properties;
  const format = useFormat(properties.format);

  const concatenatedValue = useMemo(() => {
    return fields.map(field => getState<string>(field)).filter(Boolean).join(separator);
  }, [fields, separator]);


  return <Text size={fontSize}>{format(concatenatedValue)}</Text>;
};

export default ConcatTextComponent;
