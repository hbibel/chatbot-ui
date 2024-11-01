import { useApplicationState } from "@/state/state";

export default function History() {
  const messages = useApplicationState(state => state.chat.messages);

  return (
    <>
      {messages.map((message, i) => {
        return (
          <div key={i}>
            <span>{message.author}: </span>
            <span>{message.text}</span>
          </div>
        );
      })}
    </>
  );
}
