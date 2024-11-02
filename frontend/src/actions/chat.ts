import { useApplicationState } from "@/state/state";

import { postChat } from "./api/chat";

export function useSendMessage() {
  const appendToLastMessage = useApplicationState(
    state => state.appendToLastMessage
  );
  const appendEmptyMessage = useApplicationState(
    state => state.appendEmptyMessage
  );
  const updateInput = useApplicationState(state => state.updateInput);
  const appendUserMessage = useApplicationState(
    state => state.appendUserMessage
  );
  const text = useApplicationState(state => state.chat.input);

  return async () => {
    updateInput("");
    appendUserMessage(text);
    appendEmptyMessage("ai");

    // todo try/catch, reset input in catch block
    const events = await postChat({
      messages: [{ author: "user", text }],
    });

    for await (const event of events) {
      if (event.type === "message-chunk") {
        appendToLastMessage(event.text);
      }
    }
  };
}
