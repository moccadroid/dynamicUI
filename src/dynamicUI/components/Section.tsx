import type { FC } from 'react';
import { useMemo } from 'react';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Stack, Text } from '@chakra-ui/react';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';
import { SectionDataProvider } from '../state/SectionDataProvider';
import { PathProvider } from '@/dynamicUI/state/PathProvider';
import schema from '@/dynamicUI/parser/schema/componentConfig.schema.json';
import { validateJson } from '@/dynamicUI/parser/layout/validateLayout';
import { EditorModal } from '@/app/components/app/EditorModal';
import type { Actions } from '@/dynamicUI/actions/actions';

export interface SectionT {
  layout: LayoutConfig;
  data: any;
  actions?: Actions;
  debug?: boolean;
}

const Section: FC<SectionT> = ({ layout, data, actions, debug = false }) => {
  return useMemo(() => {
    if (layout) {
      const errors = validateJson(layout, schema);
      if (!errors) {
        return (
          <SectionDataProvider initialData={data} actions={actions}>
            <PathProvider>
              <ParsedLayout config={layout} debug={debug}/>
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
            <Stack width="100%" direction="row" justify="space-between">
              <AlertIcon boxSize='40px' />
              <AlertTitle>Layout JSON is invalid!</AlertTitle>
              <EditorModal label="" value={layout} schema={schema} onSave={() => {}} />
            </Stack>
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
  }, [layout, data, debug]);
};
export default Section;
