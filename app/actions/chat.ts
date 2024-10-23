import { Message } from "@/state/model";
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

export const addMessage: (msg: Message) => void = msg => {
  useApplicationState.setState(state => ({
    ...state,
    chat: {
      ...state.chat,
      messages: [...state.chat.messages, msg],
    },
  }));
};

export const uploadFiles: (files: FileList) => void = files => {
  // TODO
};
