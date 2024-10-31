export interface UserMessage {
  author: "user";
  text: string;
}
export interface AiMessage {
  author: "ai";
  text: string;
}
export type Message = AiMessage | UserMessage;

export interface MessageChunkEvent {
  text: string;
}

export type ChatEvent = MessageChunkEvent;

export type StreamChatCompletions = (
  messages: Message[]
) => AsyncGenerator<ChatEvent>;

interface ChatArguments {
  messages: Message[];
}
interface ChatEnv {
  streamChatCompletions: StreamChatCompletions;
}

export async function* chat(
  env: ChatEnv,
  args: ChatArguments
): AsyncGenerator<ChatEvent> {
  for await (const ev of env.streamChatCompletions(args.messages)) {
    yield ev;
  }
}
