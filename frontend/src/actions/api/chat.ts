import { z } from "zod";

import { Message } from "@/state/model";

const ChatMessageEventSchema = z
  .object({
    type: z.literal("message-chunk"),
    text: z.string(),
  })
  .strict();

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
}: PostChatArgs): Promise<
  AsyncIterable<z.infer<typeof ChatMessageEventSchema>>
> {
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
        yield ChatMessageEventSchema.parse(JSON.parse(text));
      }
    } finally {
      reader.releaseLock();
    }
  })();
}
