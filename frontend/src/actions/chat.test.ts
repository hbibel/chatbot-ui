import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { useApplicationState } from "@/state/state";

import {
  type ChatMessageEvent,
  type postChat as origPostChat,
} from "./api/chat";
import { useSendMessage } from "./chat";

let chatMessageEvents: Array<ChatMessageEvent> = [];
const postChatMock = vi.hoisted(() => {
  return async function (
    ...args: Parameters<typeof origPostChat>
  ): ReturnType<typeof origPostChat> {
    const { messages: _messages } = args[0];
    return (async function* () {
      for (const event of chatMessageEvents) {
        yield event;
      }
    })();
  };
});

vi.mock("./api/chat", async importOriginal => {
  const mod = await importOriginal<typeof import("./api/chat")>();
  const postChat: typeof mod.postChat = postChatMock;
  return {
    ...mod,
    postChat,
  } as typeof import("./api/chat");
});

describe("chat actions", () => {
  afterEach(() => {
    vi.resetAllMocks();
    chatMessageEvents = [];
  });

  describe("useSendMessage", () => {
    it("adds the user message if there are no messages yet", async () => {
      const applicationStateHook = renderHook(() =>
        useApplicationState()
      ).result;
      const sendMessageHook = renderHook(() => useSendMessage()).result;

      const userMessage = "Hi";
      await act(async () =>
        applicationStateHook.current.chatMutations.updateInput(userMessage)
      );

      expect(applicationStateHook.current.chat.messages).toHaveLength(0);
      await act(async () => await sendMessageHook.current());

      const firstMessage = applicationStateHook.current.chat.messages[0];
      const expected = {
        author: "user",
        text: userMessage,
      };
      expect(firstMessage).toStrictEqual(expected);
    });

    it("adds the AI message if there are no messages yet", async () => {
      chatMessageEvents = [
        { type: "message-chunk", text: "Hi" },
        { type: "message-chunk", text: " from" },
        { type: "message-chunk", text: " AI" },
      ];

      const applicationStateHook = renderHook(() =>
        useApplicationState()
      ).result;
      const sendMessageHook = renderHook(() => useSendMessage()).result;

      await act(async () => await sendMessageHook.current());

      const response = applicationStateHook.current.chat.messages[1];
      const expected = {
        author: "ai",
        text: chatMessageEvents.map(event => event.text).join(""),
      };
      expect(response).toStrictEqual(expected);
    });

    // TODO test that history is preserved
  });
});
