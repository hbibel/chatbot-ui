import { ChangeEvent, FormEvent, KeyboardEvent } from "react";

import { useSendMessage } from "@/actions/chat";
import { useApplicationState } from "@/state/state";

import { Textarea } from "../ui/textarea";

export default function Input() {
  const sendMessage = useSendMessage();
  const updateInput = useApplicationState(state => state.updateInput);
  const input = useApplicationState(state => state.chat.input);

  async function handleKeyPress(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      await sendMessage();
    }
  }

  function handleValueChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const newText = event.target.value;
    updateInput(newText);
  }

  async function handlePromptSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await sendMessage();
  }

  // Some attributes impact the text area's size and need to be the same for
  // the div's after pseudoelement to enable autogrowth for the textarea, see
  // https://css-tricks.com/the-cleanest-trick-for-autogrowing-textareas/
  return (
    <form
      data-replicated-value={input}
      className={`
        after:border after:px-3 after:py-2 after:text-sm
        after:[grid-area:1/1/2/2]

        grid
        after:content-[attr(data-replicated-value)]
        after:whitespace-pre-wrap after:invisible
      `}
      onSubmit={handlePromptSubmit}
    >
      <Textarea
        name="prompt"
        className={`
          border px-3 py-2 text-sm
          [grid-area:1/1/2/2]

          w-full overflow-hidden resize-none
        `}
        onKeyDown={handleKeyPress}
        onChange={handleValueChange}
        value={input}
      />
    </form>
  );
}
