import { create } from "zustand";

import { Author, ChatState, Message } from "./chatModel";

interface ChatMutations {
  appendToLastMessage: (text: string) => void;
  appendEmptyMessage: (author: Author) => void;
  appendUserMessage: (text: string) => void;
  updateInput: (text: string) => void;
}

interface State {
  chat: ChatState;
}

interface Mutations {
  chatMutations: ChatMutations;
}

export const useApplicationState = create<State & Mutations>(set => ({
  chat: {
    messages: [],
    input: "",
  },

  chatMutations: {
    updateInput: function (text: string) {
      set(state => {
        return { ...state, chat: { ...state.chat, input: text } };
      });
    },

    appendEmptyMessage: function (author: Author) {
      set(state => {
        const newMessage: Message = { author, text: "" };
        const messages = [...state.chat.messages, newMessage];
        return { ...state, chat: { ...state.chat, messages } };
      });
    },

    appendToLastMessage: function (textPart: string) {
      set(state => {
        const lastMessage = state.chat.messages[state.chat.messages.length - 1];
        const updatedMessage = {
          ...lastMessage,
          text: lastMessage.text + textPart,
        };
        const messages = [...state.chat.messages.slice(0, -1), updatedMessage];
        return { ...state, chat: { ...state.chat, messages } };
      });
    },

    appendUserMessage: function (text: string) {
      set(state => {
        const newMessage: Message = { author: "user", text };
        const messages = [...state.chat.messages, newMessage];
        return { ...state, chat: { ...state.chat, messages } };
      });
    },
  },
}));
