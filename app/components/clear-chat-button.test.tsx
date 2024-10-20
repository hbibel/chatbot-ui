import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { addMessage, clearChat } from "@/actions/chat";

import ClearChatButton from "./clear-chat-button";

vi.mock("@/actions/chat", { spy: true });

describe("ClearChatButton", () => {
  it("is enabled if there are messages", () => {
    addMessage({ author: "user" });

    render(<ClearChatButton />);

    expect(screen.getByRole("button")).toBeEnabled();
  });

  it("is disabled if there are no messages", () => {
    render(<ClearChatButton />);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls the clearChat action when clicked", async () => {
    render(<ClearChatButton />);

    act(() => addMessage({ author: "user" }));
    await userEvent.click(screen.getByText("label"));

    expect(clearChat).toHaveBeenCalled();
  });

  it("is disabled after being enabled if messages are cleared", async () => {
    render(<ClearChatButton />);
    const theButton = screen.getByRole("button");

    expect(theButton).toBeDisabled();

    act(() => addMessage({ author: "user" }));
    expect(theButton).toBeEnabled();

    await userEvent.click(theButton);
    expect(theButton).toBeDisabled();
  });
});
