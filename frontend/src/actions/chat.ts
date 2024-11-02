import { useApplicationState } from "@/state/state";

import { postChat } from "./api/chat";

export function useSendMessage() {
  const appendToLastMessage = useApplicationState(
    state => state.chatMutations.appendToLastMessage
  );
  const appendEmptyMessage = useApplicationState(
    state => state.chatMutations.appendEmptyMessage
  );
  const updateInput = useApplicationState(
    state => state.chatMutations.updateInput
  );
  const appendUserMessage = useApplicationState(
    state => state.chatMutations.appendUserMessage
  );

  const text = useApplicationState(state => state.chat.input);
  const previousMessages = useApplicationState(state => state.chat.messages);

  return async () => {
    updateInput("");
    appendUserMessage(text);
    appendEmptyMessage("ai");

    // todo try/catch, reset input in catch block
    const events = await postChat({
      messages: [...previousMessages, { author: "user", text }],
    });

    for await (const event of events) {
      if (event.type === "message-chunk") {
        appendToLastMessage(event.text);
      }
    }
  };
}
