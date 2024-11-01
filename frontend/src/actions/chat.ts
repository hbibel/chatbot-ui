import { useApplicationState } from "@/state/state";

import { postChat } from "./api/chat";

export function useSendMessage() {
  const appendToLastMessage = useApplicationState(
    state => state.appendToLastMessage
  );
  const appendEmptyMessage = useApplicationState(
    state => state.appendEmptyMessage
  );
  const text = useApplicationState(state => state.chat.input);

  return async () => {
    const events = await postChat({
      messages: [{ author: "user", text }],
    });

    appendEmptyMessage("ai");
    for await (const event of events) {
      if (event.type === "message-chunk") {
        appendToLastMessage(event.text);
      }
    }
  };
}
