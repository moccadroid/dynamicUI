import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';
import type { LayoutConfig } from '@/dynamicUI/components/ComponentConfig';

export const useLayout = () => {
  const { state, setState } = useStateContext();

  const setLayout = (layout?: LayoutConfig) => {
    const history = state.app.layoutHistory;
    let index = state.app.layoutHistoryIndex;
    if (layout) {
      history.push(layout);
      index = history.length - 1;
    }
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.layout = layout;
      newState.app.layoutHistory = history;
      newState.app.layoutHistoryIndex = index;
      return newState;
    });
  };

  const setLayoutName = (layoutName?: string) => {
    setState((prevState: State) => {
      const newState = { ...prevState };
      newState.layoutName = layoutName;
      return newState;
    });
  };

  return { layout: state.layout, setLayout, layoutName: state.layoutName, setLayoutName };
};
