// This looks kinda cool:
// import "highlight.js/styles/gradient-dark.min.css";
import "highlight.js/styles/tokyo-night-dark.min.css";
import { z } from "zod";

import { Message } from "@/state/chatModel";

const ChatMessageEventSchema = z
  .object({
    type: z.literal("message-chunk"),
    text: z.string(),
  })
  .strict();

export type ChatMessageEvent = z.infer<typeof ChatMessageEventSchema>;

const ApiMessagesSchema = z.object({
  messages: z.array(
    z
      .object({
        author: z.literal("ai").or(z.literal("user")),
        text: z.string(),
      })
      .strict()
  ),
});

interface PostChatArgs {
  messages: Message[];
}
export async function postChat({
  messages,
}: PostChatArgs): Promise<AsyncIterable<ChatMessageEvent>> {
  const apiMessages = ApiMessagesSchema.parse({ messages });

  const response = await fetch("/api/chat", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(apiMessages),
  });
  const body = response.body;
  if (body === null) {
    // TODO handle
    return;
  }

  const reader = body.getReader();
  return (async function* () {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        try {
          const events = text
            .slice("data: ".length)
            .split("\n\ndata: ")
            .map(s => JSON.parse(s));
          for (const event of events) {
            yield ChatMessageEventSchema.parse(event);
          }
        } catch (err) {
          console.error(`could not parse JSON ${text}: ${err}`);
        }
      }
    } finally {
      reader.releaseLock();
    }
  })();
}
