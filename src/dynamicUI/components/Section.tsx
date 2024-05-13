import type { FC } from 'react';
import { useMemo } from 'react';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Text } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { SectionDataProvider } from '../state/SectionDataProvider';
import { PathProvider } from '@/dynamicUI/state/PathProvider';
import schema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import { validateJson } from '@/dynamicUI/parser/layout/validateLayout';
export interface SectionT {
  layout: LayoutConfig;
  data: any;
}

const Section: FC<SectionT> = ({ layout, data }) => {

  return useMemo(() => {
    if (layout) {
      const errors = validateJson(layout, schema);
      if (!errors) {
        return (
          <SectionDataProvider initialData={data}>
            <PathProvider>
              <ParsedLayout config={layout}/>
            </PathProvider>
          </SectionDataProvider>
        );
      } else {
        return (
          <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
          >
            <AlertIcon boxSize='40px' />
            <AlertTitle>Layout JSON is invalid!</AlertTitle>
            <AlertDescription>
              {errors.map((error: any, index: number) => {
                return (
                  <Box key={index}>
                    <pre>{JSON.stringify(error, null, 4)}</pre>
                  </Box>);
              })}
            </AlertDescription>
          </Alert>
        );
      }
    }
    return <Text>Please generate or select a layout</Text>;
  }, [layout, data]);
};
export default Section;
