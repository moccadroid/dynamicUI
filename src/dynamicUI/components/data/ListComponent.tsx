import type { FC } from 'react';
import { useMemo } from 'react';
import { Grid, GridItem, List, Stack } from '@chakra-ui/react';
import type { ListProperties } from '@/dynamicUI/components/ComponentConfig';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { PathProvider, useFullPath } from '@/dynamicUI/state/PathProvider';

const ListComponent: FC<{ properties: ListProperties, debug: boolean}> = ({ properties, debug = false }) => {
  const { fieldName, direction, layout, as, gridSettings } = properties;
  const { getSectionState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const list = getSectionState<any[]>(fullPath) ?? [];

  if (as === 'grid') {
    return useMemo(() => (
      <Grid gap={5} templateRows={gridSettings?.templateRows} templateColumns={gridSettings?.templateColumns}>
        { list.map((_, index) => {
          const entryPath = `${fullPath}[${index}]`;
          return (
            <GridItem key={entryPath}>
              <PathProvider path={entryPath}>
                <ParsedLayout config={layout} debug={debug}/>
              </PathProvider>
            </GridItem>
          );
        })}
      </Grid>
    ), [list]);
  }

  return (
    <List>
      <Stack direction={direction} gap={5}>
        { list.map((_, index) => {
          const entryPath = `${fullPath}[${index}]`;
          return (
            <PathProvider path={entryPath} key={entryPath}>
              <ParsedLayout config={layout} debug={debug}/>
            </PathProvider>);
        })}
      </Stack>
    </List>
  );
  //}, [list]);
};

export default ListComponent;
/*

entry layout {"components":[{"type":"CardLayout","properties":{"title":"Metal Mario - Tennis","components":[{"type":"Image","properties":{"fieldName":"image","alt":"Metal Mario - Tennis"}},{"type":"LabeledText","properties":{"fieldName":"amiiboSeries","label":"Amiibo Series","separator":":","fontSize":"md"}},{"type":"LabeledText","properties":{"fieldName":"gameSeries","label":"Game Series","separator":":","fontSize":"md"}},{"type":"LabeledText","properties":{"fieldName":"release.na","label":"Release (NA)","separator":":","fontSize":"md"}}]}}]}

 */
