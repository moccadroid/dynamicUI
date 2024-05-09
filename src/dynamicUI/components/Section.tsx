import type { FC } from 'react';
import { useMemo } from 'react';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { Text } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { SectionDataProvider } from '../state/SectionDataProvider';
import { PathProvider } from '@/dynamicUI/state/PathProvider';

export interface SectionT {
  layout: LayoutConfig;
  data: any;
}

const Section: FC<SectionT> = ({ layout, data }) => {

  return useMemo(() => {
    if (layout) {
      return (
        <SectionDataProvider initialData={data}>
          <PathProvider>
            <ParsedLayout config={layout}/>
          </PathProvider>
        </SectionDataProvider>
      );
    }
    return <Text>Please generate or select a layout</Text>;
  }, [layout]);
};
export default Section;
