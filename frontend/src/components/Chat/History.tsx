import { useApplicationState } from "@/state/state";

import MessageBody from "./MessageBody";

export default function History() {
  const messages = useApplicationState(state => state.chat.messages);

  return (
    <>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <span>{message.author}: </span>
            <MessageBody rawContent={message.text} />
          </div>
        );
      })}
    </>
  );
}
