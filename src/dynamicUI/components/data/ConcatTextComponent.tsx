import type { FC } from 'react';
import { useMemo } from 'react';
import { Text } from '@chakra-ui/react';
import type { ConcatTextProperties } from '@/dynamicUI/components/ComponentConfig';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import useFormat from '@/dynamicUI/actions/format';
import { useFullPath } from '@/dynamicUI/state/PathProvider';

const ConcatTextComponent: FC<{ properties: ConcatTextProperties }> = ({ properties }) => {
  const { getSectionState } = useSectionDataContext();
  const { fields, separator, fontSize } = properties;
  const format = useFormat(properties.format);
  const { getFullPath } = useFullPath();

  const concatenatedValue = useMemo(() => {
    return fields.map(field => format(getSectionState<string>(getFullPath(field)) ?? '')).filter(Boolean).join(separator);
  }, [fields, separator]);


  return <Text size={fontSize}>{concatenatedValue}</Text>;
};

export default ConcatTextComponent;
