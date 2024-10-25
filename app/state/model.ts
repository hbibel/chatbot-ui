export interface Message {
  author: "user" | "assistant";
}

export interface State {
  ui: {
    historyVisible: boolean;
  };
  chat: {
    // TODO remove
    messages: Message[];
  };
}
