import { create } from "zustand";

import { State } from "./model";

export const useApplicationState = create<State>(_set => ({
  ui: { historyVisible: false },
  chat: {
    messages: [],
  },
}));
