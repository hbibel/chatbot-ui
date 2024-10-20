import { Message } from "@/state/model";
import { useApplicationState } from "@/state/state";

import { addMessage, clearChat } from "./chat";

describe("addMessage", () => {
  it("appends a message", () => {
    const message1: Message = { author: "user" };
    const message2: Message = { author: "assistant" };

    addMessage(message1);
    addMessage(message2);

    expect(getMessages()).toStrictEqual([message1, message2]);
  });
});

describe("clearChat", () => {
  it("deletes all messages from state", () => {
    addMessage({ author: "user" });

    clearChat();

    expect(getMessages().length).toBe(0);
  });
});

const getMessages: () => Array<Message> = () =>
  useApplicationState.getState().chat.messages;
