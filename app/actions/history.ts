import { useApplicationState } from "@/state/state";

export const toggleHistoryVisibility: () => void = () => {
  useApplicationState.setState(state => ({
    ...state,
    ui: {
      ...state.ui,
      historyVisible: !state.ui.historyVisible,
    },
  }));
};
