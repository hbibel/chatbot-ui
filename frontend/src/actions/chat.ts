import { postChat } from "./api/chat";

export async function sendMessage() {
  const events = await postChat({
    messages: [{ author: "user", text: "test" }],
  });

  for await (const event of events) {
    if (event.type === "message-chunk") {
      // TODO mutate state
      console.log({ chunk: event.text });
    }
  }
}
