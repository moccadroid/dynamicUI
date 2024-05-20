import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import { useMemo } from 'react';
import type { ActionMap } from '@/dynamicUI/actions/actions';
import { useSectionDataContext } from '@/dynamicUI/state/SectionDataProvider';

export const useActions = () => {
  const { getAppState, setAppState, loadingStates, setLoading } = useAppState();
  const { sectionActions } = useSectionDataContext();

  return useMemo(() => {
    const boundActions: ActionMap = {};

    for (const key in sectionActions) {
      boundActions[key] = sectionActions[key]({ setAppState, getAppState, loadingStates, setLoading });
    }

    return boundActions;
  }, [setAppState, getAppState, sectionActions]);
};
