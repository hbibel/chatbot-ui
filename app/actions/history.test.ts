import { useApplicationState } from "@/state/state";

import { toggleHistoryVisibility } from "./history";

describe("toggleHistoryVisibility", () => {
  it("sets historyVisible to true if false before", () => {
    setVisible(false);

    toggleHistoryVisibility();

    expect(getVisible()).toBe(true);
  });

  it("sets historyVisible to false if true before", () => {
    setVisible(true);

    toggleHistoryVisibility();

    expect(getVisible()).toBe(false);
  });
});

const getVisible: () => boolean = () =>
  useApplicationState.getState().ui.historyVisible;

const setVisible: (v: boolean) => void = v =>
  useApplicationState.setState(state => ({
    ...state,
    ui: {
      ...state.ui,
      historyVisible: v,
    },
  }));
