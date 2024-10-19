import { render, screen } from "@testing-library/react";

import ClearChatButton from "./clear-chat-button";

describe("ClearChatButton", () => {
  it("is disabled if there are no messages", () => {
    render(<ClearChatButton />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  // it("is enabled if there are messages", () => {
  //   render(<ClearChatButton />);
  //
  //   expect(screen.getByRole("button")).toBeEnabled();
  // });
});
