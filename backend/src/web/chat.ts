import Elysia, { t } from "elysia";

import { StreamChatCompletions, chat } from "@/service/chat";

const PostRootSchema = t.Object({
  messages: t.Array(
    t.Object({
      author: t.Union([t.Literal("ai"), t.Literal("user")]),
      text: t.String(),
    })
  ),
});

interface ChatRouterEnv {
  streamChatCompletions: StreamChatCompletions;
}
export function chatRouter({ streamChatCompletions }: ChatRouterEnv) {
  return new Elysia().post(
    "/api/chat",
    async function* ({ body }) {
      for await (const event of chat(
        { streamChatCompletions },
        { messages: body.messages }
      )) {
        yield event;
      }
    },
    { body: PostRootSchema }
  );
}
