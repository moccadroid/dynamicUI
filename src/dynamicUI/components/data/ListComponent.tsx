import type { FC } from 'react';
import { useMemo } from 'react';
import { List, Stack } from '@chakra-ui/react';
import type { ListProperties } from '@/dynamicUI/components/ComponentConfig';
import ParsedLayout from '@/dynamicUI/parser/ParsedLayout';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';
import { PathProvider, useFullPath } from '@/dynamicUI/state/PathProvider';

const ListComponent: FC<{ properties: ListProperties}> = ({ properties }) => {
  const { getState } = useSectionDataContext();
  const fullPath = useFullPath(properties.fieldName);
  const list = getState<any[]>(fullPath) ?? [];

  return useMemo(() => (
    <List>
      <Stack spacing={5}>
        { list.map((_, index) => {
          const entryPath = `${fullPath}[${index}]`;
          return (
            <PathProvider path={entryPath} key={entryPath}>
              <ParsedLayout config={properties.layout} />
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
