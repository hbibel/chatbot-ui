import { KeyboardEvent } from "react";

import { sendMessage } from "@/actions/chat";

import { Textarea } from "../ui/textarea";

export default function Input() {
  async function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  }

  return (
    <Textarea
      className="w-full h-full bg-black block overflow-auto resize-none"
      onKeyUp={handleKeyPress}
    />
  );
}
