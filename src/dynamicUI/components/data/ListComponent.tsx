import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';
import { Grid, GridItem, List, Stack } from '@chakra-ui/react';
import type { ListProperties } from '@/dynamicUI/components/ComponentConfig';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { PathProvider, useFullPath } from '@/dynamicUI/state/PathProvider';

const ListComponent: FC<{ properties: ListProperties}> = ({ properties }) => {
  const { fieldName, direction, layout, as, gridSettings } = properties;
  const { getState } = useSectionDataContext();
  const { fullPath } = useFullPath(fieldName);
  const list = getState<any[]>(fullPath) ?? [];

  if (as === 'grid') {
    console.log('IMAGES');
    return useMemo(() => (
      <Grid gap={5} templateRows={gridSettings?.templateRows} templateColumns={gridSettings?.templateColumns}>
        { list.map((_, index) => {
          const entryPath = `${fullPath}[${index}]`;
          const rowSpan = gridSettings?.childSettings?.[index]?.rowSpan;
          const colSpan = gridSettings?.childSettings?.[index]?.colSpan;
          return (
            <GridItem rowSpan={rowSpan} colSpan={colSpan} key={entryPath}>
              <PathProvider path={entryPath}>
                <ParsedLayout config={layout} />
              </PathProvider>
            </GridItem>
          );
        })}
      </Grid>
    ), [list]);
  }

  return useMemo(() => (
    <List>
      <Stack direction={direction} gap={5}>
        { list.map((_, index) => {
          const entryPath = `${fullPath}[${index}]`;
          return (
            <PathProvider path={entryPath} key={entryPath}>
              <ParsedLayout config={layout} />
            </PathProvider>);
        })}
      </Stack>
    </List>
  ), [list]);
};

export default ListComponent;
/*

entry layout {"components":[{"type":"CardLayout","properties":{"title":"Metal Mario - Tennis","components":[{"type":"Image","properties":{"fieldName":"image","alt":"Metal Mario - Tennis"}},{"type":"LabeledText","properties":{"fieldName":"amiiboSeries","label":"Amiibo Series","separator":":","fontSize":"md"}},{"type":"LabeledText","properties":{"fieldName":"gameSeries","label":"Game Series","separator":":","fontSize":"md"}},{"type":"LabeledText","properties":{"fieldName":"release.na","label":"Release (NA)","separator":":","fontSize":"md"}}]}}]}

 */
