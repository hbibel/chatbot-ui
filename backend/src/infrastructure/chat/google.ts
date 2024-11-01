import { GoogleGenerativeAI, Part } from "@google/generative-ai";

import {
  Message,
  MessageChunkEvent,
  StreamChatCompletions,
} from "@/service/chat";

const authorToGoogleRole = {
  user: "user",
  ai: "model",
};

interface CreateStreamChatCompletionsArgs {
  apiKey: string;
  model: string;
}
export function createStreamChatCompletions({
  apiKey,
  model,
}: CreateStreamChatCompletionsArgs): StreamChatCompletions {
  const genAI = new GoogleGenerativeAI(apiKey);
  const genModel = genAI.getGenerativeModel({ model });

  return async function* (messages: Message[]) {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.author !== "user") {
      throw new Error(
        "Expected last message to be a user message, but messages were: " +
          JSON.stringify(messages)
      );
    }

    const history = messages.slice(0, -1).map(message => {
      let parts: Part[];
      switch (message.author) {
        case "user":
          parts = [{ text: message.text }];
          break;
        case "ai":
          parts = [{ text: message.text }];
          break;
      }
      return {
        role: authorToGoogleRole[message.author],
        parts,
      };
    });

    const chat = genModel.startChat({ history });
    const result = await chat.sendMessageStream(lastMessage.text);
    for await (const modelResponse of result.stream) {
      const messageChunkEvent: MessageChunkEvent = {
        type: "message-chunk",
        text: modelResponse.text(),
      };
      yield messageChunkEvent;
    }
  };
}
