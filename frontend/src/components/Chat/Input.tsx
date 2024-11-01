import { ChangeEvent, KeyboardEvent } from "react";

import { useSendMessage } from "@/actions/chat";
import { useApplicationState } from "@/state/state";

import { Textarea } from "../ui/textarea";

export default function Input() {
  const sendMessage = useSendMessage();
  const updateInput = useApplicationState(state => state.updateInput);

  async function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  }

  function handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
    updateInput(event.target.value);
  }

  return (
    <Textarea
      className="w-full h-full bg-black block overflow-auto resize-none"
      onKeyUp={handleKeyPress}
      onChange={handleValueChange}
    />
  );
}
