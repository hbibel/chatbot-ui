export type Author = "ai" | "user";

export interface Message {
  author: Author;
  text: string;
}

export interface ChatState {
  messages: Message[];
  input: string;
}
