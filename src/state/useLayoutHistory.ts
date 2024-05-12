import type { State } from '@/state/Provider';
import { useStateContext } from '@/state/Provider';

export const useLayoutHistory = () => {
  const { state, setState } = useStateContext();

  const goForward = () => {
    const index = state.app.layoutHistoryIndex + 1;
    if (index < state.app.layoutHistory.length) {
      const layout = state.app.layoutHistory[index];
      setState((prevState: State) => {
        const newState = { ...prevState };
        newState.layout = layout;
        newState.app.layoutHistoryIndex = index;
        return newState;
      });
    }
  };

  const goBack = () => {
    const index = state.app.layoutHistoryIndex - 1;
    if (index > 0) {
      const layout = state.app.layoutHistory[index];
      setState((prevState: State) => {
        const newState = { ...prevState };
        newState.layout = layout;
        newState.app.layoutHistoryIndex = index;
        return newState;
      });
    }
  };

  return { goForward, goBack };
};
