import { useAppState } from '@/dynamicUI/state/AppStateProvider';
import { createActions } from '@/dynamicUI/actions/actions';
import { useEffect, useMemo } from 'react';
import type { ActionProperties } from '@/dynamicUI/components/ComponentConfig';

export const useActions = () => {
  const { getAppState, setAppState } = useAppState();

  return useMemo(() => createActions(setAppState, getAppState), [setAppState, getAppState]);
};

export const useActionProperties = (actionList?: ActionProperties[], name?: string) => {
  const actions = useActions();

  if (!actionList || !name) {
    return;
  }

  useEffect(() => {
    actionList.forEach(actionProperties => {
      const action = actions[actionProperties.name];
      if (action) {
        action(name);
      }
    });
  }, []);


};
