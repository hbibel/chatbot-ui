import {
  Message,
  MessageChunkEvent,
  StreamChatCompletions,
} from "@/service/chat";
import { GoogleGenerativeAI, Part } from "@google/generative-ai";

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
    const history = messages.map(message => {
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
    const result = await chat.sendMessageStream("I have 2 dogs in my house.");
    for await (const modelResponse of result.stream) {
      const messageChunkEvent: MessageChunkEvent = {
        text: modelResponse.text(),
      };
      yield messageChunkEvent;
    }
  };
}
