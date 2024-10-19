import { useApplicationState } from "@/state/state";

export const clearChat: () => void = () => {
  useApplicationState.setState(state => ({
    ...state,
    chat: {
      ...state.chat,
      messages: [],
    },
  }));
};
